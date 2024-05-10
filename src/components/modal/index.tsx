import { Button, Drawer, message } from "antd"
import { FormContainer, MainInput } from "..";
import { FastField } from "formik";
interface IMainModal {
    placement: 'top' | 'right' | 'bottom' | 'left';
    open: boolean;
    onClose: () => void;
    closable?: boolean;
    modalTitle: string;
    url: string;
}

export const MainModal = (props: IMainModal) => {
    const { placement, onClose, open, closable, modalTitle, url } = props
    return (
        <Drawer
            title={modalTitle}
            placement={placement}
            closable={closable}
            onClose={onClose}
            open={open}
            key={placement}
        >
            <FormContainer
                method={"post"}
                url={url}
                onSuccess={() => {

                }}
                onError={(err) => {
                    console.log(err);
                    message.success(err)
                }}
                fields={[
                    {
                        name: "username",
                        validations: [{ type: "required" }],
                        value: "string",
                        onSubmitValue: () => 'string',
                    },
                    {
                        name: "password",
                        validations: [{ type: "required" }],
                        value: "string",
                        onSubmitValue: () => 'string',
                    },
                ]}
            >
                {({ isSubmitting }) => {
                    return (
                        <div className="flex flex-col gap-2.5">
                            <div>
                                <FastField
                                    name="username"
                                    component={MainInput}
                                    placeholder="User Name"
                                    label="Номер телефона"
                                    isPhone={false}
                                    labelClass="text-base text-[#603310] font-semibold"
                                />
                            </div>
                            <div>
                                <FastField
                                    name="password"
                                    component={MainInput}
                                    placeholder="***********"
                                    label="Пароль"
                                    isPassword={true}
                                    labelClass="text-base text-[#603310] font-semibold"
                                />
                            </div>
                            <Button
                                htmlType="submit"
                                size="large"
                                loading={isSubmitting}
                                className="w-full bg-[#AD7226] hover:bg-[#603310]"
                            >
                                <span className="text-white">Отправлять</span>
                            </Button>
                        </div>
                    );
                }}
            </FormContainer>
        </Drawer>
    )
}