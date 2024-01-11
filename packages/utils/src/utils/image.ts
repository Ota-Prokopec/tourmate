import Compressor from 'compressorjs'

export const compressImage = async (file: File, quality: number) => {
	return new Promise<File | Blob>((res, rej) => {
		new Compressor(file, {
			quality: quality,
			success: (resultFile) => {
				res(resultFile)
			},
			error: (error) => {
				rej(error)
			},
		})
	})
}
