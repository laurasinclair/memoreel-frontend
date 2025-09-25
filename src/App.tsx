import { NavBar} from 'components';
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<NavBar />
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default App;
