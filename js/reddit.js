// methods to grab memes from reddit

fetch('https://www.reddit.com/r/memes/top.json?sort=top&t=day&limit=20')
.then(res => res.json())
.then(res => res.data.children)
.then(res => res.map(post => ({
  author: post.data.author,
  link: post.data.url,
  img: post.data.thumbnail,
  title: post.data.title
})))
.then(res => res.map(render))

var slideIndex = 1;

// Next/previous controls
function plusSlides(n) { showSlides(slideIndex += n); }
  
// Thumbnail image controls
function currentSlide(n) { showSlides(slideIndex = n); }
  
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) { slides[i].style.display = "none"; }
    for (i = 0; i < dots.length; i++) { dots[i].className = dots[i].className.replace(" active", ""); }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// incrementing and decrementing slides
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == '37') { plusSlides(-1) /* left <- show Prev image*/ } 
    else if (e.keyCode == '39') { plusSlides(1) /* right -> show next image */ }
}

// rendering images from source
const render = post => {
    const node = document.createElement('div');
    node.className = 'mySlides fade';
    node.style = "display: none;"
    node.innerHTML = `<img src="${post.link}" style="width: 400px; height: 600px;"/>`;
    document.getElementById('memeDiv').appendChild(node);
    const dots = document.createElement('span');
    dots.className = "dot";
    document.getElementById('meme-dots').appendChild(dots);
    showSlides(slideIndex);
}

// for meme rotations
var memeTimerHandle = null;
function startMemeRotation(interval) { memeTimerHandle = setInterval(plusSlides, interval, 1); }
function stopMemeRotation() { if (memeTimerHandle) clearInterval(memeTimerHandle); }