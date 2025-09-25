import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "context/AuthContext";
import authService from 'services/auth.service';
import loginStyles from './index.module.sass';
import { paths } from 'router/paths';
import logger from 'src/utils/logger';
import { Loading } from 'src/components';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(undefined);
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const { storeToken, authenticateUser } = useAuth();

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		const req = { email, password };

		if (!email || !password) {
			setErrorMessage("❌ Please add email & password");
			setLoading(false);
			return;
		};

		authService
			.login(req)
			.then((response) => {
				storeToken(response.data.authToken);
				authenticateUser();
				navigate(paths.dashboard);
			})
			.catch((err) => {
				logger.error(err);
				const errorDescription = err.response
					? err.response.data.message
					: err.message;
				setErrorMessage("❌ " + errorDescription);
			})
			.finally(() => setLoading(false));
	};

	return (
		<Container>
			<Row>
				<Col>
					<div className={loginStyles.login}>
						<form onSubmit={handleLoginSubmit}>
							<fieldset>
								<label htmlFor="email" className="">
									E-mail
								</label>
								<input
									type="text"
									name="email"
									id="email"
									value={email}
									onChange={handleEmail}
									className=""
									autoComplete="off"
								/>
							</fieldset>

							<fieldset>
								<label htmlFor="password" className="">
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									value={password}
									onChange={handlePassword}
									className=""
									autoComplete="off"
								/>
							</fieldset>

							{errorMessage && (
								<p className="error-message">{errorMessage}</p>
							)}

							<button type="submit" className="button-primary">
								{loading ? <Loading size={20} /> : "Login"}
							</button>
						</form>

						<p>
							Don&apos;t have an account yet?{" "}
							<Link to={paths.signup} className="underline">
								Sign up
							</Link>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
