import { useAuth } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loading } from 'components';
import { paths } from 'router/paths';

function IsAnon({ children }) {
	const { isLoggedIn, authStatus } = useAuth();

	if (authStatus.state === "loading") return <Loading />;

	if (isLoggedIn) {
		return <Navigate to={paths.dashboard} />;
	} else {
		return children;
	}
}

export default IsAnon;
