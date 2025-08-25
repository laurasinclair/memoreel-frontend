import { useContext, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";

import { AuthContext } from 'context';
import { Loading, Board, Button } from "components";
import usersService from 'services/users.service';
import styles from './index.module.sass';


function History() {
	const { user } = useContext(AuthContext);
	const [allBoards, setAllboards] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (user) {
			usersService
				.getAllBoards(user._id)
				.then((res) => {
					setAllboards(res.data);
					setLoading(false);
				})
				.catch((error) => console.log('Error fetching boards' + error));
		}
	}, [user]);

	return (
		<Container className={styles.history}>
			{loading ? (
				<Loading />
			) : (
				allBoards &&
				(allBoards.length === 0 ? (
					<div>
						No board created yet!
						<Button to="/dashboard">Highlight Your Day!</Button>
					</div>
				) : (
					allBoards
						.slice()
						.reverse()
						.map((board) => {
							return (
								board.assets.length !== 0 && (
									<Board key={board._id} board={board} />
								)
							);
						})
				))
			)}
		</Container>
	);
}

export default History;
