export const ImageGridCalculator = (img: HTMLImageElement) => {
	// const img = new Image();
	let gridRows = 0;
	// img.src = url;
	// img.loading = 'eager';
	// img.onload = async () => {
	// };
	const aspectRatio: number = img.width / img.height;
	const newHeight: number = 320 / aspectRatio;
	gridRows = Math.floor(newHeight / 25) + 6;
	console.log('GRID ROWS', gridRows);
	return gridRows;
};
