import React from 'react';
import './RacingGame.css';

const DicePlayers = ({ players, positions }) => {
  // Ensure players and positions are not undefined
  if (!players || !positions) {
    return <div>No players</div>;
  }

  // Combine players with their positions
  const playersWithPositions = players.map((player, index) => ({
    ...player,
    position: positions[index],
  }));

  // Sort players by their positions
  playersWithPositions.sort((a, b) => a.position - b.position);

  return (
    <div className="players-list">
      {playersWithPositions.map((player, index) => (
        <img
          key={index}
          src={player?.avatar.url}
          alt="Player Avatar"
          className={`player-avatar ${player.position > 65 ? 'winner' : ''}`}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid #155804',
            margin: '20px'
          }}
        />
      ))}
    </div>
  );
};

export default DicePlayers;

