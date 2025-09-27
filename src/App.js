import react from "react"
import ReactDOM from "react-dom/client"
import Birthdayframe from "./components/birthday/birthdayframe";
import Framelaout from "./components/frame-layout"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error";

const Applayout = () => {
  return (<>
    <Birthdayframe />
  </>)
};

const AppRouter = createBrowserRouter([
  {path: "/", element: <Applayout />, errorElement: <Error />},
  {path: "/frame/:id", element: <Framelaout />,errorElement: <Error />}
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppRouter} />)