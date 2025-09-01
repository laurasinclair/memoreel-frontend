import axios, { AxiosInstance } from "axios";
import { API_URL } from "src/config";
import { UploadFileType } from "src/types";
import logger from "logger";

class UploadFileService {
	private api: AxiosInstance;

	constructor() {
		this.api = axios.create({
			baseURL: API_URL,
		});

		this.api.interceptors.request.use((config) => {
			const storedToken = localStorage.getItem("authToken");
			if (!storedToken) return;
			config.headers = { Authorization: `Bearer ${storedToken}` };
			return config;
		});
	}

	uploadFile = async (file: UploadFileType) => {
		try {
			const fileData = new FormData();

			switch (true) {
				// case file instanceof Blob:
				// 	fileData.append("file", file, "audio_recording.webm");
				// 	break;
				default:
					fileData.append("file", file);
					break;
			}
			
			const res = await this.api.post("/assets/upload", fileData);
			return res.data.fileUrl;
		} catch (err) {
			logger.error(err);
			throw err;
		}
	};
}

const uploadFileService = new UploadFileService();

export default uploadFileService;