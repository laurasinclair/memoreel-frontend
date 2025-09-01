import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import assetsService from "services/assets.service";
import usersService from "services/users.service";
import boardsService from "services/boards.service";
import type { AssetProps, BoardProps, Status } from "types";
import logger from "src/utils/logger";
import { AuthContext } from "src/context";
import { assetContext } from "src/context/AssetContext";

export const useAssets = () => {
	const { user } = useContext(AuthContext);
	const userId = user._id;
	const currentDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
	const queryClient = useQueryClient();

	// Getting today's board
	const { data: todaysBoard, status: todaysBoardStatus } = useQuery<
		BoardProps | null,
		Status
	>({
		queryKey: ["todaysBoard", userId, currentDate],
		queryFn: async (): Promise<BoardProps | null> => {
			try {
				const res = await usersService.getCurrentBoard(userId, currentDate);
				const data = await res.data;
				if (!data.length) return null;
				return data[0];
			} catch (err: any) {
				logger.error(err);
				return null;
			}
		},
		refetchInterval: getMsUntilMidnight(),
	});

	// Getting all boards
	const { data: allBoards, status: allBoardsStatus } = useQuery<
		BoardProps[] | null,
		Status
	>({
		queryKey: ["allBoards", userId],
		queryFn: async (): Promise<BoardProps[] | null> => {
			try {
				const res = await usersService.getAllBoards(userId);
				const data: BoardProps[] = await res.data;
				if (!data.length) throw new Error("No data");
				return data;
			} catch (err) {
				logger.error(err);
				return null;
			}
		},
	});

	// Adding a new asset
	const saveMutateAsset = useMutation<AssetProps, unknown, AssetProps>({
		mutationFn: async (newAsset: AssetProps) => {
			let boardId = todaysBoard?._id;

			if (!boardId) {
				try {
					const res = await boardsService.createBoard({ userId });
					if (!res?.data?._id)
						throw new Error("Couldn't create a new board");
					boardId = res.data._id;
				} catch (err) {
					logger.error(err);
					throw err;
				}
			}

			const req: AssetProps = { ...newAsset, userId, boardId };

			try {
				const res = await assetsService.createAsset(req);
				const data: AssetProps = await res.data;
				return data;
			} catch (err) {
				logger.error(err);
				throw err;
			}
		},
		onSuccess: (newAsset: AssetProps) => {
			logger.log("❤️ SUCCESS", newAsset);
			queryClient.invalidateQueries({ queryKey: ["todaysBoard", userId] });
		},
		onError: (err) => logger.error(err),
	});

	// Updating an asset
	const updateMutateAsset = useMutation<AssetProps, unknown, AssetProps>({
		mutationFn: async (updatedAsset) => {
			try {
				const res = await assetsService.updateAsset(updatedAsset);
				const data: AssetProps = await res.data;
				return data;
			} catch (err) {
				logger.error(err);
				throw err;
			}
		},
		onSuccess: (updatedAsset: AssetProps) => {
			logger.log("❤️ SUCCESS", updatedAsset);
			queryClient.invalidateQueries({ queryKey: ["todaysBoard", userId] });
		},
		onError: (err) => logger.error(err),
	});

	// save asset
	const saveNewAsset = (newAsset: AssetProps) => {
		if (!newAsset) return;
		saveMutateAsset.mutate(newAsset);
	};

	// update asset
	const updateAsset = (updatedAsset: AssetProps) => {
		if (!updatedAsset) return;
		updateMutateAsset.mutate(updatedAsset);
	};

	// handle file upload
	const uploadFile = async (file: File) => {
		try {
			// setMediaFormStatus({ state: "uploading" });
			const fileUrl = await uploadService.uploadFile(file);
			// setNewAssetContent(fileUrl);
			return fileUrl;
		} catch (err) {
			logger.error(err);
			// setMediaFormStatus({
			// 	state: "error",
			// 	message: `Error uploading file: ${error}`,
			// });
		} finally {
			// setMediaFormStatus({ state: "idle" });
		}
	};

	return {
		// state
		todaysBoard,
		todaysBoardStatus,
		allBoards,
		allBoardsStatus,
		saveNewAssetSuccess: saveMutateAsset.isSuccess,

		// actions
		uploadFile,
		saveNewAsset,
		updateAsset,
	};
};

function getMsUntilMidnight() {
	const now = new Date();
	const midnight = new Date();
	midnight.setHours(24, 0, 0, 0);
	return midnight.getTime() - now.getTime();
}
