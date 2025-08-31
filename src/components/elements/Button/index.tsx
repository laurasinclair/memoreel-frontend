import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ButtonProps } from 'src/types';
import Loading from 'src/components/state/Loading';

export default function Button({
	children,
	to,
	variant = "primary",
	outline,
	className,
	fullWidth,
	iconRight,
	iconLeft,
	disabled,
	onClick,
	loading = false,
	...rest
}: ButtonProps) {
	const buttonClasses = classNames(
		className,
		"button",
		`button-${variant}${outline ? "-outline" : ""}`,
		{
			"button-loading": loading,
			"full-width": fullWidth,
			"icon-left": iconLeft,
			"icon-right": iconRight,
		}
	);

	return to ? (
		<Link to={to} className={buttonClasses} onClick={onClick} {...rest}>
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
			{...rest}
		>
			{iconLeft && <span>{iconLeft}</span>}
			{loading ? <Loading /> : children}
			{iconRight && <span>{iconRight}</span>}
		</button>
	);
}
