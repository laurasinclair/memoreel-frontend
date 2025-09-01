import { Images, Stickies, PlayBtn, Camera, Mic } from "react-bootstrap-icons";
import { WebcamCapture } from "src/components";
import { AssetEditorProps, AssetTypeProps } from "src/types";

export const assetEditorConfig: Record<AssetTypeProps, AssetEditorProps> = {
	image: {
		title: "image",
		verb: "upload",
		// description: "Description",
		button: { icon: <Images size={30} /> },
		input: (props) => <input type="file" accept="image/*" {...props} />,
	},
	text: {
		title: "note",
		verb: "write",
		// description: "Description",
		button: { icon: <Stickies size={30} /> },
		input: (props) => (
			<textarea placeholder="What's on your mind today?" {...props} />
		),
	},
	youtubeURL: {
		title: "youtube video",
		verb: "upload",
		// description: "Description",
		button: { icon: <PlayBtn size={30} /> },
		input: (props) => (
			<input type="text" placeholder="Paste Youtube URL here" {...props} />
		),
	},
	camImage: {
		title: "selfie",
		verb: "take",
		// description: "Description",
		button: { icon: <Camera size={30} /> },
		input: (props) => <WebcamCapture  {...props} />,
	},
	audio: {
		title: "voice note",
		verb: "record",
		button: { icon: <Mic size={28} /> },
		// description: "Description",
		// input: <AudioCapture />,
	},
};
