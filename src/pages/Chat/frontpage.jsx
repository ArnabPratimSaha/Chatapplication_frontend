import react,{useState ,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import cors from "cors";

import Navbar from "../../components/sticky-navbar/navbar";
import Namebutton from "../../components/chatComponent/namebuttons/nameButton";
import Chatbox from "../uipage.js/ui";
import Footer from "../../components/Footer/footer";

import "./frontpage.css";

const ChatFrontPage=()=>{
    var [names,changeNames]=useState([]);
    var [chat,changeChat]=useState([]);
    var [funfact,changeFunfact]=useState(null);
    var [friendreq,changeFriendReq]=useState(null);

    var [weather,changeWeather]=useState();

    const token=Cookies.get('x-auth-token');

        if(!token)
        {
            window.location="home";
        }
        axios.get(process.env.REACT_APP_BACKEND_URL+"/chat/frontpage",{headers : {'x-auth-token': token}})
        .then(function (response) {
            if(!response.data.status)
            {
                return window.location="home";
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    useEffect(() => {

        axios.get(process.env.REACT_APP_BACKEND_URL+"/chat/getfriends", { headers: { 'x-auth-token': token } })
            .then(function (response) {
                changeNames(names = []);
                for (let i = 0; i < response.data.names.length; i++) {
                    changeNames(names = names.concat({ name: response.data.names[i], email: response.data.emails[i] }));
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            axios.get(process.env.REACT_APP_BACKEND_URL+"/chat/getfriendreqpending", { headers: { 'x-auth-token': token } })
            .then(function (response) {
                changeFriendReq(response.data.length);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            //fact about years
            axios.get("http://numbersapi.com/random/year?json", cors(),{ headers: { 'x-auth-token': token } })
            .then(function (response) {
                if(response.data.found)
                {

                    changeFunfact(response.data.text);
                }
            })
            .catch(function (error) {
            });
            navigator.geolocation.getCurrentPosition((position)=>{
                axios.get("http://www.7timer.info/bin/api.pl?lon="+position.coords.longitude+"&lat="+position.coords.latitude+"&product=civillight&output=json", cors(),{ headers: { 'x-auth-token': token } })
                .then(function (response) {
                    const Time=new Date().getHours();
                    changeWeather(weather=response.data.dataseries[0]);
                    switch (weather.weather) {
                        case "cloudy":
                            if(Time>=18 || Time <6)
                            {
                                document.getElementById("weather-div").classList.add("cloudy-night");
                            }
                            else
                            {
                                document.getElementById("weather-div").classList.add("cloudy-day");
                            }
                            break;
                        case "pcloudy":
                                if(Time>=18 || Time <6)
                                {
                                    document.getElementById("weather-div").classList.add("cloudy-night");
                                }
                                else
                                {
                                    document.getElementById("weather-div").classList.add("cloudy-day");
                                }
                            break;
                        case "mcloudy":
                                if(Time>=18 || Time <6)
                                {
                                    document.getElementById("weather-div").classList.add("cloudy-night");
                                }
                                else
                                {
                                    document.getElementById("weather-div").classList.add("cloudy-day");
                                }
                            break;
                        case "rain" || "ts" || "tsrain":
                            if(Time>18 || Time <6)
                            {
                                document.getElementById("weather-div").classList.add("rainy-night");
                            }
                            else
                            {
                                document.getElementById("weather-div").classList.add("rainy-day");
                            }
                            break;
                        case "snow":
                            if(Time>18 || Time <6)
                            {
                                document.getElementById("weather-div").classList.add("snowy-night");
                            }
                            else
                            {
                                document.getElementById("weather-div").classList.add("snowy-day");
                            }
                            break;
                    
                        default:
                            if(Time>18 || Time <6)
                            {
                                document.getElementById("weather-div").classList.add("clear-night");
                            }
                            else
                            {
                                document.getElementById("weather-div").classList.add("clear-day");
                            }
                            break;
                    }
                    
                })
                .catch(function (error) {

                });
            }); 
    }, []);
    
    
    const windSpeed=(val)=>{
        switch (val) {
            case 1:return "Below 0.3m/s (calm)";
            case 2:return "0.3-3.4m/s (light)";
            case 3:return "3.4-8.0m/s (moderate)";
            case 4:return "8.0-10.8m/s (fresh)";
            case 5:return "10.8-17.2m/s (strong)";
            case 6:return "17.2-24.5m/s (gale)";
            case 5:return "24.5-32.6m/s (storm)";
            default:
                return "Over 32.6m/s (hurricane)";
        }
    }
    const weatherManager=(type)=>
    {
        const Time=new Date().getHours();
        switch (type) {
            case "clear":
                {
                    if(Time>=18 || Time <6){
                        return <i className="fas fa-moon"></i>;
                    }
                    return <i className="fas fa-sun"></i>
                }
            case "mcloudy":
                {
                    if(Time>=18 || Time <6){
                        return <i className="fas fa-cloud-moon"></i>;
                    }
                    return <i className="fas fa-cloud-sun"></i>;
                }
            case "pcloudy":
                {
                    if(Time>=18 || Time <6){
                        return <i className="fas fa-cloud-moon"></i>;
                    }
                    return <i className="fas fa-cloud-sun"></i>;
                }
            case "cloudy":
                {
                    if(Time>=18 || Time <6){
                        return <i className="fas fa-cloud-moon"></i>;
                    }
                    return <i className="fas fa-cloud-sun"></i>;
                }
            case "rain":
                {
                    if(Time>=18 || Time <6){
                        return <i className="fas fa-cloud-moon-rain"></i>;
                    }
                    <i className="fas fa-cloud-sun-rain"></i>;
                }
            case "snow":return <i className="fas fa-snowflake"></i>;
            case "ts":return null;
            default:
                return null;
        }
    }
    const sort=(item)=>{
        return <Namebutton key={item.email} name={item.name} email={item.email} click={handleClick} buttonName={item.email} />
    }
    const handleClick=(name,email)=>
    {
        const buttons=document.getElementsByClassName("chatfront-namebutton");
        for (let i = 0; i < buttons.length; i++) {
            if(buttons[i].name===email)
            {
                buttons[i].classList.add("chat-button-active");
            }
            else
            {
                buttons[i].classList.remove("chat-button-active");
            }
        }
        changeChat(<Chatbox name={name} email={email}/>)
    }
    const handleButtonSubmit=()=>{
        window.location="/home/friends";
    }

    return (
        <div>
            <Navbar className="chatfront-navbar" buttonName="chat" />
            <div name="top-div">
                <div className="frontpage-main-div">
                    <div className="weather-div-main" id="weather-div">
                    <h1 className="fun-fact">
                        Fun Fact :<br />
                        {funfact}
                    </h1>
                    <div className=" weather-updates">
                        <div className="row">
                        <div className="col col-lg-3 col-frontpage">
                            <h6>
                            Min Temp :
                            {typeof weather !== "undefined" && weather.temp2m.min}°C
                            </h6>
                        </div>
                        <div className="col col-lg-3 col-frontpage">
                            <h6>
                            Max Temp :
                            {typeof weather !== "undefined" && weather.temp2m.max}°C
                            </h6>
                        </div>
                        <div className="col col-lg-3 col-frontpage">
                            <h6>
                            Forecast :{typeof weather !== "undefined" && weather.weather}
                            </h6>
                            {typeof weather !== "undefined" &&
                            weatherManager(weather.weather)}
                        </div>
                        <div className="col col-lg-3 col-md-12 col-sm-12 col-frontpage">
                            <h6>
                            Wind Speed :
                            {typeof weather !== "undefined" &&
                                windSpeed(weather.wind10m_max)}
                            </h6>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="findfriend-button-handler">
                    {names.length > 0 ? (
                        <h1>Wanna find more friends</h1>
                    ) : (
                        <h1>You don't have any friend</h1>
                    )}
                    <button className="button-frontpage" onClick={handleButtonSubmit}>makefriends</button>
                    {friendreq !== 0 && (
                        <h3>You have {friendreq} friend request pending</h3>
                    )}
                    </div>
                    <div>
                    <div className="chatfront-chat-list">
                        {names.length === 0 && <h1>You dont have any friends</h1>}
                        <div className="chat-container">
                        <div className="row">
                            <div className="col-sm-12 col-lg-6 col-md-6 col-12 chatfront-names-div">
                            <div className="chatfront-names-div-h1">
                                {names.length > 0 && <h1>Friends {names.length}</h1>}
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
                    </div>
                    </div>
                    <Footer/>
                </div>
            </div> 
        </div>
        
      
    );
}
export default ChatFrontPage;