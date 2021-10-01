var plane = document.getElementById("plane");
var wing = document.getElementById("wing");

function moveinFrame() {
    plane.classList.remove("flyofFrame")
    plane.classList.add("moveinFrame");
    wing.classList.add("movewings");
    wing.classList.remove("flywings");
}

function flyoutFrame() {
    plane.classList.remove("moveinFrame");
    wing.classList.remove("movewings");
    plane.classList.add("flyofFrame");
    wing.classList.add("flywings");
    document.querySelector('.plane').style.left = "0px";
    document.querySelector('.wing').style.left = "53px";
}

function playAnimation() {
    moveinFrame();
    setTimeout(flyoutFrame, 4400);
    document.querySelector('.plane').style.left = "-60px";
    document.querySelector('.wing').style.left = "-16px";
}

setInterval(playAnimation, 11000);