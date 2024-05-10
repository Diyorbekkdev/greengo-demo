import { hoc } from "@/utils";
import { Header } from "@/components";
import { Button, Drawer, Empty, Modal } from "antd";
import { useStationsProps } from "./stations.props";
import { StationModal } from "../../components/station-modal";
import StationCard from "../../components/station-card";

export const Stations = hoc(
  useStationsProps,
  ({
    data,
    values,
    open,
    setOpen,
    showSelectedRegions,
    setShowSelectedRegions,
    handleDelete,
    isRegionLoading,
    selectOptions,
    isSearchOptions,
    isSearchRegion,
    flyToRegion,
    searchRegion,
    mapContainer,
    isCheckRegionId,
    setIsCheckRegionId,
  }) => {
    return (
      <div className="h-full">
        <Header
          title="Stations"
          buttonText="See selected stations"
          isSelect={true}
          placeholder={"Select region"}
          options={selectOptions}
          isLoading={isRegionLoading}
          onAdd={() => setShowSelectedRegions(true)}
          type="primary"
        />
        <StationModal
          modalTitle="Create Station"
          values={values}
          defaultRegionId={!isRegionLoading ? selectOptions[0]?.id : null}
          url="/region/"
          open={open}
          onClose={() => setOpen(false)}
        />
        <Modal
          title="Enter Region"
          open={isCheckRegionId}
          onOk={() => setIsCheckRegionId(false)}
        >
          <p>You must enter the region</p>
        </Modal>
        <div
          style={{ height: "calc(100% - 70px)" }}
          className="w-full shadow-md mt-2 rounded-md overflow-hidden relative"
        >
          <div ref={mapContainer} className="h-full cursor-pointer" />
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
          <Drawer
            title="Selected Locations"
            placement="right"
            closable={true}
            onClose={() => setShowSelectedRegions(false)}
            visible={showSelectedRegions}
            key="right"
          >
            {data?.map((el: any) => (
              <StationCard
                key={el?.id}
                {...el}
                handleDelete={handleDelete}
                flyToRegion={flyToRegion}
                onClose={() => setShowSelectedRegions(false)}
              />
            ))}
            {data?.length === 0 && (
              <div className="text-center">
                <Empty />
              </div>
            )}
          </Drawer>
        </div>
      </div>
    );
  }
);
