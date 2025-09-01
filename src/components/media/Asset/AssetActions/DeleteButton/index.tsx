import { Trash } from "react-bootstrap-icons";
import { Button } from "components";
import { useAssets } from "src/hooks/useAssets";
import { assetContext } from "src/context/AssetContext";
import logger from "logger";
import { usePopUp } from "src/context/PopUpContext";

const DeleteButton = () => {
	const { deleteAsset } = useAssets();
	const { asset } = assetContext();
	const { closePopUp } = usePopUp();

	const handleDelete = () => {
			if (!asset) return;

			try {
				deleteAsset(asset);
				closePopUp();
			} catch (err) {
				logger.error(err);
			}
		};

    return (
			<Button onClick={handleDelete} variant="primary">
				<Trash />
				{/* {!confirmation ? <Trash onClick={handleClick} /> : "Are you sure?"} */}
			</Button>
		);
};

export default DeleteButton;