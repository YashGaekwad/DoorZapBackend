import { setupFormHandler } from "./form.js";
import { setupControls } from "./controls.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing application...");
  setupFormHandler();
  setupControls();
});
