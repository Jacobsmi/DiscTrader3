import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  // Track the validity of inputs with state
  const [validEmail, setValidEmail] = useState(true);
  const [existingEmail, setExistingEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [correctPassword, setCorrectPassword] = useState(true);
  const [serverError, setServerError] = useState(false);

  // Create regex for checking validity of values
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[0-9a-zA-Z!@#$%^&*()]{8,}$/;

  const handleClick = async () => {
    const email = document.getElementById("Login-Email").value;
    const password = document.getElementById("Login-Password").value;

    setValidEmail(emailRegex.test(email));
    setValidPassword(passwordRegex.test(password));
    setServerError(false);
    setExistingEmail(true);
    setCorrectPassword(true);

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const resJSON = await res.json();
      if(resJSON.success === false){
        if(resJSON.code === 1){
          setExistingEmail(false);
          setValidEmail(false);
        }else if(resJSON.code === 2){
          setServerError(true);
        }else if(resJSON.code === 3){
          setValidPassword(false);
          setCorrectPassword(false);
        }
      }else if (resJSON.success === true){
        history.push("/home");
      }
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        minHeight: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "primary.main"
      }}
    >
      <Box
        sx={{
          height: "50%",
          width: ["80%", "70%", "40%", "35%", "30%"],
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          bgcolor: "white"
        }}
      >
        <Typography variant="h5">Login</Typography>

        <Box
          display={serverError ? "flex" : "none"}
          sx={{
            height: "10%",
            width: "80%",
            bgcolor: "error.main",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Server error, please try again
        </Box>

        <TextField variant="outlined"
          error={!validEmail}
          id="Login-Email"
          label="E-Mail"
          type="email"
          size="small"
          helperText={existingEmail ? "" : "E-Mail does not exist please sign up"}
          sx={{ width: "80%" }}
        ></TextField>

        <TextField
          variant="outlined"
          error={!validPassword}
          id="Login-Password"
          helperText={correctPassword ? "" : "Password is not correct"}
          label="Password"
          type="password"
          size="small"
          sx={{ width: "80%" }}
        ></TextField>

        <Button variant="contained" onClick={handleClick}>Login</Button>

      </Box>
    </Box>
  )
}