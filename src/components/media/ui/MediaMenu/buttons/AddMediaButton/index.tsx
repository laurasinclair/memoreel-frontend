import classNames from "classnames";
import type { AddMediaButtonProps } from "types";
import styles from "../index.module.sass";
import { PlusLg } from "react-bootstrap-icons";

export default function AddMediaButton({
	toggleMenu,
	isMenuOpen,
}: AddMediaButtonProps) {
	return (
		<button
			onClick={toggleMenu}
			className={classNames(styles.addMediaButton_main, {
				[styles.addMediaButton_main_menuIsOpen]: isMenuOpen,
			})}
		>
			<PlusLg size="20" className="mx-1" />
			<span className="mx-1">Add Media</span>
		</button>
	);
}
