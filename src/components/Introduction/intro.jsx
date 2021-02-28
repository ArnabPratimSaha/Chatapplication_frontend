import react from 'react';

import "./intro.css";

const Intro=(props)=>{
    const handleClick=()=>
    {
        window.location="/home/register";
    }
    return(
        <div className="div-Intro-1">
            <div className="div-intro-2">
                <h2 className="intro-brandname">Chatter</h2>
                <h1>Welcome To a Beautiful</h1> 
                <h6>World of Chatting</h6>
            </div>
            <button className="button-1" onClick={handleClick}>Get Started</button>
        </div>
    )
}
export default Intro;