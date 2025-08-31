import classNames from "classnames";
import type { AssetTypeProps, MediaTypeButtonProps } from "types";
import styles from "../index.module.sass";
import { useEffect, useState } from "react";
import { assetContext } from "src/context/AssetContext";
import { usePopUp } from "src/context/PopUpContext";
import logger from "src/utils/logger";
import { assetEditorConfig } from "src/config/assetEditorConfig";

export default function MediaTypeButton() {
	const { setNewAssetContent } = assetContext();
	const [activeButton, setActiveButton] = useState(null);
	const { isPopUpOpen, openPopUp } = usePopUp();

	const openAssetEditor = (type: AssetTypeProps) => {
		try {
			setNewAssetContent((prev) => ({ ...prev, type: type }));
			openPopUp();
			setActiveButton((prev) => (prev === type ? null : type));
		} catch (err) {
			logger.error(err);
		}
	};

	useEffect(() => {
		if (!isPopUpOpen) {
			setActiveButton(null);
		}
	}, [isPopUpOpen]);

	const mediaTypeButtons: MediaTypeButtonProps[] = Object.entries(
		assetEditorConfig
	).map(([type, config]) => ({
		type,
		...config.button,
	}));

	return (
		<>
			{mediaTypeButtons.map(
				({ type, icon, label }: MediaTypeButtonProps) => (
					<button
						key={type}
						onClick={() => openAssetEditor(type)}
						className={classNames(
							"button-primary",
							styles.addMediaButton_assetTypeButton,
							{ [styles.active]: activeButton === type }
						)}
					>
						{icon}
						<span>{label}</span>
					</button>
				)
			)}
		</>
	);
}