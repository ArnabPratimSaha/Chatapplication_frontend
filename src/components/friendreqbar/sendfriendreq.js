import react,{useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Friendreqbar=(props)=>{
const [str,changeSrt]=useState("");

    const handleSubmit=(event)=>{
        const token=Cookies.get('x-auth-token');
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://chatterarnab.herokuapp.com/home/friend/send',
            data: {
                "email":props.email
            },
            headers : {'x-auth-token': token}
          })
            .then(function (response) {
                if(response.data.res===3)
                {
                    changeSrt("friend req successfully sent to "+props.name);
                    props.keypress();
                }
                else if(response.data.res===2)
                {
                    changeSrt("You have Already sent a friend request to "+props.name);
                }
                else
                {
                    changeSrt("You are already friend of "+props.name);
                }
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
                    <button type="submit" className="friendreq-accept-button">Send Req</button>
                </form>
            </div>
                <h6 className="friendreqsent-response">{str}</h6>
            </div>
        </div>
    );
}
export default Friendreqbar;