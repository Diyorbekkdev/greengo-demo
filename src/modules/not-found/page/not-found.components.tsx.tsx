import { hoc } from "@/utils";
import { useNotFoundProps } from "./not-found.props";

export const NotFound = hoc(useNotFoundProps, ({title})=> {
    return (
        <div>
            NotFound page {title}
        </div>
    )
})