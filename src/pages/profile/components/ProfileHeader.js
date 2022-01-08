import { useState, useContext } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { UserContext } from "../../../context/userContext";
import { ProfileContext } from "../Profile";
import { Modal } from "antd";
import FileUpload from "./FileUpload";

const ProfileHeader = () => {
  const { user } = useContext(UserContext);
  const { fetchedUser } = useContext(ProfileContext);

  const [modal, setModal] = useState({
    visible: false,
    title: "",
  });

  const viewModal = title => {
    setModal({
      visible: true,
      title: title,
    });
  };

  const hideModal = () => {
    setModal({
      visible: false,
      type: "",
    });
  };

  return (
    <div className="profile__header">
      <div className="profile__cover">
        <img src={fetchedUser.coverUrl} alt="cover-pic" className="" />
        {user._id === fetchedUser._id && (
          <div
            className="profile__change-cover"
            onClick={() => viewModal("Upload Cover")}
          >
            <CameraOutlined />
            <span className="title">Edit Cover Photo</span>
          </div>
        )}
      </div>
      <div className="profile__meta">
        <div className="profile__dp d-flex-center">
          <img src={fetchedUser.photoUrl} alt="profile-pic" />
          {user._id === fetchedUser._id && (
            <div
              className="profile__change-dp"
              onClick={() => viewModal("Upload Photo")}
            >
              <CameraOutlined />
            </div>
          )}
        </div>

        <div className="profile__data">
          <h2 className="name">{`${fetchedUser.firstName} ${fetchedUser.lastName}`}</h2>
          <p className="username">
            <span>@</span>
            {fetchedUser.username}
          </p>
        </div>
      </div>

      <Modal
        title={modal.title}
        visible={modal.visible}
        onOk={hideModal}
        onCancel={hideModal}
        footer={false}
        centered
        destroyOnClose={true}
      >
        <FileUpload title={modal.title} />
      </Modal>
    </div>
  );
};

export default ProfileHeader;
