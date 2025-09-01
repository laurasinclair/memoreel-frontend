import { Navigate } from "react-router-dom";
import { authContext } from 'context/AuthContext';
import { Loading } from 'components';
import { useUser } from "hooks/useUser";
import { paths } from 'router/paths';
import type { ChildrenProps } from "types";

function IsPrivate({ children }: ChildrenProps) {
	const { isLoggedIn } = authContext();
	const { userStatus } = useUser();

	if (!isLoggedIn) return <Navigate to={paths.login} />;
	if (userStatus === "pending") return <Loading />;
	if (userStatus === "success") return children;
}

export default IsPrivate;
