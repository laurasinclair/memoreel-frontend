import { assetContext } from "src/context/AssetContext";
import { assetEditorConfig } from "src/config/assetEditorConfig";
import { DeleteButton, SaveButton } from "../AssetActions";
import { capitalizeString } from "src/utils";
import { AssetEditorProps, AssetProps } from "src/types";

function AssetEditor() {
	const { newAssetContent, onChange, isEditing } = assetContext();
	if (!newAssetContent) return;
	const type = newAssetContent.type;
	const currentAsset: AssetEditorProps = assetEditorConfig[type];

	const renderVerb = () => {
		if (isEditing) return "edit"
		return currentAsset.verb || "add";
	}

	return (
		<>
			{currentAsset && (
				<>
					<h3 className="mb-3">{`${capitalizeString(renderVerb())} ${
						currentAsset.title
					}`}</h3>
					{currentAsset.description && (
						<p className="mt-2">{currentAsset.description}</p>
					)}
					<div className="mb-2">
						{currentAsset.input({
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
			)}
		</>
	);
}

export default AssetEditor;
