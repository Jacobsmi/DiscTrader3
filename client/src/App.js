import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home/Home";
import Landing from "./Landing/Landing";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}