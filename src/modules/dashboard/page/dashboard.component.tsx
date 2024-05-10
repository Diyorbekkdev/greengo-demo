import { hoc } from "@/utils";
import { useDashboardProps } from "./dashboard.props";
import { Button, Image, Select } from "antd";
import { bicycle, settings } from "@/assets";
import CountUp from "react-countup";

import { DownSquareOutlined, UpSquareOutlined } from "@ant-design/icons";
import { useState } from "react";
import "./style.scss";
import BicycleSelect from "../components/BicycleSelect";
import { useSearchAppParams } from "@/hooks/useSearchParam";

export const Dashboard = hoc(
  useDashboardProps,
  ({
    selectOptions,
    SetRouterQuery,
    GetRouterQuery,
    data,
    mapContainer,
    bicycleSelectOptions,
    flyToLocation,
  }) => {
    const [show, setShow] = useState(false);
    const statusArr = [
      {
        status: 1,
        text: "Active",
        bgColor: "bg-green",
        img: bicycle,
        statusCount: data?.activeCount,
      },
      {
        status: 2,
        text: "On repair",
        bgColor: "bg-amber-400",
        img: settings,
        statusCount: data?.onRepair,
      },
      {
        status: 3,
        text: "In trip",
        bgColor: "bg-purple-600",
        img: bicycle,
        statusCount: data?.inTrip,
      },
      {
        status: 0,
        text: "Maintenance",
        bgColor: "bg-green",
        img: bicycle,
        statusCount: data?.maintenance,
      },
      {
        status: 4,
        text: "Out of zone",
        bgColor: "bg-gray-500",
        img: bicycle,
        statusCount: data?.outOfZone,
      },
      {
        status: 5,
        text: "Low battery",
        bgColor: "bg-orange",
        img: bicycle,
        statusCount: data?.lowVoltage,
      },
      {
        status: 6,
        text: "No signal",
        bgColor: "bg-red-500",
        img: bicycle,
        statusCount: data?.lowSignal,
      },
    ];
    const { setParams } = useSearchAppParams();
    return (
      <div className="dashboard_main-container overflow-hidden flex flex-col gap-5 h-full">
        <div className="content_wrapper h-max">
          <div className="flex flex-col gap-2 items-stretch">
            <div className="flex justify-between gap-2 items-center">
              {statusArr.map(({ text, status, bgColor, img, statusCount }) => {
                return (
                  <div
                    key={status}
                    className="w-full border rounded-md p-2 gap-4 flex flex-col justify-center  items-center cursor-pointer hover:shadow hover:bg-gray-200"
                    onClick={() => setParams({ status })}
                  >
                    <span className="font-bold">{text}</span>
                    <div
                      className={`rounded-full w-10 h-10 flex items-center ${bgColor} justify-center`}
                    >
                      <Image src={img} alt="icons" />
                    </div>
                    <span className="font-bold text-lg">
                      <CountUp duration={5} end={statusCount} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-full flex items-center gap-1 shadow p-4 rounded relative">
              <Select
                showSearch={true}
                className="w-full"
                onChange={(value) => {
                  if (value) {
                    SetRouterQuery({
                      ...GetRouterQuery,
                      regionId: value.split("/")[0],
                    });
                    flyToLocation(value.split("/")?.[1]);
                  } else {
                    SetRouterQuery({ ...GetRouterQuery, regionId: "" });
                  }
                }}
                defaultValue={selectOptions?.[0]}
                placeholder="select the region"
                options={selectOptions}
              />

              <Button
                type="primary"
                title=""
                icon={show ? <DownSquareOutlined /> : <UpSquareOutlined />}
                onClick={() => setShow(!show)}
              />
              {show && (
                <div className="shadow p-1 flex flex-col gap-2 overflow-y-scroll absolute left-0 top-12 bg-white w-full z-50 h-[76vh] ">
                  <BicycleSelect options={bicycleSelectOptions} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div ref={mapContainer} className="mapboxgl-control-container flex-1" />
      </div>
    );
  }
);
