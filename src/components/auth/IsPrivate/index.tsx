import { useContext } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from 'context';
import { Loading } from 'components';
import { paths } from 'router/paths';
import type { ChildrenProps, UserContextProps } from "types";

function IsPrivate({ children }: ChildrenProps) {
	const { isLoggedIn, authStatus } = useContext<UserContextProps>(AuthContext);

	if (!isLoggedIn) return <Navigate to={paths.login} />;
	if (authStatus.state === "loading") return <Loading />;
	if (authStatus.state === "success") return children;
}

export default IsPrivate;
