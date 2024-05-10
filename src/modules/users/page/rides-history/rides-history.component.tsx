import { hoc } from "@/utils";
import { useRidesHistoryProps } from "./rides-history.props";
import { CustomPagination, Header } from "@/components";
import { Table } from "antd";
import { get } from "lodash";

export const RidesHistory = hoc(
  useRidesHistoryProps,
  ({ data, columns, isLoading, GetRouterQuery, SetRouterQuery }) => {
    return (
      <div>
        <Header
          title="Rides history"
          type="primary"
          isButton={false}
          isSelect={false}
        />
        <div className="mt-4">
          <Table
            loading={isLoading}
            className="shadow-md font-semibold"
            dataSource={data?.rides || []}
            columns={columns}
            pagination={false}
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
      </div>
    );
  }
);
