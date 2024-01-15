import imageCompression from 'browser-image-compression';

export const compressImageFile = async (file: File, maxSizeMB: number): Promise<File> => {
	const maxSizeBytes = maxSizeMB * 1000 * 1000;
	const compressedFile = await imageCompression(file, { maxSizeMB: maxSizeMB });
	if (compressedFile.size > maxSizeBytes) return compressImageFile(compressedFile, maxSizeMB);
	else return compressedFile;
};
