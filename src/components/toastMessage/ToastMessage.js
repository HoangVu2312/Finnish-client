import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./ToastMessage.css";

function ToastMessage({ bg, title, body }) {

    const [show, setShow] = useState(true);
    return (

        <div className="toast-container">
            <div className="wrapper">
                <ToastContainer position="bottom-right" className="toast-container">
                    <Toast
                        onClose={() => setShow(false)}
                        show={show}
                        delay={2000}
                        autohide
                        className={`${show ? "show-toast" : "hide-toast"} ${(bg === "warning") ? "warning-toast" : "success-toast"}`}
                    >
                        <div className="container-1">
                            {(bg === "warning") && (
                                <i class="fa-solid fa-square-xmark"></i>
                            )}
                            {(bg === "success") && (
                                <i className="fas fa-check-square"></i>
                            )}
                        </div>
                        <div className="container-2">
                            <p>{title}</p>
                            <p>{body}</p>
                        </div>


                    </Toast>
                </ToastContainer>
            </div>
        </div>
    );
}

export default ToastMessage;
