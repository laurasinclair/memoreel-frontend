import React, { createContext, useState, useContext, useEffect } from "react";
import { validateContent } from "src/utils";
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

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const content = e.target.value;
		if (validateContent(content)) {
			setNewAssetContent((prev: AssetProps) => ({
				...prev,
				content,
			}));
		}
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
