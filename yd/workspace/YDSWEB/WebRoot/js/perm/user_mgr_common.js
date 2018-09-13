
/**
 * Class定义.
 */
var UserMgr = Class.create();

UserMgr.prototype = Object.extend(new UserMgr, {
	initialize: function(param) {
		g_mode = param.mode;
		g_container = param.container;
		ActionEnum.SourceAction = param.sourceAction;
		ActionEnum.DestAction = param.destAction;
		ActionEnum.SelectAction = param.selectAction;
		if (param.sourceParam) ActionEnum.SourceParam = param.sourceParam;
		if (param.destParam) ActionEnum.DestParam = param.destParam;
		if (param.selectParam) ActionEnum.SelectParam = param.selectParam;
		Event.observe(window, 'load', init);
	}
});

/**
 * 文字枚举.
 */
var MsgEnum = {
	Show: '展开',
	Hide: '收缩',
	AShow: '全展开',
	AHide: '全收缩',
	Selecting: '检索中',
	Select: '检索',
	Cancel: '取消',
	Edit: '编辑',
	Del: '删除',
	Loading: '加载中...',
	Space: '&nbsp;',
	Pos: '职位',
	Name: '姓名',
	Operate: '操作',
	All: '全部',
	AllPos: '全职位',
	AllDept: '全部门',
	Year: '入社年',
	Reault: '调整结果',
	Before: '调整前',
	After: '调整后',
	Submit: '提交'
};

/**
 * CSS枚举.
 */
var CssEnum = {
	IconShow: 'opt_CurRight',
	IconHide: 'opt_CurDown',
	IconAllShow: 'opt_CurRight',
	IconAllHide: 'opt_CurDown',
	CheckedBd: 'bd_1sdeepskyblue',
	CheckedBg: 'bgclr_powderblue',
	UnCheckedBd: 'bd_1sde',
	UnCheckedBg: 'bgclr_eee',
	LineBgH: 'bgclr_ff0',
	LineBg: 'bgclr_ffc',
	TitleBg: 'bgclr_9cf',
	DragBg: 'bgclr_powderblue',
	DragBd: 'bd_1sdeepskyblue',
	EditedBg: 'bgclr_edit',
	AddedBg: 'bgclr_add'
};

/**
 * Action枚举.
 */
var ActionEnum = {
	SourceAction: '',
	DestAction: '',
	SelectAction: '',
	SourceParam: '',
	DestParam: '',
	SelectParam: ''
};

/**
 * 数据状态枚举.
 */
var DbFlagEnum = {
	X: -2, // 无效数据
	D: -1, // 已删除
	N: 0, // 初始
	I: 1, // 插入
	U: 2 // 更新
};

/**
 * 操作状态枚举.
 */
var StatusEnum = {
	None: 0, // 无
	Drag: 1, // 拖动中
	Arrive: 2 // 可插入
};

/**
 * 拖动选项枚举.
 */
var DragEnum = {
	offsetX: 15, // X偏移
	offsetY: 20 // Y偏移
}

/**
 * 文字模版.
 */
var StringEnum = {
	Count: '计 {0} 人',
	Dept: '用户列表 - {0}'
};

/**
 * 模式枚举.
 */
var ModeEnum = {
	PosUsr: 1,
	UsrPos: 2,
	RolUsr: 3,
	UsrRol: 4
};

/**
 * 当前模式.
 */
var g_mode;

/**
 * 目标容器.
 */
var g_container;

/**
 * 原始JSON数据.
 */
var g_json;

/**
 * 一级数据.
 */
var g_dataLva;

/**
 * 二级数据.
 */
var g_dataLvb;

/**
 * 关系数据.
 */
var g_dataRlt;

/**
 * 部门数据.
 */
var g_dataDept;

/**
 * 备份数据.
 */
var g_dataBack;

/**
 * 一级元素模版.
 */
var g_lvaTmpl;

/**
 * 二级元素模版.
 */
var g_lvbTmpl;

/**
 * 记录元素模版.
 */
var g_logTmpl;

/**
 * 选项元素模版.
 */
var g_srcTmpl;

/**
 * 拖动元素模版.
 */
var g_dragTmpl;

/**
 * 当前激活的一级元素.
 */
var g_lvaNow;

/**
 * 当前操作状态.
 */
var g_status = StatusEnum.None;

/**
 * 当前部门索引.
 */
var g_deptindex;

/**
 * ，userId与索引对应.
 */
var g_usrid2index;

/**
 * 方法库.
 */
var g_funcLib = {

	/**
	 * 开始拖动.
	 */
	_startDrag: function(event) {
		if ($('div_drag').count > 0) {
			if (Event.element(event).findKey() != null) {
				g_status = StatusEnum.Drag;
			}
		}
	},
	
	/**
	 * 结束拖动.
	 */
	endDrag: function() {
		$('div_drag').hide();
		g_status = StatusEnum.None;
		if (g_lvaNow != null) {
			doInsert(g_lvaNow);
			g_lvaNow.down(0).removeClassName(CssEnum.LineBgH);
			g_lvaNow = null;
		}
	},
	
	_moving: _moving,
	_srcClick: _srcClick,
	_cancel: _cancel,
	_iconClick: _iconClick,
	_editClick: _editClick,
	_delClick: _delClick,
	
	/**
	 * 取得排序方法.
	 * @param {String} attr 属性名.
	 * @param {bool} asc 升序/降序.
	 * @return {Function} 排序方法.
	 */
	sortMethod: function(attr, asc) {
		if (asc) {
			return g_funcLib._sortByAsc.bind(null, attr);
		} else {
			return g_funcLib._sortByDesc.bind(null, attr);
		}
	},
	
	/**
	 * 按指定属性升序排序.
	 * @param {String} attr 属性名.
	 * @param {Object} a 对象1.
	 * @param {Object} b 对象2.
	 * @return {int} 排序结果.
	 */
	_sortByAsc: function(attr, a, b) {
		return a[attr] > b[attr] ? 1 : -1;
	},
	
	/**
	 * 按指定属性降序排序.
	 * @param {String} attr 属性名.
	 * @param {Object} a 对象1.
	 * @param {Object} b 对象2.
	 * @return {int} 排序结果.
	 */
	_sortByDesc: function(attr, a, b) {
		return a[attr] > b[attr] ? -1 : 1;
	},
	
	/**
	 * 以http参数格式添加字符串.
	 * @param {String} str 原字符串.
	 * @param {String} key 名称.
	 * @param {String} value 值.
	 * @return {String} 添加后的字符串.
	 */
	addParam: function(str, key, value) {
		if (str.empty() || str.endsWith('&')) {
			return str + key + '=' + encodeURIComponent(value);
		} else {
			return str + '&' + key + '=' + encodeURIComponent(value);
		}
	}
};

