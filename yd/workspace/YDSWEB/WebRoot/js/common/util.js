/*
 * @(#)util.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */
/**
 * @fileoverview 共通JavaScript.
 *
 * @author
 * @version 1.0
 */
var debug = true;
onerror = errorHandle;

window['ie6'] = (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.indexOf('MSIE 6') != -1);
window['ieVersion'] = (-[1, ] ? 99 : [/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1]);

/**
 * 错误处理.
 * @param {Object} msg 信息.
 * @param {Object} url 地址.
 * @param {Object} line 行号.
 */
function errorHandle(msg, url, line){
    if (debug) {
        var txt;
        txt = '错误: ' + msg + '<br/>';
        txt += '地址: ' + url + '<br/>';
        txt += '行号: ' + line + '<br/>';
        MsgBox.error(txt, '设置debug=false来阻止本信息');
        return true;
    }
    else {
        return false;
    }
}

/**
 * 检查是否存在异常.
 * @param {Request} request.
 * @return {bool} true:存在异常;false:不存在异常.
 */
function checkException(request){
    var result = request.responseText;
    
    var r = /<html>/ig;
    if (r.test(result)) {
    
        /*		//取得异常页面title
         var re = /<title>[\s\S]*<\/title>/;
         var title = re.exec(result);
         var title = title + '';
         title = title.replace(/<title>/, "");
         title = title.replace(/<\/title>/, "");
         document.title = title;
         
         //取得异常页面 中的style
         var re2 = /<style>[\s\S]*<\/style>/;
         var css = re2.exec(result);
         var css = css + '';
         css = css.replace(/<style>/, "");
         css = css.replace(/<\/style>/, "");
         
         //附加取得的style到本页面
         var styleNode = document.createElement('style');
         styleNode.type = 'text/css';
         if (styleNode.styleSheet) {
         styleNode.styleSheet.cssText = css;
         } else {
         css = document.createTextNode(css);
         styleNode.appendChild(css);
         }
         var headNode = document.getElementsByTagName('head')[0];
         headNode.appendChild(styleNode);
         */
        //取得异常页面js脚本
        var reg = /<script[\s\S]*>[\s\S]*<\/script>/ig;
        var script = reg.exec(result);
        script = script + '';
        script = script.replace(/<script type="text\/javascript">/ig, "");
        script = script.replace(/<\/script>/ig, "");
        
        //取得异常页面body内的html
        //result = '<head>'+result.replace(/[\s\S]*<head>/ig, "");
        //result = result.replace(/<\/body>[\s\S]*/ig, "")+'</body>';
        
        //置换整个页面
        document.open();
        document.write(result);
        document.close();
        
        //执行异常页面的脚本
        eval(script);
        
        /*
         if (window.stop) {
         window.stop();
         } else {
         document.execCommand('stop');
         }
         */
        return true;
    }
    return false;
}

document.observe('dom:loaded', function(){
    if (window['utilCheck']) {
        MsgBox.message('重复引用了util.js！');
        return;
    }
    else {
        window['utilCheck'] = 1;
    }
    
    // 阻止焦点移动到窗口外
    Event.observe(document.body, 'keydown', function(event){
        if (event.keyCode != 9) 
            return;
        var e = Event.element(event);
        window['focusElement'] = e;
        check.delay(0.05);
    });
    
    //ie6 开启css图片缓存
    if (ie6) {
        document.execCommand('BackgroundImageCache', false, true);
    }

	document.onkeydown = hookRefresh;
});


function hookRefresh(event){
	event = event||getEvent();
    with (event) {
        if (keyCode == 116 || (ctrlKey && keyCode == 82)) {
			if (window.top.location.href.endsWith('index.jsp')) {
				event.cancelBubble = true;
				event.preventDefault();
				event.returnValue = false;
				var smp = addStamp();
				var realWnd = window.top.frames[1].frames[0];
				var newUrl = realWnd.location.href;
				
				if(newUrl.include('stamp=')){
					newUrl = newUrl.replace(/stamp=\d+/g, smp);
				}else{
					if(newUrl.include('?')){
						newUrl += '&';
					}else{
						newUrl += '?';
					}
					newUrl += smp;
				}
				
				realWnd.location=newUrl; 
				return false;
			}
        }
    }
}

/**
 * 焦点控制.
 */
function check(){
    var e = document.activeElement;
    if (Element.hasClassName(e, 'hideFocus')) {
        window['focusElement'].focus();
        return;
    }
    if (isIe()) {
        if (e.tagName.toUpperCase() == 'BODY') {
            window['focusElement'].focus();
        }
    }
    else {
        if (e.tagName.toUpperCase() == 'HTML' || Element.inspect(e) == Element.inspect(window['focusElement'])) {
            window['focusElement'].focus();
        }
    }
}

/**
 * 以post方式发送数据到对应的url.
 * @param {string} url 要post的url，url的长度不应超过2k字节.
 * @param {Hash} params 要发送的参数(键值对)，不能含有文件.
 */
function post(url, params){
    var tempForm = document.createElement("form");
    tempForm.action = url;
    tempForm.method = "post";
    tempForm.style.display = "none";
    for (var x in params) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = params[x];
        
        tempForm.appendChild(opt);
    }
    document.body.appendChild(tempForm);
    tempForm.submit();
    return tempForm;
}

/**
 * 列表隔行变色.
 * @param {Object} table 表格或表格Id.
 * @param {int} maxHeight 最大高度，超过则出现滚动条.
 */
