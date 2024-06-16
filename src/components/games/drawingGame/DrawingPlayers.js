import React from 'react';
import './DrawingGame.css';

const DrawingPlayers = ({ players }) => {
  // Ensure players and positions are not undefined
  if (!players) {
    return <div>No players</div>;
  }


  return (
    <div className="players-list">
      {players.map((player, index) => (
        <div key={index} className="player-info">
          <img
            src={player.avatar.url}
            alt={`Player Avatar`}
            className="player-avatar"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid #fa5537",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DrawingPlayers;
