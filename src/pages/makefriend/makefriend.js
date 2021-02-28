import react, {useState,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";


import Friendreqbar from "../../components/friendreqbar/sendfriendreq";
import SeeFriendReqRecived from "./friendrequestRecivd/viewfriendreqrecived";
import SeeFriendReqSent from "./friendrequestSent/viewfriendreqsent";
import Navbar from "../../components/sticky-navbar/navbar";
import Footer from "../../components/Footer/footer";

import "./makefriends.css";

const Makefriend=()=>
{   
    const token=Cookies.get('x-auth-token');

    var [name,changeName]=useState("");
    var [arr,changeArray]=useState([]);
    var [state,changestate]=useState(0);
    var [sentreq,changeSentReq]=useState(<SeeFriendReqSent/>);
    var [firsttime,changefirsttime]=useState(false);
    useEffect(()=>{

    },[])

    axios.get("https://chatterarnab.herokuapp.com/home/getname",{headers : {'x-auth-token': token}})
        .then(function (response) {
        if(!response.data.status)
        {
            Cookies.remove('x-auth-token');
            window.location="home";
        }
        changeName(response.data.name);
    });
        
    const handleSubmit=(event)=>
    {
        
        changefirsttime(true);
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://chatterarnab.herokuapp.com/home/friend',
            data: {
              "username":event.target.name.value
            },
            headers : {'x-auth-token': token}
        }).then((response)=>{
            changestate(response.data.finalFile.names.length);
            if(response.data.finalFile.names.length===0)
            {
                changeArray([]);
            }
            else
            {
                var temp={
                    email:String,
                    names:String
                }
                var temparr=[];
               for(let i=0;i<response.data.finalFile.names.length;i++)
               {
                   temp={
                       email:response.data.finalFile.email[i],
                       names:response.data.finalFile.names[i]
                   }
                   temparr.push(temp);
               }
               changeArray(arr=temparr);
               
            }

        })

    }
    const handleKeyPress=()=>{
        changeSentReq(0);
        changeSentReq(<SeeFriendReqSent/>);
    }
    const sort=(input)=>{
        return <Friendreqbar key={input.email} name={input.names} email={input.email}  keypress={handleKeyPress}/>;
    }
    return(
        <div>
            <Navbar buttonName="friends"/>
            <div name="top-div">
                <div className="friendreq-infodiv">
                    {name.length>0 && <h1>Welcome {name}</h1>}
                    {name.length>0 && <h4>See your friend requests</h4>}

                    <div className="container friendreq-container">
                        <div className="row">
                            <div className="col col-lg-6 col-md-6 col-sm-12 col-12 friendreq-send-div">
                                {sentreq}
                            </div>
                            <div className="col col-lg-6 col-md-6 col-sm-12  col-12 friendreq-rec-div">
                                <SeeFriendReqRecived/>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                </div>
                <div className="friendreq-searchdiv">
                    <div className="friendreq-searchdiv-search">
                        <h1>Search for friends</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="enter your friend's username" name="name"></input><br/> 
                            <button>SEND</button>
                        </form> 
                    </div>
                    {state===0 && firsttime? <h6 className="friendreq-searchdiv-h6">No User Found</h6>:null}
                    {state>0 && <h6 className="friendreq-searchdiv-h6">Found {state} result</h6>}
                    <div className="friendreq-searchdiv-search-result">
                        {arr.map(sort)}
                    </div>
                </div>
            <Footer/> 
        </div>
        
        
        </div>
    );
}

export default Makefriend;