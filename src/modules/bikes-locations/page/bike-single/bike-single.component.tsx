import { hoc } from "@/utils";
import { useBikeSingleProps } from "./bike-single.props";
import { Descriptions, Spin } from "antd";
import { Header } from "@/components";

export const BikeSingle = hoc(useBikeSingleProps, ({ isLoading, data }) => {

  
  return isLoading ? (
    <div className="w-full h-full flex justify-center items-center">
      <Spin size="large" />
    </div>
  ) : (
    <div className="w-full">
      <Header title="Single Bike" isButton={false} type="primary" />

      <div className="flex gap-14 mt-4 w-full">
        <Descriptions title="Bike Info" bordered className="w-full">
          <Descriptions.Item label="Number">{data?.number}</Descriptions.Item>

          <Descriptions.Item label="QrCode">{data?.qrCode}</Descriptions.Item>

          <Descriptions.Item label="Region">{data?.region}</Descriptions.Item>
          <Descriptions.Item label="Category">
            {data?.category}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{data?.status}</Descriptions.Item>
          <Descriptions.Item label="Locker">{data?.locker}</Descriptions.Item>

          {/* <Descriptions.Item label="Last Visit">
              {data?.lastVisit.split("T")[0] + " "}
              {data?.lastVisit.split("T")[1].split(".")[0]}
            </Descriptions.Item>

            <Descriptions.Item label="CreatedAt">
              {data?.createdAt.split("T")[0] + " "}
              {data?.createdAt.split("T")[1].split(".")[0]}
            </Descriptions.Item> */}
        </Descriptions>
      </div>

      {/* <div>
          <Table
            loading={isLoading}
            className="shadow-md font-semibold"
            dataSource={data?.bicycles || []}
            columns={columns}
            pagination={false}
            onRow={(record) => ({
              onClick: (event) => handleRowClick(record, event),
            })}
          />
        </div> */}
    </div>
  );
});
