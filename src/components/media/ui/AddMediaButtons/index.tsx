import { useState, useEffect } from 'react';

import classNames from 'classnames';
import type {
	AddMediaButtonProps, AssetTypeProps,
} from "types";
import styles from './index.module.sass';
import { useAssetContext } from "src/context/AssetContext";
import { usePopUp } from 'src/context/PopUpContext';
import { mediaConfig } from "src/config/mediaConfig";
import { PlusLg } from 'react-bootstrap-icons';
import logger from 'logger';

// 1. "Add media" button
export function AddMediaButton({
	toggleMenu,
	isMenuOpen,
}: AddMediaButtonProps) {
	return (
		<button
			onClick={toggleMenu}
			className={classNames(styles.addMediaButton_main, {
				[styles.addMediaButton_main_menuIsOpen]: isMenuOpen,
			})}
		>
			<PlusLg size="20" className="mx-1" />
			<span className="mx-1">Add Media</span>
		</button>
	);
}

// 2. Full menu
export default function AddMediaAllButtons() {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	return (
		<>
			{isMenuOpen && (
				<MediaTypeButton />
			)}
			<AddMediaButton 
				toggleMenu={toggleMenu} 
				isMenuOpen={isMenuOpen} 
			/>
		</>
	);
}

export function MediaTypeButton() {
	const { setNewAssetContent } = useAssetContext();
	const [activeButton, setActiveButton] = useState(null);
	const { isPopUpOpen, openPopUp } = usePopUp();

	const openMediaForm = (type: AssetTypeProps) => {
		try {
			setNewAssetContent((prev) => ({ ...prev, assetType: type }));
			openPopUp();
			setActiveButton((prev) => (prev === type ? null : type));
		} catch (err) {
			logger.log("❌", err);
		}
	};

	useEffect(() => {
		if (!isPopUpOpen) {
			setActiveButton(null)
		}
	}, [isPopUpOpen])

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

