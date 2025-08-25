import React, { useState, useEffect } from 'react';

import { Images, PlayBtn, Camera, Stickies, Mic, PlusLg } from 'react-bootstrap-icons';
import classNames from 'classnames';
import type { AddMediaButtonProps } from "types";

import styles from './index.module.sass';

export function AddMediaButton({onClick, addMediaIsOpen}: AddMediaButtonProps) {
	return (
		<button
			onClick={onClick}
			className={classNames(styles.addMediaButton_addButton, {
				[styles.addMediaButton_addButton_on]: addMediaIsOpen,
			})}>
			<PlusLg
				size='20'
				className='mx-1'
			/>
			<span
				className={classNames('mx-1', {
					[styles.hideText]: addMediaIsOpen,
				})}>
				Add Media
			</span>
		</button>
	);
}

export default function AddMediaButtons({
	assetType,
	setAssetType,
	setOpenMediaForm,
	openMediaForm,
}) {
	const [activeButton, setActiveButton] = useState(null);

	const handleOnClick = (type: string) => {
		setOpenMediaForm((prev: boolean) => {
			if (prev && assetType === type) {
				return false;
			} else {
				setAssetType(type);
				return true;
			}
		});
		setActiveButton((prev) => (prev === type ? null : type));
	};

	useEffect(() => {
		if (!openMediaForm) {
			setActiveButton(null);
		}
	}, [openMediaForm]);

	const mediaButtons = [
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
					className={`${styles.addMediaButton_assetTypeButton} ${
						activeButton === type ? styles.active : ""
					}`}
				>
					{icon}
					<span>{label}</span>
				</button>
			))}
		</>
	);
}
