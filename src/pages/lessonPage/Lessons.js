import React, { useEffect, useState } from "react";
import axios from "../../axios/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateLesson } from "../../features/lessonSlice.js";
import { Alert, Col, Modal, Row } from "react-bootstrap";
import NewLesson from "../../components/teacherDashboard/NewLesson.js";
import "../../pages/coursePage/Course.css"; // common styling file
import Quiz from "../../components/tests/Quiz.js";
import { useDeleteLessonMutation, useGetCourseQuizQuery } from "../../service/appApi.js"; // Import the getCourseQuiz hook
import CreateQuiz from "../../components/tests/CreateQuiz.js";

function Lessons() {
  const { id } = useParams();
  const user = useSelector((state) => state?.user);
  const userId = user?._id;
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state?.lessons);

  useEffect(() => {
    axios
      .get(`/lessons/${id}`)
      .then(({ data }) => dispatch(updateLesson(data)));
  }, [id, dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const handleShowQuiz = () => setShowQuiz(true);
  const handleCloseQuiz = () => setShowQuiz(false);
  const [deleteLesson, { error, isError, isLoading, isSuccess }] =
    useDeleteLessonMutation();

  const { data: quizData } = useGetCourseQuizQuery(id); // Use the getCourseQuiz hook

  function handleDeleteLesson(id) {
    if (window.confirm("Remove this lesson ??"))
      deleteLesson({ userId, lessonId: id });
  }

  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const handleShowCreateQuiz = () => setShowCreateQuiz(true);
  const handleCloseCreateQuiz = () => setShowCreateQuiz(false);

  return (
    <div className="lesson-page">
      <div className="lessons container pt-3">
        <h1>ALL LESSONS</h1>

        <div className="d-flex flex-column">
          {lessons?.map((lesson) => (
            <Row
              className="lesson mb-5 d-flex justify-content-between mt-5"
              key={lesson._id}
            >
              <Col
                md={6}
                className="p-5 info-side d-flex flex-column justify-content-center"
              >
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>

                <div className="d-flex">
                  <div>
                    <a
                      href={`http://localhost:4000/material_files/${lesson.material}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="open-material-btn"><p>Open Material</p></button>
                    </a>
                  </div>
                </div>
                {user.isTeacher && (
                  <button
                    className="delete-lesson-btn"
                    onClick={() => handleDeleteLesson(lesson._id)}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                )}

              </Col>

              <Col
                md={6}
                className="lesson-video d-flex justify-content-center"
              >
                <iframe
                  width="560"
                  height="315"
                  src={lesson.video}
                  title="Lesson Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Col>
            </Row>
          ))}
          {isSuccess && <Alert variant="success">Your lesson is deleted</Alert>}
          {isError && <Alert variant="danger">{error.data}</Alert>}
        </div>
      </div>

      <div className="new-lessons mb-5">
        {user?.isTeacher ? (
          <>
            <button onClick={() => setShow(true)} className="add-lesson"><p>Add new lesson</p></button>
            <button onClick={handleShowCreateQuiz} className="add-quiz"><p>Create Quiz</p></button>
          </>
        ) : (
          <button onClick={handleShowQuiz} className="open-test-btn"><p>Open Test</p></button>
        )}
      </div>

      {/* New lesson model */}
      <Modal
        show={show}
        className="new-lesson-model modal-lg ml-5"
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton className="model-header">
          <h3>New Lesson</h3>
        </Modal.Header>
        <NewLesson courseId={id} />
      </Modal>

      {/* Quiz Q&A */}
      <Quiz courseId={id} userId={userId} quizData={quizData} show={showQuiz} onHide={handleCloseQuiz} />

      <CreateQuiz courseId={id} show={showCreateQuiz} onHide={handleCloseCreateQuiz} />
    </div>
  );
}

export default Lessons;


