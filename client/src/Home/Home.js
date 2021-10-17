import { Box } from "@mui/material";
import { useEffect } from "react";
import {useHistory} from "react-router-dom";

export default function Home() {
  
  const history = useHistory();

  useEffect(() => {
    // Need an API call that ensures that a user exists
    (async () => {
      const res = await fetch("http://localhost:5000/validatetoken", {
        method: "GET",
        credentials: "include"
      });
      const resJSON = await res.json();
      if(resJSON.success === false){
        if(resJSON.msg === "no_jwt"){
          history.push("/");
        }else if(resJSON.msg === "jwt_invalid_time"){
          history.push("/login");
        }else if(resJSON.msg==="jwt_parse_err"){
          console.log("ERROR PARSING JWT");
          history.push("/");
        }else{
          console.log("Unhandled API response");
          history.push("/");
        }
      }
    })();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        minHeight: "600px"
      }}
    >
      Homepage
    </Box>
  )
}