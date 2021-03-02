import react ,{useEffect ,useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./friendreqsent.css";

const SentBTN=(props)=>
{
    const token = Cookies.get('x-auth-token');
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_URL+"/friend/sentreq/reject",
            data: {
                "email":props.email
            },
            headers: { 'x-auth-token': token }
          })
            .then(function (response) {
            props.complete(1);
        });
    }
    return(
        <div>
            <div className="reqsent-fullbtn">
                <div className="sentfriendreqbtn-title">
                    <h6>{props.name}</h6>
                    <h6>{props.email}</h6> 
                </div>
                <div className="sentfriendreqbtn-button">
                    <form onSubmit={handleSubmit}>
                        <button type="submit" name="accept" value={"accept"} className="friendreq-cancel-button">Cancel</button>
                    </form>
                </div>
            </div>
            
            
        </div>
    );
}
export default SentBTN;