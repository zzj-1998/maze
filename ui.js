var wrapper = document.getElementById('wrapper');
var divs = wrapper.getElementsByTagName('div');
var music = document.getElementById('music');
function playMusic() {
    music.play();
}
function pauseMusic() {
    music.pause();
    music.currentTime = 0;
}
function help() {
    for(var i = 0; i < divs.length; i++) {
        divs[i].style.visibility = "hidden";

    }
    wrapper.style.backgroundImage = 'url(./img/setHelp.png)';
    wrapper.onmouseup = function () {
        for(var i = 0; i < divs.length; i++) {
            divs[i].style.visibility = "visible";
        }
        if(gGame) {
            play.style.visibility = "hidden";
        }
        else {
            ret.style.visibility = "hidden";
        }
        wrapper.style.backgroundImage = 'url(./img/set.png)';
    }
}
function exit() {
    location.reload();
}
function retry() {
    gGame.flag = 1;
    gameStart();
}