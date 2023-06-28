export default class Category {
  constructor(name = undefined) {
    this.name = name;
    this.data;
    this.body;
    this.select;
    this.create;
    this.modal;
    this.form;
    this.reset;
    this.post;
  }

  populateSelect() {
    /* TODO - correction data.data.name to data.name after postData completed */
    this.select.innerHTML = `<option value="null"> - - - </option>`;
    // this.select.innerHTML += `${this.data.map(
    //   (data) => `<option value=${data.id}>${data.data.name}</option>`
    // )}`;
    this.select.innerHTML += `${this.data.map(
      (data) =>
        `<option value=${data.id || data.name}>${
          data.name || `${data.id} - ${data.date}`
        }</option>`
    )}`;
  }

  remove() {
    this.body.remove();
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
    this.form.reset();
  }

  getSelectedData() {
    const value = this.select.value;
    console.log("select value", value);
    if (value === "null") return;
    console.log("this.data", this.data);
    const dataSelected = this.data.find(
      (data) => data.id === value || data.name === value
    );

    return dataSelected;
  }

  getFormValues() {
    const values = this.getValues();
    const checkedValues = this.verifyValues(values);
    console.log("checkedValues", checkedValues);

    if (!checkedValues) return { message: "Error completing form" };
    else return values;
  }

  getValues() {
    const formValues = {};
    [...this.form.children].forEach((child) => {
      /* */
      if (child.className === "category__modal__input") {
        const input = child.querySelector("input");
        formValues[input.name] = input.value;
      } else if (
        /* */
        child.className === "category__modal__inputs" &&
        child.dataset.typeofvalue === "array"
      ) {
        const inputs = [...child.querySelectorAll("input")];
        const values = inputs.map((input) => input.value);
        formValues[child.dataset.subcategory] = values;
      } else if (
        /* */
        child.className === "category__modal__inputs" &&
        child.dataset.typeofvalue === "object"
      ) {
        const inputs = [...child.querySelectorAll("input")];
        const values = inputs.map((input) => {
          return { key: input.name, value: input.value };
        });
        const filteredValues = Object.assign(
          {},
          ...values.map((item) => ({ [item.key]: item.value }))
        );
        formValues[child.dataset.subcategory] = filteredValues;
      } else if (
        /* */
        [...child.classList].includes("category__modal__inputs") &&
        child.dataset.typeofvalue === "arrayofobject"
      ) {
        const childValues = [];
        [...child.children].forEach((childInputs) => {
          const inputs = [...childInputs.querySelectorAll("input")];
          const values = inputs.map((input) => {
            return { key: input.name, value: input.value };
          });
          const filteredValues = Object.assign(
            {},
            ...values.map((item) => ({ [item.key]: item.value }))
          );
          if (!Object.values(filteredValues).includes("")) {
            childValues.push(filteredValues);
          }
        });
        formValues[child.dataset.subcategory] = childValues;
      } else if (
        /* */
        child.className === "category__modal__inputs" &&
        !child.dataset.typeofvalue
      ) {
        const inputs = [...child.querySelectorAll("input")];
        inputs.forEach((input) => {
          formValues[input.name] = input.value;
        });
      }
    });

    return formValues;
  }

  verifyValues(values) {
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === "string" && value === "") return false;
      else if (
        Array.isArray(value) &&
        typeof value[0] === "string" &&
        value.find((val) => val === "")
      )
        return false;
      else if (
        Array.isArray(value) &&
        typeof value[0] === "object" &&
        value.find((val) => [...Object.values(val)].includes(""))
      ) {
        return;
      } else if (
        typeof value === "object" &&
        Object.values(value).find((val) => val === "")
      )
        return false;
    }

    return true;
  }
}
