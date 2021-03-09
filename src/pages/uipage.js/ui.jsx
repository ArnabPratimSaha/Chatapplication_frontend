import react, { useState ,useEffect} from "react";
import Cookies from "js-cookie";
import "./ui.css";
import axios from "axios";
import Picker from 'emoji-picker-react';
import io from "socket.io-client";

import Sendermassage from "../../components/chatComponent/sendermassage/sendermassage";
import Recivermassage from "../../components/chatComponent/recivermassage/recivermassage";

const findMyEmail=(obj,email)=>
{
  if(obj.senderEmail==email){
    return obj.reciverEmail;
  }
  return obj.senderEmail;
}

const scrollToBottom=(id)=>
{
  document.getElementById(id).scrollTop=document.getElementById(id).scrollHeight;
}

let socket;
let email1;
let email2;

const Ui = (props) => {

  var [chat,changeChat]=useState([]);
  var [isEmojiOpen,changeEmojiOpen]=useState(false);
  

  const token=Cookies.get('x-auth-token');
  useEffect(() => {
    if(socket && email2 && email2)
    {
      socket.emit("disconnection",{email1:email1,email2:email2},()=>{
        email1=null;
        email2=null;
      })
      socket.off();
    }
    socket = io(process.env.REACT_APP_BACKEND_SOCKET_URL,
      {
        path: "/singlechat/",
      });

    axios.get(process.env.REACT_APP_BACKEND_URL+'/get?token='+token)
    .then(function (response) {
      if(response.data.status==="found")
      {
        email1=response.data.info.email;
        email2=props.email;
          socket.emit("getChatInfo",{email1:response.data.info.email,email2:props.email},(id)=>
          {
            scrollToBottom("chatbox-id");
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    socket.on("chatData", chat => {
      changeChat(chat.chat);
      scrollToBottom("chatbox-id");
    });
    socket.on("exit",id=>{
      //functionality needed to be added
    })
      
  }, [props.email]);
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    const massage=event.target.massage.value;
  event.target.massage.value="";
  var Time=new Date();
  if (massage.length > 0) {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/get?token=" + token)
      .then(function (response) {
        if (response.data.status === "found") {
          socket.emit(
            "sendMassage",
            {
              senderEmail: response.data.info.email,
              reciverEmail: props.email,
              massage: massage,
              time: Time.toLocaleTimeString("en-IN"),
            },
            () => {}
          );
        }
      })
      .catch(function (error) {
        console.log(error);
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

  const onEmojiClick = (event, emojiObject) => {
    var inputField=document.getElementsByName("massage")[0];
    inputField.value+=emojiObject.emoji;
  };

  const handleEmojibutton=event=>{
    if(!isEmojiOpen)
    {
      changeEmojiOpen(true);
    }
    else
    {
      changeEmojiOpen(false);
    }
  }

  return (
    <div>
      <div className="ui-wrapper">
        <div className="ui-friend-info">
          <h3 className="chat-letter">Currently Chatting With </h3>
          <h4 className="chat-letter">{props.name}</h4>
        </div>
        <div className="chatbox-contain" id="chatbox-id">
          {chat.length === 0 ? (
            <p className="chat-letter">Be The first one to send a massage</p>
          ) : (
            chat.map(sort)
          )}
        </div>
        <div className="chatbox-input">
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              name="massage"
              placeholder="type here ..."
            ></input>
            <button type="button" onClick={handleEmojibutton}>🙂</button>
            <button type="submit">
              <i className="fas fa-paper-plane send-icon"></i>
            </button>
          </form>
          <div className="emoji">
            {isEmojiOpen && <Picker  onEmojiClick={onEmojiClick} />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Ui;