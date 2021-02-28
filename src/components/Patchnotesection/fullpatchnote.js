import react,{useEffect} from "react";
import Footer from "../Footer/footer.js";

import "./fullpatchnote.css";
import PatchNoteLeft from "./line/patchnote-left";
import PatchNoteRight from "./line/patchnote-right";

import Oauthimg from "./images/oauth.png";
import Profileimg from "./images/profile-img.png"
import Groupimg from "./images/group-img.png"

const FullPatch=props=>
{
    useEffect(()=>{

    },[])
    return(
        <div className="fullpatch-main-div">
        <h1>Future Changes & Patches</h1>
            <div className="patch-note-section">
                <PatchNoteLeft title="O.AUTH 2.0" content="OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.This will be added in the future an it will greatly increase the security of the users even more." imgsrc={Oauthimg}/>
                <PatchNoteRight title="Profile Image" content="Right now there is no way for you to upload a profile picture but in the future update i will adding some feature to upload as well as update your profile picture."  imgsrc={Profileimg}/>
                <PatchNoteLeft title="Group Chat" content="The chats you do in this webapp is strictly one to one.But will be adding a way to create groups and you can invite people to group and have group chat"  imgsrc={Groupimg}/>
            </div>
        </div>
    )
}

export default FullPatch;