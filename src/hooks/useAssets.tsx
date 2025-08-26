import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import assetsService from "services/assets.service";
import usersService from "services/users.service";
import boardsService from "services/boards.service";
import type { AssetProps, BoardProps, MediaUploadProps, Status } from "types";

export const useAssets = (userId: string) => {
	const queryClient = useQueryClient();
	const currentDate = new Date().toISOString().slice(0, 10);

	// Getting today's board
	const { data: todaysBoard, status: todaysBoardStatus } = useQuery<
		BoardProps,
		Status
	>({
		queryKey: ["todaysBoard", userId, currentDate],
		queryFn: () =>
			usersService
				.getCurrentBoard(userId, currentDate)
				.then((res: { data: BoardProps[] }) => res.data[0]),
	});


	// Adding a new asset
	const mutateAssets = useMutation<AssetProps, unknown, AssetProps>({
		mutationFn: (newAsset: AssetProps) => {
			let boardId = todaysBoard._id;

			if (!boardId) {
				boardId = boardsService.post({ userId })
					.then(res => res.data._id)
					.catch(() => { return })
			}

			const req = {
				...newAsset,
				userId,
				boardId,
			};

			return assetsService
				.post(req)
				.then((res: { data: AssetProps[] }) => res.data);
		},
		onSuccess: (newAsset) => {
			queryClient.setQueryData<BoardProps>(
				["todaysBoard", userId, currentDate],
				(prevBoard) => {
					return {
						...prevBoard,
						assets: [...prevBoard.assets, newAsset],
					};
				}
			);
		},
	});

	const addNewAsset = (newAsset: AssetProps) => {
		mutateAssets.mutate(newAsset);
	};

	return {
		todaysBoard,
		todaysBoardStatus,
		addNewAsset,
	};
};
