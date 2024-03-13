import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Success or error message

  function handleSongClick(e, song) {
    e.preventDefault(); // Prevent default anchor behavior
    if (!selectedSongs.includes(song)) {
      // Prevent duplicate selections
      setSelectedSongs((prevSelectedSongs) => [...prevSelectedSongs, song]);
    }
  }

  function handleCompute() {
    console.log("Selected Songs before sending:", selectedSongs);
    setIsLoading(true); // Indicate loading state

    fetch("https://0dqw08eohj.execute-api.us-east-1.amazonaws.com/dev/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedSongs),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Lambda response:", data);
        setFeedbackMessage("Songs processed successfully!"); // Set success message
        setSelectedSongs([]); // Optionally clear selected songs
      })
      .catch((error) => {
        console.error("Error calling Lambda:", error);
        setFeedbackMessage("Failed to process songs"); // Set error message
      })
      .finally(() => setIsLoading(false)); // Reset loading state
  }

  useEffect(() => {
    fetch("https://0dqw08eohj.execute-api.us-east-1.amazonaws.com/dev/songs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSongs(data);
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  return (
    <>
      <div className="song-list">
        <h2>Available Songs</h2>
        <button onClick={handleCompute} disabled={isLoading}>
          Compute
        </button>
        {isLoading && <p>Loading...</p>}
        {feedbackMessage && <p>{feedbackMessage}</p>}
        <ul>
          {songs.map((song) => (
            <li
              key={song}
              className={selectedSongs.includes(song) ? "selected" : ""}
            >
              <a href="#" onClick={(e) => handleSongClick(e, song)}>
                {song}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
