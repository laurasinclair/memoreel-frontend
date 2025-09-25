import styles from './index.module.sass';
import { Github, Linkedin } from 'react-bootstrap-icons';
import { Container, Row, Col } from 'react-bootstrap';
import imgLaura from 'images/63737600.jpeg';
import imgEcem from 'images/ecem.jpg';
import imgTetiana from 'images/tetiana.jpeg';
import type { AboutType } from "types";

const data: AboutType[] = [
	{
		name: "Tetiana Kanafotska",
		image: imgTetiana,
		color: "#D6F488",
		description:
			"A Ukrainian with a background in start-up and marketing. Love good jokes, sushi and fixing bugs 🐞.",
		social: {
			github: "https://github.com/tetianakanafotska",
			linkedin: "https://www.linkedin.com/in/tetiana-kanafotska/",
		},
	},
	{
		name: "Ecem Onkol",
		image: imgEcem,
		color: "#FFF791",
		description:
			"From the Turkish Aegean coast, with an olive addiction and a designer background, still sprinkling creativity onto JS katas like confetti! 🎉",
		social: {
			github: "https://github.com/ecemonkol",
			linkedin: "https://www.linkedin.com/in/ecemonkol/",
		},
	},
	{
		name: "Laura Sinclair",
		image: imgLaura,
		color: "#FF9478",
		description:
			"Frenchie with a creative background and the odd ability to fix CSS problems in her sleep. Full-time croissant lover.",
		social: {
			github: "https://github.com/laurasinclair",
			linkedin: "https://www.linkedin.com/in/laurasnclr/",
		},
	},
];

function About() {
	return (
		<Container className={styles.about} fluid>
			<Row>
				<Col md={8} lg="6" className={styles.about_project}>
					<p className="lead">
						This project was made with love, <br />
						and a lot of git conflicts.
					</p>
					<p>
						MemoReel was created with a desire to develop an app that
						feels like home. A place where you can drop random stuff from
						your mind - daily. And then come back to relive the moments.
					</p>
				</Col>
			</Row>

			<Row>
				{data.map((person: AboutType) => {
					return (
						<Col md="6" lg="4" key={person.name + person.color}>
							<div className={styles.social} style={{ backgroundColor: person.color }} >
								<div className={styles.social_person}>
									<img
										src={person.image}
										className={styles.social_person_image}
										alt={person.name}
									/>
									{person.name && (
										<h4 className={styles.social_person_name}>
											{person.name}
										</h4>
									)}
									{person.description && (
										<p>{person.description}</p>
									)}
								</div>

								<div className={styles.social_links}>
									<a
										href={person.social.github}
										target="_blank"
										rel="noreferrer"
									>
										<Github size="30" color="#0B0A08" />
									</a>

									<a
										href={person.social.linkedin}
										target="_blank"
										rel="noreferrer"
									>
										<Linkedin size="30" color="#0B0A08" />
									</a>
								</div>
							</div>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
}

export default About;
