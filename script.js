var video = document.querySelector("#video");
var startRecord = document.querySelector("#startRecord");
var stopRecord = document.querySelector("#stopRecord");
var downloadLink = document.querySelector("#downloadLink");

window.onload = async function(){
  startRecord.style.backgroundColor = "green";
  stopRecord.style.display = "none";
  videoStream = navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
  video.srcObject = videoStream;
}

startRecord.onclick = async function(){
  startRecord.style.display = "none";
  stopRecord.style.display = "inline";
  stopRecord.style.backgroundColor = "red";
  const videoStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true, controller: true, systemAudio: true });
  video.srcObject = videoStream;

  mediaRecorder = new MediaRecorder(videoStream);

  let blob = [];
  mediaRecorder.addEventListener('dataavailable', function(e){
    blob.push(e.data);
  });

  mediaRecorder.addEventListener('stop', function(){
    var videoLocal = URL.createObjectURL(new Blob (blob));
    downloadLink.href = videoLocal;
  });

  mediaRecorder.start();
}

stopRecord.onclick = function(){
  startRecord.style.display = "inline";
  startRecord.style.backgroundColor = "green";
  stopRecord.style.display = "none";
  mediaRecorder.stop();
}
