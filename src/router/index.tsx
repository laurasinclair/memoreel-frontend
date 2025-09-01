import { createBrowserRouter } from "react-router-dom";
import {
	About,
	Dashboard,
	History,
	LandingPage,
	Login,
	NotFound,
	Signup,
	UserProfilePage,
} from "pages";
import { paths } from "router/paths";
import { IsPrivate } from "components";
import App from "../App";

const Router = createBrowserRouter(
	[
		{
			element: <App />,
			path: paths.base,
			children: [
				{
					index: true,
					element: <LandingPage />,
				},
				{
					path: paths.auth,
					children: [
						{
							path: paths.login,
							element: (
								<Login />
							),
						},
						{
							path: paths.signup,
							element: (
								<Signup />
							),
						},
					],
				},
				{
					path: paths.about,
					element: <About />,
				},
				{
					path: paths.userProfile,
					element: (
						<IsPrivate>
							<UserProfilePage />
						</IsPrivate>
					),
				},
				{
					path: paths.dashboard,
					children: [
						{
							index: true,
							element: (
								<IsPrivate>
									<Dashboard />
								</IsPrivate>
							),
						},
						{
							path: paths.history,
							element: (
								<IsPrivate>
									<History />
								</IsPrivate>
							),
						},
					],
				},
				{
					path: "*",
					element: <NotFound />,
				},
			],
		},
	],
	{ basename: "/projects/memoreel" }
);

export default Router;

