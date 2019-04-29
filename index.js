const fs = require("fs");
const {showCursor, setColour, stdout_writeReverse} = require("./util.js");

const specialKeyCombos = [
	Buffer.from([0x1b, 0x5b, 0x41]), // Up arrow
	Buffer.from([0x1b, 0x5b, 0x42]), // Down arrow
	Buffer.from([0x1b, 0x5b, 0x43]), // Right arrow
	Buffer.from([0x1b, 0x5b, 0x44]), // Left arrow
	Buffer.from([0x1b, 0x5b, 0x32, 0x7e]), // insert
	Buffer.from([0x1b, 0x5b, 0x33, 0x7e]), // delete
	Buffer.from([0x1b, 0x5b, 0x46]), // end
	Buffer.from([0x1b, 0x5b, 0x48]), // home
	Buffer.from([0x1b, 0x5b, 0x35, 0x7e]), // pgup
	Buffer.from([0x1b, 0x5b, 0x36, 0x7e]) // pgdown
]
const windowElements = {};
(function(){
	const files = fs.readdirSync(__dirname+"/elements");
	for (let fileName of files){
		const elementName = fileName.substring(0, fileName.length - 3); // Yes I'm lazy and assuming *.js
		windowElements[elementName] = require("./elements/"+fileName);
	}
})();

const createWindow = async function(options){
	if (!process.stdout.isTTY){
		throw new Error("stdout isn't a terminal");
	}
	options.elements = Array.isArray(options.elements) ? options.elements : [];
	options.title += "";
	options.width = (options.width | 0) || process.stdout.columns;
	if (options.width < 0){
		options.width = process.stdout.columns - options.width;
	}
	options.height = (options.height | 0) || process.stdout.rows;
	if (options.height < 0){
		options.height = process.stdout.rows - options.height;
	}
	const innerWidth = options.width - 2;
	const innerHeight = options.height - 2;

	const offsetWidth = Math.floor((process.stdout.columns - options.width) / 2);
	const offsetHeight = Math.floor((process.stdout.rows - options.height) / 2);

	const isRaw = process.stdin.isRaw;
	process.stdout.write("\n".repeat(offsetHeight + 1));
	setColour("reverse");
	process.stdout.moveCursor(offsetWidth, 0);
	process.stdout.write("┌");
	const writeableTitleSpace = options.width - 4;
	if (options.title.length > writeableTitleSpace){
		process.stdout.write("┤");
		process.stdout.write(options.title.substring(0, writeableTitleSpace - 3));
		process.stdout.write("...├");
	}else if(options.title.length == writeableTitleSpace){
		process.stdout.write("┤");
		process.stdout.write(options.title);
		process.stdout.write("├");
	}else{
		const stuffRemaining = writeableTitleSpace - options.title.length;
		const halfStuffRemaining = Math.floor(stuffRemaining / 2);
		process.stdout.write("─".repeat(halfStuffRemaining));
		process.stdout.write("┤");
		process.stdout.write(options.title);
		process.stdout.write("├");
		process.stdout.write("─".repeat(halfStuffRemaining + Number((stuffRemaining % 2) === 1)));
	}
	process.stdout.write("┐");
	setColour("default");
	if (offsetWidth > 0){
		process.stdout.write("\n");
		process.stdout.moveCursor(offsetWidth, 0);
	}
	for (let i = 0; i < innerHeight; i += 1){
		
		stdout_writeReverse("│");
		process.stdout.moveCursor(innerWidth, 0);
		stdout_writeReverse("│");
		if (offsetWidth > 0){
			process.stdout.write("\n");
			process.stdout.moveCursor(offsetWidth, 0);
		}
	}
	setColour("reverse");
	process.stdout.write("└");
	process.stdout.write("─".repeat(innerWidth));
	process.stdout.write("┘");
	setColour("default");
	process.stdout.write("\n".repeat(offsetHeight));

	let curX = offsetWidth + 1;
	let curY = offsetHeight + 1;

	const curElements = [];
	for (let i = 0; i < options.elements.length; i += 1){
		const elem = options.elements[i];
		if (elem.height < 0){
			elem.height = -((innerHeight - (curY - offsetHeight)) + elem.height);
		}
		curElements[i] = new windowElements[elem.type](curX, curY, innerWidth, elem.height, elem.properties);
		curElements[i].draw();
		curY += curElements[i].h;
	}
	let selectedElement = 0;
	let resultData = [];

	showCursor(false);
	for (let element of curElements){
		if (element.pause != null){
			await element.pause;
		}
	}
	process.stdin.resume();
	process.stdin.setRawMode(true);
	while (!curElements[selectedElement].selectable){
		selectedElement += 1;
	}
	curElements[selectedElement].focus();
	let f;
	const result = await new Promise((resolve, reject) => {
		f = (chunk) => {
			const curelement = curElements[selectedElement];
			switch(chunk[0]){
				case 0:
				break;
				case 3:
				case 4:
					process.stdin.off("data", f);
					resolve();
				break;
				case 0x0d:
					const rawData = curelement.keyEnter();
					if (rawData == null){
						break;
					}
					const [mode, data] = rawData;
					switch (mode){
						case 0: // Major
							if (resultData.length > 0){
								if (data != null){
									resultData.unshift(data);
								}
								resolve(resultData);
							}else{
								resolve(data);
							}
						break;
						case 1: // Add
							resultData.push(data);
						break;
						case 2: // Remove
							const index = resultData.indexOf(data);
							if (index >= 0) {
								resultData.splice(index, 1);
							}
						break;
					}
				break;
				default:
					switch(specialKeyCombos.findIndex(Buffer.prototype.equals.bind(chunk))){
						case 0: // Up
							if (curelement.keyUp()){
								let newElement = selectedElement - 1;
								try{
									while(!curElements[newElement].selectable){
										newElement -= 1;
									}
									curelement.unfocus();
									selectedElement = newElement;
									curElements[selectedElement].focus();
								}catch(ex){
									process.stdout.write("\x07");
								}
							}
						break;
						case 1: // Down
							if (curelement.keyDown()){
								let newElement = selectedElement + 1;
								try{
									while(!curElements[newElement].selectable){
										newElement += 1;
									}
									curelement.unfocus();
									selectedElement = newElement;
									curElements[selectedElement].focus();
								}catch(ex){
									process.stdout.write("\x07");
								}
							}
						break;
						case 2: // Right
							curelement.keyRight();
						break;
						case 3: // Left
							curelement.keyLeft();
						break;
						case 4: // Insert
							process.stdout.write("\x07");
						break;
						case 5: // Delete
							process.stdout.write("\x07");
						break;
						case 6: // End
							process.stdout.write("\x07");
						break;
						case 7: // Home
							process.stdout.write("\x07");
						break;
						case 8: // PgUp
							process.stdout.write("\x07");
						break;
						case 9: // PgDown
							process.stdout.write("\x07");
						break;
						default:
							curelement.key(chunk[0]);
					}
			}
		}
		process.stdin.on("data", f);
	});
	process.stdin.removeListener("data", f);
	process.stdin.pause();
	process.stdin.setRawMode(isRaw);
	showCursor(true);
	process.stdout.cursorTo(process.stdout.columns, process.stdout.rows);
	process.stdout.write("\n");
	return result;
}

const test = function(){
	for (let i = 0; i < 16; i += 1){
		for (let ii = 0; ii < 16; ii += 1){
			setColour(ii, i);
			process.stdout.write("#");
		}
		process.stdout.write("\n");
	}
	setColour();
}

module.exports ={
	setColour,
	createWindow,
	test
}
