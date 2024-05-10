import { hoc } from "@/utils";
import { useLockerProps } from "./locker.props";
import { CustomPagination, Header } from "@/components";
import { Table } from "antd";
import { get } from "lodash";
import { LockerModal } from "@/modules/locker/components/locker-modal.tsx";

export const Locker = hoc(useLockerProps, ({ data, GetRouterQuery, SetRouterQuery, isLoading,columns, open , values, setOpen, onAdd,  }) => {
    return (
        <div>
            <Header title="Locker" buttonText="Add locker" type="primary" onAdd={onAdd}/>
          <div className="mt-4">
            <Table
              loading={isLoading}
              className="shadow-md font-semibold"
              dataSource={data?.lockers ||[]}
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
          <LockerModal placement='top' open={open} onClose={()=> setOpen(false)} url='locker/' values={values}/>
        </div>
    )
})