import { useFetchQuery, useRouterQuery } from "@/hooks";
import { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";

export const useDashboardProps = () => {
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
  // const { search } = useLocation();
  // const [mainData, setMainData] = useState([]);
  const [bicycleStatus, setBicycleStatus] = useState<number>();
  console.log(bicycleStatus);

  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  const { data: regionsData } = useFetchQuery({
    url: "region",
    params: {
      all: true,
      withDelete: true,
    },
  });

  const selectOptions = regionsData?.map((item: any) => {
    return {
      value: item?.id + "/" + Object.values(item?.location).join(","),
      label: item?.name,
    };
  });

  const { data } = useFetchQuery({
    url: "/bicycle/report/",
    params: {
      ...GetRouterQuery(),
      // status: bicycleStatus,
    },
  });

  const { data: bicycleData } = useFetchQuery({
    url: "bicycle/list/",
    params: {
      pageSize: 100,
    },
  });

  const bicycleSelectOptions = bicycleData?.bicycles.map((bicycle: any) => {
    return {
      id: bicycle.id,
      qrCode: bicycle.qrCode,
      number: bicycle.number,
    };
  });

  // useEffect(() => {
  //   setMainData(data);
  // }, []);

  // const popupFunc = (location) => {
  //   const popup = new mapboxgl.Popup({
  //     className: "popupContainer",
  //     closeButton: false,
  //     closeOnClick: false,
  //   });

  //   const popupContent = document.createElement("div");
  //   const transformedData = {
  //     ...location,
  //     closePopup: () => popup.remove(),
  //   };
  //   const shipmentPopup = React.createElement(ModalPopUp, transformedData);
  //   ReactDOM.render(shipmentPopup, popupContent);

  //   const markerEl = document.createElement("div");
  //   markerEl.className = "custom-marker";
  //   markerEl.id = `node-${location?.words}`;

  //   markerEl.addEventListener("click", () => {
  //     console.log(markerEl);
  //   });
  // };

  const initializeMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXNsaWRkaW4zIiwiYSI6ImNsdjllMHNtNDB2MG8ya21pZjhrZTBmc2MifQ.gAXmMY70qQaffX-K1qc28A";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [69.2401, 41.2995],
      zoom: 12,
    });

    map.current.on("style.load", () => {
      // Add a marker source
      map.current.addSource("single-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      // Add a marker layer
      map.current.addLayer({
        id: "marker",
        source: "single-point",
        type: "symbol",
        layout: {
          "icon-image": "marker-15",
          "icon-size": 1.5,
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top",
        },
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
    });

    map.current.on("load", () => {
      // Draw available areas as polygons
      data?.availableCoordinates?.forEach((coordinates: any) => {
        // Create a GeoJSON feature for the polygon
        const feature = {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              coordinates.map((coord: any) => [
                coord.longitude,
                coord.latitude,
              ]),
            ],
          },
        };
        // Add the feature to the map
        map.current.addLayer({
          id: "available-area",
          type: "fill",
          source: {
            type: "geojson",
            data: feature,
          },
          paint: {
            "fill-color": "#00FF00", // Green color for available areas
            "fill-opacity": 0.5,
          },
        });
      });

      // Draw prohibited areas as polygons
      data?.prohibitedCoordinates?.forEach((coordinates: any) => {
        // Create a GeoJSON feature for the polygon
        const feature = {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              coordinates.map((coord: any) => [
                coord.longitude,
                coord.latitude,
              ]),
            ],
          },
        };
        // Add the feature to the map
        map.current.addLayer({
          id: "prohibited-area",
          type: "fill",
          source: {
            type: "geojson",
            data: feature,
          },
          paint: {
            "fill-color": "#FF0000", // Red color for prohibited areas
            "fill-opacity": 0.5,
          },
        });
      });

      // data?.bicycles?.forEach(bicycle => {
      //   return new mapboxgl.Marker()
      //     .setLngLat([bicycle?.coordinate?.longitude, bicycle?.coordinate?.latitude])
      //     .setPopup(new mapboxgl.Popup().setHTML(`<h3>${bicycle.number}</h3><p>Percent: ${bicycle.percent}%</p>`))
      //     .addTo(map.current);
      // });
      data?.bicycles?.forEach((bicycle: any) => {
        // Create a GeoJSON feature for the bicycle marker
        const feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              bicycle?.coordinate?.longitude,
              bicycle?.coordinate?.latitude,
            ],
          },
          properties: {
            title: bicycle.number,
            icon: "https://cdn-icons-png.flaticon.com/512/3448/3448319.png", // Add a custom icon for the bicycle marker
          },
        };
        // Add the feature to the map
        map.current.addSource(`bicycle-${bicycle.id}`, {
          type: "geojson",
          data: feature,
        });
        // Add the bicycle marker layer
        map.current.addLayer({
          id: `bicycle-${bicycle.id}`,
          type: "symbol",
          source: `bicycle-${bicycle.id}`,
          layout: {
            "icon-image":
              "https://cdn-icons-png.flaticon.com/512/3448/3448319.png",
            "icon-size": 5,
            "text-field": "{title}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
          },
        });
      });
      // Set marker options.
      // eslint-disable-next-line no-unsafe-optional-chaining
      // for (const provider of data?.bicycles) popupFunc(provider);
      // const marker1 = new mapboxgl.Marker()
      //   .setLngLat([69.2401, 41.2995])
      //   .addTo(main);

      map.current.addSource("some id", {
        type: "image",
        url: "https://www.mapbox.com/images/foo.png",
        coordinates: [
          [-76.54, 39.18],
          [-76.52, 39.18],
          [-76.52, 39.17],
          [-76.54, 39.17],
        ],
      });
      data?.bicycles.forEach(
        (bicycle: { coordinate: { longitude: number; latitude: number } }) => {
          const { longitude, latitude } = bicycle.coordinate;

          if (longitude && latitude) mapMarker([longitude, latitude]);
        }
      );

      // Center the map
      map.current.flyTo({
        center: [69.2401, 41.2995],
        essential: true,
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  };

  function mapMarker(coordinate: any) {
    new mapboxgl.Marker({
      color: "black",
      draggable: false,
    })
      .setLngLat(coordinate)
      .addTo(map.current);
  }

  useEffect(() => {
    if (!map.current) initializeMap();

    return () => {
      if (map.current) {
        map.current.remove(); // Remove the map if it exists
        map.current = null; // Reset the map reference
      }
    }; // Cleanup function when component unmounts or  changes
  }, [data]);

  function flyToLocation(regionCoordinate: string) {
    const changeRegion = regionCoordinate
      .split(",")
      .map((point) => Number(point));

    map.current.flyTo({ center: changeRegion });
  }

  return {
    selectOptions,
    GetRouterQuery,
    SetRouterQuery,
    data,
    mapContainer,
    bicycleSelectOptions,
    flyToLocation,
    setBicycleStatus,
  };
};
