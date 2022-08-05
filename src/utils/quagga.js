export const defaultLocatorSettings = {
  patchSize: 'large',
  halfSample: true,
};
export const defaultConstraints = {
  width: 640,
  height: 320,
  focusMode: 'auto',
  resizeMode: 'crop-and-scale',
};

export function getMedian(arr) {
  arr.sort((a, b) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

export function getMedianOfCodeErrors(decodedCodes) {
  const errors = decodedCodes
    .filter((x) => x.error !== undefined)
    .map((x) => x.error);
  const medianOfErrors = getMedian(errors);
  return medianOfErrors;
}
export const defaultDecoders = ['upc_reader'];
