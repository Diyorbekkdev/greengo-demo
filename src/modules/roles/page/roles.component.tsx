import { hoc } from "@/utils";
import { useRolesProps } from "./roles.props";
import { Header } from "@/components";

export const Roles = hoc(useRolesProps, ({ data }) => {
    console.log(data);
    return (
        <div>
            <Header title="Roles" buttonText="Control roles" type="primary" />
        </div>
    )
})