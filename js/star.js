var starArr = [];
var Star = function() {
	this.drawStar = function drawStar(ctx, r, R, x, y, rot) {
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
			ctx.lineTo(RpObj.x, RpObj.y);
			ctx.lineTo(rpObj.x, rpObj.y);

			curPoint.push(RpObj);
			curPoint.push(rpObj);
		}


		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// //重叠检测
		// if (checkPointInPath(ctx) === false) {
		// 	for (var i = 0, len = curPoint.length; i < len; i++) {
		// 		starArr.push(curPoint[i]);
		// 	}
		// } else {
		// 	//TODO
		// }

	};
};

window.onload = function() {
	var canvas = document.getElementById("canvas");
	canvas.width = 800;
	canvas.height = 600;

	var ctx = canvas.getContext('2d');
	// ctx.lineWidth=10;
	ctx.fillStle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);


	for (var i = 0; i < 200; i++) {
		var R = Math.random() * 10 + 10;
		var r = R / 2;
		var x = Math.random() * canvas.width;
		var y = Math.random() * canvas.height;
		var rot = Math.random() * 360;

		//星星不能越界
		if ((x - 2 * R) > 0 && (y - 2 * R) > 0 && (x + 2 * R) < canvas.width && (y + 2 * R) < canvas.height) {
			var star = new Star();
			star.drawStar(ctx, r, R, x, y, rot);
			starArr.push(star);
		}
	}
};



function checkPointInPath(x, y) {
	if (ctx.isPointInPath(x, y) === true) {
		return true;
	} else {
		return false;
	}
}