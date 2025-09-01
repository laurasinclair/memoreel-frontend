import { Trash } from "react-bootstrap-icons";
import { Button } from "components";

const DeleteButton = () => {
    // const [confirmation, setConfirmation] = useState(false)
    // const handleClick = () => {
    //     setConfirmation(true);
    // }
    return (
			<Button
				// onClick={() =>
				//     assetId ? deleteAsset(assetId) : setOpenMediaForm(false)
				// }
				variant="primary"
			>
				<Trash />
				{/* {!confirmation ? <Trash onClick={handleClick} /> : "Are you sure?"} */}
			</Button>
		);
};

export default DeleteButton;