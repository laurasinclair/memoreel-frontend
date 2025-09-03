import { CheckLg } from "react-bootstrap-icons";
import { Button } from "components";
import logger from "logger";
import { useAssets } from "src/hooks/useAssets";
import { useAssetContext } from "context/AssetContext";
import { validateContent } from "src/utils";
import { usePopUp } from "src/context/PopUpContext";

const SaveButton = () => {
    const { saveNewAsset, updateAsset } = useAssets();
    const { asset, isEditing } = useAssetContext();
    const { closePopUp } = usePopUp();

    const handleSave = () => {
        if (!asset) return;

        try {
            if (validateContent(asset)) {
				if (isEditing) {
					updateAsset(asset);
				} else {
					saveNewAsset(asset);
				}
				closePopUp();
			}
        } catch (err) {
            logger.error(err);
        }
    };

    return (
			<Button
				onClick={handleSave}
				variant="primary"
				disabled={!validateContent(asset)}
				// style={{
				//     display: isEditing && assetType === "webcamImage" ? "none" : "flex",
				// }}
			>
				<CheckLg size="20" />
			</Button>
		);
};

export default SaveButton;