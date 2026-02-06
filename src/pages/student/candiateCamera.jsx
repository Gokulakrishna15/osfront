import { useEffect, useRef } from "react";

const CandidateCamera = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Asking for webcam + mic access
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Error accessing webcam:", err));
  }, []);

  return (
    <video ref={videoRef} autoPlay playsInline className="w-80 h-60 border rounded-md" />
  );
};

export default CandidateCamera;
