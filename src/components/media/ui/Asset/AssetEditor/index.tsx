import { useAssetContext } from "src/context/AssetContext";
import { mediaConfig } from "src/config/mediaConfig";
import { useState } from "react";
import { SaveButton } from "../AssetActions";

function AssetEditor({ asset, editAsset, deleteAsset, enableEditing }) {
	const { newAssetContent } = useAssetContext();
	const openAsset = mediaConfig[newAssetContent?.assetType];

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [assetContent, setAssetContent] = useState(asset.content);

	const saveEdit = (newContent) => {
		editAsset(asset._id, newContent);
		setIsEditing(false);
		setAssetContent(newContent);
	};

	// useEffect(() => {
	// 	if (!isPopUpOpen) setIsEditing(false);
	// }, [isPopUpOpen]);

	return (
		<>
			{/* {isEditing && (
				<AssetEdit
					assetType={asset.type}
					initialContent={assetContent}
					saveEdit={saveEdit}
					setIsEditing={setIsEditing}
					isEditing={isEditing}
					assetId={asset._id}
					deleteAsset={deleteAsset}
				/>
			)} */}
			<h3>{openAsset.title}</h3>
			<p>{openAsset.description}</p>
			<p>{openAsset.input}</p>

			{enableEditing && (
				<>
					<div>
						{/* <SaveButton
							handleSave={handleSave}
							isEditing={isEditing}
							validateContent={validateContent}
							assetContent={assetContent}
						/>
						<DeleteButton
							assetId={assetId}
							deleteAsset={deleteAsset}
							setOpenMediaForm={setOpenMediaForm}
						/> */}
						{/* {touched && !validateContent(newAssetContent) && <p>Invalid content</p>} // TODO: better error display */}
					</div>
				</>
			)}
		</>
	);
}

export default AssetEditor;
