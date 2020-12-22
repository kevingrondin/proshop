import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PrivateRoute = ({ component: Component, path, role = null }) => {
  const { user } = useContext(UserContext);

  return user ? (
    <Route path={path} element={<Component />} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
