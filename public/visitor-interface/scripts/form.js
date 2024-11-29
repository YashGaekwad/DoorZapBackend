import { startCall } from "./rtc.js";

export function setupFormHandler() {
  const visitorForm = document.getElementById("visitorForm");
  const formContainer = document.getElementById("form-container");
  const videoContainer = document.querySelector(".video-container");

  if (!visitorForm) {
    console.error("Visitor form not found in the DOM.");
    return;
  }

  visitorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Knock Knock clicked, hiding form and starting video call...");

    // Hide the form container
    if (formContainer) {
      formContainer.style.display = "none";
    }

    // Show the video container
    if (videoContainer) {
      videoContainer.style.display = "flex"; // Make the video container visible
    }

    // Start the video call
    startCall();
  });
}
