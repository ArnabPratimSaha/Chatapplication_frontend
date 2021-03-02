import react ,{useEffect ,useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./friendreqrec.css";

const Recivedbtn=(props)=>
{
    const token = Cookies.get('x-auth-token');
    const handleSubmit1=(event)=>{
        event.preventDefault();
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_URL+"/friend/recreq/accept",
            data: {
                "email":props.email
            },
            headers: { 'x-auth-token': token }
          })
            .then(function (response) {
                props.complete(1);
        });
        
    }
    const handleSubmit2=(event)=>{
        event.preventDefault();
        axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_URL+"/friend/recreq/reject",
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
            <div className="sentfriendrecbtn-button">
                <form onSubmit={handleSubmit1}>
                    <button type="submit" name="accept" value={"accept"} className="friendreq-accept-button friendreqrevbtn">accept</button>
                </form>
                <form onSubmit={handleSubmit2}>
                    <button type="submit" name="reject" value={"reject"} className="friendreq-cancel-button friendreqrevbtn">reject</button>
                </form>
            </div>
        </div>
            
            
                
        </div>
    );
}
export default Recivedbtn;