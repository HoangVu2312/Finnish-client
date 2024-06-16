import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Register.css";
import { useSignupMutation } from "../../service/appApi";

function Signup() {
  // Set up local states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({
    public_id: "qpp1arzvxsnp8ggk2w9l",
    url: "http://res.cloudinary.com/datjdbueh/image/upload/v1711815685/qpp1arzvxsnp8ggk2w9l.png",
  }); // default avt

  // hook from appApi
  const [signup, { error, isLoading, isError }] = useSignupMutation();

  // handle signup action
  function handleSignup(e) {
    e.preventDefault();
    signup({ name, email, password, avatar }); // send data as an object to appApi
  }

  // Use cloudinary to get or save the real image files => only save the file url in Mongoose db
  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "datjdbueh",
        uploadPreset: "finnish-site",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setAvatar({ public_id: result.info.public_id, url: result.info.url });
        }
      }
    );
    widget.open();
  }

  // Function to handle the removal of the avatar image
  function handleRemoveAvatar() {
    setAvatar(null); // Clear the avatar state to remove the image
  }

  return (
    <div className="signup-container" style={{position:"relative"}}>
      <div className="signup-form">
        <Form onSubmit={handleSignup}>
          <h1>Create a new account</h1>

          {isError && <Alert variant="danger">{error.data}</Alert>}
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="info-input"
              type="text"
              placeholder="Enter your name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="info-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="info-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="formBasicCheckbox">
            <div className="avatar-container">
              {avatar &&
                avatar.url &&
                avatar.url !==
                  "http://res.cloudinary.com/datjdbueh/image/upload/v1711815685/qpp1arzvxsnp8ggk2w9l.png" && ( // Render the avatar image if it exists
                  <div className="avatar-preview">
                    <img
                      src={avatar.url}
                      alt="Avatar"
                      className="avatar-img"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <i
                      className="fa fa-times-circle"
                      onClick={handleRemoveAvatar}
                    ></i>
                  </div>
                )}

              <Button type="button" onClick={showWidget}>
                Upload avatar
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mt-5">
            <button
              type="submit"
              className="signup-button"
              disabled={isLoading}
            >
              Signup
            </button>
          </Form.Group>

          <p className="pt-3 text-center">
            Already have an account <Link to="/login">Login here</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
