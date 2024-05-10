import { hoc } from "@/utils";
import useAllUserProps from "@/modules/users/page/all-users/all-users.props.tsx";
import { CustomPagination, Header } from "@/components";
import { Table } from "antd";
import { get } from "lodash";

export const AllUsersComponent = hoc(
  useAllUserProps,
  ({
    data,
    columns,
    isLoading,
    GetRouterQuery,
    SetRouterQuery,
    handleRowClick,
  }) => {
    return (
      <div>
        <Header title="All users" isButton={false} type="primary" />
        <div className="mt-4">
          <Table
            loading={isLoading}
            className="shadow-md font-semibold"
            dataSource={data?.users || []}
            columns={columns}
            pagination={false}
            onRow={(record) => ({
              onClick: (event) => handleRowClick(record, event),
            })}
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
