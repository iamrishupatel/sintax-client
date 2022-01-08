import { Result, Button } from "antd";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/nav/Navigation";
import useDocumentTitle from "../../hooks/useDocumentTitle";
const NotFound = () => {
  useDocumentTitle("Not Found");
  return (
    <Fragment>
      <Navigation />
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        style={{ marginTop: "12vh" }}
        extra={
          <Button type="primary">
            <Link to="/">Back Home </Link>
          </Button>
        }
      />
    </Fragment>
  );
};

export default NotFound;