function listColor(table, maxHeight){
    $(table).removeClassName('none');
    var row = $(table).select('tr');
    var cssName;
    var fix = 0;
    for (var i = 0, len = row.length; i < len; i++) {
        if (!row[i].visible() || row[i].hasClassName('none')) {
            fix++;
        }
        else {
            cssName = (i + fix) % 2 == 1 ? 'odd' : 'even';
            row[i].removeClassName('slt');
            if (!row[i].hasClassName(cssName)) {
                row[i].removeClassName('odd').removeClassName('even');
                row[i].addClassName(cssName);
            }
        }
    }
    if (maxHeight == null) 
        return;
    var odiv = $(table).up(1);
    autoScroll(odiv, maxHeight);
    
}

/**
 * 在高度达到指定值时出现滚动条.
 * @param {Object} odiv 外层Div对象或Id.
 * @param {int} maxHeight 最大高度，超过则出现滚动条.
 */
function autoScroll(odiv, maxHeight){
    if ($(odiv).down(0).getHeight() > maxHeight) {
        $(odiv).addClassName('overflow_scr_y');
        $(odiv).setStyle({
            height: maxHeight + 'px'
        });
    }
    else {
        $(odiv).removeClassName('overflow_scr_y');
        $(odiv).setStyle({
            height: ''
        });
    }
}

/**
 * 选中行变色.
 * @param {String} tableId 表格ID.
 */
function selectLine(tableId){
    if (!event) {
        var event = getEvent();
    }
    
    //获得当前行号
    var rowIndex = Event.element(event).up('tr', 0).rowIndex;
    
    //当前行变色
    $(tableId).rows[rowIndex].addClassName('slt');
}

/**
 * 取得event对象.
 * @return {Event} event对象.
 */
function getEvent(){
    if (window.event) 
        return window.event;
    func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0 && (arg0.constructor == MouseEvent || arg0.constructor == KeyboardEvent || arg0.constructor == Event)) {
            return arg0;
        }
        func = func.caller;
    }
    return null;
}

/**
 * 将页面中的所有按钮加上样式.
 */
function regBtnFunc(){
    var buttons = $$('input[type="button"]', 'input[type="submit"]', 'input[type="reset"]');
    for (var i = 0, len = buttons.length; i < len; i++) {
        if (!buttons[i].hasClassName('btn')) 
            buttons[i].addClassName('btn');
    }
}

/**
 * 向参数字符串中添加token参数.
 * @param {String} para 参数字符串.
 * @param {String} token token的name，可选.
 * @return {String} 已添加token的参数字符串.
 */
function addToken(para, token){
    var ret, tokenName;
    
    // 未指定token名则使用默认名
    if (token == null || token.empty()) {
        token = 'struts.token.name';
    }
    
    // token不存在返回原参数串
    if ($N(token) == null) {
        return para;
    }
    // 获取参数值元素的名称
    tokenName = $N(token).value;
    
    // 传进的参数如果为空
    if (para == null || para.empty()) {
    
        // 增加参数：token名称
        ret = token + '=' + tokenName;
        
        // 增加参数：token值
        ret = ret + '&' + tokenName + '=' + $N(tokenName).value;
    }
    else {
        ret = para + '&' + token + '=' + tokenName;
        ret = ret + '&' + tokenName + '=' + $N(tokenName).value;
    }
    return ret;
}

/**
 * 向参数字符串中添加时间戳.
 * @param {String} para 参数字符串.
 * @return {String} 已添加时间戳的参数字符串.
 */
function addStamp(para){
    var ret;
    if (para == null || para.empty()) {
        ret = 'stamp=' + new Date().getTime();
    }
    else {
        ret = para + '&stamp=' + new Date().getTime();
    }
    return ret;
}

/**
 * 对getElementByName的扩展.
 * @param {String} name 元素的name.
 * @return 找到的第一个元素或null.
 */
function $N(name){
    var elements;
    
    // 获取元素
    elements = document.getElementsByName(name);
    
    // 未找到返回空
    if (elements.length == 0) {
        return;
    }
    else {
    
        // 用prototype扩展元素
        Element.extend(elements[0]);
        
        // 返回第一个元素
        return elements[0];
    }
}

/**
 * 对getElementByName的扩展.
 * @param {String} name 元素的name.
 * @return 返回找到的元素数组或null.
 */
function $NN(name){
    var elements;
    
    // 获取元素
    elements = document.getElementsByName(name);
    
    // 未找到返回空
    if (elements.length == 0) {
        return;
    }
    else {
    
        // 用prototype扩展
        Element.extend(elements);
        
        return elements;
    }
}


/**
 * 开始时间与结束时间输入校验.
 * @param1 {String} 开始时间.
 * @param2 {String} 结束时间.
 * @param3 {String} 出错message id(非必需).
 * @return Boolean true:false.
 */
function compareTime(){

    var arg0 = arguments[0];
    var arg1 = arguments[1];
    var msgid = 'js.com.warning.0006';
    if (arguments.length > 2) {
        msgid = arguments[2];
    }
    var d1 = new Date(arg0.value.replace(/\-/g, "\/"));
    var d2 = new Date(arg1.value.replace(/\-/g, "\/"));
    if (d1 > d2) {
    
        addFieldError(arg0, getMessage(msgid));
        addFieldError(arg1, getMessage(msgid));
        return false;
    }
    return true;
}


/**
 * 用第i个参数替换字符串中的｛i-1｝.
 * @return {String} 替换后的字符串.
 */
String.prototype.format = function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};

/**
 * 拖拽类.
 */
