import { defaults } from "js-cookie";
import react from "react";

import "./recivermassage.css";

const Recivermassage=(props)=>{
    return(
        <div id="recivermassagediv">
            <div className="recivermassage-div-1">
                    <div className="recivermassage-div-2">
                        <p className="recive-massage">{props.massage}</p>
                        <p className="recive-massage-time">{props.time}</p>
                    </div>
            </div>
        </div>
    )
};

export default Recivermassage;