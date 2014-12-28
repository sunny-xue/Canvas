//Test GIT
var starArr = [];
window.onload = function() {
	var canvas = document.getElementById("canvas");
	canvas.width = 800;
	canvas.height = 600;

	var ctx = canvas.getContext('2d');
	ctx.fillRect(0, 0, canvas.width, canvas.height);


	for (var i = 0; i < 200; i++) {
		var R = Math.random() * 10 + 10;
		var r = R / 2;
		var x = Math.random() * canvas.width;
		var y = Math.random() * canvas.height;
		var rot = Math.random() * 360;

		//星星不能越界
		if ((x - 2 * R) > 0 && (y - 2 * R) > 0 && (x + 2 * R) < canvas.width && (y + 2 * R) < canvas.height) {
			drawStar(ctx, r, R, x, y, rot);
		}
	}

};

var count = 0;

function drawStar(ctx, r, R, x, y, rot) {
	ctx.beginPath();
	ctx.fillStyle = 'yellow';
	var curPoint = [];
	for (var i = 0; i < 5; i++) {

		var RpObj = {
			x: Math.cos((18 + i * 72 - rot) / 180 * Math.PI) * R + x,
			y: -Math.sin((18 + i * 72 - rot) / 180 * Math.PI) * R + y
		};

		var rpObj = {
			x: Math.cos((54 + i * 72 - rot) / 180 * Math.PI) * r + x,
			y: -Math.sin((54 + i * 72 - rot) / 180 * Math.PI) * r + y
		};

		curPoint.push(RpObj);
		curPoint.push(rpObj);
	}

	for (var i = 0; i < curPoint.length; i++) {
		ctx.lineTo(curPoint[i].x, curPoint[i].y);
	}

	//重叠检测
	if (checkPointInPath(ctx) == false) {

		for (var i = 0, len = curPoint.length; i < len; i++) {
			starArr.push(curPoint[i]);
		}
		ctx.closePath();
		ctx.fill();

		console.log(count++);

	} else {
		ctx.closePath();
	}
}

/**
 * 检测绘制过的坐标是否在当前的正在绘制的Path通道里面
 * @param  {[type]}
 * @return {[type]}
 */
function checkPointInPath(ctx) {
	for (var i = 0, len = starArr.length; i < len; i++) {
		var obj = starArr[i];
		if (ctx.isPointInPath(obj.x, obj.y) == true || ctx.isPointInStroke(obj.x, obj.y) == true) {
			return true;
		}
	}
	return false;
}