import react,{useState,useEffect,useRef} from "react";
import "./patchNote.css";

const Patch=props=>{
    const [isClicked,changeClicked]=useState(false);
    const [version,changeVersion]=useState(props.defVersion);
    const handleDropdownClick=event=>{
        if(!isClicked)
        {
            changeClicked(true);
            event.target.classList.add("dropdown-click");
        }
        else
        {
            changeClicked(false);
            event.target.classList.remove("dropdown-click");
        }
        if(document.getElementsByName("dropdownMenu")[0])
        {
            if(document.getElementsByName("dropdownMenu")[0].style.display==="none")
            {
                document.getElementsByName("dropdownMenu")[0].style.display="block";
            }
            else
            {
                document.getElementsByName("dropdownMenu")[0].style.display="none";
            }
        }
    }
    const handlePreviousLinkClick=event=>{
        changeVersion(event.target.innerHTML)
        props.version(event.target.innerHTML);
    }
    return (
        <div className="patch-top-main">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <div>
                <h1>Patch Note </h1>
                <h2>VERSION : {version}</h2>
            </div>
            <div className="prev-patch-div">
                <h1>VIEW PREVIOUS PATCHES</h1>
                <div className="dropdown">
                    <i className="fas fa-caret-down" onClick={handleDropdownClick}></i>
                    <div className="dropdown-dropdown-menu" name="dropdownMenu" style={{display:"none"}}>
                        <ul>
                            <li onClick={handlePreviousLinkClick}>
                                <p >1.0.1</p>
                            </li>
                            <li onClick={handlePreviousLinkClick}>
                               <p>1.0.0</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Patch;