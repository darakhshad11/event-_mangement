import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import createUser from "../api/createUser";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {/* {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const [role, setRole] = React.useState("user");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSelectChange = (e) => {
    setRole(e.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || { role: "" };
    if (user.role === "user") {
      window.location.href = "/user-page";
    } else if (user.role === "vendor") {
      window.location.href = "/vendor-page";
    }
  }, []);

  const registerUser = async () => {
    let formData = {
      email: email,
      password: password,
      role: role,
      userName: username,
    };
    const userCreated = await createUser(formData);
    if (userCreated) {
      localStorage.setItem("user", JSON.stringify(formData));
      if (formData.role === "user") {
        window.location.href = "/user-page";
      } else if (formData.role === "vendor") {
        window.location.href = "/vendor-page";
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "20px 0" }}>
        <Container component="main" maxWidth="xs" style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    onChange={handleUsernameChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={handleEmailChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={handlePasswordChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <label style={{ marginTop: "20px" }} htmlFor="">
                    Select Your Role (Vendor , User or Admin)
                  </label>
                  <Select
                    style={{ marginTop: "10px" }}
                    variant="outlined"
                    value={role}
                    onChange={handleSelectChange}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="vendor">Vendor</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                onClick={registerUser}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </div>
    </ThemeProvider>
  );
}
