//  Not finished because you can have the web cam on one end point
//  and the screen capture on another.

//  Webcam
var video = document.querySelector("#video");
var startRecord = document.querySelector("#startRecord");
var stopRecord = document.querySelector("#stopRecord");
var downloadLink = document.querySelector("#downloadLink");

//  Screen
var video_screen = document.querySelector("#video_screen");
var startRecord_screen = document.querySelector("#startRecord_screen");
var stopRecord_screen = document.querySelector("#stopRecord_screen");
var downloadLink_screen = document.querySelector("#downloadLink_screen");


window.onload = async function(){
  startRecord.style.backgroundColor = "green";
  stopRecord.style.display = "none";
  downloadLink.style.display = "none";
  videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  video.srcObject = videoStream;
}

startRecord.onclick = function(){
  startRecord.style.display = "none";
  stopRecord.style.display = "inline";
  stopRecord.style.backgroundColor = "red";
  downloadLink.style.display = "None";
  mediaRecorder = new MediaRecorder(videoStream);

  let blob = [];
  mediaRecorder.addEventListener('dataavailable', function(e){
    blob.push(e.data);
  })

  mediaRecorder.addEventListener('stop', function(){
    var videoLocal = URL.createObjectURL(new Blob (blob));
    downloadLink.href = videoLocal;
    downloadLink.style.display = "inline";
  })

  mediaRecorder.start();
}

stopRecord.onclick = function(){
  startRecord.style.display = "inline";
  startRecord.style.backgroundColor = "green";
  stopRecord.style.display = "none";
  mediaRecorder.stop();
}
