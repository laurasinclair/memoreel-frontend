import { AssetProps } from "src/types";
import logger from "./logger";

export const validateContent = (asset: AssetProps) => {
	if (!asset) return false;
	const { content, type } = asset;

	switch (type) {
		case "youtubeURL":
			const youtubeUrlRegex =
				/^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/;
			return youtubeUrlRegex.test(content);
		case "image":
		case "webcamImage":
			return content instanceof Blob || content instanceof File
				? content.type.startsWith("image/")
				: false;
		case "audio":
			return content instanceof Blob
				? content.type.startsWith("audio/")
				: false;
		case "text":
			if (typeof content !== "string" || !content.length) return false;
			const unsafePattern = /[<>]/; // disallow '<' and '>'
			return !unsafePattern.test(content);
		default:
			return false;
	}
};

export const formatDate = (inputDate: Date) => {
	const date = new Date(inputDate);
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	const formattedDate = `${day}.${month}.${year}`;
	return formattedDate;
};

export const capitalizeString = (str: string) => {
	if (!str || typeof str !== "string") return
	return str[0].toUpperCase() + str.slice(1)
}

export const base64ToBlob = (base64: string): Blob => {
	const [header, data] = base64.split(",");
	const mime = header.match(/:(.*?);/)?.[1] || "application/octet-stream";

	const binary = atob(data); // decode base64
	const array = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		array[i] = binary.charCodeAt(i);
	}

	return new Blob([array], { type: mime });
};

export const toBlob = (fileOrBlob: File | Blob): Blob => {
	logger.log(fileOrBlob instanceof Blob)
	if (fileOrBlob instanceof Blob) return fileOrBlob;
	return new Blob([fileOrBlob]);
}

export const createEvent = (file) => {
	return {
		target: {
			files: [file],
		},
	};
};

export const isToday = (dateString: Date) => {
	const date = new Date(dateString);
	const today = new Date();

	return (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	);
}