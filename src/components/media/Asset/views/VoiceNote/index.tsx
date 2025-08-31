import styles from "./index.module.sass"

const VoiceNote = ({ children, assetContent }) => {
	return children ? (
		<div className={styles.voiceNote}>{children}</div>
	) : (
		<div className={styles.voiceNote}>
			<p>
				voice <br /> note
			</p>
			<audio controls src={assetContent} />
		</div>
	);
};

export default VoiceNote;