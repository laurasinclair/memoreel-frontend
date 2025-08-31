import { useAssetContext } from "src/context/AssetContext";
import { mediaConfig } from "src/config/mediaConfig";
import { useState } from "react";
import { SaveButton } from "../AssetActions";
import logger from "logger";

function AssetEditor({ editAsset, deleteAsset, enableEditing }) {
	const { newAssetContent } = useAssetContext();
	const type = newAssetContent?.assetType;
	const openAsset = mediaConfig[type];

	const [isEditing, setIsEditing] = useState<boolean>(false);
	// const [assetContent, setAssetContent] = useState(asset.content);

	const saveEdit = (newContent) => {
		// editAsset(asset._id, newContent);
		// setIsEditing(false);
		// setAssetContent(newContent);
	};

	// useEffect(() => {
	// 	if (!isPopUpOpen) setIsEditing(false);
	// }, [isPopUpOpen]);

	return (
		<>
			<h3>{openAsset.title}</h3>
			<p>{openAsset.description}</p>
			<p>{openAsset.input}</p>
			Save Edit
			<div>
				{" "}
				<SaveButton />
				{/* <DeleteButton
					assetId={assetId}
					deleteAsset={deleteAsset}
					setOpenMediaForm={setOpenMediaForm}
				/>  */}
				
				Edit
				{/* {touched && !validateContent(newAssetContent) && <p>Invalid content</p>} // TODO: better error display */}
			</div>
		</>
	);
}

export default AssetEditor;
