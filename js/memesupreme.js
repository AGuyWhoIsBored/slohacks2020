
/* all of the JS related to implementing the betonmemes program */

// declared variables that we need
var r = require('./js/reddit.js')
var player1Laughs = 0;
var player2Laughs = 0;
var video = document.querySelector("#webcamVideoStream");
var faces;
const joyConfidenceThreshold = 0.92;

// How to stream webcam: https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm
// activate the webcam stream
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) { video.srcObject = stream; })
.catch(function () { console.log("Something went wrong!"); }); }
const facedetect = require('./js/facedetect.js');

// trigger screenshot of webcam stream to pass to vision API
const btn = document.querySelector('#saveScreenshotButton');
btn.disabled = false;
btn.onclick = e => { snapSendVisionAPI(); };

async function takeASnap(){
    const canvas = document.createElement('canvas'); // create a canvas
    const ctx = canvas.getContext('2d'); // get its context
    canvas.width = video.videoWidth; // set its size to the one of the video
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0,0); // the video
    return new Promise((res, rej)=>{ canvas.toBlob(res, 'image/jpeg'); /* request a Blob from the canvas */ });
}

// submit canvas Blob to GCP Vision API using base64 enconding
async function sendToVisionAPI(blob){
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
        var base64data = reader.result.split(',')[1];
        var bufferData = Buffer.from(base64data,'base64')
        facedetect.detectFaces(bufferData).then(faceData => faces = faceData);
    }
}

async function snapSendVisionAPI(){ takeASnap().then(sendToVisionAPI); }

async function mainGameLoop(){
    await snapSendVisionAPI().then(() => {
        var i;
        console.log(faces);
        if(faces.length > 0) { faces.sort(function(a,b) { return (a.boundingPoly.vertices[0]-b.boundingPoly.vertices[0]);}); }
        for (i=0; i < faces.length; i++) {
            console.log("Person "+ (i+1) + " Joy: " + faces[i].joyLikelihood);
            if (faces[i].joyLikelihood === "VERY_LIKELY" && faces[i].detectionConfidence > joyConfidenceThreshold){
                console.log("Person " + (i+1) + " is LAUGHING" );
                stopRound();
                if (i === 0) // player one
                { player1Laughs += 1; togglePointImage(1, player1Laughs, false); }
                else if (i === 1) // player two
                { player2Laughs += 1; togglePointImage(2, player2Laughs, false); }
                checkGameEnd();
            }
        }
    }).catch();
}


// actual gameplay
function startRound(interval) 
{ 
    gameTimerHandle = setInterval(mainGameLoop, interval); 
    r.startMemeRotation(5000);
}
function stopRound() 
{ 
    if (gameTimerHandle) clearInterval(gameTimerHandle); 
    r.stopMemeRotation();
}

function checkGameEnd()
{
    if (player1Laughs === 5) 
    { 
        console.log("PLAYER2 WON!!!"); 
        document.getElementById("winText").innerText = "PLAYER 2 WON!!!"
        document.getElementById("winText").style.visibility = "visible";
    }
    if (player2Laughs === 5) 
    { 
        console.log("PLAYER1 WON!!!"); 
        document.getElementById("winText").innerText = "PLAYER 1 WON!!!"
        document.getElementById("winText").style.visibility = "visible";
    }
}

function resetGameState()
{
    stopRound();
    document.getElementById("winText").style.visibility = "hidden";
    player1Laughs = 0;
    player2Laughs = 0;
    for (i = 0; i < 5; i ++) { togglePointImage(1, i + 1, true); togglePointImage(2, i + 1, true); }
}

function togglePointImage(player, amount, hidden)
{
    var imageElement = document.getElementById(player + "." + amount);
    if (!hidden) imageElement.style.visibility = "visible";
    else { imageElement.style.visibility = "hidden"; }
}