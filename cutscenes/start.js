'use strict';
cutscenes.start = function() {
//	cvs.on('resize', e => netmap.size.set(cvs.size));
	let background = new ImageNode({
		alpha: 0,
		size: cvs.size,
		image: db.cutstart_background1
	});
	
	class Fire {
		constructor(p) {
			this.pos = p.pos||vec2();
			this.radius = p.radius||20;
			this.corePos = p.corePos||vec2();
			this.coreRadius = p.coreRadius||0;
		}
		draw(ctx, pos, size) {
			ctx.save();
			ctx.beginPath();
			ctx.scale(1, 0.8);
			ctx.globalCompositeOperation = 'source-over';
		//	ctx.globalCompositeOperation = 'destination-out';
			let max = 255, min = 230, r = random(105, 95)/100;
			let cpos = pos.buf().plus(size.buf().inc(this.pos.buf().plus(this.corePos)).div(100)).inc(1, 1/0.8);
			let grd = ctx.createRadialGradient(cpos.x, cpos.y, r*this.coreRadius*size.x/100, pos.x+size.x*this.pos.x/100, pos.y+size.y*this.pos.y/100, r*this.radius*size.x/100);
			grd.addColorStop(0, `rgba(${random(max, min)},0,0,0.2)`||'#ff000030');
			grd.addColorStop(0.40, `rgba(${random(max, min)},${random(max, min)},0,0.2)`||'#ffff0030');
			grd.addColorStop(0.9, `rgba(${random(max, min)},${random(max, min)},0,0)`||'#ffff0000');
			grd.addColorStop(1, '#00000000');
			ctx.fillStyle = grd;
		//	ctx.fillRect(0, 0, cvs.width, cvs.height);
			ctx.arc(pos.x+size.x*this.pos.x/100, pos.y+size.y*this.pos.y/100, this.radius*size.x/100, 0, Math.PI*2);
			ctx.fill();
			ctx.restore();
		}
	};
	let rectNight = {
		pos: vec2(),
		size: cvs.size,
		fires: [new Fire({ pos: vec2(31, 47) })],
		draw(ctx) {
			ctx.save();
			ctx.beginPath();
			ctx.globalCompositeOperation = 'source-over';
			ctx.globalCompositeOperation = 'direction';
			ctx.fillStyle = '#00000088';
			ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			for(let i = 0; i < this.fires.length; i++) this.fires[i].draw(ctx, this.pos, this.size);
			ctx.restore();
		}
	};
	
	
	let texts = {
		pos: vec2(),
		text: [
`Ldd skskdm ekwwms swkc dnsks e wksmd ekfm e wmkw s
spsoelw wmsls s wlkssms wmksk w wks s spsosms sowow s`,
`Kskskd ksks sosowo wle sos slwpw lwowlw wkkw` // механизм смены текста
		],
		fontSize: 16,
		alpha: 0,
		color: '#eeeeee',
		draw(ctx, text) {
			ctx.save();
			ctx.beginPath();
			ctx.globalAlpha = this.alpha;
			ctx.fillStyle = this.color;
			ctx.shadowOffsetX = 2;
			ctx.shadowOffsetY = 5;
			ctx.shadowColor = '#000000';
			ctx.shadowBlur = 7;
			ctx.font = `${this.fontSize}px Arial`;
			ctx.textAlign = 'center';
			let textArr = text.split('\n');
			for(let i = 0; i < textArr.length; i++) ctx.fillText(textArr[i], this.pos.x, this.pos.y+i*this.fontSize);
			ctx.restore();
		}
	};
	
	let scriptFlags = 0;
	let animsF = [1, 0b10, 0b100, 0b1000, 0b10000]; 
	
	let focus = {};
	
	
//===============init===============//
	this.init = function() {
		background.size.set(cvs.size);
		
		focus.size = background.size.buf().inc(3);
		focus.sizeSpeed = focus.size.buf().minus(background.size).length;
		
		focus.target = vec2(40*focus.size.x/100, 40*focus.size.y/100);
		
		focus.pos = cvs.size.div(2).minus(focus.target);
		focus.posSpeed = focus.pos.buf().minus(background.pos).length;
		
		setTickout(() => scriptFlags |= animsF[0], 100); // 100-800 = 700
		setTickout(() => scriptFlags |= animsF[1], 100+100); // 200-300 = 200
		setTickout(() => Scene.set(scenes.main), 1200); // 1200 = 0
	};
	
//===============updata===============//
	this.updata = function(dt) {
		setTickout.updata();
	//=======prePROCES=======//--vs--//=======EVENTS=======//
		
	//==================================================//
	
	
	//=======PROCES=======//--vs--//=======UPDATA=======//
		if(!scriptFlags) background.alpha += 1/100;
		if(scriptFlags & animsF[0]) {
			background.pos.moveTo(focus.pos, focus.posSpeed/700);
			background.size.moveTo(focus.size, focus.sizeSpeed/700);
			
			rectNight.pos.set(background.pos);
			rectNight.size.set(background.size);
		};
	//==================================================//
	
	
	//==========DRAW==========//--vs--//==========RENDER==========//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		background.draw(main);
		rectNight.draw(main);
	//	netmap.draw(main);
		
		if(scriptFlags & animsF[1]) texts.alpha += 1/100;
		texts.pos.set(cvs.width/2, cvs.height-40);
		texts.draw(main.ctx, texts.text[0]);
	};	//==============================//
	
//===============exit===============//
	this.exit = function() {
		delete cutscenes.start;
	};
};