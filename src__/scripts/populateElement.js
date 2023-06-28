const populateSelectElementWithData = (element, data) => {
  element.innerHTML = `<option value="null"> - - - </option>`;
  element.innerHTML += `${data.map(
    (option) => `<option value=${option.id}>${option.name}</option>`
  )}`;
};

/* */
/* */
/* */
export { populateSelectElementWithData };
