// import { useState } from "react";
// import "./Header.css";

// function Header(): JSX.Element {
//   const [login, setLogin] = useState(false);

//   const userLogged = () => {};
//   return (
//     <div className="Header">
//       <nav></nav>
//     </div>
//   );
// }

// export default Header;
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

import "./Header.css";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

import { project } from "../../../Redux/ProjectStore";
import AdminNav from "../../Navbars/AdminNav/AdminNav";
import UserNav from "../../Navbars/UserNav/UserNav";
import { isLoggedInAction } from "../../../Redux/UsersReducer";
import { userIsAdmin, userLoggedIn } from "../../Utils/authUtils";

function Header(): JSX.Element {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const loggedIn = userLoggedIn();
  const isAdmin = userIsAdmin();

  useEffect(() => {
    if (loggedIn) {
      const user = project.getState().users.users[0];

      setName(user.private_name + " " + user.last_name);
    }
  }, [loggedIn]);

  const handleLogout = () => {
    project.dispatch(isLoggedInAction(false));
    navigate("/login");
  };

  return (
    <div className="Header">
      <AppBar color="primary" style={{ position: "static" }}>
        <Toolbar>
          {!loggedIn ? (
            <>
              <div
                className="logo"
                onClick={() => {
                  navigate("/");
                }}
                style={{ cursor: "pointer" }}
              >
                {/* <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    size="xl"
                    style={{ color: "#ffffff", marginRight: "5px" }}
                  /> */}
                <Typography variant="h4" component="div">
                  Ido Tours
                </Typography>
              </div>
              <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
                <Button
                  size="large"
                  sx={{ height: "2rem" }}
                  color="inherit"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  size="large"
                  sx={{ height: "2rem" }}
                  color="inherit"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Stack>
            </>
          ) : isAdmin ? (
            <AdminNav onLogout={handleLogout} />
          ) : (
            <UserNav onLogout={handleLogout} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
