import React, { useState, useEffect, useContext, useRef } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { SocketContext } from '../../../socket/SocketContext';
import DrawingPlayers from './DrawingPlayers'; // Import the DrawingPlayers component
import './DrawingGame.css';

const DrawingGame = () => {
    // Redux state
    const user = useSelector((state) => state?.user); // Fetches user information from Redux
    const socket = useContext(SocketContext); // Socket context for communication with the server
    const canvasRef = useRef(null); // Reference to the canvas element

    // State variables for drawing functionality and game state
    const [isDrawing, setIsDrawing] = useState(false);
    const [isWon, setIsWon] = useState(false);
    const [showDrawing, setShowDrawing] = useState(false);
    const [guess, setGuess] = useState('');
    // const [scores, setScore] = useState({});
    const [players, setPlayers] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedTool, setSelectedTool] = useState('brush');
    const [brushWidth, setBrushWidth] = useState(5);
    const [selectedColor, setSelectedColor] = useState('#000');
    const [fillColor, setFillColor] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState(null);
    // const [currentDrawer, setCurrentDrawer] = useState(null); // New state for current drawing player
    const [drawingImage, setDrawingImage] = useState(null);
    const playerIndex = players.findIndex((p) => p._id === user._id); // check the index of this account-user

    // Effect hook to handle socket events when the component mounts and unmounts
    useEffect(() => {

        // Let pleyer re-join when re-set the game
        const handleRejoin = (playersToRejoin) => {
            if (playersToRejoin.some((p) => p._id === user?._id)) {
                socket.emit('join-drawing-game', user);
            }
        };


        // Emit 'join-drawing-game' event to server when component mounts
        socket.emit('join-drawing-game', user);

        // Listen for 'draw-game-state' updates from server and update local state accordingly
        socket.on('draw-game-state', (state) => {
            setPlayers(state.players); // Update players list
            setCurrentPlayer(state.currentPlayer); // Update current player
            // setCurrentDrawer(state.currentDrawer); // Update current drawing player
            setMessage(state.message);
            setShowDrawing(state.showDrawing);
            setDrawingImage(state.currentDrawing);
            // setScore(useState.scores);
            setIsWon(state.isWon);

            // Check if game has started (at least 2 players)
            if (state.players.length > 1) {
                // Show current question only if it's the currentPlayer's turn to draw
                if (state.currentDrawer && state.currentDrawer._id === user._id) {
                    setCurrentQuestion(state.currentQuestion);
                } else {
                    setCurrentQuestion('');

                }
            } else {
                setCurrentQuestion('');

            }
        });

        socket.on('force-rejoin', handleRejoin); //listen re-join emit

        // Clean up socket listeners when component unmounts
        return () => {
            socket.off('draw-game-state');
            socket.off('force-rejoin', handleRejoin);
        };
    }, [socket, user]);


    //

    // Function to start drawing on canvas
    const startDraw = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        setIsDrawing(true); // Set drawing state to true
        ctx.lineWidth = brushWidth; // Set brush width
        ctx.strokeStyle = selectedColor; // Set stroke color
        ctx.fillStyle = selectedColor; // Set fill color
        ctx.beginPath(); // Begin drawing path
        if (selectedTool === 'brush') {
            ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); // Move to starting point for brush
        } else {
            setStartX(e.nativeEvent.offsetX); // Set starting X coordinate for shapes
            setStartY(e.nativeEvent.offsetY); // Set starting Y coordinate for shapes
        }
    };

    // Function to handle drawing on canvas
    const drawing = (e) => {
        if (!isDrawing) return; // Exit if not drawing
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (selectedTool === 'brush') {
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); // Draw line for brush
            ctx.stroke();
        }
    };

    // Function to end drawing on canvas
    const endDraw = (e) => {
        if (!isDrawing) return; // Exit if not drawing
        // const canvas = canvasRef.current;
        // const ctx = canvas.getContext('2d');
        setIsDrawing(false); // Set drawing state to false
        if (selectedTool !== 'brush') {
            drawShape(e); // Draw shape if not using brush tool
        }
    };

    // Function to draw shapes (rectangle, circle, triangle)
    const drawShape = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const endX = e.nativeEvent.offsetX;
        const endY = e.nativeEvent.offsetY;
        const width = endX - startX;
        const height = endY - startY;

        ctx.lineWidth = brushWidth; // Set brush width
        ctx.strokeStyle = selectedColor; // Set stroke color
        ctx.fillStyle = fillColor ? selectedColor : 'transparent'; // Set fill color

        if (selectedTool === 'rectangle') {
            if (fillColor) {
                ctx.fillRect(startX, startY, width, height); // Fill rectangle if fillColor is true
            }
            ctx.strokeRect(startX, startY, width, height); // Draw rectangle outline
        } else if (selectedTool === 'circle') {
            ctx.beginPath();
            ctx.arc(startX + width / 2, startY + height / 2, Math.abs(width / 2), 0, Math.PI * 2); // Draw circle
            ctx.closePath();
            if (fillColor) {
                ctx.fill(); // Fill circle if fillColor is true
            }
            ctx.stroke();
        } else if (selectedTool === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + width, startY);
            ctx.lineTo(startX + width / 2, startY - height);
            ctx.closePath();
            if (fillColor) {
                ctx.fill(); // Fill triangle if fillColor is true
            }
            ctx.stroke();
        }
    };

    // Function to handle tool change (brush, rectangle, circle, triangle)
    const handleToolChange = (tool) => {
        setSelectedTool(tool); // Update selected tool state
    };

    // Function to handle color change for drawing
    const handleColorChange = (color) => {
        setSelectedColor(color); // Update selected color state
    };

    // Function to clear the canvas
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return; // Exit if canvasRef is null
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
        ctx.fillStyle = '#fff'; // Set fill style to white
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill canvas with white
    };

    // Function to save the current canvas drawing as an image and send to server
    const saveImage = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL(); // Convert canvas drawing to data URL
        console.log("ready new-drawing :", image);
        socket.emit('submit-drawing', image); // Emit socket event to submit drawing to server
    };

    // Function to handle user's guess submission
    const handleGuess = (guess) => {
        const userId = user._id; // const user = useSelector((state) => state?.user);
        socket.emit('submit-guess', { guess, userId }); // Emit socket event to submit guess to server
    };
    const handleReset = (e) => {
         // Emit socket event to reset the game on the server
        setPlayers([]); // Clear players list
        setCurrentPlayer(null); // Clear current player
        setMessage(''); // Clear message
        setShowDrawing(false); // Hide drawing
        setDrawingImage(null); // Clear drawing image
        setCurrentQuestion(''); // Clear current question
        setIsWon(false); // Reset win state
        clearCanvas(); // Clear the canvas
        socket.emit('reset-draw-game');
    };


    // Render the component
    return (
        <div className="drawing-game-container">
            <Row style={{ minWidth: "100%" }}>
                {/* Drawing board */}
                <Col md={9} className='d-flex flex-column justify-content-start align-items-center'>
                    <section className="tools-board">
                        <div className="tools">
                            <Button onClick={() => handleToolChange('brush')}>Brush</Button>
                            <Button onClick={() => handleToolChange('rectangle')}>Rectangle</Button>
                            <Button onClick={() => handleToolChange('circle')}>Circle</Button>
                            <Button onClick={() => handleToolChange('triangle')}>Triangle</Button>
                            <input type="color" onChange={(e) => handleColorChange(e.target.value)} />
                            <input type="range" min="1" max="20" value={brushWidth} onChange={(e) => setBrushWidth(e.target.value)} />
                            <Button onClick={() => setFillColor(!fillColor)}>Fill</Button>
                            <Button onClick={clearCanvas}>Clear</Button>
                        </div>
                    </section>
                    {showDrawing && drawingImage && !isWon ? (
                        <div className='player-drawing' style={{ border: "2px solid black", width: "700px", height: "500px", borderRadius: "8px" }}>
                            <img src={drawingImage} alt="Drawing" style={{ width: '100%', height: '100%' }} />

                        </div>
                    ) : (
                        <section className="drawing-board">
                            {currentPlayer === playerIndex && !isWon && (
                                <button onClick={saveImage} disabled={currentPlayer !== playerIndex} >Show drawing</button>
                            )}
                            <br />
                            <canvas
                                ref={canvasRef}
                                onMouseDown={startDraw}
                                onMouseMove={drawing}
                                onMouseUp={endDraw}
                                width="700"
                                height="500"
                            ></canvas>

                        </section>
                    )}

                </Col>

                <Col md={3} className='d-flex flex-column justify-content-center align-items-center'>
                    {!isWon && (
                        <button className='btn btn-danger m-3 p-2 reset-game' onClick={(e) => handleReset(e)}>Reset game</button>
                    )}
                    {/* Players and question section */}
                    <section className="players-section">
                        <h3>Players:</h3>
                        <DrawingPlayers players={players} /> {/* Render DrawingPlayers component to display players */}

                    </section>

                    {/* Display message + question */}
                    <section className="question-section">
                        {currentPlayer === playerIndex && !isWon ? (
                            <div>
                                <p>{message}</p>
                                <p>Your turn to draw :</p>
                                <p>{currentQuestion}</p>
                            </div>
                        ) : (
                            <p>{message}</p>
                        )}
                    </section>

                    {/* input for answers */}
                    {currentPlayer !== playerIndex && !isWon ? (
                        <section className='answer-section' style={{ width: "100%" }}>
                            <input type="text" placeholder="Your answer..." onChange={(e) => setGuess(e.target.value)} />
                            <button type='submit' onClick={(e) => handleGuess(guess)} disabled={currentPlayer === playerIndex && !showDrawing}>Send answer</button>

                        </section>
                    ) : (
                        <></>
                    )}


                    {/* reset button section */}
                    <section className='reset-button-section'>
                        {isWon && (
                            <button className='reset-game' onClick={(e) => handleReset(e)}>Reset game</button>
                        )}
                    </section>
                </Col>
            </Row>

        </div >
    )


};

export default DrawingGame;








