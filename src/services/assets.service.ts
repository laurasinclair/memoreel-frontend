import axios from "axios";
import { API_URL } from "src/config";
import { UploadFileType } from "src/types";
import logger from "src/utils/logger";

class AssetsService {
	constructor() {
		this.api = axios.create({
			baseURL: API_URL,
		});

		this.api.interceptors.request.use((config) => {
			const storedToken = localStorage.getItem("authToken");
			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` };
			}
			return config;
		});
	}

	createAsset = (newAsset: object) => {
		return this.api.post("/assets", newAsset);
	};

	uploadFile = (file: UploadFileType) => {
		return this.api.post("/assets/upload", file);
	};

	updateAsset = (updatedAsset: object) => {
		const assetId = updatedAsset._id;
		if (!assetId) return;
		return this.api.put(`/assets/${assetId}`, updatedAsset);
	};

	delete = (id: string) => {
		return this.api.delete(`/assets/${id}`);
	};
}

const assetsService = new AssetsService();

export default assetsService;
