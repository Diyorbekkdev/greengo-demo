import { hoc } from "@/utils";
import {useRidesProps} from "./rides.props";

export const Rides = hoc(useRidesProps, ({data})=> {
    return (
        <div>
            Rides {data}
        </div>
    )
})