import { useAuth } from "context/AuthContext";
import { Navigate } from "react-router-dom";
import { Loading } from "components";
import { paths } from "router/paths";
import type { ChildrenProps } from "types";

function IsPrivate({ children }: ChildrenProps) {
	const { isLoggedIn, authStatus } = useAuth();

	if (!isLoggedIn) return <Navigate to={paths.login} />;
	if (authStatus.state === "loading") return <Loading />;
	if (authStatus.state === "success") return children;
}

export default IsPrivate;
