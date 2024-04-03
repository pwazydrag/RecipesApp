import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./pages/Root";
import DetailsPage from "./pages/DetailsPage";
import { AuthProvider } from "./hooks/useAuth";
import AddPage from "./pages/AddPage";

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
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
