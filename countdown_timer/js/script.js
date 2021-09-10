var endDate = '25 December 2021';
var days = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;
var changedBg = false;

function countDown() {
    var currentDate = new Date();
    var newDate = new Date(endDate);
    
    var totalSeconds = (newDate - currentDate) / 1000;
    days = Math.floor((totalSeconds / 3600) / 24);
    hours = Math.floor((totalSeconds / 3600) % 24);
    minutes = Math.floor((totalSeconds / 60) % 60);
    seconds = Math.floor(totalSeconds % 60);
        
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = formatTimer(hours);
    document.getElementById("mins").innerHTML = formatTimer(minutes);
    document.getElementById("secs").innerHTML = formatTimer(seconds);
        
    document.getElementById("btn").onclick = function() {
        if ( ! changedBg) {
            document.body.style.backgroundImage = "none";
            document.body.style.backgroundImage = "url('../countdown_timer/img/destination.jpg')";
            document.body.style.backgroundSize = "cover";
            document.getElementById("footnote").innerHTML = "Image By: Gerson Repreza"
            document.getElementById("footnote").style.color = "#fff";
            document.getElementById("text").innerHTML = "Reload";
            changedBg = true;
        }
        else {
            changedBg = false;
            location.reload();
        }
    }
    
}

//append 0 to single digit numbers for hours, mins, secs
function formatTimer(time) {
    return ('0' + time).slice(-2);
}

//timer
setInterval(countDown, 1000);
