import { FormContainer, MainInput, MainRadio, MainTextArea } from "@/components";
import { Button, Modal, message } from "antd"

import { FastField } from "formik";
import { get } from "lodash";
import { useTariffProps } from "../page/tarif.props";


interface IMainModal {
    placement: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    onClose: () => void;
    closable?: boolean;
    modalTitle: string;
    url: string;
    values: any;
}

export const TariffModal = (props: IMainModal) => {
    const { placement, onClose, open, closable, modalTitle, url, values } = props
    const { refetch } = useTariffProps();

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
                url={get(values, 'id') ? `${url}/${values?.id}` : url}
                onSuccess={() => {
                    message.success(!get(values, 'id') ? 'Tariff created successfully' : "Tariff updated successfully");
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
                        name: "descriptionUz",
                        // validations: [{ type: "required" }],
                        value: get(values, "descriptionUz"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "activateCount",
                        validations: [{ type: "required" }],
                        value: get(values, "activateCount"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "freeMinute",
                        validations: [{ type: "required" }],
                        value: get(values, "freeMinute"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "isActive",
                        // validations: [{ type: "required" }],
                        value: get(values, "isActive"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "isDefault",
                        // validations: [{ type: "required" }],
                        value: get(values, "isDefault"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "pricePerMinute",
                        validations: [{ type: "required" }],
                        value: get(values, "pricePerMinute"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "regionId",
                        validations: [{ type: "required" }],
                        value: get(values, "regionId"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "startMinute",
                        validations: [{ type: "required" }],
                        value: get(values, "startMinute"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "reservedAmount",
                        validations: [{ type: "required" }],
                        value: get(values, "reservedAmount"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "type",
                        validations: [{ type: "required" }],
                        value: get(values, "type"),
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
                                    placeholder="Tariff name"
                                    label="Tariff name"
                                    isPhone={false}
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="categoryId"
                                    component={MainInput}
                                    placeholder="Select Category"
                                    label="Select Category"
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
                                    labelClass="text-base text-primary font-semibold"
                                    options={[
                                        { value: 'option1', label: 'Option 1' },
                                        { value: 'option2', label: 'Option 2' },
                                        // Add more options as needed
                                    ]}
                                />
                            </div>
                            <div>
                                <FastField
                                    name="isDefault"
                                    component={MainRadio}
                                    placeholder="Is Default"
                                    label="Is Default"
                                    labelClass="text-base text-primary font-semibold"
                                    options={[
                                        { value: 'option1', label: 'Option 1' },
                                        { value: 'option2', label: 'Option 2' },
                                        // Add more options as needed
                                    ]}
                                />
                            </div>
                            <div>
                                <FastField
                                    name="regionId"
                                    component={MainInput}
                                    placeholder="Region ID"
                                    label="Region ID"
                                    labelClass="text-base text-primary font-semibold"

                                />
                            </div>
                            <div>
                                <FastField
                                    name="activateCount"
                                    component={MainInput}
                                    placeholder="Enter active count"
                                    label="Active count"
                                    isPassword={false}
                                    type="number"
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="freeMinute"
                                    component={MainInput}
                                    placeholder="Enter Free minute"
                                    label="Active count"
                                    isPassword={false}
                                    type="number"
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="pricePerMinute"
                                    component={MainInput}
                                    placeholder="Price per minute"
                                    label="Price per minute"
                                    isPassword={false}
                                    type="number"
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="reservedAmount"
                                    component={MainInput}
                                    placeholder="Reversed Amount"
                                    label="Reversed Amount"
                                    isPassword={false}
                                    type="number"
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="startMinute"
                                    component={MainInput}
                                    placeholder="Start minute"
                                    label="Start minute"
                                    isPassword={false}
                                    type="number"
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="type"
                                    component={MainInput}
                                    placeholder="Enter type"
                                    label="Tariff type"
                                    isPassword={false}
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="descriptionUz"
                                    component={MainTextArea}
                                    placeholder="Description"
                                    label="Tariff description"
                                    isPassword={false}
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <Button
                                htmlType="submit"
                                size="large"
                                loading={isSubmitting}
                                type="primary"
                                className="w-full bg-primary"
                            >
                                <span className="text-white">{get(values, 'id') ? "Saved" : "Create"}</span>
                            </Button>
                        </div>
                    );
                }}
            </FormContainer>
        </Modal>
    )
}