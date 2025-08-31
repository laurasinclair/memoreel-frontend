import { Images, Stickies, PlayBtn, Camera, Mic } from "react-bootstrap-icons";
import { AssetEditorProps, AssetTypeProps } from "src/types";

export const assetEditorConfig: Record<AssetTypeProps, AssetEditorProps> = {
	image: {
		title: "Add image",
		// description: "Description",
		button: { icon: <Images size={30} />, label: "add image" },
		input: (props) => <input type="file" accept="image/*" {...props} />,
	},
	text: {
		title: "Add note",
		// description: "Description",
		button: { icon: <Stickies size={30} />, label: "add note" },
		input: (props) => (
			<textarea placeholder="What's on your mind today?" {...props} />
		),
	},
	youtubeURL: {
		title: "Add youtube video",
		// description: "Description",
		button: { icon: <PlayBtn size={30} />, label: "add Youtube video" },
		input: (props) => (
			<input type="text" placeholder="Paste Youtube URL here" {...props} />
		),
	},
	camImage: {
		title: "Take selfie",
		// description: "Description",
		button: { icon: <Camera size={30} />, label: "take selfie" },
		// input: <WebcamCapture />,
	},
	audio: {
		title: "Add audio",
		button: { icon: <Mic size={28} />, label: "add audio" },
		// description: "Description",
		// input: <AudioCapture />,
	},
};
