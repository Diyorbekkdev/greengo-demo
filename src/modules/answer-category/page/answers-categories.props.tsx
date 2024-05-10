import { useFetchQuery, useRouterQuery } from "@/hooks";
import { Button, message, Modal, TableProps, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { IAnswerCategories } from "@/modules/answer-category/model/answer-categories.model.ts";
import { httpClient } from "@/utils";
import { useParams } from "react-router-dom";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
export const useAnswersCategoriesProps = () => {
  const {GetRouterQuery, SetRouterQuery} = useRouterQuery();
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<IAnswerCategories>();
  const {data, isLoading, refetch} = useFetchQuery({
      url: 'answer/category/'
  })
  const onAdd = () => {
      setOpen(true);
      setValues(undefined)
  }
  const handleEdit = (data: IAnswerCategories) => {
      setOpen(true);
      setValues(data);
  }
  const handleDelete = (categoryId: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category ?',
      icon: <DeleteOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await httpClient.delete(`answer/category/${categoryId}`);
          message.success('Category deleted successfully');
          setOpen(false);
          refetch();
        } catch (error) {
          message.error('Failed to delete category');
        }finally {
          setOpen(false);
        }
      },
    });
  };
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Category Name',
      dataIndex: 'nameUz',
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Status',
      key: 'status',
      render: (data) => {
        return (
          <div>
            <Tag color={data?.isActive ? 'green' : 'red'}>{data?.isActive ? 'Active' : "Deleted"}</Tag>
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
              <Button onClick={() => handleEdit(data)} icon={<EditOutlined/>}>Edit</Button>
            </div>
          </div>
        )
      }
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
      handleDelete,
      slug,
  };
}