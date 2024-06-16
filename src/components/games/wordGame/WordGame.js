import React, { useState, useEffect } from 'react';
import './WordGame.css';

const options = {
  kello: "kertoo ajan",
  silmät: "Näillä sinä näet",
  korvat: "näillä sinä kuulet",
  huomenta: "näin tervehditään aamuisin",
  kesä: "lämpöisin vuodenaika",
  talvi: "kylmin vuodenaika",
  sininen: "taivaan väri",
  lentokone: "tällä ihminen lentää paikasta toiseen",
  maito: "valkoinen juoma",
  palkka: "työstä saatava rahallinen palkkio",
  puisto: "pala luontoa kaupungin keskellä",
  saimaannorppa: "tämän eläimen voit nähdä vain Suomessa Saimaalla",
  revontulet: "värikäs valoilmiö pohjoisella yötaivaalla",
  sateenkaari: "värikäs valoilmiö taivaalla sateen jälkeen",
  eduskunta: "edustaa kansaa valtion toiminnassa",
  päiväuni: "nukkumista päivällä",
  sisu: "suomalainen konsepti, joka kuvaa rohkeutta, sitkeyttä ja tahdonvoimaa",
  kantele: "suomalainen soitin",
  lippu: "ostettuasi tämän pääset tapahtumaan",
  juhannus: "keskikesän juhla",
  arvosana: "koulutuksessa käytettävä arvio kokeen tai kurssin onnistumisesta",
  läksyt: "oppilaille annettavia vapaa-aikana suoritettavia tehtäviä",
  kierrätys: "jätteiden lajittelua ja uudelleenkäyttöä",
  hyötyliikunta: "jokapäiväiseen elämään kuuluvaa liikkumista, josta on myös hyötyä terveydelle",
  vastustuskyky: "elimistön kyky suojautua tauteja vastaan",
  passi: "henkilöllisyys todistetaan tällä matkustaessa",
  rautatieasema: "junien lähtöpaikka",
  sauna: "suomalainen keksintö rentoutumiseen ja peseytymiseen",
  sisarus: "sisko tai veli",
  täti: "äidin tai isän sisko",
  eno: "äidin veli",
  setä: "isän veli",
  serkku: "äidin tai isän sisaruksen lapsi",
  vanhemmat: "äiti ja isä"
};

const WordGame = () => {
  const [randomWord, setRandomWord] = useState("");
  const [randomHint, setRandomHint] = useState("");
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(5);
  const [message, setMessage] = useState({ text: "", color: "" });
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

  const initGame = () => {
    const words = Object.keys(options);
    const word = words[generateRandomValue(words)];
    const hint = options[word];

    setRandomWord(word);
    setRandomHint(hint);
    setWinCount(0);
    setLossCount(5);
    setMessage({ text: "", color: "" });
    setGuessedLetters([]);
    setIsGameActive(true);

    // Finnish alphabet
    const alphabet = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'
    ];
    setLetters(alphabet);
  };

  const handleLetterClick = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);
    const charArray = randomWord.toUpperCase().split("");

    if (charArray.includes(letter)) {
      const newWinCount = winCount + charArray.filter(char => char === letter).length;
      setWinCount(newWinCount);
      setMessage({ text: "Correct Letter", color: "green" });

      if (newWinCount === charArray.length) {
        setMessage({ text: "You Won", color: "green" });
        setIsGameActive(false);
      }
    } else {
      const newLossCount = lossCount - 1;
      setLossCount(newLossCount);
      setMessage({ text: "Incorrect Letter", color: "#fa5537" });

      if (newLossCount === 0) {
        setMessage({ text: `Game Over. The word was: ${randomWord}`, color: "red" });
        setIsGameActive(false);
      }
    }
  };

  return (
    <div className='word-game-container'>
      <div className="word-game-wrapper">
        <div className="word-game-hint">
          <span>Hint: </span>{randomHint}
        </div>
        <div className="word-game-input">
          {randomWord.split("").map((char, index) => (
            <span key={index} className="word-game-input-space">
              {guessedLetters.includes(char.toUpperCase()) ? char.toUpperCase() : "_ "}
            </span>
          ))}
        </div>
        <div className="word-game-message" style={{ color: message.color }}>{message.text}</div>
        <div className="word-game-letter-container">
          {letters.map((letter, index) => (
            <button
              key={index}
              className={`word-game-letters ${guessedLetters.includes(letter) ? (randomWord.toUpperCase().includes(letter) ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleLetterClick(letter)}
              disabled={guessedLetters.includes(letter) || !isGameActive}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="word-game-chance-count">Chances Left: {lossCount}</div>
        {!isGameActive && (
          <div className="word-game-controls">
            <button className="word-game-start" onClick={initGame}>Start</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordGame;









