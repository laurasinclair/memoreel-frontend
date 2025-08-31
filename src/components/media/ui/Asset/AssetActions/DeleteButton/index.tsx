import { Trash } from "react-bootstrap-icons";
import { Button } from "components";

const DeleteButton = ({
    assetId,
    deleteAsset,
    setOpenMediaForm,
}) => {
    return (
        <Button
            onClick={() =>
                assetId ? deleteAsset(assetId) : setOpenMediaForm(false)
            }
            style="primary"
        >
            <Trash />
        </Button>
    );
};

export default DeleteButton;