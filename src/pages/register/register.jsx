import axios from "axios";
import Cookies from "js-cookie";

import { useState,useEffect } from "react";
import "./register.css"

import Navbar from "../../components/sticky-navbar/navbar";

const Register=()=>{
    const [h1Title,changeTitle]=useState("");
    var [name,changeName]=useState("");

    var [btnActive,changeBTNActive]=useState(false);

    var [satisfyUsername,changeUsername]=useState(false);
    var [satisfyEmail,changeEmail]=useState(false);
    var [satisfyPassword,changePassword]=useState(false);
    var [satisfyConfirmPassword,changeConfirmPassword]=useState(false);
    var [password,changePassword1]=useState("");

    useEffect(()=>{
        document.getElementById("btn").disabled=!btnActive;
        document.getElementById("btn").classList.add("btn-inactive");
        document.getElementById("btn").classList.remove("button-register");
    },[]);

    const handleSubmit = (event) => {
        axios({
            method: 'post',
            url: 'https://chatterarnab.herokuapp.com/home/register',
            data: {
                "username":event.target.username.value,
                "email": event.target.email.value,
                "password": event.target.password.value
            }
        })
        .then(function (response) {
            if(response.data.credentials==="invalid")
            {
                changeTitle("USER ALREADY EXISTS");
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
        if(event.target.name==="username" )
        {
            changeName(event.target.value);
            if(event.target.value.length >3)
            {
                changeUsername(satisfyUsername=true);
            }
            else
            {
                changeUsername(satisfyUsername=false);
            }
        }
        if(event.target.name==="email" )
        {
            if(event.target.value.length >3)
            {
                changeEmail(satisfyEmail=true);
            }
            else
            {
                changeEmail(satisfyEmail=false);
            }
        }
        if(event.target.name==="password")
        {
            changePassword1(event.target.value);
            if(event.target.value.length >4)
            {
                changePassword(satisfyPassword=true);
            }
            else
            {
                changePassword(satisfyPassword=false);
            }
        }
        if(event.target.name==="confirmPassword")
        {
            if(event.target.value===password)
            {
                changeConfirmPassword(satisfyConfirmPassword=true);
            }
            else
            {
                changeConfirmPassword(satisfyConfirmPassword=false);
            }
        }
        if(satisfyUsername && satisfyEmail && satisfyPassword && satisfyConfirmPassword)
        {
            changeBTNActive(btnActive=true);
            document.getElementById("btn").classList.remove("btn-inactive");
            document.getElementById("btn").classList.add("button-register");
        }
        else
        {
            changeBTNActive(btnActive=false);
            document.getElementById("btn").classList.add("btn-inactive");
            document.getElementById("btn").classList.remove("button-register");
            console.log(document.getElementById("btn").classList);
        }
    
        event.target.classList.remove("tempClass2");
        event.target.classList.add("tempClass1");
        setTimeout(()=>{
            event.target.classList.add("tempClass2");
            event.target.classList.remove("tempClass1");
        },1500);
    }
    return(
        <div >
        <Navbar className="chatfront-navbar" buttonName="signin" />
            <div name="top-div">
                <div className="register-main-div">
            
            <div className="top-div-login">
            </div>
            <div className="login-title">
                <h1 >Register</h1>
                {name.length ? <h2 className="welcome-back">Hello</h2> :null}
                <h3 className="login-name">{name}</h3>
            </div>
            <div className="login-div">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" onChange={handleChange} placeholder="Username" className="inputfield1 inputfield"></input><br/>
                    <input type="email" name="email" onChange={handleChange} placeholder="Email" className="inputfield2 inputfield"></input><br/>
                    <input type="password" name="password" onChange={handleChange} placeholder="Password"  className="inputfield3 inputfield"></input><br/>
                    <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Comfirm password"  className="inputfield4 inputfield"></input><br/>
                    <h1 id="error">{h1Title}</h1>
                    <button type="submit" disabled={btnActive ?false :true}  id="btn">SUBMIT</button>
                </form>
            </div> 
        </div> 
            </div>
        </div>
       
    );
}
export default Register;