import React, { createContext, useState, useContext, useEffect } from "react";
import { useAssets } from "src/hooks/useAssets";
import logger from "src/utils/logger";
import type { AssetContextType, AssetProps, AssetTypeProps } from "types";
import { usePopUp } from "./PopUpContext";

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [newAssetContent, setNewAssetContent] = useState<
		AssetProps | undefined
	>(undefined);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { saveNewAssetSuccess } = useAssets();
	const { isPopUpOpen, openPopUp } = usePopUp();

	// logger.log(newAssetContent);

	const openAssetEditor = (asset: AssetTypeProps) => {
		if (!asset) return;
		try {
			setIsEditing(true);
			setNewAssetContent(asset);
			openPopUp();
		} catch (err) {
			logger.error(err);
		}
	};

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const content = e.target.value;
		setNewAssetContent((prev: AssetProps) => ({
			...prev,
			content,
		}));
	};

	useEffect(() => {
		if (saveNewAssetSuccess) {
			setNewAssetContent(undefined);
		}
		if (!isPopUpOpen) {
			setNewAssetContent(undefined);
			setIsEditing(false);
		}
	}, [saveNewAssetSuccess, isPopUpOpen]);

	return (
		<AssetContext.Provider
			value={{
				newAssetContent,
				setNewAssetContent,
				onChange,
				isEditing,
				setIsEditing,
				openAssetEditor,
			}}
		>
			{children}
		</AssetContext.Provider>
	);
};

export const assetContext = () => {
	const context = useContext(AssetContext);
	if (!context)
		throw new Error("useAssetContext must be used within AssetProvider");
	return context;
};
