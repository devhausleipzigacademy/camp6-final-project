export function randomInt(number) {
  return Math.floor(Math.random() * number);
}

export function pickOne(array: Array<any>) {
  return array[randomInt(array.length)];
}
