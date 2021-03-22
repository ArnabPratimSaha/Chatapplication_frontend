import react, {useState,useEffect } from "react";
import "./patch.css";
import Navbar from "../../components/sticky-navbar/navbar";
import PatchNoteTop from "./component/patchNoteTop/patchNote-Comp";
import PatchNoteSection from "./component/patchNoteSection/patchNoteSection";
import Footer from "../../components/Footer/footer";

import version1_0_0 from "./patches/1.0.0";
import version1_0_1 from "./patches/1.0.1";

const currentPatch=process.env.REACT_APP_VERSION;

let patchArray=[];
patchArray.push(version1_0_0);
patchArray.push(version1_0_1);

const findPatch=(Ver)=>{
    for (let i = 0; i < patchArray.length; i++) {
        if(Ver===patchArray[i].version)
        {
            return patchArray[i];
        }
    }
    return null;
}

const Patch=props=>{
    const [patch,changePatch]=useState(findPatch(currentPatch));
    const onVersion=version=>{
        changePatch(findPatch(version));
    }
    useEffect(()=>{
        changePatch(findPatch(currentPatch));
    },[])
    return (
        <div>
            <Navbar/>
            <div name="top-div">
                <PatchNoteTop version={onVersion} defVersion={process.env.REACT_APP_VERSION}/>
                <div className="patch-note-details">
                    <PatchNoteSection patch={patch}/>
                </div>
                <Footer />
            </div>
        </div>
        
    )
}
export default Patch;