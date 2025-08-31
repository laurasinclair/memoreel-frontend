import { useState } from "react";
import { AddMediaButton, MediaTypeButton } from "./buttons";

export default function MediaMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	return (
		<>
			{isMenuOpen && <MediaTypeButton />}
			<AddMediaButton toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
		</>
	);
}