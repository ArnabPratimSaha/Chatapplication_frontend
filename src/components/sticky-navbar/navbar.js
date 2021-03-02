import react ,{useState,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./navbar.css";
require('dotenv').config()
const Navbar=(props)=>
{
    var [isverified,changeVerfied]=useState(false);
    const [name,changeName]=useState("");
    const token=Cookies.get('x-auth-token');
    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND_URL+"/getname",{headers : {'x-auth-token': token}})
        .then(function (response) {
            if(response.data.status)
            {
                changeName(response.data.name);
                changeVerfied(isverified=true);
            }
            else
            {
                changeVerfied(isverified=false);
            }
            const disableButtonList=document.getElementsByName(props.buttonName);
    if(disableButtonList)
    {
        const disableButton=disableButtonList[0];
        if(disableButton.name==="home" || disableButton.name==="chat" || disableButton.name==="friends")
        {
            disableButton.disabled = true;
            disableButton.style.opacity = "0.5";
            disableButton.classList.remove("navbar-button");
            disableButton.classList.add("navbar-active-page-button");
            if(isverified===false )
            {
                var tempKey=document.getElementsByName("friends")[0];
                tempKey.disabled = true;
                tempKey.style.opacity = "0.5";
                tempKey.classList.remove("navbar-button");
                tempKey.classList.add("navbar-active-page-button");

                tempKey=document.getElementsByName("chat")[0];
                tempKey.disabled = true;
                tempKey.style.opacity = "0.5";
                tempKey.classList.remove("navbar-button");
                tempKey.classList.add("navbar-active-page-button");
            }
        }
        else
        {
            disableButtonList.forEach(item=>{
                item.disabled = true;
                item.style.opacity = "0.5";
                item.classList.remove("navbar-button");
                item.classList.add("navbar-active-page-button-bottom");
            })
        }
    }
        })
        .catch(function (error) {
            console.log(error);
    });

    const navbar=document.getElementById("sticky-navbar");
        window.addEventListener("scroll",(event)=>{
            if(navbar)
            {
              navbar.classList.toggle("navbar-sticky",window.scrollY>300);
            }
    });
    
    const sliderToggle=document.getElementById("navbar-icon-togle");
    const slider=document.getElementById("navbar-slider");
    if(sliderToggle)
    {
        sliderToggle.addEventListener("click",()=>{
            if(slider.classList[0]=="navbar-idle")
            {
                slider.classList.add("navbar-slider");
                slider.classList.remove("navbar-idle");
                sliderToggle.classList.remove("fa-bars");
                sliderToggle.classList.add("fa-times");
            }
            else
            {
                slider.classList.add("navbar-idle");
                slider.classList.remove("navbar-slider");
                sliderToggle.classList.remove("fa-times");
                sliderToggle.classList.add("fa-bars");
            }
        })
    }
    
    },[])

    const handleClick=(event)=>{
        if(event.target.name==="home")
        {
            window.location="/home";
        }
        else if(event.target.name==="chat")
        {
            window.location="/home/chat";
        }
        else if(event.target.name==="friends")
        {
            window.location="/home/friends";
        }
        else if(event.target.name==="login")
        {
            window.location="/home/login";
        }
        else if(event.target.name==="signin")
        {
            window.location="/home/register";
        }
        else
        {
            if(token)
            {
                Cookies.remove('x-auth-token');
                window.location="/home";
            }
        }
    }
    const handleBlur=()=>
    {
        const temp=document.getElementsByName("top-div")[0];
        if(temp.classList.length===0)
        {
            temp.classList.add("blur");
        }
        else
        {
            temp.classList.remove("blur");
        }
    }

    return(
        <div>
            <div className="navbar-div-1" id="sticky-navbar">
                <i className="fas fa-bars" id="navbar-icon-togle" onClick={handleBlur}></i>
                <a href="#">Chatter</a>
                <div className="navbar-button-div" >
                    {!isverified && <button className="navbar-button" name="login" type="submit" onClick={handleClick}>Log In</button>}
                    {!isverified && <button className="navbar-button" name="signin" type="submit" onClick={handleClick}>Sign In</button>}
                    {isverified && <h6>Signed in as  {name}</h6>}
                    {isverified && <button className="navbar-button" name="logout" type="submit" onClick={handleClick}>Log Out</button>}
                </div>
            </div>
            <div className="navbar-idle" id="navbar-slider">
                <h6 className="navbar-dashboard">Menu</h6>
                <div className="navbar-buttons-1">
                    <button className="navbar-button" name="home" type="submit" onClick={handleClick}>Home</button><br/>
                    <button className="navbar-button" name="chat" type="submit" onClick={handleClick}>Chat</button><br/>
                    <button className="navbar-button" name="friends" type="submit" onClick={handleClick}>Friends</button><br/>
                </div>
                <div className="navbar-buttons-2">
                    <button className="navbar-button" name="login" type="submit" onClick={handleClick}>log in</button><br/>
                    <button className="navbar-button" name="signin" type="submit" onClick={handleClick}>sign up</button><br/>
                    {isverified && <button className="navbar-button" name="logout" type="submit" onClick={handleClick}>Log Out</button>}
                    <h6 className="navbar-versioncontrol">version :0.1.0 (beta)</h6>
                </div>
            </div>
        </div>
    )
}
export default Navbar;