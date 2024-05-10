import { useFetchQuery } from "@/hooks";
import { httpClient } from "@/utils";
import { useEffect, useRef, useState } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxgl from "mapbox-gl";
import { useSearchAppParams } from "@/hooks/useSearchParam";
import { message } from "antd";

export const useAvailableAreasProps = () => {
  const { getParams } = useSearchAppParams();
  const regionId = getParams("paramId");

  const [isDrawingPolygon, setIsDrawingPolygon] =
    useState<string>("simple_select");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawData, setIsDrawData] = useState({
    coordinates: [],
    isActive: true,
    regionId: Number(regionId),
  });
  const [isDrawLoading, setDrawLoading] = useState(false);
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [isSearchRegion, setIsSearchRegion] = useState<string>("");
  const [isSearchOptions, setIsSearchOptions] = useState([]);

  const {
    data: regionData,
    isLoading: isRegionLoading,
    refetch: reginRefetch,
  } = useFetchQuery({
    url: "region",
    params: {
      all: true,
      withDelete: true,
    },
  });

  const {
    data: availableData,
    isLoading: isAvailableLoading,
    refetch: availableRefetch,
  } = useFetchQuery({
    url: "region/available/",
    params: {
      pageSize: 30,
      all: true,
      withDelete: true,
    },
  });

  function initializeMap() {
    let changeRegionLocation;
    if (regionData) {
      regionData?.forEach((region: any) => {
        if (region?.id == regionId) {
          changeRegionLocation = Object.values(region?.location);
          return;
        }
      });
    }
    const coordinates: any = changeRegionLocation
      ? changeRegionLocation
      : [69.2401, 41.2995];

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXNsaWRkaW4zIiwiYSI6ImNsdjllMHNtNDB2MG8ya21pZjhrZTBmc2MifQ.gAXmMY70qQaffX-K1qc28A";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: coordinates,
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-right",
    );

    const draw = new MapboxDraw({
      displayControlsDefault: true,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: isDrawingPolygon,
    });
    map.current.addControl(draw);

    map.current.on("load", () => {
      // Draw available areas as polygons

      availableData?.forEach((available: any) => {
        const coordinates = available.coordinates?.map((coordinate: string) => {
          if (coordinate)
            return coordinate
              .slice(1, coordinate.length - 2)
              .split(",")
              .map((el: string) => Number(el));
        });

        // Create a GeoJSON feature for the polygon
        const feature = {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              coordinates?.map((coord: number[]) => [coord[0], coord[1]]),
            ],
          },
        };
        // Add the feature to the map
        map.current.addLayer({
          id: `${available?.id}`,
          type: "fill",
          source: {
            type: "geojson",
            data: feature,
          },
          paint: {
            "fill-color": "green", // Green color for available areas
            "fill-opacity": 0.6,
            "line-color": "green",
            "line-width": 3,


          },
        });
      });
      if (!regionId)
        setIsDrawData({ ...isDrawData, regionId: regionData?.[0].id });
    });

    map.current.on("draw.create", function (e: any) {
      const data = e.features?.[0]?.geometry?.coordinates?.[0] || [];
      console.log(data);

      if (data.length > 0) {
        setIsDrawData({ ...isDrawData, coordinates: data });
      }
      setIsModalOpen(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }

  useEffect(() => {
    if (!map.current) initializeMap();

    return () => {
      if (map.current) {
        map.current.remove(); // Remove the map if it exists
        map.current = null; // Reset the map reference
      }
    }; // Cleanup function when component unmounts or  changes
  }, [isDrawingPolygon, isAvailableLoading]);

  const selectOptions = regionData?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  useEffect(() => {
    console.log("regionId", regionId);

    if (regionId) changeRegion(Number(regionId));
  }, [regionId]);

  function changeRegion(regionId: number) {
    if (regionData) {
      let changeRegionLocation;
      regionData?.forEach((region: any) => {
        if (region?.id == regionId) {
          changeRegionLocation = Object.values(region?.location);
          return;
        }
      });
      console.log("changeRegionLocation", changeRegionLocation);
      map.current.flyTo({ center: changeRegionLocation });
    }
  }

  const submitDraw = async () => {
    setIsModalOpen(false);
    if (isDrawData.coordinates.length > 0) {
      const resArr: any = [];

      isDrawData.coordinates.forEach((coordinate) => {
        resArr.push("(" + coordinate[0] + "," + coordinate[1] + ")");
      });

      try {
        setDrawLoading(true);
        await httpClient({
          url: "region/available/",
          method: "POST",
          data: { ...isDrawData, coordinates: resArr },
        });
        message.success("Added new available");
        setDrawLoading(false);
         await availableRefetch();
      } catch (err) {
        console.log(err);
        initializeMap();
      } finally {
        initializeMap();
      }
    } else {
      message.success("Another wrong");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function searchRegion(e: any) {
    const searchValue = e.target.value;
    setIsSearchRegion(searchValue);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const searchOptions = data.features.map((feature: any) => {
        return { label: feature.place_name, value: feature.center.join(",") };
      });

      setIsSearchOptions(searchOptions);
    } catch (err) {
      console.log(err);
    }
  }

  function flyToRegion(regionCoordinate: string) {
    const changeRegion = regionCoordinate
      .split(",")
      .map((point) => Number(point));

    map.current.flyTo({ center: changeRegion });
    setIsSearchOptions([]);
    setIsSearchRegion("");
  }

  const dashboardProps = {
    regionData,
    isDrawingPolygon,
    setIsDrawingPolygon,
    isRegionLoading,
    reginRefetch,
    selectOptions,
    mapContainer,
    isModalOpen,
    submitDraw,
    handleCancel,
    isDrawLoading,
    searchRegion,
    isSearchOptions,
    isSearchRegion,
    flyToRegion,
  };

  return dashboardProps;
};
