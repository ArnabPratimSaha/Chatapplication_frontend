import react from "react";
import axios from "axios";

import "./namebuttons.css";

const Namebutton=(props)=>{
    const handleClick=(event)=>{
        props.click(props.name,props.email);
    }
    return (
        <div className="namebutton-buttons">
            <button onClick={handleClick} name={props.email} className="chatfront-namebutton">{props.name}<br/>{props.email}</button>
        </div>
    )
}
export default Namebutton;