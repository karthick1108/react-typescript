import React from "react";
import Home from "./Home";
import Children from "./Children";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:name" component={Children} />
      </Switch>
    </Router>
  );
};

export default App;
