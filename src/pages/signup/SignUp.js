import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import brandImg from "../../assets/logo_svg.svg";
import * as ROUTES from "../../constants/routes";
import { Link, Navigate } from "react-router-dom";
import {
  LoadingOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const SignUp = () => {
  useDocumentTitle("Sign Up | Sintax");
  const { signUpWithEmailAndPassword, user } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = e => {
    setCredentials(credentials => ({
      ...credentials,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const submitEventHandler = e => {
    e.preventDefault();

    setIsLoading(true);
    signUpWithEmailAndPassword(credentials, () => {
      setIsLoading(false);
    });
  };

  if (user && user._id) return <Navigate to="/" />;
  return (
    <div className="auth-form d-flex-center">
      <div className="auth-form__form-container">
        <img src={brandImg} alt="brand-logo" />
        <h1 className="auth-form__heading">Nice to have you here! 🚀</h1>
        <form className="auth-form__form" onSubmit={submitEventHandler}>
          <div className="form-field">
            <label htmlFor="firstName">First Name</label>
            <div className="input-field">
              <input
                type="text"
                placeholder="john"
                name="firstName"
                value={credentials.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Last Name</label>
            <div className="input-field">
              <input
                type="text"
                placeholder="doe"
                name="lastName"
                value={credentials.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
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
            <label htmlFor="password">Passowrd</label>
            <div className="input-field">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="password"
                value={credentials.password}
                name="password"
                onChange={handleChange}
                required
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
            <button type="submit">
              {isLoading ? <LoadingOutlined /> : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="auth-form__link">
          Already have an account?
          <Link to={ROUTES.SIGNIN}>Sign in instead</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
