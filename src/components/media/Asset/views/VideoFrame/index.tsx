import ReactPlayer from "react-player";
import styles from "./index.module.sass"

const VideoFrame = ({ assetContent }) => {
	return (
		<div className={styles.videoFrame}>
			<ReactPlayer
				url={assetContent || ""}
				width={550}
				height={350}
				controls
			/>
		</div>
	);
};

export default VideoFrame;