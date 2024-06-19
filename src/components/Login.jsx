import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import login from "../api/login";
import users from "../data"

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function setData(input, type) {
    if (type === "username") setUserName(input);
    if (type === "password") setPassword(input);
  }

  
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || { role: "" };
    if (user.role === "user") {
      window.location.href = "/user-page";
    } else if (user.role === "vendor")  {
      window.location.href = "/vendor-page";
    }
     else if (user.role === "admin"){
      window.location.href = "/admin-page";
    }
  }, []);

  async function CheckName() {
    if (username.length <= 0 || password.length <= 0) {
      console.log({username})
      alert("Enter Correct Details");
      return;
    }

    const currentUser = await login({ userName: username, password: password });
    if (!currentUser) {
      return;
    }

    localStorage.setItem("user", JSON.stringify(currentUser));
    if (currentUser.role === "user") {
      window.location.href = "/user-page";
    } else if (currentUser.role === "vendor") {
      window.location.href = "/vendor-page";
    }else if (currentUser.role === "admin") {
      window.location.href = "/admin-page";

    }
    
    else {
      window.location.href = "/login-failed";
    }
    return;
  }

  // theme
  const defaultTheme = createTheme();

  // Copywrite Function
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://vinay-portfolio-phi.vercel.app/"
          target="_blank"
        >
          Event Management
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              EVENT MANAGEMENT SYSTEM
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h3" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                type="username"
                // value={username}
                label="username"
                onChange={(e) => setData(e.target.value, "username")}
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                // value={password}
                label="Password"
                onChange={(e) => setData(e.target.value, "password")}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                onClick={CheckName}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Login;
