import styles from './index.module.sass';
import flower from 'images/flower.svg';
import classNames from 'classnames';

function Loading({ center, size }: { center?: boolean, size?: number }) {
	return (
		<div className={center ? "flex-col flex-1 center-all" : ""}>
			<img
				src={flower}
				alt="Loading..."
				className={classNames(styles.loading_image)}
				style={{width: size, height: size}}
			/>
		</div>
	);
}

export default Loading;
