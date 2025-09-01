import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

import { VoiceNote } from "src/components/media/Asset/views";
import './index.sass';
import logger from 'logger';
import { assetContext } from 'src/context/AssetContext';
import { createEvent } from 'src/utils';

function AudioCapture() {
	const [audioURL, setAudioURL] = useState('');
	const { onChange } = assetContext();

	const recordAudio = (e) => {
		logger.log("record");
		try {
			const event = createEvent(e);
			onChange(event);
		} catch (err) {
			logger.error(err);
		}
	};

	return (
		<VoiceNote>
			<p>Record yourself!</p>

			<div>
				<AudioRecorder
					onRecordingComplete={recordAudio}
					audioTrackConstraints={{
						noiseSuppression: true,
						echoCancellation: true,
					}}
					onNotAllowedOrFound={(err) => logger.error(err)}
					downloadOnSavePress={false}
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
