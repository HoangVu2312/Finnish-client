import React, { useEffect } from "react";
import "../../pages/coursePage/Course.css"; // common style file
import axios from "../../axios/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "../../features/courseSlice.js";
import { useDeleteCourseMutation } from "../../service/appApi.js";
import { Alert } from "react-bootstrap";

function AllCourses() {
  // get all courses from server
  const dispatch = useDispatch();
  const courses = useSelector((state) => state?.courses);

  // async action
  useEffect(() => {
    axios
      .get("/courses/all-courses")
      .then(({ data }) => dispatch(updateCourse(data))); // send data to redux-store
  }, [dispatch]);

  const userId = useSelector((state) => state.user?._id);
  const [deleteCourse, { isError, error, isLoading, isSuccess }] = useDeleteCourseMutation();

  function handleDeleteCourse(id) {
    if (window.confirm("Remove this course ??"))
      deleteCourse({ userId, courseId: id });
  }

  return (
    <div className="course-page">
      <div className="container courses">
        <h1>All courses</h1>

        {courses?.map((course) => (
          <div
            className="course mb-5 d-flex justify-content-between mt-5"
            key={course._id}
          >
            <div>
              <h3>{course.title}</h3>
              <p>{course.description} </p>
            </div>

            <div className="btn-side d-flex justify-content-center align-items-center">
              <button
                onClick={() => handleDeleteCourse(course._id)}
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <br />
        {isSuccess && <Alert variant="success">Your course is deleted</Alert>}
        {isError && <Alert variant="danger">{error.data}</Alert>}
      </div>
    </div>
  );
}

export default AllCourses;
