import react, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Navbar from "../../components/sticky-navbar/navbar";
import Namebutton from "../../components/chatComponent/namebuttons/nameButton";
import Chatbox from "../uipage.js/ui";
import Footer from "../../components/Footer/footer";

import "./frontpage.css";

const ChatFrontPage = () => {
  var [names, changeNames] = useState([]);
  var [chat, changeChat] = useState([]);
  var [friendreq, changeFriendReq] = useState(null);

  const token = Cookies.get("x-auth-token");

  if (!token) {
    window.location = "home";
  }
  axios
    .get(process.env.REACT_APP_BACKEND_URL + "/chat/frontpage", {
      headers: { "x-auth-token": token },
    })
    .then(function (response) {
      if (!response.data.status) {
        return (window.location = "home");
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/chat/getfriends", {
        headers: { "x-auth-token": token },
      })
      .then(function (response) {
        changeNames((names = []));
        for (let i = 0; i < response.data.names.length; i++) {
          changeNames(
            (names = names.concat({
              name: response.data.names[i],
              email: response.data.emails[i],
            }))
          );
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/chat/getfriendreqpending", {
        headers: { "x-auth-token": token },
      })
      .then(function (response) {
        changeFriendReq(response.data.length);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const sort = (item) => {
    return (
      <Namebutton
        key={item.email}
        name={item.name}
        email={item.email}
        click={handleClick}
        buttonName={item.email}
      />
    );
  };
  const handleClick = (name, email) => {
    const buttons = document.getElementsByClassName("chatfront-namebutton");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].name === email) {
        buttons[i].classList.add("chat-button-active");
      } else {
        buttons[i].classList.remove("chat-button-active");
      }
    }
    changeChat(<Chatbox name={name} email={email} />);
  };
  const handleButtonSubmit = () => {
    window.location = "/home/friends";
  };

  return (
    <div>
      <Navbar className="chatfront-navbar" buttonName="chat" />
      <div name="top-div">
        <div className="frontpage-main-div">
          <div className="findfriend-button-handler">
            <h1 className="brand-title">Chatter</h1>
            {names.length > 0 ? (
              <h2>Wanna find more friends ?</h2>
            ) : (
              <h2>You don't have any friend</h2>
            )}
            <button className="button-frontpage" onClick={handleButtonSubmit}>
              Make Friends
            </button>
            {friendreq !== 0 && (
              <h2>You have {friendreq} friend request pending</h2>
            )}
          </div>
          <div className="chatfront-chat-list">
            {names.length === 0 && <h1>You dont have any friends</h1>}
              <div className="row">
                <div className="col-sm-12 col-lg-6 col-md-6 col-12 chatfront-names-div">
                  <div className="chatfront-names-div-h1">
                    <h1>Friends : {names.length}</h1>
                  </div>
                  <div className="chatfront-names">
                    {names.length > 0 ? names.map(sort) : null}
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6 col-md-6 col-12 chatfront-chatbox">
                  {names.length > 0 && chat}
                </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default ChatFrontPage;
