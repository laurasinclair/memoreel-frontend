import { NavBar} from 'components';
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<NavBar />
			<Outlet />
		</div>
	);
}

export default App;
