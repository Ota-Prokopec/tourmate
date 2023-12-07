export type CarouselImage = {
	imgurl: string;
	id: string | number | undefined;
	width?: number;
	height?: number;
};

export type CarouselFunctions = {
	goToNext: () => void;
	goToPrev: () => void;
	goTo: (index: number) => void;
};
