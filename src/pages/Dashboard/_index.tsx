import { useState, useContext, useEffect } from 'react';
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
import PopUp, { isPopUpOpen } from "components/layout/PopUp"

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	// const [mediaUpload, setMediaUpload] = useState<MediaUploadProps>({
	// 	isPopUpOpen: false,
	// 	assetType: null,
	// });

	const { newAssetContent, todaysBoard, todaysBoardStatus } = useAssets(user._id);



	// useEffect(() => {
	// 	console.log("3. newAssetContent", newAssetContent);
	// }, [newAssetContent]);


	return (
		<>
			<MediaForm newAssetContent={newAssetContent} />

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
						<AddMediaAllButtons />
					</div>
					{todaysBoardStatus === "pending" ? (
						<Loading center />
					) : todaysBoard && todaysBoard?.assets?.length ? (
						<Board
							boardContent={todaysBoard}
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
