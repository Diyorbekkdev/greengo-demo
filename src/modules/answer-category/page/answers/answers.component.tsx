import { hoc } from "@/utils";
import { useAnswersProps } from "@/modules/answer-category/page/answers/answers.props.tsx";
import { CustomPagination, Header } from "@/components";
import { Table } from "antd";
import { get } from "lodash";
import { AnswerModal } from "@/modules/answer-category/components/answer.modal.tsx";
import { MessageFilled } from "@ant-design/icons";

export const Answers = hoc(useAnswersProps, ({data, isLoading, columns, SetRouterQuery, GetRouterQuery, values, open, setOpen,expandedRowRender
         ,onAdd   ,                               })=> {


  return (
    <div>
       <Header title='Answers' isButton={true} icon={<MessageFilled/>} type='primary' buttonText='Create answer' onAdd={onAdd}/>
      <div className="mt-4">
        <Table
          loading={isLoading}
          className="shadow-md font-semibold"
          dataSource={data?.answers || []}
          columns={columns}
          pagination={false}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ['0'],
          }}
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
      <AnswerModal  url={'answer'} open={open} placement='top' values={values} modalTitle='Create answer' onClose={()=> setOpen(false)}/>
    </div>
  )
})