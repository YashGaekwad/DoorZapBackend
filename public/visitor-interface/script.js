const socket = io("http://localhost:3000"); // Connect to signaling server

let localStream;
let peerConnection;

const config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302", // STUN server
    },
  ],
};

async function startCall() {
  console.log("Attempting to access local media devices...");

  const localVideo = document.getElementById("localVideo");
  if (!localVideo) {
    console.error("localVideo element not found in the DOM");
    return;
  }

  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    console.log("Local media stream acquired.");
    localVideo.srcObject = localStream;

    peerConnection = new RTCPeerConnection(config);

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
      console.log(`Track added: ${track.kind}`);
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit("offer", { to: "USER_ID", offer }); // Replace "USER_ID" dynamically

    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        socket.emit("ice-candidate", { to: "USER_ID", candidate }); // Replace "USER_ID"
      }
    };

    peerConnection.ontrack = ({ streams }) => {
      document.getElementById("remoteVideo").srcObject = streams[0];
    };
  } catch (error) {
    console.error("Error starting call:", error);
  }
}

document.getElementById("visitorForm").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Knock Knock clicked, starting the call...");
  startCall();
});
