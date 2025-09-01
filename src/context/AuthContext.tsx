import React, { useState, useEffect, useContext } from "react";
import type { Status, ChildrenProps, User } from "types";
import { useUser } from "hooks/useUser";
import logger from "logger";

const AuthContext = React.createContext(undefined);

export function AuthProvider({ children }: ChildrenProps) {
	const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
	const { user, userStatus, removeToken } = useUser();

	const storeToken = (token) => {
		localStorage.setItem("authToken", token);
	};

	useEffect(() => {
		logger.log(user, userStatus);
		if (userStatus === "success") {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [user])

	const logOutUser = () => {
		removeToken();
		setIsLoggedIn(false);
	};

	// const handleDeleteAccount = async () => {
	// 	try {
	// 		const userResponse = await usersService.get(user._id);
	// 		const boards = userResponse.data.boards;

	// 		for (const boardId of boards) {
	// 			const boardResponse = await boardsService.get(boardId);
	// 			const assets = boardResponse.data.assets;

	// 			for (const assetId of assets) {
	// 				await assetsService.delete(assetId);
	// 			}
	// 			await boardsService.delete(boardId);
	// 		}
	// 		const deleteResponse = await usersService.delete(user._id);

	// 		if (deleteResponse.status === 200) {
	// 			removeToken();
	// 			setIsLoggedIn(false);
	// 			setAuthStatus({ state: "idle" });
	// 			setUser(null);
	// 		}
	// 	} catch (err) {
	// 		setAuthStatus({
	// 			state: "error",
	// 			message: `Error deleting account: ${err}`,
	// 		});
	// 	}
	// };

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				user,
				logOutUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const authContext = () => {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error("authContext must be used within AuthContext.Provider");
	return context;
};
