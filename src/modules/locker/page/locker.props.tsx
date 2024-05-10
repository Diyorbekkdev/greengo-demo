import { useState } from "react";
import { useFetchQuery, useRouterQuery } from "@/hooks";
import { IAnswerCategories } from "@/modules/answer-category/model/answer-categories.model.ts";
import { Button, message, Modal, TableProps, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { httpClient } from "@/utils";
import dayjs from "dayjs";
import { Typography } from "antd";

const { Paragraph } = Typography;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string,
  tags: string[];
}
export const useLockerProps = () => {
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<IAnswerCategories>();
  const { data, isLoading, refetch } = useFetchQuery({
    url: "locker",
  });
  const onAdd = () => {
    setOpen(true);
    setValues(undefined);
  };
  const handleEdit = (data: IAnswerCategories) => {
    setOpen(true);
    setValues(data);
  };
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this simcard?",
      icon: <DeleteOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await httpClient.delete(`locker/${id}`);
          message.success("Simcard deleted successfully");
          setOpen(false);
          refetch();
        } catch (error) {
          message.error("Failed to delete simcard");
        } finally {
          setOpen(false);
        }
      },
    });
  };
  //columns
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "IMEI",
      dataIndex: "imei",
      key: "imei",
      render: (data) => {
        return (
          <Paragraph copyable className="font-bold">
            {data}
          </Paragraph>
        );
      },
    },
    {
      title: "Simcard",
      dataIndex: "simcard",
      key: "simcard",
      render: (data) => {
        return <span>{data?.simcard}</span>;
      },
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      render: (data) => {
        return <span>{data} %</span>;
      },
    },
    {
      title: "Voltage",
      dataIndex: "voltage",
      key: "voltage",
      render: (data) => {
        return <span>{data}</span>;
      },
    },
    {
      title: "Sate",
      dataIndex: "sate",
      key: "sate",
      render: (data) => {
        return <span>{data}</span>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (data) => {
        return (
          <div>
            <Tag color={data?.isActive ? "green" : "red"}>
              {data?.isActive ? "Active" : "No Active"}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        return dayjs(date).format("YYYY-MM-DD, HH:mm");
      },
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => {
        return date
          ? dayjs(date).format("YYYY-MM-DD, HH:mm")
          : "Not updated yet";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (data) => {
        return (
          <div>
            <div style={{ textAlign: "center" }}>
              {/*<CustomDropdown*/}
              {/*  onClickEdit={() =>{}}*/}
              {/*  onClickDelete={() => {}}*/}
              {/*  onClickInfo={() => {}}*/}
              {/*/>*/}
              <Button onClick={() => handleEdit(data)} icon={<EditOutlined />}>
                Update
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  const expandedRowRender = (record: any) => {
    return (
      <p className="text-green">
        Message:{" "}
        <span className="italic text-primary">{record?.descriptionUz}</span>
      </p>
    );
  };

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
    handleDelete,
    expandedRowRender,
  };
};

// {
//   "id": 1,
//   "imei": 860537062636022,
//   "simcard": null,
//   "simcardId": 0,
//   "percent": 0,
//   "voltage": 320,
//   "qrCode": "",
//   "signal": 21,
//   "sate": 0,
//   "isConnected": false,
//   "alarmStatus": 0,
//   "isLocked": false,
//   "locationInterval": 0,
//   "point": {
//   "longitude": 69.238833,
//     "latitude": 41.282832
// },
//   "isTracking": false,
//   "isActive": true,
//   "isDeleted": false,
//   "lastLocation": "2024-03-27T18:26:44.861704+05:00",
//   "lastConnection": "2024-03-29T09:04:02.651576+05:00",
//   "lastAlarm": null,
//   "created": null,
//   "createdAt": "2024-03-06T18:42:49.491692+05:00",
//   "updated": null,
//   "updatedAt": "2024-03-29T09:04:02.653253+05:00",
//   "deleted": null,
//   "deletedAt": null
// },
