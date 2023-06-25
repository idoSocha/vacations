import { Button, Link, TextField, Typography } from "@mui/material";
import "./Register.css";
import User from "../../Models/User";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { project } from "../../../Redux/ProjectStore";
import { addUserAction } from "../../../Redux/UsersReducer";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const [isPass, setIsPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const validateEmail = async (email: string) => {
    let vEmail;
    await axios
      .post(`http://localhost:4000/api/v1/vacations/getUserByEmail/${email}`)
      .then((response) => {
        vEmail = response.data;
      });
    if (vEmail) {
      return true;
    } else {
      return false;
    }
  };
  const send = async (userData: User) => {
    if (await validateEmail(userData.email)) {
      setIsPass(true);
      return;
    }
    axios
      .post("http://localhost:4000/api/v1/vacations/addUser", userData)
      .then((response) => {
        project.dispatch(addUserAction(response.data));
        navigate("/");
      });
  };
  return (
    <div className="Register">
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <br /> <br />
      <form onSubmit={handleSubmit(send)}>
        <TextField
          sx={{ m: 2 }}
          label="First Name"
          variant="outlined"
          {...register("private_name", {
            required: { value: true, message: "please enter a name " },
            minLength: {
              value: 2,
              message: "please enter a valid name",
            },
          })}
        />
        <div className="ErrMsg">{errors.private_name?.message}</div>

        <TextField
          sx={{ m: 2 }}
          label="Last Name"
          variant="outlined"
          {...register("last_name", {
            required: { value: true, message: "please enter a last name " },
            minLength: {
              value: 2,
              message: "please enter a valid last name",
            },
          })}
        />
        <div className="ErrMsg">{errors.last_name?.message}</div>
        <TextField
          sx={{ m: 2 }}
          label="Email"
          type="email"
          onKeyUp={() => setIsPass(false)}
          variant="outlined"
          {...register("email", {
            required: { value: true, message: "please enter email " },
            minLength: {
              value: 5,
              message: "please enter a valid email",
            },
          })}
        />
        <div className="ErrMsg">{errors.email?.message}</div>
        {isPass && <span>this email is already taken...</span>}

        <TextField
          sx={{ m: 2 }}
          type="password"
          label="Password"
          variant="outlined"
          {...register("password", {
            required: { value: true, message: "please enter password " },
            minLength: {
              value: 4,
              message: "password should be at least 4 characters long",
            },
          })}
        />
        <div className="ErrMsg">{errors.password?.message}</div>

        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
      <p>Already a member?</p>
      <Link href="/login" variant="body2" color="secondary">
        login
      </Link>
    </div>
  );
}

export default Register;
