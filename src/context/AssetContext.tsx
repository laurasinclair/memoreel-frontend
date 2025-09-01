import React, { createContext, useState, useContext, useEffect } from "react";
import logger from "logger";
import type { AssetContextType, AssetProps, AssetTypeProps } from "types";
import { usePopUp } from "context/PopUpContext";

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [asset, setAsset] = useState<AssetProps | undefined>(undefined);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { isPopUpOpen, openPopUp } = usePopUp();

	const openAssetEditor = (
		assetOrType: AssetProps | string,
		options?: { isEditing?: boolean }
	) => {
		if (options?.isEditing) {
			setIsEditing(true);
		} else {
			setIsEditing(false);
		}

		if (assetOrType instanceof Object) {
			const fullAsset = assetOrType;
			setAsset((prev) => ({
				...prev,
				...fullAsset,
			}));
		}

		if (typeof assetOrType === "string") {
			const type = assetOrType;
			setAsset((prev) => ({
				...prev,
				type
			}));
		}

		openPopUp();
	};

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (e.target && e.target.files) {
			try {
				const file: File | Blob = e.target.files?.[0];
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
		throw new Error("assetContext must be used within AssetContext.Provider");
	return context;
};
