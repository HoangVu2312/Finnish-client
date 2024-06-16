import React from 'react';
import './RacingGame.css';

const Board = ({ positions, fakeUsers }) => {
  // Create an array representing the steps on the board
  const steps = Array(65).fill(null);

  return (
    <div className="board">
      {/* Render the start sign */}
      <div className='start sign'>
        <h4>Start</h4>
      </div>

      {/* Map through each step on the board */}
      {steps.map((_, index) => (
        <div
          key={index}
          className={`cell step ${positions?.some(position => position - 1 === index) ? 'active' : ''}`}
        >
          {/* Render player avatars on the corresponding steps */}
          {positions?.map((position, playerIndex) => (
            position - 1 === index && (
              <img
                key={playerIndex}
                src={fakeUsers[playerIndex]?.avatar?.url} // Use optional chaining to prevent errors if avatar or fakeUsers is null or undefined
                alt={`Player ${playerIndex + 1} Avatar`}
                className="avatar"
              />
            )
          ))}
        </div>
      ))}

      {/* Render the goal sign */}
      <div className={`sign ${positions?.some(position => position > 65) ? 'goal' : ''}`}>
        <h4>Goal</h4>
      </div>
    </div>
  );
};

export default Board;



