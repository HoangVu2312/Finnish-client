import React, { useState } from "react";
import { Col, Form, Image, Modal, Row } from "react-bootstrap";
import Bella1 from "../../images/bella.jpeg";
import MainVideo from "../../images/bio-bg.mp4";
import "./Home.css";
import { motion } from "framer-motion";
import { LinkContainer } from "react-router-bootstrap";
import { useCreateMessageMutation } from "../../service/appApi";
import ToastMessage from "../../components/toastMessage/ToastMessage";
import logo from "../../images/Logo1.png"
import methods from "../../images/methods.png"
import personalize from "../../images/personalize.png"
import legitimacy from "../../images/legitimacy.png"



function Home() {

  // send message to teacher
  const [createMessage, { isError, isSuccess }] = useCreateMessageMutation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    createMessage({ fullName, email });
  }

  if (isError) {
    console.log("error: ", isError)
  }


  //model state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <div className="home-page" id="home">
      <section className="landing-container">
        {/* tile + image */}
        <Row className="home-title">
          <Col md={6} className="image-container">
            <motion.div
              initial={{ x: "-5rem", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
                delay: 1,
              }}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <Image className="bella-1" src={Bella1} alt="border" />
            </motion.div>
          </Col>

          <Col
            md={6}
            className="introduction"
          >
            <div className="text-wrapper">
              <motion.h1
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.5,
                  type: "ease-in",
                  delay: 0.5,
                }}
              >
                FINNISH COACHING
              </motion.h1>{" "}
              <br /><br />
              <h2>HIGHSCHOOL</h2>
              <h2>COLLEGE</h2>
              <h2>UNIVERSITY</h2>
              <h2>INTERVIEWS</h2>
              <h2>LIFE IN FINLAND</h2>
              <br /> <br /><br /><br />
              <button className="member-btn">
                <a href="#contact">Get your membership</a>
              </button>
            </div>
          </Col>
        </Row>

        {/* Sponsers */}
        <Row className="sponsers">
          <div className="d-flex justify-content-between align-items-center p-5 ">
            <div className="sponser sponser-1" href="https://educitizens.com" target="_blank"><a href="https://educitizens.com" target="_blank" rel="noreferrer">.</a></div>
            <div className="sponser sponser-2"><a href="https://www.tuni.fi/en" target="_blank" rel="noreferrer">.</a></div>
            <div className="sponser sponser-3"><a href="https://www.lut.fi/en" target="_blank" rel="noreferrer">.</a></div>
            <div className="sponser sponser-4"><a href="https://www.helsinki.fi/en" target="_blank" rel="noreferrer">.</a></div>
          </div>
        </Row>
      </section>

      <section className="service-container">
        <div className="text-center p-3 service-content">
          <h2>STUDYING WITH ME</h2>

          <br />
          <Row className="services d-flex justify-content-center align-items-center p-5">
            <Col md={4}>
              <div className="service service_1">
                <img src={personalize} alt="personalize" className="service-icon mb-3" style={{ maxWidth: "250px" }} />
                <h4>PERSONALIZATION</h4>
                <p>
                  The courses focus on personal needs of each student,
                  and each lesson's vocaubulary is designed just for you.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="service service_2">
                <img src={methods} alt="methods" className="service-icon mb-3" style={{ maxWidth: "250px" }} />

                <h4>METHODS</h4>
                <p>
                  You will learn through real-life scenarios, where you can practice your communication skills with a native speaker most effectively.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="service service_3">
                <img src={legitimacy} alt="legitimacy" className="service-icon mb-3" style={{ maxWidth: "250px" }} />
                <h4>LEGITIMACY</h4>
                <p>
                  As a native Finnish, an experienced teacher, and soon a master of education, I know how to help my students to reach their goals.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="bio-container mt-5" id="bio">
        <Row>
          <Col md={6}>
            <div className="about d-flex flex-column justify-content-between align-items-center p-3 pb-5">
              <div className="text-center">
                <h1>MY STORY</h1>
              </div>
              <div className="text-center">
                <h2>MINDSET</h2><br />
                <h2>EXPERIENCE</h2><br />
                <h2>EXPLORING</h2><br />
              </div>

              <div className="text-center">
                <button className="open-video-btn" onClick={() => setShow(true)}>
                  <p>SEE MORE</p>
                </button>
              </div>


            </div>
          </Col>
          <Col md={6} className="text-center video-container">
            <video
              src={MainVideo}
              type="video/mp4"
              muted
              loop
              autoPlay={true}
              className="bio-video"
            ></video>
            <div className="video-filter">
              <h4>SELF</h4>
              <h4>LEARNING</h4>
              <br />
              <p>Cái rễ của việc học thì đắng nhưng quả của nó thì ngọt.</p>
            </div>
          </Col>
        </Row>
      </section>

      <section className="contact-container p-5 mt-5" id="contact">

        <Row
          className="form-container d-flex justify-content-center"
        >
          <Form className="newsletter-form mb-5 d-flex justify-content-around flex-row" onSubmit={handleMessageSubmit}>

            <Row className="mb-3 d-flex justify-content-between flex-row align-items-center">

              <Form.Group as={Col} md={3} controlId="formGridLogo" className="d-flex justify-content-center">
                <img src={logo} alt="logo" style={{ maxWidth: "200px" }} />
              </Form.Group>

              <Form.Group as={Col} md={3} controlId="formGridFullName">
                <Form.Control
                  type="text"
                  placeholder="Fullname"
                  className="newsletter-input m-2"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} md={3} controlId="formGridEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="newsletter-input m-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>


              <Form.Group as={Col} controlId="formSubmitButton" className="send-info d-flex justify-content-center">
                <button type="submit" className="info-form-btn mx-5">
                  <p>SEND</p>
                </button>
              </Form.Group>

            </Row>

          </Form>
        </Row>

        {/* notification */}
        {isError && (
          <ToastMessage
            bg="warning"
            title={"Ooops"}
            body={"Something went wrong ! Try again later"}
          />
        )}
        {isSuccess && (
          <ToastMessage
            bg="success"
            title={"Done"}
            body={" We got your contact !"}
          />
        )}

      </section>

      <section className="comment-container">
        <Row className="all-comments">
          <Col className="comment" md={3}>
            <div className="client-avt">
              <Image className="client-avt-img" src={"https://th.bing.com/th/id/OIP.02dtZ4_CsIrBV6n7PjIMLQHaHa?rs=1&pid=ImgDetMain"} alt="cmt" />
            </div>
            <div className="client-comment">
              <p>"Mình đã ở Phần lan được 2 năm nhưng vẫn chưa thể giao tiếp tốt, Bella đã giúp mình tự tin hơn rất nhiều trong giao tiếp hàng ngày."</p>
              <h5>Khánh Giang</h5>
            </div>
          </Col>
          <Col className="comment" md={3}>
            <div className="client-avt">
              <Image className="client-avt-img" src={"https://assets.isu.pub/document-structure/230202081720-50e353b6aa0424791718d598b0da57ba/v1/9d2aaf074236d35f17185ea76ab4068c.jpeg"} alt="cmt" />
            </div>
            <div className="client-comment">
              <p>"Mình đã học cô Bella được 2 khoá, cô rất nhiệt tình hỗ trợ mình, không chỉ trong việc học mà còn những vấn đề liên quan đến cuộc sống ở Phần Lan."</p>
              <h5>Thanh Tường</h5>
            </div>
          </Col>
          <Col className="comment" md={3}>
            <div className="client-avt">
              <Image className="client-avt-img" src={"https://d162s0cet9s8p8.cloudfront.net/articles/images/Connor_Daniels_Reading_for_College_Classes_Square_600x600-146.jpg"} alt="cmt" />
            </div>
            <div className="client-comment">
              <p>"Cô Bella đã dạy mình giao tiếp cơ bản và giúp mình đậu phỏng vấn một trường cấp 3 ở Phần Lan."</p>
              <h5>Nhân Minh</h5>
            </div>
          </Col>
        </Row>
      </section>

      <section className="footer-container p-5 mt-5" id="footer">
        <div className="footer-content">
          <LinkContainer to="/home">
            <button className="footer-btn">
              <a href="#Home">HOME</a>
            </button>
          </LinkContainer>

          <LinkContainer to="/courses">
            <button className="footer-btn">
              <a href="*">COURSES</a>
            </button>
          </LinkContainer>

          <LinkContainer to="/games">
            <button className="footer-btn">
              <a href="*">GAMES</a>
            </button>
          </LinkContainer>

          <LinkContainer to="/articles">
            <button className="footer-btn">
              <a href="*">ARTICLES</a>
            </button>
          </LinkContainer>

          <button className="footer-btn">
            <a href="https://www.instagram.com/finnishwbella" target="_blank" rel="noreferrer">CONTACT</a>
          </button>


        </div>
      </section>


      {/* Biography Model */}
      <Modal
        show={show}
        className="bio-model modal-lg ml-5"
        onHide={handleClose}
        centered
      >
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item main-bio-video"
            src="https://www.youtube.com/embed/bbxAnFKxbA4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{minWidth:"100%", minHeight:"50vh"}}
          ></iframe>
        </div>
        <div className="video-filter"></div>
      </Modal>



    </div>
  );
}

export default Home;
