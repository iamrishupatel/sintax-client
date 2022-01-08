import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  CaretDownFilled,
  SettingOutlined,
  RightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { UserContext } from "../../context/userContext";


const MyDropDown = ({ showDrawer }) => {
  const { user, signout } = useContext(UserContext);

  
  const menu = user?._id && (
    <div className="nav__drop-down">
      <Link to={`/user/${user._id}`} key="0" className="nav__drop-down-item">
        <img src={user.photoUrl} alt={user.firstName} />
        <div>
          <h4 className="full-name">{`${user.firstName} ${user.lastName}`}</h4>
          <p className="">See Your Profile</p>
        </div>
      </Link>

      <div className="divider" />
      <div className="nav__drop-down-item" key="1" onClick={showDrawer}>
        <SettingOutlined className="icon" style={{ marginRight: "0.4rem" }} />{" "}
        <h4>Settings</h4>
        <RightOutlined />
      </div>

      <div className="nav__drop-down-item" key="2" onClick={signout}>
        <LogoutOutlined className="icon" style={{ marginRight: "0.4rem" }} />{" "}
        <h4>Log Out</h4>
        <RightOutlined />
      </div>
    </div>
  );


  return (
    <Dropdown
      overlay={menu}
      title="New Post"
      className="d-flex-center nav__btn nav__dropdown"
      placement="bottomRight"
      trigger={["click"]}
    >
      <CaretDownFilled className="icon" />
    </Dropdown>
  );
};

export default MyDropDown;
