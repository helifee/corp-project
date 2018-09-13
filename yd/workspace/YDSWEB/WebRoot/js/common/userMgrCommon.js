/*
 * @(#)userMgrCommon.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 用户职位管理、用户角色管理用共通JavaScript.
 *
 * @author zhangzheng
 * @version 1.0
 */
/**
 * Class定义.
 */
var UserMgr = Class.create();
UserMgr.prototype = {
	/**
	 * 文字枚举.
	 */
	MsgEnum: {
		Show: '展开',
		Hide: '收缩',
		AShow: '全展开',
		AHide: '全收缩',
		Select: '检索',
		Cancel: '取消',
		Edit: '修改',
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
		Submit: '提交',
		Dept: '部门',
		Role: '角色',
		Date: '有效期间'
	},
	
	/**
	 * CSS枚举.
	 */
	CssEnum: {
		IconShow: 'opt_CurRight',
		IconHide: 'opt_CurDown',
		IconAllShow: 'opt_CurRight',
		IconAllHide: 'opt_CurDown',
		CheckedBd: 'treeTb_bgclr_move',
		CheckedBg: 'treeTb_border_move',
		UnCheckedBd: 'bd_1sde',
		UnCheckedBg: 'bgclr_eee',
		LineBgH: 'treeTb_bgclr_hover',
		LineBg: 'treeTb_bgclr_bar',
		TitleBg: 'box_head_bc',
		DragBg: 'treeTb_bgclr_move',
		DragBd: 'treeTb_border_move',
		EditBg: 'treeTb_bgclr_edit',
		AddBg: 'treeTb_bgclr_add',
		FontNormal: 'color_bl',
		FontEdit: 'color_red'
	},
	
	/**
	 * 数据状态枚举.
	 */
	DbFlagEnum: {
		X: -2, // 无效数据
		D: 0, // 已删除
		N: 9, // 初始
		I: 1, // 插入
		U: 2 // 更新
	},
	
	/**
	 * 操作状态枚举.
	 */
	StatusEnum: {
		None: 0, // 无
		Drag: 1, // 拖动中
		Arrive: 2 // 可插入
	},
	
	/**
	 * 拖动选项枚举.
	 */
	DragEnum: {
		offsetX: 15, // X偏移
		offsetY: 20 // Y偏移
	},
	
	/**
	 * 文字模版.
	 */
	StringLibEnum: {
		_Count13: '计 {0} 人',
		_Count2: '{0} 个职位',
		_Count4: '{0} 个角色',
		_Title13: '用户列表 - {0}',
		_Title2: '职位列表',
		_Title4: '角色列表'
	},
	
	/**
	 * 对话框大小设置.
	 */
	DialogSize: {
		width12: '1000px',
		height12: '700px',
		width34: '570px',
		height34: '500px'
	},
	
	/**
	 * 构造方法.
	 * @param {Object} param 参数对象.
	 */
	initialize: function(param) {
		var atcion, seed, att;
		if (param.mode == null || param.container == null) {
			MsgBox.error('参数有误: mode,container');
			return;
		}
		
		// 主键名枚举
		this.IDS = new Object();
		
		// 属性名枚举
		this.AttrEnum = new Object();
		
		// Action枚举
		this.ActionEnum = new Object();
		
		// 文字模版
		this.StringEnum = new Object();
		
		// 当前模式
		this.g_mode = null;
		
		// 目标容器
		this.g_container = null;
		
		// 前台检索开关
		this.g_frontSelect = null;
		
		// 原始JSON数据
		this.g_json = null;
		
		// 角色/职位数据
		this.g_dataPr = null;
		
		// 用户数据
		this.g_dataUser = null;
		
		// 关系数据
		this.g_dataRlt = null;
		
		// 部门数据
		this.g_dataDept = null;
		
		// 备份数据
		this.g_dataBack = null;
		
		// 一级数据
		this.g_dataLva = null;
		
		// 二级数据
		this.g_dataLvb = null;
		
		// 一级元素模版
		this.g_lvaTmpl = null;
		
		// 二级元素模版
		this.g_lvbTmpl = null;
		
		// 记录元素模版
		this.g_logTmpl = null;
		
		// 选项元素模版
		this.g_srcTmpl = null;
		
		// 拖动元素模版
		this.g_dragTmpl = null;
		
		// 当前激活的一级元素
		this.g_lvaNow = null;
		
		// 当前操作状态
		this.g_status = null;
		
		// 当前部门索引
		this.g_deptindex = null;
		
		// userId与索引对应
		this.g_usrid2index = null;
		
		// 点击的按钮
		this.g_button = null;
		
		// 浮动工具条
		this.g_floatBar = null;
		
		// 根据模式绑定部分方法.
		switch (param.mode) {
			case ModeEnum.PosUsr:
				this.createTop = this._createTop13.bind(this);
				this.createGrid = this._createGrid12.bind(this);
				this.createList = this._createList13.bind(this);
				this.createLvaTmp = this._createLvaTmp12.bind(this);
				this.createRltTmp = this._createRltTmp12.bind(this);
				this.createSrcTmp = this._createSrcTmp13.bind(this);
				this.initLva = this._initLva13.bind(this);
				this.initLvb = this._initLvb13.bind(this);
				this.initRlt = this._initRlt13.bind(this);
				this.cancel = this._cancel13.bindAsEventListener(this);
				this.updateLog = this._updateLog13.bind(this);
				this.doInsert = this._doInsert13.bind(this);
				this.insertOne = this._insertOne13.bind(this);
				this.StringEnum.Count = this.StringLibEnum._Count13;
				this.StringEnum.Title = this.StringLibEnum._Title13;
				break;
			case ModeEnum.UsrPos:
				this.createTop = this._createTop24.bind(this);
				this.createGrid = this._createGrid12.bind(this);
				this.createList = this._createList24.bind(this);
				this.createLvaTmp = this._createLvaTmp12.bind(this);
				this.createRltTmp = this._createRltTmp12.bind(this);
				this.createSrcTmp = this._createSrcTmp24.bind(this);
				this.initLva = this._initLva24.bind(this);
				this.initLvb = this._initLvb24.bind(this);
				this.initRlt = this._initRlt24.bind(this);
				this.cancel = this._cancel24.bindAsEventListener(this);
				this.updateLog = this._updateLog24.bind(this);
				this.doInsert = this._doInsert24.bind(this);
				this.insertOne = this._insertOne24.bind(this);
				this.StringEnum.Count = this.StringLibEnum._Count2;
				this.StringEnum.Title = this.StringLibEnum._Title2;
				break;
			case ModeEnum.RolUsr:
				this.createTop = this._createTop13.bind(this);
				this.createGrid = this._createGrid34.bind(this);
				this.createList = this._createList13.bind(this);
				this.createLvaTmp = this._createLvaTmp34.bind(this);
				this.createRltTmp = this._createRltTmp34.bind(this);
				this.createSrcTmp = this._createSrcTmp13.bind(this);
				this.initLva = this._initLva13.bind(this);
				this.initLvb = this._initLvb13.bind(this);
				this.initRlt = this._initRlt13.bind(this);
				this.cancel = this._cancel13.bindAsEventListener(this);
				this.updateLog = this._updateLog13.bind(this);
				this.doInsert = this._doInsert13.bind(this);
				this.insertOne = this._insertOne13.bind(this);
				this.StringEnum.Count = this.StringLibEnum._Count13;
				this.StringEnum.Title = this.StringLibEnum._Title13;
				break;
			case ModeEnum.UsrRol:
				this.createTop = this._createTop24.bind(this);
				this.createGrid = this._createGrid34.bind(this);
				this.createList = this._createList24.bind(this);
				this.createLvaTmp = this._createLvaTmp34.bind(this);
				this.createRltTmp = this._createRltTmp34.bind(this);
				this.createSrcTmp = this._createSrcTmp24.bind(this);
				this.initLva = this._initLva24.bind(this);
				this.initLvb = this._initLvb24.bind(this);
				this.initRlt = this._initRlt24.bind(this);
				this.cancel = this._cancel24.bindAsEventListener(this);
				this.updateLog = this._updateLog24.bind(this);
				this.doInsert = this._doInsert24.bind(this);
				this.insertOne = this._insertOne24.bind(this);
				this.StringEnum.Count = this.StringLibEnum._Count4;
				this.StringEnum.Title = this.StringLibEnum._Title4;
				break;
			default:
				MsgBox.error('参数有误: mode');
				return;		}
		
		// 设定参数
		this.g_mode = param.mode;
		this.g_container = param.container;
		this.g_debug = param.debug;
		
		action = param.action;
		if (action == null || action.sourceAction == null || action.destAction == null) {
			MsgBox.error('参数有误: action');
			return;
		}
		if (action.frontSelect) {
			this.g_frontSelect = action.frontSelect;
		} else {
			this.g_frontSelect = false;
		}
		this.ActionEnum.SourceAction = action.sourceAction || '[SourceAction]';
		this.ActionEnum.DestAction = action.destAction || '[DestAction]';
		this.ActionEnum.SelectAction = action.selectAction || '[SelectAction]';
		this.ActionEnum.SourceParam = action.sourceParam || '';
		this.ActionEnum.DestParam = action.destParam || '';
		this.ActionEnum.SelectParam = action.selectParam || '';
		this.ActionEnum.DialogAction = action.dialogAction || '[DialogAction]';
		
		// 生成元素Id
		seed = param.index ? param.index : 'X';
		this.IDS.iLva = 'la' + seed;
		this.IDS.iLvb = 'lb' + seed;
		this.IDS.iRlt = 'rt' + seed;
		this.IDS.iList = 'lt' + seed;
		this.IDS.iIcon = 'ic' + seed;
		this.IDS.iCnt = 'ct' + seed;
		this.IDS.IcoAll = 'ia' + seed;
		this.IDS.TxtAll = 'ta' + seed;
		this.IDS.SrcAll = 'sa' + seed;
		this.IDS.BtnDept = 'bd' + seed;
		this.IDS.BtnSlt = 'bs' + seed;
		this.IDS.BtnSbmt = 'bt' + seed;
		this.IDS.BtnReset = 'br' + seed;
		this.IDS.SltDept = 'sd' + seed;
		this.IDS.SltPos = 'sp' + seed;
		this.IDS.Grid = 'gd' + seed;
		this.IDS.SrcList = 'sl' + seed;
		this.IDS.SrcTitle = 'st' + seed;
		this.IDS.DragList = 'dl' + seed;
		this.IDS.iDrag = 'dg' + seed;
		this.IDS.LogList = 'll' + seed;
		this.IDS.iLog = 'lg' + seed;
		this.IDS.Year = 'yr' + seed;
		this.IDS.Name = 'nm' + seed;
		this.IDS.iDept = 'dt' + seed;
		this.IDS.iSt = 'dst' + seed;
		this.IDS.iEd = 'ded' + seed;
		this.IDS.Bar = 'bar' + seed;
		
		// 设定属性名
		att = param.attrName;
		if (att != null) {
			this.AttrEnum.OD = att.deptObj || 'deptObj';
			this.AttrEnum.OP = att.prObj || 'prObj';
			this.AttrEnum.OU = att.userObj || 'userObj';
			this.AttrEnum.OR = att.rltObj || 'rltObj';
			this.AttrEnum.DI = att.deptId || 'deptId';
			this.AttrEnum.DN = att.deptName || 'deptName';
			this.AttrEnum.PI = att.prId || 'prId';
			this.AttrEnum.PN = att.prName || 'prName';
			this.AttrEnum.UI = att.userId || 'userId';
			this.AttrEnum.UN = att.userName || 'userName';
			this.AttrEnum.UD = att.userDept || 'userDept';
			this.AttrEnum.RP = att.rltPrId || 'rltPrId';
			this.AttrEnum.RU = att.rltUserId || 'rltUserId';
			this.AttrEnum.RS = att.rltStart || 'rltStart';
			this.AttrEnum.RE = att.rltEnd || 'rltEnd';
			this.AttrEnum.RG = att.rltOpFlg || 'rltOpFlg';
			this.AttrEnum.RK = att.rltKeep || [];
			this.AttrEnum.SY = att.selectYear || 'selectYear';
			this.AttrEnum.SN = att.selectName || 'selectName';
			this.AttrEnum.SD = att.selectDept || 'selectDept';
			this.AttrEnum.SP = att.selectPos || 'selectPos';
			this.AttrEnum.TJ = att.submitJson || 'submitJson';
		}
		
		// 方法绑定
		this.g_status = this.StatusEnum.None;
		this.init = this._init.bind(this);
		this.loadData = this._loadData.bind(this);
		this.delClick = this._delClick.bindAsEventListener(this);
		this.editClick = this._editClick.bindAsEventListener(this);
		this.refreshCount = this._refreshCount.bind(this);
		this.iconClickAll = this._iconClickAll.bindAsEventListener(this);
		this.iconClick = this._iconClick.bindAsEventListener(this);
		this.srcClickAll = this._srcClickAll.bindAsEventListener(this);
		this.srcClick = this._srcClick.bindAsEventListener(this);
		this.addDrag = this._addDrag.bind(this);
		this.setDate = this._setDate.bind(this);
		this.changeLvb = this._changeLvb.bindAsEventListener(this);
		this.applyChange = this._applyChange.bind(this);
		this.checkVisible = this._checkVisible.bind(this);
		this.getNewLvb = this._getNewLvb.bind(this);
		this.getNewLvbBack = this._getNewLvbBack.bind(this);
		this.submitAll = this._submitAll.bindAsEventListener(this);
		this.restoreAll = this._restoreAll.bindAsEventListener(this);
		this.startDrag = this._startDrag.bindAsEventListener(this);
		this.moving = this._moving.bindAsEventListener(this);
		this.endDrag = this._endDrag.bindAsEventListener(this);
		this.iconAdd = this._iconAdd.bind(this);
		this.iconEdit = this._iconEdit.bind(this);
		this.iconView = this._iconView.bind(this);
		this.openDialog = this._openDialog.bind(this, this.ActionEnum.DialogAction);
		this.nameClick = this._nameClick.bindAsEventListener(this);
		this.isChanged = this._isChanged.bind(this);
		this.checkMode = this._checkMode.bind(this);
		this.createElement = this._createElement.bind(this);
		this.createIconAll = this._createIconAll.bind(this);
		this.createSubmit = this._createSubmit.bind(this);
		this.createDrag = this._createDrag.bind(this);
		this.createDragTmp = this._createDragTmp.bind(this);
		this.createLog = this._createLog.bind(this);
		this.createLogTmp = this._createLogTmp.bind(this);
		this.createBar = this._createBar.bind(this);
		this.validate = this._validate.bind(this);
		
		// 自动初始化处理
		if (param.autoInit == true) {
			Event.observe(window, 'load', this.init);
		}
	},
	
	/**
	 * 页面初始化.
	 */
	_init: function() {
		with (this) {
		
			// 首次初始化
			if (g_srcTmpl != null) {
				return;
			}
			
			// 生成元素模版
			createLvaTmp();
			createRltTmp();
			createSrcTmp();
			createLogTmp();
			createDragTmp();
			
			// 生成页面元素
			createElement(g_container);
			
			// 生成浮动工具栏控制器
			this.g_floatBar = new FloatBar($(IDS.Bar));
			
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
			
			// 事件处理
			Event.observe(document, 'mousemove', this.moving);
			Event.observe(document, 'mouseup', this.endDrag);
			document.body.onselectstart = function() {
				return false;
			};
			
			// 初始化页面
			$(IDS.IcoAll).addClassName(CssEnum.IconAllHide);
			$(IDS.TxtAll).update(MsgEnum.AShow);
			$(IDS.BtnDept).value = MsgEnum.Select;
			regBtnFunc();
			
			// 初始化数据
			g_dataBack = new Array();
			g_usrid2index = new Array();
			
			// 加载数据
			new Ajax.Request(ActionEnum.SourceAction, {
				method: 'get',
				parameters: ActionEnum.SourceParam || '',
				onSuccess: loadData,
				onFailure: function() {
					MsgBox.error('获取失败： ' + ActionEnum.SourceAction);
				}
			});
		}
	},
	
	/**
	 * 读取JSON数据并加载到页面.
	 * @param {Object} request 服务器响应数据.
	 */
	_loadData: function(request) {
		with (this) {
			var tmp;
			g_json = request.responseText;
			
			// 数据检查
			if (!g_json.isJSON()) {
				MsgBox.error('数据格式错误!');
				return;
			}
			tmp = g_json.evalJSON();
			g_dataDept = tmp[AttrEnum.OD];
			g_dataUser = tmp[AttrEnum.OU];
			g_dataPr = tmp[AttrEnum.OP];
			g_dataRlt = tmp[AttrEnum.OR];
			
			if (this.checkMode(13)) {
				g_dataLva = g_dataPr;
				g_dataLvb = g_dataUser;
				AttrEnum.AI = AttrEnum.PI;
				AttrEnum.AN = AttrEnum.PN;
				AttrEnum.BI = AttrEnum.UI;
				AttrEnum.BN = AttrEnum.UN;
			} else {
				g_dataLva = g_dataUser;
				g_dataLvb = g_dataPr;
				AttrEnum.BI = AttrEnum.PI;
				AttrEnum.BN = AttrEnum.PN;
				AttrEnum.AI = AttrEnum.UI;
				AttrEnum.AN = AttrEnum.UN;
			}
			
			// 添加部门下拉列表
			for (var i = 0, len = g_dataDept.length; i < len; i++) {
				tmp = $(IDS.iDept + i) ? $(IDS.iDept + i) : new Element('option');
				tmp.writeAttribute({
					'id': IDS.iDept + i,
					'value': i
				});
				
				tmp.update(g_dataDept[i][AttrEnum.DN]);
				$(IDS.SltDept).insert({
					bottom: tmp
				});
			}
			
			// 加载数据
			initLva.defer();
			initLvb.defer();
			initRlt.defer();
		}
	},
	
	/**
	 * 加载一级数据(职位/角色-用户).
	 */
	_initLva13: function() {
		with (this) {
			var nElement;
			
			// 一级数据循环
			for (var i = 0, len = g_dataPr.length; i < len; i++) {
			
				// 生成新的一级元素
				nElement = $(IDS.iLva + i);
				nElement = g_lvaTmpl.clone(true);
				nElement.id = IDS.iLva + i;
				nElement.down(3).id = IDS.iIcon + i;
				nElement.down(3).observe('click', iconClick);
				nElement.down(1).observe('click', iconClick);
				nElement.down(1).next(0).id = IDS.iCnt + i;
				nElement.down(0).next(0).id = IDS.iList + i;
				nElement.key = i;
				nElement.down(3).next(0).update(g_dataPr[i][AttrEnum.PN]);
				
				if (this.checkMode(3)) {
					nElement.down(2).barKey = i;
					g_floatBar.bind(nElement.down(2), 3, 103);
				} else {
					var dest = nElement.down(3).next(0);
					var rep = new Element('div').addClassName('float_l cur_pointer').update(dest.innerHTML);
					rep.observe('click', this.nameClick);
					dest.update(rep);
					dest.addClassName('divlink');
				}
				
				// 插入页面
				$(IDS.Grid).insert({
					bottom: nElement
				});
				
				// 添加下拉菜单
				if ($(IDS.SltPos)) {
				
					nElement = new Element('option', {
						'id': 'posOption_' + i,
						'value': i
					});
					nElement.update(g_dataPr[i][AttrEnum.PN]);
					$(IDS.SltPos).insert({
						bottom: nElement
					});
				}
			}
		}
	},
	
	/**
	 * 加载一级数据(用户-职位/角色).
	 */
	_initLva24: function() {
		with (this) {
			var nElement;
			
			// 一级数据循环
			for (var i = 0, len = g_dataUser.length; i < len; i++) {
			
				// 生成新的一级元素
				nElement = $(IDS.iLva + i);
				nElement = g_lvaTmpl.clone(true);
				nElement.id = IDS.iLva + i;
				nElement.down(3).id = IDS.iIcon + i;
				nElement.down(3).observe('click', iconClick);
				nElement.down(1).observe('click', iconClick);
				nElement.down(1).next(0).id = IDS.iCnt + i;
				nElement.down(0).next(0).id = IDS.iList + i;
				
				nElement.key = i;
				nElement.down(3).next(0).update(g_dataUser[i][AttrEnum.UN]);
				if (this.checkMode(4)) {
					var dest = nElement.down(3).next(0);
					var rep = new Element('div').addClassName('float_l cur_pointer').update(dest.innerHTML);
					rep.observe('click', this.nameClick);
					dest.update(rep);
					dest.addClassName('divlink');
				}
				
				// 插入页面
				$(IDS.Grid).insert({
					bottom: nElement
				});
				
				g_dataUser[i].visible = true;
				g_usrid2index[g_dataUser[i][AttrEnum.UI]] = i;
			}
		}
	},
	
	/**
	 * 加载二级数据(职位/角色-用户).
	 */
	_initLvb13: function() {
		with (this) {
			var nElement;
			
			// 初始化二级数据
			for (var i = 0, len = g_dataUser.length; i < len; i++) {
				g_dataUser[i].rlt = [];
				g_dataUser[i].visible = true;
			}
			
			// 生成右侧列表
			for (var i = 0, len = g_dataLvb.length; i < len; i++) {
			
				nElement = $(IDS.iLvb + i);
				nElement = g_srcTmpl.clone(true);
				nElement.id = IDS.iLvb + i;
				nElement.observe('click', srcClick);
				nElement.observe('mousedown', startDrag);
				
				nElement.key = i;
				nElement.down('label').update(g_dataLvb[i][AttrEnum.BN]);
				nElement.down('input').checked = false;
				
				$(IDS.SrcList).insert({
					bottom: nElement
				});
				g_usrid2index[g_dataUser[i][AttrEnum.UI]] = i;
			}
		}
	},
	
	/**
	 * 加载二级数据(用户-职位/角色).
	 */
	_initLvb24: function() {
		with (this) {
			var nElement;
			
			// 生成右侧列表
			for (var i = 0, len = g_dataLvb.length; i < len; i++) {
			
				nElement = $(IDS.iLvb + i);
				nElement = g_srcTmpl.clone(true);
				nElement.id = IDS.iLvb + i;
				nElement.observe('click', srcClick);
				nElement.observe('mousedown', startDrag);
				
				nElement.barKey = i;
				if (this.checkMode(4)) {
					g_floatBar.bind(nElement, 5, 158);
				} else {
					g_floatBar.bind(nElement, 5, 174);
				}
				
				nElement.key = i;
				nElement.down('label').update(g_dataLvb[i][AttrEnum.BN]);
				nElement.down('input').checked = false;
				
				$(IDS.SrcList).insert({
					bottom: nElement
				});
			}
		}
	},
	
	/**
	 * 加载关系数据(职位/角色-用户).
	 */
	_initRlt13: function() {
		with (this) {
			var nElement, link, i, j, len1, len2;
			
			// 关系数据循环
			for (i = 0, len1 = g_dataRlt.length; i < len1; i++) {
			
				nElement = $(IDS.iRlt + i);
				nElement = g_lvbTmpl.clone(true);
				nElement.id = IDS.iRlt + i;
				link = nElement.down('a');
				if (this.checkMode(34)) {
					link.observe('click', editClick);
					link.show();
				}
				link = link.next(0);
				link.observe('click', delClick);
				
				nElement.key = i;
				g_dataRlt[i][AttrEnum.RG] = DbFlagEnum.N;
				
				// 二级数据循环，反向绑定
				for (j = 0, len2 = g_dataUser.length; j < len2; j++) {
					if (g_dataRlt[i][AttrEnum.RU] == g_dataUser[j][AttrEnum.UI]) {
						g_dataRlt[i].kb = j;
						nElement.down(1).update(g_dataUser[j][AttrEnum.UN]);
						
						if (this.checkMode(34)) {
							link = nElement.select('input');
							link[0].value = g_dataRlt[i][AttrEnum.RS];
							link[1].value = g_dataRlt[i][AttrEnum.RE];
							link[0].addClassName(CssEnum.FontNormal);
							link[1].addClassName(CssEnum.FontNormal);
						}
						break;
					}
				}
				
				// 数据错误
				if (g_dataRlt[i].kb == null) {
					MsgBox.error('未找到用户：' + g_dataRlt[i][AttrEnum.RU]);
				}
				
				// 一级数据循环，反向绑定
				for (j = 0, len2 = g_dataPr.length; j < len2; j++) {
					if (g_dataRlt[i][AttrEnum.RP] == g_dataPr[j][AttrEnum.PI]) {
						g_dataRlt[i].ka = j;
						$(IDS.iList + j).insert({
							bottom: nElement
						});
						break;
					}
				}
				
				// 数据错误
				if (g_dataRlt[i].ka == null) {
					MsgBox.error('未找到角色|职位：' + g_dataRlt[i][AttrEnum.RP]);
				}
				
				// 添加索引到二级数据中
				g_dataUser[g_dataRlt[i].kb].rlt.push(i);
				
				if (this.checkMode(3)) {
					var dest = nElement.down(1);
					var rep = new Element('div').addClassName('cur_pointer').update(dest.innerHTML);
					rep.observe('click', this.nameClick);
					dest.update(rep);
					dest.addClassName('divlink');
				}
			}
			
			// 更新标题文字
			$(IDS.SrcTitle).update(StringEnum.Title.format(MsgEnum.AllDept));
			
			// 刷新计数
			refreshCount(-1);
		}
	},
	
	/**
	 * 加载关系数据(用户-职位/角色).
	 */
	_initRlt24: function() {
		with (this) {
			var nElement, link, i, j, len1, len2;
			
			// 关系数据循环
			for (i = 0, len1 = g_dataRlt.length; i < len1; i++) {
			
				nElement = $(IDS.iRlt + i);
				nElement = g_lvbTmpl.clone(true);
				nElement.id = IDS.iRlt + i;
				link = nElement.down('a');
				if (this.checkMode(34)) {
					link.observe('click', editClick);
					link.show();
				}
				link = link.next(0);
				link.observe('click', delClick);
				nElement.key = i;
				nElement.show();
				g_dataRlt[i][AttrEnum.RG] = DbFlagEnum.N;
				
				// 二级数据循环，反向绑定
				for (j = 0, len2 = g_dataPr.length; j < len2; j++) {
					if (g_dataRlt[i][AttrEnum.RP] == g_dataPr[j][AttrEnum.PI]) {
						g_dataRlt[i].kb = j;
						nElement.down(1).update(g_dataPr[j][AttrEnum.PN]);
						if (this.checkMode(34)) {
							link = nElement.select('input');
							link[0].value = g_dataRlt[i][AttrEnum.RS];
							link[1].value = g_dataRlt[i][AttrEnum.RE];
							link[0].addClassName(CssEnum.FontNormal);
							link[1].addClassName(CssEnum.FontNormal);
						}
						break;
					}
				}
				
				// 数据错误
				if (g_dataRlt[i].kb == null) {
					MsgBox.error('未找到角色|职位：' + g_dataRlt[i][AttrEnum.RP]);
				}
				
				// 一级数据循环，反向绑定
				for (j = 0, len2 = g_dataUser.length; j < len2; j++) {
					if (g_dataRlt[i][AttrEnum.RU] == g_dataUser[j][AttrEnum.UI]) {
						g_dataRlt[i].ka = j;
						$(IDS.iList + j).insert({
							bottom: nElement
						});
						break;
					}
				}
				
				// 数据错误
				if (g_dataRlt[i].ka == null) {
					MsgBox.error('未找到用户：' + g_dataRlt[i][AttrEnum.RU]);
				}
			}
			
			// 更新标题文字
			$(IDS.SrcTitle).update(StringEnum.Title.format(MsgEnum.AllDept));
			
			// 刷新计数
			refreshCount(-1);
		}
	},
	
	/**
	 * 删除事件.
	 * @param {Event} event 点击事件.
	 */
	_delClick: function(event) {
		with (this) {
			var objLvb = Element.findKey(Event.element(event));
			var objLva;
			objLvb.hide();
			objLvb.down(0).removeClassName(CssEnum.AddBg).removeClassName(CssEnum.EditBg);
			
			// 当前数据状态为插入时
			if (g_dataRlt[objLvb.key][AttrEnum.RG] == DbFlagEnum.I) {
				g_dataRlt[objLvb.key][AttrEnum.RG] = DbFlagEnum.X;
			} else {
			
				// 当前数据为原始数据时，备份
				if (g_dataRlt[objLvb.key][AttrEnum.RG] == DbFlagEnum.N) {
					g_dataBack[objLvb.key] = Object.clone(g_dataRlt[objLvb.key]);
				}
				g_dataRlt[objLvb.key][AttrEnum.RG] = DbFlagEnum.D;
			}
			
			objLva = $(IDS.iLva + g_dataRlt[objLvb.key].ka);
			
			// 刷新计数
			refreshCount(objLva.key);
			
			// 计数为0时
			if (objLva.count == 0) {
				$(IDS.iList + objLva.key).hide();
			}
			
			// 更新操作记录
			updateLog(objLvb.key);
		}
	},
	
	/**
	 * 编辑事件.
	 * @param {Event} event 点击事件.
	 */
	_editClick: function(event) {
		with (this) {
			var link = Event.element(event);
			var objLvb = Element.findKey(link);
			var inputs = objLvb.select('input');
			if (inputs[0].func != null) {
				return;
			}
			$(inputs[0]).readOnly = false;
			$(inputs[1]).readOnly = false;
			inputs[0].func = function() {
				WdatePicker({
					maxDate: $F(inputs[1]),
					el: inputs[0],
					dateFmt: 'yyyy-MM-dd',
					onpicked: function() {
						g_dataRlt[objLvb.key][AttrEnum.RS] = inputs[0].value;
						
						// 更新操作记录
						updateLog(objLvb.key);
					}
				});
			};
			inputs[1].func = function() {
				WdatePicker({
					minDate: $F(inputs[0]),
					el: inputs[1],
					dateFmt: 'yyyy-MM-dd',
					onpicked: function() {
						g_dataRlt[objLvb.key][AttrEnum.RE] = inputs[1].value;
						
						// 更新操作记录
						updateLog(objLvb.key);
					}
				});
			};
			inputs[0].observe('click', inputs[0].func);
			inputs[1].observe('click', inputs[1].func);
			inputs[0].removeClassName(CssEnum.FontNormal).addClassName(CssEnum.FontEdit);
			inputs[1].removeClassName(CssEnum.FontNormal).addClassName(CssEnum.FontEdit);
			
			// 当前数据为原始数据时，备份
			if (g_dataRlt[objLvb.key][AttrEnum.RG] == DbFlagEnum.N) {
				g_dataBack[objLvb.key] = Object.clone(g_dataRlt[objLvb.key]);
				g_dataRlt[objLvb.key][AttrEnum.RG] = DbFlagEnum.U;
			}
		}
	},
	
	/**
	 * 刷新计数.
	 * @param {int} lvaIndex 一级数据索引，-1时刷新全部.
	 */
	_refreshCount: function(lvaIndex) {
		with (this) {
			var count;
			lvaIndex = lvaIndex != null ? lvaIndex : 0;
			if (lvaIndex >= 0) {
				count = Element.visibleChilds($(IDS.iList + lvaIndex)).length
				$(IDS.iLva + lvaIndex).count = count;
				$(IDS.iCnt + lvaIndex).update(StringEnum.Count.format(count.formatl(3)));
			} else {
			
				for (var i = 0, len = g_dataLva.length; i < len; i++) {
					count = Element.visibleChilds($(IDS.iList + i)).length;
					$(IDS.iLva + i).count = count;
					$(IDS.iCnt + i).update(StringEnum.Count.format(count.formatl(3)));
					if ($(IDS.iIcon + i).hasClassName(CssEnum.IconShow)) {
						if ($(IDS.iLva + i).count > 0) {
							$(IDS.iList + i).show();
						} else {
							$(IDS.iList + i).hide();
						}
					}
				}
			}
		}
	},
	
	/**
	 * 全部展开/收缩.
	 */
	_iconClickAll: function() {
		with (this) {
			if ($(IDS.IcoAll).hasClassName(CssEnum.IconAllHide)) {
				$(IDS.IcoAll).removeClassName(CssEnum.IconAllHide).addClassName(CssEnum.IconAllShow);
				$(IDS.TxtAll).update(MsgEnum.AHide);
				for (var i = 0, len = g_dataLva.length; i < len; i++) {
					if ($(IDS.iIcon + i).hasClassName(CssEnum.IconHide)) {
						$(IDS.iIcon + i).removeClassName(CssEnum.IconHide).addClassName(CssEnum.IconShow);
						$(IDS.iIcon + i).title = MsgEnum.Hide;
						
						// 计数不为0时
						if ($(IDS.iLva + i).count > 0) $(IDS.iList + i).show();
					}
				}
			} else {
				$(IDS.IcoAll).removeClassName(CssEnum.IconAllShow).addClassName(CssEnum.IconAllHide);
				$(IDS.TxtAll).update(MsgEnum.AShow);
				for (var i = 0, len = g_dataLva.length; i < len; i++) {
					if ($(IDS.iIcon + i).hasClassName(CssEnum.IconShow)) {
						$(IDS.iIcon + i).removeClassName(CssEnum.IconShow).addClassName(CssEnum.IconHide);
						$(IDS.iIcon + i).title = MsgEnum.Show;
						$(IDS.iList + i).hide();
					}
				}
			}
		}
	},
	
	/**
	 * 展开/收缩图标.
	 * @param {Event} event 点击事件.
	 */
	_iconClick: function(event) {
		with (this) {
			var objLva = Element.findKey(Event.element(event));
			var objIcon = objLva.down(3);
			objIcon.toggleClassName(CssEnum.IconHide).toggleClassName(CssEnum.IconShow);
			objIcon.title = (objIcon.title == MsgEnum.Hide) ? MsgEnum.Show : MsgEnum.Hide;
			
			// 计数不为0时
			if (objLva.count > 0) $(IDS.iList + objLva.key).toggle();
			Event.stop(event);
		}
	},
	
	/**
	 * 全部选中/取消.
	 */
	_srcClickAll: function() {
		with (this) {
			// 选中全部
			if ($(IDS.SrcAll).checked == true) {
				$(IDS.SrcAll).checked = true;
				for (var i = 0, len = g_dataLvb.length; i < len; i++) {
					if (checkVisible(i) || this.checkMode(24)) {
						$(IDS.iLvb + i).down('input').checked = true;
						$(IDS.iLvb + i).removeClassName(CssEnum.UnCheckedBd).removeClassName(CssEnum.UnCheckedBg);
						$(IDS.iLvb + i).addClassName(CssEnum.CheckedBd).addClassName(CssEnum.CheckedBg);
						
						// 添加到拖动列表
						addDrag(i);
					}
				}
			} else {
				$(IDS.SrcAll).checked = false;
				$(IDS.DragList).count = 0;
				for (var i = 0, len = g_dataLvb.length; i < len; i++) {
					$(IDS.iLvb + i).down('input').checked = false;
					$(IDS.iLvb + i).removeClassName(CssEnum.CheckedBd).removeClassName(CssEnum.CheckedBg);
					$(IDS.iLvb + i).addClassName(CssEnum.UnCheckedBd).addClassName(CssEnum.UnCheckedBg);
					if ($(IDS.iDrag + i) != null) $(IDS.iDrag + i).hide();
				}
			}
		}
	},
	
	/**
	 * 选中/取消二级元素.
	 * @param {Event} event 事件对象.
	 */
	_srcClick: function(event) {
		with (this) {
			var srcObj = Event.element(event);
			if (srcObj.key == null) {
				srcObj = Element.findKey(srcObj);
			}
			if (!srcObj.hasClassName(CssEnum.CheckedBg)) {
				srcObj.down('input').checked = true;
				srcObj.removeClassName(CssEnum.UnCheckedBd).removeClassName(CssEnum.UnCheckedBg);
				srcObj.addClassName(CssEnum.CheckedBd).addClassName(CssEnum.CheckedBg);
				
				// 添加到拖动列表
				this.addDrag(srcObj.key);
			} else {
				srcObj.down('input').checked = false;
				srcObj.removeClassName(CssEnum.CheckedBd).removeClassName(CssEnum.CheckedBg);
				srcObj.addClassName(CssEnum.UnCheckedBd).addClassName(CssEnum.UnCheckedBg);
				$(IDS.iDrag + srcObj.key).hide();
				$(IDS.DragList).count -= 1;
			}
		}
	},
	
	/**
	 * 向拖动列表中添加二级数据.
	 * @param {int} lvbIndex 二级数据索引.
	 * @return {Object} 添加的元素.
	 */
	_addDrag: function(lvbIndex) {
		with (this) {
			lvbIndex = lvbIndex != null ? lvbIndex : 0;
			var dragObj = $(IDS.iDrag + lvbIndex);
			
			// 已含有此元素
			if (dragObj != null) {
				dragObj.show();
			} else {
				dragObj = g_dragTmpl.clone(true);
				dragObj.down(0).update(g_dataLvb[lvbIndex][AttrEnum.BN]);
				dragObj.id = IDS.iDrag + lvbIndex;
				dragObj.key = lvbIndex;
			}
			
			// 插入到列表最后
			$(IDS.DragList).insert({
				bottom: dragObj
			});
			
			// 计数器
			$(IDS.DragList).count += 1;
			return dragObj;
		}
	},
	
	/**
	 * 取消操作(职位/角色-用户).
	 * @param {Event} event 点击事件.
	 */
	_cancel13: function(event) {
		with (this) {
			var objElement = Event.element(event);
			
			// 取得二级数据关联的全部一级数据索引
			var rltList = g_dataUser[Element.findKey(objElement).key].rlt;
			
			for (var i = 0, len = rltList.length; i < len; i++) {
			
				$(IDS.iRlt + rltList[i]).down(0).removeClassName(CssEnum.AddBg).removeClassName(CssEnum.EditBg);
				
				// 根据当前状态回滚
				switch (g_dataRlt[rltList[i]][AttrEnum.RG]) {
					case DbFlagEnum.N:
						break;
					case DbFlagEnum.I:
						$(IDS.iRlt + rltList[i]).hide();
						g_dataRlt[rltList[i]][AttrEnum.RG] = DbFlagEnum.X;
						break;
					case DbFlagEnum.D:
						g_dataRlt[rltList[i]] = Object.clone(g_dataBack[rltList[i]]);
						$(IDS.iRlt + rltList[i]).show();
						setDate($(IDS.iRlt + rltList[i]));
						break;
					case DbFlagEnum.U:
						g_dataRlt[rltList[i]] = Object.clone(g_dataBack[rltList[i]]);
						$(IDS.iRlt + rltList[i]).show();
						setDate($(IDS.iRlt + rltList[i]));
						break;
					case DbFlagEnum.X:
						break;
					default:
                        break;
				}
				
				// 刷新受影响的计数
				refreshCount(g_dataRlt[rltList[i]].ka);
			}
			
			// 刷新操作记录
			updateLog(rltList[0]);
		}
	},
	
	/**
	 * 取消操作(用户-职位/角色).
	 * @param {Event} event 点击事件.
	 */
	_cancel24: function(event) {
		with (this) {
			var objElement = Event.element(event);
			
			// 取得二级数据关联的全部一级数据索引
			var rltList = $(IDS.iList + Element.findKey(objElement).key).childElements();
			
			var rKey;
			for (var i = 0, len = rltList.length; i < len; i++) {
				rKey = rltList[i].key;
				$(IDS.iRlt + rKey).down(0).removeClassName(CssEnum.AddBg).removeClassName(CssEnum.EditBg);
				
				// 根据当前状态回滚
				switch (g_dataRlt[rKey][AttrEnum.RG]) {
					case DbFlagEnum.N:
						break;
					case DbFlagEnum.I:
						$(IDS.iRlt + rKey).hide();
						g_dataRlt[rKey][AttrEnum.RG] = DbFlagEnum.X;
						break;
					case DbFlagEnum.D:
						g_dataRlt[rKey] = Object.clone(g_dataBack[rKey]);
						setDate($(IDS.iRlt + rKey));
						$(IDS.iRlt + rKey).show();
						break;
					case DbFlagEnum.U:
						g_dataRlt[rltList[i]] = Object.clone(g_dataBack[rKey]);
						setDate($(IDS.iRlt + rKey));
						$(IDS.iRlt + rltList[i]).show();
						break;
					case DbFlagEnum.X:
						break;
					default:
                        break;
				}
				
				// 刷新受影响的计数
				refreshCount(g_dataRlt[rKey].ka);
			}
			
			// 刷新操作记录
			updateLog(rltList[0].key);
		}
	},
	
	/**
	 * 更新操作记录(职位/角色-用户).
	 * @param {int} rltIndex 关系数据索引.
	 */
	_updateLog13: function(rltIndex) {
		with (this) {
			rltIndex = rltIndex != null ? rltIndex : 0;
			var objRlt = g_dataRlt[rltIndex];
			var nLog, nCells, strOld, strNew;
			var oldLva = [];
			var newLva = [];
			var rltList = g_dataUser[g_dataRlt[rltIndex].kb].rlt;
			
			// 循环所有相关的关系数据
			for (var i = 0, len = rltList.length; i < len; i++) {
			
				// 根据当前状态处理
				switch (g_dataRlt[rltList[i]][AttrEnum.RG]) {
					case DbFlagEnum.N:
						oldLva.push({
							'id': g_dataRlt[rltList[i]].ka,
							'str': g_dataPr[g_dataRlt[rltList[i]].ka][AttrEnum.PN]
						});
						newLva.push({
							'id': g_dataRlt[rltList[i]].ka,
							'str': g_dataPr[g_dataRlt[rltList[i]].ka][AttrEnum.PN]
						});
						break;
					case DbFlagEnum.I:
						newLva.push({
							'id': g_dataRlt[rltList[i]].ka,
							'str': g_dataPr[g_dataRlt[rltList[i]].ka][AttrEnum.PN]
						});
						break;
					case DbFlagEnum.D:
						oldLva.push({
							'id': g_dataBack[rltList[i]].ka,
							'str': g_dataPr[g_dataBack[rltList[i]].ka][AttrEnum.PN]
						})
						break;
					case DbFlagEnum.U:
						oldLva.push({
							'id': g_dataBack[rltList[i]].ka,
							'str': g_dataPr[g_dataBack[rltList[i]].ka][AttrEnum.PN] + '(' + g_dataBack[rltList[i]][AttrEnum.RS] + ',' + g_dataBack[rltList[i]][AttrEnum.RE] + ')'
						})
						newLva.push({
							'id': g_dataRlt[rltList[i]].ka,
							'str': g_dataPr[g_dataRlt[rltList[i]].ka][AttrEnum.PN] + '(' + g_dataRlt[rltList[i]][AttrEnum.RS] + ',' + g_dataRlt[rltList[i]][AttrEnum.RE] + ')'
						});
						break;
					default:
                        break;
				}
			}
			
			// 结果排序
			oldLva.sort(sortMethod('id', true));
			newLva.sort(sortMethod('id', true));
			
			// 生成文字
			strOld = linkObjByKey(oldLva, 'str', ', ');
			strNew = linkObjByKey(newLva, 'str', ', ');
			
			// 创建操作记录
			nLog = $(IDS.iLog + objRlt.kb);
			
			// 前后相同且已存在记录
			if (strOld == strNew) {
				$(IDS.iRlt + rltIndex).down(0).removeClassName(CssEnum.AddBg).removeClassName(CssEnum.EditBg);
				if (nLog != null) {
					nLog.hide();
				}
				return;
			}
			
			if (g_dataRlt[rltIndex][AttrEnum.RG] == DbFlagEnum.U) {
				$(IDS.iRlt + rltIndex).down(0).removeClassName(CssEnum.AddBg).addClassName(CssEnum.EditBg);
			} else {
				$(IDS.iRlt + rltIndex).down(0).addClassName(CssEnum.AddBg).removeClassName(CssEnum.EditBg);
			}
			
			if (nLog == null) {
				nLog = g_logTmpl.clone(true);
				nLog.id = IDS.iLog + objRlt.kb;
				nLog.key = objRlt.kb;
				nLog.down('a').observe('click', cancel);
			} else {
				nLog.show();
			}
			
			// 填入文字
			nCells = nLog.childElements();
			nCells[0].update(g_dataUser[objRlt.kb][AttrEnum.UN]);
			nCells[1].update(strOld);
			nCells[2].update(strNew);
			
			// 插入记录到最后
			$(IDS.LogList).insert({
				bottom: nLog
			});
			
			listColor($(IDS.LogList).up(0));
		}
	},
	
	/**
	 * 更新操作记录(用户-职位/角色).
	 * @param {int} rltIndex 关系数据索引.
	 */
	_updateLog24: function(rltIndex) {
		with (this) {
			rltIndex = rltIndex != null ? rltIndex : 0;
			var objRlt = g_dataRlt[rltIndex];
			var nLog, nCells, strOld, strNew;
			var oldLva = [];
			var newLva = [];
			var exists = $(IDS.iList + g_dataRlt[rltIndex].ka).childElements();
			
			// 循环所有相关的关系数据
			for (var i = 0, len = exists.length; i < len; i++) {
			
				// 根据当前状态处理
				switch (g_dataRlt[exists[i].key][AttrEnum.RG]) {
					case DbFlagEnum.N:
						oldLva.push({
							'id': g_dataRlt[exists[i].key].kb,
							'str': g_dataPr[g_dataRlt[exists[i].key].kb][AttrEnum.BN]
						});
						newLva.push({
							'id': g_dataRlt[exists[i].key].kb,
							'str': g_dataPr[g_dataRlt[exists[i].key].kb][AttrEnum.BN]
						});
						break;
					case DbFlagEnum.I:
						newLva.push({
							'id': g_dataRlt[exists[i].key].kb,
							'str': g_dataPr[g_dataRlt[exists[i].key].kb][AttrEnum.BN]
						});
						break;
					case DbFlagEnum.D:
						oldLva.push({
							'id': g_dataBack[exists[i].key].kb,
							'str': g_dataPr[g_dataBack[exists[i].key].kb][AttrEnum.BN]
						});
						break;
					case DbFlagEnum.U:
						oldLva.push({
							'id': g_dataBack[exists[i].key].kb,
							'str': g_dataPr[g_dataBack[exists[i].key].kb][AttrEnum.BN] + '(' + g_dataBack[exists[i].key][AttrEnum.RS] + ',' + g_dataBack[exists[i].key][AttrEnum.RE] + ')'
						});
						newLva.push({
							'id': g_dataRlt[exists[i].key].kb,
							'str': g_dataPr[g_dataRlt[exists[i].key].kb][AttrEnum.BN] + '(' + g_dataRlt[exists[i].key][AttrEnum.RS] + ',' + g_dataRlt[exists[i].key][AttrEnum.RE] + ')'
						});
						break;
					default:
                        break;
				}
			}
			
			// 结果排序
			oldLva.sort(sortMethod('id', true));
			newLva.sort(sortMethod('id', true));
			
			// 生成文字
			strOld = linkObjByKey(oldLva, 'str', ', ');
			strNew = linkObjByKey(newLva, 'str', ', ');
			
			
			// 创建操作记录
			nLog = $(IDS.iLog + objRlt.ka);
			
			// 前后相同且已存在记录
			if (strOld == strNew) {
				$(IDS.iRlt + rltIndex).down(0).removeClassName(CssEnum.AddBg).removeClassName(CssEnum.EditBg);
				if (nLog != null) {
					nLog.hide();
				}
				return;
			}
			
			if (g_dataRlt[rltIndex][AttrEnum.RG] == DbFlagEnum.U) {
				$(IDS.iRlt + rltIndex).down(0).removeClassName(CssEnum.AddBg).addClassName(CssEnum.EditBg);
			} else {
				$(IDS.iRlt + rltIndex).down(0).addClassName(CssEnum.AddBg).removeClassName(CssEnum.EditBg);
			}
			
			if (nLog == null) {
				nLog = g_logTmpl.clone(true);
				nLog.id = IDS.iLog + objRlt.ka;
				nLog.key = objRlt.ka;
				nLog.down('a').observe('click', cancel);
			} else {
				nLog.show();
			}
			
			// 填入文字
			nCells = nLog.childElements();
			nCells[0].update(g_dataUser[objRlt.ka][AttrEnum.UN]);
			nCells[1].update(strOld);
			nCells[2].update(strNew);
			
			// 插入记录到最后
			$(IDS.LogList).insert({
				bottom: nLog
			});
			
			listColor($(IDS.LogList).up(0));
		}
	},
	
	/**
	 * 向指定一级元素中插入拖动的二级数据(职位/角色-用户).
	 * @param {Object} objLva 一级元素.
	 */
	_doInsert13: function(objLva) {
		with (this) {
			var newObjs = Element.visibleChilds($(IDS.DragList));
			var lvbList = $(IDS.iList + objLva.key);
			var rltIndex;
			var existList = [];
			var msg = '已存在：';
			for (var i = 0, len = newObjs.length; i < len; i++) {
			
				// 插入一个数据
				rltIndex = this.insertOne(objLva, newObjs[i].key, 1);
				
				// 返回正确索引
				if (rltIndex >= 0) {
					if (g_dataUser[g_dataRlt[rltIndex].kb].rlt.indexOf(rltIndex) < 0) {
						g_dataUser[g_dataRlt[rltIndex].kb].rlt.push(rltIndex);
					}
					
					// 更新操作记录
					updateLog(rltIndex);
				} else {
				
					// 添加到已存在列表
					existList.push(g_dataLvb[newObjs[i].key][AttrEnum.BN]);
				}
			}
			
			// 展开列表
			if (!lvbList.visible()) {
				$(IDS.iIcon + objLva.key).removeClassName(CssEnum.IconHide).addClassName(CssEnum.IconShow);
				$(IDS.iIcon + objLva.key).title = MsgEnum.Show;
				lvbList.show();
			}
			
			// 刷新计数
			refreshCount(objLva.key);
			
			// 显示已存在列表
			if (existList.length > 0) MsgBox.message(msg + existList.join('，'));
		}
	},
	
	/**
	 * 向指定一级元素中插入拖动的二级数据(用户-职位/角色).
	 * @param {Object} objLva 一级元素.
	 */
	_doInsert24: function(objLva) {
		with (this) {
			var newObjs = Element.visibleChilds($(IDS.DragList));
			var lvbList = $(IDS.iList + objLva.key);
			var rltIndex;
			var existList = [];
			var msg = '已存在：';
			for (var i = 0, len = newObjs.length; i < len; i++) {
			
				// 插入一个数据
				rltIndex = this.insertOne(objLva, newObjs[i].key, 1);
				
				// 返回正确索引
				if (rltIndex >= 0) {
				
					// 更新操作记录
					updateLog(rltIndex);
				} else {
				
					// 添加到已存在列表
					existList.push(g_dataLvb[newObjs[i].key][AttrEnum.BN]);
				}
			}
			
			// 展开列表
			if (!lvbList.visible()) {
				$(IDS.iIcon + objLva.key).removeClassName(CssEnum.IconHide).addClassName(CssEnum.IconShow);
				$(IDS.iIcon + objLva.key).title = MsgEnum.Show;
				lvbList.show();
			}
			
			// 刷新计数
			refreshCount(objLva.key);
			
			// 显示已存在列表
			if (existList.length > 0) MsgBox.message(msg + existList.join('，'));
		}
	},
	
	/**
	 * 插入一个记录(职位/角色-用户).
	 * @param {Object} objLva 一级元素.
	 * @param {int} lvbIndex 二级数据索引.
	 * @param {bool} moveEnd 是否移至最后.
	 * @return {int} 关系数据索引或-1.
	 */
	_insertOne13: function(objLva, lvbIndex, moveEnd) {
		with (this) {
			lvbIndex = lvbIndex != null ? lvbIndex : 0;
			var list = $(IDS.iList + objLva.key);
			var rltList = g_dataUser[lvbIndex].rlt;
			var objNew, lvbNew, link;
			
			// 检查是否已添加过此记录
			for (var i = 0, len = rltList.length; i < len; i++) {
			
				// 已存在且无效则重置状态并显示
				if (g_dataRlt[rltList[i]].ka == objLva.key) {
					objNew = $(IDS.iRlt + rltList[i]);
					if (g_dataRlt[rltList[i]][AttrEnum.RG] == DbFlagEnum.D) {
					
						// 原项删除又添加后的状态
						if (this.checkMode(3)) {
							$(IDS.iRlt + rltList[i]).down(0).removeClassName(CssEnum.AddBg).addClassName(CssEnum.EditBg);
							g_dataRlt[rltList[i]][AttrEnum.RG] = DbFlagEnum.U;
						} else {
							g_dataRlt[rltList[i]][AttrEnum.RG] = DbFlagEnum.N;
						}
						
					} else if (g_dataRlt[rltList[i]][AttrEnum.RG] == DbFlagEnum.X) {
						g_dataRlt[rltList[i]][AttrEnum.RG] = DbFlagEnum.I;
						$(IDS.iRlt + rltList[i]).down(0).addClassName(CssEnum.AddBg);
					} else {
					
						// 已存在且有效
						return -1;
					}
					if (moveEnd) {
						list.insert({
							bottom: objNew
						});
						if (this.checkMode(3)) setDate(objNew, true);
					}
					objNew.show();
					return rltList[i];
				}
			}
			
			// 未添加过则新建
			objNew = Object.clone(g_dataRlt[0]);
			objNew[AttrEnum.RU] = g_dataLvb[lvbIndex][AttrEnum.BI];
			objNew[AttrEnum.RP] = g_dataLva[objLva.key][AttrEnum.AI];
			objNew[AttrEnum.RG] = DbFlagEnum.I;
			objNew.ka = objLva.key;
			objNew.kb = lvbIndex;
			g_dataRlt[g_dataRlt.length] = objNew;
			
			lvbNew = g_lvbTmpl.clone(true);
			lvbNew.key = g_dataRlt.length - 1;
			lvbNew.id = IDS.iRlt + lvbNew.key;
			lvbNew.down(0).addClassName(CssEnum.AddBg);
			lvbNew.down(1).update(g_dataLvb[lvbIndex][AttrEnum.BN]);
			
			link = lvbNew.down('a');
			if (this.checkMode(3)) {
				link.observe('click', editClick);
				link.show();
			}
			link = link.next(0);
			link.observe('click', delClick);
			
			list.insert({
				bottom: lvbNew
			});
			setDate(lvbNew, true);
			
			if (this.checkMode(3)) {
				var dest = lvbNew.down(1);
				var rep = new Element('div').addClassName('cur_pointer').update(dest.innerHTML);
				rep.observe('click', this.nameClick);
				dest.update(rep);
				dest.addClassName('divlink');
			}
			
			return lvbNew.key;
		}
	},
	
	/**
	 * 插入一个记录(用户-职位/角色).
	 * @param {Object} objLva 一级元素.
	 * @param {int} lvbIndex 二级数据索引.
	 * @param {bool} moveEnd 是否移至最后.
	 * @return {int} 关系数据索引或-1.
	 */
	_insertOne24: function(objLva, lvbIndex, moveEnd) {
		with (this) {
			lvbIndex = lvbIndex != null ? lvbIndex : 0;
			var list = $(IDS.iList + objLva.key);
			var objNew, lvbNew, link;
			var exists = list.childElements();
			var rltList = g_dataLvb[lvbIndex].rlt;
			
			// 检查是否已添加过此记录
			for (var i = 0, len = exists.length; i < len; i++) {
			
				// 已存在且无效则重置状态并显示
				if (g_dataRlt[exists[i].key].kb == lvbIndex) {
					objNew = $(IDS.iRlt + exists[i].key);
					if (g_dataRlt[exists[i].key][AttrEnum.RG] == DbFlagEnum.D) {
					
						// 原项删除又添加后的状态
						if (this.checkMode(4)) {
							$(IDS.iRlt + rltList[i]).down(0).removeClassName(CssEnum.AddBg).addClassName(CssEnum.EditBg);
							g_dataRlt[exists[i].key][AttrEnum.RG] = DbFlagEnum.U;
						} else {
							g_dataRlt[exists[i].key][AttrEnum.RG] = DbFlagEnum.N;
						}
						
					} else if (g_dataRlt[exists[i].key][AttrEnum.RG] == DbFlagEnum.X) {
						g_dataRlt[exists[i].key][AttrEnum.RG] = DbFlagEnum.I;
						$(IDS.iRlt + exists[i].key).down(0).addClassName(CssEnum.AddBg);
					} else {
					
						// 已存在且有效
						return -1;
					}
					if (moveEnd) {
						list.insert({
							bottom: objNew
						});
						if (this.checkMode(4)) setDate(objNew);
					}
					objNew.show();
					return exists[i].key;
				}
			}
			
			// 未添加过则新建
			objNew = Object.clone(g_dataRlt[0]);
			objNew[AttrEnum.RP] = g_dataLvb[lvbIndex][AttrEnum.BI];
			objNew[AttrEnum.RU] = g_dataLva[objLva.key][AttrEnum.AI];
			objNew[AttrEnum.RG] = DbFlagEnum.I;
			objNew.ka = objLva.key;
			objNew.kb = lvbIndex;
			g_dataRlt[g_dataRlt.length] = objNew;
			
			lvbNew = g_lvbTmpl.clone(true);
			lvbNew.key = g_dataRlt.length - 1;
			lvbNew.id = IDS.iRlt + lvbNew.key;
			lvbNew.down(0).addClassName(CssEnum.AddBg);
			lvbNew.down(1).update(g_dataLvb[lvbIndex][AttrEnum.BN]);
			
			link = lvbNew.down('a');
			if (this.checkMode(4)) {
				link.observe('click', editClick);
				link.show();
			}
			link = link.next(0);
			link.observe('click', delClick);
			
			list.insert({
				bottom: lvbNew
			});
			setDate(lvbNew, true);
			return lvbNew.key;
		}
	},
	
	/**
	 * 重新设置日期.
	 * @param {Object} element 二级元素.
	 * @param {bool} reset 是否重置日期.
	 */
	_setDate: function(element, reset) {
		with (this) {
			if (this.checkMode(12)) {
				return;
			}
			var link = $(element).select('input');
			var now = new Date();
			link[0].value = reset ? now.getFullYear() + '-' + (now.getMonth() + 1).formatl(2, '0') + '-' + now.getDate().formatl(2, '0') : g_dataRlt[element.key][AttrEnum.RS];
			link[1].value = reset ? '9999-12-31' : g_dataRlt[element.key][AttrEnum.RE];
			$(link[0]).readOnly = true;
			$(link[1]).readOnly = true;
			g_dataRlt[element.key][AttrEnum.RS] = link[0].value;
			g_dataRlt[element.key][AttrEnum.RE] = link[1].value;
			link[0].removeClassName(CssEnum.FontEdit).addClassName(CssEnum.FontNormal);
			link[1].removeClassName(CssEnum.FontEdit).addClassName(CssEnum.FontNormal);
		}
	},
	
	/**
	 * 更改部门.
	 * @param {Event} event 点击事件.
	 */
	_changeLvb: function(event) {
		with (this) {
		
			// 禁用功能
			if ($(IDS.BtnDept)) $(IDS.BtnDept).disable();
			if ($(IDS.SltDept)) $(IDS.SltDept).disable();
			
			// 延迟执行，让解释器刷新页面元素状态
			nullFunc.defer();
			
			g_button = Event.element(event);
			
			this.getNewLvb();
		}
	},
	
	/**
	 * 应用更改.
	 */
	_applyChange: function() {
		with (this) {
			g_deptindex = $F($(IDS.SltDept));
			var title = g_deptindex < 0 ? MsgEnum.AllDept : g_dataDept[g_deptindex][AttrEnum.DN];
			
			// 更新标题文字
			$(IDS.SrcTitle).update(StringEnum.Title.format(title));
			if ($(IDS.SrcTitle + '2')) $(IDS.SrcTitle + '2').update(title);
			
			if (this.checkMode(13)) {
			
				// 更改部门时
				for (var i = 0, len1 = g_dataUser.length; i < len1; i++) {
					if (g_deptindex < 0 || g_dataDept[g_deptindex][AttrEnum.DI] == g_dataUser[i][AttrEnum.UD]) {
						if (checkVisible(i)) {
							$(IDS.iLvb + i).show();
						} else {
							$(IDS.iLvb + i).hide();
						}
						if (g_button.id == IDS.BtnDept) {
							for (var j = 0, len2 = g_dataUser[i].rlt.length; j < len2; j++) {
							
								// 处于可显示状态时
								if (g_dataRlt[g_dataUser[i].rlt[j]][AttrEnum.RG] >= DbFlagEnum.N) {
									$(IDS.iRlt + g_dataUser[i].rlt[j]).show();
								}
							}
						}
					} else {
						$(IDS.iLvb + i).hide();
						if (g_button.id == IDS.BtnDept) {
							for (var j = 0, len2 = g_dataUser[i].rlt.length; j < len2; j++) {
								$(IDS.iRlt + g_dataUser[i].rlt[j]).hide();
							}
						}
					}
				}
			} else {
				// 更改部门时
				for (var i = 0, len1 = g_dataUser.length; i < len1; i++) {
					if (checkVisible(i)) {
						$(IDS.iLva + i).show();
					} else {
						$(IDS.iLva + i).hide();
					}
				}
			}
			
			// 全部取消选中
			$(IDS.SrcAll).checked = false;
			srcClickAll();
			
			// 刷新全部计数
			refreshCount(-1);
			
			// 启用功能
			if ($(IDS.BtnDept)) $(IDS.BtnDept).enable();
			if ($(IDS.SltDept)) $(IDS.SltDept).enable();
		}
	},
	
	/**
	 * 检查是否应该显示.
	 * @param {int} lvbIndex 二级数据索引.
	 * @return {bool} 是否应该显示.
	 */
	_checkVisible: function(lvbIndex) {
		with (this) {
			lvbIndex = lvbIndex != null ? lvbIndex : 0;
			return g_dataUser[lvbIndex].visible;
		}
	},
	
	/**
	 * 获取新的人员列表并处理.
	 */
	_getNewLvb: function(event) {
		with (this) {
			var param = ActionEnum.SelectParam;
			var needRequest = false;
			var pos, dept;
			
			// 输入校验
			if (!this.validate()) {
				return;
			}
			
			dept = $F($(IDS.SltDept));
			if (dept >= 0) {
				param = addParam(param, this.AttrEnum.SD, g_dataDept[dept][AttrEnum.DI]);
			}
			if ($(IDS.Year) && !$F($(IDS.Year)).empty()) {
				param = addParam(param, this.AttrEnum.SY, $F($(IDS.Year)));
				needRequest = true;
			}
			if ($(IDS.Name) && !$F($(IDS.Name)).empty()) {
				param = addParam(param, this.AttrEnum.SN, $F($(IDS.Name)));
				needRequest = true;
			}
			pos = $(IDS.SltPos) ? $F($(IDS.SltPos)) : -1;
			if (this.checkMode(1) && pos >= 0) {
				param = addParam(param, this.AttrEnum.SP, g_dataPr[pos][AttrEnum.PI]);
			}
			
			if (needRequest || !g_frontSelect) {
				param = addStamp(param);
				new Ajax.Request(ActionEnum.SelectAction, {
					method: 'get',
					parameters: param,
					onSuccess: getNewLvbBack,
					onFailure: function() {
						MsgBox.error('获取失败： ' + ActionEnum.SelectAction);
					}
				});
			} else {
				for (var i = 0, len1 = g_dataUser.length; i < len1; i++) {
					g_dataUser[i].visible = false;
					if (pos < 0) {
						if (dept < 0) {
							g_dataUser[i].visible = true;
						} else {
							if (g_dataUser[i][AttrEnum.UD] == g_dataDept[dept][AttrEnum.DI]) {
								g_dataUser[i].visible = true;
							}
						}
					} else {
						for (var j = 0, len2 = g_dataUser[i].rlt.length; j < len2; j++) {
							if (g_dataRlt[g_dataUser[i].rlt[j]][AttrEnum.RP] == g_dataPr[pos][AttrEnum.PI]) {
								if (dept < 0) {
									g_dataUser[i].visible = true;
								} else {
									if (g_dataUser[i][AttrEnum.UD] == g_dataDept[dept][AttrEnum.DI]) {
										g_dataUser[i].visible = true;
									}
								}
							}
						}
					}
				}
				applyChange();
			}
		}
	},
	
	/**
	 * 处理查询后的列表.
	 * @param {Object} request 服务器响应数据.
	 */
	_getNewLvbBack: function(request) {
		with (this) {
			var nJson = request.responseText;
			var nLvb;
			if (!nJson.isJSON()) {
				MsgBox.error('返回结果不是JSON');
				return;
			}
			nLvb = nJson.evalJSON();
			nLvb = nLvb[Object.keys(nLvb)[0]];
			for (var i = 0, len = g_dataUser.length; i < len; i++) {
				g_dataUser[i].visible = false;
			}
			for (var i = 0, len = nLvb.length; i < len; i++) {
				g_dataUser[g_usrid2index[nLvb[i][AttrEnum.UI]]].visible = true;
			}
			this.applyChange();
		}
	},
	
	/**
	 * 页面提交.
	 */
	_submitAll: function() {
		with (this) {
			var result = [];
			var rltData;
			var param = ActionEnum.DestParam;
			for (var i = 0, len = g_dataRlt.length; i < len; i++) {
				if (g_dataRlt[i][AttrEnum.RG] != DbFlagEnum.N && g_dataRlt[i][AttrEnum.RG] != DbFlagEnum.X) {
					rltData = new Object();
					rltData[AttrEnum.RU] = g_dataRlt[i][AttrEnum.RU];
					rltData[AttrEnum.RP] = g_dataRlt[i][AttrEnum.RP];
					rltData[AttrEnum.RG] = g_dataRlt[i][AttrEnum.RG];
					rltData[AttrEnum.RC] = g_dataRlt[i][AttrEnum.RC];
					if (Object.isArray(AttrEnum.RK)) {
						AttrEnum.RK.each(function(item) {
							rltData[item] = g_dataRlt[i][item] || '1';
						})
					} else {
						rltData[AttrEnum.RK] = g_dataRlt[i][AttrEnum.RK] || '1';
					}
					if (this.checkMode(34)) {
						rltData[AttrEnum.RS] = g_dataRlt[i][AttrEnum.RS];
						rltData[AttrEnum.RE] = g_dataRlt[i][AttrEnum.RE];
					}
					result.push(rltData);
				}
			}
			if (result.length == 0) {
				return;
			}
			param = addParam(param, this.AttrEnum.TJ, result.toJSON());
			
			// 调试信息
			if (this.g_debug) {
				MsgBox.message(result.toJSON());
			}
			new Ajax.Request(ActionEnum.DestAction, {
				method: 'post',
				parameters: param,
				onSuccess: function() {
					MsgBox.error('提交成功');
					location.reload();
				},
				onFailure: function() {
					MsgBox.error('提交失败： ' + ActionEnum.DestAction);
				}
			});
		}
	},
	
	/**
	 * 页面重置.
	 */
	_restoreAll: function() {
		with (this) {
			location.reload();
		}
	},
	
	/**
	 * 开始拖动.
	 */
	_startDrag: function(event) {
		with (this) {
			if ($(IDS.DragList).count > 0) {
				if (Element.findKey(Event.element(event)) != null) {
					g_status = StatusEnum.Drag;
				}
			}
		}
	},
	
	/**
	 * 鼠标移动.
	 * @param {Event} event 鼠标事件.
	 */
	_moving: function(event) {
		with (this) {
			if (g_status != StatusEnum.None) {
				var drag = $(IDS.DragList);
				var element = Event.element(event);
				drag.show();
				
				// 更改位置
				drag.setStyle({
					'left': (event.clientX + DragEnum.offsetX) + 'px',
					'top': (event.clientY + DragEnum.offsetY) + 'px'
				});
				
				// 从鼠标触发元素找到有效元素上
				element = Element.findKey(element);
				if (element != null && element.id != null && element.id.startsWith(IDS.iRlt)) {
					element = Element.findKey(element);
				}
				
				// 如果是一级元素
				if (element && element.id && element.id.startsWith(IDS.iLva)) {
					g_status = StatusEnum.Arrive;
					if (g_lvaNow == null || g_lvaNow.id != element.id) {
						if (g_lvaNow != null) {
							g_lvaNow.down(0).removeClassName(CssEnum.LineBgH).addClassName(CssEnum.LineBg);
						}
						g_lvaNow = element;
						g_lvaNow.down(0).removeClassName(CssEnum.LineBg).addClassName(CssEnum.LineBgH);
					}
				} else {
					g_status = StatusEnum.Drag;
					if (g_lvaNow != null) {
						g_lvaNow.down(0).removeClassName(CssEnum.LineBgH).addClassName(CssEnum.LineBg);
						g_lvaNow = null;
					}
				}
			}
		}
	},
	
	/**
	 * 结束拖动.
	 */
	_endDrag: function() {
		with (this) {
			$(IDS.DragList).hide();
			g_status = StatusEnum.None;
			if (g_lvaNow != null) {
				doInsert(g_lvaNow);
				g_lvaNow.down(0).removeClassName(CssEnum.LineBgH).addClassName(CssEnum.LineBg);
				g_lvaNow = null;
			}
		}
	},
	
	/**
	 * 添加图标事件.
	 */
	_iconAdd: function() {
		if (this.openDialog(0) == 1) {
			location.reload();
		}
	},
	
	/**
	 * 查看图标事件.
	 * @param {Object} bar 工具条.
	 */
	_iconView: function(bar) {
		this.openDialog(2, bar.key);
	},
	
	/**
	 * 编辑图标事件.
	 * @param {Object} bar 工具条.
	 */
	_iconEdit: function(bar) {
		if (this.openDialog(1, bar.key) == 1) {
			location.reload();
		}
	},
	
	/**
	 * 打开模式对话框.
	 * @param {String} action 目标action.
	 * @param {int} mode 模式参数.
	 * @param {int} index 数据索引.
	 * @return {String} 对话框返回值.
	 */
	_openDialog: function(action, mode, index) {
		var param;
		var style;
		
		param = this.checkMode(34) ? addParam(param, 'modeFlg', mode) : '';
		if (index != null) {
			param = addParam(param, 'roleId', this.g_dataPr[index][this.AttrEnum.PI]);
		}
		param = addStamp(param);
		if (this.g_debug) {
			MsgBox.error(action + '?' + param);
		}
		style = this.checkMode(34) ? 'dialogWidth=' + this.DialogSize.width34 + '; dialogHeight=' + this.DialogSize.height34 : 'dialogWidth=' + this.DialogSize.width12 + '; dialogHeight=' + this.DialogSize.height12
		return showModalDialog(action + '?' + param, '', style);
	},
	
	/**
	 * 点击名称事件.
	 * @param {Event} event 事件对象.
	 */
	_nameClick: function(event) {
		Event.stop(event);
		var key = Element.findKey(Event.element(event)).key;
		var action = this.checkMode(1) ? this.ActionEnum.DialogAction : 'getUserPermInfoAction.action';
		var id, param, style;
		if (this.checkMode(3)) {
			id = this.g_dataUser[this.g_dataRlt[key].kb][this.AttrEnum.UI];
		} else if (this.checkMode(4)) {
			id = this.g_dataUser[key][this.AttrEnum.UI];
		} else {
			id = this.g_dataPr[key][this.AttrEnum.PI];
		}
		param = addParam(null, this.checkMode(1) ? 'posInfoId' : 'userId', id);
		param = addStamp(param);
		style = this.checkMode(1) ? 'dialogWidth=' + this.DialogSize.width12 + '; dialogHeight=' + this.DialogSize.height12 : 'dialogWidth=' + this.DialogSize.width34 + '; dialogHeight=' + this.DialogSize.height34
		if (this.g_debug) {
			MsgBox.error(action + '?' + param);
		}
		if (showModalDialog(action + '?' + param, '', style) == 1) {
			location.reload();
		}
	},
	
	/**
	 * 是否进行了更改.
	 * @return {bool} 是否更改.
	 */
	_isChanged: function() {
		if ($(this.IDS.LogList) && Element.visibleChilds($(this.IDS.LogList)).length > 0) {
			return true;
		}
		return false;
	},
	
	/**
	 * 当前模式检查.
	 * @param {String} stat 模式字符串.
	 * @return {bool} 是否匹配.
	 */
	_checkMode: function(stat) {
		var cs = $A(stat + '');
		for (var i = 0, len = cs.length; i < len; i++) {
			if (this.g_mode == cs[i]) return true;
		}
		return false;
	},
	
	/**
	 * 生成页面元素.
	 * @param {String} divId 容器div的id.
	 */
	_createElement: function(divId) {
		var dest = $(divId);
		
		dest.addClassName('prepend-1 span-23 last mus');
		
		this.createTop(dest);
	},
	
	/**
	 * 插入搜索部分.
	 * @param {Object} dest 目标元素.
	 */
	_createTop13: function(dest) {
		with (this) {
			dest.insert({
				bottom: new Element('div').addClassName('span-23 last').insert({
					top: new Element('select', {
						'id': IDS.SltDept,
						'class': 'w_150'
					}).insert({
						top: new Element('option', {
							'value': -1
						}).update(MsgEnum.AllDept)
					}),
					bottom: new Element('input', {
						'type': 'button',
						'id': IDS.BtnDept,
						'class': 'btn span-2 margin_left_10'
					}).observe('click', changeLvb)
				})
			});
			this.createIconAll(dest);
		}
	},
	
	/**
	 * 插入搜索部分.
	 * @param {Object} dest 目标元素.
	 */
	_createTop24: function(dest) {
		with (this) {
			dest.insert({
				bottom: new Element('div').addClassName('span-23 last').insert({
					bottom: new Element('div').addClassName('float_l margin_right_10').insert({
						bottom: new Element('label').update(MsgEnum.Dept)
					})
				}).insert({
					bottom: new Element('div').addClassName('span-4').insert({
						bottom: new Element('select', {
							'id': IDS.SltDept,
							'class': 'w_150'
						}).insert({
							top: new Element('option', {
								'value': -1
							}).update(MsgEnum.AllDept)
						})
					})
				}).insert({
					bottom: new Element('div').addClassName('float_l margin_right_10').insert({
						bottom: new Element('label').update(MsgEnum.Year)
					})
				}).insert({
					bottom: new Element('div').addClassName('span-1').insert({
						bottom: new Element('input', {
							'type': 'text',
							'id': IDS.Year,
							'class': 'span-1',
							'maxlength': '4'
						})
					})
				}).insert({
					bottom: new Element('div').addClassName('float_l margin_right_10').insert({
						bottom: new Element('label').update(MsgEnum.Name)
					})
				}).insert({
					bottom: new Element('div').addClassName('span-2').insert({
						bottom: new Element('input', {
							'type': 'text',
							'id': IDS.Name,
							'class': 'span-2'
						})
					})
				}).insert({
					bottom: new Element('input', {
						'type': 'button',
						'id': IDS.BtnDept,
						'class': 'btn span-2 margin_left_6'
					}).observe('click', changeLvb)
				})
			});
			this.createIconAll(dest);
		}
	},
	
	/**
	 * 插入全展开图标.
	 * @param {Object} dest 目标元素.
	 */
	_createIconAll: function(dest) {
		with (this) {
			dest.insert({
				bottom: new Element('div').addClassName('span-23 last').insert({
					top: new Element('a', {
						'href': '#this'
					}).observe('click', iconClickAll).insert({
						top: new Element('div', {
							'id': IDS.IcoAll,
							'class': 'img_opt float_l'
						}),
						bottom: new Element('div', {
							'id': IDS.TxtAll,
							'class': 'float_l'
						})
					})
				})
			});
			this.createGrid(dest);
		}
	},
	
	/**
	 * 插入一览表.
	 * @param {Object} dest 目标元素.
	 */
	_createGrid12: function(dest) {
		with (this) {
			dest.insert({
				bottom: new Element('div').addClassName('span-12').insert({
					top: new Element('div').addClassName('span-12 box_border').insert({
						bottom: new Element('div').addClassName('span-12 font_weight_b last text_center box_border_b').addClassName(CssEnum.TitleBg).insert({
							bottom: new Element('div').addClassName('span-6').insert({
								top: this.checkMode(1) ? MsgEnum.Pos : MsgEnum.Name,
								bottom: this.checkMode(1) ? new Element('div', {
									'class': 'img_opt opt_Add position_rel cur_pointer',
									'title': '新建'
								}).setStyle({
									top: '2px',
									left: '222px'
								}).observe('click', this.iconAdd) : null
							})
						}).insert({
							bottom: new Element('div').addClassName('span-4 box_border_l').update(this.checkMode(1) ? MsgEnum.Name : MsgEnum.Pos)
						}).insert({
							bottom: new Element('div').addClassName('span-1 text_right box_border_l').update(MsgEnum.Operate)
						})
					}).insert({
						bottom: new Element('div', {
							'id': IDS.Grid,
							'class': 'span-12 last overflow_scr_y h_382'
						})
					}),
					bottom: new Element('hr').addClassName('space')
				}).insert({
					bottom: this.createLog()
				})
			});
			this.createList(dest);
		}
	},
	
	/**
	 * 插入一览表.
	 * @param {Object} dest 目标元素.
	 */
	_createGrid34: function(dest) {
		with (this) {
			dest.insert({
				bottom: new Element('div').addClassName('span-12').insert({
					top: new Element('div').addClassName('span-12 box_border inputTp').insert({
						bottom: new Element('div').addClassName('span-12 font_weight_b last text_center box_border_b').addClassName(CssEnum.TitleBg).insert({
							bottom: new Element('div').addClassName(this.checkMode(3) ? 'span-3' : 'span-2').insert({
								bottom: this.checkMode(3) ? MsgEnum.Role : MsgEnum.Name,
								top: this.checkMode(3) ? new Element('div', {
									'class': 'img_opt opt_Add position_rel cur_pointer',
									'title': '新建'
								}).setStyle({
									top: '2px',
									left: '102px'
								}).observe('click', this.iconAdd) : null
							})
						}).insert({
							bottom: new Element('div').addClassName(this.checkMode(3) ? 'span-2' : 'span-3').addClassName('box_border_l').update(this.checkMode(3) ? MsgEnum.Name : MsgEnum.Role)
						}).insert({
							bottom: new Element('div').addClassName('span-4 last box_border_l').update(MsgEnum.Date)
						}).insert({
							bottom: new Element('div').addClassName('span-2 text_center box_border_l').update(MsgEnum.Operate)
						})
					}).insert({
						bottom: new Element('div', {
							'id': IDS.Grid,
							'class': 'span-12 last overflow_scr_y h_382'
						})
					}),
					bottom: new Element('hr').addClassName('space')
				}).insert({
					bottom: this.createLog()
				})
			});
			this.createList(dest);
		}
	},
	
	/**
	 * 创建操作记录表格.
	 * @param {Object} dest 目标元素.
	 * @return {Object} 操作记录表格.
	 */
	_createLog: function(dest) {
		with (this) {
			return new Element('div').addClassName('span-12').insert({
				top: new Element('label').addClassName('font_weight_b').update(MsgEnum.Reault),
				bottom: new Element('div').addClassName('span-12 last box_border overflow_hd').insert({
					top: new Element('div').addClassName('span-12 last').insert({
						bottom: new Element('table').addClassName('datagrid2').update(new Element('tbody').update(new Element('tr').insert({
							bottom: new Element('th').addClassName('percent_14').update(MsgEnum.Name)
						}).insert({
							bottom: new Element('th').addClassName('percent_40').update(MsgEnum.Before)
						}).insert({
							bottom: new Element('th').update(MsgEnum.After)
						}).insert({
							bottom: new Element('th').addClassName('percent_12').update(MsgEnum.Operate)
						})))
					}),
					bottom: new Element('div').addClassName('span-12 overflow_scr_y').insert({
						top: new Element('div').addClassName('span-12 last').insert({
							top: new Element('table').addClassName('datagrid2').insert({
								top: new Element('tbody', {
									'id': IDS.LogList
								})
							})
						})
					}).setStyle({
						height: '92px'
					})
				})
			});
		}
	},
	
	/**
	 * 插入右侧列表.
	 * @param {Object} dest 目标元素.
	 */
	_createList13: function(dest) {
		with (this) {
			dest.insert({
				bottom: new Element('div').addClassName('prepend-1 span-8 last').insert({
					bottom: new Element('div').addClassName('span-7 box_border last').insert({
						bottom: new Element('div').addClassName('padding_right_4 padding_left_4').addClassName(CssEnum.TitleBg).insert({
							top: new Element('div').addClassName('span-5').insert({
								top: new Element('span', {
									'id': IDS.SrcTitle,
									'class': 'padding_left_4 font_weight_b'
								})
							})
						}).insert({
							bottom: new Element('div').addClassName('float_r').insert({
								top: new Element('input', {
									'type': 'checkbox',
									'id': IDS.SrcAll
								}).observe('click', srcClickAll)
							}).insert({
								bottom: new Element('label').addClassName('font_weight_n').update(MsgEnum.All)
							})
						}).insert({
							bottom: new Element('div').addClassName('clear_both')
						})
					}).insert({
						bottom: new Element('div').addClassName('box_border_t padding_top_10 float_l').insert({
							bottom: new Element('div').addClassName('span-7 last').insert({
								top: new Element('div').addClassName('span-2 text_right').insert({
									top: new Element('label').update(this.checkMode(3) ? MsgEnum.Dept : MsgEnum.Pos)
								}),
								bottom: new Element('div').addClassName('span-5 last').insert({
									top: this.checkMode(3) ? new Element('label', {
										'id': IDS.SrcTitle + '2'
									}).update(MsgEnum.AllDept) : new Element('select', {
										'id': IDS.SltPos,
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
										'id': IDS.Year,
										'class': 'span-1',
										'maxlength': '4'
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
										'id': IDS.Name,
										'class': 'span-2'
									})
								})
							})
						}).insert({
							bottom: new Element('div').addClassName('span-7 last text_right margin_bottom_4').insert({
								bottom: new Element('div').addClassName('span-4').update(MsgEnum.Space)
							}).insert({
								bottom: new Element('div').addClassName('text_left').insert({
									bottom: new Element('input', {
										'type': 'button',
										'value': MsgEnum.Select,
										'class': 'btn span-2'
									}).observe('click', changeLvb)
								})
							})
						}).insert({
							bottom: new Element('div', {
								'class': 'span-7 box_border_t overflow_scr_y margin_top_4 h_457 last'
							}).insert({
								top: new Element('div', {
									'id': IDS.SrcList,
									'class': 'margin_left_10 padding_left_10 padding_top_10 float_l'
								}),
								bottom: new Element('hr').addClassName('space')
							})
						})
					})
				})
			});
			this.createSubmit(dest);
		}
	},
	
	/**
	 * 插入右侧列表.
	 * @param {Object} dest 目标元素.
	 */
	_createList24: function(dest) {
		with (this) {
			dest.insert({
				bottom: new Element('div').addClassName('prepend-1 span-8 last').insert({
					bottom: new Element('div').addClassName('span-7 box_border last').insert({
						bottom: new Element('div').addClassName('padding_right_4 padding_left_4').addClassName(CssEnum.TitleBg).insert({
							top: new Element('div').addClassName('span-4').insert({
								top: new Element('div', {
									'id': IDS.SrcTitle,
									'class': 'float_l padding_left_4 font_weight_b'
								}),
								bottom: new Element('div', {
									'class': 'img_opt opt_Add position_rel cur_pointer',
									'title': '新建'
								}).setStyle({
									top: '3px',
									left: '3px'
								}).observe('click', this.iconAdd)
							})
						}).insert({
							bottom: new Element('div').addClassName('float_r').insert({
								top: new Element('input', {
									'type': 'checkbox',
									'id': IDS.SrcAll
								}).observe('click', srcClickAll)
							}).insert({
								bottom: new Element('label').addClassName('font_weight_n').update(MsgEnum.All)
							})
						}).insert({
							bottom: new Element('div').addClassName('clear_both')
						})
					}).insert({
						bottom: new Element('div', {
							'class': 'span-7 box_border_t overflow_scr_y h_542 last'
						}).insert({
							top: new Element('div', {
								'id': IDS.SrcList,
								'class': 'margin_left_10 padding_left_20 padding_top_10 float_l'
							}),
							bottom: new Element('hr').addClassName('space')
						})
					})
				})
			});
			this.createSubmit(dest);
		}
	},
	
	/**
	 * 插入提交和取消按钮.
	 * @param {Object} dest 目标元素.
	 */
	_createSubmit: function(dest) {
		with (this) {
			dest.insert({
				bottom: new Element('div').addClassName('span-12 text_right margin_top_4').insert({
					bottom: new Element('input', {
						'type': 'button',
						'value': MsgEnum.Submit,
						'class': 'btn span-2'
					}).observe('click', submitAll)
				}).insert({
					bottom: MsgEnum.Space
				}).insert({
					bottom: new Element('input', {
						'type': 'button',
						'value': MsgEnum.Cancel,
						'class': 'btn span-2'
					}).observe('click', restoreAll)
				})
			});
			dest.insert({
				bottom: new Element('hr').addClassName('space')
			});
			this.createDrag();
		}
	},
	
	/**
	 * 插入拖动层.
	 * @param {Object} dest 目标元素.
	 */
	_createDrag: function(dest) {
		with (this) {
			nElement = new Element('div', {
				'id': IDS.DragList,
				'class': 'position_fix'
			}).addClassName(CssEnum.DragBd).addClassName(CssEnum.DragBg);
			nElement.count = 0;
			nElement.setOpacity(0.8);
			nElement.hide();
			$(document.body).insert({
				bottom: nElement
			});
			this.createBar();
		}
	},
	
	/**
	 * 创建一览标题模版.
	 */
	_createLvaTmp12: function() {
		with (this) {
			g_lvaTmpl = new Element('div');
			g_lvaTmpl.key = -1;
			g_lvaTmpl.insert({
				bottom: new Element('div').addClassName('prepend-6 span-6 box_border_b last').hide()
			}).insert({
				top: new Element('div').addClassName('span-12 box_border_b last').addClassName(CssEnum.LineBg).insert({
					bottom: new Element('div').addClassName('span-9 padding_right_1').insert({
						top: new Element('div', {
							'class': 'span-4 cur_default'
						}).insert({
							top: new Element('a', {
								'href': '#this',
								'title': MsgEnum.Show,
								'class': 'img_opt'
							}).addClassName(CssEnum.IconHide)
						}).insert({
							bottom: new Element('div')
						})
					})
				}).insert({
					bottom: new Element('div').addClassName('span-2 text_right  last').update(MsgEnum.Loading)
				})
			});
		}
	},
	
	/**
	 * 创建一览标题模版.
	 */
	_createLvaTmp34: function() {
		with (this) {
			g_lvaTmpl = new Element('div');
			g_lvaTmpl.key = -1;
			g_lvaTmpl.insert({
				bottom: new Element('div').addClassName(this.checkMode(3) ? 'prepend-3' : 'prepend-2').addClassName('span-10 box_border_b last').hide()
			}).insert({
				top: new Element('div').addClassName('span-12 box_border_b last').addClassName(CssEnum.LineBg).insert({
					bottom: new Element('div').addClassName('span-9 padding_right_1').insert({
						top: new Element('div', {
							'class': 'span-3 cur_default'
						}).insert({
							top: new Element('a', {
								'href': '#this',
								'title': MsgEnum.Show,
								'class': 'img_opt'
							}).addClassName(CssEnum.IconHide)
						}).insert({
							bottom: new Element('div')
						})
					})
				}).insert({
					bottom: new Element('div').addClassName('span-2 text_right  last').update(MsgEnum.Loading)
				})
			});
		}
	},
	
	/**
	 * 创建一览内容模版.
	 */
	_createRltTmp12: function() {
		with (this) {
			g_lvbTmpl = new Element('div');
			g_lvbTmpl.key = -1;
			g_lvbTmpl.insert({
				top: new Element('div').addClassName('span-6 box_border_t last margin_top_p1').insert({
					top: new Element('div').addClassName('span-4 text_center box_border_l padding_left_4 padding_right_6 last')
				}).insert({
					bottom: new Element('div').addClassName('span-1 box_border_l last').insert({
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
		}
	},
	
	/**
	 * 创建一览内容模版.
	 */
	_createRltTmp34: function() {
		with (this) {
			g_lvbTmpl = new Element('div');
			g_lvbTmpl.key = -1;
			g_lvbTmpl.insert({
				top: new Element('div').addClassName(this.checkMode(3) ? 'span-9' : 'span-10').addClassName('box_border_t last margin_top_p1').insert({
					top: new Element('div').addClassName('box_border_l text_center padding_left_4 padding_right_6 ellipsis last').addClassName(this.checkMode(3) ? 'span-2' : 'span-3'),
					bottom: new Element('div').addClassName('span-4 box_border_l text_center last').insert({
						top: new Element('div').addClassName('w_65 float_l padding_top_4 margin_top_p1').insert({
							top: new Element('input', {
								'type': 'text',
								'class': 'w_65 text_right color_bl',
								'readonly': 'true'
							})
						}),
						bottom: new Element('div').addClassName('float_l').insert({
							top: new Element('label').addClassName('margin_left_2 margin_right_2').update('～')
						})
					}).insert({
						bottom: new Element('div').addClassName('w_65 float_l padding_top_4 margin_top_p1').insert({
							top: new Element('input', {
								'type': 'text',
								'class': 'w_65 text_right color_bl',
								'readonly': 'true'
							})
						})
					})
				}).insert({
					bottom: new Element('div').addClassName('span-2 box_border_l text_right last').insert({
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
		}
	},
	
	/**
	 * 创建右侧列表模版.
	 */
	_createSrcTmp13: function() {
		with (this) {
			g_srcTmpl = new Element('div').addClassName('margin_left_10 float_l bd_1sfff margin_top_6 w_90 last');
			g_srcTmpl.addClassName(CssEnum.UnCheckedBd).addClassName(CssEnum.UnCheckedBg);
			g_srcTmpl.key = -1;
			g_srcTmpl.insert({
				top: new Element('div').addClassName('padding_left_4 bd_1sfff').insert({
					top: new Element('input', {
						'type': 'checkbox'
					}),
					bottom: new Element('label').addClassName('span-2 font_weight_n')
				})
			});
		}
	},
	
	/**
	 * 创建右侧列表模版.
	 */
	_createSrcTmp24: function() {
		with (this) {
			g_srcTmpl = new Element('div').addClassName('margin_left_10 float_l bd_1sfff margin_top_6 w_190 last');
			g_srcTmpl.addClassName(CssEnum.UnCheckedBd).addClassName(CssEnum.UnCheckedBg);
			g_srcTmpl.key = -1;
			g_srcTmpl.insert({
				top: new Element('div').addClassName('padding_left_4 bd_1sfff').insert({
					top: new Element('input', {
						'type': 'checkbox'
					}),
					bottom: new Element('label').addClassName('span-2 font_weight_n')
				})
			});
		}
	},
	
	/**
	 * 创建操作记录模版.
	 */
	_createLogTmp: function() {
		with (this) {
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
		}
	},
	
	/**
	 * 创建拖动内容模版.
	 */
	_createDragTmp: function() {
		with (this) {
			g_dragTmpl = new Element('div').addClassName('margin_bottom_p1 padding_right_10 bd_b_1sdeepskyblue padding_left_8');
			g_dragTmpl.key = -1;
			g_dragTmpl.insert({
				bottom: new Element('label')
			});
		}
	},
	
	/**
	 * 创建浮动工具条.
	 */
	_createBar: function() {
		with (this) {
			var link;
			var bar = new Element('div').addClassName('position_abs');
			bar.id = this.IDS.Bar;
			Element.insert(document.body, {
				bottom: bar
			});
			bar.hide();
			link = new Element('div', {
				'title': '查看',
				'class': 'img_opt opt_Zoom cur_pointer'
			});
			link.observe('click', this.iconView.curry(bar));
			bar.insert({
				top: link
			});
			if (this.checkMode(34)) {
				link = new Element('div', {
					'title': '编辑',
					'class': 'img_opt opt_Edit cur_pointer'
				});
				link.observe('click', this.iconEdit.curry(bar));
				bar.insert({
					bottom: link
				});
			}
		}
	},
	
	/**
	 * 数据校验.
	 * @return {bool} 校验结果.
	 */
	_validate: function() {
	
		// 入社年输入校验
		if (!this._yearValidate(this.IDS.Year)) {
			return false;
		}
		
		// 姓名输入校验
		if (!this._nameValidate(this.IDS.Name)) {
			return false;
		}
		return true;
	},
	
	/**
	 * 入社年校验.
	 * @param {String} inputId 输入框Id.
	 * @return {bool} 校验结果.
	 */
	_yearValidate: function(inputId) {
	
		// 校验状态标记
		var continueValidation = true;
		var value = $(inputId).value.strip();
		
		// 输入长度校验		
		if (continueValidation && !value.empty()) {
			if (value.length != 4) {
				MsgBox.error(getMessage('js.com.warning.0003', '入社年', '4'))
				continueValidation = false;
			}
		}
		
		// 输入合法化校验
		if (continueValidation && !value.empty() && !value.match('[0-9]{4}')) {
			MsgBox.error(getMessage('js.com.warning.0002', '入社年'));
			continueValidation = false;
		}
		
		if (continueValidation) {
			return true;
		} else {
			$(inputId).focus();
			return false;
		}
	},
	
	/**
	 * 姓名校验.
	 * @param {String} inputId 输入框Id.
	 * @return {bool} 校验结果.
	 */
	_nameValidate: function(inputId) {
	
		// 校验状态标记
		var continueValidation = true;
		var value = $(inputId).value.strip();
		
		// 输入长度校验
		if (continueValidation && !value.empty()) {
			if (value.length > 20) {
				MsgBox.error(getMessage('js.com.warning.0003', '姓名', '20'))
				continueValidation = false;
			}
		}
		
		if (continueValidation) {
			return true;
		} else {
			$(inputId).focus();
			return false;
		}
	}
};

/**
 * 取得排序方法.
 * @param {String} attr 属性名.
 * @param {bool} asc 升序/降序.
 * @return {Function} 排序方法.
 */
function sortMethod(attr, asc) {
	if (asc) {
		return _sortByAsc.bind(null, attr);
	} else {
		return _sortByDesc.bind(null, attr);
	}
}

/**
 * 按指定属性升序排序.
 * @param {String} attr 属性名.
 * @param {Object} a 对象1.
 * @param {Object} b 对象2.
 * @return {int} 排序结果.
 */
function _sortByAsc(attr, a, b) {
	return a[attr] > b[attr] ? 1 : -1;
}

/**
 * 按指定属性降序排序.
 * @param {String} attr 属性名.
 * @param {Object} a 对象1.
 * @param {Object} b 对象2.
 * @return {int} 排序结果.
 */
function _sortByDesc(attr, a, b) {
	return a[attr] > b[attr] ? -1 : 1;
}

/**
 * 以http参数格式添加字符串.
 * @param {String} str 原字符串.
 * @param {String} key 名称.
 * @param {String} value 值.
 * @return {String} 添加后的字符串.
 */
function addParam(str, key, value) {
	if (str == null) str = '';
	if (str.empty() || str.endsWith('&')) {
		return str + key + '=' + encodeURIComponent(value);
	} else {
		return str + '&' + key + '=' + encodeURIComponent(value);
	}
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
 * 共用浮动工具条.
 */
FloatBar = Class.create();
FloatBar.prototype = {

	/**
	 * 初始化.
	 * @param {Object} element 工具条元素.
	 */
	initialize: function(element) {
		this.bar = element;
		this.listener = new Array();
		this.bar.status = 0;
		this.bar.hide();
		this.bar.removeClassName('none');
		this.bind = this._bind.bind(this);
		this._over = this.__over.bindAsEventListener(this);
		this._out = this.__out.bindAsEventListener(this);
		this.bar.observe('mouseover', this._barover.bindAsEventListener(this));
		this.bar.observe('mouseout', this._barout.bindAsEventListener(this));
	},
	
	/**
	 * 新增绑定对象.
	 * @param {Object} element 目标元素.
	 * @param {Object} top top偏移.
	 * @param {Object} left left偏移.
	 */
	_bind: function(element, top, left) {
		if (element.bindded == 1) return;
		element.bindded = 1;
		element.barTop = top;
		element.barLeft = left;
		this.listener.push(element);
		element.observe('mouseover', this._over);
		element.observe('mouseout', this._out);
	},
	
	/**
	 * 鼠标移上事件.
	 * @param {Event} event 事件对象.
	 */
	__over: function(event) {
		var elements = Event.element(event).ancestors();
		var element;
		elements.each(function(item) {
			if (item.barKey != null) element = item;
		});
		if (element == null) return;
		var offset = element.positionedOffset();
		this.bar.setStyle({
			top: (offset[1] + element.barTop) + 'px',
			left: (offset[0] + element.barLeft) + 'px'
		});
		
		this.bar.key = element.barKey;
		this.bar.show();
		Event.stop(event);
	},
	
	/**
	 * 鼠标移出事件.
	 * @param {Event} event 事件对象.
	 */
	__out: function(event) {
		var element = Event.element(event);
		if (this.bar.status == 0) {
			this.bar.hide();
		}
		Event.stop(event);
	},
	
	/**
	 * 工具条鼠标移上事件.
	 * @param {Event} event 事件对象.
	 */
	_barover: function(event) {
		Event.stop(event);
		this.bar.show();
		this.bar.status = 1;
	},
	
	/**
	 * 工具条鼠标移出事件.
	 * @param {Event} event 事件对象.
	 */
	_barout: function(event) {
		Event.stop(event);
		this.bar.status = 0;
		this.bar.hide();
	}
};
