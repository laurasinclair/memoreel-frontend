import { useContext, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import assetsService from "services/assets.service";
import usersService from "services/users.service";
import boardsService from "services/boards.service";
import type { AssetProps, BoardProps, Status, UserProps } from "types";
import logger from "logger";
import fileUploadService from "services/fileUpload.service";
import authService from "src/services/auth.service";

export const useUser = () => {
	// Getting current User
	const { data: user, status: userStatus } = useQuery<
		UserProps | null,
		Status
	>({
		queryKey: ["currentUser"],
		queryFn: async (): Promise<UserProps | null> => {
			const storedToken = localStorage.getItem("authToken");
			if (!storedToken) throw new Error("No token provided")

			try {
				const res = await authService.verify();
				const data = await res.data;
				if (!data._id) return null;
				return data;
			} catch (err: any) {
				removeToken();
				logger.error(err);
				return null;
			}
		}
	});

	const removeToken = () => {
		localStorage.removeItem("authToken");
	};

	// // Updating user
	const updateMutateAsset = useMutation<AssetProps, unknown, AssetProps>({
		mutationFn: async (updatedAsset) => {
			if (
				updatedAsset.content instanceof Blob
			) {
				try {
					const file = updatedAsset.content;
					const fileUrl = await fileUploadService.uploadFile(file);
					if (!fileUrl) throw new Error("File could not be uploaded");
					updatedAsset.content = fileUrl;
				} catch (err) {
					logger.error(err);
				}
			}

			const req: AssetProps = { ...updatedAsset };

			try {
				const res = await assetsService.updateAsset(req);
				const data: AssetProps = await res.data;
				return data;
			} catch (err) {
				logger.error(err);
				throw err;
			}
		},
		onSuccess: (updatedAsset: AssetProps) => {
			logger.info("💙 Success updating asset", updatedAsset);
			queryClient.invalidateQueries({ queryKey: ["todaysBoard", userId] });
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				logger.error(err.response?.data.message);
				return;
			};
			logger.error(err);
		},
	});

	return {
		// state
		user,
		userStatus,

		// actions
		removeToken
	};
};