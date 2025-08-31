import { useContext } from 'react';
import {
	MediaMenu,
	Marquee,
	Board,
	Loading,
	AssetEditor,
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
	const { todaysBoard, todaysBoardStatus } = useAssets();
	
	return (
		<>
			<PopUpProvider>
				<AssetProvider>
					<PopUp>
						<AssetEditor />
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
								<MediaMenu />
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
