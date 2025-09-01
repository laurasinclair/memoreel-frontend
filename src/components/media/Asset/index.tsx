import { useState } from "react";
import styles from "./index.module.sass";
import { MediaItemProps } from "src/types";
import { Image, Text, Polaroid, VoiceNote, YoutubeURL } from "./views";
import { EditButton } from "./AssetActions";

export default function Asset({
	asset,
	enableEditing,
}: MediaItemProps) {
	const [assetContent, setAssetContent] = useState(asset.content);
    
	const renderContent = () => {
		switch (asset.type) {
			case "text":
				return <Text assetContent={assetContent} />;
			case "image":
				return <Image assetContent={assetContent} />;
			case "youtubeURL":
				return <YoutubeURL assetContent={assetContent} />;
			case "camImage":
				return <Polaroid assetContent={assetContent} />;
			case "audio":
				return <VoiceNote assetContent={assetContent} />;
			default:
				return null;
		}
	};

	return (
		<div className={styles.assetWrapper}>
			{enableEditing && (
				<EditButton
					asset={asset}
					className={styles.assetWrapper_editButton}
				/>
			)}
			<div className={styles.assetWrapper_body}>{renderContent()}</div>
		</div>
	);
}
