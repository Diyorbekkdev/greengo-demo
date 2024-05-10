import { useLocation, useNavigate } from "react-router-dom";

interface RouterQuery {
  [key: string]: string;
}

export const useRouterQuery = () => {
  const { pathname, search } = useLocation();
  const NavLink = useNavigate();

  const routerQuery = (query: string): URLSearchParams => new URLSearchParams(query);

  const GetRouterQuery = (removeKey?: string): RouterQuery => {
    const set: RouterQuery = {};
    const searchParams = routerQuery(search);

    for (const [key, value] of searchParams) {
      if (key !== removeKey) {
        set[key] = value;
      }
    }

    return set;
  };

  const SetRouterQuery = (newSetQuery: any): void => {
    const router = routerQuery(newSetQuery);
    NavLink(`${pathname}?${router.toString()}`);
  };

  return {
    SetRouterQuery,
    GetRouterQuery,
  };
};