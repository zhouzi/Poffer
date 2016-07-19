export default function openPopup (url) {
  const width = 400;
  const left = Math.round((window.outerWidth / 2) - (width / 2));

  const height = 600;
  const top = Math.round((window.outerHeight / 2) - (height / 2));

  window.open(url, '', `width=${width}, height=${height}, left=${left}, top=${top}`);
};
