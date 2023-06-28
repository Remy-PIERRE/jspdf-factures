export default class Model {
  constructor() {
    this.data = [];
    this.current;
    this.select;
    this.submit;
    this.create;
    this.reset;
    this.post;
  }

  populateSelect() {
    this.select.innerHTML = `<option value="null"> - - - </option>`;
    this.select.innerHTML += `${this.data.map(
      (data) => `<option value=${data.id}>${data.name}</option>`
    )}`;
  }

  getSelectValue() {
    if (this.current && this.current.id === this.select.value) return;
    if (this.select.value === "null")
      return { message: "Please select a model" };
    else {
      this.current = this.data.find((data) => data.id === this.select.value);
      return this.select.value;
    }
  }

  openModal(event) {
    event.preventDefault();
    this.modal.classList.toggle("hidden");
  }

  closeModal(event = undefined) {
    if (event) {
      event.preventDefault();
      if ([...event.target.classList].includes("category__modal__wrapper"))
        this.modal.classList.toggle("hidden");
    } else this.modal.classList.toggle("hidden");
  }

  resetForm(event) {
    event.preventDefault();
    this.modalForm.reset();
  }

  getFormValues() {
    const values = this.getValues();
    console.log("getValues()", values);
    const checkedValues = this.verifyValues(values);
    console.log("checkedValues", checkedValues);

    if (!checkedValues) return { message: "Error completing form" };
    else return values;
  }

  getValues() {
    const formValues = {};
    [...this.modalForm.children].forEach((child) => {
      /* */
      if (child.className === "category__modal__input") {
        const input = child.querySelector("input");
        formValues[input.name] = input.value;
      }
      /* */
      if (child.className === "category__modal__inputs") {
        const inputs = [...child.querySelectorAll("input")];
        const values = inputs.map((input) => input.value);
        const filteredValues = values.filter((value) => value !== "");
        formValues[child.dataset.subcategory] = [...filteredValues];
      }
      /* */
    });

    return formValues;
  }

  verifyValues(values) {
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === "string" && value === "") return false;
      else if (Array.isArray(value) && value.length === 0) return false;
    }

    return true;
  }
}
