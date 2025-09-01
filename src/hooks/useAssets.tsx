import { useContext, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import assetsService from "services/assets.service";
import usersService from "services/users.service";
import boardsService from "services/boards.service";
import type { AssetProps, BoardProps, Status } from "types";
import logger from "logger";
import { AuthContext } from "context/AuthContext";
import fileUploadService from "services/fileUpload.service";
import { AxiosError } from "axios";

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
		mutationFn: async (asset: AssetProps) => {
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

			if (asset.content instanceof File || asset.content instanceof Blob) {
				try {
					const file = asset.content;
					const fileUrl = await fileUploadService.uploadFile(file);
					if (!fileUrl) throw new Error("File could not be uploaded");
					asset.content = fileUrl;
				} catch (err) {
					logger.error(err);
				}
			}

			const req: AssetProps = { ...asset, userId, boardId };

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
			logger.info("💚 Success saving asset", newAsset);
			queryClient.invalidateQueries({ queryKey: ["todaysBoard", userId] });
			return newAsset;

		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				logger.error(err.response?.data.message);
				return;
			}
			logger.error(err);
		},
	});

	// Updating an asset
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

	// Deleting an asset
	const deleteMutateAsset = useMutation<AssetProps, unknown, AssetProps>({
		mutationFn: async (asset) => {
			if (!asset) throw new Error("Asset missing")
			if (!asset._id) throw new Error("assetId missing")
			
			try {
				const res = await assetsService.deleteAsset(asset._id);
				const data: AssetProps = await res.data;
				return data;
			} catch (err) {
				logger.error(err);
				throw err;
			}
		},
		onSuccess: () => {
			logger.info("💜 Success deleting asset");
			queryClient.invalidateQueries({ queryKey: ["todaysBoard", userId] });
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				logger.error(err.response?.data.message);
				return;
			}
			logger.error(err);
		},
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

	// delete asset
	const deleteAsset = (asset: AssetProps) => {
		if (!asset) return;
		deleteMutateAsset.mutate(asset);
	};

	// file upload
	const uploadFile = async (file: File) => {
		try {
			const fileUrl = await fileUploadService.uploadFile(file);
			return fileUrl;
		} catch (err) {
			logger.error(err);
		}
	};

	return {
		// state
		todaysBoard,
		todaysBoardStatus,
		allBoards,
		allBoardsStatus,

		// actions
		uploadFile,
		saveNewAsset,
		updateAsset,
		deleteAsset,
	};
};

function getMsUntilMidnight() {
	const now = new Date();
	const midnight = new Date();
	midnight.setHours(24, 0, 0, 0);
	return midnight.getTime() - now.getTime();
}
