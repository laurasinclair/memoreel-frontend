import { Polaroid } from 'src/components/media/Asset/views';

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
