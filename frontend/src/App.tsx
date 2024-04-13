import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./pages/Root";
import DetailsPage from "./pages/DetailsPage";
import AddPage from "./pages/AddPage";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    //errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/details/:id", element: <DetailsPage /> },
      { path: "/add", element: <AddPage /> },
      { path: "/search", element: <SearchPage /> },
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
