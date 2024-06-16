import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import AllStudents from "../../components/teacherDashboard/AllStudents.js";
import NewCourse from "../../components/teacherDashboard/NewCourse.js";
import AllCourses from "../../components/teacherDashboard/AllCourses.js";
import Message from "../../components/teacherDashboard/Message.js";
import EnrollRequest from "../../components/teacherDashboard/EnrollRequest.js";
import NewArticle from "../../components/teacherDashboard/NewArticle.js";
import "./TeacherDashboard.css"; 

function TeacherDashboard() {
  return (
    <Container className="teacher-dashboard-container" style={{ zIndex: 1 }}>
      <Tab.Container defaultActiveKey="all-students">
        <Row>
          {/* side bar */}
          <Col sm={3}>
            <Nav variant="pills" className="flex-column pt-5">
              <Nav.Item>
                <Nav.Link eventKey="all-students">
                  <h5>All Students</h5>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="all-courses">
                  <h5>All Courses</h5>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="teacher-messages">
                  <h5>Messages</h5>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="enroll-request">
                  <h5>Enroll requests</h5>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="text-align-center">
                <Nav.Link eventKey="create-course">
                  <h5>Add New Course</h5>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="text-align-center">
                <Nav.Link eventKey="create-article">
                  <h5>Add New Article</h5>
                </Nav.Link>
              </Nav.Item>

            </Nav>
          </Col>

          {/* Display tabs*/}
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="all-students">
                <AllStudents />
              </Tab.Pane>
              <Tab.Pane eventKey="all-courses">
                <AllCourses />
              </Tab.Pane>
              <Tab.Pane eventKey="teacher-messages">
                <Message />
              </Tab.Pane>
              <Tab.Pane eventKey="enroll-request">
                <EnrollRequest />
              </Tab.Pane>
              <Tab.Pane eventKey="create-course">
                <NewCourse />
              </Tab.Pane>
              <Tab.Pane eventKey="create-article">
                <NewArticle />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default TeacherDashboard;

