import {BrowserRouter, Route, Switch} from "react-router-dom";
import Landing from "./Landing/Landing";
import Signup from "./Signup/Signup";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
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