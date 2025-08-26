import React, { useState, useEffect } from 'react';

import { Images, PlayBtn, Camera, Stickies, Mic, PlusLg } from 'react-bootstrap-icons';
import classNames from 'classnames';
import type {
	AddMediaAllButtonsProps,
	AddMediaButtonProps, AssetTypeProps, MediaTypeButtonProps,
} from "types";
import styles from './index.module.sass';

export default function AddMediaAllButtons({
	mediaUpload,
	setMediaUpload,
}: AddMediaAllButtonsProps) {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const toggleMenu = () => setIsMenuOpen((prev) => !prev);
	return (
		<>
			{isMenuOpen && (
				<MediaTypeButton
					mediaUpload={mediaUpload}
					setMediaUpload={setMediaUpload}
				/>
			)}
			<AddMediaButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
		</>
	);
}

export function AddMediaButton({ toggleMenu, isMenuOpen }: AddMediaButtonProps) {
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

export function MediaTypeButton({
	mediaUpload,
	setMediaUpload,
}: MediaTypeButtonProps) {
	const [activeButton, setActiveButton] = useState(null);
	const handleOnClick = (type: AssetTypeProps) => {
		setMediaUpload(prev => {
			if (prev.isPopUpOpen && prev.assetType === type) return { ...prev, isPopUpOpen: false };
			return { ...prev, assetType: type, isPopUpOpen: true };
		})
		setActiveButton((prev) => (prev === type ? null : type));
	};

	useEffect(() => {
		if (!mediaUpload.isPopUpOpen) setActiveButton(null);
	}, [mediaUpload]);

	const mediaButtons: { type: AssetTypeProps; icon: JSX.Element; label: string }[] = [
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
					onClick={() => handleOnClick(type)}
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

