import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./index.module.sass";
import { AuthContext } from "context";
import landingslide1 from "images/landingpage-slideshow/landingslide1.png";
import landingslide2 from "images/landingpage-slideshow/landingslide2.png";
import { Button, Marquee } from "components";
import { paths } from "src/router/paths";

export default function LandingPage() {
	const { user, isLoggedIn } = useContext(AuthContext);

	return (
		<section className={styles.landingPage}>
			<div className={styles.landingPage_slideshow}>
				<Marquee
					phrases={["For days worth remembering"]}
					className={styles.marquee1}
					speed={0.6}
				/>

				<div className={styles.landingPage_slideshow_item_front}>
					<img src={landingslide1} alt="MemoReel" />
				</div>
				<div className={styles.landingPage_slideshow_item_back}>
					<img src={landingslide2} alt="MemoReel" />
				</div>

				<Marquee
					phrases={[
						"Do you have a song in mind?",
						"What's on your mind today?",
						"What made you laugh?",
					]}
					speed={0.3}
					className={styles.marquee2}
				/>
			</div>

			<Container fluid>
				<Row className={styles.landingPage_cta}>
					<p>
						{isLoggedIn ? (`Welcome back, ${user.name}!`) : "Memoreel is a journaling app designed for daily note-taking."}
					</p>
					<Button to={isLoggedIn ? paths.dashboard : paths.login} className="button-primary">
						Highlight Your Day!
					</Button>
				</Row>
			</Container>
		</section>
	);
}
