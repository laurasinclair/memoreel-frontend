import { assetContext } from "src/context/AssetContext";
import { mediaConfig } from "src/config/mediaConfig";
import { useEffect, useState } from "react";
import { SaveButton } from "../AssetActions";
import logger from "logger";

function AssetEditor({ editAsset, deleteAsset, enableEditing }) {
	const { newAssetContent, onChange } = assetContext();
	const type = newAssetContent?.type;
	const openAsset = mediaConfig[type];
	const [isEditing, setIsEditing] = useState<boolean>(false);

	// useEffect(() => {
	// 	if (!isPopUpOpen) setIsEditing(false);
	// }, [isPopUpOpen]);

	return (
		<>
			<h3>{openAsset.title}</h3>
			<p>{openAsset.description}</p>
			<p>
				{openAsset.input({
					defaultValue: newAssetContent.content || "",
					onChange,
				})}
			</p>
			<div>
				<SaveButton />
				{/* <DeleteButton
					assetId={assetId}
					deleteAsset={deleteAsset}
					setOpenMediaForm={setOpenMediaForm}
				/>  */}
				Delete
				{/* {touched && !validateContent(newAssetContent) && <p>Invalid content</p>} // TODO: better error display */}
			</div>
		</>
	);
}

export default AssetEditor;
