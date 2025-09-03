import classNames from "classnames";
import type { AssetTypeProps, MediaTypeButtonProps } from "types";
import styles from "../index.module.sass";
import { useEffect, useState } from "react";
import { useAssetContext } from "context/AssetContext";
import { usePopUp } from "src/context/PopUpContext";
import logger from "logger";
import { assetEditorConfig } from "src/config/assetEditorConfig";

export default function MediaTypeButton() {
	const { openAssetEditor } = useAssetContext();
	const [activeButton, setActiveButton] = useState(null);
	const { isPopUpOpen } = usePopUp();

	const handleClick = (type: AssetTypeProps) => {
		if (!type) return;
		openAssetEditor(type);
		setActiveButton(type);
	}

	const handleActive = (type: AssetTypeProps) => {
		setActiveButton(type)
		setTimeout(() =>setActiveButton(null), 4000);
	}

	const mediaTypeButtons: MediaTypeButtonProps[] = Object.entries(
		assetEditorConfig
	).map(([type, config]) => ({
		type,
		title: config.title,
		verb: config.verb || "add",
		...config.button,
	}));

	return (
		<>
			{mediaTypeButtons.map(
				({ type, title, verb, icon }: MediaTypeButtonProps) => {
					return (
						<button
							key={type}
							onMouseEnter={() => handleActive(type)}
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