/**
 * 页面初始化.
 */
function init() {

	// 生成元素模版
	createTemplate();
	
	// 生成页面元素
	createElement(g_container);
	
	// 初始化页面
	$('icon_all').addClassName(CssEnum.IconAllHide);
	$('txt_all').update(MsgEnum.AShow);
	$('btnDept').value = MsgEnum.Select;
	
	// 初始化数据
	g_dataBack = new Array();
	g_usrid2index = new Array();
	
	// 事件处理
	g_funcLib.bindEditClick = g_funcLib._editClick.bindAsEventListener(g_funcLib);
	g_funcLib.bindDelClick = g_funcLib._delClick.bindAsEventListener(g_funcLib);
	g_funcLib.bindIconClick = g_funcLib._iconClick.bindAsEventListener(g_funcLib);
	g_funcLib.bindSrcClick = g_funcLib._srcClick.bindAsEventListener(g_funcLib);
	g_funcLib.bindCancel = g_funcLib._cancel.bindAsEventListener(g_funcLib);
	g_funcLib.bindMoving = g_funcLib._moving.bindAsEventListener(g_funcLib);
	g_funcLib.bindStartDrag = g_funcLib._startDrag.bindAsEventListener(g_funcLib);
	Event.observe(document, 'mousemove', g_funcLib.bindMoving);
	Event.observe('drag_src', 'mousedown', g_funcLib.bindStartDrag);
	Event.observe(document, 'mouseup', g_funcLib.endDrag);
	document.body.onselectstart = function() {
		return false;
	};
	
	// 添加自定义方法
	Element.addMethods({
	
		/**
		 * 取得可见子元素.
		 * @param {Object} element 元素.
		 * @return {Array} 元素列表.
		 */
		visibleChilds: function(element) {
			var elements = [];
			element = element.firstDescendant();
			while (element != null) {
				if (element.visible()) elements.push(element);
				element = element.next();
			}
			return elements;
		},
		
		/**
		 * 取得不可见子元素.
		 * @param {Object} element 元素.
		 * @return {Array} 元素列表.
		 */
		unvisibleChilds: function(element) {
			var elements = [];
			element = element.firstDescendant();
			while (element != null) {
				if (!element.visible()) elements.push(element);
				element = element.next();
			}
			return elements;
		},
		
		/**
		 * 向上查找含有key属性的元素.
		 * @param {Object} element 元素.
		 * @return {Object} 含有key的元素或null.
		 */
		findKey: function(element) {
			var elements = Element.ancestors(element);
			for (var i = 0, len = elements.length; i < len; i++) {
				if (elements[i].key != null) {
					return $(elements[i]);
				}
			}
		}
	});
	
	/**
	 * 将数字扩展为指定长度.
	 * @param {int} len 目标长度.
	 * @param {char} chr 扩展用字符,默认为空格.
	 * @return {String} 扩展后的字符串.
	 */
	Number.prototype.formatl = function(len, chr) {
		var string = String(this);
		var tmp = '';
		if (len - string.length <= 0) return String(this);
		if (chr == null) {
			chr = MsgEnum.Space;
		}
		for (var i = 0, count = len - string.length; i < count; i++) {
			tmp += chr;
		}
		return tmp + string;
	};
	
	/**
	 * 用参数替换字符串中的｛0｝等.
	 * @return {String} 替换后的字符串.
	 */
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/\{(\d+)\}/g, function(m, i) {
			return args[i];
		});
	};
	
	// 加载数据
	new Ajax.Request(ActionEnum.SourceAction, {
		method: 'get',
		parameters: addStamp(ActionEnum.SourceParam),
		onSuccess: loadData,
		onFailure: function() {
			alert('获取失败： ' + ActionEnum.SourceAction);
		}
	});
}

/**
 * 读取JSON数据并加载到页面.
 * @param {Object} request 服务器响应数据.
 */
function loadData(request) {
	var tmp;
	g_json = request.responseText;
	
	// 数据检查
	if (!g_json.isJSON()) {
		alert('数据格式错误!');
		return;
	}
	tmp = g_json.evalJSON();
	g_dataDept = tmp.deptList;
	g_dataLvb = tmp.userInfos;
	g_dataLva = tmp.posInfos;
	g_dataRlt = tmp.perUserPermitInfos;
	
	g_dataLva.sort(g_funcLib.sortMethod('posId', true));
	
	// 添加部门下拉列表
	for (var i = 0, len = g_dataDept.length; i < len; i++) {
		tmp = new Element('option', {
			'value': i
		});
		tmp.update(g_dataDept[i].deptNm);
		$('selectDept').insert({
			bottom: tmp
		});
	}
	
	// 加载数据
	initLva();
	initLvb();
	initRlt.defer();
}

/**
 * 生成元素模版.
 */
