// src/components/RacingGame.js
import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../socket/SocketContext';
import Board from './Board';
import Dice from './Dice';
import SpinWheel from './SpinWheel';
import DicePlayers from './DicePlayers';
import './RacingGame.css';

const RacingGame = () => {
  const user = useSelector((state) => state?.user);
  const socket = useContext(SocketContext);

  const [positions, setPositions] = useState([]);
  const [message, setMessage] = useState('');
  const [diceValue, setDiceValue] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit('join-game', user);

    socket.on('game-state', (state) => {
      setPositions(state.positions);
      setCurrentPlayer(state.currentPlayer);
      setMessage(state.message);
      setPlayers(state.players);
      setDiceValue(state.diceValue);

      // Check for question or spin wheel trigger
      if (state.triggerQuestion) {
        setShowQuestion(true);
        setCurrentQuestion(state.question);
      } else {
        setShowQuestion(false);
      }

      if (state.triggerSpinWheel) {
        setShowSpinWheel(true);
      } else {
        setShowSpinWheel(false);
      }
    });

    return () => {
      socket.off('game-state');
    };
  }, [socket, user]);

  const rollDice = () => {
    socket.emit('roll-dice');
  };

  const handleAnswer = (answer) => {
    setShowQuestion(false);
    socket.emit('answer-question', answer);
  };

  const handleSpinResult = (spinValue) => {
    setShowSpinWheel(false);
    socket.emit('spin-result', spinValue);
  };

  const resetGame = () => {
    setPositions([]);
    setMessage('');
    setDiceValue(1);
    setCurrentPlayer(0);
    setShowQuestion(false);
    setCurrentQuestion({});
    setShowSpinWheel(false);
    setPlayers([]);
    socket.emit('reset-game');
  };

  //
  const playerIndex= players.findIndex((p) => p._id === user._id)

  return (
    <div className='game-container'>
      <Row>
        <Row className="game-board">
          <Board positions={positions} fakeUsers={players} />
        </Row>

        <Row className='control-board'>
          <Col md={4} className='left p-5'>
            <h4>Players:</h4>
            <DicePlayers players={players} positions={positions} />
          </Col>
          <Col md={4} className='middle'>
            <div className='dice'>
              <Dice
                rollDice={rollDice}
                diceValue={diceValue}
                resetGame={resetGame}
                currentPlayer={currentPlayer}
                positions={positions}
                playerIndex={playerIndex}
              />
            </div>
          </Col>
          <Modal show={showSpinWheel} onHide={() => setShowSpinWheel(false)} style={{ backgroundColor: "#ffffff3b" }}>
            <SpinWheel onSpinResult={handleSpinResult} currentPlayer={currentPlayer} playerIndex={playerIndex}/>
          </Modal>
          <Modal show={showQuestion} onHide={() => setShowQuestion(false)} style={{ backgroundColor: "#ffffff3b" }}>
            <Modal.Body>
              <h4>{currentQuestion.question}</h4>
              <Button variant='danger' disabled={currentPlayer !== playerIndex} onClick={() => handleAnswer(false)}>False</Button>
              <Button variant='success' disabled={currentPlayer !== playerIndex} className='m-4' onClick={() => handleAnswer(true)}>True</Button>
            </Modal.Body>
          </Modal>
          <Col md={4} className='right'>
            <h4>{message}</h4>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default RacingGame;








