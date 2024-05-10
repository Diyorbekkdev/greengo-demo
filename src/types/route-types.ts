import { FC } from "react";

export interface RouteTypes {
    key: string;
    Element: FC;
    label: string;
    icon: any; 
    children: RouteTypes[];
    visible: boolean;
    access: string;
  }