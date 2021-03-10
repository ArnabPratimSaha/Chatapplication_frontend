import axios from "axios";
import Cookies from "js-cookie";
import Particles from "react-particles-js";

import react,{ useState } from "react";
import "./login.css";

import Footer from "../../components/Footer/footer";
import Navbar from "../../components/sticky-navbar/navbar";


const Login=(props)=>{
    var [isButtonActive,changeIsButtonActive]=useState(false);
    const [credentials,changeCredentials]=useState("");
    
    const handleSubmit=event=>
    {
        event.preventDefault();
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_URL+"/login",
            data: {
                "email": event.target.email.value,
                "password":event.target.password.value
            }
        })
        .then(function (response) {
            if(response.data.credentials==="valid")
            {
                window.location="/home"
                Cookies.set("x-auth-token", response.data.token, { expires: 7 });
            }
            else
            {
                changeCredentials("Inavlid");
            }
        });
    }

    const handleCheckboxChange=(event)=>{
        if(event.target.checked)
        {
            document.getElementsByName("password")[0].type="text";
        }
        else
        {
            document.getElementsByName("password")[0].type="password";
        }
    }
    const handleInputChange=event=>
    {
        if(event.target.value.length>=5)
        {
            if(event.target.name==="email")
            {
                if(document.getElementsByName("password")[0].value.length>=5)
                {
                    changeIsButtonActive(isButtonActive=true);
                }
                else
                {
                    changeIsButtonActive(isButtonActive=false);
                }
            }
            else
            {
                if(document.getElementsByName("email")[0].value.length>=5)
                {
                    changeIsButtonActive(isButtonActive=true);
                }
                else
                {
                    changeIsButtonActive(isButtonActive=false);
                }
            }
        }
        else
        {
            changeIsButtonActive(isButtonActive=false);
        }
        
    }
    return(
        <div>
            <Navbar buttonName="login"/>
            <div name="top-div">
                <div className="login-main-div">
                    <Particles className="particles"/>
                    <div className="login-form-div">
                        <h1 className="brand-title">Chatter</h1>
                        <h2>Log in</h2>
                        <p>Not Registered? Switch to <a href="/home/register">Sign up</a></p>
                        <form onSubmit={handleSubmit}>
                            <input  placeholder="Enter your email" 
                                type="text"
                                autoComplete="off" 
                                autoCorrect="off" 
                                className="inputfield"
                                name="email"
                                onChange={handleInputChange}
                                 /><p>email has to more than 5 characters long</p><br/>
                                
                            <input  placeholder="Enter Your Password" 
                                type="password"
                                maxLength="16" 
                                autoComplete="off" 
                                autoCorrect="off" 
                                className="inputfield"
                                name="password" 
                                onChange={handleInputChange}
                                /><p>password has to more than 5 characters long</p><br/>
                            <input type="checkbox" 
                                onChange={handleCheckboxChange} ></input> <h6>Show Password</h6><br/>
                           <button type="submit"
                                className={isButtonActive?"button-register":"btn-inactive"} 
                                disabled={isButtonActive?false:true}
                                >Log In</button>
                        </form>
                        {credentials.length>0 &&<h3>Credentials Invalid-Check Inputs</h3>}
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
}
export default Login;