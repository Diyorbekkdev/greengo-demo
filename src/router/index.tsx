import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes } from "@/modules/auth/routes/route";
import { LoginLayout } from "@/modules/auth/components";
import { BaseLayout } from "@/components/layout/base-layout.component";
import { routes } from "@/modules/routes";
import { RouteTypes } from "@/types/route-types";
import { NotFound } from "@/modules/not-found/page/not-found.components.tsx";

const nestedRoutes = (routes: RouteTypes[], parentPath = "") =>
  routes.map(({ Element, key, children = [] }) => {

    const fullPath = `${parentPath}${key}`;
    if (children.length > 0) {
      return (
        <Fragment key={fullPath}>
          <Route key={fullPath} path={fullPath}>
            {nestedRoutes(children, fullPath)}
          </Route>
        </Fragment>
      );
    }
    return <Route key={fullPath} path={fullPath} element={<Element />} />;
  });

export const AuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        {nestedRoutes(routes as RouteTypes[])}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export const UnAuthorizedRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginLayout />}>
      <Route path="*" element={<NotFound />} />
      {authRoutes.map(({ Element, key }) => (
        <Route key={key} path={key} element={<Element />} />
      ))}
    </Route>
  </Routes>
);