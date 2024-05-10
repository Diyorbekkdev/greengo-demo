import { FormContainer, MainInput, MainRadio, MainSelect } from "@/components";
import { Button, Modal, message } from "antd"

import { FastField } from "formik";
import { get } from "lodash";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useLockerProps } from "@/modules/locker/page/locker.props.tsx";
interface IMainModal {
  placement: 'top' | 'right' | 'bottom' | 'left';
  open: boolean;
  onClose: () => void;
  closable?: boolean;
  modalTitle?: string;
  url: string;
  values: any;
}

export const LockerModal = (props: IMainModal) => {
  const { placement, onClose, open, closable, url, values } = props
  const { refetch, handleDelete } = useLockerProps();

  return (
    <Modal
      title={get(values, 'id') ? "Edit Locker" : "Create Locker"}
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
          message.success(!get(values, 'id') ? 'Locker created successfully' : "Locker updated successfully");
          onClose();
          refetch();
        }}
        onError={(err) => {
          console.log(err);
          message.success(err)

        }}
        fields={[
          {
            name: "imei",
            validations: [{ type: "required" }],
            value: get(values, "imei"),
            onSubmitValue: (value) => value,
          },
          {
            name: "isActive",
            validations: [{ type: "required" }],
            value: get(values, "isActive"),
            onSubmitValue: (value) => value,
          },
          {
            name: "simcardId",
            validations: [{ type: "required" }],
            value: get(values, "simcardId"),
            onSubmitValue: (value) => value,
            // validationType: "object",
            // value: get(values, "simcard") ? {
            //   label: get(values, "simcard.simcard"),
            //   value: get(values, "simcard.id"),
            // } : null,
            // onSubmitValue: (value) => value.value,
          },

        ]}
      >
        {({ isSubmitting }) => {
          return (
            <div className="flex flex-col gap-2.5">
              <div>
                <FastField
                  name="imei"
                  component={MainInput}
                  placeholder="imei code"
                  label="imei"
                  isPhone={false}
                  type="number"
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div>
                <div>
                  <FastField
                    name="simcardId"
                    component={MainSelect}
                    placeholder="Select simcard"
                    label="Select simcard"
                    isPassword={false}
                    url="locker/simcard/"
                    labelClass="text-base text-primary font-semibold"
                  />
                </div>
              </div>
              <div>
                <FastField
                  name="isActive"
                  component={MainRadio}
                  placeholder=""
                  label="imei"
                  isPhone={false}
                  options={[
                    { value: true, label: 'Active' },
                    { value: false, label: "Not Active" },
                  ]}
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
                {get(values, 'id') && <Button
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
                  icon={<PlusCircleOutlined />}
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