import React, { useState, useEffect } from "react";
import "./App.css";
import ComputeButton from "./components/ComputeButton";
import SongList from "./components/SongList"; 
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
    const selectedSongsWithS3Prefix = selectedSongs.map(
          (song) => `s3://musicsampledata/${song}`
        );

    console.log("Selected Songs with S3 prefix before sending:", selectedSongsWithS3Prefix);
    setIsLoading(true); // Indicate loading state

    // Send selected songs to Lambda
    // Makes POST request to the same API endpoint
    fetch("https://0dqw08eohj.execute-api.us-east-1.amazonaws.com/dev/songs", {
      method: "POST",
      // Request body format is JSON
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedSongsWithS3Prefix),
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
        <ComputeButton
          isLoading={isLoading}
          handleCompute={handleCompute}
          feedbackMessage={feedbackMessage}
        />
        <SongList
          songs={songs}
          selectedSongs={selectedSongs}
          handleSongClick={handleSongClick}
        />
      </div>
    </>
  );
}

export default App;
