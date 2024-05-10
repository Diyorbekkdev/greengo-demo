import { useFetchQuery, useRouterQuery } from "@/hooks";
// import { priceFormat } from "@/utils/price-format";
import { Image, TableProps, Typography } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const { Paragraph } = Typography;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const SingleUserProps = () => {
  const { userId } = useParams();
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();

  const { data, isLoading, refetch } = useFetchQuery({
    url: `user/${userId}`,
  });

  const userRidesData = useFetchQuery({
    url: `rides`,
    params: {
      userId: userId,
      ...GetRouterQuery(),
    },
  });

  const { data: userTransData, isLoading: userTransIsLoad } = useFetchQuery({
    url: "user/transaction/",
    params: {
      userId: userId,
      ...GetRouterQuery(),
    },
  });

  console.log(userTransData);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Id",
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url) => {
        return (
          <Image
            style={{ width: "50px" }}
            src={`http://80.90.188.12:9000/public/rides/${url}`}
          />
        );
      },
    },
    {
      title: "Bicycle",
      dataIndex: "bicycle",
      key: "bicycle",
      render: (data) => {
        return <p className="text-red-500">{data ? data : "No data"}</p>;
      },
    },
    {
      title: "Locker",
      dataIndex: "locker",
      key: "locker",
      render: (data) => {
        return <p className="text-red-500">{data ? data : "No data"}</p>;
      },
    },
    {
      title: "PriceMin",
      dataIndex: "pricePerMinute",
      key: "pricePerMinute",
    },
    {
      title: "PausePriceMin",
      dataIndex: "pausePricePerMinute",
      key: "pausePricePerMinute",
    },
    {
      title: "StartPrice",
      dataIndex: "startPrice",
      key: "startPrice",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "RidingTime",
      dataIndex: "ridingTime",
      key: "ridingTime",
    },
    {
      title: "PauseTime",
      dataIndex: "pauseTime",
      key: "pauseTime",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const columnsTrans: TableProps<DataType>["columns"] = [
    {
      title: "Id",
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (data) => {
        return <p className="text-red-500">{data ? data : "No data"}</p>;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Sum",
      dataIndex: "sum",
      key: "sum",
    },
    {
      title: "TransactionId",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (data) => {
        return <p className="text-red-500">{data ? data : "No data"}</p>;
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data) => {
        return dayjs(data).format("DD-MM-YYYY, HH:mm");
      },
    },
  ];

  return {
    userData: data,
    isLoading,
    refetch,
    userRidesData,
    columns,
    GetRouterQuery,
    SetRouterQuery,
    userTransData,
    userTransIsLoad,
    columnsTrans,
  };
};
