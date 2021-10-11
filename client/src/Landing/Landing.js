import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import {Link} from "react-router-dom";
import DiscBasket from "./DiscBasket.svg";

export default function Landing(){
  return(
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        minHeight: "600px"
      }}
    >
      <AppBar sx={{height: "10%", display:"flex", justifyContent: "center"}} position="static">
        <Toolbar>
          <Typography variant="h5" flexGrow="1">Disc Trader</Typography>
          <Button 
            variant="contained" 
            sx={{
              marginRight: "2%", 
              bgcolor: "white", 
              color:"black"
            }}
            component={Link}
            to="/signup"
          >Sign Up</Button>
          <Button 
            variant="contained" 
            sx={{bgcolor:"primary.light",}}
            component={Link}
            to="/login"
          >Login</Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: "90%",
          display: "flex",

        }}
      >
        <Box
          sx={{
            width: ["100%", "100%", "50%", "50%", "50%"],
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" sx={{width: "70%", marginLeft:"5%", marginTop: "20%"}}>Your online store for everything Disc Golf</Typography>
          <Typography variant="h5" sx={{width: "70%", marginLeft:"5%", marginTop: "5%"}}>Buy, sell, or trade anything disc golf new or used!</Typography>
        </Box>
        <Box
          display={{xs:"none", md: "flex"}}
          sx={{
            width: ["0", "0", "50%", "50%", "50%"],
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img src={DiscBasket} height="60%" alt="Disc Golf Basket" />
        </Box>
      </Box>
    </Box>
  )
}