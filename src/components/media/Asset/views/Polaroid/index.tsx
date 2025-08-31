import styles from "./index.module.sass"

const Polaroid = ({ children, assetContent }) => {
	return children ? (
		<div className={styles.mediaItem_polaroid}>{children}</div>
	) : (
		<div className={styles.mediaItem_polaroid}>
			<img
				src={assetContent || ""}
				alt="Uploaded content"
				style={{ width: "400px" }}
			/>
		</div>
	);
};

export default Polaroid;