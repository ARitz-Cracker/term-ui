
const {showCursor, setColour} = require("../util.js");
class ElementText {
	constructor(x, y, w, h, choices) {
		this.x = x | 0;
		this.y = y | 0;
		this.w = w | 0;
		const textWidth = this.w - 2;
        this.texts = [];
        this.values = [];
		for (let i = 0; i < choices.length; i += 1){
			const choice = choices[i];
			const text = (choice.symbol || "- ") + choice.text;
			if (text.length < textWidth){
				this.texts[i] = text + " ".repeat(textWidth - text.length);
			}else if(text.length > textWidth){
				this.texts[i] = text.substring(0, textWidth - 3)+"...";
			}else{
				this.texts[i] = text;
			}
			
			this.values[i] = choice.value;
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
		
		this.textHeight = this.h - 2;
		this.scrollPos = 0;
		this.innerScrollPos = 0;
		if (this.scroll){
			this.scrollLimit = this.texts.length - this.textHeight;
		}
		this.selectable = true;
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
				if (this.focused && this.innerScrollPos == i){
					setColour("reverse");
				}
				process.stdout.write(this.texts[this.scrollPos + i]);
				setColour("default");
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
				if (this.focused && this.innerScrollPos == i){
					setColour("reverse");
				}
				process.stdout.write(this.texts[i]);
				setColour("default");
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
		if (this.innerScrollPos < this.textHeight - 1){
			process.stdout.cursorTo(this.x + 1, this.y + 1 + this.innerScrollPos);
			process.stdout.write(this.texts[this.scrollPos + this.innerScrollPos]);
			this.innerScrollPos += 1;
			process.stdout.cursorTo(this.x + 1, this.y + 1 + this.innerScrollPos);
			setColour("reverse");
			process.stdout.write(this.texts[this.scrollPos + this.innerScrollPos] || "SHOULDN'T BE HAPPENING");
			setColour("default");
			return false;
		}
		if (!this.scroll){
			return true;
		}
		if (this.scrollPos < this.scrollLimit){
			this.scrollPos += 1;
		}else{
			return true;
		}
		this.draw();
		return false;
	}
	keyUp() {
		if (this.innerScrollPos > 0){
			process.stdout.cursorTo(this.x + 1, this.y + 1 + this.innerScrollPos);
			process.stdout.write(this.texts[this.scrollPos + this.innerScrollPos]);
			this.innerScrollPos -= 1;
			process.stdout.cursorTo(this.x + 1, this.y + 1 + this.innerScrollPos);
			setColour("reverse");
			process.stdout.write(this.texts[this.scrollPos + this.innerScrollPos]);
			setColour("default");
			return false;
		}
		if (!this.scroll){
			return true;
		}
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
		return [0, this.values[this.scrollPos + this.innerScrollPos]];
	}
	key(key) {
		process.stdout.write("\x07");
	}
}
module.exports = ElementText;