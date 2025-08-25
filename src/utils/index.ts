export const validateContent = (content, assetType: string) => {
	if (!content) return false;
	if (assetType === "youtubeURL") {
		const youtubeUrlRegex =
			/^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/;
		return youtubeUrlRegex.test(content);
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
