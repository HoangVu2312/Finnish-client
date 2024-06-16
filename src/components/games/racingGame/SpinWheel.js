// SpinWheel.js
import React, { useRef, useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './RacingGame.css';
import arrow from '../../../images/arrow.svg';

// Rotation values for the spin wheel
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
  { minDegree: 331, maxDegree: 360, value: 2 },
];


// Colors for the pie chart segments
const pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];

// Data for the pie chart segments
const data = [16, 16, 16, 16, 16, 16];

const SpinWheel = ({ onSpinResult, currentPlayer, playerIndex }) => {
  const wheelRef = useRef(null);
  const [myChart, setMyChart] = useState(null);
  const [finalValue, setFinalValue] = useState('Click On The Spin Button To Start');
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const ctx = wheelRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            backgroundColor: pieColors,
            data: data,
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
          tooltip: false,
          legend: { display: false },
          datalabels: {
            color: "#ffffff",
            formatter: (_, context) => context.chart.data.labels[context.dataIndex],
            font: { size: 24 },
          },
        },
      },
    });
    setMyChart(chart);

    return () => {
      chart.destroy();
    };
  }, []);

  const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        setFinalValue(`You got: ${i.value} steps`);
        setIsSpinning(false);
        onSpinResult(i.value);  // send value to parent component
        break;
      }
    }
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setFinalValue('Good Luck!');
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let count = 0;
    let resultValue = 101;

    const rotationInterval = setInterval(() => {
      myChart.options.rotation = myChart.options.rotation + resultValue;
      myChart.update();
      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation === randomDegree) {
        valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  };

  return (
    <div className="spin-wrapper">
      <div className="spin-container">
        <canvas id="wheel" ref={wheelRef}></canvas>
        <button id="spin-btn" onClick={spinWheel} disabled={isSpinning || currentPlayer !== playerIndex}>
          Spin
        </button>
        <img src={arrow} alt="spinner-arrow" className='spin-img' />
      </div>
      <div id="final-value">
        <h3>{finalValue}</h3>
      </div>
    </div>
  );
};



export default SpinWheel;





