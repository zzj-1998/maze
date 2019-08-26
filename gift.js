var gift = new Image();
gift.src = './img/gift.png';
var win = new Image();
win.src = './img/win.png';
var end = new Image();
end.src = './img/end.png';
function Gift() {
    var _this = this;
    this.x = 990;
    this.y = 15;
    this.pathX = 1;
    this.pathY = 0;
    this.time = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.drawImage(gift,_this.x,_this.y,60,30);
    };
    this.drawWin = function (time) {
        if(time) {
            _this.time = time;
        }
        ctx.clearRect(0,0,cvs.width,cvs.height);
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(0,0,cvs.width,cvs.height);
        ctx.fill();
        ctx.beginPath();
        ctx.drawImage(win,_this.pathX * win.width / 6,_this.pathY * win.height / 4,win.width / 6,win.height / 4,312.5,177.5,500,500);
        _this.pathX++;
        if(_this.pathX == 6) {
            _this.pathX = 0;
            _this.pathY++;
        }
        if(_this.pathY != 4) {
            setTimeout(_this.drawWin,100);
        }
        else {
            pauseMusic();
            ctx.clearRect(0,0,cvs.width,cvs.height);
            ctx.beginPath();
            ctx.drawImage(end,0,0,cvs.width,cvs.height);
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.font = 'oblique small-caps 900 30px arial';
            ctx.fillText("所用时间" + _this.time + "s",450,800);
        }
    }
}