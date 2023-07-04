export const getImageList = (imagesString) => {
  if (imagesString) {
    return JSON.parse(imagesString);
  } else {
    return [];
  }
};
