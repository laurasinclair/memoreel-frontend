import React, { createContext, useContext, useState } from "react";
import { PopUpContextType } from "src/types";

const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

export const PopUpProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

	const openPopUp = () => setIsPopUpOpen(true);
	const closePopUp = () => setIsPopUpOpen(false);

	return (
		<PopUpContext.Provider value={{ isPopUpOpen, openPopUp, closePopUp }}>
			{children}
		</PopUpContext.Provider>
	);
};

export const usePopUp = () => {
	const context = useContext(PopUpContext);
	if (!context) throw new Error("usePopUp must be used within PopUpProvider");
	return context;
};
