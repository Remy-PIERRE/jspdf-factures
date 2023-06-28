const initTitle = (titleText) => {
  const titleElement = document.querySelector("#title");
  if ([...titleElement.classList].includes("hidden"))
    titleElement.classList.toggle("hidden");

  updateTitleText(titleElement, titleText);
};

/* */
/* */
/* */
const updateTitleText = (titleElement, titleText) => {
  titleElement.innerHTML = "";
  titleElement.innerHTML += `Création du PDF ${titleText}`;
};

/* */
/* */
/* */
export { initTitle };
