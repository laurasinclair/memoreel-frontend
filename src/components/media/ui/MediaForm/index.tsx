import { useAssetContext } from "src/context/AssetContext";
import { mediaConfig } from "src/config/mediaConfig";

function MediaForm() {
	const { newAssetContent } = useAssetContext();
	const openAsset = mediaConfig[newAssetContent?.assetType];

	return (
		<div>
			<h3>{openAsset.title}</h3>
			<p>{openAsset.description}</p>
			<p>{openAsset.input}</p>
		</div>
	);
}

export default MediaForm;
