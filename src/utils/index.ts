import { AssetTypeProps } from "src/types";

export const validateContent = (content: any, type?: AssetTypeProps) => { // TODO: improve content type
	if (!content) return false;

	if (type === "youtubeURL") {
		const youtubeUrlRegex =
			/^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/;
		return youtubeUrlRegex.test(content);
	}

	if (type === "image") {
		return true;
	}

	if (type === "text") {
		if (!content.length) return false;
		const unsafePattern = /[<>]/; // disallow '<' and '>' to prevent potential HTML injection
		if (unsafePattern.test(content)) return false;
	}

	return true;
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