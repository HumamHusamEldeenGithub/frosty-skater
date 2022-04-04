// You can also set which camera to use (front/back/etc)
// @SEE https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
navigator.mediaDevices
  .getUserMedia({ audio: false, video: true })
  .then((stream) => {
    var video = document.querySelector("video");
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  });
