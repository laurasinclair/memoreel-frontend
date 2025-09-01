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

	const renderVerb = () => (isEditing) ? "edit" : (openAsset.verb || "add");

	return (
		<>
			{openAsset && (
				<>
					{openAsset.title && (
						<h3 className="mt-0 mb-3">{`${capitalizeString(renderVerb())} ${
							openAsset.title
						}`}</h3>
					)}

					{openAsset.description && (
						<p className="mt-2">{openAsset.description}</p>
					)}

					{openAsset.input({
						defaultValue:
							openAsset.title === "image"
								? ""
								: asset.content || "",
						onChange,
					})}

					<div className="mt-2">
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