function createTemplate() {
	//<div id="lvaTmpl" key="-1">
	//	<div class="bgclr_ff0 span-12 bd_b_1s666 last">
	//		<div class="span-9 padding_right_1">
	//			<a id="icon_i" href="#" class="img_opt" onClick="iconClick(this);"></a>
	//			<div>name1</div>
	//		</div>
	//		<div class="span-2 bd_l_1s666 last" >Loading...</div>
	//	</div>
	//	<div id="listb_i" class="prepend-5 span-7 bd_b_1s666 last"></div>
	//</div>
	g_lvaTmpl = new Element('div');
	g_lvaTmpl.key = -1;
	g_lvaTmpl.insert({
		bottom: new Element('div').addClassName('prepend-5 span-7 bd_b_1s666 last').hide()
	}).insert({
		top: new Element('div').addClassName('span-12 bd_b_1s666 last').addClassName(CssEnum.LineBg).insert({
			bottom: new Element('div').addClassName('span-9 padding_right_1').insert({
				top: new Element('a', {
					'href': '#this',
					'title': MsgEnum.Show,
					'class': 'img_opt'
				}).addClassName(CssEnum.IconHide)
			}).insert({
				bottom: new Element('div')
			})
		}).insert({
			bottom: new Element('div').addClassName('span-2 text_right bd_l_1sfff last').update(MsgEnum.Loading)
		})
	});
	
	//<div id="lvbTmpl" info="lvb" key="-1">
	//	<div class="span-7 bd_b_1s666 last margin_bottom_p1">
	//		<div class="span-4 bd_l_1s666">name2</div>
	//		<div class="span-2 bd_l_1s666 last">
	//			<a href="#" onClick="editClick(this);">修改</a>
	//			<a href="#" onClick="delClick(this);">删除</a>
	//		</div>
	//	</div>
	//</div>
	g_lvbTmpl = new Element('div');
	g_lvbTmpl.key = -1;
	g_lvbTmpl.insert({
		top: new Element('div').addClassName('span-7 bd_b_1s666 last margin_bottom_p1').insert({
			top: new Element('div').addClassName('span-4 bd_l_1s666')
		}).insert({
			bottom: new Element('div').addClassName('span-2 bd_l_1s666 text_right last').insert({
				bottom: new Element('a', {
					'href': '#this'
				}).update(MsgEnum.Edit).hide()
			}).insert({
				bottom: MsgEnum.Space
			}).insert({
				bottom: new Element('a', {
					'href': '#this'
				}).update(MsgEnum.Del)
			})
		})
	});
	
	//<tr id="logTmpl">
	//	<td class="percent_14"></td>
	//	<td class="percent_40"></td>
	//	<td></td>
	//	<td class="percent_10">
	//		<a href="#" onClick="cancel(this);">取消</a>
	//	</td>
	//</tr>
	g_logTmpl = new Element('tr').insert({
		bottom: new Element('td').addClassName('text_center percent_14')
	}).insert({
		bottom: new Element('td').addClassName('percent_40')
	}).insert({
		bottom: new Element('td')
	}).insert({
		bottom: new Element('td').addClassName('percent_12').insert({
			top: new Element('a', {
				'href': '#this',
				'class': 'margin_left_8'
			}).update(MsgEnum.Cancel)
		})
	});
	//<div id="srcTmpl" key="-1" class="margin_left_10 float_l bd_1sfff margin_top_6 w_90 last">
	//	<div class="padding_left_4 bd_1sfff">
	//		<input type="checkbox" onClick="srcClick(this);"/>&nbsp;
	//		<label class="span-2" onClick="srcClick(this);"></label>
	//	</div>
	//</div>
	g_srcTmpl = new Element('div').addClassName('margin_left_10 float_l bd_1sfff margin_top_6 w_90 last');
	g_srcTmpl.addClassName(CssEnum.UnCheckedBd).addClassName(CssEnum.UnCheckedBg);
	g_srcTmpl.key = -1;
	g_srcTmpl.insert({
		top: new Element('div').addClassName('padding_left_4 bd_1sfff').insert({
			top: new Element('input', {
				'type': 'checkbox'
			})
		}).insert({
			bottom: new Element('label').addClassName('span-2 font_weight_n')
		})
	});
	
	//<div id="dragTmpl" key="-1" class="margin_bottom_p1 bd_b_1sdeepskyblue padding_left_8"><label></label></div>
	g_dragTmpl = new Element('div').addClassName('margin_bottom_p1 bd_b_1sdeepskyblue padding_left_8');
	g_dragTmpl.key = -1;
	g_dragTmpl.insert({
		bottom: new Element('label')
	});
}

/**
 * 生成页面元素.
 * @param {String} divId 容器div的id.
 */
