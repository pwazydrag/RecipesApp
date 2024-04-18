import { User } from "../../utils/types";

type ProfileProps = {
  user: User;
  userCheck: boolean;
};

const Profile = ({ user, userCheck }: ProfileProps) => {
  console.log(user, userCheck);
  return <div></div>;
};

export default Profile;
