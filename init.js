'use strict';
let cvs = document.querySelector('#canvas');
let {main, back} = cvs.canvasEmitCamera;

let touch = new TouchesControl(cvs, e => e.path[0].className !== 'gui');

let cfg = {};
let scenes = {};
let cutscenes = {};

let db = {}; // resures: [images, audios]

cvs.loadFiles([
	{title: 'player', src: './img/player.png', type: 'image'},
	{title: 'background', src: './img/background.png', type: 'image'},
	{title: 'cutstart_background1', src: './img/cutstart_background1.png', type: 'image'}
], db).then(function() {
	setTimeout(function() {
		for(let i in cutscenes) cutscenes[i] = new Scene(cutscenes[i]);
		for(let i in scenes) scenes[i] = new Scene(scenes[i]);
		Scene.set(scenes.menu);
		requestAnimationFrame(_updata);
	}, 50);
});

//========== LoopGame ==========//
function _updata(dt) {
	touch.updata();
	Scene.active_scene.updata(dt);
	touch.onNull();
	requestAnimationFrame(_updata);
};

cvs.addEventListener('dblclick', e => cvs.webkitRequestFullScreen());