
/* all of the JS related to implementing the betonmemes program */

// activate the webcam stream
var video = document.querySelector("#webcamVideoStream");
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) { video.srcObject = stream; })
.catch(function () { console.log("Something went wrong!"); }); }


// trigger screenshot and download of webcam stream to pass to vision API
const btn = document.querySelector('button');
btn.disabled = false;
btn.onclick = e => {
  takeASnap().then(download);
};

function takeASnap(){
    const canvas = document.createElement('canvas'); // create a canvas
    const ctx = canvas.getContext('2d'); // get its context
    canvas.width = video.videoWidth; // set its size to the one of the video
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0,0); // the video
    return new Promise((res, rej)=>{
        canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
    });
}

function download(blob){
    // uses the <a download> to download a Blob
    let a = document.createElement('a'); 
    a.href = URL.createObjectURL(blob);
    a.download = 'screenshot.jpg';
    document.body.appendChild(a);
    a.click();
}