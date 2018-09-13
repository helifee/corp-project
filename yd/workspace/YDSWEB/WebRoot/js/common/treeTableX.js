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
TreeTableX = Class.create();
TreeTableX.prototype = {
	css: {
		IconShow: 'img_opt opt_Plus',
		IconHide: 'img_opt opt_Add',
		IconLoad: 'smallLoading',
		Style: ['zero', 'treeTableLv1', 'treeTableLv2', 'treeTableLv3', 'treeTableLv4', 'treeTableLv5']
	},
	msg: {
		show: '收缩',
		hide: '展开'
	},
	initialize: function(param, data){
		if (param.ajax && param.ajax.lv1 != '' && data == null) {
			return;
		}
		
		this._level = param._level || 1;
		this._child = this._level + 1;
		this.total = param.totalLevel;
		this._endpoint = (this._child == this.total);
		
		this.dest = $(param.dest);
		this.data = data;
		this.ajax = param.ajax ? (param.ajax['lv' + this._child] || '') : '';
		this.indent = param['lv' + this._child + 'Indent'];
		this.lvbKey = param['lv' + this._child + 'Name'];
		this.size = Object.clone(param.size);
		this.size.height -= 2;
		this.indent -= 2;
		
		if (Object.isString(this.data)) {
			this.data = this.data.evalJSON();
		}
		if (!this.data || this.data.length == 0) 
			return;
		this.info = param.big && this._level == 1 ? true : false;
		this.rate = param.rate || 0.2;
		
		this.createLva = this._createLva.bind(this, param['lv' + this._level +
		'Width'], param['lv' + this._level + 'Class']);
		// 最底层/中间层处理
		if (this._endpoint) {
			this.createLvb = this._createLvb.bind(this, param, this._child);
		} else {
			this.createLvb = this._createLvx.bind(this, param);
			
			this.next = {};
			this.next.size = {
				width: this.size.width - this.indent - 2
			};
			this.next._level = this._level + 1;
		}
		
		// 生成框架
		if (this._level == 1) {
			// 鼠标单击事件
			this.ElementClick = this._ElementClick.bindAsEventListener(this);
			this.createBase = this._createBase.bind(this, param.noHead ? null : param.headWidth);
			this.ajaxCreateMid = this._createLvx.bind(this, param);
			this.ajaxCreateEnd = this._createLvb.bind(this, param);
			this.createBase();
		} else {
			this.grid = param.dest;
		}
		
		// 生成1级元素
		this.createLva();
		
		// 显示/隐藏
		this.ToggleLine = this._toggleLine.bind(this);
	},
	_createBase: function(headCfg){
		// 外层DIV
		this.table = new Element('div').addClassName('box_border').setStyle({
			width: this.size.width - 2 + 'px',
			height: this.size.height - 2 + 'px'
		});
		
		this.table.insert({
			// 头部
			top: this.head = (!headCfg ? "" : new Element('div', {
				'class': 'font_weight_b last text_center box_border_b box_head_bc'
			}).setStyle({
				width: this.size.width - 2 + 'px',
				height: '22px'
			})),
			// 内容表格
			bottom: this.grid = new Element('div', {
				'class': 'last overflow_scr_y'
			}).setStyle({
				width: this.size.width - 2 + 'px',
				height: (this.size.height - (!headCfg ? 3 : 23)) +
				'px'
			})
		});
		
		if (headCfg) {
			// 填充头部文字
			Object.keys(headCfg).each(function(item, index){
				this.head.insert({
					bottom: new Element('div', {
						'class': 'float_l ' +
						(index == 0 ? '' : 'box_border_l')
					}).setStyle({
						width: headCfg[item] + 'px',
						marginLeft: index == 0 ? '-2px' : '-1px'
					}).update(item)
				});
			}, this);
		}
		this.table.observe('click', this.ElementClick);
		this.dest.update(this.table);
	},
	_createLva: function(lvaCfg, lvaCss){
		var newLva;
		var lvaKeys = Object.keys(lvaCfg);
		var ajaxTemplate = (this.ajax == '' ? null : new Template(this.ajax));
		this.info && showOpTip('处理中 0.0%');
		if (!this.lvaTmpl) {
			// 一级模版
			this.lvaTmpl = new Element('div', {
				'stype': 'lvablock'
			}).insert({
				top: new Element('div', {
					'class': 'float_l box_border_b box_border_t margin_top_p1 overflow_hd ' +
					this.css.Style[this._level],
					'stype': 'lva',
					'level': this._level
				}).setStyle({
					height: '22px',
					width: this.size.width + 'px'
				}),
				bottom: new Element('div', {
					'class': 'float_l box_border_l margin_bottom_p1 box_border_b',
					'stype': 'lvacontent',
					'level': this._level
				}).setStyle({
					marginLeft: this.indent -
					(this._endpoint ? 1 : 1) +
					'px',
					width: (this.size.width -
					this.indent -
					(this._endpoint ||
					this._level == 1 ? 0 : 2)) +
					'px'
				}).hide()
			});
		}
		
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
						width: lvaCfg[lvaKeys[j]] -
						2 +
						'px'
					}).insert({
						top: new Element('div', {
							'class': 'float_l cur_pointer ' +
							this.css.IconHide,
							'title': this.msg.show,
							'stype': 'icon',
							'level': this._level
						}).setStyle({
							marginTop: '2px',
							marginLeft: '1px'
						}),
						bottom: new Element('div', {
							'class': 'float_l',
							'property': lvaKeys[j]
						}).setStyle({
							width: (lvaCfg[lvaKeys[j]] - 18) +
							'px',
							marginLeft: '-8px'
						}).update(this.data[i][lvaKeys[j]] != null ? this.data[i][lvaKeys[j]] : '&nbsp;').addClassName(lvaCss[lvaKeys[j]])
					}) : new Element('div', {
						'class': 'float_l box_border_l',
						'property': lvaKeys[j],
						'level': this._level
					}).setStyle({
						width: lvaCfg[lvaKeys[j]] +
						'px',
						height: 'inherit',
						marginLeft: '-1px'
					}).update(this.data[i][lvaKeys[j]] != null ? this.data[i][lvaKeys[j]] : '&nbsp;').addClassName(lvaCss[lvaKeys[j]])
				});
			};
			if (ajaxTemplate) {
				newLva.down().writeAttribute('ajaxUrl', ajaxTemplate.evaluate(this.data[i]));
			} else {
				if(this.info){
					this.createLvb.delay((i + 2) * this.rate, newLva, this.data[i][this.lvbKey], (i+1)*100/ilen);
				}else{
					this.createLvb(newLva, this.data[i][this.lvbKey], 1);
				}
			}
		}
		if (this._level == 1) {
			this.grid.insert({
				bottom: '<div style="width:100px;height:10px;overflow:hidden;">&nbsp;</div>'
			});
		}
	},
	_createLvb: function(baseParam, level, lva, lvbList, percent){
		this.info && window.clearTimeout(window['opTipDelay']);
		this.info && showOpTip('处理中 ' + percent.toFixed(1) + '%');
		var lvbCss = baseParam['lv' + level + 'Class'];
		var lvbCfg = baseParam['lv' + level + 'Width'];
		var newLvb;
		var lvbKeys = Object.keys(lvbCfg);
		var lvaContent = lva.down().next().update();
		var lvbIndent = baseParam['lv' + level + 'Indent'];
		var lvaWidth = lva.down().getStyle('width').replace('px', '');
		if (!this.lvbTmpl) {
			// 二级模版
			this.lvbTmpl = new Element('div', {
				'stype': 'lvbblock'
			}).insert({
				top: new Element('div', {
					'class': 'float_l box_border_t overflow_hd ' + this.css.Style[level],
					'stype': 'lvb',
					'level': level
				}).setStyle({
					height: '22px',
					width: (lvaWidth - lvbIndent + 2) + 'px',
					marginTop: '-1px'
				})
			});
		}
		for (var i = 0, ilen = lvbList.length; i < ilen; i++) {
			newLvb = this.lvbTmpl.clone(true);
			lvaContent.insert({
				bottom: newLvb
			});
			for (var j = 0, jlen = lvbKeys.length; j < jlen; j++) {
				newLvb.down().insert({
					bottom: new Element('div', {
						'class': 'float_l box_border_l',
						'property': lvbKeys[j],
						'level': level
					}).setStyle({
						width: lvbCfg[lvbKeys[j]] +
						'px',
						height: 'inherit',
						marginLeft: '-1px'
					}).update(lvbList[i][lvbKeys[j]] != null ? lvbList[i][lvbKeys[j]] : '&nbsp;').addClassName(lvbCss[lvbKeys[j]])
				});
			}
		}
		lva.down(2).removeClassName(this.css.IconLoad);
	},
	_createLvx: function(baseParam, lva, lvbList){
		var param = Object.clone(baseParam);
		param = Object.extend(param, this.next);
		param.dest = lva.down().next();
		param.dest.update();
		new TreeTableX(param, lvbList);
		lva.down(2).removeClassName(this.css.IconLoad);
	},
	_ElementClick: function(event){
		// Event.stop(event);
		var element = Event.element(event);
		var stype = element.readAttribute('stype');
		if (element.tagName != 'DIV') 
			return;
		if (element.up('div[stype="lvb"]')) 
			return;
		element = element.up('div[stype="lva"]');
		if (element) {
			var ajaxUrl = element.readAttribute('ajaxUrl');
			if (ajaxUrl) {
				var level = element.readAttribute('level') - 0 + 1;
				element.down(1).addClassName(this.css.IconLoad);
				if (level == this.total) {
					TreeTableX.AjaxLoadData.defer(ajaxUrl, this.ajaxCreateEnd.curry(level, element.up()), this.ToggleLine.curry(element));
				} else {
					TreeTableX.AjaxLoadData.defer(ajaxUrl, this.ajaxCreateMid.curry(element.up()), this.ToggleLine.curry(element));
				}
				element.writeAttribute('_ajaxUrl', ajaxUrl);
				element.writeAttribute('ajaxUrl', null);
			} else {
				this.ToggleLine(element);
			}
		}
	},
	_toggleLine: function(element){
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

TreeTableX.Reload = function(element){
	var stype = element.readAttribute('stype');
	var element = (stype == 'lvablock' ? element.down() : (stype == 'lvacontent' ? element.previous() : element));
	var ajaxUrl = element.readAttribute('_ajaxUrl');
	element.writeAttribute('ajaxUrl', ajaxUrl);
	if (element.next().visible()) {
		fireEvent(element.down(), 'click');
		fireEvent(element.down(), 'click');
	}
}
TreeTableX.AjaxLoadData = function(url, callback, callback2){
	new Ajax.Request(url, {
		method: 'get',
		parameters: '',
		onSuccess: function(request){
			var ret = request.responseText.evalJSON();
			callback(ret);
			if (callback2) 
				callback2();
		}
	});
}
