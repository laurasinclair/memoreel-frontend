import { useState, useEffect, useCallback } from "react";
import assetsService from "services/assets.service";
import usersService from "services/users.service";
import type { AssetProps, BoardProps, Status } from "types";
import { useQuery } from "@tanstack/react-query";

export const useAssets = (userId: string) => {
	const [allAssets, setAllAssets] = useState<AssetProps[]>([]);

	const currentDate = new Date().toISOString().slice(0, 10);
	const { data: todaysBoard, status: todaysBoardStatus } = useQuery<
		BoardProps,
		Status
	>({
		queryKey: ["todaysBoard"],
		queryFn: () =>
			usersService
				.getCurrentBoard(userId, currentDate)
				.then((res: { data: BoardProps[] }) => res.data[0]),
	});

	// useEffect(() => {
	// 	if (!userId) return;
	// 	setStatus({ state: "loading" });

	// 	const currentDate = new Date().toISOString().slice(0, 10);

	// 	usersService
	// 		.getCurrentBoard(userId, currentDate)
	// 		.then((res) => {
	// 			if (res.status !== 200) throw new Error("Problem fetching board");
	// 			const board = res.data[0];
	// 			if (board) {
	// 				setAllAssets(board.assets);
	// 				setTodaysBoard(board);
	// 			} else {
	// 				setAllAssets([]);
	// 				setTodaysBoard({ assets: [], userId });
	// 			}
	// 			setStatus({ state: "success" });
	// 		})
	// 		.catch((err) =>
	// 			setStatus({
	// 				state: "error",
	// 				message: `Error fetching board: ${err}`,
	// 			})
	// 		);
	// }, [userId]);

	// const deleteAsset = useCallback((assetId: string) => {
	// 	setStatus({ state: "loading" });
	// 	assetsService
	// 		.delete(assetId)
	// 		.then(() => {
	// 			setAllAssets((prev) =>
	// 				prev.filter((asset) => asset._id !== assetId)
	// 			);
	// 			setTodaysBoard((prev) =>
	// 				prev
	// 					? {
	// 							...prev,
	// 							assets: prev.assets.filter((a) => a._id !== assetId),
	// 					  }
	// 					: prev
	// 			);
	// 			setStatus({ state: "success" });
	// 		})
	// 		.catch((err) =>
	// 			setStatus({
	// 				state: "error",
	// 				message: `Error deleting asset: ${err}`,
	// 			})
	// 		);
	// }, []);

	// const editAsset = useCallback(
	// 	(assetId: string, editedContent: AssetProps) => {
	// 		setStatus({ state: "loading" });
	// 		assetsService
	// 			.put(assetId, { content: editedContent })
	// 			.then((res) => {
	// 				const updatedAsset = res.data;
	// 				setAllAssets((prev) =>
	// 					prev.map((asset) =>
	// 						asset._id === assetId ? updatedAsset : asset
	// 					)
	// 				);
	// 				setTodaysBoard((prev) =>
	// 					prev
	// 						? {
	// 								...prev,
	// 								assets: prev.assets.map((a) =>
	// 									a._id === assetId ? updatedAsset : a
	// 								),
	// 						  }
	// 						: prev
	// 				);
	// 				setStatus({ state: "success" });
	// 			})
	// 			.catch((err) => {
	// 				setStatus({
	// 					state: "error",
	// 					message: `Error editing asset: ${err}`,
	// 				});
	// 			}
	// 			);
	// 	},
	// 	[]
	// );

	return {
		todaysBoard,
		todaysBoardStatus,
	};
};
