import { Dispatch, ReactNode, SetStateAction } from "react";

export type User = {
	_id: string;
	email: string;
	name: string;
	iat: number | undefined;
	exp: number | undefined;
	profileImg?: string;
};

export type Status =
	| { state: "idle" }
	| { state: "loading" }
	| { state: "error"; message?: string }
	| { state: "success"; message?: string };

export type ChildrenProps = {
	children: ReactNode;
};

export type MarqueeProps = {
	phrases: string[];
	className?: string;
	gap?: number;
	speed?: number;
};

export type LogoProps = {
	size?: number;
	color: string;
};

export type AssetProps = {
	boardId: string;
	content: string;
	type: string;
	userId: string;
	test: string; // TODO: remove
	_id?: string;
	__v?: number;
	createdAt?: string;
};

export type MediaFormProps = {
	assetType: string;
	initialContent: AssetProps;
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	assetId: string;
	saveEdit: (newContent: string) => void; // TODO: newContent might not be string
	deleteAsset: (assetId: string) => void;
};

export type MediaItemProps = {
	asset: AssetProps;
	editAsset: (assetId: string, editedContent: AssetProps) => void;
	deleteAsset: (assetId: string) => void;
	enableEditing: boolean;
};

export type AddMediaButtonProps = {
	onClick: Function,
	AddMediaIsOpen: boolean
}

export type BoardProps = {
	board: {
		assets: AssetProps[];
		userId: string;
		_id?: string;
		createdAt?: Date;
		__v?: number;
	};
	className?: string;
	isToday?: boolean;
};

export type UserContextProps = {
	isLoggedIn: boolean;
	authStatus: Status;
	user: User;
};

export type AboutType = {
	name: string;
	description: string;
	color: string;
	image: string;
	social: {
		github: string;
		linkedin: string;
	}
}

export type ButtonProps = {
	children: ReactNode;
	to?: string;
	style?: "primary" | "secondary";
	type?: "button" | "submit" | "reset" | undefined;
	outline?: boolean;
	className?: string;
	fullWidth?: boolean;
	iconRight?: ReactNode;
	iconLeft?: ReactNode;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLElement>;
	loading?: boolean;
};