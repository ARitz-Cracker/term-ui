const {setColour} = require("../util.js");
class ElementProgress {
	/*
	┌[Progress: 69%]─────────────────────┐
	│█████████▒                          │
	└[6900/10000 bytes 10]───────────────┘
	*/
	constructor(x, y, w, h, options) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.innerW = w - 2;
		this.textW = w - 4;
		this.h = (h | 0) || 3;
		if (this.h != 3){
			throw new Error("Progress bar height must be 3");
		}
		this.pause = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
		this.curProgress = -1;
		this.curTopText = "";
		this.curBottomText = "";
		this.subcharW = this.innerW * 4;
		options.callback(this.setProgress.bind(this), this.setTopText.bind(this), this.setBottomText.bind(this), this.finish.bind(this));

		// Progress chars
		// " "
		// "░"
		// "▒"
		// "░" (reverse)
		// " " (reverse)
		// #### ####
		// 
	}
	draw() {
		process.stdout.cursorTo(this.x, this.y);
		process.stdout.write("┌");
		process.stdout.write("─".repeat(this.innerW));
		process.stdout.write("┐");
		process.stdout.cursorTo(this.x, this.y + 1);
		process.stdout.write("│");
		process.stdout.cursorTo(this.x + this.w - 1, this.y + 1);
		process.stdout.write("│");
		process.stdout.cursorTo(this.x, this.y + 2);
		process.stdout.write("└");
		process.stdout.write("─".repeat(this.innerW));
		process.stdout.write("┘");
	}
	_writeSubChar(subChar) {
		setColour("reverse");
		switch(subChar){
			case 0:
				setColour("default");
			break;
			case 1:
				setColour("default");
			case 3:
				process.stdout.write("░");
				setColour("default");
			break;
			case 2:
				setColour("default");
				process.stdout.write("▒");
			break;
			default:
				throw new Error("This shouldn't happen "+subChar);
		}
	}
	setProgress(progress){
		// Todo: don't redraw over things that don't need to be redrawn
		if (progress == -1){
			if (this._animInterval == null){
				this._animInterval = setInterval(() => {
					const time = Math.round(Math.tan(Date.now() / 1000) * 10) + ((this.innerW / 2) | 0)
					let barStart = time - 3;
					if (barStart < 0){
						barStart = 0;
					}else if (barStart > this.innerW){
						barStart = this.innerW;
					}
					let barEnd = time + 3;
					if (barEnd < 0){
						barEnd = 0;
					}else if (barEnd > this.innerW){
						barEnd = this.innerW;
					}
					process.stdout.cursorTo(this.x + 1, this.y + 1);
					process.stdout.write(" ".repeat(barStart));
					setColour("reverse");
					for (let i = barStart; i < barEnd; i += 1){
						process.stdout.write(" ");
					}
					setColour("default");
				}, 10);
			}
			return;
		}
		if (this._animInterval != null){
			clearInterval(this._animInterval);
			delete this._animInterval;
		}
		process.stdout.cursorTo(this.x + 1, this.y + 1);
		const barsFilledIn = (progress * this.subcharW) | 0;
		let charsFilledIn = (barsFilledIn / 4) | 0;
		setColour("reverse");
		process.stdout.write(" ".repeat(charsFilledIn));
		const subChar = barsFilledIn % 4;
		if (subChar > 0){
			charsFilledIn += 1;
		}
		this._writeSubChar(subChar);
		process.stdout.write(" ".repeat(this.innerW - charsFilledIn));
	}
	_drawText(txt){
		if (txt == ""){
			process.stdout.write("─".repeat(this.innerW));
		}else{
			process.stdout.write("[");
			if (txt.length > this.textW){
				txt = txt.substring(this.textW - 3) + "...";
			}
			process.stdout.write(txt);
			process.stdout.write("]");
			process.stdout.write("─".repeat(this.textW - txt.length));
		}
	}
	setTopText(txt){
		// Todo: don't redraw over things that don't need to be redrawn
		process.stdout.cursorTo(this.x + 1, this.y);
		this._drawText(txt)
		
	}
	setBottomText(txt){
		// Todo: don't redraw over things that don't need to be redrawn
		process.stdout.cursorTo(this.x + 1, this.y + 2);
		this._drawText(txt)
	}
	finish(err) {
		if (this._animInterval != null){
			clearInterval(this._animInterval);
		}
		if (err){
			this._reject(err);
		}else{
			this._resolve();
		}
	}
	focus() {

	}
	unfocus() {

	}
	keyDown() {
		process.stdout.write("\x07");
	}
	keyUp() { 
		process.stdout.write("\x07");
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

module.exports = ElementProgress;