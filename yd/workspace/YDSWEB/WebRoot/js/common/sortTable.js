/*
 * @(#)sortTable.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通
 */
/**
 * @fileoverview 表格排序JavaScript.
 *
 * @author zhangzheng
 * @version 1.0
 */
SortTable = Class.create();
SortTable.prototype = {

	/**
	 * 初始化.
	 * @param {Object} headId 表头Id.
	 * @param {Object} tableId 表格Id.
	 */
	initialize: function(headId, tableId) {
		this.head = $(headId);
		this.table = tableId;
		this.subMenu = this._createSubMenu(this.head);
		this.menu = this._createMenu();
		this.initSubMenu = this._initSubMenu.bind(this);
		this.initMenu = this._initMenu.bind(this);
		this.initBar = this._initBar.bind(this);
		this.hideMenu = this._hideMenu.bind(this);
		this.showMenu = this._showMenu.bind(this);
		this.menuItemClick = this._menuItemClick.bindAsEventListener(this);
		this.initSubMenu();
		this.initMenu();
		this.initBar();
		
		$(document.body).observe('click', this._clickGlobal.bindAsEventListener(this));
	},
	
	/**
	 * 全局鼠标单击事件.
	 * @param {Object} event 鼠标事件.
	 */
	_clickGlobal: function(event) {
		var element = Event.element(event);
		var anc = element.ancestors();
		if (this.menu.visible() && anc.indexOf(this.menu) < 0 && anc.indexOf(this.subMenu) < 0) {
			this.hideMenu();
			this.bar.hide();
			this.bar.status = 0;
			if (element.sortting == 1 && element.up('table').id == this.head.id) {
				fireEvent(element, 'mouseover');
			}
		}
	},
	
	/**
	 * 显示菜单.
	 */
	_showMenu: function() {
		var baroffset = this.bar.cumulativeOffset();
		var tableRight = $(this.table).cumulativeOffset().left + $(this.table).getWidth();
		this.menu.setStyle({
			top: (baroffset[1] + this.bar.getHeight() + 1) + 'px'
		});
		this.menu.setStyle({
			left: ((baroffset[0] + this.menu.getWidth() > tableRight) ? (baroffset[0] + this.bar.getWidth() - this.menu.getWidth()) : baroffset[0]) + 1 + 'px'
		});
		if (this.menu.actItem) {
			this.menu.actItem.removeClassName('bgclr_powderblue');
			this.menu.actItem = null;
		}
		if (this.bar.nosort == 1) {
			this.menu.down().hide();
			this.menu.down().next().hide();
		} else {
			this.menu.down().show();
			this.menu.down().next().show();
		}
		this.menu.show();
		this.menu.status = 1;
	},
	
	/**
	 * 隐藏菜单.
	 */
	_hideMenu: function() {
		this.subMenu.hide();
		this.menu.hide();
		this.menu.actMenu = null;
		this.menu.status = 0;
	},
	
	/**
	 * 初始化菜单.
	 */
	_initMenu: function() {
		var lines = this.menu.childElements();
		var item;
		this.menu.status = 0;
		for (var i = 0; i < lines.length; i++) {
			lines[i].observe('mouseover', this.menuItemClick, true);
		}
		lines[0].observe('click', this._sort.bind(this, true));
		lines[1].observe('click', this._sort.bind(this, false));
		lines[2].subMenu = this.subMenu;
	},
	
	_menuItemClick: function(event) {
		var item = Event.element(event);
		if(!item.hasClassName('last'))item = item.up();
		if (item.up().actItem != null) {
			item.up().actItem.removeClassName('bgclr_powderblue');
		}
		item.up().actItem = item.addClassName('bgclr_powderblue');
		if (item.up().actMenu) {
			item.up().actMenu.hide();
			item.up().actMenu = null;
		}
		if (item.subMenu) {
			var itemoffset = item.cumulativeOffset();
			var tableRight = $(this.table).cumulativeOffset().left + $(this.table).getWidth();
			item.subMenu.show();
			item.subMenu.setStyle({
				top: (itemoffset[1] + 0) + 'px',
				left: ((itemoffset[0] + item.subMenu.getWidth() + item.up().getWidth()> tableRight) ? (itemoffset[0] - item.subMenu.getWidth() + 1) : (itemoffset[0] + item.up().getWidth())) + 'px'
			});
			
			item.up().actMenu = item.subMenu;
		}
	},
	/**
	 * 初始化子菜单.
	 */
	_initSubMenu: function() {
		this.subMenu.childElements().each(function(item, index) {
			item.down(1).checked = true;
			item.chk = 1;
			item.index = index;
			item.setColumn = this._setColumn.bind(this, index);
			if (!item.down(1).readAttribute('disabled')) {
				item.observe('click', function() {
					if (item.chk != 0) {
						item.chk = 0;
						item.down(1).checked = false;
						item.setColumn(false);
					} else {
						item.chk = 1;
						item.down(1).checked = true;
						item.setColumn(true);
					}
				});
			}
		}, this);
	},
	
	/**
	 * 初始化浮动按钮.
	 */
	_initBar: function() {
		var thArr = this.head.down(1).childElements();
		this.bar = new Element('div', {
			'class': 'img_opt opt_EditTable position_abs cur_pointer float_l'
		}).hide();
		$(document.body).insert({
			bottom: this.bar
		});
		this.bar.status = 0;
		this.bar.menu = this.menu;
		this.bar.observe('click', this._barClick.bindAsEventListener(this));
		this.bar.observe('mouseover', this._barOver.bindAsEventListener(this));
		this.bar.observe('mouseout', this._barOut.bindAsEventListener(this));
		thArr.each(function(th, index) {
			var thoffset = th.cumulativeOffset();
			th.update(new Element('label').addClassName('cur_pointer').update(th.innerHTML).observe('click', this._thClick.bindAsEventListener(this)));
			th.bar = this.bar;
			th.index = index;
			th.sortting = 1;
			th.observe('mouseover', function(event) {
				if (th.bar.menu.visible()) {
					return;
				}
				var offset = th.cumulativeOffset();
				var pOffset = th.cumulativeScrollOffset();
				th.bar.setStyle({
					top: (offset[1] - pOffset[1] + document.documentElement.scrollTop + 5) + 'px',
					left: (offset[0] - pOffset[0] + document.documentElement.scrollLeft + th.getWidth() - 18) + 'px'
				});
				
				th.bar.index = th.index;
				th.bar._th = th;
				th.bar.sorttype = th.readAttribute('sorttype');
				th.bar.nosort = th.readAttribute('nosort');
				th.bar.source = th.readAttribute('source');
				if (th.bar.delay != null) {
					window.clearTimeout(th.bar.delay);
					th.bar.delay = null;
				}
				th.bar.show();
			});
			th.observe('mouseout', function(event) {
				if (th.bar.status != 1 && th.bar.menu.status != 1) {
					if (th.bar.delay == null) {
						th.bar.delay = Element.hide.delay(0.2, th.bar);
					}
				}
			});
		}, this);
	},
	
	/**
	 * 单击表头事件.
	 * @param {Object} event 事件对象.
	 */
	_thClick: function(event) {
		var sp = Event.element(event);
		var asc;
		if (this.prevSort == sp) {
			asc = !this.prevAsc;
		} else {
			asc = true;
		}
		
		this._sort(asc);
		fireEvent(sp.up(), 'mouseover');
	},
	
	/**
	 * 表格排序.
	 * @param {bool} asc 升序.
	 */
	_sort: function(asc) {
		var sp = this.bar._th.down();
		if (this.bar.nosort == '1') return;
		if (!sp.rValue) sp.rValue = sp.innerHTML;
		if (this.prevSort) {
			this.prevSort.update(this.prevSort.rValue);
		}
		sp.update(sp.rValue + (asc ? '↑' : '↓'));
		
		this._sortCore(this.bar, this.table, asc);
		listColor(this.table);
		this.hideMenu();
		this.bar.status = 0;
		this.bar.hide();
		
		this.prevSort = sp;
		this.prevAsc = asc;
	},
	
	/**
	 * 设置表格列可见/不可见.
	 * @param {int} index 列索引.
	 * @param {bool} visible 是否可见.
	 */
	_setColumn: function(index, visible) {
		var trs, ths;
		trs = $(this.table).select('tr');
		thb = this.head.down(1);
		for (var i = 0, len = trs.length; i < len; i++) {
			if (visible) {
				trs[i].childElements()[index].show();
				thb.childElements()[index].show();
			} else {
				trs[i].childElements()[index].hide();
				thb.childElements()[index].hide();
			}
		}
		
	},
	
	/**
	 * 鼠标移上浮动按钮.
	 * @param {Object} event 鼠标事件.
	 */
	_barOver: function(event) {
		this.bar.status = 1;
		if (this.bar.delay != null) {
			window.clearTimeout(this.bar.delay);
			this.bar.delay = null;
		}
	},
	
	/**
	 * 鼠标移出浮动按钮.
	 * @param {Object} event 鼠标事件.
	 */
	_barOut: function(event) {
		if (this.bar.menu && this.bar.menu.status != 1) {
			this.bar.status = 0;
		}
	},
	
	/**
	 * 鼠标单击浮动按钮.
	 * @param {Object} event 鼠标事件.
	 */
	_barClick: function(event) {
		Event.stop(event);
		if (this.bar.menu.status != 0) {
			this.hideMenu();
		} else {
			this.showMenu();
		}
		this.subMenu.hide();
		this.menu.actMenu = null;
	},
	
	/**
	 * 创建菜单.
	 */
	_createMenu: function() {
		var menu = new Element('div').setStyle({
			borderTop: '1px solid #000',
			borderLeft: '1px solid #000',
			borderRight: '1px solid #000',
			width: '100px'
		}).addClassName('bgclr_fff position_abs cur_default').insert({
			bottom: new Element('div').insert({
				top: new Element('div').addClassName('float_l img_opt opt_FillUp margin_top_2'),
				bottom: new Element('div').addClassName('float_l w_65 margin_left_2').update('升序排列')
			}).insert({
				bottom: new Element('div').addClassName('clear')
			}).setStyle({
				borderBottom: '1px solid #000',
				width: '100px'
			}).addClassName('last float_l')
		}).insert({
			bottom: new Element('div').insert({
				top: new Element('div').addClassName('float_l img_opt opt_FillDown margin_top_2'),
				bottom: new Element('div').addClassName('float_l w_65 margin_left_2').update('降序排列')
			}).insert({
				bottom: new Element('div').addClassName('clear')
			}).setStyle({
				borderBottom: '1px solid #000',
				width: '100px'
			}).addClassName('last float_l')
		}).insert({
			bottom: new Element('div').insert({
				top: new Element('div').addClassName('float_l img_opt opt_Table margin_top_2'),
				bottom: new Element('div').addClassName('float_l w_65 margin_left_2').update('隐藏列')
			}).insert({
				bottom: new Element('div').addClassName('img_opt opt_MoveNext margin_top_2')
			}).insert({
				bottom: new Element('div').addClassName('clear')
			}).setStyle({
				borderBottom: '1px solid #000',
				width: '100px'
			}).addClassName('last float_l')
		}).hide();
		menu.setStyle({
			zIndex: 2
		});
		$(document.body).insert({
			bottom: menu
		});
		return menu;
	},
	
	/**
	 * 创建子菜单.
	 * @param {Object} head 表头.
	 */
	_createSubMenu: function(head) {
		var thArr = head.down(1).childElements();
		var subMenu = new Element('div').addClassName('bd_t_1s000 bd_l_1s000 bd_r_1s000 bgclr_fff span-3 cur_default position_abs').hide();
		thArr.each(function(item, index) {
			subMenu.insert({
				bottom: new Element('div').addClassName('bd_b_1s000 span-3 last').insert({
					top: new Element('div').addClassName('float_l padding_top_4 padding_left_2').update(new Element('input', {
						'type': 'checkbox',
						'disabled': item.readAttribute('locked') == '1'
					})),
					bottom: new Element('div').addClassName('float_l margin_left_2').update(item.innerHTML)
				}).insert({
					bottom: new Element('div').addClassName('clear')
				})
			});
		})
		subMenu.setStyle({
			zIndex: 5
		});
		$(document.body).insert({
			bottom: subMenu
		});
		subMenu.observe('mouseover', function() {
			subMenu.status = 1;
		});
		subMenu.observe('mouseout', function() {
			subMenu.status = 0;
		});
		return subMenu;
	},
	
	/**
	 * 表格排序处理.
	 * @param {Object} bar 浮动按钮.
	 * @param {Object} table 表格.
	 * @param {bool} asc 是否升序.
	 */
	_sortCore: function(bar, table, asc) {
		var tbody = $(table).down();
		//var trs = $(table).select('tr');
		var trs = tbody.childElements();
		var list = [];
		var bean;
		var exp;
		var results;
		var me;
		trs.each(function(tr, index) {
			me = tr.childElements()[bar.index];
			bean = new Object();
			bean.index = index;
			if (bar.source && !bar.source.empty()) {
				exp = bar.source;
			} else {
				exp = 'me.innerHTML';
			}
			bean.value = eval(exp);
			if (bar.sorttype == 'date') {
				results = bean.value.match(/^ *(\d+)[-\/]{1}(\d+)[-\/]{1}(\d+) *$/);
				if (results) {
					results.shift();
					results.each(function(item) {
						if (item.length == 1) item = '0' + item;
					});
					bean.value = results.join();
				}
			} else if (bar.sorttype == 'number') {
				bean.value = bean.value - 0;
			}
			list.push(bean);
			tr.writeAttribute({
				'index': index
			});
		});
		
		mergeSort(list);
		if (!asc) {
			list.reverse();
		}
		
		list.each(function(item) {
			tbody.insert({
				bottom: tbody.down('[index="' + item.index + '"]')
			});
		});
	}
}

/**
 * 归并排序.
 * @param {Object} array 数组.
 * @param {Object} start 起始索引.
 * @param {Object} end 结束索引.
 * @param {Object} list 合并后数组.
 */
function mergeSort(array, start, end, list) {
	if (start == null) start = 0;
	if (end == null) end = array.length - 1;
	if (list == null) list = new Array(array.length);
	if (start >= end) return;
	var merge = (start + end) >> 1;
	mergeSort(array, start, merge, list);
	mergeSort(array, merge + 1, end, list);
	for (var i = start, j = start, k = merge + 1; i <= end; ++i) {
		if((k > end || j <= merge && array[j].value < array[k].value)){
			list[i] = array[j];
			j++;
		} else {
			list[i] = array[k];
			k++;
		}
		
	}
	for (var i = start; i <= end; ++i) 
		array[i] = list[i];
}
