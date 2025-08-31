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

	// Adding a new asset
	const mutateAssets = useMutation<AssetProps, unknown, AssetProps>({
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
			queryClient.invalidateQueries({ queryKey: ["todaysBoard", userId] });
		},
		onError: (err) => logger.error(err)
	});

	// save asset
	const saveNewAsset = (newAsset: AssetProps) => {
		if (!newAsset) return;
		mutateAssets.mutate(newAsset);
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

	return {
		// state
		todaysBoard,
		todaysBoardStatus,
		allBoards,
		allBoardsStatus,

		// actions
		uploadFile,
		saveNewAsset,
	};
};

function getMsUntilMidnight() {
	const now = new Date();
	const midnight = new Date();
	midnight.setHours(24, 0, 0, 0);
	return midnight.getTime() - now.getTime();
}
