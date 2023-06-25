import {
  Avatar,
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import User from "../../Models/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserAction, isLoggedInAction } from "../../../Redux/UsersReducer";
import { project } from "../../../Redux/ProjectStore";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [isPass, setIsPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const send = (userData: User) => {
    axios
      .post(`http://localhost:4000/api/v1/vacations/getUser`, userData)
      .then((response) => {
        if (project.dispatch(getUserAction(response.data)).payload) {
          project.dispatch(isLoggedInAction(true));
          navigate("/");
        } else {
          setIsPass(true);
        }
      });
  };

  return (
    <div className="Login">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <br /> <br />
        <form onSubmit={handleSubmit(send)}>
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            {...register("email", {
              required: { value: true, message: "please enter email" },
              minLength: {
                value: 5,
                message: "please enter a valid email",
              },
            })}
          />
          <br />
          <span className="ErrMsg">{errors.email?.message}</span>
          <br />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            onKeyUp={() => setIsPass(false)}
            variant="outlined"
            {...register("password", {
              required: { value: true, message: "please enter password" },
            })}
          />
          <br />
          <span className="ErrMsg">{errors.password?.message}</span>
          {isPass && <span>wrong password</span>}
          <br />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
        <br /> <br />
      </Box>
      <p>Don't have an account?</p>
      <Link href="/register" variant="body2" color="secondary">
        register now
      </Link>
    </div>
  );
}

export default Login;
