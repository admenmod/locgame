'use strict';
scenes.inventory = function() {
	

//===============init===============//
	this.init = function() {};

//===============updata===============//
	this.updata = function(dt) {
		let touchC = main.camera.buf(touch);
	//=======prePROCES=======//--vs--//=======EVENTS=======//
	//	cameraMoveObject.updata(main.camera);
	//==================================================//
	
	
	//=======PROCES=======//--vs--//=======UPDATA=======//
		if(touch.isPress()) Scene.set(scenes.main);
	//==================================================//
	
	
	//==========DRAW==========//--vs--//==========RENDER==========//
		main.ctx.clearRect(0, 0, cvs.width, cvs.height);
		netmap.draw(main);
	};	//==============================//
	
//===============exit===============//
	this.exit = function() {};

};