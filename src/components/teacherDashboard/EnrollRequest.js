import React, { useEffect } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateAcceptRequestMutation } from '../../service/appApi.js';
import { useSocket } from '../../socket/SocketContext.js';
import { addNotification } from '../../features/userSlice.js';
import ToastMessage from '../toastMessage/ToastMessage.js';

function EnrollRequest() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const socket = useSocket();
  const [createAcceptRequest, { isLoading, isError, isSuccess }] = useCreateAcceptRequestMutation();

  useEffect(() => {
    if (!socket) return;

    const handleAcceptEnroll = (msgObj, studentId) => {
      if (user && studentId === user._id) {
        dispatch(addNotification(msgObj));
      }
    };

    socket.on("accept-enroll", handleAcceptEnroll);

    return () => {
      socket.off("accept-enroll", handleAcceptEnroll);
    };
  }, [socket, user, dispatch]);

  const handleAcceptRequest = (notification) => {
    const body = {
      userId: user._id,
      courseId: notification.course,
      studentId: notification.studentId,
      notificationId: notification._id,
    };
    createAcceptRequest(body);
  };

  if (!user || !user.isTeacher) {
    return <Alert variant="danger">Access denied. You are not authorized to view this page.</Alert>;
  }

  const notifications = user.notifications || [];

  return (
    <div className="enroll-requests" style={{position:"relative", minHeight:"85vh", zIndex: 0}}>
      {notifications.length === 0 ? (
        <div className='text-center'> No new enroll request !! :C</div>
      ) : (
        <Table striped bordered hover style={{position:"relative", zIndex:"0"}}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Message</th>
              <th>Course</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification._id}>
                <td>{notification.studentId?.name || 'N/A'}</td>
                <td>{notification.message}</td>
                <td>{notification.course?.title || 'N/A'}</td>
                <td>{new Date(notification.time).toLocaleString()}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleAcceptRequest(notification)}
                    disabled={isLoading}
                    className='accept-btn'
                  >
                    {isLoading ? 'Processing...' : 'Accept Request'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

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
              body={"You got new student bae !!"}
            />
          )}
        </Table>
      )}

    </div>
  );
}

export default EnrollRequest;







