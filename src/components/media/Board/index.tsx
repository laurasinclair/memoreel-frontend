import { Loading, Asset } from 'components';
import type { AssetProps, BoardProps } from "types";
import styles from './index.module.sass';
import { formatDate, isToday } from 'src/utils';

function Board({
	boardContent,
	status = "pending",
	...rest
}: BoardProps) {
	return (
		<div className={styles.board} {...rest}>
			<p className={styles.board_date}>
				{isToday(boardContent.createdAt)
					? "Today"
					: formatDate(boardContent.createdAt)}
			</p>

			{status === "pending" ? (
				<Loading />
			) : (
				<div className={styles.board_content}>
					{boardContent &&
						boardContent.assets.map((asset: AssetProps) => {
							return (
								<div key={asset?._id}>
									<Asset asset={asset} />
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
}

export default Board;
