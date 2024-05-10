import { FormContainer, MainInput, MainRadio, MainSelect } from "@/components";
import { Button, Modal, message } from "antd";

import { FastField } from "formik";
import { get } from "lodash";
import { useBicycleProps } from "../page/bicycle/bicycle.props";

interface IMainModal {
  placement: "top" | "right" | "bottom" | "left";
  open: boolean;
  onClose: () => void;
  closable?: boolean;
  modalTitle: string;
  url: string;
  values: any;
}

export const BicyleModal = (props: IMainModal) => {
  const { placement, onClose, open, closable, modalTitle, url, values } = props;
  const { slug } = useBicycleProps();
  const { refetch } = useBicycleProps();

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
        url={get(values, "id") ? `${url}${values?.id}` : url}
        onSuccess={() => {
          message.success(!get(values, "id") ? "Bicyle created successfully" : "Bicyle updated successfully");
          onClose();
          refetch();
        }}
        onError={(err) => {
          message.error(err);
        }}
        customData={{
          categoryId: Number(slug)
        }}
        fields={[
          {
            name: "number",
            validations: [{ type: "required" }],
            value: get(values, "number"),
            onSubmitValue: (value) => value
          },
          {
            name: "isActive",
            validations: [{ type: "required" }],
            value: get(values, "isActive"),
            onSubmitValue: (value) => value
          },
          {
            name: "isBroken",
            validations: [{ type: "required" }],
            value: get(values, "isBroken"),
            onSubmitValue: (value) => value
          },
          {
            name: "lockerId",
            validations: [{ type: "required" }],
            value: get(values, "lockerId"),
            onSubmitValue: (value) => value
          },
          {
            name: "regionId",
            validations: [{ type: "required" }],
            value: get(values, "regionId"),
            onSubmitValue: (value) => value
          },
          {
            name: "qrCode",
            validations: [{ type: "required" }],
            value: get(values, "qrCode"),
            onSubmitValue: (value) => value
          }
        ]}
      >
        {({ isSubmitting, values }) => {
          return (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FastField
                    name="number"
                    component={MainInput}
                    placeholder="Bicyle number"
                    label="Bicyle number"
                    isPhone={false}
                    labelClass="text-base text-primary font-semibold"
                  />
                </div>
                <div>
                  <FastField
                    name="lockerId"
                    component={MainSelect}
                    placeholder="lockerId"
                    label="lockerId"
                    url="locker"
                    isPassword={false}
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
                      { value: true, label: "Active" },
                      { value: false, label: "Not Active" }
                    ]}
                  />
                </div>
                <div>
                  <FastField
                    name="isBroken"
                    component={MainRadio}
                    placeholder="Is Broken"
                    label="Is Broken"
                    isPhone={false}
                    labelClass="text-base text-primary font-semibold"
                    options={[
                      { value: true, label: "Broken" },
                      { value: false, label: "Not Broken" }
                    ]}
                  />
                </div>
                <div>
                  <FastField
                    name="regionId"
                    component={MainSelect}
                    placeholder="Select region"
                    label="Select region"
                    isPassword={false}
                    url="region"
                    labelClass="text-base text-primary font-semibold"
                  />
                </div>
                <div>
                  <FastField
                    name="qrCode"
                    component={MainInput}
                    placeholder="QR code "
                    label="QR Code"
                    isPhone={false}
                    labelClass="text-base text-primary font-semibold"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 justify-end mt-4">
                <Button
                  htmlType="button"
                  size="large"
                  loading={isSubmitting}
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
                  <span className="text-white">{get(values, "id") ? "Saved" : "Create"}</span>
                </Button>
              </div>
            </>
          );
        }}
      </FormContainer>
    </Modal>
  );
};