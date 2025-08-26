import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import './styles/index.sass';
import { AuthProviderWrapper } from 'context';

window.name = 'MemoReel';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router basename='/projects/memoreel'>
		<AuthProviderWrapper>
			<App />
		</AuthProviderWrapper>
	</Router>
);
