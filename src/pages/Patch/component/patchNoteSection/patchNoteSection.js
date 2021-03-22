import react, { useEffect, useState } from "react";
import "./patchnote.css";
import Heading from "../patchHeading/heading";
import Body from "../patchBody/Body";

const Patch=props=>{
    const [patch,changePatch]=useState(props.patch);
    useEffect(()=>{
        changePatch(props.patch)
    },[props.patch]);
    const mapPatch=patch=>
    {
        return patch.patch.map((element)=>{
            let oldType;
            let isChanged=false;
            return <div key={element.name}>
                <Heading type="main" heading={element.name}/>
                {element.patch.map((e)=>{
                    return e.patchDetails.map(details=>{
                        if(!isChanged)
                        {
                            oldType=e.type;
                            isChanged=true;
                        }
                        const type=oldType;
                        oldType=e.type;
                        
                        return <Body key={details.details} newClass={type!=e.type && "gap"} type={e.type} body={details.details} isMajor={details.major} />
                    })
                })}
            </div>
        })
    }
    return (
        <div className="patch-note-div-details">
            <h1>changes made to patch {patch.version}</h1>
            <div className="patch-note-detail">
                {mapPatch(patch)}
            </div>
        </div>
    );
}
export default Patch;