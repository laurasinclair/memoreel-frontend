import styles from "./index.module.sass";
import { AssetComponentProps } from "src/types";
import { ImageFrame, Note, Polaroid, VoiceNote, VideoFrame } from "./views";
import { EditButton } from "./AssetActions";

export default function Asset({ asset }: AssetComponentProps) {
	const renderContent = () => {
		switch (asset.type) {
			case "text":
				return <Note assetContent={asset.content} />;
			case "image":
				return <ImageFrame assetContent={asset.content} />;
			case "youtubeURL":
				return <VideoFrame assetContent={asset.content} />;
			case "webcamImage":
				return <Polaroid assetContent={asset.content} />;
			case "audio":
				return <VoiceNote assetContent={asset.content} />;
			default:
				return null;
		}
	};

	return (
		<div className={styles.assetWrapper}>
			<EditButton
				asset={asset}
				className={styles.assetWrapper_editButton}
			/>
			<div className={styles.assetWrapper_body}>{renderContent()}</div>
		</div>
	);
}
