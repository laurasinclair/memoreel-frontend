import React, { useState, useEffect, useContext } from "react";
import authService from "services/auth.service";
import usersService from "services/users.service";
import boardsService from "services/boards.service";
import assetsService from "services/assets.service";
import type { Status, ChildrenProps, User, AuthContextType } from "types";

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: ChildrenProps) {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);
	const [authStatus, setAuthStatus] = useState<Status>({ state: "idle" });

	const storeToken = (token: string) => {
		localStorage.setItem("authToken", token);
	};

	const authenticateUser = () => {
		setAuthStatus({ state: "loading" });
		const storedToken = localStorage.getItem("authToken");

		if (storedToken) {
			authService
				.verify()
				.then((res) => {
					console.log(res);
					setIsLoggedIn(true);
					setUser(res.data);
				})
				.then(() => {
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
		if (!user) return;
		try {
			const userResponse = await usersService.get(user._id);
			const boards = userResponse.data.boards;

			for (const boardId of boards) {
				const boardResponse = await boardsService.get(boardId);
				const assets = boardResponse.data.assets;

				for (const assetId of assets) {
					await assetsService.deleteAsset(assetId);
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
				authStatus,
				storeToken,
				authenticateUser,
				logOutUser,
				handleDeleteAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProvider, AuthContext };

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error("useAuth must be used within AuthProvider");
	return context;
};
