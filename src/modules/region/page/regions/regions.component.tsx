import { Header } from "@/components";
import { hoc } from "@/utils";
import { useRegionsProps } from "./regions.props";
import { RegionModal } from "../../components/region-modal";
import { Button, Drawer, Empty } from "antd";
import RegionCards from "../../components/region-cards";

const Regions = hoc(
  useRegionsProps,
  ({
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
  }) => {
    return (
      <div className="h-full">
        <Header
          title="Region"
          buttonText="See selected region"
          isSelect={false}
          placeholder={"Select region"}
          onAdd={() => setShowSelectedRegions(true)}
          type="primary"
        />
        <RegionModal
          modalTitle="Create Station"
          values={values}
          url="/region/"
          open={open}
          onClose={() => setOpen(false)}
          refetch={refetch}
        />
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
              <RegionCards
                key={el?.id}
                {...el}
                handleDelete={handleDelete}
                flyToRegion={flyToRegion}
                onClose={() => setShowSelectedRegions(false)}
                setIsActiveRegion={setIsActiveRegion}
                isActiveRegion={isActiveRegion}
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

export default Regions;
