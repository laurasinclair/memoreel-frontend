import classNames from "classnames";
import { CheckLg } from "react-bootstrap-icons";
import { Button } from "components";

const SaveButton = ({
    handleSave,
    isEditing,
    assetType,
    validateContent,
    assetContent,
    className,
}) => {
    return (
        <Button
            onClick={handleSave}
            disabled={!validateContent(assetContent)}
            className={classNames(className, "button-primary")}
            style={{
                display: isEditing && assetType === "camImage" ? "none" : "flex",
            }}
        >
            <CheckLg size="20" />
        </Button>
    );
};

export default SaveButton;