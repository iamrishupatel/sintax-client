import { useState, useRef, useContext, Fragment } from "react";
import { UserContext } from "../../../context/userContext";
import {
  LinkOutlined,
  UploadOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { updateUser } from "../../../servercalls/user";
import { ProfileContext } from "../Profile";

const FileUpload = ({ title }) => {
  const { user, setUser } = useContext(UserContext);
  const { setFetchedUser } = useContext(ProfileContext);
  const [isUploading, setIsUploading] = useState(false);
  const [photo, setPhoto] = useState("");
  const [photoData, setPhotoData] = useState(null);

  const imgRef = useRef();
  const onChangePicture = e => {
    const file = e.target.files[0];
    if (file.size > 10000000) {
      message.warn(
        "File Size limit exceeded. Please choose a file lower than 10Mb",
        5
      );
      return;
    }
    setPhoto(file);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPhotoData(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const handleCoverUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("cover", photo);
    try {
      const result = await updateUser(user._id, formData);
      if (result._id) {
        setUser(prevState => ({
          ...prevState,
          coverUrl: result.coverUrl,
        }));
        setFetchedUser(prevState => ({
          ...prevState,
          coverUrl: result.coverUrl,
        }));
        message.success("Image uploaded successfully");
      }
    } catch (error) {
      message.error("Failed to upload image!");
    } finally {
      setIsUploading(false);
      setPhoto("");
      setPhotoData(null);
    }
  };
  const handlePhotoUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("photo", photo);
    try {
      const result = await updateUser(user._id, formData);
      if (result._id) {
        setUser(prevState => ({
          ...prevState,
          photoUrl: result.photoUrl,
        }));
        setFetchedUser(prevState => ({
          ...prevState,
          photoUrl: result.photoUrl,
        }));
        message.success("Image uploaded successfully");
      }
    } catch (error) {
      message.error("Failed to upload image!");
    } finally {
      setIsUploading(false);
      setPhoto("");
      setPhotoData(null);
    }
  };
  const submitEventHandler = e => {
    e.preventDefault();
    if (photo && title === "Upload Cover") {
      handleCoverUpload();
    } else if (photo && title === "Upload Photo") {
      handlePhotoUpload();
    } else {
      message.warn("Please select a file");
    }
  };
  return (
    <form className="profile__file-upload-form" onSubmit={submitEventHandler}>
      <div className="box">
        <input
          type="file"
          accept="image/*"
          name="cover"
          id="cover"
          ref={imgRef}
          onChange={onChangePicture}
        />
        <div
          className="select-file d-flex-center"
          onClick={() => imgRef.current.click()}
        >
          {photo ? (
            "Select Another File"
          ) : (
            <Fragment>
              <UploadOutlined />
              Select File
            </Fragment>
          )}
        </div>
        <button type="submit">
          {isUploading ? <LoadingOutlined /> : " Upload File"}
        </button>
      </div>
      <div className="preview">
        {photo && (
          <p>
            <LinkOutlined /> {photo.name}
          </p>
        )}
        {photo && (
          <img src={photoData} className="preview" alt="cover-preview" />
        )}
      </div>
    </form>
  );
};

export default FileUpload;
