import { Pen, CheckLg, Trash } from 'react-bootstrap-icons';
import classNames from 'classnames';
import styles from './index.module.sass';
import { Button } from 'components';

const EditButtons = ({
	handleSave,
	validateContent,
	newAssetContent,
	isEditing,
	setIsEditing,
	deleteAsset,
	touched,
	assetType,
	assetId,
	setOpenMediaForm,
}) => {
	return (
		<div className={styles.editButtons}>
			<SaveButton
				handleSave={handleSave}
				isEditing={isEditing}
				validateContent={validateContent}
				newAssetContent={newAssetContent}
			/>
			<DeleteButton
				assetId={assetId}
				deleteAsset={deleteAsset}
				setOpenMediaForm={setOpenMediaForm}
			/>
			{/* {touched && !validateContent(newAssetContent) && <p>Invalid content</p>} // TODO: better error display */}
		</div>
	);
};

export default EditButtons;

export const SaveButton = ({
	handleSave,
	isEditing,
	assetType,
	validateContent,
	newAssetContent,
	className,
}) => {
	return (
		<Button
			onClick={handleSave}
			disabled={!validateContent(newAssetContent)}
			className={classNames(className, "button-primary")}
			style={{
				display: isEditing && assetType === 'camImage' ? 'none' : 'flex',
			}}>
			<CheckLg size='20' />
		</Button>
	);
};

export const DeleteButton = ({
	assetId,
	deleteAsset,
	setOpenMediaForm,
}) => {
	return (
		<Button
			onClick={() =>
				assetId ? deleteAsset(assetId) : setOpenMediaForm(false)
			}
			style="primary"
		>
			<Trash />
		</Button>
	);
};

export const EditButton = ({ setIsEditing, className, bgcolor }) => {
	return (
		<Button
			className={className}
			onClick={() => {
				setIsEditing((prev: boolean) => !prev);
			}}
			style="primary">
			<Pen size={16} />
		</Button>
	);
};
