import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { updateUser } from "../servercalls/user";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const formData = {
    firstName: user.firstName,
    lastName: user.lastName ? user.lastName : "",
    username: user.username,
    about: user.about ? user.about : "",
  };

  const [isModified, setIsModified] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    body: "",
    status: false,
  });

  const submitEventHandler = async (values, { setSubmitting }) => {
    try {
      const result = await updateUser(user._id, values);
      if (result._id) {
        setUser(result);
        setMessage({
          status: true,
          type: "success",
          body: "Changes updated successfully, Reload page to see all changes.",
        });
        setIsModified(false);
      }
    } catch (error) {
      setMessage({
        status: true,
        type: "error",
        body: "Cannot update changes, Check console for errors.",
      });
    } finally {
      setSubmitting(false);
    }
  };
  const onChangeHandler = () => {
    setIsModified(true);
    setMessage({
      status: false,
    });
  };
  const reset = callback => {
    callback();
    setIsModified(false);
    setMessage({
      status: false,
    });
  };

  return (
    <div className="settings">
      <Formik
        initialValues={formData}
        onSubmit={(values, formikBag) => submitEventHandler(values, formikBag)}
      >
        {({ handleReset, isSubmitting, dirty }) => (
          <Form className="settings__form" onChange={onChangeHandler}>
            <div className="form-field d-flex flex-col">
              <label htmlFor="firstName">First Name* </label>
              <Field type="text" name="firstName" maxLength="20" />
            </div>

            <div className="form-field d-flex flex-col">
              <label htmlFor="lastName">Last Name </label>
              <Field type="text" name="lastName" maxLength="20" />
            </div>

            <div className="form-field d-flex flex-col">
              <label htmlFor="username">Username* </label>
              <Field type="text" name="username" maxLength="20" />
            </div>

            <div className="form-field about-field d-flex flex-col">
              <label htmlFor="about">
                About <span> (max word count : 256) </span>{" "}
              </label>
              <Field as="textarea" type="text" name="about" maxLength="256" />
            </div>
            <div className="form-field">
              <button
                className="settings__submit"
                type="submit"
                disabled={isSubmitting || !dirty}
              >
                {isSubmitting ? (
                  <span>
                    <LoadingOutlined /> Saving Changes
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
            <div className="form-field">
              <button
                className="settings__reset"
                disabled={!isModified}
                type="button"
                onClick={() => reset(handleReset)}
              >
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {message.status && (
        <Alert description={message.body} type={message.type} />
      )}
    </div>
  );
};

export default Settings;
