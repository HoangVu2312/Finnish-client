import React, { useRef, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetNotifications } from "../../features/userSlice.js";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Navigation.css";
import axios from "../../axios/axios.js";
import logo from "../../images/Logo1.png"

function Navigation() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({ top: 0, left: 0 }); // Set default values

  // Calculate number of unread notifications
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === "unread") return acc + 1;
    return acc;
  }, 0);

  // Show the notifications and mark as read
  function handleToggleNotifications() {
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display =
      notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0)
      axios.post(`/notifications/${user._id}/updateNotifications`);
  }

  return (
    <Navbar expand="lg" className="navigation_bar">
      <div className="container">

        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" style={{maxWidth:"100px"}}/>
          </Navbar.Brand>
        </LinkContainer>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/articles">
              <Nav.Link>
                <h5>ARTICLES</h5>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/courses">
              <Nav.Link>
                <h5>COURSES</h5>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/games">
              <Nav.Link>
                <h5>GAMES</h5>
              </Nav.Link>
            </LinkContainer>
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>
                  <button className="login-btn">
                    <h5>Login</h5>
                  </button>
                </Nav.Link>
              </LinkContainer>
            )}

            {user && (
              <>
                <Nav.Link
                  style={{ position: "relative" }}
                  onClick={handleToggleNotifications}
                >
                  <i
                    className="fas fa-bell"
                    ref={bellRef}
                    data-count={unreadNotifications || null}
                    style={{ fontSize: "24px" }}
                  ></i>
                </Nav.Link>
                <NavDropdown
                  title={
                    <img
                      src={user.avatar?.url}
                      alt="Avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "2px solid #fa5537",
                        transform:"translateY(-15%)",
                      }}
                    />
                  }         
                >
                  {user.isTeacher && (
                    <>
                      <LinkContainer to="/teacher-dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  {!user.isTeacher && (
                    <>
                      <LinkContainer to="/student-dashboard">
                        <NavDropdown.Item>
                          Dashboard
                        </NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="logout-btn ms-4 mt-2"
                  >
                    Logout
                  </button>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>



      <div
        className="notifications-container"
        ref={notificationRef}
        style={{
          position: "absolute",
          top: bellPos.top + 35,
          left: bellPos.left,
          backgroundColor:'#ffffff',
          borderRadius:'4px',
          padding:'12px',
          display: "none",
          color:'#fa5537',
          border:"1px solid #fa5537",
          zIndex: 2
        }}
      >
        {user?.notifications?.length > 0 ? (
          user?.notifications.map((notification) => (
            <p key={notification._id}  className={`py-1 notification-${notification.status}`}>
              {notification.message}
              <br />
              <span>
                {notification.time.split("T")[0] +
                  " " +
                  notification.time.split("T")[1]}
              </span>
            </p>
          ))
        ) : (
          <p>No notifications yet!</p>
        )}
      </div>
    </Navbar>
  );
}

export default Navigation;

