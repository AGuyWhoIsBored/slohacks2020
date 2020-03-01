
/* all of the JS related to implementing the betonmemes program */

// How to stream webcam: https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm
// activate the webcam stream
var video = document.querySelector("#webcamVideoStream");
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) { video.srcObject = stream; })
.catch(function () { console.log("Something went wrong!"); }); }
const facedetect = require('./js/facedetect.js');

// trigger screenshot of webcam stream to pass to vision API
const btn = document.querySelector('#saveScreenshotButton');
btn.disabled = false;
btn.onclick = e => {
  takeASnap().then(download);
};

async function takeASnap(){
    const canvas = document.createElement('canvas'); // create a canvas
    const ctx = canvas.getContext('2d'); // get its context
    canvas.width = video.videoWidth; // set its size to the one of the video
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0,0); // the video
    return new Promise((res, rej)=>{
        canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
    });
}

var faces;
// download screenshot that was taken 
async function download(blob){
    // uses the <a download> to download a Blob
    let a = document.createElement('a'); 
    a.href = URL.createObjectURL(blob);
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
        var base64data = reader.result.split(',')[1];
        var bufferData = Buffer.from(base64data,'base64')
        facedetect.detectFaces(bufferData).then(faceData => faces = faceData);
    }
}

async function snapdownload(){
    takeASnap().then(download);
}

async function main2(){
    setTimeout(main2,1000);
    await snapdownload().then(() => {
        var i;
        console.log(faces);
        if(faces.length >0){
            faces.sort(function(a,b){return (a.boundingPoly.vertices[0]-b.boundingPoly.vertices[0]);});
        }
        for (i=0; i<faces.length; i++) {
            console.log("Person "+ (i+1) + " Joy: " + faces[i].joyLikelihood);
            if (faces[i].joyLikelihood !="VERY_UNLIKELY"  && faces[i].joyLikelihood !="UNLIKELY"){
                console.log("Person " + (i+1) + " is LAUGHING" );
                return i;
            }
        }
    }).catch();
}

