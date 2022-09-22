function randomInt(number) {
    return Math.floor(Math.random() * (number + 1));
}

export function pickOne(array: Array<any>) {
    return array[randomInt(array.length)];
}
