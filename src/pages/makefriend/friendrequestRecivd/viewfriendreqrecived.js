import react,{useState,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";

import FriendButton from "../../../components/friendreqbar/friendreqrec/friendreqbtnREC";
import Friendreqbar from "../../../components/friendreqbar/sendfriendreq";

import "./friendreqrecived.css";

const Viewsrecreq = (props) => {
  var [names,changeNames]=useState([]);

  const token = Cookies.get('x-auth-token');
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL+"/friend/recreq", { headers: { 'x-auth-token': token } })
      .then(function (response) {
        changeNames(names=[]);
        for(let i=0;i<response.data.names.length;i++)
        {
          changeNames(names=names.concat({name :response.data.names[i],email:response.data.emails[i]}));
        }
      });
    },[]);

  const handleComplete=(key)=>{
    axios.get(process.env.REACT_APP_BACKEND_URL+"/friend/recreq", { headers: { 'x-auth-token': token } })
      .then(function (response) {
        changeNames(names = []);
        for (let i = 0; i < response.data.names.length; i++) {
          changeNames(names = names.concat({ name: response.data.names[i], email: response.data.emails[i] }));
        }
      });
  }
  const sort=(item)=>{
    return <FriendButton key={item.email} name={item.name} email={item.email} complete={handleComplete} />
  }
  return (
    <div>
      <div className="friendreqrecived-title">
        <h6>Friend Request Recived</h6>  
      </div>
      <div className="friendreqrecived-content">
        {names.length >0 ? names.map(sort):<h6>No request pending</h6>}
      </div>
    </div>
  )
}
export default Viewsrecreq;