function createElement(divId) {
	var dest = $(divId);
	
	//<div id="div_dest" class="prepend-1 span-23 last">
	// 整体样式
	dest.addClassName('prepend-1 span-23 last mus');
	
	//<div class="span-23 last">
	//	<select id="selectDept" name="select" class="w_150">
	//	</select>
	//	<input type="button" value="" id="btnDept" onClick="changeDept();"/>
	//</div>
	// 头部
	dest.insert({
		bottom: new Element('div').addClassName('span-23 last').insert({
			bottom: new Element('select', {
				'id': 'selectDept',
				'name': 'dept',
				'class': 'w_150'
			}).insert({
				top: new Element('option', {
					'value': -1
				}).update(MsgEnum.AllDept)
			})
		}).insert({
			bottom: new Element('input', {
				'type': 'button',
				'id': 'btnDept'
			}).observe('click', changeLvb)
		})
	});
	
	//<div class="span-23 last">
	//	<a href="#" onClick="toggleAll();"><span id="icon_all" class="img_opt"></span><span id="txt_all"></span></a>
	//</div>
	// 全展开
	dest.insert({
		bottom: new Element('div').addClassName('span-23 last').insert({
			top: new Element('a', {
				'href': '#this'
			}).observe('click', toggleAll).insert({
				top: new Element('span', {
					'id': 'icon_all',
					'class': 'img_opt'
				})
			}).insert({
				top: new Element('span', {
					'id': 'txt_all'
				})
			})
		})
	});
	
	//<div class="span-12 bd_1s666">
	//	<div class="span-12 bgclr_9cf last text_center bd_b_1s666">
	//		<div class="span-5">职位</div>
	//		<div class="span-4 bd_l_1s666">姓名</div>
	//		<div class="span-2 bd_l_1s666 last">操作</div>
	//	</div>
	//	<div id="div_grid" class="span-12 last overflow_scr_y h_382"></div>
	//</div>
	// 一览列表
	dest.insert({
		bottom: new Element('div').addClassName('span-12 bd_1s666').insert({
			bottom: new Element('div').addClassName('span-12 font_weight_b last text_center bd_b_1s666').addClassName(CssEnum.TitleBg).insert({
				bottom: new Element('div').addClassName('span-5').update(MsgEnum.Pos)
			}).insert({
				bottom: new Element('div').addClassName('span-4 bd_l_1s666').update(MsgEnum.Name)
			}).insert({
				bottom: new Element('div').addClassName('span-2 text_right bd_l_1s666').update(MsgEnum.Operate)
			})
		}).insert({
			bottom: new Element('div', {
				'id': 'div_grid',
				'class': 'span-12 last overflow_scr_y h_382'
			})
		})
	});
	
	// 用户列表
	dest.insert({
		bottom: new Element('div').addClassName('prepend-1 span-8 last').insert({
			bottom: new Element('div').addClassName('span-7 bd_1s666 last').insert({
				bottom: new Element('div').addClassName('padding_right_4 padding_left_4').addClassName(CssEnum.TitleBg).insert({
					top: new Element('div').addClassName('span-4').insert({
						top: new Element('span', {
							'id': 'txt_dept',
							'class': 'padding_left_4 font_weight_b'
						})
					})
				}).insert({
					bottom: new Element('div').addClassName('float_r').insert({
						top: new Element('input', {
							'type': 'checkbox',
							'id': 'srcAll'
						}).observe('click', srcClickAll)
					}).insert({
						bottom: new Element('label').addClassName('font_weight_n').update(MsgEnum.All)
					})
				}).insert({
					bottom: new Element('div').addClassName('clear')
				})
			}).insert({
				bottom: new Element('div').addClassName('bd_t_1s666 padding_top_10').insert({
					top: new Element('form', {
						'action': '#this',
						'id': 'formSelect'
					}).insert({
						bottom: new Element('div').addClassName('span-7 last').insert({
							top: new Element('div').addClassName('span-2 text_right').insert({
								top: new Element('label').update(MsgEnum.Pos)
							})
						}).insert({
							bottom: new Element('div').addClassName('span-5 last').insert({
								top: new Element('select', {
									'id': 'selectPos',
									'name': 'pos',
									'class': 'span-4'
								}).insert({
									top: new Element('option', {
										'value': -1
									}).update(MsgEnum.AllPos)
								})
							})
						})
					}).insert({
						bottom: new Element('div').addClassName('span-7 last').insert({
							bottom: new Element('div').addClassName('span-2 text_right').insert({
								bottom: new Element('label').update(MsgEnum.Year)
							})
						}).insert({
							bottom: new Element('div').addClassName('span-1').insert({
								bottom: new Element('input', {
									'type': 'text',
									'id': 'year',
									'name': 'year',
									'class': 'span-1'
								})
							})
						}).insert({
							bottom: new Element('div').addClassName('span-1 text_right').insert({
								bottom: new Element('label').update(MsgEnum.Name)
							})
						}).insert({
							bottom: new Element('div').addClassName('span-1').insert({
								bottom: new Element('input', {
									'type': 'text',
									'id': 'userCnm',
									'name': 'userCnm',
									'class': 'span-2'
								})
							})
						})
					}).insert({
						bottom: new Element('div').addClassName('span-7 last text_right margin_bottom_4').insert({
							bottom: new Element('div').addClassName('span-5 last').update(MsgEnum.Space)
						}).insert({
							bottom: new Element('div').addClassName('text_left').insert({
								bottom: new Element('input', {
									'type': 'button',
									'value': MsgEnum.Select
								}).observe('click', changeLvb)
							})
						})
					})
				}).insert({
					bottom: new Element('div', {
						'id': 'drag_src',
						'class': 'span-7 bd_t_1s999 overflow_scr_y margin_top_4 h_300 last'
					}).insert({
						top: new Element('div', {
							'id': 'list_src',
							'class': 'margin_left_10 padding_left_10 padding_top_10'
						})
					})
				})
			})
		})
	});
	
	// 换行
	dest.insert({
		bottom: new Element('hr').addClassName('space')
	});
	
	//<div class="span-12">
	//	<div class="span-12 last">
	//		<strong>调整结果</strong>
	//		<table class="datagrid2">
	//			<tr>
	//				<th class="percent_14">姓名</th>
	//				<th class="percent_40">调整前</th>
	//				<th>调整后</th>
	//				<th class="percent_10">操作</th>
	//			</tr>
	//		</table>
	//	</div>
	//	<div class="span-12 float_l bd_l_1sccc bd_b_1sccc h_92 overflow_scr_y">
	//		<div class="span-12 last">
	//			<table class="datagrid2 margin_left_p1">
	//				<tbody id="list_log"></tbody>
	//			</table>
	//		</div>
	//	</div>
	//</div>
	// 操作记录
	dest.insert({
		bottom: new Element('div').addClassName('span-12').insert({
			top: new Element('div').addClassName('span-12 last').insert({
				top: new Element('label').addClassName('font_weight_b').update(MsgEnum.Reault)
			}).insert({
				bottom: new Element('table').addClassName('datagrid2').insert({
					top: new Element('tr').insert({
						bottom: new Element('th').addClassName('percent_14').update(MsgEnum.Name)
					}).insert({
						bottom: new Element('th').addClassName('percent_40').update(MsgEnum.Before)
					}).insert({
						bottom: new Element('th').update(MsgEnum.After)
					}).insert({
						bottom: new Element('th').addClassName('percent_12').update(MsgEnum.Operate)
					})
				})
			})
		}).insert({
			bottom: new Element('div').addClassName('span-12 bd_l_1s666 bd_b_1s666 float_l h_92 overflow_scr_y').insert({
				top: new Element('div').addClassName('span-12 last margin_top_p1 margin_left_p1').insert({
					top: new Element('table').addClassName('datagrid2').insert({
						top: new Element('tbody', {
							'id': 'list_log'
						})
					})
				})
			})
		})
	});
	
	//<div class="span-11 last">
	//	<div class="span-10 h_122"></div>
	//	<div class="prepend-1 span-10">
	//		<input type="button" value="提交" onClick="submitAll();"/>&nbsp;<input type="button" value="取消" onClick="restoreAll();"/>
	//	</div>
	//</div>
	// 提交/取消
	dest.insert({
		bottom: new Element('div').addClassName('span-10 last').insert({
			top: new Element('div').addClassName('span-10 h_122')
		}).insert({
			bottom: new Element('div').addClassName('prepend-1 span-10').insert({
				bottom: new Element('input', {
					'type': 'button',
					'value': MsgEnum.Submit
				}).observe('click', submitAll)
			}).insert({
				bottom: MsgEnum.Space
			}).insert({
				bottom: new Element('input', {
					'type': 'button',
					'value': MsgEnum.Cancel
				}).observe('click', restoreAll)
			})
		})
	});
	
	//<div id="div_drag" class="span-2 bd_1sdeepskyblue bgclr_powderblue position_fix"></div>
	// 拖动窗
	nElement = new Element('div', {
		'id': 'div_drag',
		'class': 'span-2 position_fix'
	}).addClassName(CssEnum.DragBd).addClassName(CssEnum.DragBg);
	nElement.count = 0;
	nElement.setOpacity(0.8);
	nElement.hide();
	$(document.body).insert({
		bottom: nElement
	});
}

/**
 * 加载一级数据.
 */
