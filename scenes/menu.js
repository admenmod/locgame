'use strict';
scenes.menu = function() {
	GUI.on('cutstart', e => Scene.set(cutscenes.start));
	
	let code = codeFunction(function() {
		function djjd() {
			ldje(33);
		};
	//	lge(493);
		djjd();
	}, {
		log: console.log,
		dir: console.dir,
		console,
		Error,
		codeFunction,
		Object
	});
	
	code.call(null);
	
	
	let xx = {message: '933dredfef'}; //new Error('code error', 'code--kd.js', 1);
//	xx.fileName = 'dejd';
//	throw xx;

	
//===============init===============//
	this.init = function() {
		GUI.scenes.menu.hidden = false;
	};
	
//===============updata===============//
/*	this.updata = function(dt) {
		let touchC = main.camera.buf(touch);
	//=======prePROCES=======//--vs--//=======EVENTS=======//
		cameraMoveObject.updata(main.camera);
	//==================================================//
	
	
	//=======PROCES=======//--vs--//=======UPDATA=======//
		// ...;
	//==================================================//
	
	
	//==========DRAW==========//--vs--//==========RENDER==========//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(main);
	};	//==============================//
	*/
//===============exit===============//
	this.exit = function() {
		GUI.scenes.menu.hidden = true;
	};
};