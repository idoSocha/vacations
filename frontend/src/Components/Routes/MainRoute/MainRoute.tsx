import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import Login from "../../Pages/Login/Login";
import Page404 from "../../Pages/Page404/Page404";
import LoginTemp from "../../Pages/Login/LoginTemp";
import Register from "../../Pages/Register/Register";
import Vacations from "../../Pages/Vacations/Vacations";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route path="/" element={<Vacations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logintemp" element={<LoginTemp />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
