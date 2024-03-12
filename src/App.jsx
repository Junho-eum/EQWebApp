import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const apiEndpoint =
      "https://0dqw08eohj.execute-api.us-east-1.amazonaws.com/dev/songs";
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to inspect its structure
        setSongs(data);
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);


  return (
    <>
      <div className="song-list">
        <h2>Available Songs</h2>
        <ul>
          {Array.isArray(songs) &&
            songs.map((song, index) => <li key={index}>{song}</li>)}
        </ul>
      </div>
    </>
  );
}

export default App;
