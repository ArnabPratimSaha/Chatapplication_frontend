import react ,{useEffect ,useState} from "react";
import Particles from "react-particles-js";
import axios from "axios";
import Cookies from "js-cookie";

import "./signup.css";
import Navbar from "../../components/sticky-navbar/navbar";
import Footer from "../../components/Footer/footer";
import CodeValidator from "../../components/codeValidateComponent/codeValidate";

const buttonStatus=status=>{
    if(status)
    {
        const button=document.getElementById("btn");
        button.classList.remove("btn-inactive");
        button.classList.add("button-register");
    }
    else
    {
        const button=document.getElementById("btn");
        button.classList.remove("button-register");
        button.classList.add("btn-inactive");
    }
}

const Signup=props=>
{
    const [userNameStatus,changeUserNameStatus]=useState(true);
    const [emailStatus,changeEmailStatus]=useState(true);
    const [checkboxStatus,changeCheckboxStatus]=useState(false);

    const [isSent,changeSent]=useState(false);
    const [isAlreadyExists,changeIsAlreadyExists]=useState(false);

    const [userName,changeUserName]=useState();
    const [email,changeEmail]=useState();

    const [isCodeSent,changeIsCodeSent]=useState(false);
    const [codeStatus,changeCodeStatus]=useState("");

    var [isPasswordValid,changeIsPasswordValid]=useState(false);
    var [isPasswordSame,changeIsPasswordSame]=useState(false);

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(event.target.userName.value.length<5 || event.target.email.value.length<5)
        {
            return;
        }
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_URL+"/signup",
            data: {
                "userName":event.target.userName.value,
                "email": event.target.email.value
            }
        })
        .then(function (response) {
            changeUserName(event.target.userName.value);
            changeEmail(event.target.email.value);
            if(response.data.credentials==="valid")
            {
                changeSent(true);
                changeIsAlreadyExists(false);
            }
            else
            {
                changeIsAlreadyExists(true)
                document.getElementsByClassName("signup-main-div")[0].classList.add("signup-main-div-change");
            }
        });
    }
    const handleCodeSubmit=(response)=>
    {
        if(response.data.credentials==="codeinvalid")
            {
                changeCodeStatus("codeInvalid");
            }
            else if (response.data.credentials==="invalid") {
                changeCodeStatus("Invalid");
            }
            else if(response.data.credentials==="timedout")
            {
                changeCodeStatus("timedOut");
            }
            else
            {
                changeIsCodeSent(true);
            }
    }
    const handlePasswordSubmit=event=>
    {
        event.preventDefault();
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_URL+"/register",
            data: {
                "username":userName,
                "email": email,
                "password":event.target.password.value
            }
        })
        .then(function (response) {
            console.log(response.data);
            if(response.data.credentials==="valid")
            {
                window.location="/home"
                Cookies.set("x-auth-token", response.data.token, { expires: 7 });
            }
        });
    }

    const handleInputChange=event=>
    {
        if (event.target.name==="userName") {
            if(event.target.value.length>=5)
            {
                changeUserNameStatus(true);
                if(document.getElementsByName("email")[0].value.length>=5
                    && checkboxStatus)
                {
                    buttonStatus(true);
                }
            }
            else
            {
                changeUserNameStatus(false);
                buttonStatus(false);
            }
        }
        else
        {
            if(event.target.value.length>=5)
            {
                changeEmailStatus(true);
                if(document.getElementsByName("userName")[0].value.length>=5
                    && checkboxStatus)
                {
                    buttonStatus(true);
                }
            }
            else
            {
                buttonStatus(false);
                changeEmailStatus(false);
            }
        }
        
    }
    const handleCheckboxCheck=event=>{
        if (event.target.checked) {
            changeCheckboxStatus(true);
            if(document.getElementsByName("userName")[0].value.length>=5
                && document.getElementsByName("email")[0].value.length>=5
                )
            {
                buttonStatus(true);
            }
        }
        else
        {
            changeCheckboxStatus(false);
            buttonStatus(false);
        }
    }
    
    
    const handlePasswordCheckboxCheck=event=>{
        if(event.target.checked)
        {
            document.getElementsByName("password")[0].type="text";
            document.getElementsByName("confirmPassword")[0].type="text";
        }
        else
        {
            document.getElementsByName("password")[0].type="password";
            document.getElementsByName("confirmPassword")[0].type="password";
        }
    }
    const handlePasswordChange=event=>{
        if(event.target.name==="password")
        {
            if(event.target.value.length>=5 )
            {
                changeIsPasswordValid(isPasswordValid=true);
                if(event.target.value===document.getElementsByName("confirmPassword")[0].value)
                {
                    changeIsPasswordSame(isPasswordSame=true);
                }
                else
                {
                    changeIsPasswordSame(isPasswordSame=false);
                }
            }
            else
            {
                changeIsPasswordValid(isPasswordValid=false);
            }
        }
        else
        {
            if(event.target.value===document.getElementsByName("password")[0].value)
            {
                changeIsPasswordSame(isPasswordSame=true);
                
            }
            else
            {
                changeIsPasswordSame(isPasswordSame=false);
            }
        }
        if(isPasswordValid && isPasswordSame)
        {
            document.getElementById("btn2").classList.remove("btn-inactive");
            document.getElementById("btn2").classList.add("button-register");
        }
        else
        {
            document.getElementById("btn2").classList.add("btn-inactive");
            document.getElementById("btn2").classList.remove("button-register");
        }
    }
    return(
        <div>
        <Navbar buttonName="signin"/>
            <div name="top-div">
                <div className="signup-main-div">
                    <Particles className="particles"/>
                    <div className="signin-form-div">
                        <h1 className="brand-title">Chatter</h1>
                        {/* brand-title is from chat */}
                        <h2>Sign up</h2>
                        <p >Already Registered? Switch to <a href="/home/login">Log in</a></p>
                        <div>
                            {!isSent && <div className="signup-username-email-form-div">
                                <form onSubmit={handleSubmit}>
                                    <input type="text"
                                        name="userName" 
                                        className="inputfield" 
                                        placeholder="Enter your username" 
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        >
                                    </input><br/>
                                    {!userNameStatus && <h6>Username has to be more than 5 characters long</h6>}
                                    <input type="email"
                                        name="email" 
                                        className="inputfield" 
                                        placeholder="Enter your email id" 
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        >
                                    </input><br/>
                                    {!emailStatus && <h6>Email has to be more than 5 characters long</h6>}
                                    <div  className="signup-checkbox">
                                        <input type="checkbox" name="checkbox" onChange={handleCheckboxCheck}></input><p>I accept the <a href="#">Terms and Conditions</a></p><br/>
                                    </div>
                                    <button disabled={(userNameStatus && emailStatus && checkboxStatus)?false:true} 
                                        type="submit" 
                                        className="btn-inactive" 
                                        id="btn">Sign Up</button>
                                </form>
                            </div>}
                            {isSent&& !isAlreadyExists && !isCodeSent &&
                            <div className="code-validator-div">
                                <h2>Welcome {userName}</h2>
                                <CodeValidator userName={userName} email={email} handleCodeSubmit={handleCodeSubmit} route="/signup" />
                                {codeStatus.length>0 && codeStatus==="codeInvalid" && <h4>Code Invalid-Try again</h4>}
                                {codeStatus.length>0 && codeStatus==="timedOut" && <h4>Code timedout-Try Resending The Code</h4>}
                                {codeStatus.length>0 && codeStatus==="invalid" && <h4>Invalid credentials-Reload the page</h4>}
                            </div>
                           }
                            {isAlreadyExists && <h2 className="exists-p">{email} already exists switch to <a href="/home/login">login</a></h2>}
                            {isCodeSent && <div className="signup-password-div">
                                <h2>Almost there</h2>
                                <h6>Your Username : </h6>
                                <p>{userName}</p><br/>
                                <h5>Your Email : </h5>
                                <p>{email}</p>
                                <form onSubmit={handlePasswordSubmit}>
                                    <input type="password" maxLength="16" 
                                        name="password"
                                        placeholder="Enter Your password"
                                        className="inputfield"
                                        onChange={handlePasswordChange}
                                        ></input><br/>{!isPasswordValid && <p className="sigup-pasword-validator-p">Password has to be between 5 to 16 characters long</p>}
                                    <input type="password" 
                                        maxLength="16" 
                                        name="confirmPassword"
                                        placeholder="Confirm Your password"
                                        className="inputfield"
                                        onChange={handlePasswordChange}
                                        ></input><br/>{!isPasswordSame && <p className="sigup-pasword-validator-p">Password has to same</p>}
                                        <input type="checkbox" onChange={handlePasswordCheckboxCheck}></input><p>Show Password</p><br/>
                                    <button type="submit" 
                                        className="btn-inactive" id="btn2"
                                        disabled={(isPasswordValid && isPasswordSame)?false:true}  
                                        >Confirm</button>
                                </form>
                            </div>}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}
export default Signup;