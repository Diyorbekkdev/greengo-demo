import { hoc } from "@/utils";
import { useRegisterProps } from "./register.props";


export const Register = hoc(useRegisterProps, ({ auth }) => {
    return (
        <section
            className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 bg-no-repeat bg-gradient-to-b from-[#CF8E2F] to-[#603310]">
            Register page {auth}
        </section>
    )
})