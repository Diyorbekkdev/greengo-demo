import { FormContainer, MainInput, MainRadio } from "@/components";
import { Button,  Modal, message } from "antd"

import { FastField } from "formik";
import { get } from "lodash";
import { useAnswersCategoriesProps } from "@/modules/answer-category/page/answers-categories.props.tsx";
import { DeleteOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface IMainModal {
  placement: 'top' | 'right' | 'bottom' | 'left';
  open: boolean;
  onClose: () => void;
  closable?: boolean;
  modalTitle?: string;
  url: string;
  values: any;
}

export const AnswerCategoriesModal = (props: IMainModal) => {
  const navigate = useNavigate();
  const { placement, onClose, open, closable, modalTitle, url, values } = props
  const { refetch, handleDelete } = useAnswersCategoriesProps();

  return (
    <Modal
      title={modalTitle}
      closable={closable}
      onCancel={onClose}
      open={open}
      key={placement}
      footer={false}
    >
      <FormContainer
        method={get(values, 'id') ? 'put' : 'post'}
        url={get(values, 'id') ? `${url}/${values?.id}` : url + '/'}
        onSuccess={() => {
          message.success(!get(values, 'id') ? 'Category created successfully' : "Category updated successfully");
          onClose();
          refetch();
        }}
        onError={(err) => {
          console.log(err);
          message.success(err)

        }}
        fields={[
          {
            name: "nameUz",
            validations: [{ type: "required" }],
            value: get(values, "nameUz"),
            onSubmitValue: (value) => value,
          },
          {
            name: "nameRu",
            validations: [{ type: "required" }],
            value: get(values, "nameRu"),
            onSubmitValue: (value) => value,
          },
          {
            name: "nameEn",
            validations: [{ type: "required" }],
            value: get(values, "nameEn"),
            onSubmitValue: (value) => value,
          },
          {
            name: "position",
            validations: [{ type: "required" }],
            value: get(values, "position"),
            onSubmitValue: (value) => value,
          },
          {
            name: "isActive",
            validations: [{ type: "required" }],
            value: get(values, "isActive"),
            onSubmitValue: (value) => value,
          },
        ]}
      >
        {({ isSubmitting }) => {
          return (
            <div className="flex flex-col gap-2.5">
              <div>
                <FastField
                  name="nameUz"
                  component={MainInput}
                  placeholder="Answer Category Name uz"
                  label="Category Name Uz"
                  isPhone={false}
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div>
                <FastField
                  name="nameEn"
                  component={MainInput}
                  placeholder="Answer Category Name En"
                  label="Category Name En"
                  isPhone={false}
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div>
                <FastField
                  name="nameRu"
                  component={MainInput}
                  placeholder="Answer Category Name Ru"
                  label="Category Name Ru"
                  isPhone={false}
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div>
                <FastField
                  name="position"
                  component={MainInput}
                  placeholder="Position"
                  label="Position"
                  isPassword={false}
                  type="number"
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div>
                <FastField
                  name="isActive"
                  component={MainRadio}
                  placeholder="Is Active"
                  label="Is Active"
                  isPhone={false}
                  labelClass="text-base text-primary font-semibold"
                  options={[
                    { value: true, label: 'Active' },
                    { value: false, label: "Not Active" },
                  ]}
                />
              </div>
              <div className='flex items-center mt-4 gap-2'>
                <Button
                  htmlType="button"
                  size="large"
                  type="dashed"
                  className="w-full"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                {get(values, 'id')  && <Button
                  htmlType="button"
                  size="large"
                  type="dashed"
                  danger
                  className=""
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(get(values, "id"))}
                >
                  Delete
                </Button>}
                <Button
                  htmlType="button"
                  size="large"
                  type="dashed"
                  className=""
                  icon={<EyeOutlined/>}
                  onClick={()=> navigate(`/answers-categories/${get(values, 'id') }`)}
                >
                  Answers
                </Button>
                <Button
                  htmlType="submit"
                  size="large"
                  loading={isSubmitting}
                  type="primary"
                  className=" "
                  icon={<PlusCircleOutlined/>}
                >
                  <span className="text-white">{get(values, 'id') ? "Saved" : "Create"}</span>
                </Button>
              </div>
            </div>
          );
        }}
      </FormContainer>
    </Modal>
  )
}