import React from "react";

function ComputeButton({ isLoading, handleCompute, feedbackMessage }) {
  return (
    <div>
      <button onClick={handleCompute} disabled={isLoading}>
        Compute
      </button>
      {isLoading && <p>Loading...</p>}
      {feedbackMessage && <p>{feedbackMessage}</p>}
    </div>
  );
}

export default ComputeButton;
