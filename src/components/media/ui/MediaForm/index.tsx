import { useState, useEffect, useRef } from 'react';
import uploadService from 'services/file-upload.service';
import assetsService from 'services/assets.service';
import boardsService from 'services/boards.service';
import usersService from 'services/users.service';
import type { AssetProps, AssetTypeProps, MediaFormProps, MediaUploadProps, SetMediaUploadProps, Status } from "types";

import { XLg } from "react-bootstrap-icons";
import { WebcamCapture, AudioCapture, EditButtons, Loading } from 'components';
import styles from './index.module.sass';
import { useOnClickOutside } from 'src/hooks/useOnClickOutside';
import { validateContent } from 'src/utils';

function MediaForm({
	mediaUpload,
	setMediaUpload,
	assetId,
	initialContent,
	saveEdit,
	isEditing,
	setIsEditing,
	// deleteAsset,
	// setAllAssets,
	// setIsAddMediaOpen,
	userId,
}: MediaFormProps) {
	const [newAssetContent, setNewAssetContent] =
		useState<AssetProps>(initialContent);
	const [mediaFormStatus, setMediaFormStatus] = useState<Status>({
		state: "idle",
	});
	const [touched, setTouched] = useState<boolean>(false);
	const [currentBoardId, setCurrentBoardId] = useState<string | null>(null);

	const popUpRef = useRef(null);
	useOnClickOutside(popUpRef, () => closePopUp());

	const closePopUp = () => setMediaUpload((prev: MediaUploadProps) => ({...prev, isPopUpOpen: false}))

	useEffect(() => {
		setNewAssetContent(initialContent || "");
	}, [initialContent]);

	useEffect(() => {
		const fetchCurrentBoard = async () => {
			const currentDate = new Date().toISOString().slice(0, 10);
			if (userId) {
				try {
					const res = await usersService.getCurrentBoard(
						userId,
						currentDate
					);
					if (!res.data.length) throw new Error("No current board found");
					setCurrentBoardId(res.data[0]._id);
				} catch (error) {
					setCurrentBoardId(null);
					setMediaFormStatus({
						state: "error",
						message: `Error fetching current board: ${error}`,
					});
				} finally {
					setMediaFormStatus({ state: "idle" });
				}
			}
		};
		fetchCurrentBoard();
	}, [userId]);

	const handleUploadFile = async (file) => {
		try {
			// setMediaFormStatus({ state: "loading" });
			const fileUrl = await uploadService.uploadFile(file);
			setNewAssetContent(fileUrl);
			return fileUrl;
		} catch (error) {
			setMediaFormStatus({
				state: "error",
				message: `Error uploading file: ${error}`,
			});
		} finally {
			setMediaFormStatus({ state: "idle" });
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			handleUploadFile(file);
		}
	};

	const handleSave = () => {
		saveEdit ? saveEdit(newAssetContent) : addNewAsset();
		isEditing
			? setIsEditing(false)
			: setMediaUpload((prev: MediaUploadProps) => ({ ...prev, isPopUpOpen: false }));;
	};

	const addNewAsset = async () => {
		try {
			let boardId = currentBoardId;

			if (!boardId) {
				const boardResp = await boardsService.post({ userId });
				boardId = boardResp.data._id;
				setCurrentBoardId(boardId);
			}

			const newAsset: AssetProps = {
				type: mediaUpload.assetType,
				content: newAssetContent,
				userId: userId,
				boardId: boardId,
			};

			const response = await assetsService.post(newAsset);
			const createdAsset = response.data;
			setAllAssets((prevAssets: AssetProps[]) => [
				...prevAssets,
				createdAsset,
			]);
			setNewAssetContent("");
			setMediaUpload((prev: MediaUploadProps) => ({...prev, isPopUpOpen: false}));
		} catch (error) {
			console.error("Error adding asset:", error);
		}
	};

	const renderForm = (assetType: AssetTypeProps) => {
		switch (assetType) {
			case "text":
				return (
					<textarea
						placeholder="What's on your mind today?"
						onChange={(e) => {
							setNewAssetContent(e.target.value);
							setTouched(true);
						}}
						value={newAssetContent}
						className={styles.mediaForm_input}
					/>
				);
			case "image":
				return (
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className={styles.mediaForm_input}
					/>
				);
			case "youtubeURL":
				return (
					<input
						type="text"
						onChange={(e) => {
							setNewAssetContent(e.target.value);
							setTouched(true);
						}}
						value={newAssetContent}
						placeholder="Paste Youtube URL here"
						className={styles.mediaForm_input}
					/>
				);
			case "camImage":
				return (
					<WebcamCapture
						handleUploadFile={handleUploadFile}
						loading={mediaFormStatus}
						setLoading={setMediaFormStatus}
					/>
				);
			case "audio":
				return (
					<AudioCapture
						handleUploadFile={handleUploadFile}
						setLoading={setMediaFormStatus}
					/>
				);
		}
	};

	const editButtons = () => {
		return (
			<EditButtons
				handleSave={handleSave}
				validateContent={validateContent}
				newAssetContent={newAssetContent}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				// deleteAsset={deleteAsset}
				touched={touched}
				assetType={mediaUpload.assetType}
				assetId={assetId}
				setMediaUpload={setMediaUpload}
			/>
		);
	};

	return (
		<div className={styles.mediaForm_overlay}>
			<div className={styles.mediaForm_popUp} ref={popUpRef}>
				<CloseBtn closePopUp={closePopUp} />

				{renderForm(mediaUpload.assetType)}

				{mediaFormStatus.state === "loading" ? (
					<Loading size={30} style={{ marginTop: "20px" }} />
				) : (
					editButtons()
				)}
			</div>
		</div>
	);
}

export const CloseBtn = ({ closePopUp }) => {
	return (
		<button
			onClick={closePopUp}
			className={styles.closeBtn}
		>
			<XLg />
		</button>
	);
};

export default MediaForm;
