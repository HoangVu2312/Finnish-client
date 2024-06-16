import axios from "axios";

const instance = axios.create({
  baseURL: "https://finnishwithbella-server.onrender.com",
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from local storage

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Check if the request method is POST and body is an instance of FormData
    if (config.method === "post" && config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
