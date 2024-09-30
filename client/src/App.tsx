import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Task from "./pages/Task";
import AddUpdate from "./pages/AddUpdate";

function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      Component: Task,
    },
    {
      path: "/update/:id",
      Component: AddUpdate,
    },
    {
      path: "/create",
      Component: AddUpdate,
    },
  ]);

  return <RouterProvider router={Router}></RouterProvider>;
}

export default App;
