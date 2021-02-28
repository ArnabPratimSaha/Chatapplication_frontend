import './App.css';
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Ui from "./pages/uipage.js/ui"
import Friends from "./pages/makefriend/makefriend";
import Chat from "./pages/Chat/frontpage";//chat frontpage

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <Home/>
        </Route>
        <Route path="/home/register" exact>
          <Register/>
        </Route>
        <Route path="/home/login" exact>
          <Login/>
        </Route>
        <Route path="/home/secrets" exact>
          <Ui/>
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
