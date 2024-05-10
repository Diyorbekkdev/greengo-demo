import { useFetchQuery, useRouterQuery } from "@/hooks";
import { Button, Modal, TableProps, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ICategory } from "../../model";
import { httpClient } from "@/utils";
import dayjs from "dayjs";
import { useSearchAppParams } from "@/hooks/useSearchParam";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export const useBicycleProps = () => {
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getParams } = useSearchAppParams();
  const regionId = getParams("paramId");
  const [withDelete] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [values, setValues] = useState<ICategory>();

  //getting the bicycles
  const { data, isLoading, refetch } = useFetchQuery({
    url: "bicycle",
    params: {
      withDelete,
      categoryId: slug,
      pageSize: 8,
      regionId: regionId ?? "",
      ...GetRouterQuery(),
    },
  });

  const { data: regionData, isLoading: isRegionLoading } = useFetchQuery({
    url: "region",
    params: {
      all: true,
      withDelete: true,
    },
  });

  const selectOptions = regionData?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  useEffect(() => {
    refetch();
  }, [regionId]);

  const handleRowClick = (record: any) => {
    navigate(`/bikes-status/${record.id}`); // Redirect to the individual page with the ID
  };

  const onEdit = (values: ICategory, event: any) => {
    event.stopPropagation();
    setValues(values);
    setOpen(true);
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
  };
  const onAdd = () => {
    setOpen(true);
    setValues(undefined);
  };
  const getStatusDetails = (statusNumber: number) => {
    switch (statusNumber) {
      case 0:
        return { text: "Начал", color: "blue" };
      case 1:
        return { text: "Пауза", color: "orange" };
      case 2:
        return { text: "Завершил", color: "green" };
      default:
        return { text: "Unknown", color: "gray" };
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Bicycle number",
      dataIndex: "number",
      key: "number",
      render: (data) => {
        return <Tag color="green">{data}</Tag>;
      },
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      render: (data) => {
        return <span>{data?.name}</span>;
      },
    },
    {
      title: "Locker",
      dataIndex: "locker",
      key: "locker",
      render: (data) => {
        return (
          <div>
            <Tag>{data?.imei}</Tag>
          </div>
        );
      },
    },
    {
      title: "QR Code",
      dataIndex: "",
      key: "locker",
      render: (data) => {
        return (
          <div>
            <Tag>{data?.qrCode}</Tag>
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      render: (data) => {
        const statusDetails = getStatusDetails(data?.status);
        return (
          <div>
            <Tag color={statusDetails?.color}>{statusDetails?.text}</Tag>
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

  const { data: regions, isLoading: regionLoading } = useFetchQuery({
    url: "region",
  });
  const regionsData = regions?.map((el: any) => {
    return {
      values: el?.id,
      lable: el?.name,
    };
  });

  return {
    data,
    isLoading,
    refetch,
    open,
    setOpen,
    values,
    onAdd,
    SetRouterQuery,
    GetRouterQuery,
    columns,
    slug,
    regionsData,
    regionLoading,
    handleRowClick,
    selectOptions,
    isRegionLoading,
  };
};
