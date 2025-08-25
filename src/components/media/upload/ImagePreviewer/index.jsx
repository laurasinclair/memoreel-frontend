import { Polaroid } from 'components/media/ui/MediaItem';

function ImagePreviewer({ url }) {
	return url ? (
		<Polaroid>
			<img
				src={url}
				alt='my_image'
			/>
		</Polaroid>
	) : null;
}

export default ImagePreviewer;
