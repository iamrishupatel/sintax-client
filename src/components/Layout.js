import { Outlet, Navigate } from "react-router-dom";
import Navigation from "./nav/Navigation";
import TopTabBar from "./nav/TopTabBar";
import PostContextProvider from "../context/postContext";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import * as ROUTES from "../constants/routes";

const Layout = () => {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to={ROUTES.SIGNIN} />;
  return (
    <PostContextProvider>
      <div className="layout">
        <Navigation />
        <TopTabBar />
        <main>
          <Outlet />
        </main>
      </div>
    </PostContextProvider>
  );
};

export default Layout;
