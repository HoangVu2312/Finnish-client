import axios from "../../axios/axios.js";
import React, { useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateLesson } from "../../features/lessonSlice.js";
import "../../pages/coursePage/Course.css"; // common style file";

function NewLesson({ courseId }) {
  const dispatch = useDispatch();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // set up local state
  const userId = useSelector((state) => state?.user._id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [video, setVideo] = useState("");
  const test = {};

  // modify video url to embed
  const parts = video.split("/");
  const videoId = parts[parts.length - 2];
  const embeddableUrl = `https://drive.google.com/file/d/${videoId}/preview`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("video", embeddableUrl);
    formData.append("test", test);
    formData.append("userId", userId);
    formData.append("courseId", courseId);

    if (!title || !description || !file || !video) {
      return alert("Please fill out all the fields");
    }

    try {
      const result = await axios.post("/lessons/new-lesson", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("result get back: ", result);
      if (result.data.status === "ok") {
        dispatch(updateLesson(result.data.lessons));
        setIsSuccess(true);

        // Reset form fields
        setTitle("");
        setDescription("");
        setFile("");
        setVideo("");
      }
    } catch (error) {
      console.error("Error occurred: ", error);
      setIsError(error);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <Form
        style={{ width: "90%" }}
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formGridVideo">
              <Form.Label>Video link</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                required
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridMaterial">
              <Form.Label>material</Form.Label>
              <input
                type="file"
                class="form-control"
                required
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formGridDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mb-5">
          <button type="submit" className="create-lesson">
            CREATE
          </button>
        </div>
      </Form>

      {/* handle error */}
      {isSuccess && <Alert variant="success">Your lesson is now online</Alert>}
      {isError && <Alert variant="danger">{isError}</Alert>}
    </div>
  );
}

export default NewLesson;
