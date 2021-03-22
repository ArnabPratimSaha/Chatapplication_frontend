import react from "react";
import "./Body.css";

const Body=props=>{
    return(
        <div className={`body-div ${props.newClass}`}>
            {props.type==="new" && <p className={props.isMajor ?"major":null}>{`ADDED : ${props.body}`}</p>}
            {props.type==="change" && <p className={props.isMajor ?"major":null}>{`CHANGED : ${props.body}`}</p>}
            {props.type==="fixed" && <p className={props.isMajor ?"major":null}>{`FIXED : ${props.body}`}</p>}
        </div>
        
    )
}
export default Body;