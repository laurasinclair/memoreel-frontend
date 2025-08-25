import { useContext } from "react";
import { Container } from "react-bootstrap";
import styles from "./index.module.sass";
import { AuthContext } from "context";
import landingslide1 from "images/landingpage-slideshow/landingslide1.png";
import landingslide2 from "images/landingpage-slideshow/landingslide2.png";
import { Button, Marquee } from "components";

export default function LandingPage() {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<section className={styles.landingPage}>
			<div className={styles.landingPage_slideshow}>
				<Marquee
					phrases={["For days worth remembering"]}
					className={styles.marquee1}
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
					className={styles.marquee2}
				/>

				<Container fluid>
					<div className={styles.landingPage_cta}>
						
						<Button to={isLoggedIn ? "/dashboard" : "/login"}>
							Highlight Your Day!
						</Button>
					</div>
				</Container>
			</div>
		</section>
	);
}
