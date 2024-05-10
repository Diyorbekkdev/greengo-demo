import { FormContainer, MainInput, MainSelect } from "@/components";
import { Button,  Modal, message } from "antd"

import { FastField } from "formik";
import { get } from "lodash";
import { useCategoryProps } from "../page/category.props";
import ImgUpload from "@/components/image-upload";
interface IMainModal {
    placement: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    onClose: () => void;
    closable?: boolean;
    modalTitle: string;
    url: string;
    values: any;
}

export const CategorModal = (props: IMainModal) => {
    const { placement, onClose, open, closable, modalTitle, url, values } = props
    const { refetch } = useCategoryProps();

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
                        name: "type",
                        validations: [{ type: "required" }],
                        value: get(values, "type"),
                        onSubmitValue: (value) => value,
                    },
                    {
                        name: "image_file",
                        value: get(values, "image_file"),
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
                                    placeholder="Category Name uz"
                                    label="Category Name"
                                    isPhone={false}
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="nameEn"
                                    component={MainInput}
                                    placeholder="Category Name En"
                                    label="Category Name"
                                    isPhone={false}
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="nameRu"
                                    component={MainInput}
                                    placeholder="Category Name Ru"
                                    label="Category Name"
                                    isPhone={false}
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="type"
                                    component={MainSelect}
                                    placeholder="Type"
                                    label="Type"
                                    isPassword={false}
                                    url='bicycle'
                                    labelClass="text-base text-primary font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                  name="image_file"
                                  component={ImgUpload}
                                  placeholder="Type"
                                  label="Type"
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