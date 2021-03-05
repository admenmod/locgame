'use strict';
class Player extends ImageNode {
	constructor(p = {}) {
		super(p);
		this.speed = p.speed||1;
	}
};

class GosticX {
	constructor(p = {}) {
		this.pos = p.pos||vec2();
		
		this.radius = p.radius||60;
		this.radiusYadro = p.radiusYadro||50;
		this.colors = p.colors||[0, '#112233', 1, '#223344'];
		
		this.yadro = {
			pos: this.pos.buf(),
			radius: 30,
			radiusYadro: 5,
			colors: p.yadroColors||[0, '#223344', 1, '#112233']
		};
		
		this.touch = null;
	}
	get value() {return Math.round((this.yadro.pos.x-this.pos.x)/(this.radius-this.yadro.radius)*10000)/10000;}
	updata() {
		if(!this.touch) this.touch = touch.touches.find(i => i.isPress() && this.pos.getDistance(i) < this.radius);
		else if(this.touch) {
			this.yadro.pos.set(this.pos).plus(Math.max(Math.min(this.touch.x-this.pos.x, this.radius), -this.radius), 0);
			if(this.touch.isUp()) this.touch = null;
		};
		if(!this.touch) this.yadro.pos.x += (this.pos.x-this.yadro.pos.x)/3;
	}
	draw(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.globalAlpha = 0.8;
		let grd = ctx.createRadialGradient(this.pos.x, this.pos.y, this.radiusYadro, this.pos.x, this.pos.y, this.radius);
		for(let i = 0; i < this.colors.length; i += 2) grd.addColorStop(this.colors[i], this.colors[i+1]);
		ctx.fillStyle = grd;
		
		ctx.arc(this.pos.x-this.radius, this.pos.y, this.yadro.radius, Math.PI/2, Math.PI/2*3);
		ctx.lineTo(this.pos.x+this.radius, this.pos.y-this.yadro.radius);
		ctx.arc(this.pos.x+this.radius, this.pos.y, this.yadro.radius, -Math.PI/2, Math.PI/2);
		ctx.closePath();
		ctx.fill();
		
		ctx.beginPath();
		grd = ctx.createRadialGradient(this.yadro.pos.x, this.yadro.pos.y, this.yadro.radiusYadro, this.yadro.pos.x, this.yadro.pos.y, this.yadro.radius);
		for(let i = 0; i < this.yadro.colors.length; i += 2) grd.addColorStop(this.yadro.colors[i], this.yadro.colors[i+1]);
		ctx.fillStyle = grd;
		ctx.arc(this.yadro.pos.x, this.yadro.pos.y, this.yadro.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.restore();
	}
};

class Button extends EventEmitter {
	constructor(p = {}) {
		super();
		this.pos = p.pos||vec2();
		this.size = p.size||vec2(40, 10);
	}
	updata() {
		if(touch.isUp() && touch.isTouchEventBox(this)) this.emit('up');
	}
	draw(ctx, callbackDraw) {
		ctx.save();
		ctx.fillStyle = this.background;
		ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.restore();
	}
};
