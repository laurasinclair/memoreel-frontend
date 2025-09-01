import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

import { VoiceNote } from "src/components/media/Asset/views";
import './index.sass';
import logger from 'logger';
import { assetContext } from 'src/context/AssetContext';
import { createEvent } from 'src/utils';

function AudioCapture() {
	const [audioURL, setAudioUrl] = useState(undefined);
	const { onChange } = assetContext();

	const recordAudio = (e) => {
		const audioBlob = e;
		const audioUrlFromBlob = URL.createObjectURL(audioBlob);

		try {
			if (!audioUrlFromBlob) throw new Error("Problem with recordAudio()");
			setAudioUrl(audioUrlFromBlob);
			const event = createEvent(audioBlob);
			onChange(event);
		} catch (err) {
			logger.error(err);
		}
		
		return () => URL.revokeObjectURL(audioBlob);
	};

	return (
		<VoiceNote>
			<p>Hit record!</p>

			<div>
				<AudioRecorder
					barColor="red"
					onRecordingComplete={recordAudio}
					audioTrackConstraints={{
						noiseSuppression: true,
						echoCancellation: true,
					}}
					onNotAllowedOrFound={(err) => logger.error(err)}
					downloadOnSavePress={false}
					showVisualizer={true}
					downloadFileExtension="webm"
					mediaRecorderOptions={{
						audioBitsPerSecond: 128000,
					}}
					className="audio-recorder"
				/>
			</div>

			{audioURL && (
				<div className="audio-player-container">
					<div className="audio-player-wrapper">
						<div className="board_item_audio">
							<audio controls className="audio-player">
								<source src={audioURL} type="audio/webm" />
								Your browser does not support the audio element.
							</audio>
						</div>
					</div>
				</div>
			)}
		</VoiceNote>
	);
}

export default AudioCapture;
