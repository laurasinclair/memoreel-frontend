import { useState, useRef } from 'react';
import { Pen } from 'react-bootstrap-icons';

import { useAuth } from "context/AuthContext";
import usersService from 'services/users.service';
import fileUploadService from 'services/fileUpload.service';
import styles from './index.module.sass';
import { Loading, Button } from 'components';
import { Status } from 'src/types';
import logger from 'logger';
import { Col, Container, Row } from 'react-bootstrap';
import placeholder from "images/placeholder.jpg";

function UserProfilePage() {
	const { user, setUser } = useAuth();
	
	const [formData, setFormData] = useState({
		name: "",
		displayName: "",
		email: "",
		profileImg: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const [userProfileState, setUserProfileState] = useState<Status>({state: "idle"});
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!hasChanges) return;

		try {
			if (!user._id) throw new Error("No userId");

			const req = Object.fromEntries(
				Object.entries(formData).filter(([_, value]) => typeof value === "string" && value.length) // only values are are not undefined
			);
			if (!Object.keys(req).length) return;

			const resp = await usersService.put(user._id, req);
			logger.log("resp", resp.data);
			if (resp.status !== 200) throw new Error("Problem with db");
			
			setUser({...resp.data})
			setUserProfileState({ state: "success"});
		} catch (err) {
			logger.error(err);
			setUserProfileState({ state: "error", message: err });
		}
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		try {
			const fileUrl = await fileUploadService.uploadFile(file);
			logger.log(fileUrl)
			if (!fileUrl) throw new Error("couldn't add new profile picture")
			setFormData(prev => ({...prev, profileImg: fileUrl}));
		} catch (err) {
			logger.error(err)
		}
	};

	const triggerFileInput = (e) => {
		e.preventDefault();
		fileInputRef.current?.click();
	};

	const hasChanges = () => {
		return (
			formData.name !== user.name ||
			formData.email !== user.email ||
			formData.displayName !== user.displayName ||
			formData.profileImg !== user.profileImg
		);
	};

	if (userProfileState.state === "error") return <div>{userProfileState.message}</div>;
	

	return (
		<div className={styles.userProfile}>
			<Container>
				{userProfileState.state === "loading" ? (
					<Loading />
				) : (
					<form onSubmit={handleSubmit}>
						<div className={styles.profilePicContainer}>
							{user.profileImg ? (
								<img
									referrerPolicy="no-referrer"
									src={
										formData.profileImg
											? `${formData.profileImg}?t=${Date.now()}`
											: user.profileImg
									} // ?t=${Date.now()} makes the browser treat it as a new image when formData.profileImg changes
									alt={user.displayName || user.name}
									className={styles.profileImg}
								/>
							) : (
								<img
									referrerPolicy="no-referrer"
									src={placeholder}
									alt={user.name || "User"}
									className={styles.profileImg}
								/>
							)}
							<button className={styles.profileImg_pen}>
								<Pen onClick={triggerFileInput} width="18" />
							</button>
						</div>

						<h2>
							{`${user.displayName || user.name}`}
							<span>{`${user.email}`}</span>
						</h2>

						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							ref={fileInputRef}
							style={{ display: "none" }}
						/>

						<Row className="mb-3">
							<Col>
								<label htmlFor="username">Username</label>
								<input
									type="text"
									name="username"
									defaultValue={user.name}
									onChange={handleChange}
								/>
							</Col>

							<Col>
								<label htmlFor="displayName">Display name</label>
								<input
									type="text"
									name="displayName"
									defaultValue={user.displayName || undefined}
									placeholder={user.name}
									onChange={handleChange}
								/>
							</Col>
						</Row>

						<Row>
							<Col>
								<label htmlFor="email">Email</label>
								<input
									type="email"
									name="email"
									defaultValue={user.email}
									onChange={handleChange}
								/>
							</Col>
						</Row>

						<Button
							type="submit"
							disabled={!hasChanges}
							variant="primary"
							className="mb-3"
						>
							Save
						</Button>

						{userProfileState.state === "success" && (
							<div
								style={{
									color: "#335f3f",
									border: "2px solid",
									padding: "20px 26px",
									marginBottom: "50px",
								}}
							>
								Your profile has been successfully updated!
							</div>
						)}

						{/* <p className={styles.deleteAccountButton}>
						<a onClick={handleDeleteAccount} href="#">
							Delete my account
						</a>
					</p> */}
					</form>
				)}
			</Container>
		</div>
	);
}

export default UserProfilePage;
