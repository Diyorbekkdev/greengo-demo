import { hoc } from "@/utils";
import { useProhibitedAreasProps } from "./prohibited-areas.props";
import { Button, Modal } from "antd";
import { EditOutlined, FundOutlined } from "@ant-design/icons";
import { Header } from "@/components";

export const ProhibitedAreas = hoc(
  useProhibitedAreasProps,
  ({
    isDrawingPolygon,
    setIsDrawingPolygon,
    selectOptions,
    isRegionLoading,
    mapContainer,
    isModalOpen,
    submitDraw,
    handleCancel,
    searchRegion,
    isSearchRegion,
    isSearchOptions,
    flyToRegion,
  }) => {
    return (
      <div className="h-full">
        <Header
          title="Prohibited Areas"
          isSelect={true}
          placeholder={"Select region"}
          options={selectOptions}
          isLoading={isRegionLoading}
          buttonText="Start Draw polygon"
          icon={isDrawingPolygon ? <FundOutlined /> : <EditOutlined />}
          onAdd={() =>
            setIsDrawingPolygon(
              isDrawingPolygon === "simple_select"
                ? "draw_polygon"
                : "simple_select"
            )
          }
          type="primary"
        />
        <div
          style={{ height: "calc(100% - 70px)" }}
          className="w-full shadow-md mt-2 rounded-md overflow-hidden relative"
        >
          <div
            style={
              isDrawingPolygon === "simple_select"
                ? { cursor: "auto" }
                : { cursor: "crosshair" }
            }
            ref={mapContainer}
            className="h-full available"
          />
          <div className="absolute top-2 left-2 ">
            <div className="bg-white p-1 flex rounded-lg relative">
              <input
                onChange={searchRegion}
                value={isSearchRegion}
                type="text"
                placeholder="Search region..."
                className="outline-none p-1 font-semibold"
              />
              <Button type="primary" className="">
                Search
              </Button>
              <ul className="flex flex-col bg-white rounded-b-md overflow-hidden absolute w-full top-9 left-0">
                {isSearchOptions.length
                  ? isSearchOptions.map((el: any, index: number) => (
                      <li
                        key={index}
                        className="hover:bg-gray-200 cursor-pointer py-1 px-2"
                        onClick={() => flyToRegion(el.value)}
                      >
                        {el.label}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
        <Modal
          title="Creating prohibited area"
          open={isModalOpen}
          onOk={submitDraw}
          onCancel={handleCancel}
        >
          <p>Do you want to create this available aria</p>
        </Modal>
      </div>
    );
  }
);
