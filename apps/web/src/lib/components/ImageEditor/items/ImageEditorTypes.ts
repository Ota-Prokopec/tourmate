import { PartialDeep } from '@app/ts-types';

export type EditorOptions = PartialDeep<{
	allowCropping: boolean;
	allowRotating: boolean;
	allowFilters: boolean;
	allowUndo: boolean;
	cropping: {
		minCanvasWidth: number;
		minCanvasHeight: number;
		aspectRatio: number;
		minContainerWidth: number;
		minContainerHeight: number;
		minCropBoxWidth: number;
		minCropBoxHeight: number;
	};
}>;
