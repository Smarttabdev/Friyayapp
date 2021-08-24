export const getCardIconImage = cardType => {
  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/images/cardTypes/${cardType}.png`;
  return url;
};
