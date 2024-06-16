import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";
import { Col, Image, Row } from "react-bootstrap";
import "./Article.css";
import ToastMessage from "../../components/toastMessage/ToastMessage";

function Article() {
  const [articles, setArticles] = useState([]);
  const user = useSelector((state) => state?.user);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    axios.get("/articles").then(({ data }) => setArticles(data));
  }, []);

  const handleDelete = (articleId) => {
    axios.delete(`/articles/${articleId}`)
      .then(({ data }) => {
        setArticles(data);
        setIsSuccess(true)
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  return (
    <div className="article-page">
      <div className="container">
        <div className="articles m-5">
          <div className="text-center mb-5">
            <h2>Everyone needs help!</h2>
          </div>
          {articles.map((article, index) => (
            <Row key={index} className="mb-4">
              <Col md={6}>
                <div className="article-1">
                  <Image
                    className="article1_img"
                    src={article.posterUrl}
                    alt={`article_${index + 1}`}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="title-1 d-flex flex-column justify-content-center align-items-start">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="d-flex">
                    <button className="article-btn">
                      <a href={article.articleUrl} target="_blank" rel="noopener noreferrer">LEARN MORE</a>
                    </button>
                    {user?.isTeacher && (
                      <button
                        className="article-btn mx-2"
                        onClick={() => handleDelete(article._id)}
                      >
                        DELETE
                      </button>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </div>
      </div>

      {/* notifications */}
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
          body={"Article is deleted !"}
        />
      )}
    </div>
  );
}

export default Article;


