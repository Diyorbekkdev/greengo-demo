import { useState } from "react";
import { useFetchQuery, useRouterQuery } from "@/hooks";
import { IAnswerCategories } from "@/modules/answer-category/model/answer-categories.model.ts";
import { Button, message, Modal, TableProps, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { httpClient } from "@/utils";
import dayjs from "dayjs";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
export const useSimcardProps = () => {
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<IAnswerCategories>();
  const { data, isLoading, refetch } = useFetchQuery({
    url: 'locker/simcard/'
  })

  const { data: available } = useFetchQuery({
    url: '/region/available/?withDelete=true'
  })
  console.log(available)
  const onAdd = () => {
    setOpen(true);
    setValues(undefined)
  }
  const handleEdit = (data: IAnswerCategories) => {
    setOpen(true);
    setValues(data);
  };
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this simcard?',
      icon: <DeleteOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await httpClient.delete(`locker/simcard/${id}`);
          message.success('Simcard deleted successfully');
          setOpen(false);
          refetch();
        } catch (error) {
          message.error('Failed to delete simcard');
        } finally {
          setOpen(false);
        }
      },
    });
  };
  //columns
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Created By',
      dataIndex: 'created',
      key: 'created',
      render: (data) => {
        return <Tag color='green'>{data?.firstName + " " + data?.lastName}</Tag>
      }
    },
    {
      title: 'Simcard',
      dataIndex: 'simcard',
      key: 'simcard',
    },
    {
      title: 'Last Refill Date',
      dataIndex: 'lastRefill',
      key: 'lastRefill',
      render: (data) => {
        return <Tag color='green'>{dayjs(data).format("YYYY:DD:MM, HH:mm")}</Tag>
      }
    },
    {
      title: 'Status',
      key: 'status',
      render: (data) => {
        return (
          <div>
            <Tag color={data?.isActive ? 'green' : 'red'}>{data?.isActive ? 'Active' : "No Active"}</Tag>
          </div>
        )
      }
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => {
        return dayjs(date).format('YYYY-MM-DD, HH:mm')
      }
    },
    {
      title: 'Updated Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => {
        return date ? dayjs(date).format('YYYY-MM-DD, HH:mm') : 'Not updated yet'
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (data) => {
        return (
          <div>
            <div style={{ textAlign: "center" }}>
              {/*<CustomDropdown*/}
              {/*  onClickEdit={() =>{}}*/}
              {/*  onClickDelete={() => {}}*/}
              {/*  onClickInfo={() => {}}*/}
              {/*/>*/}
              <Button onClick={() => handleEdit(data)} icon={<EditOutlined />}>Update</Button>
            </div>
          </div>
        )
      }
    },
  ];
  const expandedRowRender = (record: any) => {
    return (
      <p className='text-green'>Message: <span className='italic text-primary'>{record?.descriptionUz}</span></p>
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
  }
}