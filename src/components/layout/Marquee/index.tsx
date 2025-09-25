import { useEffect, useRef, useState } from "react";
import { Asterisk } from "react-bootstrap-icons";
import classNames from "classnames";
import styles from "./index.module.sass";
import type { MarqueeProps } from "types";

function Marquee({ phrases, className, gap = 30, speed = 0.5 }: MarqueeProps) {
	if (!phrases) return;

	const containerRef = useRef<HTMLDivElement>(null);
	const [offset, setOffset] = useState<number>(0);

	const duplicatedPhrases = phrases ? Array(10).fill(phrases).flat() : [[""]];

	useEffect(() => {
		let animationFrame: number;

		const scroll = () => {
			if (!containerRef.current) return;
			const width = containerRef.current.scrollWidth / 2; // width of one set of phrases
			setOffset((prev) => (prev >= width ? 0 : prev + speed));
			animationFrame = requestAnimationFrame(scroll);
		};

		animationFrame = requestAnimationFrame(scroll);
		return () => cancelAnimationFrame(animationFrame);
	}, [speed, phrases]);

	return (
		<div className={classNames(styles.marquee, className)}>
			<div
				className={styles.marquee_content}
				ref={containerRef}
				style={{
					transform: `translateX(-${offset}px)`,
				}}
			>
				{duplicatedPhrases.map((phrase, index) => {
					return (
						<div key={index} className={styles.marquee_item}>
							{phrase}
							<div
								className={styles.asterisk}
								style={{
									margin: `0 ${gap}px`,
								}}
							>
								<Asterisk size="16" />
								<Asterisk size="16" />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Marquee;
