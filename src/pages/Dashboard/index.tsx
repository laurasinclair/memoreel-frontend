import { useContext } from 'react';
import {
	MediaMenu,
	Marquee,
	Board,
	AssetEditor,
} from "components";
import { useAssets } from "hooks/useAssets";
import { authContext } from "context/AuthContext";
import styles from './index.module.sass';
import { Container } from 'react-bootstrap';
import PopUp from "components/layout/PopUp"
import { AssetProvider } from "context/AssetContext";
import { PopUpProvider } from "context/PopUpContext";

const Dashboard = () => {
	const { user, isLoggedIn } = authContext();
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
