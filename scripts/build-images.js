const {exec} = require('child_process');

console.log("------------ docker build images start ------------\n");

// const run = 'docker run -d --name qq-music-api -p 3200:3200 qq-music-api'
const cmd = 'docker build -t qq-music-api .';
exec(cmd, {}, (err, stdout, stderr) => {
	if (err) {
		console.log(err);
	}
	console.log(stdout, stderr);
	console.log("------------ docker build images end ------------\n");
});