function initLva() {
	var nElement, i, len;
	
	// 一级数据循环
	for (i = 0, len = g_dataLva.length; i < len; i++) {
	
		// 生成新的一级元素
		nElement = g_lvaTmpl.clone(true);
		nElement.id = 'lva_' + i;
		nElement.key = i;
		nElement.down(2).id = 'icon_' + i;
		nElement.down(2).observe('click', g_funcLib.bindIconClick);
		nElement.down(2).next(0).update(g_dataLva[i]['posName']);
		nElement.down(1).next(0).id = 'count_' + i;
		nElement.down(0).next(0).id = 'listb_' + i;
		nElement.show();
		
		// 插入页面
		$('div_grid').insert({
			bottom: nElement
		});
		
		// 添加下拉菜单
		nElement = new Element('option', {
			'value': i
		}).update(g_dataLva[i]['posName']);
		$('selectPos').insert({
			bottom: nElement
		});
	}
	
}

/**
 * 加载二级数据.
 */
function initLvb() {
	var nElement, i, len;
	
	// 初始化二级数据
	for (i = 0, len = g_dataLvb.length; i < len; i++) {
		g_dataLvb[i].rlt = [];
		g_dataLvb[i].visible = true;
	}
	
	// 生成右侧列表
	for (i = 0, len = g_dataLvb.length; i < len; i++) {
		nElement = g_srcTmpl.clone(true);
		nElement.id = 'src_' + i;
		nElement.key = i;
		nElement.down('label').update(g_dataLvb[i]['userCnm']);
		nElement.down('input').checked = false;
		//nElement.down('label').observe('click', g_funcLib.bindSrcClick);
		//nElement.down('input').observe('click', g_funcLib.bindSrcClick);
		nElement.observe('click', g_funcLib.bindSrcClick);
		$('list_src').insert({
			bottom: nElement
		});
		g_usrid2index[g_dataLvb[i]['userId']] = i;
	}
}

/**
 * 加载关系数据.
 */
function initRlt() {
	var nElement, link, i, j, len1, len2;
	
	// 按userId进行排序
	g_dataRlt.sort(g_funcLib.sortMethod('userId', true));
	
	// 关系数据循环
	for (i = 0, len1 = g_dataRlt.length; i < len1; i++) {
		nElement = g_lvbTmpl.clone(true);
		nElement.id = 'rlt_' + i;
		nElement.key = i;
		g_dataRlt[i]['opFlg'] = DbFlagEnum.N;
		link = nElement.down('a');
		if (g_mode == ModeEnum.RolUsr || g_mode == ModeEnum.UsrRol) {
			link.observe('click', g_funcLib.bindEditClick);
			link.show();
		}
		link = link.next(0);
		link.observe('click', g_funcLib.bindDelClick);
		
		// 二级数据循环，反向绑定
		for (j = 0, len2 = g_dataLvb.length; j < len2; j++) {
			if (g_dataRlt[i]['userId'] == g_dataLvb[j]['userId']) {
				g_dataRlt[i].lvb = j;
				nElement.down(1).update(g_dataLvb[j]['userCnm']);
				break;
			}
		}
		
		// 一级数据循环，反向绑定
		for (j = 0, len2 = g_dataLva.length; j < len2; j++) {
			if (g_dataRlt[i]['posRoleId'] == g_dataLva[j]['posId']) {
				g_dataRlt[i].lva = j;
				$('listb_' + j).insert({
					bottom: nElement
				});
				break;
			}
		}
		
		// 添加索引到二级数据中
		g_dataLvb[g_dataRlt[i].lvb].rlt.push(i);
	}
	
	// 更新标题文字
	$('txt_dept').update(StringEnum.Dept.format(MsgEnum.AllDept));
	
	// 
	refreshCount();
}

/**
 * 删除事件.
 * @param {Object} event 点击事件.
 */
function _delClick(event) {
	var objLvb = Event.element(event).findKey();
	var objLva;
	objLvb.hide();
	
	// 当前数据状态为插入时
	if (g_dataRlt[objLvb.key]['opFlg'] == DbFlagEnum.I) {
		g_dataRlt[objLvb.key]['opFlg'] = DbFlagEnum.X;
	} else {
	
		// 当前数据为原始数据时，备份
		if (g_dataRlt[objLvb.key]['opFlg'] == DbFlagEnum.N) {
			g_dataBack[objLvb.key] = Object.clone(g_dataRlt[objLvb.key]);
		}
		g_dataRlt[objLvb.key]['opFlg'] = DbFlagEnum.D;
	}
	
	objLva = $('lva_' + g_dataRlt[objLvb.key].lva);
	
	// 刷新计数
	refreshCount(objLva.key);
	
	// 计数为0时
	if (objLva.count == 0) {
		$('listb_' + objLva.key).hide();
	}
	
	// 更新操作记录
	updateLog(objLvb.key);
}


/**
 * 编辑事件（未完成）.
 * @param {Object} event 点击事件.
 */
function _editClick(event) {
}

/**
 * 刷新计数.
 * @param {Object} lvaIndex 一级数据索引，null时刷新全部.
 */
function refreshCount(lvaIndex) {
	var count;
	if (lvaIndex) {
		count = $('listb_' + lvaIndex).visibleChilds().length
		$('lva_' + lvaIndex).count = count;
		$('count_' + lvaIndex).update(StringEnum.Count.format(count.formatl(3)));
	} else {
		for (var i = 0, len = g_dataLva.length; i < len; i++) {
			count = $('listb_' + i).visibleChilds().length;
			$('lva_' + i).count = count;
			$('count_' + i).update(StringEnum.Count.format(count.formatl(3)));
			if ($('icon_' + i).hasClassName(CssEnum.IconShow)) {
				if ($('lva_' + i).count > 0) {
					$('listb_' + i).show();
				} else {
					$('listb_' + i).hide();
				}
			}
		}
	}
}

/**
 * 全部展开/收缩.
 */
function toggleAll() {
	if ($('icon_all').hasClassName(CssEnum.IconAllHide)) {
		$('icon_all').removeClassName(CssEnum.IconAllHide).addClassName(CssEnum.IconAllShow);
		$('txt_all').update(MsgEnum.AHide);
		for (var i = 0, len = g_dataLva.length; i < len; i++) {
			if ($('icon_' + i).hasClassName(CssEnum.IconHide)) {
				$('icon_' + i).removeClassName(CssEnum.IconHide).addClassName(CssEnum.IconShow);
				$('icon_' + i).title = MsgEnum.Hide;
				
				// 计数不为0时
				if ($('lva_' + i).count > 0) $('listb_' + i).show();
			}
		}
	} else {
		$('icon_all').removeClassName(CssEnum.IconAllShow).addClassName(CssEnum.IconAllHide);
		$('txt_all').update(MsgEnum.AShow);
		for (var i = 0, len = g_dataLva.length; i < len; i++) {
			if ($('icon_' + i).hasClassName(CssEnum.IconShow)) {
				$('icon_' + i).removeClassName(CssEnum.IconShow).addClassName(CssEnum.IconHide);
				$('icon_' + i).title = MsgEnum.Show;
				$('listb_' + i).hide();
			}
		}
	}
}

