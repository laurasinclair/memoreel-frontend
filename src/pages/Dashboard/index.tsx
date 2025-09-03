import {
	MediaMenu,
	Marquee,
	Board,
	AssetEditor,
} from "components";
import { useAssets } from "src/hooks/useAssets";
import { useAuth } from "context/AuthContext";
import styles from './index.module.sass';
import { Container } from 'react-bootstrap';
import PopUp from "components/layout/PopUp"
import { AssetProvider } from "src/context/AssetContext";
import { PopUpProvider } from "src/context/PopUpContext";

const Dashboard = () => {
	const { user } = useAuth();
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
									? `What's on your mind, ${user.displayName || user.name} ?`
									: "What's on your mind?",
								"What made you laugh today?",
							]}
						/>
						<Container fluid className="flex-col flex-1">
							<div className={styles.dashboard_addMedia}>
								<MediaMenu />
							</div>
							{todaysBoard && todaysBoard.assets.length ? (
								<Board
									boardContent={todaysBoard}
									status={todaysBoardStatus}
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
