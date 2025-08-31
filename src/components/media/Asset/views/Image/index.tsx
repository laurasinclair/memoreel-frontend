import styles from "./index.module.sass"

const Image = ({ assetContent }) => {
	return (
		<div className={styles.image}>
			<img src={assetContent || ""} alt="Uploaded content" />
		</div>
	);
};

export default Image;