import { endCall } from "./rtc.js";

export function setupControls() {
  const endCallButton = document.getElementById("endCallButton");

  if (!endCallButton) {
    console.error("End Call button not found in the DOM.");
    return;
  }

  endCallButton.addEventListener("click", () => {
    console.log("End Call button clicked.");
    endCall();
  });
}
