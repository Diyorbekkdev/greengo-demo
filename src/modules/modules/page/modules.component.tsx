import { hoc } from "@/utils";
import { useModulesProps } from "./modules.props";

export const Modules = hoc(useModulesProps, ({data})=> {
    return (
        <div>
            Modules {data}
        </div>
    )
})