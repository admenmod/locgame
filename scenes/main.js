'use strict';
scenes.main = function() {
	let cameraMoveObject = new CameraMoveObject(main.camera);
	
	cfg.punelHeight = 40*2;
	let resizeHendlers = {
		gostic(screen) {
			gosticBody.pos.set(100, screen.y-cfg.punelHeight/2);
			gosticBody.yadro.pos.set(gosticBody.pos);
		},
		player(screen) {
			player.pos.y = cvs.height - player.size.y*player.scale.y - 90;
		},
		background(screen) {
			background.pos.y = -cfg.punelHeight;
			background.size.set(screen);
		}
	};
	
	cvs.on('resize', e => {
		let screen = cvs.size;
		netmap.size.set(screen);
		
		resizeHendlers.gostic(screen);
		resizeHendlers.player(screen);
		resizeHendlers.background(screen);
	});
	
	GUI.on('inventory', e => Scene.set(scenes.inventory));
	
	
	let gosticBody = new GosticX({ pos: vec2(100, cvs.height-cfg.punelHeight/2) });
	
	let player = new Player({
		posC: cvs.size.div(2),
		scale: vec2(0.1, 0.1),
		image: db.player,
		
		speed: 1
	});
	
	let backgroundImages = [db.background];
	let background = new ImageNode({
		size: vec2(cvs.width, cvs.height),
		image: backgroundImages[0]
	});
	
	resizeHendlers.gostic(cvs.size);
	resizeHendlers.player(cvs.size);
	resizeHendlers.background(cvs.size);
	
	
//===============init===============//
	this.init = function() { GUI.scenes.lineGame.hidden = false; };

//===============updata===============//
	this.updata = function(dt) {
		let touchC = main.camera.buf(touch);
	//=======prePROCES=======//--vs--//=======EVENTS=======//
	//	cameraMoveObject.updata(main.camera);
	//==================================================//
	
	
	//=======PROCES=======//--vs--//=======UPDATA=======//
		gosticBody.updata();
		
		
		player.pos.moveAngle(gosticBody.value*player.speed, gosticBody.angle);
		
	//	main.camera.moveTime(player.getPosC().minus(cvs.size.div(2)), 10);
	//==================================================//
	
	
	//==========DRAW==========//--vs--//==========RENDER==========//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
	//	netmap.draw(main);
		
		background.draw(main);
		
		player.draw(main);
		
		main.save();
		main.beginPath();
		main.fillStyle = '#11111155';
		main.fillRect(0, cvs.height-cfg.punelHeight, cvs.width, cfg.punelHeight);
		
		main.beginPath();
		main.strokeStyle = '#aaaaaa';
		main.strokeRect(0, cvs.height-cfg.punelHeight, cvs.width, cfg.punelHeight);
		main.restore();
		
		gosticBody.draw(main.ctx);
	};	//==============================//
	
//===============exit===============//
	this.exit = function() { GUI.scenes.lineGame.hidden = true; };
};