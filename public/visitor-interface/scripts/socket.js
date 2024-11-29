import { peerConnection } from "./rtc.js";

export const socket = io("http://localhost:3000");

export function setupSocketListeners() {
  socket.on("offer", async ({ from, offer }) => {
    console.log("Offer received:", offer);
    await peerConnection.setRemoteDescription(offer);

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit("answer", { to: from, answer });
  });

  socket.on("answer", async ({ answer }) => {
    console.log("Answer received:", answer);
    await peerConnection.setRemoteDescription(answer);
  });

  socket.on("ice-candidate", async ({ candidate }) => {
    console.log("ICE Candidate received:", candidate);
    await peerConnection.addIceCandidate(candidate);
  });
}
