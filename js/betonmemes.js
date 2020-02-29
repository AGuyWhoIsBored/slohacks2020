
/* all of the JS related to implementing the betonmemes program */

//activate the webcam stream
var video = document.querySelector("#webcamVideoStream");
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) { video.srcObject = stream; })
.catch(function () { console.log("Something went wrong!"); }); }