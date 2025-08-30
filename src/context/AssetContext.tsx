import React, { createContext, useState, useContext } from "react";
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

	return (
		<AssetContext.Provider value={{ newAssetContent, setNewAssetContent }}>
			{children}
		</AssetContext.Provider>
	);
};

export const useAssetContext = () => {
	const context = useContext(AssetContext);
	if (!context)
		throw new Error("useAssetContext must be used within AssetProvider");
	return context;
};
