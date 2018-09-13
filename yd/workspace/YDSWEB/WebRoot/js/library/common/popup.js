
/**
* 弹出多种书籍层
*/
/**
 * 将页面中的所有按钮加上样式.
 */
function regBtnFunc() {
	return;
}
/**
 * 弹出类.
 */
var PopupBox = Class.create();
PopupBox.prototype = {

	/**
	 * 构造方法.
	 * @param {Object} param 参数对象.
	 */
	initialize: function(param) {
		this.key = param.key;
		
		// 创建弹出层
		this.box = this.createBox(this.key, param.icon, param.title, param.content);
		
		// 设置元素可见
		if (Object.isElement(param.content)) {
			$(param.content).show();
			$(param.content).removeClassName('none');
		}
		if (Object.isElement(param.title)) {
			$(param.title).show();
			$(param.title).removeClassName('none');
		}
		
		// 创建遮罩层
		if ($(this.IDS.COVER) == null) {
			PopupBox.cover = this.createCover();
			$(document.body).insert({
				bottom: PopupBox.cover
			});
		} else {
			PopupBox.cover = $(this.IDS.COVER);
		}
		
		if (param.position == null) {
			param.position = 1;
		}
		this.box.setStyle({
			position: 'fixed',
			zIndex: parseInt(param.position) * 3
		});
		
		document.body.insert({
			bottom: this.box
		});
		
		// 方法绑定
		this.Popup = this._popup.bind(this, this.key);
		this.Close = this._close.bind(this, this.key);
		
		if (param.drag == true) {
			this.dragger = new SimpleDrag({
				dest: $(this.IDS.BOX + this.key),
				handle: $(this.IDS.HANDLE + this.key)
			});
		}
		
		$(this.IDS.CLOSE + this.key).observe('click', this.Close.curry(3));
		if (param.noclose == true) {
			$(this.IDS.CLOSE + this.key).hide();
		}
		
		// 回调设置
		this.beforeclose = param.beforeclose || nullFunc;
		this.afterclose = param.afterclose || nullFunc;
		
		this.status = 0;
	},
	
	/**
	 * 弹出方法.
	 * @param {String} key 唯一标识
	 * @param {int} top 上面距离.
	 * @param {int} left 左面距离.
	 * @param {bool} nocover 不带遮罩.
	 */
	_popup: function(key, top, left, nocover) {
		if ($(this.IDS.BOX + key).visible()) {
			return;
		}
		
		// zIndex栈初始化
		if (PopupBox.zstack == null) {
			PopupBox.zstack = new Array();
		}
		
		// 储存当前zIndex
		PopupBox.zstack.push(PopupBox.cover.getStyle('z-index'));
		
		// 设置新zIndex
		PopupBox.cover.setStyle({
			zIndex: parseInt($(this.IDS.BOX + key).getStyle('z-index')) - 2
		});
		if (!nocover) {
			PopupBox.cover.show();
		}
		$(this.IDS.BOX + key).show();
		
		// 指定位置
		if (top && left) {
			$(this.IDS.BOX + key).setStyle({
				top: top + 'px',
				left: left + 'px'
			});
			
			// 默认位置居中
		} else {
			left = (document.documentElement.clientWidth - $(this.IDS.BOX + key).getWidth()) / 2;
			top = (document.documentElement.clientHeight - $(this.IDS.BOX + key).getHeight()) / 2;
			top = top < 0 ? 50 : top;
			$(this.IDS.BOX + key).setStyle({
				top: top + 'px',
				left: left + 'px'
			});
		}
		this.status = 1;
	},
	
	/**
	 * 关闭弹出层.
	 * @param {String} key 弹出层标识.
	 * @param {int} callback 执行回调(0:无，1:关闭前，2:关闭后，3:全部).
	 */
	_close: function(key, callback) {
		if (callback == null) callback = 3;
		
		// 关闭前回调
		if (callback % 2 == 1 && this.beforeclose && !this.beforeclose()) return;
		$(this.IDS.BOX + key).hide();
		
		// 弹出遮罩层zIndex
		PopupBox.cover.setStyle({
			zIndex: PopupBox.zstack.pop()
		});
		if (PopupBox.zstack.length == 0) {
			PopupBox.cover.hide();
		}
		this.status = 0;
		// 关闭后回调
		if (callback > 1 && this.afterclose) this.afterclose();
	},
	
	/**
	 * 创建弹出层.
	 * @param {String} key 唯一标识.
	 * @param {String} icon 图标CSS.
	 * @param {Object} title 标题(元素).
	 * @param {Object} content 内容.
	 */
	createBox: function(key, icon, title, content) {
		return new Element('div', {
			'id': this.IDS.BOX + key,
			'class': this.CssEnum.BOX
		}).insert({
			top: new Element('table', {
				'border': '0',
				'cellpadding': '0',
				'cellspacing': '0',
				'class': 't_auto'
			}).insert({
				top: new Element('tbody').insert({
					bottom: new Element('tr', {
						'id': this.IDS.HANDLE + key,
						'class': this.CssEnum.TOP
					}).insert({
						bottom: new Element('th').addClassName(this.CssEnum.BG_T_L)
					}).insert({
						bottom: new Element('th').addClassName(this.CssEnum.BG_T_C).insert({
							bottom: new Element('div').addClassName('float_l padding_top_8 padding_right_6').insert({
								bottom: new Element('div', {
									'id': this.IDS.ICON + key,
									'class': icon
								})
							})
						}).insert({
							bottom: new Element('div', {
								'id': this.IDS.TITLE + key,
								'class': 'float_l'
							}).update(title)
						}).insert({
							bottom: new Element('div').addClassName('float_r').insert({
								top: new Element('a', {
									'id': this.IDS.CLOSE + key,
									'class': this.CssEnum.CLOSE,
									'href': '#',
									'title': '关闭'
								})
							})
						})
					}).insert({
						bottom: new Element('th').addClassName(this.CssEnum.BG_T_R)
					})
				}).insert({
					bottom: new Element('tr').insert({
						bottom: new Element('td').addClassName(this.CssEnum.BG_M_L)
					}).insert({
						bottom: new Element('td', {
							'id': this.IDS.BODY + key,
							'class': this.CssEnum.BODY
						}).update(content).setStyle({
							'padding': '3px'
						})
					}).insert({
						bottom: new Element('td').addClassName(this.CssEnum.BG_M_R)
					})
				}).insert({
					bottom: new Element('tr').insert({
						bottom: new Element('td').addClassName(this.CssEnum.BG_B_L)
					}).insert({
						bottom: new Element('td').addClassName(this.CssEnum.BG_B_C)
					}).insert({
						bottom: new Element('td').addClassName(this.CssEnum.BG_B_R)
					})
				})
			})
		}).hide();
	},
	
	/**
	 * 创建遮罩层.
	 */
	createCover: function() {
		return new Element('div', {
			'id': this.IDS.COVER,
			'class': 'cover'
		}).hide();
	},
	
	/**
	 * 主键ID前缀.
	 */
	IDS: {
		BOX: 'popbox_',
		HANDLE: 'pophandle_',
		TITLE: 'poptitle_',
		ICON: 'popico_',
		CLOSE: 'popclose_',
		BODY: 'popbody_',
		COVER: 'popcover'
	},
	
	CssEnum: {
		BG_T_L: 'bar_l',
		BG_T_C: 'bar_c',
		BG_T_R: 'bar_r',
		BG_M_L: 'line_l',
		BG_M_R: 'line_r',
		BG_B_L: 'line_b_l',
		BG_B_C: 'line_b_c',
		BG_B_R: 'line_b_r',
		BODY: 'bgclr_000',
		TOP: '',
		BOX: 'bar',
		CLOSE: 'close'
	},
	cover: null,
	zstack: null
}

