const {setColour} = require("../util.js");
class ElementText {
	constructor(x, y, w, h, text) {
		this.x = x | 0;
		this.y = y | 0;
		this.w = w | 0;
		const textWidth = this.w - 2;
		this.texts = [];
		let i = 0;
		while(i < text.length){
			let nextPart = i + textWidth;
			let nextNewLine = text.indexOf("\n", i);
			if (nextNewLine >= 0 && nextNewLine <= nextPart){
				nextPart = nextNewLine;
			}else{
				nextNewLine = null;
			}
			let newText = text.substring(i, nextPart);
			if (newText.length < textWidth){
				newText += " ".repeat(textWidth - newText.length);
			}
			this.texts.push(newText);
			i = nextPart;
			if (nextNewLine != null){
				i += 1; // Don't render the newline
			}
		}
		if(h > 0){
			if (h < 3){
				throw new Error("arguments[3] < 3");
			}
			this.scroll = this.texts.length > (h - 2);
			this.h = h;
		}else if(!h){
			this.scroll = false;
			this.h = this.texts.length + 2;
		}else{ // h < 0
			let maxH = -h;
			this.scroll = this.texts.length > (maxH - 2);
			this.h = Math.min(this.texts.length + 2, maxH);
		}
		if (this.scroll){
			this.scrollPos = 0;
			this.textHeight = this.h - 2;
			this.scrollLimit = this.texts.length - this.textHeight;
		}
		this.selectable = this.scroll;
	}
	draw() {
		if (this.scroll){
			process.stdout.cursorTo(this.x, this.y);
			process.stdout.write("┌");
			process.stdout.write("─".repeat(this.w - 2));
			setColour("reverse");
			process.stdout.write("↑");
			setColour("default");
			const barPos = Math.round((this.scrollPos / this.scrollLimit) * (this.textHeight - 1));
			for (let i = 0; i < this.textHeight; i += 1){
				process.stdout.cursorTo(this.x, this.y + 1 + i);
				process.stdout.write("│");
				process.stdout.write(this.texts[this.scrollPos + i]);
				if (this.focused){
					process.stdout.write(barPos == i ? "█" : "▒");
				}else{
					process.stdout.write(barPos == i ? "▒" : "░");
				}
			}
			process.stdout.cursorTo(this.x, this.y + this.h - 1);
			process.stdout.write("└");
			process.stdout.write("─".repeat(this.w - 2));
			setColour("reverse");
			process.stdout.write("↓");
			setColour("default");
		}else{
			for (let i = 0; i < this.texts.length; i += 1){
				process.stdout.cursorTo(this.x + 1, this.y + 1 + i);
				process.stdout.write(this.texts[i]);
			}
		}
	}
	focus() {
		this.focused = true;
		this.draw();
	}
	unfocus() {
		this.focused = false;
		this.draw();
	}
	keyDown() {
		if (this.scrollPos < this.scrollLimit){
			this.scrollPos += 1;
		}else{
			return true;
		}
		this.draw();
		return false;
	}
	keyUp() {
		if (this.scrollPos > 0){
			this.scrollPos -= 1;
		}else{
			return true;
		}
		this.draw();
		return false;
	}
	keyLeft() {
		process.stdout.write("\x07");
	}
	keyRight() {
		process.stdout.write("\x07");
	}
	keyEnter() {
		process.stdout.write("\x07");
	}
	key(key) {
		process.stdout.write("\x07");
	}
}
module.exports = ElementText;