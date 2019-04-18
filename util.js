const keywords = {
	"reset": 0,
	"default": 0,
	"bright": 1,
	"dim": 2,
	"underscore": 4,
	"blink": 5,
	"reverse": 7
}
const colourDefs = {
	"black": 0,
	"red": 1,
	"green": 2,
	"yellow": 3,
	"blue": 4,
	"magenta": 5,
	"cyan": 6,
	"white": 7,
	"bright black": 8,
	"bright red": 9,
	"bright green": 10,
	"bright yellow": 11,
	"bright blue": 12,
	"bright magenta": 13,
	"bright cyan": 14,
	"bright white": 15
}
const showCursor = function(show){
	if (show){
		process.stdout.write("\x1b[?25h");
	}else{
		process.stdout.write("\x1b[?25l");
	}
}
const setColour = function(fg, bg){
	if (fg == null && bg == null){
		process.stdout.write("\x1b[0m");
	}
	let seq = "\x1b[";
	let num;
	if (fg != null){
		if (typeof fg == "number"){
			num = fg;
		}else{
			num = keywords[fg];
			if (num != null){
				process.stdout.write(seq + num + "m");
				return;
			}
			num = colourDefs[fg];
		}
		if (num == null){
			throw new Error("Invalid foreground");
		}
		if (num > 7){
			seq += (num + 82);
		}else{
			seq += (num + 30);
		}
	}
	if (bg != null){
		if (typeof bg == "number"){
			num = bg;
		}else{
			num = colourDefs[bg];
		}
		if (num == null){
			throw new Error("Invalid background");
		}
		if (fg != null){
			seq += ";";
		}
		if (num > 7){
			seq += (num + 92);
		}else{
			seq += (num + 40);
		}
	}
	process.stdout.write(seq + "m");
}
const stdout_writeReverse = function(c){
	setColour("reverse");
	process.stdout.write(c);
	setColour();
}
module.exports = {
    showCursor,
	setColour,
	stdout_writeReverse
}