import { Pen } from "react-bootstrap-icons";
import { Button } from "components";

const EditButton = ({ setIsEditing, className, bgcolor }) => {
	return (
		<Button
			className={className}
			onClick={() => {
				setIsEditing((prev: boolean) => !prev);
			}}
			style="primary"
		>
			<Pen size={16} />
		</Button>
	);
};

export default EditButton;