/**
 * 展开/收缩图标.
 * @param {Object} event 点击事件.
 */
function _iconClick(event) {
	var objLva;
	var objIcon = Event.element(event);
	objLva = objIcon.findKey();
	objIcon.toggleClassName(CssEnum.IconHide).toggleClassName(CssEnum.IconShow);
	objIcon.title = (objIcon.title == MsgEnum.Hide) ? MsgEnum.Show : MsgEnum.Hide;
	
	// 计数不为0时
	if (objLva.count > 0) $('listb_' + objLva.key).toggle();
}

/**
 * 全部选中/取消.
 * @param {bool} flg 选中/取消，null时根据checkbox判断.
 */
function srcClickAll(flg) {

	// 未指定flag且选中全部
	// 或flag为true
	if ((flg != true && $('srcAll').checked == true) || flg == true) {
		$('srcAll').checked = true;
		for (var i = 0, len = g_dataLvb.length; i < len; i++) {
			if (checkVisible(i)) {
				$('src_' + i).down('input').checked = true;
				$('src_' + i).removeClassName(CssEnum.UnCheckedBd).removeClassName(CssEnum.UnCheckedBg);
				$('src_' + i).addClassName(CssEnum.CheckedBd).addClassName(CssEnum.CheckedBg);
				
				// 添加到拖动列表
				addDrag(i);
			}
		}
	} else {
		$('srcAll').checked = false;
		$('div_drag').count = 0;
		for (var i = 0, len = g_dataLvb.length; i < len; i++) {
			$('src_' + i).down('input').checked = false;
			$('src_' + i).removeClassName(CssEnum.CheckedBd).removeClassName(CssEnum.CheckedBg);
			$('src_' + i).addClassName(CssEnum.UnCheckedBd).addClassName(CssEnum.UnCheckedBg);
			if ($('drag_' + i) != null) $('drag_' + i).hide();
		}
	}
}

/**
 * 选中/取消二级元素.
 * @param {Object} event 事件对象.
 */
function _srcClick(event) {
	var srcObj = Event.element(event);
	if (srcObj.key == null) {
		srcObj = srcObj.findKey();
	}
	if (!srcObj.hasClassName(CssEnum.CheckedBg)) {
		srcObj.down('input').checked = true;
		srcObj.removeClassName(CssEnum.UnCheckedBd).removeClassName(CssEnum.UnCheckedBg);
		srcObj.addClassName(CssEnum.CheckedBd).addClassName(CssEnum.CheckedBg);
		
		// 添加到拖动列表
		addDrag(srcObj.key);
	} else {
		srcObj.down('input').checked = false;
		srcObj.removeClassName(CssEnum.CheckedBd).removeClassName(CssEnum.CheckedBg);
		srcObj.addClassName(CssEnum.UnCheckedBd).addClassName(CssEnum.UnCheckedBg);
		$('drag_' + srcObj.key).hide();
		$('div_drag').count -= 1;
	}
}

/**
 * 向拖动列表中添加二级数据.
 * @param {int} lvbIndex 二级数据索引.
 * @return {Object} 添加的元素.
 */
function addDrag(lvbIndex) {
	var dragObj = $('drag_' + lvbIndex);
	
	// 已含有此元素
	if (dragObj != null) {
		dragObj.show();
	} else {
		dragObj = g_dragTmpl.clone(true);
		dragObj.down(0).update(g_dataLvb[lvbIndex]['userCnm']);
		dragObj.id = 'drag_' + lvbIndex;
		dragObj.key = lvbIndex;
	}
	
	// 插入到列表最后
	$('div_drag').insert({
		bottom: dragObj
	});
	
	// 计数器
	$('div_drag').count += 1;
	return dragObj;
}

/**
 * 取消操作.
 * @param {Object} event 点击事件.
 */
function _cancel(event) {
	var objElement = Event.element(event);
	
	// 取得二级数据关联的全部一级数据索引
	var rltList = g_dataLvb[objElement.findKey().key].rlt;
	
	for (var i = 0, len = rltList.length; i < len; i++) {
	
		// 根据当前状态回滚
		switch (g_dataRlt[rltList[i]]['opFlg']) {
			case DbFlagEnum.N:
				break;
			case DbFlagEnum.I:
				$('rlt_' + rltList[i]).hide();
				g_dataRlt[rltList[i]]['opFlg'] = DbFlagEnum.X;
				break;
			case DbFlagEnum.D:
				g_dataRlt[rltList[i]] = Object.clone(g_dataBack[rltList[i]]);
				if (checkVisible(g_dataRlt[rltList[i]].lvb)) {
					$('rlt_' + rltList[i]).show();
				}
				setDate($('rlt_' + rltList[i]));
				break;
			case DbFlagEnum.U:
				g_dataRlt[rltList[i]] = Object.clone(g_dataBack[rltList[i]]);
				if (checkVisible(g_dataRlt[rltList[i]].lvb)) {
					$('rlt_' + rltList[i]).show();
				}
				setDate($('rlt_' + rltList[i]));
				break;
			case DbFlagEnum.X:
				break;
			default:
                break;
		}
		
		// 刷新受影响的计数
		refreshCount(g_dataRlt[rltList[i]].lva);
	}
	
	// 刷新操作记录
	//if (rltList.length > 0) 待定
	updateLog(rltList[0]);
}

/**
 * 更新操作记录.
 * @param {int} rltIndex 关系数据索引.
 */
