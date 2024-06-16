import React, { useState } from "react";
import axios from "../../axios/axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/userSlice";
import "./StudentDashboard.css"
import ToastMessage from "../toastMessage/ToastMessage";


function StudentDashboard() {
    const user = useSelector((state) => state?.user);
    const courseId = user.enrolledCourses[0]
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const dispatch = useDispatch();
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url || "");

    const handleAvatarChange = () => {
        axios.put("/users/avatar", { userId: user._id, avatarUrl })
            .then(({ data }) => {
                // Update the Redux state with the new user data
                dispatch(updateUser(data));
                setIsSuccess(true)
            })
            .catch((error) => {
                setIsError(true);
            });
    };

    if (user.isTeacher) {
        return <div>Access denied. Only students can access this dashboard.</div>;
    }

    return (
        <div className="student-dashboard">
            <div className="dashboard-content container p-5">
                <h2>Student Dashboard</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>CourseId: {user.enrolledCourses[0]}</p>
                <p>Grades: {user.grades[courseId]}</p>
                <p>Avatar:</p>
                <img src={user.avatar?.url} alt="avatar" style={{ maxWidth: "160px" }} />
                <div className="action">
                    <button className="change-avt-btn" onClick={handleAvatarChange}>Change Avatar</button>

                    <input
                        type="text"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="Enter new avatar URL"
                    />
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
                    body={"new avatar changed"}
                />
            )}
        </div>
    );
}

export default StudentDashboard;

