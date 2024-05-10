import { hoc } from "@/utils";
import { useUserTariffHistoryProps } from "./user-tarifs.props";

export const UserTariffHistory = hoc(useUserTariffHistoryProps, ({ data }) => {
    return (
        <div>
            UserTariffHistory {data}
        </div>
    )
})