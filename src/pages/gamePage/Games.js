import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import './Games.css';

function Games() {
  // Use useSelector to get the user from the Redux store
  const user = useSelector((state) => state?.user);

  // Function to handle game play button click
  const handlePlayButtonClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert('You need to log-in to play this game');
    }
  };

  return (
    <div className='game-page'>
      <div className='game-container'>
        <div className="text-center mb-5">
          <h2>Let's play together!</h2>
        </div>
        <div className='all-games'>
          {/* Dice game */}
          <div className='game-poster racing-game'>
            <LinkContainer to={'racingGame'}>
              <button className='play-btn' onClick={handlePlayButtonClick}><p>Play</p></button>
            </LinkContainer>
          </div>
          {/* Flip game */}
          <div className='game-poster word-game'>
            <LinkContainer to={'wordGame'}>
              <button className='play-btn' onClick={handlePlayButtonClick}><p>Play</p></button>
            </LinkContainer>
          </div>
          {/* Another game */}
          <div className='game-poster drawing-game'>
            <LinkContainer to={'drawingGame'}>
              <button className='play-btn' onClick={handlePlayButtonClick}><p>Play</p></button>
            </LinkContainer>
          </div>
        </div>
      </div>    
    </div>
  );
}

export default Games;
