import { ReactNode } from "react";

type User = {
	_id: string;
	email: string;
	name: string;
	iat: number | undefined;
	exp: number | undefined;
};

type Status =
	| { state: "idle" }
	| { state: "loading" }
	| { state: "error"; message: string };

type ChildrenProps = {
	children: ReactNode;
};

type MarqueeProps = {
	phrases: string[];
	className: string;
	gap?: number;
	speed?: number;
};

type LogoProps = {
	size: string;
	color: string;
};

type AssetProps = {
	boardId: string;
	content: string;
	type: string;
	userId: string;
	_id?: string;
	__v?: number;
	createdAt?: string;
};

type MediaFormProps = {
	assetType: string;
	initialContent: AssetProps;
	isEditing: boolean;
	setIsEditing: boolean;
	assetId: string;
	saveEdit: Function;
	deleteAsset: Function;
};

type AddMediaButtonProps = {
	onClick: Function,
	AddMediaIsOpen: boolean
}

type BoardProps = {
	assets: AssetProps[];
	className: string;
};

type UserContextProps = {
	isLoggedIn: boolean;
	authStatus: Status;
	user: User;
};