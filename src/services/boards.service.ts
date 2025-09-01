import axios from "axios";
import { API_URL } from "src/config";

class BoardsService {
  constructor() {
		this.api = axios.create({ baseURL: API_URL });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  get = (id) => {
    return this.api.get(`/boards/${id}`, id);
  };

  createBoard = (requestBody) => {
    return this.api.post("/boards", requestBody);
  };

  delete = (id) => {
    return this.api.delete(`/boards/${id}`);
  };
}

const boardsService = new BoardsService();

export default boardsService;
