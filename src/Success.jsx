import React from "react";
import "./Success.css";

function Success() {
  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the user's input URL from the input element
    const urlInput = document.getElementById("urlInput");
    const longURL = urlInput.value;

    // Replace {TOKEN} with your actual Bitly API token
    const apiUrl = "https://api-ssl.bitly.com/v4/shorten";
    const token = "137785747d2a8c94f8e2a301248f2c056b3fcf05"; // Replace with your Bitly API token
    // const token = process.env.REACT_APP_BITLY_API_KEY;

    const shortenedUrlResult = document.getElementById("shortenedUrlResult");

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "*",
      },
      body: JSON.stringify({ long_url: longURL }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error(
            `Failed to shorten URL: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((data) => {
        // Display the shortened URL to the user
        //   alert("Shortened URL: " + data.link);
        shortenedUrlResult.textContent = "Shortened URL: " + data.link;
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        //   alert("Error: " + error.message);
        shortenedUrlResult.textContent = "Error: " + error.message;
      });

    // Clear the input field after submission
    urlInput.value = "";
  }
  return (
    <div className="container">
      <div className="header">
        <h1>Why so long.....!</h1>
      </div>
      <div className="description">
        <p>
          &lt;---Kindly place your url below, we will eat and digest the
          request, get a energetic response---&gt;
        </p>
      </div>
      <div className="url-input-block">
        <form id="urlForm" className="url-input-block">
          <input
            type="text"
            className="url-input-block input"
            id="urlInput"
            placeholder="Enter 'URL' to shorten"
            size="32"
          />
          <div>
            <button
              type="submit"
              className="url-input-block submit"
              onClick={handleSubmit}
            >
              Shorten
            </button>
          </div>
        </form>
      </div>
      <div id="shortenedUrlResult"></div>
    </div>
  );
}

export default Success;
