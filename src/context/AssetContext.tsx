import React, { createContext, useState, useContext } from "react";
import logger from "src/utils/logger";
import type { AssetProps } from "types";

interface AssetContextType {
	newAssetContent: AssetProps | undefined;
	setNewAssetContent: React.Dispatch<
		React.SetStateAction<AssetProps | undefined>
	>;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [newAssetContent, setNewAssetContent] = useState<
		AssetProps | undefined
	>(undefined);

	const onChange = (e: React.ChangeEvent<HTMLElement>) => {
		setNewAssetContent((prev: AssetProps) => ({
			...prev,
			content: e.target.value,
		}));
	};

	return (
		<AssetContext.Provider
			value={{ newAssetContent, setNewAssetContent, onChange }}
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
