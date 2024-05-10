import { useFetchQuery } from "@/hooks";
import { httpClient } from "@/utils";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

export const useRegionsProps = () => {
  const [open, setOpen] = useState(false);
  const [showSelectedRegions, setShowSelectedRegions] = useState(false);
  const [values, setValues] = useState({
    name: "",
    isActive: true,
    lat: 0,
    long: 0,
  });
  const [isSearchOptions, setIsSearchOptions] = useState([]);
  const [isSearchRegion, setIsSearchRegion] = useState<string>("");
  const [isActiveRegion, setIsActiveRegion] = useState(null);

  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  const { data, isLoading, refetch } = useFetchQuery({
    url: "region",
    params: {
      pageSize: 20,
      all: true,
      withDelete: true,
    },
  });

  function initializeMap() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXNsaWRkaW4zIiwiYSI6ImNsdjllMHNtNDB2MG8ya21pZjhrZTBmc2MifQ.gAXmMY70qQaffX-K1qc28A";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [69.2401, 41.2995],
      zoom: 10,
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

    map.current.on("click", async (e: any) => {
      const { lat, lng } = e.lngLat;

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );

      const data = await response.json();
      const placeName = data.features[0].place_name;
      setValues({ ...values, name: placeName, long: lng, lat: lat });
      setOpen(true);
    });

    map.current.on("load", () => {
      if (!isLoading) {
        data?.forEach(
          (region: { location: { longitude: number; latitude: number } }) => {
            const { longitude, latitude } = region.location;

            if (longitude && latitude) mapMarker([longitude, latitude]);
          }
        );
      }
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

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this region ?",
      icon: <DeleteOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await httpClient.delete(`region/${id}`);
          message.success("Regioin deleted successfully");
          refetch();
        } catch (error) {
          message.error("Failed to delete regioin");
        }
      },
    });
  };

  function flyToRegion(regionCoordinate: string) {
    const changeRegion = regionCoordinate
      .split(",")
      .map((point) => Number(point));

    map.current.flyTo({ center: changeRegion });
    setIsSearchOptions([]);
    setIsSearchRegion("");
  }

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

  function mapMarker(coordinate: any) {
    new mapboxgl.Marker({
      color: "black",
      draggable: false,
    })
      .setLngLat(coordinate)
      .addTo(map.current);
  }

  const regionProps = {
    data,
    values,
    open,
    setOpen,
    showSelectedRegions,
    setShowSelectedRegions,
    handleDelete,
    refetch,
    flyToRegion,
    isSearchOptions,
    mapContainer,
    isSearchRegion,
    searchRegion,
    setIsActiveRegion,
    isActiveRegion,
  };

  return regionProps;
};
