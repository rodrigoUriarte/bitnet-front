import axios from "axios";

export default axios.create({
  baseURL: "http://bitnet-back.test/api",
  headers: {
    "Content-type": "application/json"
  }
});