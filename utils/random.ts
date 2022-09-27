export function randomNumb(number) {
	return Math.floor(Math.random() * number);
}

export function pickOne(array: Array<any>) {
	return array[randomNumb(array.length)];
}
