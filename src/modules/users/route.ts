import { RidesHistory } from "./page/rides-history";
import { AppstoreOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { AllUsersComponent } from "@/modules/users/page/all-users/all-users.component.tsx";
import { SingleUser } from "./page/single-user";

export const usersRoutes = [
  {
    key: "/users",
    Element: RidesHistory,
    label: "Users",
    icon: UsergroupAddOutlined,
    children: [
      {
        key: "/users",
        Element: AllUsersComponent,
        label: "All users",
        icon: AppstoreOutlined,
        children: [],
        visible: true,
        access: "main",
      },
      {
        key: "/rides-history",
        Element: RidesHistory,
        label: "Rides history",
        icon: AppstoreOutlined,
        children: [],
        visible: true,
        access: "main",
      },
      {
        key: "/users/:userId",
        Element: SingleUser,
        label: "Rides history",
        icon: AppstoreOutlined,
        children: [],
        visible: false,
        access: "main",
      },
      // {
      //     key: "/user-tariffs-history",
      //     Element: UserTariffHistory,
      //     label: "User tariffs history",
      //     icon: AppstoreOutlined,
      //     children: [],
      //     visible: true,
      //     access: "main",
      // },
      // {
      //   key: "/balance",
      //   Element: BalanceReplenishement,
      //   label: "Balance",
      //   icon: AppstoreOutlined,
      //   children: [
      //     {
      //       key: "/balance-replenishment",
      //       Element: BalanceReplenishement,
      //       label: "Balance replenishment",
      //       icon: AppstoreOutlined,
      //       children: [],
      //       visible: true,
      //       access: "main",
      //     },
      //     {
      //       key: "/balance-write-off",
      //       Element: BalanceWriteOff,
      //       label: "Balance write off",
      //       icon: AppstoreOutlined,
      //       children: [],
      //       visible: true,
      //       access: "main",
      //     },
      //   ],
      //   visible: true,
      //   access: "main",
      // },
    ],
    visible: true,
    access: "main",
  },
];
