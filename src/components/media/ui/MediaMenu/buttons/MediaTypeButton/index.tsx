import classNames from "classnames";
import type { AssetTypeProps } from "types";
import styles from "../index.module.sass";
import { useEffect, useState } from "react";
import { assetContext } from "src/context/AssetContext";
import { usePopUp } from "src/context/PopUpContext";
import logger from "src/utils/logger";
import { mediaConfig } from "src/config/mediaConfig";

export default function MediaTypeButton() {
	const { setNewAssetContent } = assetContext();
	const [activeButton, setActiveButton] = useState(null);
	const { isPopUpOpen, openPopUp } = usePopUp();

	const openMediaForm = (type: AssetTypeProps) => {
		try {
			setNewAssetContent((prev) => ({ ...prev, type: type }));
			openPopUp();
			setActiveButton((prev) => (prev === type ? null : type));
		} catch (err) {
			logger.log("❌", err);
		}
	};

	useEffect(() => {
		if (!isPopUpOpen) {
			setActiveButton(null);
		}
	}, [isPopUpOpen]);

	const mediaButtons = Object.entries(mediaConfig).map(([type, config]) => ({
		type,
		...config.button,
	}));

	return (
		<>
			{mediaButtons.map(({ type, icon, label }) => (
				<button
					key={type}
					onClick={() => openMediaForm(type)}
					className={classNames(
						"button-primary",
						styles.addMediaButton_assetTypeButton,
						{ [styles.active]: activeButton === type }
					)}
				>
					{icon}
					<span>{label}</span>
				</button>
			))}
		</>
	);
}