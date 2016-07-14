//import

import './../../libs/pure-min/pure-min.css';
import './app.css';

import Menu from './../menu/menu.js';
import Form from './../form/form.js';
import Model from './../model/model.js';


let menu = new Menu({
	el: document.querySelector('.js-menu'),
	tmpl: '#menu',
	data: {
		title: 'SINGLE PAGE APPLICATION FROM JS',
		items: [
			{
				href: 'https://vk.com',
				anchor: 'vk.com'
			},
			{
				href: 'https://ok.ru',
				anchor: 'ok.ru'
			},
			{
				href: 'https://yahoo.com',
				anchor: 'yahoo.com'
			},
			{
				href: 'https://yandex.ru',
				anchor: 'yandex.ru'
			}
		]
	}
});

let model = new Model({
	data: {},
	resource: 'menu',
	id: '-KIIIl-A1w7peqCRVZ0R'
});

let form = new Form({
	el: document.querySelector('.js-form'),
	tmpl: '#form'
});

menu.el.addEventListener('remove', function (event) {
	menu.removeItem(event.detail);
});

form.el.addEventListener('add', function (event) {
	menu.addItem(event.detail);
	model.setData(menu.data);
	model.save(); // сохранить на сервере
});

model.fetch(menu.render.bind(menu));
