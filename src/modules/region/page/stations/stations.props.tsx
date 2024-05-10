import { useFetchQuery } from "@/hooks";
import { useSearchAppParams } from "@/hooks/useSearchParam";
import { httpClient } from "@/utils";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export const useStationsProps = () => {
  const { getParams } = useSearchAppParams();
  const regionId = getParams("paramId");

  const [open, setOpen] = useState(false);
  const [showSelectedRegions, setShowSelectedRegions] = useState(false);
  const [values, setValues] = useState({
    name: "",
    isActive: true,
    lat: 0,
    long: 0,
    regionId: regionId ? Number(regionId) : null,
  });
  const [isCheckRegionId, setIsCheckRegionId] = useState(false);

  const [isSearchOptions, setIsSearchOptions] = useState([]);
  const [isSearchRegion, setIsSearchRegion] = useState<string>("");

  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  const { data, isLoading, refetch } = useFetchQuery({
    url: "station",
    params: {
      all: true,
      withDelete: true,
    },
  });

  console.log(data);

  const {
    data: regionData,
    isLoading: isRegionLoading,
    // refetch: regionRefetch,
  } = useFetchQuery({
    url: "region",
    params: {
      all: true,
      withDelete: true,
    },
  });

  function initializeMap() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXNsaWRkaW4zIiwiYSI6ImNsdjllMHNtNDB2MG8ya21pZjhrZTBmc2MifQ.gAXmMY70qQaffX-K1qc28A";

    map.current = new mapboxgl.Map({
      container: mapContainer?.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [69.2401, 41.2995],
      zoom: 16,
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
      "bottom-right"
    );

    map.current.on("load", () => {
      if (!isLoading) {
        data?.forEach((region: any) => {
          const { longitude, latitude } = region;

          if (Number(longitude) && Number(latitude))
            mapMarker([+longitude, +latitude]);
        });
      }
    });

    map.current.on("click", async (e: any) => {
      const { lat, lng } = e.lngLat;

      setValues({
        ...values,
        long: lng,
        lat: lat,
      });

      setOpen(true);
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
    };
  }, [isLoading]);

  const onEdit = (values: any) => {
    setValues(values);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this station ?",
      icon: <DeleteOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await httpClient.delete(`station/${id}`);
          message.success("Station deleted successfully");
          refetch();
        } catch (error) {
          message.error("Failed to delete station");
        }
      },
    });
  };

  const selectOptions = regionData?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

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

  useEffect(() => {
    if (regionId) changeRegion(Number(regionId));
    console.log(regionId);
  }, [regionId]);

  function changeRegion(newRegionId: number) {
    if (regionData) {
      let changeRegionLocation;
      regionData?.forEach((region: any) => {
        if (region?.id == newRegionId) {
          changeRegionLocation = Object.values(region?.location);
          return;
        }
      });
      map.current.flyTo({ center: changeRegionLocation });
    }
  }

  function mapMarker(coordinate: any) {
    console.log(coordinate);
    new mapboxgl.Marker({
      color: "black",
      draggable: false,
    })
      .setLngLat(coordinate)
      .addTo(map.current);
  }

  const stationProps = {
    data,
    values,
    open,
    setOpen,
    isLoading,
    showSelectedRegions,
    setShowSelectedRegions,
    handleDelete,
    onEdit,
    refetch,
    isRegionLoading,
    selectOptions,
    isSearchOptions,
    isSearchRegion,
    flyToRegion,
    searchRegion,
    mapContainer,
    isCheckRegionId,
    setIsCheckRegionId,
  };

  return stationProps;
};
