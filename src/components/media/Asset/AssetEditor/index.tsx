import { assetContext } from "src/context/AssetContext";
import { assetEditorConfig } from "src/config/assetEditorConfig";
import { useState } from "react";
import { DeleteButton, SaveButton } from "../AssetActions";

function AssetEditor({ editAsset, deleteAsset, enableEditing }) {
	const { newAssetContent, onChange } = assetContext();
	const type = newAssetContent?.type;
	const openAsset = assetEditorConfig[type];
	const [isEditing, setIsEditing] = useState<boolean>(false);

	// useEffect(() => {
	// 	if (!isPopUpOpen) setIsEditing(false);
	// }, [isPopUpOpen]);

	return (
		<>
			<h3 className="mb-0">{openAsset.title}</h3>
			<p className="mt-2">{openAsset.description}</p>
			<div className="mb-2">
				{openAsset.input({
					defaultValue: newAssetContent.content || "",
					onChange,
				})}
			</div>
			<div>
				<SaveButton />
				{/* <DeleteButton />  */}
				{/* {touched && !validateContent(newAssetContent) && <p>Invalid content</p>} // TODO: better error display */}
			</div>
		</>
	);
}

export default AssetEditor;
