export function setFontSize() {
  const FS = Number(localStorage.getItem("FS"));
  if (FS) document.documentElement.style.fontSize = `${FS}px`;
}
