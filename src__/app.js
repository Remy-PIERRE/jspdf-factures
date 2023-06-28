import {
  getDataModels,
  populateModel,
  handleModelEvents,
} from "./scripts/handleModel.js";

initApp();

async function initApp() {
  await getDataModels();
  populateModel();
  handleModelEvents();
}
