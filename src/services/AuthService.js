import axios from "axios";

const authService = axios.create({
  baseURL: 'https://candidate.neversitup.com/todo/',
  // withCredentials: true,
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json"
  },
});

export default authService;