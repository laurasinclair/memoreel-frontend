import { Loading, MediaItem } from 'components';
import type { AssetProps, BoardProps } from "types";
import styles from './index.module.sass';
import { formatDate } from 'src/utils';

function Board({
	boardContent,
	isToday,
	mediaUpload,
	isLoading,
	editAsset,
	deleteAsset,
	enableEditing,
	...rest
}: BoardProps) {
	return (
		<div className={styles.board} {...rest}>
			<p className={styles.board_date}>
				{isToday ? "Today" : formatDate(boardContent.createdAt)}
			</p>

			{isLoading === "loading" ? (
				<Loading />
			) : (
				<div className={styles.board_content}>
					{boardContent && boardContent.assets
						.slice()
						.reverse()
						.map((asset: AssetProps) => (
							<div key={asset?._id}>
								<MediaItem
									mediaUpload={mediaUpload}
									asset={asset}
									editAsset={editAsset}
									enableEditing={enableEditing}
									deleteAsset={deleteAsset}
								/>
							</div>
						))}
				</div>
			)}
		</div>
	);
}

export default Board;
