import { Link } from 'react-router-dom';
import styles from './index.module.sass';
import classNames from 'classnames';
import { ButtonProps } from 'src/types';
import Loading from 'src/components/state/Loading';

export default function Button({
	children,
	to,
	style = "primary",
	outline,
	className,
	fullWidth,
	iconRight,
	iconLeft,
	disabled,
	onClick,
	loading = false,
}: ButtonProps) {
	const buttonClasses = classNames(
		className,
		styles["button"],
		styles[`button-${style}${outline ? "-outline" : ""}`],
		{
			[styles["button-loading"]]: loading,
			[styles["full-width"]]: fullWidth,
			[styles["icon-left"]]: iconLeft,
			[styles["icon-right"]]: iconRight,
		}
	);

	return to ? (
		<Link to={to} className={buttonClasses} onClick={onClick}>
			{iconLeft && (
				<span className="button-icon button-icon-left">{iconLeft}</span>
			)}
			{loading ? <Loading /> : children}
			{iconRight && (
				<span className="button-icon button-icon-right">{iconRight}</span>
			)}
		</Link>
	) : (
		<button
			className={buttonClasses}
			onClick={onClick}
			{...(disabled && { disabled })}
		>
			{iconLeft && <span>{iconLeft}</span>}
			{loading ? <Loading /> : children}
			{iconRight && <span>{iconRight}</span>}
		</button>
	);
}
