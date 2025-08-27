import { useState, useContext } from 'react';
import {
	AddMediaAllButtons,
	MediaForm,
	Marquee,
	Board,
	Loading,
} from "components";
import { useAssets } from "src/hooks/useAssets";
import { AuthContext } from 'context';
import styles from './index.module.sass';
import { Container } from 'react-bootstrap';
import { MediaUploadProps } from 'src/types';

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const [mediaUpload, setMediaUpload] = useState<MediaUploadProps>({
		isPopUpOpen: false,
		assetType: null,
	});

	const handleAddMediaIsOpen = () => setMediaUpload((prev) => ({...prev, isPopUpOpen: true}));

	const { todaysBoard, todaysBoardStatus } = useAssets(user._id);
	return (
		<>
			{mediaUpload.isPopUpOpen && (
				<MediaForm
					mediaUpload={mediaUpload}
					// deleteAsset={deleteAsset}
					setMediaUpload={setMediaUpload}
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
				<Container fluid className="flex-col flex-1">
					<div className={styles.dashboard_addMedia}>
						<AddMediaAllButtons
							mediaUpload={mediaUpload}
							setMediaUpload={setMediaUpload}
						/>
					</div>
					{todaysBoardStatus === "pending" ? (
						<Loading center />
					) : (todaysBoard && todaysBoard?.assets?.length) ? (
						<Board
							boardContent={todaysBoard}
							mediaUpload={mediaUpload}
							enableEditing
							isToday
							isLoading={todaysBoardStatus}
						/>
					) : (
						<div className="message">Create content for today!</div>
					)}
				</Container>
			</section>
		</>
	);
};

export default Dashboard;
