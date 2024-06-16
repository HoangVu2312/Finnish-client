import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useCreateQuizMutation } from '../../service/appApi';
import { useSelector } from 'react-redux';

const CreateQuiz = ({ courseId, show, onHide }) => {
    const [questions, setQuestions] = useState([{ type: '', question: '', options: [], answer: '' }]);
    const [createQuiz] = useCreateQuizMutation();
    const user = useSelector((state) => state?.user);
    const userId = user?._id;

    const handleAddQuestion = () => {
        setQuestions([...questions, { type: '', question: '', options: [], answer: '' }]);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (index, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[index].options[optionIndex] = value;
        setQuestions(newQuestions);
    };

    const handleAddOption = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].options.push('');
        setQuestions(newQuestions);
    };

    const handleSubmit = async () => {
        await createQuiz({ userId, courseId, questions });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered className='create-quiz-model'>
            <Modal.Header closeButton>
                <Modal.Title>Create Quiz</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {questions.map((q, index) => (
                        <div key={index}>
                            <Form.Group controlId={`question-${index}`}>
                                <Form.Label>Question</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={q.question}
                                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId={`type-${index}`}>
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={q.type}
                                    onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="boolean">Boolean</option>
                                    <option value="multiple choices">Multiple Choices</option>
                                    <option value="fill in the sentence">Fill in the Sentence</option>
                                    <option value="translate the sentence">Translate the Sentence</option>
                                </Form.Control>
                            </Form.Group>
                            {q.type === 'multiple choices' &&
                                q.options.map((option, optionIndex) => (
                                    <Form.Group controlId={`option-${index}-${optionIndex}`} key={optionIndex}>
                                        <Form.Label>Option {optionIndex + 1}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                        />
                                    </Form.Group>
                                ))}
                            {q.type === 'multiple choices' && (
                                <Button variant="secondary" onClick={() => handleAddOption(index)}>
                                    Add Option
                                </Button>
                            )}
                            <Form.Group controlId={`answer-${index}`}>
                                <Form.Label>Answer</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={q.answer}
                                    onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                />
                            </Form.Group>
                            <hr />
                        </div>
                    ))}
                </Form>
                <Button variant="primary" onClick={handleAddQuestion}>
                    Add Question
                </Button>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>

        </Modal>
    );
};

export default CreateQuiz;
