import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { useAuth } from 'context/AuthContext';
import { Button } from 'components';
import { paths } from 'src/router/paths';

function InfoMessage() {
	const navigate = useNavigate();
	const { logOutUser } = useAuth();

	return (
		<Container fluid>
			<Row>
				<Col
					md={8}
					lg={7}
					xl={6}
					className='infoMessage mx-auto mt-4'>
					<p className='mb-3'>
						Your profile has been successfully updated. <br />
						To see the latest changes, please login again.
					</p>
					<div>
						<Button
							onClick={() => {
								logOutUser();
								navigate(paths.login);
							}}>
							Login
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default InfoMessage;
