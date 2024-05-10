import { hoc } from "@/utils";
import { useBikeAlarmHistoryProps } from "./bike-alarm-histroy.props";

export const BikeAlarmHistory = hoc(useBikeAlarmHistoryProps, ({data})=> {
    return (
        <div>
            BikeAlarmHistory {data}
        </div>
    )
})