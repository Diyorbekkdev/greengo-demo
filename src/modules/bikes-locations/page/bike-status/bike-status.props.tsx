import { useFetchQuery, useRouterQuery } from "@/hooks";
import { Modal, TableProps, Tag, message, Button, Tooltip } from "antd";
import {
  DeleteOutlined,
  PoweroffOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategory } from "@/modules/categories/model";
import { httpClient } from "@/utils";
import dayjs from "dayjs";
import { Typography } from "antd";
import { upperCase } from "lodash";

const { Paragraph } = Typography;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const useBikeStatusProps = () => {
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useFetchQuery({
    url: "bicycle/list/",
    params: {
      pageSize: 8,
      ...GetRouterQuery(),
    },
  });
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<ICategory>();

  const handleRowClick = (record: any) => {
    navigate(`/bikes-status/${record.id}`); // Redirect to the individual page with the ID
  };

  const onEdit = (values: ICategory, event: any) => {
    event.stopPropagation();
    setValues(values);
    setOpen(true);
    return false;
  };

  const onAdd = () => {
    setOpen(true);
    setValues(undefined);
  };

  const handleDelete = (categoryId: number, event: any) => {
    event.stopPropagation();
    Modal.confirm({
      title: "Are you sure you want to delete this bicycle ?",
      icon: <DeleteOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await httpClient.delete(`category/${categoryId}`);
          message.success("Bicycle deleted successfully");
          refetch();
        } catch (error) {
          message.error("Failed to delete bicycle");
        }
      },
    });
    return false;
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "id  ",
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
      title: "Commands",
      dataIndex: "",
      key: "commands",
      render: (data) => {
        const handleControlCommand = async (
          imei: string,
          type: number,
          event: any
        ) => {
          event.stopPropagation();
          try {
            const url = type === 1 ? "/locker/shutdown/" : "/locker/restart/";
            await httpClient({
              url,
              method: "PATCH",
              data: {
                imei: Number(imei),
              },
            });
            message.success(
              type === 1 ? "Bicycle is shut down" : "Bicycle is restarted"
            );
          } catch (error: any) {
            console.log(error);
            message.error(upperCase(error.response.data.message));
          }
        };
        console.log(data);

        return (
          <div className="flex items-center gap-2">
            <Tooltip placement="top" title={"Shutdown"}>
              <Button
                type="primary"
                icon={<PoweroffOutlined />}
                loading={false}
                disabled={data.type === 0}
                onClick={(event) => handleControlCommand(data?.imei, 1, event)}
              />
            </Tooltip>
            <Tooltip placement="top" title={"Restart"}>
              <Button
                type="primary"
                icon={<UndoOutlined />}
                loading={false}
                onClick={(event) => handleControlCommand(data?.imei, 2, event)}
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Bicycle Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Bicycle QR Code",
      dataIndex: "",
      key: "qrCode",
      render: (data) => {
        return (
          <div>
            <Tag color="green">{data?.qrCode}</Tag>
          </div>
        );
      },
    },
    {
      title: "Alarm Status",
      key: "status",
      render: (data) => {
        return (
          <div>
            <Tag color="green">{data?.alarmStatus}</Tag>
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
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (data) => {
    //     return (
    //       <div onClick={(event) => event.preventDefault()}>
    //         <div className="flex items-center gap-2">
    //           <Button
    //             type="primary"
    //             icon={<EditOutlined />}
    //             onClick={(event) => onEdit(data, event)}
    //           ></Button>
    //           <Button
    //             type="default"
    //             icon={<DeleteOutlined />}
    //             danger
    //             onClick={(event) => handleDelete(data?.id, event)}
    //           ></Button>
    //         </div>
    //       </div>
    //     );
    //   },
    // },
  ];
  return {
    columns,
    data,
    isLoading,
    refetch,
    open,
    setOpen,
    values,
    onAdd,
    GetRouterQuery,
    SetRouterQuery,
    handleRowClick,
    onEdit,
    handleDelete,
  };
};
