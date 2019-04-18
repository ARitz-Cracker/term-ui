// TODO: use "gpm" to capture mouse events in terminal-only mode. "mev" is a sample program you can look at
process.stdin.setRawMode(true);
process.stdout.write('\x1b[?1000h');
process.stdout.write('\x1b[?1002h');
process.stdin.on("data", function(chunk){
	if (chunk[0] == 3 || chunk[0] == 4){
		process.stdout.write('\x1b[?1000l');
		process.stdout.write('\x1b[?1002l');
		process.exit(0);
	}
	console.log(chunk);
	console.log(chunk.toString());
});