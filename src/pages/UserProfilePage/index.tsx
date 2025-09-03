import { useEffect, useState, useRef } from 'react';
import { Pen } from 'react-bootstrap-icons';

import { useAuth } from "context/AuthContext";
import usersService from 'services/users.service';
import fileUploadService from 'services/fileUpload.service';
import styles from './index.module.sass';
import { Loading, InfoMessage } from 'components';
import { Status } from 'src/types';

function UserProfilePage() {
	const [nameInput, setNameInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [profileImg, setProfileImg] = useState('');
	const [initialName, setInitialName] = useState('');
	const [initialEmail, setInitialEmail] = useState('');
	const [initialProfileImg, setInitialProfileImg] = useState('');
	const { user, handleDeleteAccount } = useAuth();
	const [userProfileState, setUserProfileState] = useState<Status>({state: "idle"});

	const [infoMessage, setInfoMessage] = useState(undefined);
	const fileInputRef = useRef(null);

	useEffect(() => {
		if (user) {
			setNameInput(user.name);
			setEmailInput(user.email);
			setProfileImg(user.profileImg);
			setInitialName(user.name);
			setInitialEmail(user.email);
			setInitialProfileImg(user.profileImg);
		}
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!user) throw new Error("User not logged in");
			const response = await usersService.put(user._id, {
				name: nameInput,
				email: emailInput,
				profileImg: profileImg,
			});
			if (response.status !== 200) throw new Error("Problem with db");
			setInfoMessage(true);
			setInitialName(nameInput);
			setInitialEmail(emailInput);
			setInitialProfileImg(profileImg);
		} catch (err) {
			setUserProfileState({ state: "error", message: err });
		}
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			setUserProfileState({ state: "loading" });
			try {
				const fileUrl = await fileUploadService.uploadFile(file);
				setProfileImg(fileUrl);
				setUserProfileState({ state: "success" });
			} catch (err) {
				setUserProfileState({ state: "error", message: err });
			} finally {
				setUserProfileState({ state: "idle" });
			}
		}
	};

	const triggerFileInput = () => {
		fileInputRef.current.click();
	};

	const hasChanges = () => {
		return (
			nameInput !== initialName ||
			emailInput !== initialEmail ||
			profileImg !== initialProfileImg
		);
	};

	if (userProfileState.state === "error") return <div>{userProfileState.message}</div>;
	if (infoMessage) return <InfoMessage />;
	if (userProfileState.state === "loading")
		return <Loading />;

	return (
		<div className={styles.userProfile}>
			<form
				onSubmit={handleSubmit}
				className={styles.formContainer}>
				<div className={styles.profilePicContainer}>
					{user && profileImg ? (
						<img
							referrerPolicy='no-referrer'
							src={profileImg}
							alt='profile-photo'
							className={styles.profileImg}
						/>
					) : (
						<button
							onClick={(e) => e.preventDefault()}
							className={styles.icon}>
							{nameInput.trim().charAt(0)}
						</button>
					)}
					<button className={styles.profileImg_pen}>
						<Pen
							onClick={(e) => {
								e.preventDefault();
								triggerFileInput();
							}}
							width='18'
						/>
					</button>
				</div>
				<h2>
					{`${user.name}`}
					<span>{`${user.email}`}</span>
				</h2>

				<input
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					ref={fileInputRef}
					style={{ display: 'none' }}
				/>

				<fieldset>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						name='username'
						value={nameInput}
						onChange={(e) => setNameInput(e.target.value)}
					/>
				</fieldset>

				<fieldset>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						value={emailInput}
						onChange={(e) => setEmailInput(e.target.value)}
					/>
				</fieldset>

				<button
					type='submit'
					disabled={!hasChanges()}>
					Save
				</button>
				<p className={styles.deleteAccountButton}>
					<a onClick={handleDeleteAccount}>Delete my account</a>
				</p>
			</form>
		</div>
	);
}

export default UserProfilePage;
