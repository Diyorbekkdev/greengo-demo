import { hoc } from "@/utils";
import { useBikeStatusProps } from "./bike-status.props";
import { CustomPagination, Header } from "@/components";
import { Table } from "antd";
import { get } from "lodash";

export const BikeStatus = hoc(useBikeStatusProps, ({
    columns,
    data,
    isLoading,
    onAdd,
    GetRouterQuery,
    SetRouterQuery,
    handleRowClick
}) => {
    return (
        <div>
            <Header title="Bicycle list" isButton={false} isSearch={true} type="primary" onAdd={onAdd} />
            <div className="mt-4">
                <Table
                    loading={isLoading}
                    className="shadow-md font-semibold"
                    dataSource={data?.bicycles || []}
                    columns={columns}
                    pagination={false}
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                    })}
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
        </div>
    )
})