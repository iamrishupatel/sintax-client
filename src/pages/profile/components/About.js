import { useContext } from "react";
import format from "date-fns/format";
import { ProfileContext } from "../Profile";
const About = () => {
  const { fetchedUser } = useContext(ProfileContext);
  const joined = fetchedUser._id
    ? format(new Date(fetchedUser.createdAt), "MMMM yyyy")
    : "";

  return (
    <div className="about">
      {fetchedUser?.about && (
        <div>
          <h2>About</h2>
          <p>{fetchedUser?.about}</p>
        </div>
      )}
      <div>
        <h2>Joined</h2>
        <p>{joined}</p>
      </div>
      <div>
        <h2>Email</h2>
        <p>{fetchedUser.email}</p>
      </div>
    </div>
  );
};

export default About;
