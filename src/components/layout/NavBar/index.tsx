import { useContext, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from 'context';
import { LogoFull, LogoSquare } from 'components';
import styles from './index.module.sass';
import placeholder from 'images/placeholder.jpg';
import { BoxArrowRight, EmojiSmile } from 'react-bootstrap-icons';
import { Button } from 'components';
import { useMediaPredicate } from 'react-media-hook';

function NavBar() {
	const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
	const location = useLocation();
	const mobileViewport = useMediaPredicate('(max-width: 578px)');
	const [isSpinning, setIsSpinning] = useState<Boolean>(true);

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
			<NavLink to='/'>
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
			{location.pathname !== "/login" && <Button to="/login">Login</Button>}
			{location.pathname !== "/signup" && (
				<Button to="/signup">Signup</Button>
			)}
			{location.pathname !== "/about" && (
				<Button to="/about" className={styles.aboutBtn}>
					<EmojiSmile className={isSpinning ? styles.spin : ""} />
				</Button>
			)}
		</div>
	);

	const renderNavLinks = () => (
		<div className={styles.navbarButtons}>
			{location.pathname === "/dashboard" && (
				<Button to="/dashboard/history">History</Button>
			)}
			{location.pathname !== "/dashboard" && (
				<Button to="/dashboard">Dashboard</Button>
			)}
			{location.pathname !== "/about" && (
				<Button to="/about">
					<EmojiSmile className={isSpinning ? styles.spin : ""} />
				</Button>
			)}
			{location.pathname === "/profile" && (
				<Button to="/" onClick={logOutUser}>
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
