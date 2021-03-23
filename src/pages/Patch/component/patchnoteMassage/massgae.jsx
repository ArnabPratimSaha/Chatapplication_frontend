import react from "react";
import "./massage.css"

const Massage=props=>
{
    return(
        <div className="massage-div">
            <p>[{props.massage}]</p>
        </div>
    )
}
export default Massage;