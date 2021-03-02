import react, { useState ,useEffect} from "react";
import Cookies from "js-cookie";
import "./ui.css";
import axios from "axios";

import Sendermassage from "../../components/chatComponent/sendermassage/sendermassage";
import Recivermassage from "../../components/chatComponent/recivermassage/recivermassage";
const findMyEmail=(obj,email)=>
{
  if(obj.senderEmail==email){
    return obj.reciverEmail;
  }
  return obj.senderEmail;
}

const Ui = (props) => {
  var [chat,changeChat]=useState([]);
  var [active,changeActive]=useState("");

  const token=Cookies.get('x-auth-token');


  const updateMassage = () => {
    const button = document.getElementsByName(props.email)[0];
      if(button.classList.length>1)
      {
          axios({
            method: "post",
            url: process.env.REACT_APP_BACKEND_URL+"/chat/getallmassages",
            data: {
              name: props.name,
              email: props.email,
            },
            headers: { "X-auth-token": token },
          }).then(function (response) {
            if (response.data.status) {
              changeChat(response.data.chat);
            } else {
              changeChat([]);
            }
            setTimeout(updateMassage , 2000);
          });
      }
      else
      {
        return;
      }
    
  };

  useEffect(() => {
    axios({
      method: "post",
      url: process.env.REACT_APP_BACKEND_URL+"/chat/getallmassages",
      data: {
        name: props.name,
        email: props.email,
      },
      headers: { "X-auth-token": token },
    }).then(function (response) {
      if (response.data.status) {
        changeChat(response.data.chat);
      } else {
        changeChat([]);
      }
    });
    updateMassage();
  }, [props.email]);
  
  
const handleSubmit=(event)=>{
  event.preventDefault();
  const massage=event.target.massage.value;
  event.target.massage.value="";
  var Time=new Date();

  if(massage.length>0)
  {
      axios({
          method: 'post',
          url: process.env.REACT_APP_BACKEND_URL+"/chat/sendmassage",
          data: {
              "name":props.name,
              "email":props.email,
              "massage":massage,
              "time":Time.toLocaleTimeString('en-IN')
          },
          headers: {'X-auth-token': token}
      })
      .then(function (response) {
        changeChat(response.data.chat);
      });
  }
}
  var key=0;
  const sort=(item)=>{
    const myEmail=findMyEmail(item,props.email);
    if(item.senderEmail===myEmail)
    {
      return <Sendermassage key={key++} massage={item.massageBody} time={item.time}/>
    }
    return <Recivermassage key={key++}  massage={item.massageBody} time={item.time}/> 
  }
  return (
    <div>
          <div className="ui-wrapper">
                <div className="ui-friend-info">
                  <h3 className="chat-letter">Currently Chatting With </h3>
                  <h4 className="chat-letter">{props.name}</h4>
                </div>
                <div className="chatbox-contain">
                  {chat.length===0?<p className="chat-letter">Be The first one to send a massage</p>:chat.map(sort)}
                </div>
                <div className="chatbox-input">
                  <form onSubmit={handleSubmit} autoComplete="off" >
                    <input type="text" name="massage" placeholder="type here ..." ></input>
                    <button type="submit"><i className="fas fa-paper-plane send-icon"></i></button>
                  </form>
                </div>
             </div>
      </div>
  );
}
export default Ui;