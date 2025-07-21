import React from "react";
function ShortURL({shorturl,message})
{
    return (
        <div className="shorturl-container">
      <p className="success-message">{message || "URL shortened successfully!"}</p>
      <div className="short-url-box">
        <div className="shorturl-text">
            Short URL :  
        </div>

                <div className="shorturl">
                    {shorturl}
                </div>
        
      </div>
    </div>
    );
}
export default ShortURL;
