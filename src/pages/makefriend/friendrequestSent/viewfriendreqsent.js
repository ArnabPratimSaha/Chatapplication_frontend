import axios from "axios";
import Cookies from "js-cookie";
import react,{useState,useEffect} from "react";

import FriendButtonSent from "../../../components/friendreqbar/friendreqsent/friendreqbtnSENT";
import "./friendreqsend.css";


const Viewsentreq=(props)=>{
    var [names,changeNames]=useState([]);
    const token = Cookies.get('x-auth-token');
    useEffect(() => {
      axios.get('https://chatterarnab.herokuapp.com/home/friend/sentreq', { headers: { 'x-auth-token': token } })
        .then(function (response) {
          changeNames(names=[]);
          for(let i=0;i<response.data.names.length;i++)
          {
            changeNames(names=names.concat({name :response.data.names[i],email:response.data.emails[i]}));
          }
        });
      },[]);
      
    const handleComplete=(key)=>{
        axios.get('https://chatterarnab.herokuapp.com/home/friend/sentreq', { headers: { 'x-auth-token': token } })
          .then(function (response) {
            changeNames(names = []);
            for (let i = 0; i < response.data.names.length; i++) {
              changeNames(names = names.concat({ name: response.data.names[i], email: response.data.emails[i] }));
            }
          });
      }

    const sort=(item)=>{
        return <FriendButtonSent key={item.email} name={item.name} email={item.email} complete={handleComplete} />
    }
    return (
        <div>
          <div className="friendreqsend-title">
            <h6>Friend Request Sent</h6>  
          </div>
          <div className="friendreqsend-content">
            {names.length >0 ? names.map(sort):<h6>No request pending</h6>}
          </div>
        </div>
    )
}
export default Viewsentreq;