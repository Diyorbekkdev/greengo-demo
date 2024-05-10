
// import {useSelector} from "react-redux";
// import { routes } from "@/modules/routes.js";
// import { useEffect, useState } from "react";
// import { RootState } from "@/redux";
// import { Route } from "@/types/route-types";

// export const useFilterRoutes = () => {
//     const { isAuth } = useSelector((state: RootState) => state.auth);
//     const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
//     useEffect(() => {
//         const userAccess = JSON.parse(localStorage.getItem("userInfo") ?? "");
//         if (userAccess?.all_access) {
//             setFilteredRoutes(filteredRoutes);
//         } else {
//             const filteredRoutes = routes?.filter(role => userAccess?.[role?.access]);
//             setFilteredRoutes(filteredRoutes as Route[]);
//         }
//     }, [isAuth]);

//     return filteredRoutes;
// }