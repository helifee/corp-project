/*
 * @(#)treeTable.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通
 */
/**
 * @fileoverview 树状表格JavaScript.
 *
 * @author zhangzheng
 * @version 1.0
 */
TreeTable = Class.create();
TreeTable.prototype = {
	initialize: function(param) {
		this.dest = $(param.dest);
		this.data = param.data;
		this.lvbKey = param.lvb;
		this.size = param.size;
		this.indent = param.indent;
		if (Object.isString(this.data)) {
			this.data = this.data.evalJSON();
		}
		this.size.width -= 2;
		this.size.height -= 2;
		this.indent -= 2;
		
		this.css = new Object();
		this.css.IconShow = 'img_opt opt_Plus';
		this.css.IconHide = 'img_opt opt_Add';
		
		this.msg = new Object();
		this.msg.sum = param.sumText;
		this.msg.show = '收缩';
		this.msg.hide = '展开';
		
		
		this.createLva = this._createLva.bind(this, param.lvaWidth, param.lvaClass);
		this.createLvb = this._createLvb.bind(this, param.lvbWidth, param.lvbClass);
		this.createBase = this._createBase.bind(this, param.noHead ? null : param.headWidth);
		this.lvaClick = this._lvaClick.bindAsEventListener(this);
		this.createBase();
	},
	_createBase: function(headCfg, noHead) {
	
		// 外层DIV
		this.table = new Element('div').addClassName('box_border').setStyle({
			width: this.size.width + 'px',
			height: this.size.height + 'px'
		});
		
		this.table.insert({
			// 头部
			top: this.head = (!headCfg ? "" : new Element('div', {
				'class': 'font_weight_b last text_center box_border_b box_head_bc'
			}).setStyle({
				width: this.size.width + 'px',
				height: '22px'
			})),
			// 内容表格
			bottom: this.grid = new Element('div', {
				'class': 'last overflow_scr_y'
			}).setStyle({
				width: this.size.width + 'px',
				height: (this.size.height - (!headCfg ? 3 : 23)) + 'px'
			})
		});
		
		if (headCfg) {
			// 填充头部文字
			Object.keys(headCfg).each(function(item, index) {
				this.head.insert({
					bottom: new Element('div', {
						'class': 'float_l ' + (index == 0 ? '' : 'box_border_l')
					}).setStyle({
						width: headCfg[item] + 'px',
						marginLeft: index == 0 ? '-2px' : '-1px'
					}).update(item)
				});
			}, this);
		}
		
		// 一级模版
		this.lvaTmpl = new Element('div').insert({
			top: new Element('div', {
				'class': 'float_l box_border_b treeTableLva',
				'stype': 'lva'
			}).setStyle({
				height: '22px',
				width: this.size.width + 'px'
			}),
			bottom: new Element('div', {
				'class': 'float_l box_border_b'
			}).setStyle({
				paddingLeft: this.indent + 'px',
				width: (this.size.width - this.indent) + 'px'
			}).hide()
		});
		
		// 二级模版
		this.lvbTmpl = new Element('div').insert({
			top: new Element('div', {
				'class': 'float_l box_border_t treeTableLvb',
				'stype': 'lvb'
			}).setStyle({
				width: (this.size.width - this.indent) + 'px',
				marginTop: '-1px'
			})
		});
		
		this.dest.update(this.table);
		this.createLva();
	},
	_createLva: function(lvaCfg, lvaCss) {
		var newLva;
		var lvaKeys = Object.keys(lvaCfg);
		for (var i = 0, ilen = this.data.length; i < ilen; i++) {
			newLva = this.lvaTmpl.clone(true);
			this.grid.insert({
				bottom: newLva
			});
			
			for (var j = 0, jlen = lvaKeys.length; j < jlen; j++) {
				newLva.down().insert({
					bottom: j == 0 ? new Element('div', {
						'class': 'float_l'
					}).setStyle({
						width: lvaCfg[lvaKeys[j]] - 2 + 'px'
					}).insert({
						top: new Element('div', {
							'class': 'float_l cur_pointer ' + this.css.IconHide,
							'title': this.msg.show,
							'stype': 'icon'
						}).setStyle({
							marginTop: '2px',
							marginLeft: '1px'
						}).observe('click', this.lvaClick),
						bottom: new Element('div', {
							'class': 'float_l'
						}).setStyle({
							width: (lvaCfg[lvaKeys[j]] - 18) + 'px',
							marginLeft: '-8px'
						}).update(this.data[i][lvaKeys[j]] || '&nbsp;').addClassName(lvaCss[lvaKeys[j]])
					}) : new Element('div', {
						'class': 'float_l box_border_l'
					}).setStyle({
						width: lvaCfg[lvaKeys[j]] + 'px',
						height: 'inherit',
						marginLeft: '-1px'
					}).update(this.data[i][lvaKeys[j]] || '&nbsp;').addClassName(lvaCss[lvaKeys[j]])
				});
			}
			newLva.down().insert({
				bottom: new Element('div', {
					'class': 'float_r'
				}).setStyle({
					marginRight: '23px'
				}).update(this.msg.sum ? this.msg.sum.format(this.data[i][this.lvbKey].length) : '&nbsp;')
			}).observe('click', this.lvaClick);
			
			this.createLvb(newLva, this.data[i][this.lvbKey]);
		}
	},
	_createLvb: function(lvbCfg, lvbCss, lva, lvbList) {
		var newLvb;
		var lvbKeys = Object.keys(lvbCfg);
		var lvaContent = lva.down().next();
		for (var i = 0, ilen = lvbList.length; i < ilen; i++) {
			newLvb = this.lvbTmpl.clone(true);
			lvaContent.insert({
				bottom: newLvb
			});
			for (var j = 0, jlen = lvbKeys.length; j < jlen; j++) {
				newLvb.down().insert({
					bottom: new Element('div', {
						'class': 'float_l box_border_l'
					}).setStyle({
						width: lvbCfg[lvbKeys[j]] + 'px',
						height: 'inherit',
						marginLeft: '-1px'
					}).update(lvbList[i][lvbKeys[j]] || '&nbsp;').addClassName(lvbCss[lvbKeys[j]])
				});
			}
		}
	},
	_lvaClick: function(event) {
		Event.stop(event);
		var element = Event.element(event);
		var stype = element.readAttribute('stype');
		if (stype == 'icon') {
			element = element.up(1);
		} else if (stype != 'lva') {
			return;
		}
		if (element.next().visible()) {
			element.next().hide();
			element.down(1).removeClassName(this.css.IconShow).addClassName(this.css.IconHide);
			element.down(1).writeAttribute({
				'title': this.msg.hide
			});
		} else {
			element.next().show();
			element.down(1).removeClassName(this.css.IconHide).addClassName(this.css.IconShow);
			element.down(1).writeAttribute({
				'title': this.msg.show
			});
		}
	}
}