function updateLog(rltIndex) {
	var objRlt = g_dataRlt[rltIndex];
	var nLog, nCells, strOld, strNew;
	var oldLva = [];
	var newLva = [];
	var rltList = g_dataLvb[g_dataRlt[rltIndex].lvb].rlt;
	
	// 循环所有相关的关系数据
	for (var i = 0, len = rltList.length; i < len; i++) {
	
		// 根据当前状态处理
		switch (g_dataRlt[rltList[i]]['opFlg']) {
			case DbFlagEnum.N:
				oldLva.push(g_dataLva[g_dataRlt[rltList[i]].lva]);
				newLva.push(g_dataLva[g_dataRlt[rltList[i]].lva]);
				break;
			case DbFlagEnum.I:
				newLva.push(g_dataLva[g_dataRlt[rltList[i]].lva]);
				break;
			case DbFlagEnum.D:
				oldLva.push(g_dataLva[g_dataBack[rltList[i]].lva]);
				break;
			case DbFlagEnum.U:
				oldLva.push(g_dataLva[g_dataBack[rltList[i]].lva]);
				newLva.push(g_dataLva[g_dataRlt[rltList[i]].lva]);
				break;
			default:
                break;
		}
	}
	
	// 结果排序
	oldLva.sort(g_funcLib.sortMethod('posId', true));
	newLva.sort(g_funcLib.sortMethod('posId', true));
	
	// 生成文字
	strOld = linkObjByKey(oldLva, 'posName', ', ');
	strNew = linkObjByKey(newLva, 'posName', ', ');
	
	
	// 创建操作记录
	nLog = $('log_' + objRlt.lvb);
	
	// 前后相同且已存在记录
	if (strOld == strNew && nLog != null) {
		nLog.hide();
		return;
	}
	
	// 前后相同
	if (strOld == strNew) {
		return;
	}
	if (nLog == null) {
		nLog = g_logTmpl.clone(true);
		nLog.id = 'log_' + objRlt.lvb;
		nLog.key = objRlt.lvb;
		nLog.down('a').observe('click', g_funcLib.bindCancel);
	} else {
		nLog.show();
	}
	
	// 填入文字
	nCells = nLog.childElements();
	nCells[0].update(g_dataLvb[objRlt.lvb]['userCnm']);
	nCells[1].update(strOld);
	nCells[2].update(strNew);
	
	// 插入记录到最后
	$('list_log').insert({
		bottom: nLog
	});
	
	listColor($('list_log').up(0));
}

/**
 * 向指定一级元素中插入拖动的二级数据(未完成).
 * @param {Object} objLva 一级元素.
 */
function doInsert(objLva) {
	var newObjs = $('div_drag').visibleChilds();
	var lvbList = $('listb_' + objLva.key);
	var rltIndex;
	var existList = [];
	var msg = '已存在：';
	for (var i = 0, len = newObjs.length; i < len; i++) {
	
		// 插入一个数据
		rltIndex = insertOne(objLva, newObjs[i].key, 1);
		
		// 返回正确索引
		if (rltIndex >= 0) {
			if (g_dataLvb[g_dataRlt[rltIndex].lvb].rlt.indexOf(rltIndex) < 0) {
				g_dataLvb[g_dataRlt[rltIndex].lvb].rlt.push(rltIndex);
			}
			
			// 更新操作记录
			updateLog(rltIndex);
		} else {
		
			// 添加操已存在列表
			existList.push(g_dataLvb[newObjs[i].key]['userCnm']);
		}
	}
	
	// 展开列表
	if (!lvbList.visible()) {
		$('icon_' + objLva.key).removeClassName(CssEnum.IconHide).addClassName(CssEnum.IconShow);
		$('icon_' + objLva.key).title = MsgEnum.Show;
		lvbList.show();
	}
	// 刷新计数
	refreshCount(objLva.key);
	
	// 显示已存在列表
	if (existList.length > 0) alert(msg + existList.join('，'));
}

/**
 * 插入一个记录.
 * @param {Object} objLva 一级元素.
 * @param {int} lvbIndex 二级数据索引.
 * @param {bool} moveEnd 是否移至最后.
 * @return {int} 关系数据索引或-1.
 */
function insertOne(objLva, lvbIndex, moveEnd) {
	var list = $('listb_' + objLva.key);
	var rltList = g_dataLvb[lvbIndex].rlt;
	var objNew, lvbNew;
	
	// 检查是否已添加过此记录
	for (var i = 0, len = rltList.length; i < len; i++) {
	
		// 已存在且无效则重置状态并显示
		if (g_dataRlt[rltList[i]].lva == objLva.key) {
			objNew = $('rlt_' + rltList[i]);
			if (g_dataRlt[rltList[i]]['opFlg'] == DbFlagEnum.D) {
				g_dataRlt[rltList[i]]['opFlg'] = DbFlagEnum.U;
			} else if (g_dataRlt[rltList[i]]['opFlg'] == DbFlagEnum.X) {
				g_dataRlt[rltList[i]]['opFlg'] = DbFlagEnum.I;
			} else {
			
				// 已存在且有效
				return -1;
			}
			if (moveEnd) {
				list.insert({
					bottom: objNew
				});
				setDate(objNew);
			}
			objNew.show();
			return rltList[i];
		}
	}
	
	// 未添加过则新建
	objNew = Object.clone(g_dataRlt[0]);
	objNew['userId'] = g_dataLvb[lvbIndex]['userId'];
	objNew['posId'] = g_dataLva[objLva.key]['posId'];
	objNew['opFlg'] = DbFlagEnum.I;
	objNew.lva = objLva.key;
	objNew.lvb = lvbIndex;
	g_dataRlt[g_dataRlt.length] = objNew;
	
	lvbNew = g_lvbTmpl.clone(true);
	lvbNew.key = g_dataRlt.length - 1;
	lvbNew.id = 'rlt_' + lvbNew.key;
	
	lvbNew.down(1).update(g_dataLvb[lvbIndex]['userCnm']);
	
	list.insert({
		bottom: lvbNew
	});
	return lvbNew.key;
}

/**
 * 鼠标移动.
 * @param {Object} event 鼠标事件.
 */
function _moving(event) {
	if (g_status != StatusEnum.None) {
		var drag = $('div_drag');
		var element = Event.element(event);
		drag.show();
		
		// 更改位置
		drag.setStyle({
			'left': (event.clientX + DragEnum.offsetX) + 'px',
			'top': (event.clientY + DragEnum.offsetY) + 'px'
		});
		
		// 从鼠标触发元素找到有效元素上
		element = Element.findKey(element);
		if (element && element.id && element.id.startsWith('rlt')) {
			element = element.findKey();
		}
		
		// 如果是一级元素
		if (element && element.id && element.id.startsWith('lva')) {
			g_status = StatusEnum.Arrive;
			if (g_lvaNow != element) {
				if (g_lvaNow != null) {
					g_lvaNow.down(0).removeClassName(CssEnum.LineBgH);
				}
				g_lvaNow = element;
				g_lvaNow.down(0).addClassName(CssEnum.LineBgH);
			}
		} else {
			g_status = StatusEnum.Drag;
			if (g_lvaNow != null) {
				g_lvaNow.down(0).removeClassName(CssEnum.LineBgH);
				g_lvaNow = null;
			}
		}
	}
}

