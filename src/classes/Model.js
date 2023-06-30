import { getDataFromJson, getDataFromDB } from "../scripts/data/getData.js";
import { SRC_MODEL } from "../utils/app-config.js";
import { postData } from "../scripts/data/postData.js";

export default class Model {
  constructor(thisID) {
    this.id = thisID;
    this.body = document.querySelector(`#${thisID}`);
    this.form = document.querySelector(`#${thisID}Form`);
    this.select = this.form.querySelector("select");
    this.submit = this.form.querySelector("button[type=submit]");
    this.create = this.form.querySelector("button[data-type=create]");
    this.modal = document.querySelector(`#${thisID}Modal`);
    this.modalForm = this.modal.querySelector("form");
    this.reset = this.modalForm.querySelector("button[type=reset]");
    this.post = this.modalForm.querySelector("button[type=submit]");
    this.title = document.querySelector(`#${thisID}Title`);

    // console.log(
    //   this.id,
    //   this.body,
    //   this.form,
    //   this.select,
    //   this.submit
    //   this.create,
    //   this.modal,
    //   this.modalForm,
    //   this.reset,
    //   this.post
    //   this.title
    // );
  }

  async getData() {
    let data;

    switch (SRC_MODEL) {
      case "json":
        data = await getDataFromJson(this.id);
        this.data = [...data];
        break;
      case "DB":
        data = await getDataFromDB(this.id);
        this.data = [...data];
        break;
      default:
        return console.log("Error fetching data (/classes/Model.js - getData)");
    }

    this.populateSelectWithData();
  }

  populateSelectWithData() {
    this.select.innerHTML = `<option value="null"> - - - </option>`;
    this.select.innerHTML += `${this.data.map(
      (data) => `<option value=${data.id}>${data.name}</option>`
    )}`;
  }

  getSelectedCategories() {
    if (this.select.value === "null")
      return console.log("Please select a model.");
    else if (this.current && this.current.id === this.select.value) return;
    else {
      this.current = this.data.find((data) => data.id === this.select.value);
      return this.current.categories;
    }
  }

  initTitle() {
    if ([...this.title.classList].includes("hidden"))
      this.title.classList.toggle("hidden");

    this.title.innerHTML = "";
    this.title.innerHTML += `Création du PDF ${this.current.name}`;
  }

  handleOpenModal(event) {
    event.preventDefault();
    this.modal.classList.toggle("hidden");
  }

  handleCloseModal(event = undefined) {
    if (event) {
      event.preventDefault();
      if ([...event.target.classList].includes("category__modal__wrapper"))
        this.modal.classList.toggle("hidden");
    } else this.modal.classList.toggle("hidden");
  }

  handleResetForm(event) {
    event.preventDefault();
    this.modalForm.reset();
  }

  async handlePostData(event) {
    event.preventDefault();

    const data = this.getFormValues();
    const isValidValues = this.checkValues(data);

    if (!isValidValues) {
      return console.log("Please complete all inputs.");
    } else {
      await postData(this.id, data);
      this.resetAndInitDataAndSelect();
    }
  }

  resetAndInitDataAndSelect() {
    this.handleCloseModal();
    this.getData();
  }

  getFormValues() {
    const data = {};

    const inputsGroups = [...this.modalForm.children];
    for (const inputsGroup of inputsGroups) {
      switch (inputsGroup.dataset.type) {
        case "single":
          const input = inputsGroup.querySelector("input");
          data[input.name] = input.value;
          break;
        case "array":
          const inputs = [...inputsGroup.querySelectorAll("input")];
          const values = inputs.map((input) => input.value);
          data[inputsGroup.dataset.subname] = [
            ...values.filter((value) => value !== ""),
          ];
          break;
      }
    }

    return data;
  }

  checkValues(data) {
    for (const value of Object.values(data)) {
      if (typeof value === "string" && value === "") return false;
      else if (Array.isArray(value) && value.length === 0) return false;
    }

    return true;
  }
}
