import { useFetchQuery } from "@/hooks";
import { useSearchAppParams } from "@/hooks/useSearchParam";
import { httpClient } from "@/utils";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { message } from "antd";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export const useProhibitedAreasProps = () => {
  const { getParams } = useSearchAppParams();
  const regionId = getParams("paramId");

  const [isDrawingPolygon, setIsDrawingPolygon] =
    useState<string>("simple_select");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawData, setDrawData] = useState([]);
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
    data: prohibitedData,
    isLoading: isProhibitedLoading,
    refetch: prohibitedRefetch,
  } = useFetchQuery({
    url: "region/prohibited/",
    params: {
      pageSize: 30,
      all: true,
      withDelete: true,
    },
  });

  console.log("prohibitedData:", prohibitedData);

  const selectOptions = regionData?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  useEffect(() => {
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
      map.current.flyTo({ center: changeRegionLocation });
    }
  }

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
    console.log("coordinates", changeRegionLocation);

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXNsaWRkaW4zIiwiYSI6ImNsdjllMHNtNDB2MG8ya21pZjhrZTBmc2MifQ.gAXmMY70qQaffX-K1qc28A";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: coordinates,
      zoom: 16,
    });

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
      "bottom-right"
    );

    map.current.on("load", () => {
      // Draw prohibited areas as polygons

      prohibitedData?.forEach((prohibited: any, index: number) => {
        const coordinates = prohibited.coordinates?.map(
          (coordinate: string) => {
            if (coordinate)
              return coordinate
                .slice(1, coordinate.length - 2)
                .split(",")
                .map((el: string) => Number(el));
          }
        );

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
          id: "prohibited-area" + index,
          type: "fill",
          source: {
            type: "geojson",
            data: feature,
          },
          paint: {
            "fill-color": "red", // Green color for prohibited areas
            "fill-opacity": 0.7,
          },
        });
      });
    });

    map.current.on("draw.create", function (e: any) {
      const data = e.features?.[0]?.geometry?.coordinates?.[0] || [];
      if (data.length > 0) {
        setDrawData(data);
      }
      setIsModalOpen(true);
      prohibitedRefetch();
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
  }, [isDrawingPolygon, isProhibitedLoading]);

  const submitDraw = async () => {
    setIsModalOpen(false);
    if (isDrawData.length > 0) {
      const resArr: any = [];

      isDrawData.forEach((el) => {
        resArr.push("(" + el[0] + "," + el[1] + ")");
      });

      try {
        setDrawLoading(true);
        await httpClient({
          url: "region/prohibited/",
          method: "POST",
          data: {
            coordinates: resArr,
            isActive: true,
            regionId: Number(regionId),
          },
        });
        message.success("Added new prohibited");
        reginRefetch();
        setDrawLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setDrawData([]);
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
    isSearchRegion,
    isSearchOptions,
    flyToRegion,
  };

  return dashboardProps;
};
