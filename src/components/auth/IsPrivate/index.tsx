import { useContext } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from 'context';
import { Loading } from 'components';
import { paths } from 'router/paths';
import type { ChildrenProps, UserContextProps } from "types";

function IsPrivate({ children }: ChildrenProps) {
	const { isLoggedIn, authStatus } = useContext<UserContextProps>(AuthContext);
	const navigate = useNavigate();

	if (authStatus.state === "loading") return <Loading />;
	return !isLoggedIn ? <Navigate to={paths.login} /> : children;
}

export default IsPrivate;
