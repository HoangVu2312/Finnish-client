// This file basically send HTTP request and get response from server
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Set up hearder to include token everytime send request
const baseQuery = fetchBaseQuery({
  baseUrl: "http://http://localhost:4000",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token"); // get token from local storage

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
  prepareRequest: (request, { getState }) => {
    const { method, body } = request;

    // Check if the request method is POST and body is an instance of FormData
    if (method === "POST" && body instanceof FormData) {
      request.headers.set("Content-Type", "multipart/form-data");
    }

    return request;
  },
});

// Create api => send request and update local storage from with data from be
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery,
  endpoints: (builder) => ({
    // user
    signup: builder.mutation({
      query: ({ name, email, password, avatar }) => ({
        url: "/users/signup",
        method: "POST",
        body: { name, email, password, avatar },
      }),

      // Transform data from server before return to client
      transformResponse: (response) => {
        const { token, user } = response; // extract token token,

        localStorage.setItem("token", token); // save token to localstorage
        return user;
      },
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/users/login",
        method: "POST",
        body: { email, password },
      }),
      // transforms the response from the server before returning it to the client
      transformResponse: (response) => {
        const { token, user } = response;
        localStorage.setItem("token", token);

        return user;
      },
    }),

    // course
    createCourse: builder.mutation({
      query: ({ course, userId }) => ({
        url: "/courses",
        body: { course, userId },
        method: "POST",
      }),
    }),

    deleteCourse: builder.mutation({
      query: ({ userId, courseId }) => ({
        url: `/courses/${courseId}`,
        body: { userId },
        method: "DELETE",
      }),
    }),

    // lesson
    createLesson: builder.mutation({
      query: ({ formData }) => ({
        url: "lessons/new-course",
        body: { formData },
        method: "POST",
      }),
    }),

    deleteLesson: builder.mutation({
      query: ({ userId, lessonId }) => ({
        url: `/lessons/${lessonId}`,
        body: { userId },
        method: "DELETE",
      }),
    }),

    // send create order request
    createEnrollRequest: builder.mutation({
      query: (body) => ({
        // body = {userId, courseId }
        url: "/notifications/new-enrollment",
        method: "POST",
        body,
      }),
    }),

    // send create accept request
    createAcceptRequest: builder.mutation({
      query: (body) => ({
        // body = {userId, courseId }
        url: "/notifications/accept-enrollment",
        method: "POST",
        body,
      }),
    }),

    getCourseQuiz: builder.query({
      query: (courseId) => `/quizzes/${courseId}`,
    }),

    submitQuizAnswer: builder.mutation({
      query: ({ courseId, userId, score }) => ({
        url: `/quizzes/submit`,
        method: "POST",
        body: { courseId, userId, score },
      }),
    }),

    createQuiz: builder.mutation({
      query: ({ userId, courseId, questions }) => ({
        url: `/quizzes`,
        method: "POST",
        body: {userId, courseId, questions },
      }),
    }),

    createMessage: builder.mutation({
      query: ({ fullName, email }) => ({
        url: "/users/message",
        method: "POST",
        body: { fullName, email },
      }),
    }),

    createArticle: builder.mutation({
      query: (article) => ({
        url: '/articles/create',
        method: 'POST',
        body: article
      }),
    }),

  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useCreateEnrollRequestMutation,
  useCreateAcceptRequestMutation,
  useGetCourseQuizQuery,
  useSubmitQuizAnswerMutation,
  useCreateQuizMutation,
  useCreateMessageMutation,
  useCreateArticleMutation
} = appApi;

export default appApi;
