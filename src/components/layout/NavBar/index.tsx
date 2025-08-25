import { useContext, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from 'context';
import { LogoFull, LogoSquare } from 'components';
import styles from './index.module.sass';
import placeholder from 'images/placeholder.jpg';
import { BoxArrowRight, EmojiSmile } from 'react-bootstrap-icons';
import { Button } from 'components';
import { useMediaPredicate } from 'react-media-hook';
import type { UserContextProps } from "types";
import { paths } from "router/paths";

function NavBar() {
	const { isLoggedIn, logOutUser, user } = useContext<UserContextProps>(AuthContext);
	const location = useLocation();
	const mobileViewport = useMediaPredicate('(max-width: 578px)');
	const [isSpinning, setIsSpinning] = useState<Boolean>(true);
	const navigate = useNavigate()

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsSpinning(false);
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	const renderLogo = () => {
		let size = '280px';
		if (location.pathname === '/dashboard') size = '210px';

		return (
			<NavLink to={paths.base}>
				{mobileViewport ? (
					<LogoSquare
						color='#B087F4'
						size={60}
					/>
				) : (
					<LogoFull
						color='#B087F4'
						size={size}
					/>
				)}
			</NavLink>
		);
	};

	const renderAuthLinks = () => (
		<div className={styles.topRight}>
			{location.pathname !== paths.login && (
				<Button to={paths.login}>Login</Button>
			)}
			{location.pathname !== paths.signup && (
				<Button to={paths.signup}>Signup</Button>
			)}
			{location.pathname !== paths.about && (
				<Button to={paths.about} className={styles.aboutBtn}>
					<EmojiSmile className={isSpinning ? styles.spin : ""} />
				</Button>
			)}
		</div>
	);

	const renderNavLinks = () => (
		<div className={styles.navbarButtons}>
			{location.pathname === paths.dashboard && (
				<Button to={paths.history}>History</Button>
			)}
			{location.pathname !== paths.dashboard && (
				<Button to={paths.dashboard}>Dashboard</Button>
			)}
			{location.pathname !== paths.about && (
				<Button to={paths.about}>
					<EmojiSmile className={isSpinning ? styles.spin : ""} />
				</Button>
			)}
			{location.pathname === paths.userProfile && (
				<Button onClick={() => {
					logOutUser()
					navigate(paths.base)
				}}>
					{<BoxArrowRight size="20" />}
				</Button>
			)}
		</div>
	);

	return (
		<div>
			<div
				className={
					location.pathname === "/dashboard"
						? styles.centerLogo
						: styles.navbar
				}
			>
				<div>{renderLogo()}</div>
				{isLoggedIn ? renderNavLinks() : renderAuthLinks()}
			</div>
			{isLoggedIn && (
				<div className={styles.navbar_bottom}>
					<div>
						{user.profileImg ? (
							<NavLink to="/profile" className="user-picture">
								<img
									src={user.profileImg}
									onError={(e) => {
										e.target.src = placeholder;
									}}
									alt={user.name}
									className={styles.navbar_userProfile}
								/>
							</NavLink>
						) : (
							<Button to="/profile">{user.name.trim().charAt(0)}</Button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default NavBar;
