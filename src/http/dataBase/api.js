import axios from "axios";

export default axios.create({
  baseURL: "https://delfinkitrainingapi.azurewebsites.net/api/",
  responseType: "json"
});
