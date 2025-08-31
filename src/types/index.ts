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
	content: string;
	assetType: AssetProps;
	boardId?: string;
	userId?: string;
	type: string;
	_id?: string;
	__v?: number;
	createdAt?: string;
};

export type AssetTypeProps = "text" | "image" | "youtubeURL" | "camImage" | "audio" | null

export type MediaFormProps = {
	assetType: AssetTypeProps;
	initialContent: AssetProps;
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	assetId: string;
	saveEdit: (newContent: string) => void; // TODO: newContent might not be string
	deleteAsset: (assetId: string) => void;
};

export type MediaItemProps = {
	asset: AssetProps;
	mediaUpload: MediaUploadProps;
	editAsset: (assetId: string, editedContent: AssetProps) => void;
	deleteAsset: (assetId: string) => void;
	enableEditing: boolean;
};

export type AddMediaAllButtonsProps = {
	mediaUpload: MediaUploadProps;
	setMediaUpload: AddMediaAllButtonsProps;
};

export type SetMediaUploadProps = {
	setMediaUpload: Dispatch<SetStateAction<MediaUploadProps>>;
};

export type AddMediaButtonProps = {
	toggleMenu: () => void;
	isMenuOpen: boolean;
};

export type MediaTypeButtonProps = {
	mediaUpload: MediaUploadProps;
	setMediaUpload: Dispatch<SetStateAction<MediaUploadProps>>;
};

export type BoardContentProps = {
	assets: AssetProps[];
	userId: string;
	_id?: string;
	createdAt?: Date;
	__v?: number;
}
export type BoardProps = {
	boardContent: BoardContentProps;
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
	variant?: "primary" | "secondary";
	outline?: boolean;
	className?: string;
	fullWidth?: boolean;
	iconRight?: ReactNode;
	iconLeft?: ReactNode;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLElement>;
	loading?: boolean;
};

export type LoggerMessageType = string;