import React from 'react';
import styles from './index.module.sass';
import brandmark from 'images/brandmark.svg';
import classNames from 'classnames';

function Loading() {
	return (
		<div className={styles.loading}>
			<img
				src={brandmark}
				alt='Loading...'
				className={classNames(styles.loading_image, 'mb-3')}
			/>
		</div>
	);
}

export default Loading;
