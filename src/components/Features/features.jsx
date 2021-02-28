import react from "react";
import "./features.css";


const Features = (props) => {
  return (
    <div className="features">
      <div className="container">
        <div className="row">
          <div className="col-sm">
          <i className="fal fa-comment-check fasicon1"></i>
          <h2>
            Easy To Use
          </h2>
          </div>
          <div className="col-sm">
          <i className="fas fa-cloud fasicon2"></i>
          <h2>
            Complete Free Cloud Storage
          </h2>
          </div>
          <div className="col-sm">
          <i className="fas fa-lock fasicon3"></i>
          <h2>
            Massage Encryption
          </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Features;