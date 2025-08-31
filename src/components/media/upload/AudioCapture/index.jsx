import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

import { VoiceNote } from "components/media/ui/Asset/views";
import './index.sass';
import logger from 'logger';

function AudioCapture({ handleUploadFile, setLoading }) {
	const [audioURL, setAudioURL] = useState('');

	const uploadAudio = async (blob) => {
		try {
			setLoading(true);
			const audioURL = await handleUploadFile(blob);
			setAudioURL(audioURL);
			setLoading(false);
		} catch (err) {
			logger.log("❌", err);
			setLoading(false);
		}
	};

	return (
		<VoiceNote>
			<p>Record yourself!</p>

			<div>
				<AudioRecorder
					onRecordingComplete={uploadAudio}
					audioTrackConstraints={{
						noiseSuppression: true,
						echoCancellation: true,
					}}
					onNotAllowedOrFound={(err) => logger.error(err)}
					downloadOnSavePress={false}
					downloadFileExtension='webm'
					mediaRecorderOptions={{
						audioBitsPerSecond: 128000,
					}}
					className='audio-recorder'
				/>
			</div>

			{audioURL && (
				<div className='audio-player-container'>
					<div className='audio-player-wrapper'>
						<div className='board_item_audio'>
							<audio
								controls
								className='audio-player'>
								<source
									src={audioURL}
									type='audio/webm'
								/>
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
