import { HomeOutlined, InboxOutlined } from "@ant-design/icons";
import CustomLink from "../../../components/CustomLink";
import * as ROUTES from "../../../constants/routes";

const SideNav = () => {
  return (
    <nav className="sidenav">
      <div className="d-flex align-center flex-col">
        <CustomLink
          className="sidenav__link"
          activeclassname="sidenav__link active"
          to={ROUTES.HOME}
        >
          <HomeOutlined />
          <span>Home</span>
        </CustomLink>

        <CustomLink
          className="sidenav__link"
          activeclassname="sidenav__link active"
          to={ROUTES.CHAT}
        >
          <InboxOutlined />
          <span>Chat</span>
        </CustomLink>
      </div>
    </nav>
  );
};

export default SideNav;
