import React from "react";
function ShortURL({shorturl,message,shortid})
{
    const redirecturl=()=>{
        window.open(shorturl,"_blank");
    };

    return (
        <div className="shorturl-container">
      <p className="success-message">{message || "URL shortened successfully!"}</p>
      <div className="short-url-box">
        <div className="shorturl-text">
            Short URL :  
        </div>

                <div className="shorturl" onClick={redirecturl}>

                {shorturl}
          
                </div>
        
      </div>
    </div>
    );
}
export default ShortURL;
