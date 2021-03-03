import { useState } from "react";

import Navbar from "../../components/sticky-navbar/navbar";
import "./home.css";
import Footer from "../../components/Footer/footer";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


import Intro from "../../components/Introduction/intro";
import Feature from "../../components/Features/features";
import Patch from "../../components/Patchnotesection/fullpatchnote";


const Home=()=>{
    return(
        <div>
            <Navbar buttonName="home"/>
            <div name="top-div">
                <div id="div">
                    <Intro/>
                </div>
                <div>
                    <Feature/>
                </div>
                <Patch />
                <Footer/>
            </div>
        </div>
        
        
    );
}


export default Home;

//66bfbf eaf6f6 fcfefe f76b8a #78e4ff #ff48fa