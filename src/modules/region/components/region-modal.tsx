import { FormContainer, MainInput, MainRadio } from "@/components";
import { Button, Modal, message } from "antd";

import { FastField } from "formik";
import { get } from "lodash";
interface IMainModal {
  placement?: "top" | "right" | "bottom" | "left";
  open: boolean;
  onClose: () => void;
  closable?: boolean;
  modalTitle: string;
  url: string;
  values: any;
  refetch: any;
}

export const RegionModal = (props: IMainModal) => {
  const {
    placement,
    onClose,
    open,
    closable,
    modalTitle,
    url,
    values,
    refetch,
  } = props;

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
        method={get(values, "id") ? "put" : "post"}
        url={get(values, "id") ? `${url}/${values?.id}` : url}
        onSuccess={() => {
          message.success(
            !get(values, "id")
              ? "Region created successfully"
              : "Region updated successfully"
          );
          onClose();
          refetch();
        }}
        customData={{
          latitude: get(values, "lat"),
          longitude: get(values, "long"),
        }}
        onError={(err) => {
          console.log(err);
          message.success(err);
        }}
        fields={[
          {
            name: "name",
            validations: [{ type: "required" }],
            value: get(values, "name"),
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
                  name="name"
                  component={MainInput}
                  placeholder="Region name"
                  label="Region name"
                  isPhone={false}
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div>
                <FastField
                  name="isActive"
                  component={MainRadio}
                  placeholder="Region name"
                  label="Is Active"
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "Not Active" },
                  ]}
                  isPhone={false}
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div className="flex items-center gap-4 justify-end mt-4">
                <Button
                  htmlType="button"
                  size="large"
                  type="default"
                  onClick={onClose}
                >
                  <span className="text-black">Cancel</span>
                </Button>
                <Button
                  htmlType="submit"
                  size="large"
                  loading={isSubmitting}
                  type="primary"
                  className=" bg-primary"
                >
                  <span className="text-white">
                    {get(values, "id") ? "Saved" : "Create"}
                  </span>
                </Button>
              </div>
            </div>
          );
        }}
      </FormContainer>
    </Modal>
  );
};
