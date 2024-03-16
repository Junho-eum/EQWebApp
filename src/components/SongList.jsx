import React from "react";

function SongList({ songs, selectedSongs, handleSongClick }) {
  return (
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
  );
}

export default SongList;
