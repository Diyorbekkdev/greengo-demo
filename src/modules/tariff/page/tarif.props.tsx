import { useFetchQuery, useRouterQuery } from "@/hooks";
import { CustomDropdown } from "@/modules/categories/components";
import { Modal, TableProps, Tag, message } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from "react";
import { httpClient } from "@/utils";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
export const useTariffProps = () => {
  const { GetRouterQuery, SetRouterQuery } = useRouterQuery()
  const [values, setValues] = useState(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch } = useFetchQuery({
    url: '/tariff',
    params: {
      ...GetRouterQuery()
    }
  })

  const onEdit = (values: any) => {
    setValues(values);
    setOpen(true);
  }

  const onAdd = () => {
    setOpen(true);
    setValues(null)

  }

  const handleDelete = (tariffId: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category ?',
      icon: <DeleteOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await httpClient.delete(`tarif/${tariffId}`);
          message.success('Tariff deleted successfully');
          refetch();
        } catch (error) {
          message.error('Failed to delete tariff:');
        }
      },
    });
  };
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'nameUz',
      key: 'nameUz',
      fixed: 'left',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      render: (region) => {
        return <span key={region}>{region ?? 'Regions not selected'}</span>
      }
    },
    {
      title: 'Categor',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Free Minute',
      dataIndex: 'freeMinute',
      key: 'freeMinute',
    },
    {
      title: 'Start Minute',
      dataIndex: 'startMinute',
      key: 'startMinute',
    },
    {
      title: 'Reversed Amount',
      dataIndex: 'reservedAmount',
      key: 'reservedAmount',
    },
    {
      title: 'Default',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (e) => {
        return <Tag color={e ? 'green' : 'red'}>{e ? 'Yes' : "No"}</Tag>
      }
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Activate Count',
      dataIndex: 'activateCount',
      key: 'activateCount',
    },
    {
      title: 'Active Days',
      dataIndex: 'activeDays',
      key: 'activeDays',
    },
    {
      title: 'Start Price',
      dataIndex: 'startPrice',
      key: 'startPrice',
    },
    {
      title: 'Price per minute',
      dataIndex: 'pricePerMinute',
      key: 'pricePerMinute',
    },
    {
      title: 'Pause price per minute',
      dataIndex: 'pausePricePerMinute',
      key: 'pausePricePerMinute',
    },
    {
      title: 'Description',
      dataIndex: 'descriptionUz',
      key: 'descriptionUz',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Tariff Times',
      dataIndex: 'tariffTimes',
      key: 'tariffTimes',
      render: (times) => {
        return <span key={times}>{times ?? 'Times not selected'}</span>
      }
    },
    {
      title: 'Status',
      key: 'status',
      render: (data) => {
        return (
          <div>
            <Tag color={data?.isActive && !data?.isDeleted ? 'green' : 'red'}>{data?.isActive && !data?.isDeleted ? 'Active' : "Deleted"}</Tag>
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
              <CustomDropdown
                onClickEdit={() => onEdit(data)}
                onClickDelete={() => handleDelete(data?.id)}
                onClickInfo={() => console.log('log')}
              />
            </div>
          </div>
        )
      }
    },
  ]


  return {
    data,
    GetRouterQuery,
    SetRouterQuery,
    isLoading,
    refetch,
    columns,
    values,
    open,
    setOpen,
    setValues,
    onAdd,
  };
}