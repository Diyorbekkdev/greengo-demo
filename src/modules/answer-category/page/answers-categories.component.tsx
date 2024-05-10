import { hoc } from "@/utils";
import { useAnswersCategoriesProps } from "@/modules/answer-category/page/answers-categories.props.tsx";
import { CustomPagination, Header } from "@/components";
import { Table } from "antd";
import { get } from "lodash";
import { AnswerCategoriesModal } from "@/modules/answer-category/components/answer-category-modal.tsx";

export const AnswersCategories = hoc(useAnswersCategoriesProps, ({data, isLoading, columns,SetRouterQuery, GetRouterQuery, open, setOpen, values,onAdd})=> {
    return(
        <div>
          <Header title='Answers Category' buttonText='Add answer category' type='primary' onAdd={onAdd}/>
          <div className="mt-4">
            <Table
              loading={isLoading}
              className="shadow-md font-semibold"
              dataSource={data?.answerCategories || []}
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
          <AnswerCategoriesModal values={values} onClose={() => setOpen(false)}  url='answer/category' open={open} placement='top' closable={true} key={23}/>
        </div>
    )
})