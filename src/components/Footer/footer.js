import react from "react";

import "./footer.css"
import Logo from "./images/logo.png"

const Footer=()=>{
    const date=new Date().getFullYear();
    return(
        <div className="footer-maindiv">
            <div className="footer-topdiv">
                <h1>Made With <i className="fas fa-heart"></i> Using</h1>
                <div className="footer-logos">
                    <i className="fab fa-html5"></i>
                    <i className="fab fa-css3-alt"></i>
                    <i className="fab fa-bootstrap"></i>
                    <i className="fab fa-js-square"></i>
                    <i className="fab fa-node"></i>
                    <img src={Logo}></img>
                    <i className="fab fa-react"></i>
                </div>
            </div>
            <div className="footer-middlediv">
                <h6>Contact Me</h6>
                <a href="https://github.com/ArnabPratimSaha"><i className="fab fa-github"></i></a> 
                <a href="https://www.instagram.com/arnabpratimsaha/"><i className="fab fa-instagram"></i></a> 
                <a href="https://discord.gg/EAmu6pNJp7"><i className="fab fa-discord"></i></a> 
                <h6>COPYRIGHT © {date}</h6>
            </div>
        </div>
    )
}
export default Footer;