import { Images, Stickies, PlayBtn, Camera, Mic } from "react-bootstrap-icons";
import { WebcamCapture, AudioCapture, EditButtons, Loading } from "components";
import { AssetTypeProps } from "src/types";

export const mediaConfig: Record<
	AssetTypeProps,
	{
		title: string;
		description: string;
		button: { icon: JSX.Element; label: string };
		input: JSX.Element;
	}
> = {
	image: {
		title: "Image",
		description: "Description",
		button: { icon: <Images size={30} />, label: "add image" },
		input: <input type="file" accept="image/*" />,
		
	},
	text: {
		title: "Text",
		description: "Description",
		button: { icon: <Stickies size={30} />, label: "add text" },
		input: (props) => <textarea placeholder="What's on your mind today?" {...props} />
	},
	youtubeURL: {
		title: "Youtube URL",
		description: "Description",
		button: { icon: <PlayBtn size={30} />, label: "add Youtube video" },
		input: <input type="text" placeholder="Paste Youtube URL here" />,
	},
	camImage: {
		title: "Cam Image",
		description: "Description",
		button: { icon: <Camera size={30} />, label: "take selfie" },
		// input: <WebcamCapture />,
	},
	audio: {
		button: { icon: <Mic size={28} />, label: "add audio" },
		title: "Audio",
		description: "Description",
		// input: <AudioCapture />,
	},
};
