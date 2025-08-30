import React, { useState, useEffect, useContext } from 'react';

import { openPopUp, closePopUp } from "components/layout/PopUp";
import { Images, PlayBtn, Camera, Stickies, Mic, PlusLg } from 'react-bootstrap-icons';
import classNames from 'classnames';
import type {
	AddMediaAllButtonsProps,
	AddMediaButtonProps, AssetTypeProps, MediaTypeButtonProps,
} from "types";
import styles from './index.module.sass';
import { useAssets } from 'src/hooks/useAssets';
import { AuthContext } from 'src/context';

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
			<AddMediaButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
		</>
	);
}

export function MediaTypeButton() {
	const { user } = useContext(AuthContext);
	const { setNewAssetContent } = useAssets(user._id);
	const [activeButton, setActiveButton] = useState(null);

	const openMediaForm = (type: AssetTypeProps) => {
		console.log("1. openMediaForm()");

		try {
			setNewAssetContent((prev) => ({ ...prev, assetType: type }));
			// openPopUp();

			// setIsPopUpOpen((prev) => {
			// 	// if (prev.isPopUpOpen && prev.assetType === type) return { ...prev, isPopUpOpen: false };
			// 	return true;
			// });

			// setActiveButton((prev) => (prev === type ? null : type));
		} catch (err) {
			console.log("❌", err);
		}

	};

	// useEffect(() => {
	// 	if (!isPopUpOpen) setActiveButton(null);
	// }, [isPopUpOpen]);

	const mediaButtons: {
		type: AssetTypeProps;
		icon: JSX.Element;
		label: string;
	}[] = [
		{ type: "image", icon: <Images size={30} />, label: "add image" },
		{ type: "text", icon: <Stickies size={30} />, label: "add text" },
		{
			type: "youtubeURL",
			icon: <PlayBtn size={30} />,
			label: "add Youtube video",
		},
		{ type: "camImage", icon: <Camera size={30} />, label: "take selfie" },
		{ type: "audio", icon: <Mic size={28} />, label: "add audio" },
	];

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

