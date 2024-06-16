import React, { useState } from 'react';
import './RacingGame.css';

import dice1 from '../../../images/dice-01.svg';
import dice2 from '../../../images/dice-02.svg';
import dice3 from '../../../images/dice-03.svg';
import dice4 from '../../../images/dice-04.svg';
import dice5 from '../../../images/dice-05.svg';
import dice6 from '../../../images/dice-06.svg';

const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

const Dice = ({ rollDice, diceValue, resetGame, currentPlayer, positions, playerIndex }) => {
  
  // State variable to control shaking animation
  const [isShaking, setIsShaking] = useState(false);

  // Function to handle rolling the dice
  const handleRollDice = () => {
    setIsShaking(true);
    setTimeout(() => {
      rollDice();  // Call the rollDice function passed as prop
      setIsShaking(false);
    }, 1000);
  };


  // Check if all players have won => show reset btn
  const allPlayersWon = positions.every(position => position > 65);

  // Get the dice image corresponding to the diceValue
  const diceImage = diceImages[diceValue - 1];

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <img src={diceImage} alt='dice' className={isShaking ? 'shake' : ''} />
      {allPlayersWon ? (
        <button className='btn btn-primary mt-4 dice-btn' onClick={resetGame}>Reset Game</button>
      ) : (
        <button
          className='btn btn-primary mt-4 dice-btn'
          onClick={handleRollDice}
          disabled={currentPlayer !== playerIndex}
        >
          Roll Dice
        </button>
      )}
    </div>
  );
};

export default Dice;






