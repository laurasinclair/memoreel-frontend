import axios, { AxiosInstance } from "axios";
import { API_URL } from "src/config";
import { LoginType } from "src/types";

class AuthService {
	private api: AxiosInstance;

	constructor() {
		this.api = axios.create({ baseURL: API_URL });

		this.api.interceptors.request.use((config) => {
			const storedToken = localStorage.getItem("authToken");

			if (storedToken) {
				config.headers = {
					...config.headers,
					Authorization: `Bearer ${storedToken}`,
				};
			}

			return config;
		});
	}

	login = (req: LoginType) => {
		if (!req.email || !req.password) return;
		return this.api.post("/auth/login", req);
	};

	signup = (requestBody) => {
		return this.api.post("/auth/signup", requestBody);
	};

	verify = () => {
		return this.api.get("/auth/verify");
	};
}

const authService = new AuthService();

export default authService;
