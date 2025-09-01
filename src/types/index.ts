import { QueryStatus } from "@tanstack/react-query";
import { ChangeEvent, Dispatch, HTMLAttributes, ReactElement, ReactNode, SetStateAction } from "react";

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

export type AssetEditorProps = {
	title: string;
	verb: string;
	button: AssetEditorButtonProps;
	input: AssetInputProps;
	description?: string;
};

export type AssetEditorButtonProps = {
	icon: ReactNode;
};

export type AssetInputProps = (props: HTMLAttributes<HTMLElement>) => ReactElement;

export type AssetProps = {
	content: string;
	type: AssetTypeProps;
	boardId?: string;
	userId?: string;
	_id?: string;
	__v?: number;
	createdAt?: string;
};

export type AssetComponentProps = {
	asset: AssetProps;
} 

export type AssetTypeProps = "text" | "image" | "youtubeURL" | "webcamImage" | "audio"

export type MediaTypeButtonProps = {
	type: AssetTypeProps;
	title: AssetTypeProps;
	verb: string;
} & AssetEditorButtonProps;

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

// export type MediaTypeButtonProps = {
// 	mediaUpload: MediaUploadProps;
// 	setMediaUpload: Dispatch<SetStateAction<MediaUploadProps>>;
// };

export type BoardContentProps = {
	assets: AssetProps[];
	userId: string;
	_id?: string;
	createdAt?: Date;
	__v?: number;
}
export type BoardProps = {
	boardContent: BoardContentProps;
	status: QueryStatus;
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

export type AssetContextType = {
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	asset: AssetProps | undefined;
	setAsset: React.Dispatch<
		React.SetStateAction<AssetProps | undefined>
	>;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	openAssetEditor: (asset: AssetTypeProps) => void;
};

export type PopUpContextType = {
	isPopUpOpen: boolean;
	openPopUp: () => void;
	closePopUp: () => void;
}

export type UploadFileType = string | Blob | File;