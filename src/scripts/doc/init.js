import { handleShowDoc, handleSaveDoc } from "./events.js";

const initDoc = () => {
  const wrapperElement = document.querySelector("#docWrapper");
  if (![...wrapperElement.classList].includes("hidden")) return;

  wrapperElement.classList.toggle("hidden");

  const showElement = wrapperElement.querySelector("button[data-type=show]");
  const saveElement = wrapperElement.querySelector("button[data-type=save]");

  showElement.addEventListener("click", handleShowDoc);
  saveElement.addEventListener("click", handleSaveDoc);
};

export { initDoc };
