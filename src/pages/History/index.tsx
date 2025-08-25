import { useContext, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";

import { AuthContext } from 'context';
import { Loading, Board, Button } from "components";
import usersService from 'services/users.service';
import { BoardProps, Status } from 'src/types';


function History() {
	const { user } = useContext(AuthContext);
	const [allBoards, setAllboards] = useState([]);
	const [historyStatus, setHistoryStatus] = useState<Status>({ state: "idle" });

	useEffect(() => {
		if (user) {
			setHistoryStatus({ state: "loading" });
			usersService
				.getAllBoards(user._id)
				.then((res) => {
					setAllboards(res.data);
				})
				.catch((error) =>
					setHistoryStatus({
						state: "error",
						message: `Error fetching current board: ${error}`,
					})
				)
				.finally(setHistoryStatus({ state: "idle" }));
		}
	}, [user]);

	return (
		<Container
			fluid
			className="center-all flex-col flex-1"
			style={{ marginBottom: "100px" }}
		>
			{historyStatus.state === "loading" ? (
				<Loading center />
			) : (
				<div className="center-all">
					<p>No board created yet!</p>
					<Button to="/dashboard">Highlight Your Day!</Button>
				</div>
			)}
		</Container>
	);
}

export default History;
