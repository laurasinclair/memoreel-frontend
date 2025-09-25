import styles from "./index.module.sass"

const Note = ({ assetContent }) => {
	return (
		<div className={styles.text}>
			<div>
				<p>{assetContent || ""}</p>
			</div>
		</div>
	);
};

export default Note;