var SimpleDrag = Class.create();
SimpleDrag.prototype = {

    /**
     * 构造方法.
     * @param {Object} param 参数对象.
     */
    initialize: function(param){
    
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
            position: 'absolute'
        });
        this.handle.style.cursor = 'move';
        this.handle.observe('mousedown', this.Start);
        
        // 回调设置
        this.beforedrag = param.beforedrag ||
        function(){
            return true;
        };
        this.afterdrag = param.afterdrag ||
        function(){
            return true;
        };
        this.dragging = param.dragging ||
        function(){
        };
    },
    
    /**
     * 开始拖动.
     * @param {Object} oEvent 事件对象.
     */
    _start: function(oEvent){
    
        // 检查回调
        if (!this.beforedrag()) 
            return;
        
        // 设置起始偏移
        this._left = oEvent.clientX - this.drag.offsetLeft;
        this._top = oEvent.clientY - this.drag.offsetTop;
        this.btop = this.drag.getStyle('top');
        this.bleft = this.drag.getStyle('left');
        
        // 绑定事件
        Event.observe(document, 'mousemove', this.MouseMove);
        Event.observe(document, 'mouseup', this.StopDrag);
        if (document.body.setCapture) 
            this.drag.setCapture();
        
        // 禁止选中
        document.body.onselectstart = function(){
            return false;
        }
        Element.addClassName(document.body, 'mus');
    },
    
    /**
     * 移动，设定位置坐标.
     * @param {Object} oEvent 事件对象.
     */
    _mouseMove: function(oEvent){
        var l, t, pos;
        l = oEvent.clientX - this._left;
        t = oEvent.clientY - this._top;
        
        pos = this.drag.getDimensions();
        
        // 检查坐标范围
        if (l < 0) 
            l = 0;
        if (t < 0) 
            t = 0;
        if (t > document.documentElement.scrollHeight - pos.height) 
            t = document.documentElement.scrollHeight - pos.height;
        if (l > document.documentElement.scrollWidth - pos.width) 
            l = document.documentElement.scrollWidth - pos.width;
        this.drag.setStyle({
            left: l + 'px',
            top: t + 'px'
        });
        this.dragging();
        
    },
    
    /**
     * 停止拖动.
     */
    _stopDrag: function(upFunc, moveFunc){
    
        // 取消事件绑定
        Event.stopObserving(document, 'mousemove', moveFunc);
        Event.stopObserving(document, 'mouseup', upFunc);
        if (document.body.releaseCapture) 
            this.drag.releaseCapture();
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

/**
 * 弹出类.
 */
var PopupBox = Class.create();
PopupBox.prototype = {

    /**
     * 构造方法.
     * @param {Object} param 参数对象.
     */
    initialize: function(param){
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
            Element.insert(document.body, {
                bottom: this.createCover()
            });
            Element.insert(document.body, {
                bottom: this.createLoader()
            });
        }
        PopupBox.cover = $(this.IDS.COVER);
        PopupBox.loader = $(this.IDS.LOADER);
        
        this.position = param.position ? param.position : 1;
        
        if (debug && this.position > 30 && (param.key + ' ').indexOf('msgbox') != 0) {
            MsgBox.error.delay(2, '<b>position</b> 属性超过 <b>30</b> 可能会导致显示顺序错误。<br/>' + '参数:<br/>　' + Object.toJSON(param), '弹出层警告');
        }
        
        Element.insert(document.body, {
            bottom: this.box
        });
        
        if (param.loader) {
            this.loader = true;
        }
        
        // 方法绑定
        this.Popup = this._popup.bind(this, this.key);
        this.popup = this._popup.bind(this, this.key);
        this.Close = this._close.bind(this, this.key);
        this.close = this._close.bind(this, this.key);
        this.loaded = this._loaded.bind(this, this.key);
        this.check = this._check.bind(this, this.key);
        $(param.content).popup = this.popup;
        $(param.content).close = this.close;
        $(param.content).loaded = this.loaded;
        
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
        
        this.box.status = 0;
    },
    
    _loaded: function(key){
        PopupBox.loader.hide();
        $(this.IDS.BOX + key).show();
        var top, left;
        var frm = $(this.IDS.BODY + key).down('iframe');
        
        // 处理内嵌页面的情况
        if (frm && !$(this.IDS.BODY + key).down('input')) {
            var bd = frm.contentDocument || frm.contentWindow.document;
            var fe = Element.down(bd.body, 0);
            frm.setStyle({
                height: Element.getHeight(fe) + 'px',
                width: Element.getWidth(fe) + 'px'
            });
        }
        
        // 指定位置
        if ($(this.IDS.BOX + key)._top) {
            top = $(this.IDS.BOX + key)._top;
            left = $(this.IDS.BOX + key)._left;
            
            // 默认位置居中
        }
        else {
            left = (document.documentElement.clientWidth - $(this.IDS.BOX + key).getWidth()) / 2;
            top = (document.documentElement.clientHeight - $(this.IDS.BOX + key).getHeight()) / 2;
            top = top < 0 ? 0 : top;
        }
        
        $(this.IDS.BOX + key).setStyle({
            top: top + document.documentElement.scrollTop + 'px',
            left: left + 'px'
        });
        var a = function(){
            $(this.IDS.BOX + key).setStyle({
                top: top + document.documentElement.scrollTop + 'px',
                left: left + 'px'
            });
        }
.bind(this).delay(0.2);
        $(this.IDS.BODY + key).status = 2;
    },
    /**
     * 弹出方法.
     * @param {String} key 唯一标识
     * @param {int} top 上面距离.
     * @param {int} left 左面距离.
     * @param {bool} nocover 不带遮罩.
     */
    _popup: function(key, top, left, nocover){
        if ($(this.IDS.BOX + key).visible()) {
            return;
        }
        
        // ie6隐藏select
        if (!PopupBox.cover.visible()) 
            Element.addClassName(document.body, 'hideSelect');
        
        // zIndex栈初始化
        if (PopupBox.zstack == null) {
            PopupBox.zstack = new Array();
        }
        // 储存当前zIndex
        PopupBox.zstack.push(PopupBox.cover.getStyle('z-index'));
        
        // 设置新zIndex
        PopupBox.cover.setStyle({
            zIndex: this.position * 3 - 2
        });
        if (!nocover) {
            PopupBox.cover.show();
        }
        
        this.box.setStyle({
            position: 'absolute',
            zIndex: this.position * 3
        });
        
        // 指定位置
        if (top && left) {
            $(this.IDS.BOX + key)._top = top;
            $(this.IDS.BOX + key)._left = left;
        }
        else {
            $(this.IDS.BOX + key)._top = null;
            $(this.IDS.BOX + key)._left = null;
        }
        
        if (this.loader) {
            // 设置新zIndex
            PopupBox.loader.setStyle({
                zIndex: this.position * 3 - 1
            });
            $(PopupBox.loader).setStyle({
                top: (document.documentElement.clientHeight - PopupBox.loader.getHeight()) / 2 + (window['ie6'] ? document.documentElement.scrollTop : 0) + 'px',
                left: (document.documentElement.clientWidth - PopupBox.loader.getWidth()) / 2 + 'px'
            });
            $(PopupBox.loader).show();
            $(this.IDS.BODY + key).status = 1;
            
            var frm = $(this.IDS.BODY + key).down('iframe');
            if (frm) {
                Event.observe(frm, 'load', this.check);
            }
        }
        else {
            $(this.IDS.BOX + key).show();
            $(PopupBox.loader).hide();
            // 指定位置
            if (top && left) {
                $(this.IDS.BOX + key).setStyle({
                    top: top + document.documentElement.scrollTop + 'px',
                    left: left + 'px'
                });
                
                // 默认位置居中
            }
            else {
                left = (document.documentElement.clientWidth - $(this.IDS.BOX + key).getWidth()) / 2;
                top = (document.documentElement.clientHeight - $(this.IDS.BOX + key).getHeight()) / 2;
                top = top < 0 ? 50 : top;
                $(this.IDS.BOX + key).setStyle({
                    top: top + document.documentElement.scrollTop + 'px',
                    left: left + 'px'
                });
            }
            $(this.IDS.BODY + key).status = 2;
        }
    },
    /**
     * 超时检测.
     * @param {Object} key 弹出层标识.
     */
    _check: function(key){
        this.__check.delay(2, $(this.IDS.BODY + key), this.loaded, $(this.IDS.CLOSE + key));
    },
    __check: function(box, loadFunc, closeLink){
        if ($(box).status == 1) {
            MsgBox.error('加载超时！');
            loadFunc();
            closeLink.show();
        }
    },
    /**
     * 关闭弹出层.
     * @param {String} key 弹出层标识.
     * @param {int} callback 执行回调(0:无，1:关闭前，2:关闭后，3:全部).
     */
    _close: function(key, callback){
        if (!Object.isNumber(callback)) 
            callback = 3;
        
        // 关闭前回调
        if (callback % 2 == 1 && this.beforeclose && !this.beforeclose()) 
            return;
        $(this.IDS.BOX + key).hide();
        
        var lastZindex = PopupBox.zstack.pop();
        // 弹出遮罩层zIndex
        PopupBox.cover.setStyle({
            zIndex: lastZindex
        });
        if (PopupBox.zstack.length == 0) {
            PopupBox.cover.hide();
        }
        $(this.IDS.BODY + key).status = 0;
        // 关闭后回调
        if (callback > 1 && this.afterclose) 
            this.afterclose();
        
        document.body.focus();
        
        if (!PopupBox.cover.visible()) 
            Element.removeClassName(document.body, 'hideSelect');
    },
    
    /**
     * 创建弹出层.
     * @param {String} key 唯一标识.
     * @param {String} icon 图标CSS.
     * @param {Object} title 标题(元素).
     * @param {Object} content 内容.
     */
    createBox: function(key, icon, title, content){
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
                                    'href': '#this',
                                    'title': '关闭'
                                })
                            })
                        })
                    }).insert({
                        bottom: new Element('th').addClassName(this.CssEnum.BG_T_R)
                    })
                }).insert({
                    bottom: new Element('tr').insert({
                        bottom: new Element('td').addClassName(this.CssEnum.BG_M_L).insert({
                            top: new Element('div', {
                                'tabindex': '0',
                                'class': 'hideFocus'
                            }).observe('keydown', this.lockFocus)
                        })
                    }).insert({
                        bottom: new Element('td', {
                            'id': this.IDS.BODY + key,
                            'class': this.CssEnum.BODY
                        }).setStyle({
                            'padding': '3px'
                        }).insert({
                            top: $(content)
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
     * 锁定焦点.
     */
    lockFocus: function(event){
        if (event.keyCode != 9) 
            return;
        var e = Event.element(event);
        if (e.hasClassName('focus_start') && event.shiftKey) {
            Event.stop(event);
            e.up().next(1).down().focus();
            return;
        }
        if (e.hasClassName('focus_end') && !event.shiftKey) {
            Event.stop(event);
            e.up().previous(1).down().focus();
        }
    },
    
    /**
     * 创建遮罩层.
     */
    createCover: function(){
        return '<div id="' + this.IDS.COVER + '" class="cover" style="display:none;"></div>';
    },
    
    /**
     * 创建加载动画层.
     */
    createLoader: function(){
        return '<div id="' + this.IDS.LOADER + '" style="width:200px;height:55px;position:fixed;_position:absolute;_top:expression(documentElement.scrollTop + \'px\');display:none;background:#eee;padding-top:10px;"><div class="loading"><div>页面加载中，请稍候...</div></div></div>';
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
        COVER: 'popcover',
        LOADER: 'poploader'
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
        BODY: 'bgclr_fff',
        TOP: '',
        BOX: 'bar',
        CLOSE: 'close'
    },
    cover: null,
    zstack: null
}

/**
 * 消息对话框.
 */
var MsgBox = new Object({

    /**
     * 基层方法.
     * @param {Object} type 类型.
     * @param {Object} title 标题.
     * @param {Object} content 内容.
     * @param {Object} onOk 确定事件.
     * @param {Object} onCancel 取消事件.
     * @param {Object} btnOk 确定按钮文字.
     * @param {Object} btnCancel 取消按钮文字.
     * @return {Object} 弹出层对象.
     */
    base: function(type, title, content, onOk, onCancel, btnOk, btnCancel){
        var i = 0;
        while (MsgBox[type + i + 'Box'] && MsgBox[type + i + 'Box'].status == 1) {
            i++;
        }
        if (!MsgBox[type + i + 'Box']) {
            var popBody = new Element('div', {
                'id': type + i + 'Body',
                'class': 'float_l'
            }).insert({
                top: new Element('div').addClassName('float_l clear_both').insert({
                    top: new Element('div').addClassName('margin_right_10 margin_top_2 margin_left_2').addClassName('msg_' + type),
                    bottom: new Element('div', {
                        'id': type + i + 'Content'
                    }).setStyle({
                        marginBottom: '6px',
                        cssFloat: 'left',
                        marginRight: '6px'
                    })
                }),
                bottom: new Element('div').addClassName('clear_both text_right').insert({
                    bottom: new Element('a', {
                        'id': type + i + 'Ok'
                    }).addClassName('imgBtn1 float_r').update(btnOk).observe('click', function(){
                        MsgBox[type + i + 'Box'].Close(1);
                    }),
                    top: type != 'confirm' ? null : new Element('a', {
                        'id': type + i + 'Cancel'
                    }).addClassName('imgBtn2 margin_left_6 float_r').update(btnCancel).observe('click', function(){
                        MsgBox[type + i + 'Box'].Close(2);
                    })
                })
            });
            MsgBox[type + i + 'Box'] = new PopupBox({
                key: 'msgbox' + type + i,
                title: new Element('div', {
                    'id': type + i + 'Title'
                }),
                icon: '',
                content: popBody,
                position: 100 + MsgBox.msgConst.TopIndex,
                drag: true,
                noclose: true
            });
        }
        else {
            MsgBox[type + i + 'Box'].position = 50 + MsgBox.msgConst.TopIndex;
        }
        $(type + i + 'Content').setStyle({
            lineHeight: '48px',
            marginTop: '0px'
        });
        if (!title) {
            title = MsgBox.msgConst[type];
        }
        $(type + i + 'Title').update(title);
        $(type + i + 'Content').update(content);
        if (onOk) {
            MsgBox[type + i + 'Box'].beforeclose = function(){
                Element.removeClassName(document.body, 'hideSelectForce');
                onOk();
                return true;
            };
        }
        else {
            MsgBox[type + i + 'Box'].beforeclose = nullFunc;
        }
        if (onCancel) {
            MsgBox[type + i + 'Box'].afterclose = function(){
                onCancel();
                Element.removeClassName(document.body, 'hideSelectForce');
                if ($('popcover') && $('popcover').visible()) 
                    Element.addClassName(document.body, 'hideSelect');
            };
        }
        else {
            MsgBox[type + i + 'Box'].afterclose = function(){
                Element.removeClassName(document.body, 'hideSelectForce');
                if ($('popcover') && $('popcover').visible()) 
                    Element.addClassName(document.body, 'hideSelect');
            };
        }
        MsgBox[type + i + 'Box'].Popup();
        Element.addClassName(document.body, 'hideSelectForce');
        Element.removeClassName(document.body, 'hideSelect');
        if ($(type + i + 'Content').getHeight() > 50) {
            $(type + i + 'Content').setStyle({
                lineHeight: '18px',
                marginTop: '6px'
            });
        }
        MsgBox.msgConst.TopIndex++;
        return MsgBox[type + i + 'Box'];
    },
    
    /**
     * 信息对话框.
     * @param {Object} content 内容.
     * @param {Object} title 标题.
     * @param {Object} onclose 关闭事件.
     */
    message: function(content, title, onclose){
        return MsgBox.base('message', title, content, onclose, onclose, '确定');
    },
    
    /**
     * 错误对话框.
     * @param {Object} content 内容.
     * @param {Object} title 标题.
     * @param {Object} onclose 关闭事件.
     */
    error: function(content, title, onclose){
        return MsgBox.base('error', title, content, onclose, onclose, '确定');
    },
    
    /**
     * 确认对话框.
     * @param {Object} content 内容.
     * @param {Object} title 标题.
     * @param {Object} onOk 确定事件.
     * @param {Object} onCancel 取消事件.
     * @param {Object} btnOk 确定按钮文字.
     * @param {Object} btnCancel 取消按钮文字.
     */
    confirm: function(content, title, onOk, onCancel, btnOk, btnCancel){
        return MsgBox.base('confirm', title, content, onOk, onCancel, btnOk, btnCancel);
    },
    
    /**
     * 内部数据.
     */
    msgConst: {
        message: '提示',
        error: '错误',
        confirm: '确认',
        TopIndex: 0
    }
});

/**
 * 浮动工具栏事件绑定.
 * @param {Object} container 触发容器.
 * @param {Object} bar 浮动元素.
 * @param {Function} onshow 显示时事件.
 * @param {Function} onhide 隐藏时事件.
 */
function makeFloat(container, bar, onshow, onhide){
    container = $(container);
    bar = $(bar);
    bar.removeClassName('none').hide();
    bar.active = 0;
    container.observe('mouseover', function(){
        bar.show();
        if (bar.delay != null) {
            window.clearTimeout(bar.delay);
            bar.delay = null;
        }
        if (Object.isFunction(onshow)) 
            onshow(bar);
    });
    container.observe('mouseout', function(event){
        if (bar.active == 0) {
            if (bar.delay == null) {
                bar.delay = Element.hide.delay(0.05, bar);
            }
            if (Object.isFunction(onhide)) 
                onhide(bar);
        }
    });
    bar.observe('mouseover', function(){
        bar.active = 1;
        if (bar.delay != null) {
            window.clearTimeout(bar.delay);
            bar.delay = null;
        }
    });
    bar.observe('mouseout', function(event){
        bar.active = 0;
        if (bar.delay == null) {
            bar.delay = Element.hide.delay(0.05, bar);
        }
    });
}

(function(){
    /**
     * 注册联动下拉菜单.
     * @param {Array} selectIdArr 下拉菜单Id数组.
     * @param {Array} actionNameArr actionId数组.
     * @param {Function} beforeLoad 加载前回调.
     * @param {Function} afterLoad 加载后回调.
     */
    var registMultiSelect = function(selectIdArr, actionNameArr, beforeLoad, afterLoad){
        for (var i = 0, len = selectIdArr.size(); i < len; i++) {
            Event.observe($(selectIdArr[i]), 'change', _selectOnChange.curry(selectIdArr[i]));
            $(selectIdArr[i]).prevSelect = i == 0 ? null : selectIdArr[i - 1];
            $(selectIdArr[i]).nextSelect = i == len ? null : selectIdArr[i + 1];
            $(selectIdArr[i]).action = actionNameArr[i];
            $(selectIdArr[i]).defaultValue = $(selectIdArr[i]).readAttribute('defaultValue') || '__NONE__';
            $(selectIdArr[i]).beforeLoad = beforeLoad ? beforeLoad.curry(selectIdArr[i]) : nullFunc;
            $(selectIdArr[i]).afterLoad = afterLoad ? afterLoad.curry(selectIdArr[i]) : nullFunc;
        }
        _resetSelect(selectIdArr[0]);
        _loadSelectData(selectIdArr[0], true);
    },    /**
     * 下拉菜单改变事件.
     * @param {String} selfId 改变的下拉菜单Id.
     */
    _selectOnChange = function(selfId){
        if ($(selfId).nextSelect != null) {
            _loadSelectData.defer($(selfId).nextSelect);
        }
    },    /**
     * 加载下拉菜单数据.
     * @param {String} selectId 菜单Id.
     * @param {bool} init 是否初始化调用.
     */
    _loadSelectData = function(selectId, init){
        var param, prevId;
        
        $(selectId).beforeLoad();
        
        prevId = $(selectId).prevSelect;
        if (prevId != null) {
            param = $(prevId).name + '=' + encodeURIComponent($(prevId).value);
        }
        param = addStamp(param);
        
        new Ajax.Request($(selectId).action, {
            method: 'get',
            parameters: param,
            onComplete: function(request){
                var selectList = request.responseText.evalJSON();
                _resetSelect(selectId);
                _setSelectList(selectId, selectList, init);
                $(selectId).afterLoad.defer();
            }
        });
    },    /**
     * 设置下拉菜单值.
     * @param {Object} selectId 菜单Id.
     * @param {Object} selectList 数据.
     * @param {bool} init 是否初始化调用.
     */
    _setSelectList = function(selectId, selectList, init){
        var optionIdPre;
        
        for (var i = 0, len = selectList.length; i < len; i++) {
            optionIdPre = $(selectId).id + '_';
            if ($(optionIdPre + i) == null) {
                $(selectId).insert({
                    bottom: new Element('option', {
                        'id': optionIdPre + i
                    })
                });
            }
            $(optionIdPre + i).value = selectList[i][0];
            $(optionIdPre + i).update(selectList[i][1]);
            $(optionIdPre + i).show();
        }
        
        $(selectId).firstValue = selectList[0][0];
        if ($(selectId).defaultValue == '__NONE__') {
            $(selectId).defaultValue = $(selectId).firstValue;
        }
        
        $(selectId).value = init ? $(selectId).defaultValue : $(selectId).firstValue;
        
        if ($(selectId).nextSelect) {
            _loadSelectData($(selectId).nextSelect, init);
        }
    },    /**
     * 重置菜单到默认状态.
     * @param {Object} selectId 菜单Id.
     */
    _resetSelect = function(selectId){
        var selectElement = $(selectId);
        var options;
        while (selectElement != null) {
            options = selectElement.childElements();
            
            for (var i = 0, len = options.length; i < len; i++) {
                options[i].remove();
            }
            
            selectElement = $(selectElement.nextSelect);
        }
    };
    window.registMultiSelect = registMultiSelect;
})();

/**
 * 空方法，返回True.
 */
function nullFunc(){
    return true;
}

/**
 * 手动触发事件.
 * @param {Object} element 目标对象.
 * @param {Object} eventName 事件名称(不加on).
 */
function fireEvent(element, eventName){
    element = $(element);
    if (document.all) {
        element.fireEvent('on' + eventName);
    }
    else {
        var evt;
        if (eventName.startsWith('mouse')) {
            evt = document.createEvent('MouseEvents');
        }
        else 
            if (eventName.startsWith('UI')) {
                evt = document.createEvent('UIEvents');
            }
            else {
                evt = document.createEvent('HTMLEvents');
            }
        evt.initEvent(eventName, true, true);
        element.dispatchEvent(evt);
    }
}

/**
 * 将指定keep=1的元素序列化.
 * @param {Object} container 元素容器.
 */
function dataSerialize(container){
    var elements = $(container).select('[keep="1"]');
    var str = '';
    var value;
    var exp;
    for (var i = 0, len = elements.length; i < len; i++) {
    
        // input读取value属性
        if (elements[i].tagName.toLowerCase() == 'input') {
            value = elements[i].value;
            
            // 否则读取innerHTML
        }
        else {
            value = elements[i].innerHTML;
        }
        
        // 读取数据来源
        exp = elements[i].readAttribute('datasource');
        if (exp && !exp.empty()) {
            // 将me替换为元素
            exp = 'elements[i].' + exp.substr(3, exp.length - 3);
            value = eval(exp);
        }
        
        // 拼接字符串
        str = str + elements[i].id + '=' + encodeURIComponent(value);
        if (i + 1 < len) 
            str += '&';
    }
    return str;
}

/**
 * 得到窗体滚动条滚动Y轴距离
 */
function getWindowScrollTop(){
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    }
    else 
        if (document.body) {
            scrollTop = document.body.scrollTop;
        }
    return scrollTop;
}

/**
 * 得到窗体滚动条滚动X轴距离
 */
function getWindowScrollLeft(){
    var scrollLeft = 0;
    if (document.documentElement && document.documentElement.scrollLeft) {
        scrollLeft = document.documentElement.scrollLeft;
    }
    else 
        if (document.body) {
            scrollLeft = document.body.scrollLeft;
        }
    return scrollLeft;
}

/**
 * 创建提示层.
 * @param {String} id ID.
 * @param {bool} noico 无图标.
 */
function createTip(id, noico){
    if (!id) 
        id = 'tip';
    if (!$(id)) {
        Element.insert(document.body, {
            bottom: '<div id="' + id + '" class="float_l position_abs tip_box_err" style="z-index:999;">' + (ie6 ? ('<iframe id="' + id + '_mask" style="position:absolute;z-index:-1;filter:alpha(opacity=0)"></iframe>') : '') + '<table style="border-collapse: collapse;" class="t_auto"><tr><td rowspan="2" class="tip_tl"></td><td colspan="2" class="tip_tr"></td></tr><tr><td class="tip_c">' + (noico ? '' : '<div class="tipIcon"></div>') + '<div id="' + id + '_text" class="float_l"></div></td><td rowspan="2" class="tip_br"></td></tr><tr><td colspan="2" class="tip_bl"></td></tr></table></div>'
        });
    }
    $(id).hide();
}

/**
 * 绑定自定义提示信息.
 * @param {String} group 提示分组.
 * @param {Object} element 对象.
 * @param {Object} type 类型(0:focus,1:mouseover).
 * @param {Object} callBack 回调.
 */
function bindTipbox(group, element, type, callBack){
    var tipId = 'tip' + group;
    var tipTxtId = tipId + '_text';
    element = $(element);
    if (!element.bindTipbox) {
        if (!$(tipId)) {
            Element.insert(document.body, {
                bottom: '<div id="' + tipId + '" class="float_l position_abs bar" style="z-index:999;display:none;"><table class="t_auto" border="0" cellpadding="0" cellspacing="0"><tbody><tr><th class="bar_l"></th><th class="bar_c"><div class="float_l"><div>预览</div></div></th><th class="bar_r"></th></tr><tr><td class="line_l"></td><td style="padding: 3px;" class="bgclr_fff"><div class="float_l" id="' + tipTxtId + '"></div></td><td class="line_r"></td></tr><tr><td class="line_b_l"></td><td class="line_b_c"></td><td class="line_b_r"></td></tr></tbody></table></div>'
            });
        }
        
        element.bindTipbox = true;
        element.observe(type == 1 ? 'mouseover' : 'focus', function(event){
            var element = Event.element(event);
            if (type == 1 && element.tipdelay) {
                window.clearTimeout(element.tipdelay);
                element.tipdelay = null;
            }
            if (element.tipon) 
                return;
            element.tipdelay = function(){
                element.tipdelay = null;
                element.tipon = true;
                callBack(element, $(tipTxtId), 1);
                var offset = element.cumulativeOffset();
                var vLeft = offset.left + $(tipId).getWidth() > 950 ? (offset.left + element.getWidth() - $(tipId).getWidth() + 5) : (offset.left - 5);
                $(tipId).show();
                $(tipId).setStyle({
                    top: offset.top - $(tipId).getHeight() + 1 + 'px',
                    left: vLeft + 'px'
                });
            }
.delay(type == 1 ? 0.5 : 0);
        });
        element.observe(type == 1 ? 'mouseout' : 'blur', function(event){
            var element = Event.element(event);
            if (type == 1 && element.tipdelay) {
                window.clearTimeout(element.tipdelay);
                element.tipdelay = null;
            }
            if (!element.tipon) 
                return;
            element.tipdelay = function(){
                $(tipId).hide();
                element.tipdelay = null;
                element.tipon = false;
                //callBack(element, $(tipTxtId), 0);
            }
.delay(type == 1 ? 0.5 : 0);
        });
    }
}

/**
 * 序列化数组
 *
 * @param {} arr 待序列化的数组
 * @param {} holder 序列化后的数据提交到Action对应的list名
 * @return {String} ret 序列化后的字符串
 */
function serialize(arr, holder){

    var ret = '';
    
    if (arr && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            ret += (holder + '[' + i + ']=' + arr[i] + '&');
        }
        
        ret = ret.substring(0, ret.length - 1);
    }
    return ret;
}

/**
 * 把数组对象转化为action可接受之字符串
 *
 * @param {} arr 待序列化的数组
 * @param {} holder 序列化后的数据提交到Action对应的list名
 * @return {String} ret 序列化后的字符串
 */
function arrToBean(arr, holder){
    var ret = '';
    if (arr && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            for (var property in arr[i]) {
                ret += (holder + '[' + i + '].' + property + '=' + arr[i][property] + '&');
            }
        }
        ret = ret.substring(0, ret.length - 1);
    }
    return ret;
}


/**
 * 显示操作状态的消息提示
 * @param {Object} msg 消息内容
 */
function showOpTip(msg){
    if (!$('operateTip') || $('operateTip').value == '' && !Object.isString(msg)) 
        return;
    if (!$('opTipBox')) {
        Element.insert(document.body, {
            bottom: new Element('div', {
                'style': 'position:absolute;top:40%;left:45%;padding:5px 5px;',
                'id': 'opTipBox'
            }).addClassName('opTip')
        });
        Element.insert($('opTipBox'), {
            bottom: new Element('div', {
                'style': 'padding:0px 15px;',
                'id': 'opTipBoxIn'
            }).addClassName('opTipIn font_weight_b')
        });
        
    }
    if (!Object.isString(msg)) {
        $('opTipBoxIn').update($('operateTip').value).show();
        $('operateTip').value = '';
    }
    else {
        $('opTipBoxIn').update(msg).show();
    }
    $('opTipBox').show();
    window['opTipDelay'] = Element.hide.delay(3, 'opTipBox');
}

/**
 * 显示加载动画.
 */
function showLoader(){
    if ($('ttLoader')) {
        $('ttCover').show();
        $('ttLoader').show();
    }
    else {
        Element.insert(document.body, {
            bottom: '<div id="ttLoader" style="z-index:999;width:200px;height:55px;position:fixed;_position:absolute;_top:expression(documentElement.scrollTop + \'px\');background:#eee;padding-top:10px;"><div class="loading"><div>页面加载中，请稍候...</div></div></div>'
        });
        Element.insert(document.body, {
            bottom: '<div id="ttCover" class="cover"></div>'
        });
    }
    $('ttLoader').setStyle({
        left: (document.documentElement.clientWidth - 200) / 2 + 'px',
        top: (document.documentElement.clientHeight - 55) / 2 + 'px'
    });
    Element.addClassName(document.body, 'hideSelect');
}

/**
 * 隐藏加载动画.
 */
function hideLoader(){
    if ($('ttLoader')) {
        $('ttCover').hide();
        $('ttLoader').hide();
        Element.removeClassName(document.body, 'hideSelect');
    }
}

Event.observe(window, 'load', showOpTip);

/**
 * 增加Date对象格式化方法，按想要的日期格式格式化日期，例var nowDate = new Date()；
 *                                                   nowDate.pattern('yyyy-MM-dd')；   返回'2010-07-27'.
 */
Date.prototype.pattern = function(fmt){
    var o = {
        "M+": this.getMonth() + 1, //月份  
        "d+": this.getDate(), //日  
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时  
        "H+": this.getHours(), //小时  
        "m+": this.getMinutes(), //分  
        "s+": this.getSeconds(), //秒  
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度  
        "S": this.getMilliseconds() //毫秒  
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 浏览器是否为IE.
 * return {bool} true:是IE，false:不是IE.
 */
function isIe(){
    return Prototype.Browser.IE;
}

function setCookie(name, value){
    var today = new Date();
    var expires = new Date();
    expires.setTime(today.getTime() + 1000 * 60 * 60 * 24 * 365);
    document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString();
}

function getCookie(Name){
    var search = Name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) 
                end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
        else 
            return "";
    }
}

/**
 * 获取字符串左侧指定长度的部分(中文按2计算).
 * @param {String} str 原字符串.
 * @param {int} len 长度.
 * @return {String} 截取后的字符串.
 */
function StrLeft(str, len){
    var count = 0;
    var strTmp, over;
    over = false;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 256) {
            count += 2;
        }
        else {
            count++;
        }
        if (!over && count > (len - 3)) {
            strTmp = str.substring(0, i) + '....';
            over = true;
        }
        if (!over && count == (len - 3)) {
            strTmp = str.substring(0, i + 1) + '...';
            over = true;
        }
        if (count > len) 
            return strTmp;
    }
    return str;
}


/**
 * 转化货币函数（四舍五入保留两位小数）.
 * @param  {String} number 输入金额.
 * @return {String} 转换后函数.
 */
function convertMoney(number){
    number = number + "";
    number = number.replace(/\,/g, "");
    if (number.blank()) 
        return '0.00';
    number = parseFloat(number);
    if (isNaN(number) || number == "") 
        return number;
    number = Math.round(number * 100) / 100;
    if (number < 0) 
        return '-' + outputDollars(Math.floor(Math.abs(number) - 0) + '') + outputCents(Math.abs(number) - 0);
    else 
        return outputDollars(Math.floor(number - 0) + '') + outputCents(number - 0);
}

function outputDollars(number){
    if (number.length <= 3) 
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0)) 
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else 
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}

function outputCents(amount){
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}
