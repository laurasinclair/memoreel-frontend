import classNames from "classnames";
import { CheckLg } from "react-bootstrap-icons";
import { Button } from "components";
import logger from "src/utils/logger";
import { useAssets } from "src/hooks/useAssets";
import { AssetProps } from "src/types";
import { useAssetContext } from "src/context/AssetContext";
import { useEffect } from "react";

const SaveButton = () => {
    const { saveNewAsset } = useAssets();
    const { newAssetContent } = useAssetContext();

    useEffect(() => {
        logger.log("hello");
        logger.log(newAssetContent);
    }, [newAssetContent])

    const handleSave = () => {
        const newAsset: AssetProps = newAssetContent;

        try {
            saveNewAsset(newAsset);
        } catch (err) {
            logger.error(err)
            return;
        }
    };

    return (
        <Button
            onClick={handleSave}
            variant="primary"
            // disabled={!validateContent(assetContent)}
            // className={classNames(className,
            //    "button-primary")}
            // style={{
            //     display: isEditing && assetType === "camImage" ? "none" : "flex",
            // }}
        >
            <CheckLg size="20" />
        </Button>
    );
};

export default SaveButton;