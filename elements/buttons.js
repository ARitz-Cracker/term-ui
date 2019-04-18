const {setColour} = require("../util.js");
class ElementButton {
	constructor(x, y, w, h, choices) {
		this.x = x | 0;
		this.y = y | 0;
		this.w = w | 0;
		this.h = (h | 0) || 1;
        this.texts = [];
		this.values = [];
		this.buttonX = [];
		this.buttonY = this.y + ((this.h / 2) | 0);
		this.textW = 6;
		for (let i = 0; i < choices.length; i += 1){
			const choice = choices[i];
			if (choice.text.length > this.textW){
				this.textW = choice.text.length;
			}
			this.values[i] = choice.value;
			this.texts[i] = choice.text;
		}
		this.buttonW = this.textW + 2;
		const totalW = this.buttonW * choices.length;
		if (totalW > this.w){
			throw new Error("Too many buttons ("+totalW+">"+this.w+")");
		}
		const spaceAroundButtons = ((this.w - totalW) / (choices.length + 1)) | 0;
		let curXPos = this.x + spaceAroundButtons;
		let centerPoint = ((choices.length / 2) | 0);
		for (let i = 0; i <= centerPoint; i += 1){
			this.buttonX[i] = curXPos;
			curXPos += this.buttonW + spaceAroundButtons;
		}
		curXPos = this.x + this.w - this.buttonW - spaceAroundButtons;
		for (let i = choices.length - 1; i > centerPoint; i -= 1){
			this.buttonX[i] = curXPos;
			curXPos -= this.buttonW + spaceAroundButtons;
		}
		this.selectedButton = 0;
		this.selectable = true;
	}
	draw() { 
		for (let i = 0; i < this.buttonX.length; i += 1){
			this.drawSelectedButton(false, i);
		}
	}
	drawSelectedButton(focus, i = this.selectedButton) {
		process.stdout.cursorTo(this.buttonX[i], this.buttonY);
		const padding = ((this.textW - this.texts[i].length ) / 2) | 0;
		if (focus){
			setColour("reverse");
		}
		process.stdout.write("[");
		process.stdout.write(" ".repeat(padding));
		process.stdout.write(this.texts[i]);
		process.stdout.write(" ".repeat(padding + ((this.texts[i].length % 2 ) === 1 ? 1 : 0)));
		process.stdout.write("]");
		if (focus){
			setColour("default");
		}
	}
	focus() {
		this.focused = true;
		this.drawSelectedButton(true);
	}
	unfocus() {
		this.focused = false;
		this.drawSelectedButton(false);
		this.selectedButton = 0;
	}
	keyDown() {
		return true;
	}
	keyUp() { 
		return true;
	}
	keyLeft() {
		if (this.selectedButton > 0){
			this.drawSelectedButton(false);
			this.selectedButton -= 1;
			this.drawSelectedButton(true);
		}else{
			process.stdout.write("\x07");
		}
	}
	keyRight() {
		if (this.selectedButton < (this.texts.length - 1)){
			this.drawSelectedButton(false);
			this.selectedButton += 1;
			this.drawSelectedButton(true);
		}else{
			process.stdout.write("\x07");
		}
	}
	keyEnter() {
		return [0, this.values[this.selectedButton]];
	}
	key(key) {
		process.stdout.write("\x07");
	}
}
module.exports = ElementButton;