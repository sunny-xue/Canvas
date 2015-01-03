//Test GIT
var starArr = [];
window.onload = function() {
	var canvas = document.getElementById("canvas");
	canvas.width = 1200;
	canvas.height = 800;

	var ctx = canvas.getContext('2d');
	//var skyStyle = ctx.createLinearGradient(0, 0,canvas.width, canvas.height);
	var skyStyle = ctx.createRadialGradient(canvas.width / 2, canvas.height, 0, canvas.width / 2, canvas.height, canvas.height);
	skyStyle.addColorStop(0.0, '#035');
	skyStyle.addColorStop(1.0, 'black');
	ctx.fillStyle = skyStyle;
	ctx.fillRect(0, 0, canvas.width, canvas.height);


	for (var i = 0; i < 200; i++) {
		var R = Math.random() * 10;
		var x = Math.random() * canvas.width;
		var y = Math.random() * canvas.height * 0.65;
		var rot = Math.random() * 360;

		//星星不能越界
		if ((x - 2 * R) > 0 && (y - 2 * R) > 0 && (x + 2 * R) < canvas.width && (y + 2 * R) < canvas.height) {
			drawStar(ctx, x, y, R, rot);
		}
		//drawStar(ctx, x, y, R, rot);
	}

	drowMoon(ctx, 2, 1000, 100, 50, 50);
	drawLand(ctx);
};

function drowMoon(ctx, d, x, y, R, rot, fillStyle) {
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rot * Math.PI / 180);
	ctx.scale(R, R);
	pathMoon(ctx, d);
	ctx.fillStyle = fillStyle || 'yellow';
	ctx.fill();
	ctx.restore();
}

function pathMoon(ctx, d) {
	ctx.beginPath();
	ctx.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true);
	ctx.moveTo(0, -1);
	ctx.arcTo(d, 0, 0, 1, dis(0, -1, d, 0) / d);
	ctx.closePath();
}

function dis(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function drawStar(ctx, x, y, R, rot, fillStyle) {
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rot * Math.PI / 180);
	ctx.scale(R, R);
	pathStar(ctx);
	ctx.fillStyle = fillStyle || 'yellow';
	ctx.fill();
	ctx.restore();

	// ctx.beginPath();
	// ctx.fillStyle = 'yellow';
	// var curPoint = [];
	// for (var i = 0; i < 5; i++) {

	// 	var RpObj = {
	// 		x: Math.cos((18 + i * 72 - rot) / 180 * Math.PI) * R + x,
	// 		y: -Math.sin((18 + i * 72 - rot) / 180 * Math.PI) * R + y
	// 	};

	// 	var rpObj = {
	// 		x: Math.cos((54 + i * 72 - rot) / 180 * Math.PI) * r + x,
	// 		y: -Math.sin((54 + i * 72 - rot) / 180 * Math.PI) * r + y
	// 	};

	// 	curPoint.push(RpObj);
	// 	curPoint.push(rpObj);
	// }

	// for (var i = 0; i < curPoint.length; i++) {
	// 	ctx.lineTo(curPoint[i].x, curPoint[i].y);
	// }

	// //重叠检测
	// if (checkPointInPath(ctx) == false) {

	// 	for (var i = 0, len = curPoint.length; i < len; i++) {
	// 		starArr.push(curPoint[i]);
	// 	}
	// 	ctx.closePath();
	// 	ctx.fill();

	// } else {
	// 	ctx.closePath();
	// }
}

function pathStar(ctx) {
	ctx.beginPath();
	var curPoint = [];
	for (var i = 0; i < 5; i++) {

		var RpObj = {
			x: Math.cos((18 + i * 72) / 180 * Math.PI),
			y: -Math.sin((18 + i * 72) / 180 * Math.PI)
		};

		var rpObj = {
			x: Math.cos((54 + i * 72) / 180 * Math.PI) * 0.5,
			y: -Math.sin((54 + i * 72) / 180 * Math.PI) * 0.5
		};
		curPoint.push(RpObj);
		curPoint.push(rpObj);
	}

	for (var i = 0; i < curPoint.length; i++) {
		ctx.lineTo(curPoint[i].x, curPoint[i].y);
	}

	ctx.closePath();
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

function drawLand(ctx) {
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(0, 600);
	ctx.bezierCurveTo(540, 400, 660, 800, 1200, 600);
	ctx.lineTo(1200, 800);
	ctx.lineTo(0, 800);
	ctx.closePath();

	var landStyle = ctx.createLinearGradient(0, 800, 0, 0);
	landStyle.addColorStop(0.0, '#030');
	landStyle.addColorStop(1.0, '#580');
	ctx.fillStyle = landStyle;
	ctx.fill();
	ctx.restore();
}