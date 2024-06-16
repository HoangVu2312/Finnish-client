import { createSlice } from "@reduxjs/toolkit";
import appApi from "../service/appApi";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
      return initialState;
    },
    addNotification: (state, action) => {
      if (!state.notifications) {
        state.notifications = []; // Initialize notifications array if undefined
      }
      state.notifications.unshift(action.payload);
    },
    resetNotifications: (state) => {
      state.notifications.forEach((obj) => {
        obj.status = "read"; // Mark all notifications as read
      });
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload }; // Update the user state with the new data
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.signup.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.login.matchFulfilled,
      (_, { payload }) => payload
    );
  },
});

export const { logout, addNotification, resetNotifications, updateUser } = userSlice.actions;
export default userSlice.reducer;

