import { useState } from "react";
import { useFetchQuery, useRouterQuery } from "@/hooks";
import { IAnswerCategories } from "@/modules/answer-category/model/answer-categories.model.ts";
import { Button, TableProps, Tag, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { priceFormat } from "@/utils/price-format";
import dayjs from "dayjs";
const { Paragraph } = Typography;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
export const useRidesHistoryProps = () => {
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<IAnswerCategories>();
  const { data, isLoading, refetch } = useFetchQuery({
    url: "rides",
  });

  const onAdd = () => {
    setOpen(true);
    setValues(undefined);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (data) => {
        return (
          <Paragraph copyable className="font-bold">
            {data}
          </Paragraph>
        );
      },
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (data) => {
        return <Paragraph className="font-bold">{data ?? "no user"}</Paragraph>;
      },
    },
    {
      title: "Bicycle",
      dataIndex: "bicycle",
      key: "bicycle",
      render: (data) => {
        return <span>{data ?? "No bicycle"}</span>;
      },
    },
    {
      title: "Locker",
      dataIndex: "locker",
      key: "locker",
      render: (data) => {
        return <span>{data ?? "No locker"}</span>;
      },
    },
    {
      title: "Start Price",
      dataIndex: "startPrice",
      key: "startPrice",
      render: (data) => {
        return <span>{priceFormat(data)} so'm</span>;
      },
    },
    {
      title: "Price per minute",
      dataIndex: "pricePerMinute",
      key: "pricePerMinute",
      render: (data) => {
        return <span>{priceFormat(data)} so'm</span>;
      },
    },
    {
      title: "Riding time",
      dataIndex: "ridingTime",
      key: "ridingTime",
      render: (data) => {
        return <span>{data}</span>;
      },
    },
    {
      title: "Pause time",
      dataIndex: "pauseTime",
      key: "pauseTime",
      render: (data) => {
        return <span>{data}</span>;
      },
    },
    {
      title: "Pause price per minute",
      dataIndex: "pausePricePerMinute",
      key: "pausePricePerMinute",
      render: (data) => {
        return <span>{priceFormat(data)} so'm</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data) => {
        return (
          <div>
            <Tag color={data ? "green" : "red"}>{data}</Tag>
          </div>
        );
      },
    },
    {
      title: "Start at",
      dataIndex: "startAt",
      key: "startAt",
      render: (date) => {
        return dayjs(date).format("YYYY-MM-DD, HH:mm");
      },
    },
    {
      title: "Finish at",
      dataIndex: "finishedAt",
      key: "finishedAt",
      render: (date) => {
        return date
          ? dayjs(date).format("YYYY-MM-DD, HH:mm")
          : "Not updated yet";
      },
    },
    {
      title: "Cordinates",
      key: "actions",
      render: () => {
        return (
          <div>
            <div className="flex items-center gap-2">
              {/*<CustomDropdown*/}
              {/*  onClickEdit={() =>{}}*/}
              {/*  onClickDelete={() => {}}*/}
              {/*  onClickInfo={() => {}}*/}
              {/*/>*/}
              <Button onClick={() => {}} icon={<EyeOutlined />}>
                See on the map
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  return {
    data,
    isLoading,
    GetRouterQuery,
    SetRouterQuery,
    columns,
    refetch,
    open,
    setOpen,
    values,
    setValues,
    onAdd,
  };
};
