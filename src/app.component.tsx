import { useAppProps } from "./app.props";
import { PageLoader } from "./components/page-loader";
import { AuthorizedRoutes, UnAuthorizedRoutes } from "./router";
import { hoc } from "./utils";

export const App = hoc(useAppProps, ({ isAuth, loading }) => {

  return loading ? (
    <PageLoader />
  ) : isAuth ? (
    <AuthorizedRoutes />
  ) : (
    <UnAuthorizedRoutes />
  );
});
