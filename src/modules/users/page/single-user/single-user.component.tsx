import { hoc } from "@/utils";
import { SingleUserProps } from "./single-user.props";
import { Descriptions, Spin, Table, Tabs, TabsProps } from "antd";
import { get } from "lodash";
import { CustomPagination, Header } from "@/components";

export const SingleUser = hoc(
  SingleUserProps,
  ({
    userData,
    isLoading,
    userRidesData,
    columns,
    GetRouterQuery,
    SetRouterQuery,
    userTransData,
    userTransIsLoad,
    columnsTrans,
  }) => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "User Rides",
        children: (
          <div>
            <Table
              loading={userRidesData?.isLoading}
              className="shadow-md font-semibold"
              dataSource={userRidesData?.data?.rides || []}
              columns={columns}
              pagination={false}
            />
            {get(userRidesData?.data, "count") > 1 && (
              <div className="text-center mt-3 bg-white shadow-md p-4 flex items-center justify-center rounded-md">
                <CustomPagination
                  total={get(userRidesData?.data, "count")}
                  onPageChange={(value) => {
                    SetRouterQuery({ ...GetRouterQuery(), page: value });
                  }}
                  pageSize={get(userRidesData?.data, "pageSize")}
                  current={get(userRidesData?.data, "page")}
                />
              </div>
            )}
          </div>
        ),
      },
      {
        key: "2",
        label: "User Transactions",
        children: (
          <div>
            <Table
              loading={userTransIsLoad}
              className="shadow-md font-semibold"
              dataSource={userTransData?.userTransactions || []}
              columns={columnsTrans}
              pagination={false}
              // onRow={(record) => ({
              //   onClick: (event) => handleRowClick(record, event),
              // })}
            />
            {get(userTransData, "count") > 1 && (
              <div className="text-center mt-3 bg-white shadow-md p-4 flex items-center justify-center rounded-md">
                <CustomPagination
                  total={get(userTransData, "count")}
                  onPageChange={(value) => {
                    SetRouterQuery({ ...GetRouterQuery(), page: value });
                  }}
                  pageSize={get(userTransData, "pageSize")}
                  current={get(userTransData, "page")}
                />
              </div>
            )}
          </div>
        ),
      },
    ];

    console.log(userTransData);

    return isLoading ? (
      <div className="w-full h-full flex justify-center items-center">
        <Spin size="large" />
      </div>
    ) : (
      <div>
        <Header title="Single user" isButton={false} type="primary" />

        <div className="flex w-full g-3 mt-4">
          <div className="w-1/3 flex justify-center">
            <img
              src={`${
                userData?.img
                  ? userData?.img
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW6hmwoTYquPrdYd_DfDFnXxsM8RBTm4GvNLla16kpEg&s"
              }`}
              alt="user img"
            />
          </div>
          <Descriptions title="User Info" bordered>
            <Descriptions.Item label="Name">{userData?.name}</Descriptions.Item>

            <Descriptions.Item label="Phone">
              {userData?.phone}
            </Descriptions.Item>

            <Descriptions.Item label="Balance">
              {userData?.balance}
            </Descriptions.Item>

            <Descriptions.Item label="Last Visit">
              {userData?.lastVisit.split("T")[0] + " "}
              {userData?.lastVisit.split("T")[1].split(".")[0]}
            </Descriptions.Item>

            <Descriptions.Item label="CreatedAt">
              {userData?.createdAt.split("T")[0] + " "}
              {userData?.createdAt.split("T")[1].split(".")[0]}
            </Descriptions.Item>
          </Descriptions>
        </div>

        <Tabs defaultActiveKey="1" items={items} />
      </div>
    );
  }
);
