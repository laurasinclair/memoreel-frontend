import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import Router from "router";
import './styles/index.sass';
import React from 'react';
import { AuthProvider } from "context/AuthContext";

window.name = 'MemoReel';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={Router} />
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
