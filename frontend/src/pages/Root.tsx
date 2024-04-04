import { Outlet } from "react-router-dom";

import MainNavigation from "../components/navigation/MainNavigation";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className="mt-2 mb-5">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
