import React, { useRef } from "react";
import { useOnClickOutside } from "hooks/useOnClickOutside";
import styles from "./index.module.sass";
import { XLg } from "react-bootstrap-icons";
import { usePopUp } from "context/PopUpContext";

const PopUp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isPopUpOpen, closePopUp } = usePopUp();
	const popUpRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(popUpRef, closePopUp);

	if (!isPopUpOpen) return null;

	return (
		<div className={styles.popUp_overlay}>
			<div className={styles.popUp_window} ref={popUpRef}>
				<CloseBtn />
				{children}
			</div>
		</div>
	);
};

export default PopUp;

const CloseBtn = () => {
	const { closePopUp } = usePopUp();
	return (
		<button onClick={closePopUp} className={styles.closeBtn}>
			<XLg />
		</button>
	);
};
