import React, { useEffect, useState } from "react";
import axios from "axios";
import ShortURL from "./components/ShortURL";
import RateLimitError from "./components/RateLimitError";
import "./App.css";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [apiResult, setApiResult] = useState();

  useEffect(() => {
    axios.get("https://quick-url.onrender.com").catch(() => {});
  }, []);

  const shortenUrl = async () => {
    
    try {
      const res = await axios.post(
        "https://quick-url.onrender.com/shorten",
        { url: longUrl }
      );
      setApiResult({
        status:"success",data:res.data
    });
    } catch (err) {
      if (err.response && err.response.status === 429) {
        setApiResult({ status: "rate_limit" });
      } else {
        setApiResult({
          status: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    }
    
  };

  return (
    <div className="container">
      <h1 className="title">QuickURL</h1>

      <div className="input-group">
        <input
          type="url"
          placeholder="Enter the URL"
          onChange={(e) => setLongUrl(e.target.value)}
          className="input-box"
        />
        
        <button
          onClick={shortenUrl}
          className='submit-btn'
        >
        Shorten URL
        </button>
      </div>

      <div className="response-area">
        {apiResult?.status === "success" && (
          <ShortURL
            shorturl={apiResult.data.shorturl}
            message={apiResult.data.message}
            shortid={apiResult.data.shortId}
          />
        )}

        {apiResult?.status === "rate_limit" && <RateLimitError />}

        {apiResult?.status === "error" && (
          <p className="error-text">{apiResult.message}</p>
        )}
      </div>
    </div>
  );
}

export default App;
