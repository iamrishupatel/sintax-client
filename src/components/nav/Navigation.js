import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import UserAvatar from "./UserAvatar";
import MyDropDown from "./MyDropDown";
import NewPost from "../post/NewPost";
import { Modal, Drawer } from "antd";
import { useState } from "react";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Settings from "../Settings";

const Navigation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setTimeout(() => {
      setIsDrawerVisible(true);
    }, 300);
  };
  const hideDrawer = () => {
    setIsDrawerVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="nav">
      <Link className="nav__logo" to={ROUTES.HOME}>
        <img
          src="https://res.cloudinary.com/dvhtmxijl/image/upload/v1640101002/sintax/assets/sintax-logo_iex59c.svg"
          alt="sintax"
        />
      </Link>

      <div className="flex-spacer" />
      <UserAvatar />
      <div className="nav__newPost d-flex-center nav__btn" onClick={showModal}>
        <Tooltip title="New Post">
          <PlusOutlined className="icon" />
        </Tooltip>
      </div>
      <MyDropDown showDrawer={showDrawer} />
      <Modal
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
        centered
        closeIcon={<CloseCircleOutlined style={{ fontSize: "1.4rem" }} />}
      >
        <NewPost />
      </Modal>
      <Drawer
        title="Settings"
        placement="right"
        closable={true}
        onClose={hideDrawer}
        visible={isDrawerVisible}
        width={"30rem"}
        closeIcon={<CloseCircleOutlined style={{ fontSize: "1.2rem" }} />}
        destroyOnClose
      >
        <Settings/>
      </Drawer>
    </div>
  );
};

export default Navigation;
