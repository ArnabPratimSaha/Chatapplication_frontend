import react from "react";
import "./heading.css";

const Heading=props=>
{
    return(
        <div className="heading-div">
            {props.type==="main"&&<h1>{props.heading}</h1>}
            {props.type==="sub"&&<h1>{props.heading}</h1>}
        </div>
    )
}
export default Heading;