import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]); // State for selected songs

  function handleSongClick(song) {
    setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, song]); // Add clicked song to list
  }

  function handleCompute() {
    fetch("https://0dqw08eohj.execute-api.us-east-1.amazonaws.com/dev/songs", {
      // Replace with your actual API endpoint
      method: "POST",
      body: JSON.stringify(selectedSongs),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Lambda response:", data);
        // Potentially reset selectedSongs or update UI with processing results
      })
      .catch((error) => console.error("Error calling Lambda:", error));
  }

  useEffect(() => {
    const apiEndpoint =
      "https://0dqw08eohj.execute-api.us-east-1.amazonaws.com/dev/songs"; // Replace with API endpoint for fetching songs
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
            songs.map((song, index) => (
              <li key={index}>
                <a href="#" onClick={() => handleSongClick(song)}>
                  {song}
                </a>
              </li>
            ))}
        </ul>
        <button onClick={handleCompute}>Compute</button>
      </div>
    </>
  );
}

export default App;

