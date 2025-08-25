import styles from './index.module.sass';
import flower from 'images/flower.svg';
import classNames from 'classnames';

function Loading() {
	return (
		<div className={styles.loading}>
			<img
				src={flower}
				alt="Loading..."
				className={classNames(styles.loading_image, "mb-3")}
			/>
		</div>
	);
}

export default Loading;
