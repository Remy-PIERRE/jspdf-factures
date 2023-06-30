import {
  getDataFromHTML,
  getDataFromJson,
  getDataFromDB,
} from "../scripts/data/getData.js";
import { SRC_CATEGORIES } from "../utils/app-config.js";
import { postData } from "../scripts/data/postData.js";

export default class Category {
  constructor(thisID) {
    this.id = thisID;
  }

  async getHTMLElements() {
    const htmlData = await getDataFromHTML(this.id);

    this.body = htmlData.querySelector(`#${this.id}`);
    this.form = htmlData.querySelector(`#${this.id}Form`);
    this.select = this.form.querySelector("select");
    this.create = this.form.querySelector("button[data-type=create]");
    this.modal = htmlData.querySelector(`#${this.id}Modal`);
    this.modalForm = this.modal.querySelector("form");
    this.reset = this.modalForm.querySelector("button[type=reset]");
    this.post = this.modalForm.querySelector("button[type=submit]");

    // console.log(
    //   this.id,
    //   this.body,
    //   this.form,
    //   this.select,
    //   this.create,
    //   this.modal,
    //   this.modalForm,
    //   this.reset,
    //   this.post
    // );
  }

  async getData() {
    let data;

    switch (SRC_CATEGORIES) {
      case "json":
        data = await getDataFromJson(this.id);
        this.data = [...data];
        break;
      case "DB":
        data = await getDataFromDB(this.id);
        this.data = [...data];
        break;
      default:
        return console.log(
          "Error fetching data (/classes/Category.js - getData)"
        );
    }

    this.populateSelectWithData();
  }

  populateSelectWithData() {
    this.select.innerHTML = `<option value="null"> - - - </option>`;
    this.select.innerHTML += `${this.data.map(
      (data) => `<option value=${data.id}>${data.name || data.id}</option>`
    )}`;
  }

  remove() {
    this.body.remove();
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
    console.log("data categories after submit", data);

    const isValidValues = this.checkValues(data);
    console.log("checkValues", isValidValues);

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
        case "single": {
          const input = inputsGroup.querySelector("input");
          const [key, value] = this.getSingleValue(input);
          data[key] = value;
          break;
        }
        case "array": {
          const key = inputsGroup.dataset.name;
          const values = this.getArrayValues(inputsGroup);
          data[key] = values;
          break;
        }
        case "object": {
          const key = inputsGroup.dataset.name;
          const inputs = [...inputsGroup.querySelectorAll("input")];
          const value = this.getObjectValue(inputs);
          if (value) data[key] = value;
          break;
        }
      }
    }

    if (!data.id) {
      data["id"] = data.name.replace(" ", "_");
    } else data.id = data.id.replace(" ", "_");

    return data;
  }

  getSingleValue(input) {
    const key = input.name;
    const value = input.value;

    return [key, value];
  }

  getArrayValues(inputsGroup) {
    const array = [];
    const subInputsGoup = [...inputsGroup.children];

    for (const subInputsGoupChild of subInputsGoup) {
      switch (subInputsGoupChild.dataset.type) {
        case "single": {
          const input = subInputsGoupChild.querySelector("input");
          const [key, value] = this.getSingleValue(input);
          array.push(value);
          break;
        }
        case "object": {
          const inputs = [...subInputsGoupChild.querySelectorAll("input")];
          const value = this.getObjectValue(inputs);
          if (value) array.push(value);
          break;
        }
      }
    }

    return array;
  }

  getObjectValue(inputs) {
    const object = {};

    for (const input of inputs) {
      if (input.value === "") return;
      else object[input.name] = input.value;
    }

    return object;
  }

  checkValues(data) {
    for (const value of Object.values(data)) {
      if (typeof value === "string" && value === "") return false;
      else if (Array.isArray(value) && value.length === 0) return false;
      else if (Array.isArray(value) && typeof value[0] === "object") {
        for (const object of value) {
          for (const val of Object.values(object)) {
            if (val === "") return false;
          }
        }
      }
    }

    return true;
  }

  getSelectedData() {
    const value = this.select.value;
    console.log("select value", this.id, value);
    if (value === "null") return;
    console.log("this.data", this.data);
    const dataSelected = this.data.find(
      (data) => data.id === value || data.name === value
    );
    console.log("dataSelected", dataSelected);
    return dataSelected;
  }
}
