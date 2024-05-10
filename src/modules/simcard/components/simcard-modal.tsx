import { FormContainer, MainInput } from "@/components";
import { Button,  Modal, message } from "antd"

import { FastField } from "formik";
import { get } from "lodash";
import { DeleteOutlined,  PlusCircleOutlined } from "@ant-design/icons";
import MainDatePicker from "@/components/date-picker";
import { useSimcardProps } from "@/modules/simcard/page/simcard.props.tsx";
interface IMainModal {
  placement: 'top' | 'right' | 'bottom' | 'left';
  open: boolean;
  onClose: () => void;
  closable?: boolean;
  modalTitle?: string;
  url: string;
  values: any;
}

export const SimcardModal = (props: IMainModal) => {
  const { placement, onClose, open, closable, url, values } = props
  const { refetch, handleDelete } = useSimcardProps();

  return (
    <Modal
      title={get(values, 'id') ? "Edit Simcard" : "Create Simcard"}
      closable={closable}
      onCancel={onClose}
      open={open}
      key={placement}
      footer={false}
    >
      <FormContainer
        method={get(values, 'id') ? 'put' : 'post'}
        url={get(values, 'id') ? `${url}${values?.id}` : url}
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
            name: "simcard",
            validations: [{ type: "required" }],
            value: get(values, "simcard"),
            onSubmitValue: (value) => value,
          },
          {
            name: "lastRefill",
            validations: [{ type: "required" }],
            value: get(values, "lastRefill"),
            onSubmitValue: (value) => value,
          },

        ]}
      >
        {({ isSubmitting }) => {
          return (
            <div className="flex flex-col gap-2.5">
              <div>
                <FastField
                  name="simcard"
                  component={MainInput}
                  placeholder="90 766 1770"
                  label="Simcard"
                  isPhone={true}
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div>
                <FastField
                  name="lastRefill"
                  component={MainDatePicker}
                  placeholder="Last Refil Data"
                  label="Last Refil Data"
                  isPhone={false}
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div className='flex items-center mt-4 gap-2 justify-end'>
                <Button
                  htmlType="button"
                  size="large"
                  type="dashed"
                  className=""
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