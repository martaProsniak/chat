import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

const App = () => (
  <Router>
    <Route path="/chat" component={Chat}></Route>
    <Route path="/" exact component={Join}></Route>
  </Router>
);

export default App;
