function esLaunch(){
    // document.getElementById("launchInstruct").style.display = 'none'
    document.getElementById("launchInstruct").innerHTML = '<p>Great!! You understood the concept <br> Lets move ahead</br></p> <h2 id="next-stage" onclick="nextStage()">NEXT</h2>'
    document.getElementById("next-stage").style.display = 'flex';
    // document.getElementById("div1").style.display = 'none';
    // document.getElementById("div2").style.display = 'none';
    // document.getElementById("div3").style.display = 'none';
    document.getElementById("rightAns").style.display = 'block';
    var video = document.getElementById("rocketVideo");
    video.style.display = "block";
    video.play();
    if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    }  
    video.addEventListener('ended', function() {
        video.style.display = "none";
        video.mozFullScreen = false;
        video.webkitFullScreen = false;
    })
}

function eLaunch(){
    document.getElementById("launchInstruct").innerHTML = '<img class="path" src="../img/ellipse.png"/><p><h3>Oopps,this is wrong!!</h3>The orbit of the satellite is an ellipse with a point of projection as an apogee and Earth at one of the foci. During this elliptical path, if the satellite passes through the atmosphere of Earth, it experiences a non-conservative force of air resistance. As a result, it loses energy and spirals down to Earth.</p>'
}

function pLaunch(){
    document.getElementById("launchInstruct").innerHTML = '<img class="path" src="../img/hyperbola.png"/><p><h3>Oopps,this is wrong!!</h3>The satellite escapes from the gravitational influence of Earth traversing a hyperbolic path</p>'
}

function nextStage() {
    location.href = "../index.html";
};

// function randomBtn() {
//     console.log("Clicked Random")
//     var elems = {1:`<button class="btn" id="btn1" onclick="esLaunch()">11.6</button>`,
//     2:`<button class="btn" id="btn2" onclick="eLaunch()">9.5</button>`,
//     3:`<button class="btn" id="btn3" onclick="pLaunch()">4</button>`};
//     if (elems.length) {
//         var keep = Math.floor(Math.random() * elems.length);
//         for (var i = 0; i < elems.length; ++i) {
//             if (i !== keep) {
//                 document.getElementById("div"+i).append(elems.i)
//             }
//         }
//     }
// }
// window.onload = function() {
//     randomBtn();
//   };