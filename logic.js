var gGame = null;
var bg = new Image();
bg.src = './img/bg_start.png';
var play = document.getElementById('play');
var ret = document.getElementById('retry');
function ready() {
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.beginPath();
    ctx.drawImage(bg,0,0,cvs.width,cvs.height);
    ret.style.visibility = "hidden";
}
function gameStart() {
    play.style.visibility = "hidden";
    ret.style.visibility = "visible";
    playMusic();
    gGame = new Game();
    gGame.render();
    gGame.update();
}

function Game() {
    var _this = this;
    this.gameMap = null;
    this.person = null;
    this.gift = null;
    this.positionX = [];
    this.positionY = [];
    this.time = 0;
    this.flag = 0;
    this.render = function () {
        _this.person = new Person();
        _this.gameMap = new GameMap();
        _this.gift = new Gift();
        _this.gameMap.render();
    };
    this.draw = function () {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        _this.gameMap.draw();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(0,0,cvs.width,_this.person.y - 50);
        ctx.rect(0,_this.person.y - 50,_this.person.x - 50,115);
        ctx.rect(0,_this.person.y + 50,cvs.width,cvs.height - _this.person.y - 50);
        ctx.rect(_this.person.x + 65,_this.person.y - 50,cvs.width - _this.person.x - 65,115);
        ctx.fill();
        _this.gift.draw();
        _this.person.draw();
    };
    this.updatePerson = function () {
        for(var i = 0; i < _this.gameMap.positionCopy.length; i++) {
            if(_this.person.x >= _this.gameMap.positionCopy[i][0] - 7.5 && _this.person.x <= _this.gameMap.positionCopy[i][0] + 7.5) {
                if(_this.person.y < _this.gameMap.positionCopy[i][1]) {
                    _this.positionY = [_this.gameMap.positionCopy[i][1],_this.gameMap.positionCopy[i-1][1]];
                    break;
                }
            }
        }
        for(var k = 0; k < _this.gameMap.position.length; k++) {
            if(_this.person.y >= _this.gameMap.position[k][1] - 7.5 && _this.person.y <= _this.gameMap.position[k][1] + 7.5) {
                if(_this.person.x < _this.gameMap.position[k][0]) {
                    _this.positionX = [_this.gameMap.position[k][0],_this.gameMap.position[k-1][0]];
                    break;
                }
            }
        }
    };
    this.updatePersonPathX = function () {
        if(_this.person.vx > 0) {
            _this.person.tx += 0.1;
            var s = _this.person.tx * 15 - 0.5 * _this.person.f / _this.person.m * _this.person.tx * _this.person.tx;
            if(_this.person.x <= _this.positionX[0] - 15) {
                _this.person.x = _this.person.startX + s;
            }
            _this.person.vx = 15 - _this.person.f / _this.person.m * _this.person.tx;
            if(_this.person.tx >= 2) {
                _this.person.vx = 0;
                _this.person.tx = 0;
                _this.person.startX = _this.person.x;
            }
        }
        if(_this.person.vx < 0) {
            _this.person.tx += 0.1;
            var d = _this.person.tx * -15 + 0.5 * _this.person.f / _this.person.m * _this.person.tx * _this.person.tx;
            if(_this.person.x >= _this.positionX[1] + 15) {
                _this.person.x = _this.person.startX + d;
            }
            _this.person.vx = -15 + _this.person.f / _this.person.m * _this.person.tx;
            if(_this.person.tx >= 2) {
                _this.person.vx = 0;
                _this.person.tx = 0;
                _this.person.startX = _this.person.x;
            }
        }
    };
    this.updatePersonPathY = function () {
        if(_this.person.jump == 0 && _this.person.y != _this.positionY[0] - 15) {
            _this.person.vy = -5;
            _this.person.ty = 5.5;
            _this.person.startY = _this.positionY[0] - 15;
            _this.person.y += 1.25;
            _this.person.jump = 2;
        }
        if(_this.person.vy) {
            _this.person.ty += 0.1;
            if(_this.person.jump == 1) {
                var s = _this.person.ty * 30 - 0.5 * _this.person.g * _this.person.ty * _this.person.ty;
                if(_this.person.y > _this.positionY[1] + 15 && _this.person.y <= _this.positionY[0] - 15) {
                    _this.person.y = _this.person.startY - s;
                    _this.person.vy = 30 - _this.person.g * _this.person.ty;
                    if(_this.person.ty >= 30 / _this.person.g * 2 - 0.1) {
                        _this.person.y = Math.ceil(_this.person.y);
                        _this.person.vy = 0;
                        _this.person.ty = 0;
                        _this.person.jump = 0;
                        _this.person.startY = _this.person.y;
                        _this.person.jumpTime = 0;
                    }
                }
                else {
                    _this.person.vy = -5;
                    _this.person.ty = 5.5;
                    _this.person.startY = _this.positionY[0] - 15;
                    _this.person.y += 1.25;
                    _this.person.jump = 2;
                }
            }
            if(_this.person.jump == 2) {
                if(_this.person.y > _this.positionY[1] + 15 && _this.person.y <= _this.positionY[0] - 15) {
                    _this.person.y += 1.5 ;
                }
                else {
                    _this.person.y = _this.positionY[0] - 15;
                    _this.person.vy = 0;
                    _this.person.ty = 0;
                    _this.person.startY = _this.person.y;
                    _this.person.jump = 0;
                    _this.person.jumpTime = 0;
                }
            }
        }
        if(_this.person.ty == 0) {
            if(_this.person.pathY == 0.75) {
                _this.person.pathY = 0.25;
                _this.person.pathX = 0.8;
            }
            if(_this.person.pathY == 0.5) {
                _this.person.pathY = 0;
                _this.person.pathX = 0.8;
            }
        }
    };
    this.update = function () {
        if(_this.flag) {
            return;
        }
        _this.time++;
        _this.draw();
        _this.updatePerson();
        _this.updatePersonPathX();
        _this.updatePersonPathY();
        if(_this.person.y != 30 || _this.person.x <= 990 || _this.person.x >= 1020) {
            window.requestAnimationFrame(_this.update);
        }
        else {
            _this.gift.drawWin((_this.time / 60).toFixed(2));
        }
    }
}