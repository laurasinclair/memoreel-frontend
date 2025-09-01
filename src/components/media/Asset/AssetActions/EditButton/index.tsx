import { Pen } from "react-bootstrap-icons";
import { Button } from "components";
import type { AssetProps } from "types";
import { assetContext } from "src/context/AssetContext";

const EditButton = ({asset, ...rest}: AssetProps & any) => {
	const { openAssetEditor } = assetContext();

	return (
		<Button
			onClick={() => openAssetEditor(asset, true)}
			variant="secondary" outline
			{...rest}
		>
			<Pen size={16} />
		</Button>
	);
};

export default EditButton;