import axios from "axios";

class BoardsService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5005",
      // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

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
