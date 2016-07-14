//import
import templateEngine from './../../libs/templateEngine';
import template from './menu.jade';

import './menu.css';

/**
 * @class Menu
 * Компонента "Меню"
 */
class Menu {

	/**
	 * @constructor
	 * @param  {Object} opts
	 */
	constructor(opts) {
		this.el = opts.el;
		this.data = opts.data;

		console.time('tmpl_innerHTML');
		this._template = document.querySelector(opts.tmpl).innerHTML;
		console.timeEnd('tmpl_innerHTML');

		console.time('jade_init');
		this._template_jade = template;
		console.timeEnd('jade_init');

		this.render();
		this._initEvents();
	}

	/**
	 * Добавляем элемент меню
	 * @param {Object} item
	 */
	addItem (item) {
		this.data.items.push(item);
		this.render();
	}

	/**
	 * Удаляем пункт меню из данных
	 * @param  {Object} removedItem
	 */
	removeItem (removedItem) {
		this.data.items = this.data.items.filter((item, index) => {
			return index !== removedItem.index;
		});
		this.render();
	}

	/**
	 * Создаем HTML
	 * @param {Object|undefined} data
	 */
	render (data) {
		if (data) {
			this.data = data;
		}

		console.time('tmpl_innerHTML_render');
		this.el.innerHTML = templateEngine(this._template, this.data);
		console.timeEnd('tmpl_innerHTML_render');

		console.time('tmpl_jade_render');
		this.el.innerHTML = this._template_jade(this.data);
		console.timeEnd('tmpl_jade_render');
	}

	/**
	* Удаления элемента меню
	* @param  {HTMLElement} item
	* @private
	*/
	_onRemoveClick(item) {
		let index = parseInt(item.parentNode.dataset.index, 10);

		this.trigger('remove', {
			index
		});
	}

	/**
	* Выбор элемента меню
	* @param  {HTMLElement} item
	*/
	pickItem(item) {
		this.trigger('pick', {
			href: item.getAttribute('href'),
			anchor: item.textContent
		});
	}

	/**
	* Развешиваем события
	*/
	_initEvents() {
		this.el.addEventListener('click', this._onClick.bind(this));
	}

	/**
	* Клик в любую область меню
	* @param {Event} event
	* @private
	*/
	_onClick(event) {
		event.preventDefault();
		let item = event.target;

		switch (item.dataset.action) {
			case 'remove':
			this._onRemoveClick(item);
			break;

			case 'pick':
			this.pickItem(item);
			break;
		}
	}

	/**
	* Сообщение миру о случившемся
	* @param {string} name тип события
	* @param {Object} data объект события
	*/
	trigger (name, data) {
		let widgetEvent = new CustomEvent(name, {
	        bubbles: true,
	        detail: data
	      });

	    this.el.dispatchEvent(widgetEvent);
	}


}

// Export
export default Menu;
