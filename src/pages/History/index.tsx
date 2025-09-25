import { Container } from "react-bootstrap";
import { Board, Button, AssetEditor } from "components";
import { BoardContentProps } from 'src/types';
import { useAssets } from 'src/hooks/useAssets';
import { PopUpProvider } from "src/context/PopUpContext";
import { AssetProvider } from "src/context/AssetContext";
import PopUp from "src/components/layout/PopUp";

function History() {
	const { allBoards, allBoardsStatus } = useAssets();

	return (
		<PopUpProvider>
			<AssetProvider>
				<PopUp>
					<AssetEditor />
				</PopUp>
				<Container
					className="flex-col flex-1 center-all ms-3"
					style={{ marginBottom: "100px" }}
					fluid
				>
					{allBoards && allBoards.length === 0 ? (
						<div>
							<p>No board created yet!</p>
							<Button to="/dashboard">Highlight Your Day!</Button>
						</div>
					) : (
						allBoards &&
						allBoards.map((board: BoardContentProps) => {
							return (
								board.assets.length && (
									<Board
										key={board._id}
										boardContent={board}
										status={allBoardsStatus}
									/>
								)
							);
						})
					)}
				</Container>
			</AssetProvider>
		</PopUpProvider>
	);
}

export default History;
