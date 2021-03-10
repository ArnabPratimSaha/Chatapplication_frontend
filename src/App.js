import './App.css';
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Home from "./pages/home/home";

const Signup=React.lazy(()=>{import("./pages/signup/signup")});
const Login=React.lazy(()=>{import("./pages/login/login")});
const Friends=React.lazy(()=>{import("./pages/makefriend/makefriend")});
const Chat=React.lazy(()=>{import("./pages/Chat/frontpage")});

// git commit -m "added code spliting for optimization

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <Home/>
        </Route>
        <Route path="/home/register" exact>
          <Signup/>
        </Route>
        <Route path="/home/login" exact>
          <Login/>
        </Route>
        <Route path="/home/secrets" exact>
          <Signup/>
        </Route>
        <Route path="/home/friends" exact>
          <Friends/>
        </Route>
        <Route path="/home/chat" exact>
          <Chat/>
        </Route>
        <Redirect to="/home"></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
