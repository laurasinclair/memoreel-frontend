import styles from "./index.module.sass"

const ImageFrame = ({ assetContent }) => {
	return (
		<div className={styles.imageFrame}>
			<img src={assetContent || ""} alt="Uploaded content" />
		</div>
	);
};

export default ImageFrame;