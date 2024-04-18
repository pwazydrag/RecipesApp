import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Profile from "../components/profile/Profile";
import useFetchUser from "../hooks/useFetchUser";

const ProfilePage = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useFetchUser({ id });

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Ładujemy dane użytkownika...</p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Coś poszło nie tak - przepraszamy!</p>
      </div>
    );

  return (
    <>
      <Profile user={data.user} userCheck={data.check} />
    </>
  );
};

export default ProfilePage;
