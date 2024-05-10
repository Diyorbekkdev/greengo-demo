import { bikesMonitoringRoutes } from "./bikes-locations/route";
import { categoryRoutes } from "./categories/route";
import { dashboardRoutes } from "./dashboard/route";
import { lockerRoutes } from "./locker/route";
import { publicOffertaRoutes } from "./public-offerta/route";
import { regionsRoutes } from "./region/route";
import { rolesRoutes } from "./roles/route";
import { simcardRoutes } from "./simcard/route";
import { tariffRoutes } from "./tariff/route";
import { usersRoutes } from "./users/route";
import { answersRoutes } from "@/modules/answer-category/route.ts";

export const routes = [
    ...dashboardRoutes,
    ...categoryRoutes,
    ...lockerRoutes,
    ...simcardRoutes,
    ...rolesRoutes,
    ...regionsRoutes,
    ...tariffRoutes,
    ...usersRoutes,
    ...bikesMonitoringRoutes,
    ...answersRoutes,
    ...publicOffertaRoutes,
];