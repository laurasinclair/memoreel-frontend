import { Pen } from "react-bootstrap-icons";
import { Button } from "components";
import classNames from "classnames";
import type { AssetTypeProps, MediaTypeButtonProps } from "types";
import { useEffect, useState } from "react";
import { assetContext } from "src/context/AssetContext";
import { usePopUp } from "src/context/PopUpContext";
import logger from "src/utils/logger";
import { assetEditorConfig } from "src/config/assetEditorConfig";

const EditButton = ({asset, ...rest}) => {
	const { openAssetEditor } = assetContext();

	return (
		<Button
			onClick={() => openAssetEditor(asset)}
			variant="primary"
			{...rest}
		>
			<Pen size={16} />
		</Button>
	);
};

export default EditButton;