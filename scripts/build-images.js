const {exec} = require('child_process');
const { version, author } = require('../package.json');

const isLocal = process.argv[2] === 'local';

console.log(`------------ ${isLocal ? 'Local' : 'Remote'} Docker Build Images Start ------------\n`);

// const run = 'docker run -d --name qq-music-api -p 3200:3200 qq-music-api'
const image = `${isLocal ? '' : `${author.toLowerCase()}/`}qq-music-api:${version}`
const cmd = isLocal
	? `docker build -t ${image} .`
	: `docker image tag qq-music-api:${version} ${image}`;

console.log('cmd:', cmd, '\n');

exec(cmd, {}, (err, stdout, stderr) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(stdout, stderr);
	console.log(`------------ ${isLocal ? 'Local' : 'Remote'} Docker Build Images End ------------\n`);
	if (!isLocal) {
		const pushCmd = `docker image push ${image}`;
		console.log('pushCmd:', pushCmd, '\n');
		console.log(`------------ ${isLocal ? 'Local' : 'Remote'} Docker Push Images Start ------------\n`);
		exec(pushCmd, {}, (err, stdout, stderr) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log(stdout, stderr);
			console.log(`------------ ${isLocal ? 'Local' : 'Remote'} Docker Push Images End ------------\n`);
		});
	}
});
