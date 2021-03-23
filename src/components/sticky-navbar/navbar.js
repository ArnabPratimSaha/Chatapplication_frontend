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
        if(isverified===false )
        {
            var tempKey=document.getElementsByName("friends")[0];
            tempKey.disabled = true;
            tempKey.style.opacity = "0.5";
            tempKey.classList.remove("navbar-button-slider");
            tempKey.classList.add("navbar-active-page-button");

            tempKey=document.getElementsByName("chat")[0];
            tempKey.disabled = true;
            tempKey.style.opacity = "0.5";
            tempKey.classList.remove("navbar-button-slider");
            tempKey.classList.add("navbar-active-page-button");
        }
        const disableButton=disableButtonList[0];
        if(disableButton.name==="home" || disableButton.name==="chat" || disableButton.name==="friends")
        {
            disableButton.disabled = true;
            disableButton.style.opacity = "0.5";
            disableButton.classList.remove("navbar-button-slider");
            disableButton.classList.add("navbar-active-page-button");
            if(isverified===false )
            {
                var tempKey=document.getElementsByName("friends")[0];
                tempKey.disabled = true;
                tempKey.style.opacity = "0.5";
                tempKey.classList.remove("navbar-button-slider");
                tempKey.classList.add("navbar-active-page-button");

                tempKey=document.getElementsByName("chat")[0];
                tempKey.disabled = true;
                tempKey.style.opacity = "0.5";
                tempKey.classList.remove("navbar-button-slider");
                tempKey.classList.add("navbar-active-page-button");
            }
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
                sliderToggle.style.transform="rotatez(-180deg)";
                slider.classList.add("navbar-slider");
                slider.classList.remove("navbar-idle");
                document.getElementById("navbar-icon-togle-2").style.display="none";
            }
            else
            {
                sliderToggle.style.transform="rotatez(0deg)";
                slider.classList.add("navbar-idle");
                slider.classList.remove("navbar-slider");
                document.getElementById("navbar-icon-togle-2").style.display="block";
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
                <i className="fas fa-chevron-right" id="navbar-icon-togle" onClick={handleBlur}></i>
                <i className="fas fa-chevron-right" id="navbar-icon-togle-2"></i>
                <a href="#" className="navbar-brandname">Chatter</a>
                <div className="navbar-button-div" >
                    {isverified && <h6 className="navbar-signed-in-as">Signed in as  {name}</h6>}
                    <div>
                        {!isverified && <button className="navbar-button" name="login" type="submit" onClick={handleClick}>Log in</button>}
                        {!isverified && <button className="navbar-button" name="signin" type="submit" onClick={handleClick}>Sign up</button>}
                        {isverified && <button className="navbar-button" name="logout" type="submit" onClick={handleClick}>Log out</button>}
                    </div>
                </div>
            </div>
            <div className="navbar-idle" id="navbar-slider">
                <h6 className="navbar-dashboard">Menu</h6>
                <div className="navbar-buttons-1">
                    <button className="navbar-button-slider" name="home" type="submit" onClick={handleClick}>Home</button><br/>
                    <button className="navbar-button-slider" name="chat" type="submit" onClick={handleClick}>Chat</button><br/>
                    <button className="navbar-button-slider" name="friends" type="submit" onClick={handleClick}>Friends</button><br/>
                </div>
                <div className="navbar-buttons-2">
                    <button className="navbar-button-slider" name="login" type="submit" onClick={handleClick}>Log in</button><br/>
                    <button className="navbar-button-slider" name="signin" type="submit" onClick={handleClick}>Sign up</button><br/>
                    {isverified && <button className="navbar-button-slider" name="logout" type="submit" onClick={handleClick}>Log Out</button>}
                    <h6 className="navbar-versioncontrol">version :{process.env.REACT_APP_VERSION}</h6>
                </div>
            </div>
        </div>
    )
}
export default Navbar;