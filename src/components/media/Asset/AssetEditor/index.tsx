import { assetContext } from "src/context/AssetContext";
import { assetEditorConfig } from "src/config/assetEditorConfig";
import { DeleteButton, SaveButton } from "../AssetActions";
import { capitalizeString } from "src/utils";
import { AssetEditorProps } from "src/types";

function AssetEditor() {
	const { asset, onChange, isEditing } = assetContext();
	if (!asset) return;
	const type = asset.type;
	const openAsset: AssetEditorProps = assetEditorConfig[type];

	const renderVerb = () => {
		if (isEditing) return "edit"
		return openAsset.verb || "add";
	}

	return (
		<>
			{openAsset && (
				<>
					<h3 className="mb-3">{`${capitalizeString(renderVerb())} ${
						openAsset.title
					}`}</h3>
					{openAsset.description && (
						<p className="mt-2">{openAsset.description}</p>
					)}
					<div className="mb-2">
						{openAsset.input &&
							openAsset.input({
								defaultValue: asset.content || "",
								onChange,
							})}
					</div>
					<div>
						<SaveButton />
						{isEditing && <DeleteButton />}
						{/* {touched && !validateContent(asset) && <p>Invalid content</p>} // TODO: better error display */}
					</div>
				</>
			)}
		</>
	);
}

export default AssetEditor;
