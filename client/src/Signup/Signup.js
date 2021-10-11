import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Signup(){
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirm, setValidConfirm] = useState(true);

  const nameRegex = /^[A-z][A-z-']{1,50}$/;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[0-9a-zA-Z!@#$%^&*()]{8,}$/;

  const handleClick = () =>{
    const firstName = document.getElementById("Signup-FirstName").value;
    const lastName = document.getElementById("Signup-LastName").value;
    const email = document.getElementById("Signup-Email").value;
    const password = document.getElementById("Signup-Password").value;
    const confirm = document.getElementById("Signup-Confirm").value;

    setValidFirstName(nameRegex.test(firstName));
    setValidLastName(nameRegex.test(lastName));
    setValidEmail(emailRegex.test(email));
    setValidPassword(passwordRegex.test(password));
    setValidConfirm(passwordRegex.test(confirm) && confirm === password);

    if(nameRegex.test(firstName) && nameRegex.test(lastName) && emailRegex.test(email) && passwordRegex.test(password) && confirm === password){
      console.log("Ready for API call");
    }
  }

  return(
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
          bgcolor:"white"
        }}
      >
        <Typography variant="h5">Sign Up</Typography>
        
        
        <Box
          sx={{
            width: "80%",
            boxSizing: "border-box",
          }}
        >
          <TextField variant="outlined" error={!validFirstName} id="Signup-FirstName" label="First Name" size="small" sx={{ marginRight: "10%", width: "45%"}}></TextField>
          <TextField variant="outlined" error={!validLastName} id="Signup-LastName" label="Last Name" size="small" sx={{width: "45%"}}></TextField>
        </Box>
        <TextField variant="outlined" error={!validEmail} id="Signup-Email" label="E-Mail" type="email" size="small" sx={{width: "80%"}}></TextField>
        <TextField variant="outlined" error={!validPassword} id="Signup-Password" label="Password" type="password" size="small" sx={{width: "80%"}}></TextField>
        <TextField variant="outlined" error={!validConfirm} id="Signup-Confirm" label="Confirm Password" type="password" size="small" sx={{width: "80%"}}></TextField>
        <Button variant="contained" onClick={handleClick}>Sign Up</Button>

      </Box>
    </Box>
  )
}