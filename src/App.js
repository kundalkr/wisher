import react from "react"
import ReactDOM from "react-dom/client"
import Birthdayframe from "./components/birthday/birthdayframe";
import Framelaout from "./components/frame-layout"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../node_modules/react-cropper/node_modules/cropperjs/dist/cropper.css"
import Error from "./components/Error";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import ResponsiveCanvas from "../src/components/test"

const Applayout = () => {
  return (<>
  <ResponsiveCanvas/>
    {/* <Birthdayframe /> */}
  </>)
};

const AppRouter = createBrowserRouter([
  { path: "/", element: <Applayout />, errorElement: <Error /> },
  { path: "/frame/:id", element: <Framelaout />, errorElement: <Error /> }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppRouter} />)