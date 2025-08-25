import { useState, useContext, useEffect } from 'react';
import {
	AddMediaButtons, 
	AddMediaButton,
	MediaForm,
	MediaItem,
	Marquee,
	Loading,
	Board,
} from "components";
import { AuthContext } from 'context';
import assetsService from 'services/assets.service';
import usersService from 'services/users.service';
import styles from './index.module.sass';
import boardStyles from 'components/media/ui/Board/index.module.sass';
import type { AssetProps, Status } from "types";

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const [addMediaIsOpen, setAddMediaIsOpen] = useState(false);
	const [openMediaForm, setOpenMediaForm] = useState(false);
	const [assetType, setAssetType] = useState(null);
	const [allAssets, setAllAssets] = useState([]);
	const [dashboardState, setDashboardState] = useState<Status>({state: "idle"});

	const deleteAsset = (assetId: string) => {
		assetsService
			.delete(assetId)
			.then((res) => {
				setAllAssets((prevAssets) =>
					prevAssets.filter((asset) => asset._id !== assetId)
				);
			})
			.catch((err) => {
				console.error('Error deleting asset', err);
			});
	};

	const editAsset = (assetId: string, editedContent: AssetProps) => {
		assetsService
			.put(assetId, {
				content: editedContent,
			})
			.then((res) => {
				const updatedAsset = res.data;
				setAllAssets((prevAssets) =>
					prevAssets.map((asset: AssetProps) =>
						asset._id === assetId ? updatedAsset : asset
					)
				);
			})
			.catch((err) => {
				console.error("Error updating asset", err);
			});
	};

	const handleAddMediaIsOpen = () => {
		setAddMediaIsOpen(!addMediaIsOpen);
	};

	useEffect(() => {
		const currentDate = new Date().toISOString().slice(0, 10);
		if (user) {
			usersService
				.getCurrentBoard(user._id, currentDate)
				.then((res) => {
					if (res.data.length !== 0) {
						setAllAssets(res.data[0].assets);
						setDashboardState({ state: "idle" });
					}
				})
				.catch((err) => {
					setDashboardState({ state: "error", message: err });
				})
			};
	}, [user]);

	return dashboardState.state === "loading" ? (
		<Loading />
	) : (
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

				{allAssets.length ? (
					<div className={boardStyles.board_content}>
						{allAssets
							.slice()
							.reverse()
							.map((asset: AssetProps) => (
								<MediaItem
									key={asset._id}
									asset={asset}
									editAsset={editAsset}
									deleteAsset={deleteAsset}
									enableEditing={true}
								/>
							))}
					</div>
				) : (
					<div className="message">Create content for today!</div>
				)}
			</section>
		</>
	);
};

export default Dashboard;
