import { hoc } from "@/utils";
import { useDashboardProps } from "./dashboard.props";

export const Dashboard = hoc(useDashboardProps, ({data})=> {
    return (
        <div>
            Dashboard {data}
        </div>
    )
})