import styles from './index.module.sass';
import flower from 'images/flower.svg';
import classNames from 'classnames';

function Loading() {
	return (
		<div>
			<img
				src={flower}
				alt="Loading..."
				className={classNames(styles.loading_image)}
			/>
		</div>
	);
}

export default Loading;
