const $ = document.getElementById.bind(document);

window.addEventListener('load', () => {
	const bg = $('background');
	const ctx = bg.getContext('2d');
	const point_amount = 40;

	const sines = (...params) =>
		params
			.map(([phase, speed]) =>
				Math.cos(phase + speed * Date.now()))
			.reduce((p,c)=>p+c,0)
		/ params.length;

	const ease = (v,min,max) => (1 - Math.cos(Math.max(min, Math.min(max, v))/(max-min)*Math.PI))/2;
	const normalize = (value) => (1 + value) / 2; // [-1, 1] => [0,1]

	const point_coordinate = (pid) => {
		const i = ((pid + 1)*17)%333 + 11;
		const v = 40000;
		return {
			x: normalize(sines([3+i, i/31/v], [5+i, i/29/v], [ 7-i, i/37/v])),
			y: normalize(sines([5+i, i/31/v], [7-i, i/29/v], [-7+i, i/37/v])),
			connected: 0
		}
	};

	const points = Array(point_amount).fill(0).map((x,i)=>point_coordinate(i));

	const frame = () => {
		ctx.canvas.width  = document.body.offsetWidth;
		ctx.canvas.height = window.innerHeight;
		ctx.fillStyle = "#888";
		ctx.strokeStyle  = "#888";

		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

		for (let i = 0; i < point_amount; ++i)
			points[i] = point_coordinate(i+1);

		ctx.beginPath();
		for (let i = 0; i < point_amount; ++i) {
			for (let j = i+1; j < point_amount; ++j) {
				if (i !== j && (((points[i].x-points[j].x)*ctx.canvas.width)**2 + ((points[i].y-points[j].y)*ctx.canvas.height)**2 < 110**2)) {
					ctx.moveTo(points[i].x*ctx.canvas.width, points[i].y*ctx.canvas.height);
					ctx.lineTo(points[j].x*ctx.canvas.width, points[j].y*ctx.canvas.height);
					points[i].connected = points[i].connected ? points[i].connected + 1 : 1;
					points[j].connected = points[j].connected ?  points[j].connected + 1 : 1;
				}
			}
		}
		ctx.stroke();

		for (let i = 0; i < point_amount; ++i) {
			const point = points[i];
			ctx.beginPath();
			ctx.arc(point.x * ctx.canvas.width, point.y * ctx.canvas.height, 10*ease(points[i].connected ? points[i].connected : 0,2,6), 0, 2 * Math.PI);
			ctx.fill();
		}

		requestAnimationFrame(frame);
	};

	requestAnimationFrame(frame);
});