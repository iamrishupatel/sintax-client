import {
  GlobalOutlined,
  CloseCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";

import { Image, message } from "antd";
import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/userContext";
import { PostContext } from "../../context/postContext";

const NewPost = () => {
  const { user } = useContext(UserContext);
  const { createNewPost } = useContext(PostContext);
  const [formData, setFormData] = useState(null);
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoData, setPhotoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const imgUploadRef = useRef();
  const openGalleryHandler = e => {
    e.preventDefault();
    imgUploadRef.current.click();
  };

  useEffect(() => {
    setFormData(new FormData());
  }, []);

  const onChangePicture = e => {
    const file = e.target.files[0];
    if (file.size > 15000000) {
      message.warn(
        "File Size limit exceeded. Please choose a file lower than 15Mb",
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

  const deletePhoto = () => {
    setPhoto("");
    setPhotoData(null);
  };

  const submitEventHandler = e => {
    e.preventDefault();
    if (body.trim() || photo) {
      setIsLoading(true);
      setFormData(new FormData());
      formData.append("body", body);
      formData.append("photo", photo);
      createNewPost(formData)
        .then(res => {
          message.success("post created successfully");
          setBody("");
          deletePhoto();
          setFormData(new FormData());
        })
        .catch(error => {
          console.log(error);
          message.error("unable to create post");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      message.info("Can't create an empty post.");
    }
  };
  return (
    <div className="newPost ">
      <div className="newPost__heading d-flex-center">
        <h2>Create Post</h2>
      </div>

      <form onSubmit={submitEventHandler}>
        <div className="user d-flex align-center">
          <img src={user.photoUrl} alt="profile-pic" />
          <div>
            <h3 className="user-name">{`${user.firstName} ${user.lastName}`}</h3>
            <p className="badge d-flex-center">
              <GlobalOutlined /> Public
            </p>
          </div>
        </div>
        <div className="form-field">
          <textarea
            name="body"
            id="post"
            className="scroll-y"
            placeholder={`Whats on your mind, ${user.firstName.replace(
              /^\w/,
              char => char.toUpperCase()
            )}?`}
            value={body}
            onChange={e => setBody(e.target.value)}
            rows="10"
            cols="30"
            maxLength="256"
          />
        </div>
        {photo && photoData && (
          <div className="form-field ">
            <div className="photo-preview-wrapper scroll-y ">
              <CloseCircleFilled
                className="photo-delete"
                onClick={deletePhoto}
              />
              <p className="photo-name">{photo.name}</p>
              <Image className="photo-preview" src={photoData} alt="post" />
            </div>
          </div>
        )}

        <div className="form-field  ">
          <input
            type="file"
            accept="image/*"
            name="uplaod"
            id="upload"
            ref={imgUploadRef}
            onChange={onChangePicture}
          />
          <button className="newPost__upload" onClick={openGalleryHandler}>
            <span>{photo.name ? photo.name : "Photo"}</span>
          </button>
        </div>
        <div className="form-field">
          <button
            type="submit"
            value="Post"
            className="submit"
            disabled={isLoading}
          >
            {isLoading ? <LoadingOutlined /> : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
