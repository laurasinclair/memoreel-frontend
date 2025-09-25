import { Pen } from "react-bootstrap-icons";
import { Button } from "components";
import type { AssetProps } from "types";
import { useAssetContext } from "context/AssetContext";

const EditButton = ({asset, ...rest}: AssetProps & any) => {
	const { openAssetEditor } = useAssetContext();

	return (
		<Button
			onClick={() => openAssetEditor(asset, {isEditing: true})}
			variant="secondary" outline
			{...rest}
		>
			<Pen size={16} />
		</Button>
	);
};

export default EditButton;