var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var img = new Image();
img.src = './img/walk2.png';
function Person() {
    var _this = this;
    this.x = 15;
    this.y = 790;
    this.pathX = 0.8;
    this.pathY = 0;
    this.vy = 0;
    this.g = 10;
    this.ty = 0;
    this.vx = 0;
    this.tx = 0;
    this.f = 7.5;
    this.m = 1;
    this.startY = _this.y;
    this.startX = _this.x;
    this.jump = 0;
    this.jumpTime = 0;
    this.draw = function () {
        ctx.beginPath();
        ctx.drawImage(img,img.width * _this.pathX,_this.pathY * img.height,img.width * 0.2,img.height / 4,_this.x,_this.y,15,15);
    };
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:{
                if(_this.vy == 0) {
                    if(_this.pathY != 0.25) {
                        _this.pathY = 0.25;
                    }
                    _this.pathX += 0.2;
                    if(_this.pathX == 1) {
                        _this.pathX = 0;
                    }
                }
                if(_this.vy) {
                    if(_this.pathY != 0.75) {
                        _this.pathY = 0.75;
                    }
                }
                if(_this.vx > 0) {
                    _this.vx = 0;
                    _this.tx = 0;
                    _this.startX = _this.x;
                }
                else {
                    _this.vx = -15;
                    _this.tx = 0;
                    _this.startX = _this.x;
                }
            }break;
            case 39:{
                if(_this.vy == 0) {
                    if(_this.pathY != 0) {
                        _this.pathY = 0;
                    }
                    _this.pathX += 0.2;
                    if(_this.pathX == 1) {
                        _this.pathX = 0;
                    }
                }
                if(_this.vy) {
                    if(_this.pathY != 0.5) {
                        _this.pathY = 0.5;
                    }
                }
                if(_this.vx < 0) {
                    _this.vx = 0;
                    _this.tx = 0;
                    _this.startX = _this.x;
                }
                else {
                    _this.vx = 15;
                    _this.tx = 0;
                    _this.startX = _this.x;
                }
            }break;
            case 16:{
                if(_this.pathY == 0.25) {
                    _this.pathY = 0.75;
                }
                if(_this.pathY == 0) {
                    _this.pathY = 0.5;
                }
                if(_this.jumpTime < 2) {
                    _this.pathX = 0;
                    _this.vy = 30;
                    _this.jump = 1;
                    _this.ty = 0;
                    _this.startY = _this.y;
                    _this.jumpTime++;
                }
            }
        }
    };
}