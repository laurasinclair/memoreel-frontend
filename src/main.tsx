import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import Router from "router";
import './styles/index.sass';
import React from 'react';
import { AuthProviderWrapper } from './context';

window.name = 'MemoReel';

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProviderWrapper>
			<RouterProvider router={Router} />
		</AuthProviderWrapper>
	</React.StrictMode>
);
