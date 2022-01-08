import { Link, useMatch, useResolvedPath } from "react-router-dom";
const CustomLink = ({ children, to, className, activeclassname, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link to={to} {...props} className={match ? activeclassname : className}>
      {children}
    </Link>
  );
};

export default CustomLink;
