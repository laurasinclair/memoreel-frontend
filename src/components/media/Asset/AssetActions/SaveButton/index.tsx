import { CheckLg } from "react-bootstrap-icons";
import { Button } from "components";
import logger from "src/utils/logger";
import { useAssets } from "src/hooks/useAssets";
import { assetContext } from "src/context/AssetContext";
import { validateContent } from "src/utils";
import { usePopUp } from "src/context/PopUpContext";

const SaveButton = () => {
    const { saveNewAsset, updateAsset } = useAssets();
    const { newAssetContent, isEditing } = assetContext();
    const { closePopUp } = usePopUp();

    const handleSave = () => {
        if (!newAssetContent) return;

        try {
            if (validateContent(newAssetContent.content)) {
                if (isEditing) {
                    updateAsset(newAssetContent)
                } else {
                   saveNewAsset(newAssetContent);
                }
                closePopUp();
            }
        } catch (err) {
            logger.error(err);
            return;
        }
    };

    return (
			<Button
				onClick={handleSave}
				variant="primary"
				disabled={!validateContent(newAssetContent?.content)}
				// style={{
				//     display: isEditing && assetType === "camImage" ? "none" : "flex",
				// }}
			>
				<CheckLg size="20" />
			</Button>
		);
};

export default SaveButton;