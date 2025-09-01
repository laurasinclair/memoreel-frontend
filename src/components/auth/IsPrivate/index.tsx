import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { AuthContext } from 'context/AuthContext';
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
