import { hoc } from "@/utils";
import { CustomPagination, Header } from "@/components";
import { Table } from "antd";
import { get } from "lodash";
import { useBicycleProps } from "./bicycle.props";
import { BicyleModal } from "../../components/bicycle-moda";

const Bicycle = hoc(
  useBicycleProps,
  ({
    isLoading,
    data,
    onAdd,
    SetRouterQuery,
    GetRouterQuery,
    setOpen,
    values,
    columns,
    open,
    handleRowClick,
    selectOptions,
    isRegionLoading,
  }) => {
    return (
      <div>
        <Header
          title="Bicycle"
          isSearchType="multiSearch"
          isSearch={true}
          isSelect={true}
          options={selectOptions}
          isLoading={isRegionLoading}
          placeholder={"Select region"}
          buttonText="Add Bicycle"
          type="primary"
          onAdd={onAdd}
        />
        <div className="mt-4">
          <Table
            loading={isLoading}
            className="shadow-md font-semibold"
            dataSource={data?.bicycles || []}
            columns={columns}
            pagination={false}
            onRow={(record) => ({ onClick: () => handleRowClick(record) })}
          />
        </div>
        {get(data, "count") > 1 && (
          <div className="text-center mt-3 bg-white shadow-md p-4 flex items-center justify-center rounded-md">
            <CustomPagination
              total={get(data, "count")}
              onPageChange={(value) => {
                SetRouterQuery({ ...GetRouterQuery(), page: value });
              }}
              pageSize={get(data, "pageSize")}
              current={get(data, "page")}
            />
          </div>
        )}
        <BicyleModal
          modalTitle="Create bicycle"
          open={open}
          onClose={() => setOpen(false)}
          placement="right"
          values={values}
          url="bicycle/"
        />
      </div>
    );
  }
);

export default Bicycle;
