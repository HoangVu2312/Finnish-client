import { createSlice } from "@reduxjs/toolkit";
import appApi from "../service/appApi";

const initialState = [];

export const lessonSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    // data fetched in Lesson page => update redux state
    updateLesson: (_, action) => {
      return action.payload;
    },
  },

  // handle api-requests
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.createLesson.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.deleteLesson.matchFulfilled,
      (_, { payload }) => payload
    );
  },
});

export const { updateLesson } = lessonSlice.actions;
export default lessonSlice.reducer;
