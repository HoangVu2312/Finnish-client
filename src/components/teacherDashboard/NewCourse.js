import React, { useState } from "react";
import { useCreateCourseMutation } from "../../service/appApi";
import { useNavigate } from "react-router-dom";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewCourse() {
  const navigate = useNavigate();

  // set up local state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    enrollmentDeadline: "",
  });
  const userId = useSelector((state) => state.user?._id);

  const [createCourse, { isError, error, isLoading, isSuccess }] =
    useCreateCourseMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.enrollmentDeadline
    ) {
      return alert("Please fill out all the fields");
    }
    // formData obj must be named course
    createCourse({ course: formData, userId }).then(({ data }) => {
      //successful create a property
      if (data) {
        setTimeout(() => {
          navigate("/courses");
        }, 1500);
      }
    });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <Form style={{ width: "90%" }} onSubmit={handleSubmit}>
        <h2>Create new course </h2> <br />
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDealine">
            <Form.Label>Enrolling End</Form.Label>
            <br />
            <DatePicker
              selected={formData.enrollmentDeadline}
              onChange={(date) =>
                setFormData((prevData) => ({
                  ...prevData,
                  enrollmentDeadline: date,
                }))
              }
              dateFormat="yy-MM-dd"
              className="form-control"
              required
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            required
            value={formData.description}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
        </Form.Group>
        <div className="d-flex justify-content-center mb-5">
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="create-course"
          >
            CREATE
          </button>
        </div>
      </Form>

      {/* handle error */}
      {isSuccess && <Alert variant="success">Your course is now online</Alert>}
      {isError && <Alert variant="danger">{error.data}</Alert>}
    </div>
  );
}

export default NewCourse;
