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
        <div className="home__feed-banner">
          <p>
            Hello Everyone welcome to SINTAX. I hope that you are here to test
            out his app but please keep following things in mind:
          </p>
          <ul>
            <li>
              Instead of posting random words and things to test out this app
              use some good images or post some quotes or anything that is
              meaningfull avoid using lorem ipsum and random words.
            </li>
            <li>Please be civic</li>
            <li>DO NOT share any personal information</li>
          </ul>
        </div>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
