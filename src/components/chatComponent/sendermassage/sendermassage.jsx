import react from "react";

import "./sendermassage.css";

const Sendermassage=(props)=>{
    return(
    <div id="sendermassagediv">
        <div className="sendermassage-div-1">
            <div className="sendermassage-div-2">
                <p className="send-massage">{props.massage}</p>
                <p className="send-massage-time">{props.time}</p>  
            </div>
        </div>
    </div>
    )
}
export default Sendermassage;