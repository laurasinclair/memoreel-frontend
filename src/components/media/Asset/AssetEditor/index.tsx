import { assetContext } from "src/context/AssetContext";
import { assetEditorConfig } from "src/config/assetEditorConfig";
import { useState } from "react";
import { DeleteButton, SaveButton } from "../AssetActions";
import logger from "src/utils/logger";
import { capitalizeString } from "src/utils";

function AssetEditor() {
	const { newAssetContent, onChange, isEditing } = assetContext();
	const type = newAssetContent?.type;
	const currentAsset = assetEditorConfig[type];

	const renderVerb = () => {
		if (isEditing) return "edit"
		return currentAsset.verb || "add";
	}

	logger.log(newAssetContent, currentAsset);

	return (
		<>
			{currentAsset && (
				<>
					<h3 className="mb-0">{`${capitalizeString(renderVerb())} ${
						currentAsset.title
					}`}</h3>
					<p className="mt-2">{currentAsset.description}</p>
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
