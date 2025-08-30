import { useContext } from 'react';
import {
	AddMediaAllButtons,
	MediaForm,
	Marquee,
	Board,
	Loading,
	EditButtons,
} from "components";
import { useAssets } from "src/hooks/useAssets";
import { AuthContext } from 'context';
import styles from './index.module.sass';
import { Container } from 'react-bootstrap';
import PopUp from "components/layout/PopUp"
import { AssetProvider } from "src/context/AssetContext";
import { PopUpProvider } from "src/context/PopUpContext";

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const { todaysBoard, todaysBoardStatus } = useAssets(user._id);
	
	return (
		<>
			<PopUpProvider>
				<AssetProvider>
					<PopUp>
						<MediaForm />
					</PopUp>

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
				</AssetProvider>
			</PopUpProvider>
		</>
	);
};

export default Dashboard;
