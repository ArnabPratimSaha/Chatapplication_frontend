import react ,{useEffect} from "react";

import "./patchnote.css";

const Patch=(props)=>{
    
    return(
        <div className="patch-main-div" name={props.divName} >
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="patch-content-left">
                        <img className="patchImage patchImage-left" src={props.imgsrc}></img>
                        <h3 className="patchh3">{props.title}</h3>
                        <p className="patchp">{props.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Patch;