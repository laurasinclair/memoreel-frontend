import React, { useState, useEffect } from "react";
import authService from "services/auth.service";
import usersService from "services/users.service.ts";
import boardsService from "services/boards.service.ts";
import assetsService from "services/assets.service.ts";
import type { Status, ChildrenProps, User } from "types";

const AuthContext = React.createContext(undefined);

function AuthProviderWrapper({ children }: ChildrenProps) {
	const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
	const [user, setUser] = useState<User | null>(null);
	const [authStatus, setAuthStatus] = useState<Status>({ state: "idle" });

	const storeToken = (token) => {
		localStorage.setItem("authToken", token);
	};

	const authenticateUser = () => {
		setAuthStatus({ state: "loading" });
		const storedToken = localStorage.getItem("authToken");

		if (storedToken) {
			authService
				.verify()
				.then((res) => {
					setIsLoggedIn(true);
					setUser(res.data);
				})
				.then((res) => {
					setAuthStatus({ state: "success" });
				})
				.catch((err) => {
					setAuthStatus({
						state: "error",
						message: err.response.data.message,
					});
					removeToken();
					setIsLoggedIn(false);
					setUser(null);
					return;
				});
		}
	};

	const removeToken = () => {
		localStorage.removeItem("authToken");
	};

	const logOutUser = () => {
		removeToken();
		setIsLoggedIn(false);
		setUser(null);
	};

	const handleDeleteAccount = async () => {
		try {
			const userResponse = await usersService.get(user._id);
			const boards = userResponse.data.boards;

			for (const boardId of boards) {
				const boardResponse = await boardsService.get(boardId);
				const assets = boardResponse.data.assets;

				for (const assetId of assets) {
					await assetsService.delete(assetId);
				}
				await boardsService.delete(boardId);
			}
			const deleteResponse = await usersService.delete(user._id);

			if (deleteResponse.status === 200) {
				removeToken();
				setIsLoggedIn(false);
				setAuthStatus({ state: "idle" });
				setUser(null);
			}
		} catch (err) {
			setAuthStatus({
				state: "error",
				message: `Error deleting account: ${err}`,
			});
		}
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				user,
				storeToken,
				authenticateUser,
				logOutUser,
				authStatus,
				handleDeleteAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
