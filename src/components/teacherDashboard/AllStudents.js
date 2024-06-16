import { Table } from "react-bootstrap";
import axios from "../../axios/axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const userId = useSelector((state) => state.user?._id);
  
  useEffect(() => {
    axios.get("users/students").then(({ data }) => setStudents(data));
  }, []);

  const handleDeleteStudent = async (studentId) => {
    try {
      const response = await axios.delete(`users/${studentId}`, {
        data: { userId },
      });
      // Update the state with the new list of students after deletion
      setStudents(response.data);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container all-student-tab">
      <h1>All students</h1>
      <Table bordered hover style={{ maxHeight: "100%", maxWidth: "100%" }}>
        <tbody>
          {students?.map((student) => (
            <tr key={student._id}>
              <td>
                {student.avatar && student.avatar.url ? (
                  <img
                    src={student.avatar.url}
                    alt="avatar"
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                  />
                ) : (
                  "No Avatar"
                )}
              </td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td></td>
              <td className="text-center">
                <button
                  class="btn btn-danger"
                  onClick={() => handleDeleteStudent(student?._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AllStudents;
