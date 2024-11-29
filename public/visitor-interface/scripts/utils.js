export function logDebug(message) {
    console.debug(`[DEBUG]: ${message}`);
  }
  
  export function showOverlay(message) {
    const statusOverlay = document.getElementById("statusOverlay");
    const statusText = document.getElementById("statusText");
  
    if (statusOverlay && statusText) {
      statusText.textContent = message;
      statusOverlay.style.display = "flex";
    }
  }
  
  export function hideOverlay() {
    const statusOverlay = document.getElementById("statusOverlay");
    if (statusOverlay) {
      statusOverlay.style.display = "none";
    }
  }
  