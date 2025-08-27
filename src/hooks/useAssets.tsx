import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import assetsService from "services/assets.service";
import usersService from "services/users.service";
import boardsService from "services/boards.service";
import type { AssetProps, BoardProps, MediaUploadProps, Status } from "types";
import { cp } from "fs";
import { useMemo } from "react";

export const useAssets = (userId: string) => {
	const currentDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
	const queryClient = useQueryClient();

	// Getting today's board
	const { data: todaysBoard, status: todaysBoardStatus } = useQuery<
		BoardProps,
		Status
	>({
		queryKey: ["todaysBoard", userId, currentDate],
		queryFn: async () => {
			try {
				const res = await usersService.getCurrentBoard(userId, currentDate);
				const data: BoardProps = await res.data;
				if (!data.length) throw new Error("No data")
				return data[0];
			} catch (err) {
				return null;
			}
		},
		refetchInterval: getMsUntilMidnight(),
		// refetchOnWindowFocus: false,
		// staleTime: 1000 * 60 * 5,
	});

	// Adding a new asset
	const mutateAssets = useMutation<AssetProps, unknown, AssetProps>({
		mutationFn: async (newAsset: AssetProps) => {
			let boardId = todaysBoard?._id;

			if (!boardId) {
				try {
					const res = await boardsService.createBoard({ userId });
					if (!res?.data?._id) throw new Error("Couldn't create a new board");
					boardId = res.data._id;
				} catch (err) {
					throw err;
				}
			}

			const req = { ...newAsset, userId, boardId };

			try {
				const res = await assetsService.createAsset(req);
				const data: AssetProps = await res.data
				return data;
			} catch (err) {
				throw err;
			}
		},
		onSuccess: (newAsset: AssetProps) => {
			queryClient.setQueryData<BoardProps>(
				["todaysBoard", userId, currentDate],
				(prevBoard?: BoardProps) => {
					if (!prevBoard) return undefined;
					return {
						...prevBoard,
						boardContent: {
							...prevBoard.boardContent,
							assets: [
								...(prevBoard.boardContent?.assets ?? []),
								newAsset,
							],
						},
					};
				}
			);
		},
		onError: (error) => console.log(error)
	});

	const addNewAsset = (newAsset: AssetProps) => {
		mutateAssets.mutate(newAsset);
	};

	// Getting all boards
	const { data: allBoards, status: allBoardsStatus } = useQuery<
		BoardProps[],
		Status
	>({
		queryKey: ["allBoards", userId],
		queryFn: async () => {
			try {
				const res = await usersService.getAllBoards(userId);
				const data: BoardProps[] = await res.data;
				if (!data.length) throw new Error("No data")
				return data;
			} catch (err) {
				return null;
			}
	}, });

	return {
		todaysBoard,
		todaysBoardStatus,
		addNewAsset,
		allBoards,
		allBoardsStatus
	};
};

function getMsUntilMidnight() {
	const now = new Date();
	const midnight = new Date();
	midnight.setHours(24, 0, 0, 0);
	return midnight.getTime() - now.getTime();
}