import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

function Message() {
  const userId = useSelector((state) => state?.user._id);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    axios.get(`users/teacher-message/${userId}`).then(({ data }) => setMessages(data));
  }, [userId]);

  const extractEmail = (message) => {
    const emailMatch = message.match(/email:\s*([^\s,]+)/);
    return emailMatch ? emailMatch[1] : '';
  };

  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="message-container" style={{border:"red", minWidth:"60vw", minHeight:"80vh", zIndex:"5"}}>
      <h1>All Messages</h1>
      <Table bordered hover style={{ maxHeight: "100%", maxWidth: "100%" }}>
        <tbody>
          {messages?.map((message, index) => {
            const email = extractEmail(message.message);
            return (
              <tr key={index}>
                <td>{message.message}</td>
                <td></td>
                <td>{new Date(message.time).toLocaleString()}</td>
                <td><button onClick={() => handleSendEmail(email)}>Send Email</button></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Message;

