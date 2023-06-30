import Model from "../../classes/Model.js";
import { handleModelEvents } from "./events.js";

const MODEL_ID = "model";
const model = new Model(MODEL_ID);

const initModel = async () => {
  await model.getData();

  handleModelEvents(model);
};

export { initModel, model };
