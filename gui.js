'use strict';
let GUI = new EventEmitter();
GUI.element = document.querySelector('.gui');
GUI.element.addEventListener('click', function(e) {
	let data = e.target.dataset;
	if(data.button) GUI.emit(data.button, e, data);
});

GUI.buttons = {};
for(let i of document.querySelectorAll('button[data-button]')) {
	if(i.dataset.button) GUI.buttons[i.dataset.button] = i;
};

GUI.scenes = {};
for(let i of document.querySelectorAll('div[data-scene]')) {
	if(i.dataset.scene) GUI.scenes[i.dataset.scene] = i;
};
