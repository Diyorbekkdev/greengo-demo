import { FormContainer, MainInput, MainRadio } from "@/components";
import { Button, Modal, message } from "antd";

import { FastField } from "formik";
import { get } from "lodash";
import { useSearchAppParams } from "@/hooks/useSearchParam";
interface IMainModal {
  placement?: "top" | "right" | "bottom" | "left";
  open: boolean;
  onClose: () => void;
  closable?: boolean;
  modalTitle: string;
  url: string;
  values: any;
  defaultRegionId: string;
}

export const StationModal = (props: IMainModal) => {
  const { placement, onClose, open, closable, modalTitle, url, values } = props;
  // const { refetch } = useStationsProps();
  const { getParams } = useSearchAppParams();
  const regionId = getParams("paramId");

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
              ? "Station created successfully"
              : "Station updated successfully"
          );
          onClose();
          // refetch();
        }}
        customData={{
          latitude: get(values, "lat"),
          longitude: get(values, "long"),
          regionId: regionId ? Number(regionId) : null,
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
                  placeholder="Station name"
                  label="Station name"
                  isPhone={false}
                  labelClass="text-base text-primary font-semibold"
                />
              </div>
              <div>
                <FastField
                  name="isActive"
                  component={MainRadio}
                  placeholder="Station name"
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
