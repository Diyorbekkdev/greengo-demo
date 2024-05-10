import { hoc, httpClient } from "@/utils";
import { useOffertaProps } from "./public-offerta.props";
import { FormContainer, Header } from "@/components";
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { get } from "lodash";
import TextEditor from "@/components/form/editor";
import { FastField } from "formik";
import { PlusCircleOutlined } from "@ant-design/icons";

export const PublicOfferta = hoc(useOffertaProps, ({ data }) => {
    const [values, setValue] = useState('');


    console.log(data);
    const getValues = async () => {
        try {
            const { data } = await httpClient('/public/')
            setValue(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getValues()
    }, [])

    return (
        <div>
            <Header title="Public Offerta" buttonText="Add Offerta" type="primary" />
            <div className="mt-5 relative z-[99]">
                <FormContainer
                    method={'post'}
                    url={"/public/"}
                    onSuccess={() => {
                        message.success(!get(values, 'id') ? 'Category created successfully' : "Category updated successfully");
                        getValues()
                    }}
                    onError={(err) => {
                        console.log(err);
                        message.success(err)

                    }}
                    fields={[
                        {
                            name: "text",
                            validations: [{ type: "required" }],
                            value: get(values, "text"),
                            onSubmitValue: (value) => value,
                        },
                    ]}
                >
                    {({ isSubmitting }) => {
                        return (
                            <div className="flex flex-col gap-2.5">
                                <div>
                                    <FastField
                                        name="text"
                                        component={TextEditor}
                                        placeholder="90 766 1770"
                                        label=""
                                        isPhone={true}
                                        labelClass="text-base text-primary font-semibold"
                                    />
                                </div>
                                <div className='flex items-center mt-4 gap-2 justify-end'>
                                    <Button
                                        htmlType="button"
                                        size="large"
                                        type="dashed"
                                        className=""
                                    >
                                        Cancel
                                    </Button>
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
            </div>
        </div>
    )
})