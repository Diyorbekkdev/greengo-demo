import { useFetchQuery } from "@/hooks";
import { useParams } from "react-router-dom";

export const useBikeSingleProps = () => {
  const { bikeId } = useParams();

  const { data, isLoading, refetch } = useFetchQuery({
    url: `bicycle/${bikeId}`,
  });

  return { data, isLoading, refetch };
};
