import { useContext, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";

import { AuthContext } from 'context';
import { Loading, Board, Button } from "components";
import usersService from 'services/users.service';
import { BoardContentProps, BoardProps, Status } from 'src/types';
import { useAssets } from 'src/hooks/useAssets';


function History() {
	const { user } = useContext(AuthContext);
	const { allBoards, allBoardsStatus } = useAssets(user._id);

	return (
		<Container
			fluid
			className="flex-col flex-1 center-all"
			style={{ marginBottom: "100px" }}
		>
			{allBoardsStatus === "pending" ? (
				<Loading center />
			) : (
				allBoardsStatus === "success" &&
				allBoards &&
				(allBoards.length === 0 ? (
					<div>
						<p>No board created yet!</p>
						<Button to="/dashboard">Highlight Your Day!</Button>
					</div>
				) : (
					allBoards &&
					allBoards
						.reverse()
						.map((board: BoardContentProps) => {
							return (
								board.assets.length !== 0 && (
									<Board key={board._id} boardContent={board} />
								)
							);
						})
				))
			)}
		</Container>
	);
}

export default History;
