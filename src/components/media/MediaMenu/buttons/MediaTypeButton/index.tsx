import classNames from "classnames";
import type { AssetTypeProps, MediaTypeButtonProps } from "types";
import styles from "../index.module.sass";
import { useEffect, useState } from "react";
import { assetContext } from "src/context/AssetContext";
import { usePopUp } from "src/context/PopUpContext";
import logger from "src/utils/logger";
import { assetEditorConfig } from "src/config/assetEditorConfig";

export default function MediaTypeButton() {
	const { openAssetEditor } = assetContext();
	const [activeButton, setActiveButton] = useState(null);
	const { isPopUpOpen } = usePopUp();

	const handleClick = (type: AssetTypeProps) => {
		if (!type) return;
		openAssetEditor(type);
		setActiveButton((prev) => (prev === type ? null : type));
	}

	useEffect(() => {
		if (!isPopUpOpen) setActiveButton(null);
	}, [isPopUpOpen]);

	const mediaTypeButtons: MediaTypeButtonProps[] = Object.entries(
		assetEditorConfig
	).map(([type, config]) => ({
		type,
		title: config.title,
		verb: config.verb,
		...config.button,
	}));

	return (
		<>
			{mediaTypeButtons.map(
				({ type, title, verb, icon }: MediaTypeButtonProps) => {
					if (!verb) verb = "add"
					return (
						<button
							key={type}
							onClick={() => handleClick(type)}
							className={classNames(
								"button-primary",
								styles.addMediaButton_assetTypeButton,
								{ [styles.active]: activeButton === type }
							)}
						>
							{icon}
							<span>{`${verb} ${title}`}</span>
						</button>
					);
				}
			)}
		</>
	);
}