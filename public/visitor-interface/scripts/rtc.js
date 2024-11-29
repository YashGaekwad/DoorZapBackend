let localStream;
let remoteStream;

export async function startCall() {
  try {
    const localVideo = document.getElementById("localVideo");
    const remoteVideo = document.getElementById("remoteVideo");
    const statusOverlay = document.getElementById("statusOverlay");
    const statusText = document.getElementById("statusText");

    // Get local media stream
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    if (localVideo) {
      localVideo.srcObject = localStream; // Assign local stream to the video element
    }

    console.log("Local video stream started!");

    // Simulate WebRTC setup and wait for remote stream
    if (statusOverlay && statusText) {
      statusText.textContent = "Connecting...";
      statusOverlay.style.display = "flex"; // Show connecting message
    }

    // Simulated delay for remote stream (Replace with real WebRTC signaling logic)
    setTimeout(() => {
      remoteStream = localStream; // Simulate remote stream (use real signaling in production)
      if (remoteVideo) {
        remoteVideo.srcObject = remoteStream; // Assign remote stream to the video element
        console.log("Remote video stream started!");
      }

      // Hide connecting overlay
      if (statusOverlay) {
        statusOverlay.style.display = "none";
      }
    }, 2000); // Simulated 2-second delay for remote stream
  } catch (error) {
    console.error("Error starting the video call:", error);
    alert("Error starting video call. Please check your camera and microphone permissions.");
  }
}


// export async function startCall() {
//   try {
//     const localVideo = document.getElementById("localVideo");
//     const remoteVideo = document.getElementById("remoteVideo");

//     const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

//     if (localVideo) {
//       localVideo.srcObject = localStream; // Assign the stream to the local video element
//     }

//     console.log("Video call started!");

//     // Placeholder logic for remote video (simulate incoming video)
//     setTimeout(() => {
//       if (remoteVideo) {
//         remoteVideo.srcObject = localStream; // Simulate remote video
//       }
//     }, 1000); // Simulate a delay for remote video
//   } catch (error) {
//     console.error("Error starting video call:", error);
//     alert("Error starting video call. Please check your camera and microphone permissions.");
//   }
// }

export function endCall() {
  console.log("Ending call...");
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop()); // Stop all tracks
    console.log("Local video stream stopped.");
  }
  const localVideo = document.getElementById("localVideo");
  if (localVideo) {
    localVideo.srcObject = null; // Clear the video element
  }

  // Redirect to "Thanks" page
  window.location.href = "/thanks";
}

