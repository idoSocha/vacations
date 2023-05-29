import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Login.css";
import { Copyright } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import User from "../../Models/User";

function LoginTemp(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const send = (userData: User) => {
    console.log(userData);
  };
  return (
    <div className="Login">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <form onSubmit={handleSubmit(send)}>
              <TextField
                margin="normal"
                // required
                fullWidth
                // id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: { value: true, message: "אנא הזן שם משתמש" },
                  minLength: {
                    value: 5,
                    message: "אנא הזן שם משתמש ארוך מ5 תווים",
                  },
                })}
              />
              <br />
              <span className="ErrMsg">{errors.email?.message}</span>
              <br />
              <TextField
                margin="normal"
                // required
                fullWidth
                // name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: { value: true, message: "אנא הזן סיסמא" },
                  minLength: {
                    value: 5,
                    message: "אנא הזן סיסמא ארוכה מ5 תווים",
                  },
                })}
              />
              <br />
              <span className="ErrMsg">{errors.password?.message}</span>
              <br />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}

export default LoginTemp;