/**
 * 重置菜单到默认状态.
 * @param {Object} selectId 菜单Id.
 */
function _resetSelect(selectId) {
	var selectElement = $(selectId);
	var options;
	while (selectElement != null) {
		options = selectElement.childElements();
		
		for (var i = 0, len = options.length; i < len; i++) {
			options[i].remove();
		}
		selectElement = $(selectElement.nextSelect);
	}
}

/**
 * 空方法，返回True.
 */
function nullFunc() {
	return true;
}

var MsgBox = new Object();
MsgBox.base = function(type, title, content, onOk, onCancel, btnOk, btnCancel) {
	var i = 0;
	while (MsgBox[type + i + 'Box'] && MsgBox[type + i + 'Box'].status == 1) {
		i++;
	}
	if (!MsgBox[type + i + 'Box']) {
		var popBody = new Element('div', {
			'id': type + i + 'Body',
			'class': 'span-6 last'
		}).insert({
			top: new Element('div').addClassName('span-6 last color_bl').insert({
				top: new Element('div').addClassName('margin_right_10 margin_top_2 margin_left_2').addClassName('msg_' + type),
				bottom: new Element('div', {
					'id': type + i + 'Content'
				}).setStyle({
					marginBottom: '6px',
					cssFloat: 'left',
					width: '165px',
					wordWrap: 'break-word'
				})
			}),
			bottom: new Element('div').addClassName('span-6 last color_bl').insert({
				bottom: new Element('div', {
					'id': type + i + 'Ok'
				}).addClassName('imgBtn1 float_r').update(btnOk).observe('click', function() {
					MsgBox[type + i + 'Box'].Close(1);
				}),
				top: type != 'confirm' ? null : new Element('div', {
					'id': type + i + 'Cancel'
				}).addClassName('imgBtn1 float_r  margin_left_6').update(btnCancel).observe('click', function() {
					MsgBox[type + i + 'Box'].Close(2);
				})
			})
		});
		MsgBox[type + i + 'Box'] = new PopupBox({
			key: 'msg' + type + i,
			title: new Element('div', {
				'id': type + i + 'Title'
			}),
			icon: '',
			content: popBody,
			position: 50 + MsgBoxConst.TopIndex,
			drag: true
		});
	}
	$(type + i + 'Content').setStyle({
		lineHeight: '48px',
		marginTop: '0px'
	});
	if (!title) {
		title = MsgBoxConst[type];
	}
	$(type + i + 'Title').update(title);
	$(type + i + 'Content').update(content);
	if (onOk) {
		MsgBox[type + i + 'Box'].beforeclose = function() {
			onOk();
			return true;
		};
	} else {
		MsgBox[type + i + 'Box'].beforeclose = nullFunc;
	}
	if (onCancel) {
		MsgBox[type + i + 'Box'].afterclose = onCancel;
	} else {
		MsgBox[type + i + 'Box'].afterclose = nullFunc;
	}
	MsgBox[type + i + 'Box'].Popup();
	
	$(type + i + 'Ok').focus();
	
	if ($(type + i + 'Content').getHeight() > 50) {
		$(type + i + 'Content').setStyle({
			lineHeight: '18px',
			marginTop: '6px'
		});
	}
	MsgBoxConst.TopIndex++;
}
MsgBox.message = function(content, title, onclose) {
	MsgBox.base('message', title, content, onclose, onclose, '确定');
}
MsgBox.error = function(content, title, onclose) {
	MsgBox.base('error', title, content, onclose, onclose, '确定');
}
MsgBox.confirm = function(content, title, onOk, onCancel, btnOk, btnCancel) {
	MsgBox.base('confirm', title, content, onOk, onCancel, btnOk, btnCancel);
}
var MsgBoxConst = {
	message: '提示',
	error: '错误',
	confirm: '确认',
	TopIndex: 0
}

