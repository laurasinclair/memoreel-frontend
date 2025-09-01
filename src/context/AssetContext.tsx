import React, { createContext, useState, useContext, useEffect } from "react";
import { useAssets } from "src/hooks/useAssets";
import logger from "src/utils/logger";
import type { AssetContextType, AssetProps, AssetTypeProps } from "types";
import { usePopUp } from "context/PopUpContext";

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [asset, setAsset] = useState<AssetProps | undefined>(undefined);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { todaysBoardStatus, saveNewAssetSuccess } = useAssets();
	const { isPopUpOpen, openPopUp, closePopUp } = usePopUp();

	const openAssetEditor = (assetOrType, isEditing) => {
		logger.log(assetOrType)
		if (assetOrType instanceof Object) {
			if (isEditing) setIsEditing(true);
			setAsset((prev) => ({
				...prev,
				...assetOrType,
			}));
		}

		if (typeof assetOrType === "string") {
			setAsset((prev) => ({
				...prev,
				type: assetOrType,
			}));
		}
		openPopUp();
	};

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (e.target && e.target.files) {
			try {
				const file = e.target.files?.[0];
				if (!file) throw new Error("No file");

				setAsset((prev: AssetProps) => ({
					...prev,
					content: file,
				}));

				return;
			} catch (err) {
				logger.error(err);
			}
		}

		if (e.target.value) {
			setAsset((prev: AssetProps) => ({
				...prev,
				content: e.target.value,
			}));
			return;
		}
	};

	useEffect(() => {
		logger.log(saveNewAssetSuccess);
		if (saveNewAssetSuccess) {
			setAsset(undefined);
			closePopUp();
		}
	}, [saveNewAssetSuccess]);

	useEffect(() => {
		if (!isPopUpOpen) {
			setAsset(undefined);
			setIsEditing(false);
		}
	}, [isPopUpOpen]);

	return (
		<AssetContext.Provider
			value={{
				asset,
				setAsset,
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
