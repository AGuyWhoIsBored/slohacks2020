
/* all of the JS related to implementing the betonmemes program */

// How to stream webcam: https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm
// activate the webcam stream
var video = document.querySelector("#webcamVideoStream");
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) { video.srcObject = stream; })
.catch(function () { console.log("Something went wrong!"); }); }

// trigger screenshot of webcam stream to pass to vision API
const btn = document.querySelector('#saveScreenshotButton');
btn.disabled = false;
btn.onclick = e => {
  takeASnap().then(download);
};

var seconds = 0;
setInterval(snapdownload,2000);

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

// download screenshot that was taken 
function download(blob){
    // uses the <a download> to download a Blob
    let a = document.createElement('a'); 
    a.href = URL.createObjectURL(blob);
    a.download = './screenshot.jpg';
    a.hidden = true;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
}
function savefile(blob){

}

function snapdownload(){
    takeASnap().then(savefile);
    incrementseconds();
    //save file
    facedetect //if facedetect returns 'Joy is not unlikely or very unlikely', then set happy to true
}

function incrementseconds(){
    seconds += 1;
}

happy = false;
while(!happy){
    snapdownload();
    if (facedetect != 'VERY_UNLIKELY' or 'UNLIKELY'){
        happy = true;
    }
}
    document.body.removeChild(a);

}
