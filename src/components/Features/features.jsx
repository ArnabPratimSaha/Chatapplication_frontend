import react from "react";
import "./features.css";

const Features = (props) => {
  return (
    <div className="features">
      <h1>Features</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm feature-col">
          <i className="fal fa-comment-check fasicon1"></i>
          <h2 className="feature-h2">
            Easy To Use
          </h2>
          </div>
          <div className="col-sm feature-col">
          <i className="fas fa-cloud fasicon2"></i>
          <h2 className="feature-h2">
            Complete Free Cloud Storage
          </h2>
          </div>
          <div className="col-sm feature-col">
          <i className="fas fa-lock fasicon3"></i>
          <h2 className="feature-h2">
            Message Encryption
          </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Features;