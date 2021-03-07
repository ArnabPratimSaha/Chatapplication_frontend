import react,{useEffect,useState} from "react";
import axios from "axios";

import "./codeValidate.css";

const makeArray=()=>{
    
    var array=[];
    for (let i = 1; i <= 6; i++) {
        var inputName="code"+i;
        if(document.getElementsByName(inputName)[0])
        {
            array.push(document.getElementsByName(inputName)[0].value);
        }
        else
        {
            array.push(-1);
        }
    }
    return array;
}
const CodeValidate=props=>
{
    const handleKeyDown=(event)=>{
        if(event.target.value.length===1)
        {
            const nextInput=document.getElementsByName("code"+(Number(event.target.name.split("e")[1])+1))[0];
            if(nextInput)
            {
                nextInput.focus();
            }  
        }
        else if(event.target.value.length===0)
        {
            const prevInput=document.getElementsByName("code"+(Number(event.target.name.split("e")[1])-1))[0];
            if(prevInput)
            {
                prevInput.focus();
            } 
        }
    }
    const handleResend=()=>
    {
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_URL+props.route,
            data: {
                "userName":props.userName,
                "email": props.email
            }
        });
    }
    const handleCodeSubmit=event=>
    {
        event.preventDefault();
        const array=makeArray();
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_URL+props.route+"/validate",
            data: {
                "userName":props.userName,
                "email": props.email,
                "code":array
            }
        })
        .then(function (response) {
            props.handleCodeSubmit(response);
            
        });

    }
    return(
        <div className="signup-code-div">
        <p>An email has been sent to {props.email}</p>
        <p>Enter the verification code to continue</p>
        <form onSubmit={handleCodeSubmit}>
            <div className="signup-slot">
                <input type="text" name="code1" maxLength="1" onKeyUp={handleKeyDown}/>
                <input type="text" name="code2" maxLength="1" onKeyUp={handleKeyDown}/>
                <input type="text" name="code3" maxLength="1" onKeyUp={handleKeyDown}/>
                <input type="text" name="code4" maxLength="1" onKeyUp={handleKeyDown}/>
                <input type="text" name="code5" maxLength="1" onKeyUp={handleKeyDown}/>
                <input type="text" name="code6" maxLength="1" onKeyUp={handleKeyDown}/>
            </div>
            <button type="submit" className="button-register">Send</button>
        </form>
        <h5>I did not recived the email </h5><h6 onClick={handleResend}>Sent Again</h6>
        </div>
    )
}
export default CodeValidate;