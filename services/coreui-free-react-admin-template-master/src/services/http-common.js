import axios from "axios";

export default axios.create({
  baseURL: "/booking",
  headers: {
    "Content-type": "application/json"
  }
});