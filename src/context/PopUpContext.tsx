import React, { createContext, useContext, useState } from "react";

interface PopUpContextType {
	isPopUpOpen: boolean;
	openPopUp: () => void;
	closePopUp: () => void;
}

const PopUpContext = createContext<PopUpContextType | undefined>(undefined);

export const PopUpProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isPopUpOpen, setIsPopUpOpen] = useState(false);

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
