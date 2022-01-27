import { useContext, useState } from "react";
import {
  CloseCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context/userContext";
import { Drawer } from "antd";
import Settings from "../Settings";

const MenuPanel = () => {
  const { signout } = useContext(UserContext);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const onClose = () => {
    setIsDrawerVisible(false);
  };
  const handleClick = () => {
    setIsDrawerVisible(true);
  };
  return (
    <div className="menu-panel">
      <h3 className="menu-panel__link" onClick={signout}>
        <LogoutOutlined /> <span> Sign Out</span>
      </h3>
      <h3 className="menu-panel__link" onClick={handleClick}>
        <SettingOutlined /> <span>Settings</span>
      </h3>
      <Drawer
        title="Settings"
        placement="bottom"
        closable={true}
        onClose={onClose}
        visible={isDrawerVisible}
        height={"40rem"}
        closeIcon={<CloseCircleOutlined style={{ transform: "scale(1.4)" }} />}
        destroyOnClose
      >
        <Settings />
      </Drawer>
    </div>
  );
};

export default MenuPanel;
