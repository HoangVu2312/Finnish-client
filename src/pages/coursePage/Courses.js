import React, { useEffect } from "react";
import "./Course.css";
import axios from "../../axios/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "../../features/courseSlice.js";
import { LinkContainer } from "react-router-bootstrap";
import {Col, Row} from "react-bootstrap";
import { useCreateEnrollRequestMutation } from "../../service/appApi.js";
import ToastMessage from "../../components/toastMessage/ToastMessage.js";
import { useState } from "react";


function Courses({ updateTrigger }) {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state?.courses);
  const user = useSelector((state) => state?.user);
  const [trigger, setTrigger] = useState(updateTrigger);

  useEffect(() => {
    axios.get("/courses/all-courses").then(({ data }) => dispatch(updateCourse(data)));
  }, [dispatch, trigger]);

  const [createEnrollRequest, { isError, isSuccess }] = useCreateEnrollRequestMutation();
  const userId = user?._id;

  function handleEnrollRequest(id) {
    if (!user?.isTeacher) {
      createEnrollRequest({ userId, courseId: id });
    }
  }

  return (
    <div className="course-page">
      <div className="container courses pt-3">
        <h2>All Courses</h2>
        <div className="d-flex flex-column">
          {courses?.map((course) => (
            <Row className="course mb-5 d-flex justify-content-between mt-5 mb-5" key={course._id}>
              <Col md={9}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <span>
                  Enrolling period ends:{" "}
                  {(() => {
                    const dateString = course.enrollmentDeadline;
                    const date = new Date(dateString);
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                  })()}
                </span>
              </Col>
              <Col md={3} className="btn-side d-flex justify-content-center align-items-center mt-3">
                {(user?.isTeacher || (user?.enrolledCourses?.includes(course._id) && course.enrolledStudents.includes(user._id))) ? (
                  <LinkContainer to={`/lessons/${course._id}`}>
                    <button className="check-btn"><p>CHECK OUT</p></button>
                  </LinkContainer>
                ) : (
                  <button onClick={() => handleEnrollRequest(course._id)} className="enroll-btn">
                    <p>ENROLL</p>
                  </button>
                )}
              </Col>
            </Row>
          ))}
          {isError && (
            <ToastMessage
              bg="warning"
              title={"Ooops"}
              body={"Log-in again to access this course!"}
            />
          )}
          {isSuccess && (
            <ToastMessage
              bg="success"
              title={"Done"}
              body={"We got your enrollment !!"}
            />
          )}
        </div>
        <br />
      </div>
    </div>
  );
}

export default Courses;


