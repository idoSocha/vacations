import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import Login from "../../Pages/Login/Login";
import Page404 from "../../Pages/Page404/Page404";
import Register from "../../Pages/Register/Register";
import MainPage from "../../Pages/MainPage/MainPage";
import { AdminRoutes, PrivateRoutes } from "../../Utils/ProtectedRoutes";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<AdminRoutes />}>
          {/* <Route path="/updateVacation" element={<Edit />} /> */}
          {/* <Route path="/addVacation" element={<AddVacation />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
