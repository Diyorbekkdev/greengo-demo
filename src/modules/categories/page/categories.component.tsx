import { hoc } from "@/utils";
import { useCategoryProps } from "./category.props";
import { CustomPagination, Header } from "@/components";
import { Table } from "antd";
import { CategorModal } from "../components";
import { get } from "lodash";

const Category = hoc(useCategoryProps, ({ data, isLoading, columns, open,
    setOpen,
    values, onAdd, SetRouterQuery, GetRouterQuery, handleRowClick }) => {

    return (
        <div>
            <Header title="Category" buttonText="Add New Category" isSearch={true} type="primary" onAdd={onAdd} />
            <div className="mt-4">
                <Table
                    loading={isLoading}
                    className="shadow-md font-semibold"
                    dataSource={data?.categories || []}
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
            <CategorModal modalTitle="Create a new category" open={open} onClose={() => setOpen(false)} placement="right" values={values} url="category" />
        </div>
    )
})

export default Category