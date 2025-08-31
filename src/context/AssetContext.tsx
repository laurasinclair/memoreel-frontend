import React, { createContext, useState, useContext } from "react";
import type { AssetContextType, AssetProps } from "types";

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
		setNewAssetContent((prev: AssetProps) => ({
			...prev,
			content,
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
