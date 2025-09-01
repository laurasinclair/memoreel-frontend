import axios from "axios";

class AssetsService {
	constructor() {
		this.api = axios.create({
			// baseURL: import.meta.env.VITE_API_URL
			baseURL: "http://localhost:5005"
		});

		this.api.interceptors.request.use((config) => {
			const storedToken = localStorage.getItem("authToken");
			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` };
			}
			return config;
		});
	}

	createAsset = (requestBody: object) => {
		return this.api.post("/assets", requestBody);
	};

	updateAsset = (requestBody: object) => {
		const assetId = requestBody._id
		return this.api.put(`/assets/${assetId}`, requestBody);
	};

	delete = (id: string) => {
		return this.api.delete(`/assets/${id}`);
	};
}

const assetsService = new AssetsService();

export default assetsService;
