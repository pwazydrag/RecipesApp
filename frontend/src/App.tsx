import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./pages/Root";
import DetailsPage from "./pages/DetailsPage";
import AddPage from "./pages/AddPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import EditPage from "./pages/EditPage";
import FavoritesPage from "./pages/FavoritesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/details/:id", element: <DetailsPage /> },
      { path: "/add", element: <AddPage /> },
      { path: "/edit/:id", element: <EditPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/profile/:id", element: <ProfilePage /> },
      { path: "/favorites", element: <FavoritesPage /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