/**
 * 会议室相关数据.
 */
var g_hysData;

/**
 * 多条信息书明细窗口.
 */
var g_hysInfo;
/**
 * 多条信息书明细窗口.
 */
var g_hysmimaInfo;

/**
 * 延时缓存.
 */
var g_posDelay;

/**
 * 上次激活的索引缓存.
 */
var g_lastIndex;


/**
 * 拖拽类.
 */
var SimpleDrag = Class.create();
SimpleDrag.prototype = {

	/**
	 * 构造方法.
	 * @param {Object} param 参数对象.
	 */
	initialize: function(param) {
	
		// 属性初始化
		this.drag = $(param.dest);
		this.handle = $(param.handle);
		this._x = this._y = 0;
		this.StopDrag = null;
		
		// 事件绑定
		this.MouseMove = this._mouseMove.bindAsEventListener(this);
 		this.StopDrag = this._stopDrag.bind(this, this.MouseMove, this.StopDrag);
		this.Start = this._start.bindAsEventListener(this);
		
		// 设置样式
		this.drag.setStyle({
			position: 'fixed'
		});
		this.handle.style.cursor = 'move';
		this.handle.observe('mousedown', this.Start);
		
		// 回调设置
		this.beforedrag = param.beforedrag ||
		function() {
			return true;
		};
		this.afterdrag = param.afterdrag ||
		function() {
			return true;
		};
		this.dragging = param.dragging ||
		function() {
		};
	},
	
	/**
	 * 开始拖动.
	 * @param {Object} oEvent 事件对象.
	 */
	_start: function(oEvent) {
	
		// 检查回调
		if (!this.beforedrag()) return;
		
		// 设置起始偏移
		this._left = oEvent.clientX - this.drag.offsetLeft;
		this._top = oEvent.clientY - this.drag.offsetTop;
		this.btop = this.drag.getStyle('top');
		this.bleft = this.drag.getStyle('left');
		
		// 绑定事件
		Event.observe(document, 'mousemove', this.MouseMove);
		Event.observe(document, 'mouseup', this.StopDrag);
		if (document.body.setCapture) this.drag.setCapture();
		
		// 禁止选中
		document.body.onselectstart = function() {
			return false;
		}
		Element.addClassName(document.body, 'mus');
	},
	
	/**
	 * 移动，设定位置坐标.
	 * @param {Object} oEvent 事件对象.
	 */
	_mouseMove: function(oEvent) {
		var l, t, pos;
		l = oEvent.clientX - this._left;
		t = oEvent.clientY - this._top;
		
		pos = this.drag.getDimensions();
		
		// 检查坐标范围
		if (l < 0) l = 0;
		if (t < 0) t = 0;
		if (l > document.documentElement.clientWidth - pos.width) l = document.documentElement.clientWidth - pos.width;
		if (t > document.documentElement.clientHeight - pos.height) t = document.documentElement.clientHeight - pos.height;
		
		this.drag.setStyle({
			left: l + 'px',
			top: t + 'px'
		});
		this.dragging();
	},
	
	/**
	 * 停止拖动.
	 */
	_stopDrag: function(upFunc, moveFunc) {
	
		// 取消事件绑定
		Event.stopObserving(document, 'mousemove', moveFunc);
		Event.stopObserving(document, 'mouseup', upFunc);
		if (document.body.releaseCapture) this.drag.releaseCapture();
		// 允许选中
		document.body.onselectstart = null;
		Element.removeClassName(document.body, 'mus');
		
		// 拖动结束回调
		if (!this.afterdrag()) {
			this.drag.setStyle({
				top: this.btop,
				left: this.bleft
			});
		}
	}
};