/**
 * 重新设置日期(未完成).
 * @param {Object} element 二级元素.
 */
function setDate(element) {
	// TODO Here
}

/**
 * 更该部门.
 */
function changeLvb() {

	// 禁用功能
	$('btnDept').disable();
	$('selectDept').disable();
	//$('btnDept').value = MsgEnum.Selecting;
	$('formSelect').disable();
	
	// 延迟执行，让出时间刷新页面元素状态
	getNewLvb.defer();
}

/**
 * 更改部门.
 */
function _changeLvb() {
	g_deptindex = $F($('selectDept'));
	var title = g_deptindex < 0 ? MsgEnum.AllDept : g_dataDept[g_deptindex].deptNm;
	
	// 更新标题文字
	$('txt_dept').update(StringEnum.Dept.format(title));
	
	// 更改部门时
	for (var i = 0, len1 = g_dataLvb.length; i < len1; i++) {
		if (checkVisible(i)) {
			for (var j = 0, len2 = g_dataLvb[i].rlt.length; j < len2; j++) {
			
				// 处于可显示状态时
				if (g_dataRlt[g_dataLvb[i].rlt[j]]['opFlg'] >= DbFlagEnum.N) {
					$('rlt_' + g_dataLvb[i].rlt[j]).show();
				}
			}
			$('src_' + i).show();
		} else {
			for (var j = 0, len2 = g_dataLvb[i].rlt.length; j < len2; j++) {
				$('rlt_' + g_dataLvb[i].rlt[j]).hide();
			}
			$('src_' + i).hide();
		}
	}
	
	// 全部取消选中
	srcClickAll(false);
	
	// 刷新全部计数
	refreshCount();
	
	// 启用功能
	$('btnDept').enable();
	$('selectDept').enable();
	//$('btnDept').value = MsgEnum.Select;
	$('formSelect').enable();
}

/**
 * 检查是否应该显示.
 * @param {int} lvbIndex 二级数据索引.
 * @return {bool} 是否应该显示.
 */
function checkVisible(lvbIndex) {
	return g_dataLvb[lvbIndex].visible;
}

function getNewLvb() {
	var param = ActionEnum.SelectParam;
	var needRequest = false;
	var pos, dept;
	dept = $F($('selectDept'));
	if (dept >= 0) {
		param = g_funcLib.addParam(param, 'dept', g_dataDept[dept].deptId);
	}
	if (!$F($('year')).empty()) {
		param = g_funcLib.addParam(param, 'year', $F($('year')));
		needRequest = true;
	}
	if (!$F($('userCnm')).empty()) {
		param = g_funcLib.addParam(param, 'name', $F($('userCnm')));
		needRequest = true;
	}
	pos = $F($('selectPos'));
	if (g_mode == ModeEnum.PosUsr && pos >= 0) {
		param = g_funcLib.addParam(param, 'pos', g_dataLva[pos]['posId']);
	}
	
	if (needRequest) {
		param = addStamp(param);
		new Ajax.Request(ActionEnum.SelectAction, {
			method: 'get',
			parameters: param,
			onSuccess: getNewLvbBack,
			onFailure: function() {
				alert('获取失败： ' + ActionEnum.SelectAction);
			}
		});
	} else {
		for (var i = 0, len1 = g_dataLvb.length; i < len1; i++) {
			g_dataLvb[i].visible = false;
			if (pos < 0) {
				if (dept < 0) {
					g_dataLvb[i].visible = true;
				} else {
					if (g_dataLvb[i]['deptId'] == g_dataDept[dept].deptId) {
						g_dataLvb[i].visible = true;
					}
				}
			} else {
				for (var j = 0, len2 = g_dataLvb[i].rlt.length; j < len2; j++) {
					if (g_dataRlt[g_dataLvb[i].rlt[j]]['posId'] == g_dataLva[pos]['posId']) {
						if (dept < 0) {
							g_dataLvb[i].visible = true;
						} else {
							if (g_dataLvb[i]['deptId'] == g_dataDept[dept].deptId) {
								g_dataLvb[i].visible = true;
							}
						}
					}
				}
			}
		}
		_changeLvb();
	}
}

/**
 * 处理查询后的列表.
 * @param {Object} request 服务器响应数据.
 */
function getNewLvbBack(request) {
	var nJson = request.responseText;
	var nLvb;
	if (!nJson.isJSON()) {
		alert('返回结果不是JSON');
		return;
	}
	nLvb = nJson.evalJSON();
	for (var i = 0, len = g_dataLvb.length; i < len; i++) {
		g_dataLvb[i].visible = false;
	}
	for (var i = 0, len = nLvb.length; i < len; i++) {
		g_dataLvb[g_usrid2index[nLvb[i]['userId']]].visible = true;
	}
	_changeLvb();
}

function submitAll() {
	var result = [];
	var rltData;
	var param = ActionEnum.DestParam;
	for (var i = 0, len = g_dataRlt.length; i < len; i++) {
		if (g_dataRlt[i]['opFlg'] != DbFlagEnum.N && g_dataRlt[i]['opFlg'] != DbFlagEnum.X) {
			rltData = $H(g_dataRlt[0]);
			rltData.unset('lvb');
			rltData.unset('lva');
			result.push(rltData);
		}
	}
	if (result.length == 0) {
		return;
	}
	param = g_funcLib.addParam(param, 'json', result.toJSON());
	new Ajax.Request(ActionEnum.DestAction, {
		method: 'post',
		parameters: param,
		onSuccess: function() {
			alert('提交成功');
			location.reload();
		},
		onFailure: function() {
			alert('提交失败： ' + ActionEnum.DestAction);
		}
	});
}

function restoreAll() {
	location.reload();
}

/**
 * 将对象数组中的指定属性用连接符连接.
 * @param {Array} arr 对象数组.
 * @param {String} key 属性名.
 * @param {String} sp 连接符.
 * @return {String} 连接后的字符串.
 */
function linkObjByKey(arr, key, sp) {
	var str = '';
	for (var i = 0, len = arr.length; i < len; i++) {
		if (str.empty()) {
			str += arr[i][key];
		} else {
			str += sp;
			str += arr[i][key];
		}
	}
	return str;
}
