import { startCall } from "./rtc.js";

export function setupFormHandler() {
  const visitorForm = document.getElementById("visitorForm");
  const formContainer = document.getElementById("form-container");
  const videoContainer = document.querySelector(".video-container");

  if (!visitorForm) {
    console.error("Visitor form not found in the DOM.");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const visitorId = urlParams.get("visitorId");

  if (!visitorId) {
    console.error("Visitor ID is missing from the URL.");
    alert("Invalid visitor. Please use the correct link.");
    return;
  }


  visitorForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    console.log("Knock Knock clicked, hiding form and starting video call...");

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (!name || !phone) {
      alert("Please fill in both name and phone fields.");
      return;
    }

     // API call to save visitor data
     try {
      const response = await fetch(`/api/visitors/visit/${visitorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone }),
      });

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`);
      }

      console.log("Visitor data saved successfully.");
    } catch (error) {
      console.error("Error saving visitor data:", error);
      alert("Failed to save visitor data. Please try again.");
      return; // Stop further actions if the API call fails
    }

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
