import { displayDate } from "../../utils/displayDate";
import { Recipe, User } from "../../utils/types";
import UserRecipes from "./UserRecipes";

type ProfileProps = {
  user: User;
  userCheck: boolean;
  userRecipes: Recipe[];
  refetchData: () => void;
};

const Profile = ({
  user,
  userCheck,
  userRecipes,
  refetchData,
}: ProfileProps) => {
  return (
    <div className="flex flex-col w-8/12 mx-auto text-center">
      <h2>
        Profil użytkownika <span className="text-red-400">{user.username}</span>
      </h2>
      <h3>Data dołączenia: {displayDate(new Date(user.registration))}</h3>
      {userRecipes.length > 0 ? (
        <h2 className="mt-12">Utworzone przepisy:</h2>
      ) : (
        <h2 className="mt-12">
          Użytkownik nie utworzył jeszcze żadnych przepisów
        </h2>
      )}
      <UserRecipes
        recipes={userRecipes}
        isUserOwnProfile={userCheck}
        refetchData={refetchData}
      />
    </div>
  );
};

export default Profile;
