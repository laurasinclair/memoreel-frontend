import { useState, useEffect, useRef, useContext } from 'react';
import uploadService from 'services/file-upload.service';
import type { AssetProps, AssetTypeProps, MediaFormProps, MediaUploadProps, Status } from "types";

import { XLg } from "react-bootstrap-icons";
import { WebcamCapture, AudioCapture, EditButtons, Loading } from 'components';
import styles from './index.module.sass';
import { useOnClickOutside } from 'src/hooks/useOnClickOutside';
import { validateContent } from 'src/utils';
import { useAssets } from 'src/hooks/useAssets';
import { AuthContext } from 'src/context';


function MediaForm({
	mediaUpload,
	setMediaUpload,
	assetId,
	initialContent,
	// saveEdit,
	isEditing,
	setIsEditing,
	// deleteAsset,
}: MediaFormProps) {

	const { user } = useContext(AuthContext);
	const [newAssetContent, setNewAssetContent] =
		useState<string>(initialContent);
	const [mediaFormStatus, setMediaFormStatus] = useState<Status>({
		state: "idle",
	});
	const [touched, setTouched] = useState<boolean>(false);

	const popUpRef = useRef(null);
	useOnClickOutside(popUpRef, () => closePopUp());

	const closePopUp = () => setMediaUpload((prev: MediaUploadProps) => ({...prev, isPopUpOpen: false}))

	useEffect(() => {
		setNewAssetContent(initialContent || "");
	}, [initialContent]);

	const handleUploadFile = async (file) => {
		try {
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

	const { addNewAsset } = useAssets(user._id);

	const handleSave = () => {
		const newAsset: AssetProps = {
			type: mediaUpload.assetType,
			content: newAssetContent,
		};

		try {
			addNewAsset(newAsset);
			setMediaUpload((prev: MediaUploadProps) => ({...prev, isPopUpOpen: false}))
			setIsEditing(false)
		} catch (err) {
			return;
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
