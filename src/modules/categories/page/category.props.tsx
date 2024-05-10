import { useFetchQuery, useRouterQuery } from "@/hooks";
import { Avatar, Modal, TableProps, Tag, message, Button } from "antd";
import {
  AntDesignOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { httpClient } from "@/utils";
import { useState } from "react";
import { ICategory } from "../model";
import { useNavigate } from "react-router-dom";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const useCategoryProps = () => {
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<ICategory>();

  const { data, isLoading, refetch } = useFetchQuery({
    url: "category",
    params: {
      pageSize: 8,
      ...GetRouterQuery(),
    },
  });

  const handleRowClick = (record: any) => {
    navigate(`/category/${record.id}`); // Redirect to the individual page with the ID
  };

  const onEdit = (values: ICategory, event: any) => {
    event.stopPropagation();
    setValues(values);
    setOpen(true);
    return false;
  };

  const handleDelete = (categoryId: number, event: any) => {
    event.stopPropagation();
    Modal.confirm({
      title: "Are you sure you want to delete this category ?",
      icon: <DeleteOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await httpClient.delete(`category/${categoryId}`);
          message.success("Category deleted successfully");
          refetch();
        } catch (error) {
          message.error("Failed to delete category");
        }
      },
    });
    return false;
  };
  const onAdd = () => {
    setOpen(true);
    setValues(undefined);
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Category Image",
      dataIndex: "image",
      key: "image",
      render: () => {
        return <Avatar size="large" icon={<AntDesignOutlined />} />;
      },
    },
    {
      title: "Category Name",
      dataIndex: "nameUz",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      key: "status",
      render: (data) => {
        return (
          <div>
            <Tag color={data?.isActive ? "green" : "red"}>
              {data?.isActive ? "Active" : "Deleted"}
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
          <div onClick={(event) => event.preventDefault()}>
            <div className="flex items-center gap-2">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={(event) => onEdit(data, event)}
              ></Button>
              <Button
                type="default"
                icon={<DeleteOutlined />}
                danger
                onClick={(event) => handleDelete(data?.id, event)}
              ></Button>
            </div>
          </div>
        );
      },
    },
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
  };
};
