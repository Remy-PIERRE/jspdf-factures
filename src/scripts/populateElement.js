/* add options on select element according to data + default value = "null" */
const populateSelect = (element, data) => {
  element.innerHTML += `<option value="null"> - - - </option>${data.map(
    (option) => `<option value=${option.id}>${option.name}</option>`
  )}`;
  return null;
};

export { populateSelect };
