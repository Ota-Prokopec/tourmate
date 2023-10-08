import Cropperjs from 'cropperjs';
import ImageJs from 'image-js';
import { EditorOptions } from '../items/ImageEditorTypes';

export default (options: EditorOptions['cropping'], set: (image: ImageJs) => void) => {
	let cropper: Cropperjs | undefined;

	return {
		screen: (element: HTMLImageElement) => {
			cropper = new Cropperjs(element, options);
		},
		crop: () => crop(cropper, set),
		destroy: () => destroy(cropper)
	};
};

const checkCropper = (cropper: Cropperjs | undefined): cropper is Cropperjs => {
	if (!cropper)
		throw new Error('You have to screen cropper before you crop. Maybe you destroyed it.');
	return true;
};

const crop = (cropper: Cropperjs | undefined, set: (image: ImageJs) => void) => {
	if (!checkCropper(cropper)) return;
	const cropped = cropper.crop();
	set(ImageJs.fromCanvas(cropped.getCroppedCanvas()));
};

const destroy = (cropper: Cropperjs | undefined) => {
	if (!checkCropper(cropper)) return;
	cropper?.destroy();
};
