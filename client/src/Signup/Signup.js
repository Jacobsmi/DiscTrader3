import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();

  // Track the validity of inputs with state
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [uniqueEmail, setUniqueEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirm, setValidConfirm] = useState(true);
  const [serverError, setServerError] = useState(false);

  // Create regex for checking validity of values
  const nameRegex = /^[A-z][A-z-']{1,50}$/;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[0-9a-zA-Z!@#$%^&*()]{8,}$/;

  // Handles when the sign up button is clicked
  const handleClick = async () => {
    // Get the values of all the inputs
    const firstName = document.getElementById("Signup-FirstName").value;
    const lastName = document.getElementById("Signup-LastName").value;
    const email = document.getElementById("Signup-Email").value;
    const password = document.getElementById("Signup-Password").value;
    const confirm = document.getElementById("Signup-Confirm").value;

    // Set the validity of all the values
    setValidFirstName(nameRegex.test(firstName));
    setValidLastName(nameRegex.test(lastName));
    setValidEmail(emailRegex.test(email));
    setValidPassword(passwordRegex.test(password));
    setValidConfirm(passwordRegex.test(confirm) && confirm === password);

    // If all values are valid execute the API call
    if (nameRegex.test(firstName) && nameRegex.test(lastName) && emailRegex.test(email) && passwordRegex.test(password) && confirm === password) {
      const res = await fetch("http://localhost:5000/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        })
      })
      const resJSON = await res.json();
      console.log(resJSON);
      if (resJSON.success === true) {
        history.push("/home");
      } else if (resJSON.success === false) {
        if (resJSON.code === 1) {
          setUniqueEmail(false);
          setValidEmail(false);
        }else if (resJSON.code === 2){
          console.log("Need to handle unknown server error");
          setServerError(true);
        }
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
          height: "70%",
          width: ["80%", "70%", "40%", "35%", "30%"],
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          bgcolor: "white"
        }}
      >
        <Typography variant="h5">Sign Up</Typography>

        <Box
          display={serverError? "flex":"none"}
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

        <Box
          sx={{
            width: "80%",
            boxSizing: "border-box",
          }}
        >
          <TextField variant="outlined" error={!validFirstName} id="Signup-FirstName" label="First Name" size="small" sx={{ marginRight: "10%", width: "45%" }}></TextField>
          <TextField variant="outlined" error={!validLastName} id="Signup-LastName" label="Last Name" size="small" sx={{ width: "45%" }}></TextField>
        </Box>

        <TextField variant="outlined"
          error={!validEmail}
          id="Signup-Email"
          label="E-Mail"
          type="email"
          size="small"
          helperText={uniqueEmail? "": "E-Mail already exists"}
          sx={{ width: "80%" }}
        ></TextField>

        <TextField 
          variant="outlined" 
          error={!validPassword}
          helperText= "Password must be atleast 8 digits with a number, capital letter, and special character."
          id="Signup-Password" 
          label="Password" 
          type="password" 
          size="small" 
          sx={{ width: "80%" }}
        ></TextField>

        <TextField variant="outlined" error={!validConfirm} id="Signup-Confirm" label="Confirm Password" type="password" size="small" sx={{ width: "80%" }}></TextField>
        <Button variant="contained" onClick={handleClick}>Sign Up</Button>

      </Box>
    </Box>
  )
}