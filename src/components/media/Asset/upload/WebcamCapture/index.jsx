import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera } from 'react-bootstrap-icons';

import { Polaroid } from "src/components/media/Asset/views";
import styles from './index.module.sass';
import logger from 'logger';
import Button from 'src/components/elements/Button';
import { assetContext } from 'src/context/AssetContext';
import { base64ToBlob, createEvent } from "src/utils";

function WebcamCapture() {
	const camRef = useRef();
	const [previewURL, setPreviewURL] = useState(undefined);
	const [photoTaken, setPhotoTaken] = useState(false);
	const { onChange } = assetContext();

	const takeSelfiePreview = () => {
		setPreviewURL(undefined);
		setPhotoTaken(false);

		const base64Image = camRef.current.getScreenshot();
		try {
			setPreviewURL(base64Image);
			setPhotoTaken(true);

			const blobImage = base64ToBlob(base64Image);
			const event = createEvent(blobImage)
			onChange(event);
			return;
		} catch (err) {
			logger.error(err);
		}
	};

	return (
		<div className={styles.photoContainer}>
			{photoTaken ? (
				<Polaroid>
					<img src={previewURL} alt="What a great selfie!" />
				</Polaroid>
			) : (
				<Polaroid>
					<Webcam
						ref={camRef}
						videoConstraints={{
							width: 400,
							height: 400,
							facingMode: "user",
							aspectRatio: 1 / 1,
						}}
						screenshotFormat="image/jpeg"
					/>
				</Polaroid>
			)}

				<Button 
					onClick={takeSelfiePreview}
					// disabled={loading}
				>
					<Camera size="30" className="me-2" />
					{photoTaken ? "Retake" : "Snap!"}
				</Button>
		</div>
	);
}

export default WebcamCapture;
