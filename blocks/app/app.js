(function () {
	'use strict';
	let Menu = window.Menu;

	window.menu = new Menu({
		el: document.querySelector('.js-menu'),
		data: {
			title: 'SINGLE PAGE APPLICATION',
			items:  [
				{
					href: 'https://vk.com/',
					anchor: 'vk.com'
				},
				{
					href: 'https://ok.ru/',
					anchor: 'ok.ru'
				},
				{
					href: 'https://yahoo.com/',
					anchor: 'yahoo.com'
				},
				{
					href: 'https://vk.com/',
					anchor: 'vk.com'
				},
				{
					href: 'https://ok.ru/',
					anchor: 'ok.ru'
				},
				{
					href: 'https://yahoo.com/',
					anchor: 'yahoo.com'
				}
			]
		}
	});


	menu.el.addEventListener('pick', function () {
		debugger;
	});

})();