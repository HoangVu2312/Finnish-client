import { createSlice } from "@reduxjs/toolkit";
import appApi from "../service/appApi";

const initialState = [];

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // data fetched in Course page => update redux state
    updateCourse: (_, action) => {
      return action.payload;
    },
  },

  // handle api-requests
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.createCourse.matchFulfilled,
      (_, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.deleteCourse.matchFulfilled,
      (_, { payload }) => payload
    );
  },
});

export const { updateCourse } = courseSlice.actions;
export default courseSlice.reducer;
