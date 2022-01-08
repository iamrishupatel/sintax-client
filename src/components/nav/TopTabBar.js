import {
  HomeOutlined,
  InboxOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";

import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import * as ROUTES from "../../constants/routes";
import Menu from "./Menu";
import CustomLink from "../CustomLink";

const TabBar = () => {
  const { user } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onClose = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="top-tab-bar d-flex align-center">
      <Drawer
        placement="bottom"
        closable={true}
        onClose={onClose}
        visible={isMenuOpen}
        height={"fit-content"}
        closeIcon={false}
      >
        <Menu />
      </Drawer>

      <CustomLink
        to={ROUTES.HOME}
        className="top-tab-bar__item"
        activeclassname="top-tab-bar__item active"
      >
        <HomeOutlined className="icon" />
      </CustomLink>
      <CustomLink
        to={ROUTES.CHAT}
        className="top-tab-bar__item"
        activeclassname="top-tab-bar__item active"
      >
        <InboxOutlined className="icon" />
      </CustomLink>
      <CustomLink
        to={`/user/${user._id}`}
        className="top-tab-bar__item"
        activeclassname="top-tab-bar__item active"
      >
        <UserOutlined className="icon" />
      </CustomLink>
      <div
        className="top-tab-bar__item"
        activeclassname="top-tab-bar__item active"
        onClick={() => setIsMenuOpen(true)}
      >
        <MenuOutlined className="icon" />
      </div>
    </div>
  );
};

export default TabBar;
