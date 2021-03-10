import './App.css';
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React,{Suspense,lazy} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

const Home=React.lazy(()=>import("./pages/home/home"));
const Signup=React.lazy(()=>import("./pages/signup/signup"));
const Login=React.lazy(()=>import("./pages/login/login"));
const Friends=React.lazy(()=>import("./pages/makefriend/makefriend"));
const Chat=React.lazy(()=>import("./pages/Chat/frontpage"));


function App() {
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
      <Switch>
          <Route path="/home" exact component={Home}/>
          <Route path="/home/register" exact component={Signup}/>
          <Route path="/home/login" exact component={Login}/>
          <Route path="/home/secrets" exact component={Signup}/>
          <Route path="/home/friends" exact component={Friends}/>
          <Route path="/home/chat" exact component={Chat}/>
          <Redirect to="/home"></Redirect>
      </Switch>
        </Suspense>
    </Router>
  );
}

export default App;
