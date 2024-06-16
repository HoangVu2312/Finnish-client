import React, { useState, useEffect } from 'react';
import { Button, Form, Col, Modal } from 'react-bootstrap';
import { useSubmitQuizAnswerMutation } from '../../service/appApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Quiz.css';

const Quiz = ({ quizData, show, onHide, courseId, userId }) => {
  const [timer, setTimer] = useState(1800); // 30 minutes
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitQuizAnswer] = useSubmitQuizAnswerMutation();

  useEffect(() => {
    let interval = null;
    if (show) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      handleSubmit();
    }

    return () => clearInterval(interval);
  }, [timer, show]);

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const currentAnswers = userAnswers[index] || [];
      if (checked) {
        setUserAnswers({ ...userAnswers, [index]: [...currentAnswers, value] });
      } else {
        setUserAnswers({
          ...userAnswers,
          [index]: currentAnswers.filter((answer) => answer !== value),
        });
      }
    } else {
      setUserAnswers({ ...userAnswers, [index]: value });
    }
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    quizData.questions.forEach((q, index) => {
      if (
        (q.type === "boolean" || q.type === "fill in the sentence" || q.type === "translate the sentence") &&
        userAnswers[index]?.toString().toLowerCase() === q.answer.toString().toLowerCase()
      ) {
        correctCount++;
      } else if (q.type === "multiple choices") {
        if (Array.isArray(q.answer) && Array.isArray(userAnswers[index])) { // Check if both answers are arrays
          if (JSON.stringify(userAnswers[index]?.sort()) === JSON.stringify(q.answer.sort())) {
            correctCount++;
          }
        }
      }
    });
  
    const calculatedScore = (correctCount / quizData.questions.length) * 100;
    setScore(calculatedScore);
  
    await submitQuizAnswer({ courseId, userId, score: calculatedScore });
  
    setTimeout(() => {
      onHide();
    }, 2000);
  };
  

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Modal show={show} onHide={onHide} centered className='quiz-model'>
      <Modal.Body>
        <h4>Quiz</h4>
        {quizData?.questions.map((q, index) => (
          <Form key={index}>
            <Form.Group as={Col}>
              <Form.Label>{q.question}</Form.Label>
              {q.type === "boolean" && (
                <div>
                  <Form.Check
                    type="radio"
                    label="True"
                    name={`question-${index}`}
                    value="true"
                    onChange={(e) => handleChange(e, index)}
                  />
                  <Form.Check
                    type="radio"
                    label="False"
                    name={`question-${index}`}
                    value="false"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              )}
              {q.type === "multiple choices" &&
                q.options.map((option, i) => (
                  <Form.Check
                    key={i}
                    type="checkbox"
                    label={option}
                    value={option}
                    onChange={(e) => handleChange(e, index)}
                  />
                ))}
              {(q.type === "fill in the sentence" || q.type === "translate the sentence") && (
                <Form.Control
                  type="text"
                  placeholder="Enter your answer"
                  onChange={(e) => handleChange(e, index)}
                />
              )}
            </Form.Group>
          </Form>
        ))}
        <div className="timer">{formatTime(timer)}</div>

        <div className='buttons'>

        <button variant="primary" onClick={handleSubmit}>
          Submit
        </button>
        </div>

        {score !== null && (
          <div className="score">
            <h4>Your score: {score}%</h4>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Quiz;






