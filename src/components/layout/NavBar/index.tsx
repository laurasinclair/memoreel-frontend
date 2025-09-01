import { useContext, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useMediaPredicate } from "react-media-hook";
import { AuthContext } from 'context/AuthContext';
import { Button, LogoFull, LogoSquare } from "components";
import styles from './index.module.sass';
import placeholder from 'images/placeholder.jpg';
import { BoxArrowRight, EmojiSmile } from 'react-bootstrap-icons';
import type { UserContextProps } from "types";
import { paths } from "router/paths";
import classNames from 'classnames';

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
		let size = 280;
		if (location.pathname === paths.dashboard) size = 210;

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
				<NavLink to={paths.login} className="button-primary">
					Login
				</NavLink>
			)}
			{location.pathname !== paths.signup && (
				<NavLink to={paths.signup} className="button-primary">
					Signup
				</NavLink>
			)}
			{location.pathname !== paths.about && (
				<NavLink to={paths.about} className="button-primary">
					<EmojiSmile className={isSpinning ? styles.spin : ""} />
				</NavLink>
			)}
		</div>
	);

	const renderNavLinks = () => (
		<div className={styles.navbarButtons}>
			{location.pathname === paths.dashboard && (
				<NavLink to={paths.history} className="button-primary">
					History
				</NavLink>
			)}
			{location.pathname !== paths.dashboard && (
				<NavLink to={paths.dashboard} className="button-primary">
					Dashboard
				</NavLink>
			)}
			{location.pathname !== paths.about && (
				<NavLink to={paths.about} className="button-primary">
					<EmojiSmile className={isSpinning ? styles.spin : ""} />
				</NavLink>
			)}
			{location.pathname === paths.userProfile && (
				<Button
					onClick={() => {
						logOutUser();
						navigate(paths.base);
					}}
				>
					{<BoxArrowRight size="20" />}
				</Button>
			)}
		</div>
	);

	return (
		<div>
			<div
				className={
					location.pathname === paths.dashboard
						? styles.centerLogo
						: styles.navbar
				}
			>
				<div>{renderLogo()}</div>
				{isLoggedIn ? renderNavLinks() : renderAuthLinks()}
			</div>
			{isLoggedIn && (
				<div className={styles.navbar_bottom}>
					{user.profileImg ? (
						<NavLink
							to={paths.userProfile}
							className={styles.navbar_bottom_userIcon}
						>
							<img
								src={user.profileImg}
								onError={(e) => {
									(e.target as HTMLImageElement).src = placeholder;
								}}
								alt={user.name || "User"}
							/>
						</NavLink>
					) : (
						<NavLink
							to={paths.userProfile}
							className={styles.navbar_bottom_userIcon}
						>
							{user.name.trim().charAt(0)}
						</NavLink>
					)}
				</div>
			)}
		</div>
	);
}

export default NavBar;
