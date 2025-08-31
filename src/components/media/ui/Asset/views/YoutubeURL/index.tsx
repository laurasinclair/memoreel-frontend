import ReactPlayer from "react-player";
import styles from "./index.module.sass"

const YoutubeURL = ({ assetContent }) => {
	return (
		<div className={styles.youtubeURL}>
			<ReactPlayer
				url={assetContent || ""}
				width={550}
				height={350}
				controls
			/>
		</div>
	);
};

export default YoutubeURL;