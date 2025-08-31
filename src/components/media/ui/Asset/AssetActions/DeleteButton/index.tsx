import { Trash } from "react-bootstrap-icons";
import { Button } from "components";

const DeleteButton = () => {
    return (
        <Button
            onClick={() =>
                assetId ? deleteAsset(assetId) : setOpenMediaForm(false)
            }
            variant="primary"
        >
            <Trash />
        </Button>
    );
};

export default DeleteButton;