import { hoc } from "@/utils";
import { useSimcardProps } from "./simcard.props";
import { CustomPagination, Header } from "@/components";
import { Table } from "antd";
import { get } from "lodash";
import { SimcardModal } from "@/modules/simcard/components/simcard-modal.tsx";

export const Simcard = hoc(useSimcardProps, ({ data, GetRouterQuery, SetRouterQuery, isLoading, columns, open, setOpen, values, onAdd }) => {
  return (
    <div>
      <Header title='Simcard' isSearch={true} buttonText='Add simcard' type='primary' onAdd={onAdd} />
      <div className="mt-4">
        <Table
          loading={isLoading}
          className="shadow-md font-semibold"
          dataSource={data?.simcards || []}
          columns={columns}
          pagination={false}
        />
      </div>
      {get(data, 'count') > 1 && <div className="text-center mt-3 bg-white shadow-md p-4 flex items-center justify-center rounded-md">
        <CustomPagination
          total={get(data, 'count')}
          onPageChange={(value) => {
            SetRouterQuery({ ...GetRouterQuery(), page: value })
          }}
          pageSize={get(data, 'pageSize')}
          current={get(data, 'page')}
        />
      </div>}
      <SimcardModal placement='top' onClose={() => setOpen(false)} values={values} open={open} url='locker/simcard/' modalTitle="Create Simcard" />
    </div>
  )
})