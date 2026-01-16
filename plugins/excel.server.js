import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  // baseURL: "https://excel-server-mark0002.mekmar.com",

  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
export default api;
