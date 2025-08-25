import { useState, useContext } from 'react';
import {
	AddMediaButtons, 
	AddMediaButton,
	MediaForm,
	Marquee,
	Board,
} from "components";
import { useAssets } from "src/hooks/useAssets";
import { AuthContext } from 'context';
import styles from './index.module.sass';
import { Container } from 'react-bootstrap';

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const [addMediaIsOpen, setAddMediaIsOpen] = useState(false);
	const [openMediaForm, setOpenMediaForm] = useState(false);
	const [assetType, setAssetType] = useState(null);

	const {
		status,
		deleteAsset,
		setAllAssets,
		editAsset,
		todaysBoard,
	} = useAssets(user?._id);

	const handleAddMediaIsOpen = () => {
		setAddMediaIsOpen(!addMediaIsOpen);
	};

	return (
		<Container fluid>
			{openMediaForm && (
				<MediaForm
					assetType={assetType}
					setAddMediaIsOpen={setAddMediaIsOpen}
					setOpenMediaForm={setOpenMediaForm}
					setAllAssets={setAllAssets}
					deleteAsset={deleteAsset}
					userId={user._id}
				/>
			)}

			<section className={styles.dashboard}>
				<Marquee
					phrases={[
						"For days worth remembering",
						user
							? `What's on your mind, ${user.name} ?`
							: "What's on your mind?",
						"What made you laugh today?",
					]}
				/>
				<div className={styles.dashboard_addMedia}>
					<AddMediaButton
						onClick={() => {
							handleAddMediaIsOpen();
							setOpenMediaForm((prev) => (prev ? false : false));
						}}
						addMediaIsOpen={addMediaIsOpen}
					/>

					{addMediaIsOpen && (
						<AddMediaButtons
							assetType={assetType}
							setAssetType={setAssetType}
							setOpenMediaForm={setOpenMediaForm}
							openMediaForm={openMediaForm}
						/>
					)}
				</div>
				{status.state === "success" && todaysBoard.assets.length ? (
					<Board
						board={todaysBoard}
						editAsset={editAsset}
						deleteAsset={deleteAsset}
						enableEditing
						isToday
						isLoading={status.state}
					/>
				) : (
					<div className="message">Create content for today!</div>
				)}
			</section>
		</Container>
	);
};

export default Dashboard;
