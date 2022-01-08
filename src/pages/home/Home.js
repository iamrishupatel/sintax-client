import SideNav from "./components/SideNav";
import { Outlet } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Home | Sintax");
  return (
    <div className="home d-flex ">
      <aside className="home__sideNav-wrapper">
        <SideNav />
      </aside>

      <section className="home__feed">
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
