import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Profile from "../components/profile/Profile";
import useFetchUser from "../hooks/useFetchUser";

const ProfilePage = () => {
  const { id } = useParams();
  const { userData, isUserError, isUserLoading, refetchUserData } =
    useFetchUser({ id });

  if (isUserLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <CircularProgress />
        <p>Ładujemy dane użytkownika...</p>
      </div>
    );

  if (isUserError || !userData)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Coś poszło nie tak - przepraszamy!</p>
      </div>
    );

  return (
    <>
      <Profile
        user={userData.user}
        userCheck={userData.check}
        userRecipes={userData.userRecipes}
        refetchData={refetchUserData}
      />
    </>
  );
};

export default ProfilePage;
