import React, { useState } from "react";
import { useCreateArticleMutation } from "../../service/appApi";
import { Form } from "react-bootstrap";
import ToastMessage from "../toastMessage/ToastMessage";

function NewArticle() {
  const [articleUrl, setArticleUrl] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createArticle, { isLoading, isError, isSuccess }] = useCreateArticleMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArticle({ articleUrl, posterUrl, title, description });
    setArticleUrl("");
    setPosterUrl("");
    setTitle("");
    setDescription("");
  };

  return (
    <div className="new-article-container">
      <h1>Create New Article</h1>
      <Form onSubmit={handleSubmit} >
        <Form.Group>
          <Form.Label>Article URL</Form.Label>
          <Form.Control
            type="url"
            value={articleUrl}
            onChange={(e) => setArticleUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Poster URL</Form.Label>
          <Form.Control
            type="url"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button type="submit" disabled={isLoading} className="my-5 py-3 text-center" style={{ zIndex: 1, maxWidth: "30%" }}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {isError && (
          <ToastMessage
            bg="warning"
            title={"Ooops"}
            body={"something went wrong !!"}
          />
        )}
        {isSuccess && (
          <ToastMessage
            bg="success"
            title={"Done"}
            body={"New article is created !!"}
          />
        )}
      </Form>
    </div>
  );
}

export default NewArticle;
