import { Button, Link, TextField, Typography } from "@mui/material";
import "./Register.css";

function Register(): JSX.Element {
  return (
    <div className="Register">
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <br /> <br />
      <TextField id="outlined-basic" label="First Name" variant="outlined" />
      <br /> <br />
      <TextField id="outlined-basic" label="Last Name" variant="outlined" />
      <br /> <br />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
      /> <br /> <br />
      <TextField id="outlined-basic" label="Password" variant="outlined" />
      <br /> <br />
      <Button variant="contained">Login</Button>
      <br /> <br />
      <p>Already a member?</p>
      <Link href="/login" variant="body2" color="secondary">
        login
      </Link>
    </div>
  );
}

export default Register;
