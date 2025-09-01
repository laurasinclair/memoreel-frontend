import { Trash } from "react-bootstrap-icons";
import { Button } from "components";
import { useAssets } from "src/hooks/useAssets";
import { assetContext } from "src/context/AssetContext";
import { useEffect } from "react";
import logger from "src/utils/logger";

const DeleteButton = () => {
	const { deleteAsset } = useAssets();
	const { asset } = assetContext();

    return (
			<Button onClick={() => deleteAsset(asset)} variant="primary">
				<Trash />
				{/* {!confirmation ? <Trash onClick={handleClick} /> : "Are you sure?"} */}
			</Button>
		);
};

export default DeleteButton;