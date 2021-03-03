import axios from "axios";
import Cookies from "js-cookie";

import { useState } from "react";
import "./login.css";

import Navbar from "../../components/sticky-navbar/navbar";

function Login(props){

    const [h1Title,changeTitle]=useState("");
    var [name,changeName]=useState("");

    const handleSubmit = (event) => {
        
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_URL+"/login",
            data: {
                "email": event.target.email.value,
                "password": event.target.password.value
            }
        })
        .then(function (response) {
            if(response.data.credentials==="invalid")
            {
                changeTitle("INVALID CREDENTIALS");
                changeName("");
            }
            else{
                window.location="/home"
                Cookies.set("x-auth-token", response.data.token, { expires: 7 });
            }
        });
        event.preventDefault();
    }
    const handleChange=(event)=>
    {
        if(event.target.name==="name")
        {
            changeName(event.target.value);
            changeTitle("");
        }
        event.target.classList.remove("tempClass2");
        event.target.classList.add("tempClass1");
        setTimeout(()=>{
            event.target.classList.add("tempClass2");
            event.target.classList.remove("tempClass1");
        },1000);
    }

    return(
        <div>
            <Navbar/>
            <div name="top-div">
                <div className="login-main-div">
                    <div className="top-div-login">
                    </div>
                    <div className="login-title">
                        <h1 >LOGIN</h1>
                        {name.length ? <h2 className="welcome-back">Welcome Back</h2> :null}
                        <h3 className="login-name">{name}</h3>
                    </div>
                    <div className="login-div">
                    <form onSubmit={handleSubmit} method="post">
                        <input type="text" placeholder="enter your name" name="name" onChange={handleChange} className="inputfield1 inputfield" autoComplete="off"/><br/>
                        <input type="email" name="email" placeholder="email" onChange={handleChange}   className="inputfield2 inputfield" /><br/>
                        <input type="password" name="password" placeholder="password" onChange={handleChange}  className="inputfield3 inputfield" /><br/>
                        <h1 id="error">{h1Title}</h1>
                        <button type="submit" className="button-login">SUBMIT</button>
                    </form> 
                    </div>
                </div>
            </div> 
        </div>
        
        
    );
}
export default Login;