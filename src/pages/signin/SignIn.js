import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import {
  EyeOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const SignIn = () => {
  const { signInWithEmailAndPassword, user } = useContext(UserContext);
  useDocumentTitle("Sign Up | Sintax");

  // states
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoginLoading, setIsGuestLoginLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  // vars
  let brandImg =
    "https://res.cloudinary.com/dvhtmxijl/image/upload/v1640101002/sintax/assets/sintax-logo_iex59c.svg";

  // functions
  const submitEventHandler = e => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(credentials)
      .then(() => {
        setCredentials({
          email: "",
          password: "",
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleChange = e => {
    setCredentials(credentials => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  const guestAccountLogin = () => {
    setIsGuestLoginLoading(true);
    signInWithEmailAndPassword({
      email: "guest@example.com",
      password: "12345678",
    })
      .then(() => {})
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsGuestLoginLoading(false);
      });
  };

  if (user && user._id) return <Navigate to="/" />;
  return (
    <div className="auth-form d-flex-center">
      <div className="auth-form__form-container">
        <img src={brandImg} alt="brand-logo" />

        <h1 className="auth-form__heading">Welcome to Sintax! 👋</h1>
        <p>Please sign in to your account and start the adventure</p>

        <form className="auth-form__form" onSubmit={submitEventHandler}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <div className="input-field">
              <input
                type="email"
                placeholder="john@example.com"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <div className="input-field">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="password"
                value={credentials.password}
                name="password"
                onChange={handleChange}
                required
                autoComplete="off"
              />
              {isPasswordVisible ? (
                <EyeInvisibleOutlined
                  onClick={() => setIsPasswordVisible(false)}
                  className="icon pointer"
                />
              ) : (
                <EyeOutlined
                  onClick={() => setIsPasswordVisible(true)}
                  className="icon pointer"
                />
              )}
            </div>
          </div>
          <div className="form-field">
            <button type="submit" disabled={isLoading || isGuestLoginLoading}>
              {isLoading ? <LoadingOutlined /> : "Sign In"}
            </button>
          </div>
          <div className="form-field-divider">
            <span>OR</span>
          </div>

          <div className="form-field">
            <button
              className="gray"
              type="button"
              onClick={guestAccountLogin}
              disabled={isGuestLoginLoading || isLoading}
            >
              {isGuestLoginLoading ? (
                <LoadingOutlined />
              ) : (
                "Continue as a guest"
              )}
            </button>
          </div>
        </form>

        <p className="auth-form__link">
          New on our platform? <Link to={ROUTES.SIGNUP}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
