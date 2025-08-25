import { useState, useContext } from 'react';
import {
	AddMediaButtons, 
	AddMediaButton,
	MediaForm,
	Marquee,
	Board,
	Loading,
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
		<>
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
				<Container fluid className="flex-col center-all flex-1">
					<div className={styles.dashboard_addMedia}>
						{addMediaIsOpen && (
							<AddMediaButtons
								assetType={assetType}
								setAssetType={setAssetType}
								setOpenMediaForm={setOpenMediaForm}
								openMediaForm={openMediaForm}
							/>
						)}
						<AddMediaButton
							onClick={() => {
								handleAddMediaIsOpen();
								setOpenMediaForm((prev) => (prev ? false : false));
							}}
							addMediaIsOpen={addMediaIsOpen}
						/>
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
					) : status.state === "loading" ? (
						<Loading center />
					) : (
						<div className="message">Create content for today!</div>
					)}
				</Container>
			</section>
		</>
	);
};

export default Dashboard;
