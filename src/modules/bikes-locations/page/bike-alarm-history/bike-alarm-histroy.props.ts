import { useState } from "react";

export const useBikeAlarmHistoryProps = () => {
    const [data, setData] = useState()

  const dashboardProps = {
    data,
    setData,
  };

  return dashboardProps;
}