import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation.js";
import Home from "./pages/homePage/Home.js";
import Article from "./pages/articlePage/Article.js";
import Courses from "./pages/coursePage/Courses.js";
import Login from "./pages/auth/Login.js";
import Signup from "./pages/auth/Signup.js";
import Lessons from "./pages/lessonPage/Lessons.js";
import TeacherDashboard from "./pages/teacherPage/TeacherDashboard.js";
import Games from "./pages/gamePage/Games.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addNotification } from "./features/userSlice.js";
import { SocketProvider, useSocket } from "./socket/SocketContext.js";
import RacingGame from "./components/games/racingGame/RacingGame.js";
import WordGame from "./components/games/wordGame/WordGame.js";
import DrawingGame from "./components/games/drawingGame/DrawingGame.js";
import StudentDashboard from "./components/studentDashboard/StudentDashboard.js";
import PreLoader from "./components/loader/Preloader.js";


function App() {
  return (
    <SocketProvider>
      <AppContent />
    </SocketProvider>
  );
}

function AppContent() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const socket = useSocket();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handleAcceptEnroll = (msgObj, studentId) => {
      if (user && studentId === user._id) {
        dispatch(addNotification(msgObj));
        setUpdateTrigger(true); // Trigger course update
      }
    };

    const handleNewEnrollRequest = (msgObj) => {
      if (user && user.isTeacher) {
        dispatch(addNotification(msgObj));
      }
    };
    
    const handleNewMessage = (msgObj) => {
      if (user && user.isTeacher) {
        dispatch(addNotification(msgObj));
      }
    };

    socket.on("accept-enroll", handleAcceptEnroll);
    socket.on("new-enroll-request", handleNewEnrollRequest);
    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("accept-enroll", handleAcceptEnroll);
      socket.off("new-enroll-request", handleNewEnrollRequest);
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, user, dispatch]);

  return (
    <>
      <BrowserRouter >
        <Navigation />
        <Routes>
          <Route index path="*" element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {user && user.isTeacher && (
            <>
              <Route path="teacher-dashboard" element={<TeacherDashboard />} />
            </>
          )}
          {user && (
            <>
              <Route path="/lessons/:id" element={<Lessons />} />
              <Route path="games/racingGame" element={<RacingGame />} />
              <Route path="games/wordGame" element={<WordGame />} />
              <Route path="games/drawingGame" element={<DrawingGame/>} />
              <Route path="student-dashboard" element={<StudentDashboard/>} />
              
              <Route
                path="courses"
                element={<Courses key={updateTrigger} />} // Pass updateTrigger as key to re-render component
              />
            </>
          )}
          <Route path="articles" element={<Article />} />
          <Route path="courses" element={<Courses />} />
          <Route path="games" element={<Games />} />
          <Route path="loader" element={<PreLoader />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;





