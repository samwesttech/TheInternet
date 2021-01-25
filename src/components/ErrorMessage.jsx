import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = (props) => {
  // if (props.errorMessage === "Page not found!") {
  return (
    <div>
      <body>
        <div class="mainbox">
          <div className="err404">
            4 <i class="far fa-question-circle fa-spin"></i> 4
          </div>
          <br></br>
          <div class="msg">
            Maybe this page moved? Got deleted? Is hiding out in quarantine?
            Never existed in the first place?
          </div>
        </div>
      </body>
    </div>
  );
  // }
  // else {
  //   return (
  //     <div className="error-message">
  //       <p>{props.errorMessage}</p>
  //     </div>
  //   );
  // }
};

export default ErrorMessage;
