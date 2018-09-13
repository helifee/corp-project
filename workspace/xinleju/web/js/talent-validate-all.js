ar tt = {};
tt.Util = {};
tt.f={};

tt.i18Req = "{0}为必输项";
tt.i18Req1 = "请选择{0}!";
tt.i18Email = "{0}不是一个合法的邮箱!";
tt.i18Int = "{0}必须为整数!";
tt.i18Datetime = "{0}不是一个合法的日期时间! 正确的格式为{1}";

//  num range start
tt.i18NumRange = "{0}必须在{1}和{2}之间!";
tt.i18NumRangeMin = "{0}必须小于等于{1}!";
tt.i18NumRangeMax = "{0}必须大于等于{1}!";
tt.i18NumRangeExp = "{0}合法范围：{1}!";
//  num range end

tt.i18LenMin = "{0}最多只能输入{1}个字符，您已超出{2}个字符!";
tt.i18Len = "{0}最少要输入{1}个字符，你还需要输入{2}个字符!";//{0}的长度不应大于3! //{0}的长度不应小于3!
tt.i18LenExp = "{0}长度合法范围：{1}!";
tt.i18LenTip = "您已输入{0}个字符，还可以输入{1}个字符!";

tt.i18Num = "{0}必须为数字!";
tt.i18Regex = "{0}{1}";
tt.i18Ip = "{0}不是一个合法的IP!";
tt.i18Postcode = "{0}不是一个合法的邮政编码!";
tt.i18Tel = "{0}不是一个合法的电话号码!<br>合法的格式形如：0734-1234567或 021-12345678";
tt.i18Idcard = "{0}不是一个合法的身份证号码!";

tt.i18SelectCountMin = "{0}最多只能选中{1}项，您已多选{2}项!";
tt.i18SelectCount = "{0}最少要选中{1}项，你还需要选择{2}项!";
tt.i18SelectCount_1 = "{0}最少要选中{1}项!";
tt.i18SelectCountExp = "{0}选中个数的合法范围：{1}!";

tt.ajaxError="向服务器发送请求时出现异常，请检查本机与服务器的网络是否通畅!";
tt.ajaxError1="从服务器端获取数据失败!";
tt.ajaxError2="服务器异常!";

tt.i18DftOk = null;//'OK!';

//-----  compare validator
tt.i18Compare = "{0}不正确!";
tt.i18StrCompare = "{0}应该{1}{2}{3}!";
tt.i18NumCompare = "{0}应该{1}{2}{3}!";
tt.i18StrValueCompare = "{0}必须{1}{2}!";
tt.i18NumValueCompare = "{0}必须{1}{2}!";
tt.operMap = [];
tt.operMap["<"] = "小于";
tt.operMap["<="] = "小于或等于";
tt.operMap["=="] = "等于";
tt.operMap["!="] = "不等于";
tt.operMap[">"] = "大于";
tt.operMap[">="] = "大于或等于";

tt.close = "关闭";

/**
 * tanyaowu:此段代码是几年前摘自网上，网址已经找不到了
 */
(function() {
	var initializing = false, fnTest = /xyz/.test(function() {
				xyz;
			}) ? /\b_super\b/ : /.*/;
	this.tt.C = function() {
	};
	tt.C.ext = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] == "function"
					&& typeof _super[name] == "function"
					&& fnTest.test(prop[name]) ? (function(name, fn) {
				return function() {
					var tmp = this._super;
					this._super = _super[name];
					var ret = fn.apply(this, arguments);
					this._super = tmp;
					return ret;
				};
			})(name, prop[name]) : prop[name];
		}
		function _c() {
			// 在类的实例化时，调用原型方法init
			if (!initializing && this.init){this.init.apply(this, arguments);}
				
		}
		_c.prototype = prototype;
		_c.constructor = _c;
		_c.ext = arguments.callee;
		return _c;
	};
})();


tt.Conf = {
	ver: '2.7.8',
	
	errorStyle : 'text',     //默认提供：['text', 'alert']
	tipStyle : 'tip',        //默认提供：['tip']
	
	clearOtherError : false, // 当验证某一元素时，是否隐藏其它字段的错误提示。true 隐藏其它字段的错误提示
	validateOn : ['keyup', 'focus', 'change'], // 触发验证的事件类型。 
	
	clrSpace : true,  //验证时，是否清空输入值两端的空格
	
	
	//---------  下面的配置项不建议修改  ----------------
	proNameOfMsgId : 'ttTalentMsgId',
	proNameOfReqStarId : 'ttTalentReqStarId',
	
	eventId : 'talentEventId',
	
	errCls: "talentErrMsg",         //错误提示信息的样式
	tipCls: "talentTipMsg",         //错误提示信息的样式
	errInputCls: "talentErrInput",  //验证不通过时，输入框的样式
	reqStarCls: "talentReqStar"     // 必须输入项后面紧跟着一个星号的样式
};
/**
 * 
 * @param {}
 *            target
 * @param {}
 *            type such as "click"
 * @param {}
 *            handler
 */
tt.Util.addEventHandler = function(o, type, handler) {
	f = arguments.length == 4;
	if (o.addEventListener) {
		if (f) {
			o.removeEventListener(type, handler, false);
		} else {
			o.addEventListener(type, handler, false);
		}
	} else if (o.attachEvent) {

		if (f) {
			o.detachEvent("on" + type, handler);
		} else {
			o.attachEvent("on" + type, handler);
		}
	} else {
		if (f) {
		} else {
			o["on" + type] = handler;

		}
	}
};

/**
 * 将htmlElement插入到srcElement元素后面
 * 
 * @param srcElement
 * @param htmlElement
 */
tt.insertAfter = function(src, e) {
	tt.insertHtml('afterend', src, e);
};
tt.insertBegin = function(src, e) {
	tt.insertHtml('beforebegin', src, e);
};
tt.insertHtml = function(where, el, html) {
	where = where.toLowerCase();
	if (el.insertAdjacentHTML) {
		switch (where) {
			case "afterend" :
				el.insertAdjacentHTML('AfterEnd', html);
				return el.nextSibling;
			case "beforebegin" :
				el.insertAdjacentHTML('beforebegin', html);
				return el.nextSibling;
		}
	} else {
		var range = el.ownerDocument.createRange();
		var frag;
		switch (where) {
			case "afterend" :
				range.setStartAfter(el);
				frag = range.createContextualFragment(html);
				el.parentNode.insertBefore(frag, el.nextSibling);
				return el.nextSibling;
		}
	}
};
/**
 * 为element添加className样式
 * 
 * @param element
 *            被操作的元素
 * @param cls
 *            样式名
 * @return
 */
tt.addCls = function(element, cls) {
	if (cls && element){
		_cls = element.className;
		_cls = " " + _cls + " ";
		if (_cls.indexOf(" " + cls + " ") == -1) {
			element.className = _cls + cls;
		}
	}
	
};
/**
 * 为element删除className样式
 * 
 * @param element
 *            被操作的元素
 * @param cls
 *            样式名
 * @return
 */
tt.rmCls = function(element, cls) {
	if (!element || !element.className || !cls) {
		return;
	}
	var oClass = element.className;
	var reg = "/\\b" + cls + "\\b/g";
	element.className = oClass ? oClass.replace(eval(reg), '') : '';
};

/**
 * 删除某一个元素
 * 
 * @param element
 * @return
 */
tt.rmEle = function(e) {
	if (e && e.parentNode) {
		e.parentNode.removeChild(e);
	}
};

/**
 * 相当于string的trim
 * 
 * @param str
 * @return
 */
tt.trim = function(s, m) {
	if (!s) {
		return "";
	}
	r = /(^\s*)|(\s*$)/g;
	if (m) {
		if (m == "l") {
			r = /(^\s*)/g;
		} else if (m == "r") {
			r = /(\s*$)/g;
		}
	}
	return s.replace(r, "");
};

/**
 * 根据类名实例化js对象
 * 
 * @param {}
 *            clazz
 * @return {}
 */
tt.instanceByClass = function(c) {
	eval("var r = new " + c + "();");
	return r;
};

/**
 * 
 * @param {}
 *            v comparedValue
 * @param {}
 *            exp expression
 * @return {}
 */
tt.parRngExp = function(v, exp) {
	var map = {
		'(' : '>',
		'[' : '>='
	};
	var expArr = [];
	var m1 = {
		"{" : "(",
		"}" : ")",
		"|" : "||",
		"&" : "&&"
	};
	for (i = 0; i < exp.length; i++) {
		c = exp.charAt(i);

		if (c == '(' || c == '[') {
			compareOper1 = map[c];

			index1 = exp.indexOf(')');
			index2 = exp.indexOf(']');
			_index = index1;
			compareOper2 = '<';
			if (index1 == -1 && index2 == -1) {
				alert('expression is invalid, not found ] or )!');
				return null;
			} else if (index1 == -1 || (index1 > index2 && index2 != -1)) {
				_index = index2;
				compareOper2 = '<=';
			}
			var singleExp = exp.substring(i + 1, _index);

			var numArr = singleExp.split(',');
			numArr[0] = tt.trim(numArr[0]);

			if (numArr.length == 1) {
				numArr[1] = tt.trim(numArr[0]);
			} else if (numArr.length == 2) {
				numArr[1] = tt.trim(numArr[1]);
			} else {
				alert(singleExp + ' is error!');
				return null;
			}

			expArr.push("(");
			if (numArr[0] != '') {
				expArr.push(v);
				expArr.push(compareOper1);
				expArr.push(numArr[0]);
			}
			if (numArr[0] != '' && numArr[1] != '') {
				expArr.push(' && ');
			}
			if (numArr[1] != '') {
				expArr.push(v);
				expArr.push(compareOper2);
				expArr.push(numArr[1]);
			}

			expArr.push(")");

			exp = exp.substring(_index + 1, exp.length);
			i = 0;
			continue;
		} else if (m1[c]) {
			expArr.push(m1[c]);
		}
	}
	return expArr.join('');
};
/**
 * tt.getI18S("my name is {0}, your name is {1}",["kebo","smis"], 0);
 * tt.getI18S("my name is {1}, your name is {2}",["kebo","smis"], 1);
 */
tt.getI18S = function() {
	var ret = arguments[0];
	if (arguments.length > 1) {
		si = 0; // startIndex
		if (arguments.length == 3) {
			si = arguments[2];
		}
		for (i = 0; i < arguments[1].length; i++) {
			ret = ret.replace("{" + si + "}", arguments[1][i]);
			si++;
		}
	}
	return ret;
};

/**
 * 
 * @param {}
 *            e
 * @return {} true:包含
 */
Array.prototype.ttCons = function(e) {
	i = 0;
	for (; i < this.length && this[i] != e; i++);
	return !(i == this.length);
};

tt.getStrLen = function(s) {
	var len = 0;
	var c = -1;
	for (var i = 0; i < s.length; i++) {
		c = s.charCodeAt(i);
		if (c >= 0 && c <= 128)
			len += 1;
		else
			len += 2;
	}
	return len;
};
tt.getById = function(id) {
	return document.getElementById(id);
};

/**
 * 获取元素的位置信息
 * 
 * @param {}
 *            e
 * @return {} {"t":t,'l':l,"b":b,'r':r};
 */
tt.getPos = function(e) {
	var rect = e.getBoundingClientRect();
	var scrollTop = 0;
	var scrollLeft = 0;
	var temp = e;
	while (temp = temp.offsetParent) {
		scrollTop += temp.scrollTop;
		scrollLeft += temp.scrollLeft;
	}

	var t = rect.top + scrollTop;
	var l = rect.left + scrollLeft;
	var r = rect.right + scrollLeft;
	var b = rect.bottom + scrollTop;
	return {
		"t" : t,
		'l' : l,
		"b" : b,
		'r' : r
	};
};
/**
 * 将srcE移到targetE后面
 * 
 * @param {}
 *            srcE
 * @param {}
 *            targetE
 */
tt.moveToPos = function(srcE, targetE) {
	var targetpostion = tt.getPos(targetE);
	srcE.style.zIndex = 9;
	srcE.style.position = "absolute";
	srcE.style.top = targetpostion.t - 3;// -
											// srcE.currentStyle.borderTopWidth
											// - srcE.style.marginTop;
	srcE.style.left = targetpostion.r + 8;// - srcE.currentStyle.borderLeftWidth -
										// srcE.style.marginLeft;
};
tt.getSelectedCount = function(j, es) {
	if (!es) {
		return 0;
	}
	
	var types = tt.inputType(es[j]);
	var c = 0;

	if (types.isSelect) {
		for (var i = 0; i < es[j].options.length; i++) {
			if (es[j].options[i].selected) {
				c++;
			}
		}
		return c;
	} else {
		for (var i = 0; i < es.length; i++) {
			if (es[i].checked) {
				c++;
			}
		}
		return c;
	}
	return c;
};

/**
 * 
 * @param {}
 *            e element
 * @return {}
 */
tt.inputType = function(e) {
	return {
		'isSelect' : e.tagName == "SELECT",
		'isCheckbox' : e.tagName == "INPUT" && e.type == 'checkbox',
		'isRadio' : e.tagName == "INPUT" && e.type == 'radio'
	};
};

tt.setVfP = function(clrSpace) {
	tt.vf.clrSpace = clrSpace;
};

tt.rmNull = function(arr) {
	var temp = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] != null ) {
			temp.push(arr[i]);
		}
	}
	return temp;
};

/**
 * 
 * @param {} formElement
 * @return {}
 */
tt.Util.formToQueryString = function(formElement) {
	var allStr = [""];
	if (formElement) {
		var formElements = formElement.elements;
		var inputObj;
		if (formElements) {
			for (var i = 0; i < formElements.length; i++) {
				inputObj = formElements[i];
				if (inputObj.name) {
					allStr.push(inputObj.name + "=" + encodeURIComponent(inputObj.value));
				}
			}
		}
	}
	return allStr.join("&");
};

/**
 * 获取浏览器信息
 * @return {String}
 */
tt.Util.getOs = function() {
   if(navigator.userAgent.indexOf("MSIE") > 0) {
        return "ie";
   }
   if(isFirefox=navigator.userAgent.indexOf("Firefox") > 0) {
        return "ff";
   }
   if(isSafari=navigator.userAgent.indexOf("Safari") > 0) {
        return "safari";
   }
   if(isCamino=navigator.userAgent.indexOf("Camino") > 0) {
        return "camino";
   }
   if(isMozilla=navigator.userAgent.indexOf("Gecko/") > 0) {
        return "gecko";
   }
};

/**
  eg:<br>
  var config = 
  {
	url:"xx.do",       //请求的url
	form: formElement, //要提交的form
	method:"post",     //post/get。默认为post
	async:false,       //true/false。默认为false(表示异步提交)
	data:[{name:"e", value:"ee"},{name:"w", value:"ww"}],
	queryStringData: "e=eee&a=ddd&c=kkkk",
    encoding:     'UTF-8',
    requestHeaders: {"",""},
    thisObj: null,                        //回调方法体内，this指示的对象
	success: function(xmlHttpRequest){}   //成功请求后的回调函数
  };
  new tt.Ajax().setConfig(config).submit();
 */
tt.Ajax = function() {
	this.config = null;
	this.setConfig = function(config) {
		this.config = config;
		return this;
	};
	/**
	 * 
	 */
	this.getXmlHttpRequest = function () {
		try {
			return new ActiveXObject("MSXML2.XMLHTTP");
		}
		catch (e) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e1) {}
		}
		if (typeof XMLHttpRequest != "undefined") {
			return new XMLHttpRequest();
		}
	};
	
	/**
	 * @param {} config 形如: <br>
	  {
  		url:"xx.do",       //请求的url
  		method:"post",    //post/get。默认为post
  		async:false,    //true/false。默认为true，true表示异步
  		
  		form: formElement, //要提交的form
  		data:[{name:"e", value:"ee"},{name:"w", value:"ww"}],
  		queryStringData: "e=eee&a=ddd&c=kkkk",
  		
        encoding:     'UTF-8',
        requestHeaders:{"Accept-Encodin":"x-compress; x-zip",
        				"User-Agent":"LII-Cello/1.0  libwww/2.5",
        				"Referer":"http://www.w3.org/hypertext/DataSources/Overview.html"},
        
        
  		success: function(xmlHttpResponse, callbackParams){},   //成功时的回调函数
  		callbackParams: {},                                     //回调函数的第二个参数
        thisObj: {},                                            //success方法体内，this代表的对象
  		
  		onSendError: function(){},   //当发送失败时需要调用的函数
  		thisObjForSendError: {}      //onSendError方法体内，this代表的对象
	  }
	 */
	this.submit = function () {
		var config = this.config;
		if (!config.url) {
			return;
		}
		
		var xmlHttpRequest = this.getXmlHttpRequest();
		var contentType = 'application/x-www-form-urlencoded';
		var method = config.method ? config.method.toUpperCase() : "POST";
		var async = config.async ? config.async : false;
		var encoding = config.encoding ? config.encoding : 'utf-8';
		var thisObj = config.thisObj ? config.thisObj : window;
		var thisObjForSendError = config.thisObjForSendError ? config.thisObjForSendError : window;
		
		var setRequestHeader = function(xmlHttpRequest, requestHeaders) {
			var buildinHeaders = 
			{
		      'X-Requested-With': 'XMLHttpRequest',
		      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
		    };
		    if (method == "POST") {
				 buildinHeaders['Content-type'] = contentType + (encoding ? '; charset=' + encoding : '');
			}
			
			for (var name in buildinHeaders) {
				xmlHttpRequest.setRequestHeader(name, buildinHeaders[name]);
			}
			if (requestHeaders) {
				for (var name in requestHeaders) {
					xmlHttpRequest.setRequestHeader(name, requestHeaders[name]);
				}
			}
		};
		
		var url = config.url;
		
		var postData = [];
		
		//url += "&tt_ajax_time=" + new Date().getMilliseconds();
		postData.push("tt_ajax_time=" + new Date().getMilliseconds());
		
		if(config.formId) {
			config.form = tt.getById(config.formId);
		}
		if (config.form) {
			postData.push(tt.Util.formToQueryString(config.form));
		}
		if (config.queryStringData) {
			postData.push(encodeURI(config.queryStringData));
		}
		if (config.data) {
			var data;
			for (var i = 0; i < config.data.length; i++) {
				data = config.data[i];
				postData.push(data.name + "=" + encodeURIComponent(data.value));
			}
		}
		var postDataStr = postData.join("&");
		postDataStr = postDataStr.replace(/[&]{2,3}/g, "&");
		
		xmlHttpRequest.open(method, url, async);
		setRequestHeader(xmlHttpRequest, config.requestHeaders);//必须在open后面执行
		var t = function() {
			if (xmlHttpRequest.readyState == 4) {
				if (config.success) {
					thisObj = config.thisObj ? config.thisObj : config.success;
					config.success.call(thisObj, xmlHttpRequest, config.callbackParams);
				}
			}
		};
		
		try {
			if (tt.Util.getOs() == "ff") {
				xmlHttpRequest.send(postDataStr);
				xmlHttpRequest.onreadystatechange = t();
			} else {
				xmlHttpRequest.onreadystatechange = t;
				xmlHttpRequest.send(postDataStr);
			}
		} catch(e) {
			if (config.onSendError){
				config.onSendError.call(thisObjForSendError, config);
			}
		}
	};
};

tt.Ajax.submit = function(ajaxConfig) {
	new tt.Ajax().setConfig(ajaxConfig).submit();
};
/**
 * validate all
 */
tt.validate = function() {
	tt.setVfP(true);
	tt.vf.vType = "a";
	return tt.vf.vBf();
};
/**
 * validate form eg:tt.validateForm('formname1', 'formname2', ... );
 */
tt.validateForm = function () {
	tt.setVfP(true);
	tt.vf.vType = "f";
	return tt.vf.vBf(new tt.f.Form(arguments));
};
/**
 * validate element eg:tt.validateElement(element1, element2, ... );
 */
tt.validateElement = function() {
	tt.setVfP(false);
	tt.vf.vType = "e";
	return tt.vf.vBf(new tt.f.Ele(arguments));
};
/**
 * validate id eg:tt.validateId('id1', 'id2', ... );
 */
tt.validateId = function() {
	tt.setVfP(true);
	tt.vf.vType = "i";
	return tt.vf.vBf(new tt.f.Id(arguments));
};
/**
 * validate name eg:tt.validateName('name1', 'name2', ... );
 */
tt.validateName = function() {
	tt.setVfP(true);
	tt.vf.vType = "n";
	return tt.vf.vBf(new tt.f.Name(arguments));
};
/**
 * remove all validator form validatorFactory
 */
tt.removeAll = function() {
	tt.vf.rmAll();
};
/**
 * 信息提示框的关闭按钮动作处理类
 * 
 * @param {}
 *            obj
 * @param {}
 *            closeObj
 */
tt.closeHandler = function(obj, closeObj, e, eCls) {
	this.click = function() {
		tt.rmEle(obj);
		tt.rmCls(e, eCls + '_1');
	};
};
tt.msgHandler = function(e, cls) {
	var _cls = cls + "_1";
	this.mouseover = function() {
		tt.addCls(e, _cls);
	};
	this.mouseout = function() {
		tt.rmCls(e, _cls);
	};
	this.click = function() {
		e.focus(true);
	};
};

/**
 * baseHandler
 */
tt.bh = tt.C.ext({
	setV:function(v)
	{
		this.v = v;
		return this;
	},
	setE:function(e)
	{
		this.e = e;
		return this;
	},
	setF:function(f)
	{
		this.f = f;
		return this;
	},
	setVal:function(val)
	{
		this.val = val;
		return this;
	},
	setIndex:function(index)
	{
		this.index = index;
		return this;
	},
	needHandle:function()
	{
		return !(this.e.style.display == 'none' || this.e.disabled)//对于不可见的元素,不处理
	},
	render:function(cls, msg, closeCls, inputCls) {
			var e = this.e;
			var types = tt.inputType(e);
			var divWrap = document.createElement("div");
			var div = document.createElement("div");
			divWrap.appendChild(div);
			
			var msgId = this.f.getMsgId(e);
			if (msgId) {
				tt.getById(msgId).appendChild(divWrap);
			} else {
				if (types.isCheckbox || types.isRadio) {
					tt.moveToPos(divWrap, this.f.es[this.f.es.length - 1]);
				} else {
					tt.moveToPos(divWrap, e);
				}
				e.parentNode.insertBefore(divWrap, e);
				tt.vf.msgs.push({"msg":divWrap,"ele":e});
			}
			
			divWrap.id = e[tt.Conf.proNameOfMsgId];
			divWrap.className = cls;
			div.innerHTML = msg;
			div.style.display = "inline";
			
			var close = document.createElement("div");
			divWrap.appendChild(close);
			
			close.className = closeCls;
			close.innerHTML = "";
			close.title = tt.close;
			
			tt.addCls(e, inputCls);
			
			tt.Util.addEventHandler(close, "click", new tt.closeHandler(divWrap, close, e, inputCls).click);
			
			tt.Util.addEventHandler(div, "click", new tt.msgHandler(e, inputCls)["click"]);
			tt.Util.addEventHandler(divWrap, "mouseover", new tt.msgHandler(e, inputCls)["mouseover"]);
			tt.Util.addEventHandler(divWrap, "mouseout", new tt.msgHandler(e, inputCls)["mouseout"]);
			
	}
});
tt.text = tt.bh.ext({
	h:function()
	{
		var i18n = this.v.getI18(this.f.label);
		if (this.needHandle() && i18n) {
			this.render(tt.Conf.errCls, i18n, "talentClose", tt.Conf.errInputCls);
		}
	}
});
tt.alert = tt.bh.ext({
	h:function()
	{
		var i18n = this.v.getI18(this.f.label);
		if (this.needHandle() && i18n) {
			tt.addCls(this.e, tt.Conf.errInputCls);
	        alert(i18n);
		}
	}
});
tt.tip = tt.bh.ext({
	h:function()
	{
		var tipMsg = this.v.getTip(this.e,this.f,this.v,this.val,this.index);
		if (this.needHandle() && tipMsg) {
			this.render(tt.Conf.tipCls, tipMsg, "talentClose talentCloseTip", "talentSucInput");
		}
	}
});
tt.vHandler = function(e) {
	this.h = function() {
		if (tt.Conf.errorStyle == 'alert') {
			return;
		}
		tt.validateElement(e);
	},
	this.talent_getId = function(){
		return tt.Conf.eventId;
	}
};

/**
 * @author Tanyaowu
 * @version 2.0.0
 * @date 2011-8-13
 * BaseValidator
 */
tt.BV = tt.C.ext({
	init:function() {
		this.fs = [];
		this.i18ps = [];
		this.isInFactory = false;// 本验证器是否已经在验证器工厂中了.false:不在工厂中;true:已在工厂中.
		this.clrSpace = tt.Conf.clrSpace;
		this.vType = 'local';
	},
	initI18n : function(m) {
		!this.i18n ? this.i18n = m : null;
		return this;
	},
	setI18 : function(m) {
		this.i18n = m;
		return this;
	},
	setClrSpace:function(c){
		this.clrSpace = c;
	},
	
	/**
	 * 
	 * @param {} s 需要被验证的串，根据配置此串有可能清除了两边的空格
	 * @param {} i index 当前元素序号，从0开始
	 * @param {} es elements
	 * @param {} f Field
	 * @return {Boolean} true:验证通过
	 */
	v : function(s, i, es, f) {
		return true;
	},
	/**
	 * 
	 * @param {} f Field
	 */
	doAfterAdd : function(f) {
	},
	/**
	 * 当移除后做些事情,子类视情况实现该函数,如Required验证器,需要去掉后面的红星号
	 */
	doBeforeRm : function(f) {
		this.clrFErr(f);
	},
	/**
	 * 
	 * @param {} fl filter
	 * @return {Boolean}
	 */
	vBf : function(fl) {
		var ret = true;
		var first_err = null;
		if (this.vType == 'remote') {
			if (['a','f'].ttCons(tt.vf.vType)){
				this.v();
			}
			return;
		}
		debugger
		for (var i = 0; i < this.fs.length; i++) {
			var es = this.fs[i].es;
			
			if (es) {
				for (j = 0; j < es.length; j++) {
					if (tt.vf.invalidEs.ttCons(es[j])){  //没有通过前面的验证器
						continue;
					}
					
					/** 不需要验证或者验证通过则继续下一个元素的处理 */
					if (fl && !fl.f(es[j])) {  //被过滤了，不需要验证
						if (tt.Conf.clearOtherError){
							this.clrEleErr(es[j]);
						}
						continue;
					}
					
					var types = tt.inputType(es[j]);
					
					var sv = es[j].value;
					
					if (this.clrSpace && (!types['isSelect'] && !types['isCheckbox'] && !types['isRadio'])) {
						sv = tt.trim(sv);
						if(!["e"].ttCons(tt.vf.vType)) {
							es[j].value = sv;
						}
					}
					
					if (types['isRadio'] || types['isCheckbox']){
						this.clrFErr(this.fs[i]);
					}else{
						this.clrEleErr(es[j]);
					}
					if(this.v(sv, j, es, this.fs[i])) {  //验证通过
						this.handTip(es[j], this.fs[i], sv, j);
						continue;
					} else {
						
						tt.vf.invalidEs.push(es[j]);
						this.handErr(es[j], this.fs[i], sv, j);
						ret = false;
						if(first_err==null){
							first_err= es[j];
							first_err.focus();
						}
					}
				}
			
			}
		}
		
		
		if(first_err != null){
			first_err = $(first_err);
			var destination=first_err.offset().top;
			var fixleft = first_err.offset().left;

			//prompt positioning adjustment support. Usage: positionType:Xshift,Yshift (for ex.: bottomLeft:+20 or bottomLeft:-20,+10)
			var positionType="positionType:Xshift";
			if (typeof(positionType)=='string' && positionType.indexOf(":")!=-1)
				positionType=positionType.substring(0,positionType.indexOf(":"));

			if (positionType!="bottomRight" && positionType!="bottomLeft") {
				var prompt_err= methods._getPrompt(first_err);
				if (prompt_err) {
					destination=prompt_err.offset().top;
				}
			}

			// Offset the amount the page scrolls by an amount in px to accomodate fixed elements at top of page
			if (options.scrollOffset) {
				destination -= options.scrollOffset;
			}

			// get the position of the first error, there should be at least one, no need to check this
			//var destination = form.find(".formError:not('.greenPopup'):first").offset().top;
			if (false) {
				var overflowDIV = $(options.overflownDIV);
				if(!overflowDIV.length) return false;
				var scrollContainerScroll = overflowDIV.scrollTop();
				var scrollContainerPos = -parseInt(overflowDIV.offset().top);

				destination += scrollContainerScroll + scrollContainerPos - 5;
				var scrollContainer = $(options.overflownDIV + ":not(:animated)");

				scrollContainer.animate({ scrollTop: destination }, 1100, function(){
					if(options.focusFirstField) first_err.focus();
				});

			} else {
				$("html, body").animate({
					scrollTop: destination
				}, 1100, function(){
					if(true) first_err.focus();
				});
				$("html, body").animate({scrollLeft: fixleft},1100)
			}
			
			
		}
		return ret;
	},

	/**
	 * 移除字段 用法:xx.rm("name1", "name2", "name3"...);
	 */
	rm : function() {
		return this._rm("name", arguments);
	},
	/**
	 * 移除字段 用法:xx.rmId("id1", "id2", "id3"...);
	 */
	rmId : function() {
		return this._rm("id", arguments);
	},
	_rm:function(type, args){
		for (var i = 0; i < args.length; i++) {
			for (var j = 0; j < this.fs.length; j++) {
				var f = false;
				if (typeof args[i] != "string"){
					f = (this.fs[j] && this.fs[j] == args[i]);
				} else {
					f = (this.fs[j] && this.fs[j][type] == args[i]);
				}
				
				if (f) {
					this.doBeforeRm(this.fs[j]);
					this.fs[j] = null;
				}
			}
		}
		this.fs = tt.rmNull(this.fs);
		return this;
	},
	
	/**
	 * 移除所有字段 用法:xxValidator.rmAll();
	 */
	rmAll : function() {
		for (var i = 0; i < this.fs.length; i++) {
			this.rm(this.fs[i]);
		}
		this.fs = [];
	},
	/**
	 * 将要验证的字段加到验证器中 用法:xx.add("name1", "name2", "name3"...);
	 */
	add : function() {
		return this._addF('name', arguments);
	},
	/**
	 * 将要验证的字段加到验证器中 用法:xx.addId("id1", "id2", "id3"...);
	 */
	addId : function() {
		return this._addF('id', arguments);
	},
	_addF : function(type, arg){
		for (var i = 0; i < arg.length; i++) {
			var f = null;
			if (type == 'id'){
				if (this._c('name',tt.getById(arg[i]).name) && this._c('id', arg[i])) {
					f = new tt.Field("", null, arg[i]);
				}
			} else {
				isStr = (typeof arg[i] == 'string');
				var fg = false;
				if (isStr){
					fg = this._c('name', arg[i]);
				}else{
					fg = (this._c('name', arg[i].name) && this._c('id', arg[i].id));
				}
				if (fg) {
					if (isStr) {
						f = new tt.Field("", arg[i]);
					} else {
						f = arg[i];
					}
				}
			}
			
			if (f != null){
				this.fs[this.fs.length] = f;
				for (var j = 0; j < f.es.length; j++) {
					if (f.es[j].tt_addedEvent){
						continue;
					}
					f.es[j].tt_addedEvent = true;
					this.attachE(f.es[j]);
				}
				
				if (!this.isInFactory)// 必要时添加验证器到工厂中
				{
					tt.vf.add(this);
					this.isInFactory = true;
				}
				this.doAfterAdd(f);
			}
		}
		return this;
	},
	/**
	 * 
	 * @param {} proName
	 * @param {} value
	 * @return {Boolean}
	 */
	_c:function(proName, value) {
		if (!value) {
			return true;
		}
		
		for (var i = 0; i < this.fs.length; i++) {
			if (proName){
				if (this.fs[i][proName] == value) {
					return false;
				}
			}else{
				if (this.fs[i] == value) {
					return false;
				}
			}
			
		}
		return true;
	},
	/**
	 * 处理没有验证通过的对象,例如对这个对象进行选中,将焦点转到该对象,修改该对象的样式等
	 */
	handErr : function(e, f, val, j) {
		var h = tt.instanceByClass("tt." + tt.Conf.errorStyle);
		h.setV(this).setE(e).setF(f).setVal(val).setIndex(j).h();
	},
	handTip : function(e, f, val, j) {
		var h = tt.instanceByClass("tt." + tt.Conf.tipStyle);
		h.setV(this).setE(e).setF(f).setVal(val).setIndex(j).h();
	},
	/**
	 * 验证不通过时，获取提示给用户的信息
	 * 
	 * @param label
	 */
	getI18 : function(label) {
		if (this.i18n){
			ret = tt.getI18S(this.i18n, [label], 0);
			return tt.getI18S(ret, this.i18ps, 1);
		}
		return null;
	},
	setTip : function(tip) {
		this.tip = tip;
		return this;
	},
	
	/**
	 * 
	 * @param {} e element
	 * @param {} f field
	 * @param {} v validator
	 * @param {} val
	 * @param {} index
	 * @return {}
	 */
	getTip : function(e,f,v,val,index) {
		return this.tip;
	},
	/**
	 * 清空field的错误
	 */
	clrFErr : function(f) {
		var es = f.es;
		for (i =0; i< es.length; i++) {
			this.clrEleErr(es[i]);
		}
	},
	clrEleErr:function(e){
		if (e){
			tt.rmCls(e, tt.Conf.errInputCls);
			tt.rmEle(tt.getById(e[tt.Conf.proNameOfMsgId]));
		}
		
	},
	/**
	 * 获取本验证器所验证的所有element
	 */
	getEs : function(){
		es = [];
		for (i =0; i< this.fs.length; i++) {
			for (var j=0;j<this.fs[i].es.length;j++){
				es = es.concat(this.fs[i].es[j]);
			}
		}
		return es;
	},
	/**
	 * 对html element作些额外的处理，如加验证事件
	 * @param {} e html element
	 */
	attachE:function(e){
		if (tt.Conf.errorStyle == 'alert') {
			return;
		}
		
		var types = tt.inputType(e);
		var hd = new tt.vHandler(e).h;
		for (var x in tt.Conf.validateOn) {
			var evt = tt.Conf.validateOn[x];
			if (types.isCheckbox || types.isRadio) {
				if (evt == 'change'){
					tt.Util.addEventHandler(e, evt, hd);
					break;
				}
				continue;
			}
			
			if (types.isSelect && e.multiple != true) {
				if (evt == 'change'){
					tt.Util.addEventHandler(e, 'blur', hd);
					break;
				}
				continue;
			}
			
			tt.Util.addEventHandler(e, evt, hd);
		}
	}
});
tt.Field = tt.C.ext({
	init : function(label, name, id, e) {
		this.label = label;
		this.name = name == '' ? null : name;
		this.id = null;
		this.msgId = null;
		es = [];
		
		if(e){
			es.push(e);
		} 
		if (name) {
			es = document.getElementsByName(name);
		}
		if (id) {
			es = [];
			this.id = id;
			e = tt.getById(id);
			if (e) {
				es.push(e);
			}
		}
		for (var i=0;i<es.length;i++) {
			 seq = tt.vf.seq++;
			 !es[i][tt.Conf.proNameOfMsgId] ? es[i][tt.Conf.proNameOfMsgId] = tt.Conf.proNameOfMsgId + seq : null;
			 !es[i][tt.Conf.proNameOfReqStarId] ? es[i][tt.Conf.proNameOfReqStarId] = tt.Conf.proNameOfReqStarId + seq : null;
		}
		this.es = es;
		
	},
	setMsgId:function(id) {
		this.msgId = id;
		return this;
	},
	getMsgId:function(e) {
		return this.msgId;
	}
});
tt.f.Dft = tt.C.ext({
	init:function()
	{
		this.p = [];
		var a = arguments;
		if(a.length != 0){
			for (var i =0; i < a[0].length; i++){
				this.p.push(a[0][i]);
			}
		}
	},
	/**
	 * @return true:表示需要验证,false:表示被过滤了,不需要验证.
	 */
	f:function(e)
	{
		return true;//默认都需要验证
	}
});
tt.f.Form = tt.f.Dft.ext({
	f:function(e)
	{
		return e.form && this.p.ttCons(e.form.name);
	}
});
tt.f.Ele = tt.f.Dft.ext({
	f:function(e)
	{
		return this.p.ttCons(e);
	}
});
tt.f.Id = tt.f.Dft.ext({
	f:function(e)
	{
		return this.p.ttCons(e.id);
	}
});
tt.f.Name = tt.f.Dft.ext({
	f:function(e)
	{
		return this.p.ttCons(e.name);
	}
});
tt.RV = tt.BV.ext({
set : function(regex, i18n) {
	this.regex = regex;
	this.i18ps[0] = i18n;
	return this;
},

v : function(s) {
	this.initI18n(tt.i18Regex);
	return (!s) || this.regex.test(s);
}
});
tt.ReqV = tt.BV.ext({
v : function(s, i, es, f) {
	this.setI18(tt.i18Req);
	if (es[i].tagName && es[i].tagName == "SELECT") {
		this.setI18(tt.i18Req1);
	}
	return (s);
},
/**
 * 在字段后面加上星号
 */
doAfterAdd : function(f) {
	this._super(f);
	this.addStar(f);
},
/**
 * 当注销后做些事情,子类视情况实现该函数,如Required验证器,需要去掉后面的红星号
 */
doBeforeRm : function(f) {
	this._super(f);
	this.clearStar(f); // 清空星号
},
/**
 * 添加星号
 */
addStar : function(f) {
	for (var i = 0; i < f.es.length; i++) {
		tt.insertBegin(f.es[i], tt.getI18S("<span id='{0}' class='{1}'>*</span>", [f.es[i][tt.Conf.proNameOfReqStarId], tt.Conf.reqStarCls]));
	}
},
/**
 * 清空星号
 */
clearStar : function(f) {
	for (i = 0; i< f.es.length; i++) {
		tt.rmEle(tt.getById(f.es[i][tt.Conf.proNameOfReqStarId]));
	}
}
});
tt.DV = tt.BV.ext({
    set:function(pattern)
    {
    	this.pattern = pattern;
    	this.i18ps[0] = pattern;
    	return this;
    },
    /**
     * 说明:日期的验证代码是直接摘自validation-framework.js,但略作修改
     */
    v:function(s)
    {
        if (!s)
        {
           return true;//不验证为空的串
        }
        this.initI18n(tt.i18Datetime);
        
        var dateP = this.pattern;//params[0];
        var MONTH = "mm";
        var DAY = "dd";
        var YEAR = "yyyy";
        var orderMonth = dateP.indexOf(MONTH);
        var orderDay = dateP.indexOf(DAY);
        var orderYear = dateP.indexOf(YEAR);
        var f = true;
        var dateReg = null;
        
        if ((orderDay < orderYear && orderDay > orderMonth)) {
            var iDelim1 = orderMonth + MONTH.length;
               var iDelim2 = orderDay + DAY.length;
               var delim1 = dateP.substring(iDelim1, iDelim1 + 1);
               var delim2 = dateP.substring(iDelim2, iDelim2 + 1);
               if (iDelim1 == orderDay && iDelim2 == orderYear) {
                dateReg = /^(\\d{2})(\\d{2})(\\d{4})$/;
               } else if (iDelim1 == orderDay) {
                dateReg = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
               } else if (iDelim2 == orderYear) {
                dateReg = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
               } else {
                dateReg = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
               }
        
               var matched = dateReg.exec(s);
               if(matched != null) {
                if (!this._c(matched[2], matched[1], matched[3])) {
                       f =  false;
                }
               } else {
                   f =  false;
               }
           } else if ((orderMonth < orderYear && orderMonth > orderDay)) { 
            var iDelim1 = orderDay + DAY.length;
               var iDelim2 = orderMonth + MONTH.length;
               var delim1 = dateP.substring(iDelim1, iDelim1 + 1);
               var delim2 = dateP.substring(iDelim2, iDelim2 + 1);
               if (iDelim1 == orderMonth && iDelim2 == orderYear) {
                dateReg = /^(\\d{2})(\\d{2})(\\d{4})$/;
               } else if (iDelim1 == orderMonth) {
                dateReg = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
               } else if (iDelim2 == orderYear) {
                dateReg = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
               } else {
                dateReg = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
               }
               var matched = dateReg.exec(s);
            if(matched != null) {
                if (!this._c(matched[1], matched[2], matched[3])) {
                    f = false;
                   }
               } else {
                f = false;
               }
           } else if ((orderMonth > orderYear && orderMonth < orderDay)) {
            var iDelim1 = orderYear + YEAR.length;
               var iDelim2 = orderMonth + MONTH.length;
               var delim1 = dateP.substring(iDelim1, iDelim1 + 1);
        
               var delim2 = dateP.substring(iDelim2, iDelim2 + 1);
               if (iDelim1 == orderMonth && iDelim2 == orderDay) {
                dateReg = /^(\\d{4})(\\d{2})(\\d{2})$/;
               } else if (iDelim1 == orderMonth) {
                dateReg = new RegExp("^(\\d{4})(\\d{2})[" + delim2 + "](\\d{2})$");
               } else if (iDelim2 == orderDay) {
                dateReg = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})(\\d{2})$");
               } else {
                dateReg = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{2})$");
               }
            var matched = dateReg.exec(s);
               if(matched != null) {
                if (!this._c(matched[3], matched[2], matched[1])) {
                       f =  false;
                   }
               } else {
                   f =  false;
               }
           } else {
               f =  false;
           }
        return f;
    },
    _c:function(d, m, y)
    {
		if (d < 1 || d > 31)
		{
			return false;
		}
		if (m < 1 || m > 12)
		{
			return false;
		}
		
		if ([4,6,9,11].ttCons(m) && (d > 30))
		{
			return false;
		}
		if (m == 2)
		{
			var leap = (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0));
			if (d>29 || (d == 29 && !leap))
			{
				return false;
			} 
	    }
		return true;
	}
});
tt.NV = tt.BV.ext({
	v:function(s)
	{
		this.initI18n(tt.i18Num);
		return this.isNum(s);
	},
	isNum:function(s)
	{
		return (!s) || (!isNaN(s) && (s.indexOf('.') != (s.length - 1)) );
	}
});
tt.IV = tt.NV.ext({
	v:function(s)
	{
		this.initI18n(tt.i18Int);
		return this.isInt(s);
	},
	isInt:function(s)
	{
		if (this.isNum(s))
		{
			var t = (s % 10) + "";
			return (!s) || t.indexOf(".") == -1;
		}
		return false;
	}
});
tt.NRV = tt.NV.ext({
	init:function(){
		this._super();
		this.needAddNumV = true;
	},
	/**
	 * 设置最小值,"--"表示无穷小
	 */
	setMin:function(min)
	{
		this.min = min;
		if (min == '--')//无穷小
		{
			this.i18n = tt.i18NumRangeMin;
			this.i18ps[0] = this.max;
			
		}else
		{
			this.i18ps[0] = min;
		}
	},
	/**
	 * 设置最大值,"++"表示无穷大
	 */
	setMax:function(max)
	{
		this.max = max;
		if (max == '++')
		{
			this.i18n = tt.i18NumRangeMax;
			this.i18ps[0] = this.min;
		}
		else
		{
			if (this.min == "--")
			{
				this.i18ps[0] = max;
			}
			else
			{
				this.i18ps[1] = max;
			}
		}
	},
	set:function(min, max)
	{
		if(arguments.length == 2) {
			this.setMin(min);
			this.setMax(max);
		} else {
			this.exp = min;
			this.i18n = tt.i18NumRangeExp;
			this.i18ps[0] = this.exp;
		}
		return this;
	},
	_rm:function(type,args){
		this.numV ? this.numV._rm(type,args) : null;
		this.numV = null;
		return this._super(type,args);
	},
	v:function(s)
	{
		this.initI18n(tt.i18NumRange);
		if (!this.numV && this.needAddNumV){
			this.numV = new tt.NV();
			for (i=0; i < this.fs.length; i++) {
				this.numV.add(this.fs[i]);
			}
		}
		
		if (!s || !this.isNum(s))//如果不是数字，就让数字验证器来验证
		{
			return true;
		}
		if (this.exp){
			return eval(tt.parRngExp(s, this.exp));
		}
		
		try 
		{
			if (this.max == "++" && this.min == "--")
			{
				return true;
			}
			
			if (this.max == "++")
			{
				if (eval(s) < eval(this.min))
				{
					return false;
				}else 
				{
					return true;
				}
			}
			
			if (this.min == "--")
			{
				if (eval(s) > eval(this.max))
				{
					return false;
				}else 
				{
					return true;
				}
			}
			
			if (eval(s) > eval(this.max) || eval(s) < eval(this.min))
			{
				return false;
			}
			return true;
		}
		catch (e)
		{
			return false;
		}
	}
});
tt.LV = tt.NRV.ext({
	init:function(){
		this._super();
		this.needAddNumV = false;
	},
	getTip:function(e,f,v,val,index) {
		var len = tt.getStrLen(val);
		if(this.max != '++' && !this.exp && !['f','a'].ttCons(tt.vf.vType)) {
			return tt.getI18S(tt.i18LenTip, [len, this.max - len]);
		} else {
			return this._super(e,f,v,val,index);
		}
	},
	v:function(s)
	{
		var len = tt.getStrLen(s);
		var r = this._super(len+"");
		if(!this.exp){
			v = len - this.max;
			if (v > 0) {  //超长了
				this.i18n = tt.i18LenMin;
				this.i18ps[0] = this.max;
				this.i18ps[1] = v;
			} else if ((v = this.min - len) > 0){ //长度不够
				this.i18n = tt.i18Len;
				this.i18ps[0] = this.min;
				this.i18ps[1] = v;
			}
		} else {
			this.i18n = tt.i18LenExp;
			this.i18ps[0] = this.exp;
		}
		return r;
	}
});
tt.SCV = tt.NRV.ext({
	init:function(){
		this._super();
		this.needAddNumV = false;
	},
	v:function(s, j, es, f)
	{
		var types = tt.inputType(es[j]);
		
		if (es.length > j + 1 && !['e','i'].ttCons(tt.vf.vType) && (types.isCheckbox || types.isRadio)) {
			return true; //只判断一次
		}
		
		var count = tt.getSelectedCount(j, es);
		var r = this._super(count+"");
		if(!this.exp){
			v = count - this.max;
			if (v > 0) {  //选 多了
				this.i18n = tt.i18SelectCountMin;
				this.i18ps[0] = this.max;
				this.i18ps[1] = v;
			} else if ((v = this.min - count) > 0){ //少选了
				this.i18n = tt.i18SelectCount;
				if (this.min == 1){
					this.i18n = tt.i18SelectCount_1;
				}
				
				this.i18ps[0] = this.min;
				this.i18ps[1] = v;
			}
		} else {
			this.i18n = tt.i18SelectCountExp;
			this.i18ps[0] = this.exp;
		}
		return r;
	}
});
tt.OnlyShow = tt.BV.ext({
	v : function(){
		return this.result;
	},
	getTip : function() {
		return this.result ? this.msg : null;
	},
	getI18 : function() {
		return !this.result ? this.msg : null;
	},
	attachE:function(e){}
});

tt.RemoteV = tt.BV.ext({
	init:function(){
		this._super();
		this.vType = 'remote';
		this.rmId = this.rm;
		//this.vs = [];
		tt.vf.add(this);
	},
	v:function()
	{
		new tt.Ajax().setConfig(this.ajaxConf).submit();
		return this.result;
	},
	rm:function() {
		tt.vf.rm([this]);
		tt.vf.rm(this.vs);
	},
	add:function() {
		tt.vf.add(this);
	},
	/**
	 * 
	 * @param {} ajaxConf 形如：
	 * {
  		url:"xx.do",       //请求的url
  		form: formElement, //要提交的form
  		method:"post",    //post/get。默认为post
  		async:false,    //true/false。默认为true
  		data:[{name:"e", value:"ee"},{name:"w", value:"ww"}],
  		queryStringData: "e=eee&a=ddd&c=kkkk",
        encoding:     'UTF-8',
        requestHeaders: {"name1":"value1","":""},
        callbackParams: {},  //回调方法的第二个参数
	  }
	 */
	set:function(ajaxConf)
	{
		this.ajaxConf = ajaxConf;
		this.ajaxConf.async = false;
		this.ajaxConf.thisObj = this;
		this.ajaxConf.thisObjForSendError = this;
		this.ajaxConf.onSendError = function() {
			this.result = false;
			tt.vf.rm(this.vs);
			alert(tt.ajaxError); //"向服务器发送请求时出现异常，请检查本机与服务器的网络是否通畅!"
		};
		this.ajaxConf.success = function(xmlHttpResponse,
				callbackParams) {
			tt.vf.rm(this.vs);
			var responseObj;
			if (!xmlHttpResponse.responseText){
				this.result = false;
				this.setI18(tt.ajaxError1); //"从服务器端获取数据失败!";
				return;
			}
			try {
				responseObj = eval("(" + xmlHttpResponse.responseText + ")");
			} catch(e){
				this.result = false;
				this.setI18(tt.ajaxError2); //"服务器异常!";
				return;
			}
			
			/**
			 * {
			 * "name1":{'result':true, 'msg':'验证成功'},
			 * "name2":{'result':false, 'msg':'验证失败'}
			 * }
			 */
			this.vs = [];
			for (var item in responseObj) {
				var onlyShow = new tt.OnlyShow();
				this.vs.push(onlyShow);
				onlyShow.result = responseObj[item].result;
				onlyShow.msg = responseObj[item].msg;
				var msgId = responseObj[item].msgId;
				
				var f1;
				if (item.indexOf("id:") != -1) {
					f1 = new tt.Field("", "", item.substring(3)).setMsgId(msgId);
					onlyShow.add(f1);
				}
				else {
					f1 = new tt.Field("", item).setMsgId(msgId);
				}
				onlyShow.add(f1);
			}
		};
		return this;
	},
	attachE:function(e){}//服务端验证，不允许添加onchange等事件，以影响性能。
});
tt.CV = tt.BV.ext({
	/**
	 * @param cmpType
	 *            比较类型 'n':数字比较; 'v':字符串比较
	 * @param oper
	 *            比较符,可以为'<','<=','==','!=','>','>='
	 * @param fOrV
	 *            被比较的字段或值
	 * @param showCmpVal
	 *            是否显示被比较的值 举例: var field1 = new tt.Field("用户名", "loginName"); new
	 *            tt.CV().set('n','>',field1);//要求添加此验证器的字段必须大于field1的值
	 */
	set : function(cmpType, oper, fOrV, showCmpVal) {
		this.cmpType = cmpType;
		this.oper = oper;
		this.cmpF = null;   //comparedField
		this.cmpV = null;
		this.i18ps[0] = tt.operMap[this.oper];
		this.showCmpVal = true;  //默认为true
		if (arguments.length == 4) {
			this.showCmpVal = showCmpVal;
		}
		if (["string",'number'].ttCons(typeof fOrV)) {
			this.cmpV = fOrV;
			if (typeof fOrV == 'number'){
				this.cmpType = 'n';
			}else if (typeof fOrV == "string" ){
				this.cmpType = 'v';
			}
		} else {
			this.cmpF = fOrV;
			this.i18ps[1] = fOrV.label;
		}
		
		if (!this.showCmpVal) {
			this.i18n = tt.i18Compare;
		} else if (cmpType == 'n' && this.cmpF) {
			this.i18n = tt.i18NumCompare;
		} else if (cmpType == 'v' && this.cmpF) {
			this.i18n = tt.i18StrCompare;
		} else if (cmpType == 'n' && this.cmpV) {
			this.i18n = tt.i18NumValueCompare;
		} else if (cmpType == 'v' && this.cmpV) {
			this.i18n = tt.i18StrValueCompare;
		} else {
			alert("error occured:talent-validate'tt.CV not support the compare type '" + cmpType + "'");
		}
		return this;
	},
	v : function(str, index) {
		if (!str) {
			return true;
		}

		var cmpV;
		if (this.cmpV) {
			cmpV = this.cmpV;
			if (this.showCmpVal) {
				this.i18ps[1] = "<span class='talentComparedValue'>"
						+ cmpV + "</span>";
			} else {
				this.i18ps[2] = "";
			}
		} else {
			var es = this.cmpF.es;
			if (es.length == 0){
				return true;
			}
			
			cmpV = (es[index])
					? es[index].value
					: es[es.length - 1].value;
			if (cmpV == null || cmpV == "") {
				return true;
			}
		
			if (this.showCmpVal) {
				this.i18ps[2] = "<span class='talentComparedValue'>" + cmpV + "</span>";
			} else {
				this.i18ps[2] = "";
			}
		}

		var s;
		if (this.cmpType == "n")// 是数字比较
		{
			var numV = tt.vf.num;
			if ((!numV.v(str)) || (!numV.v(cmpV+"")))// 不是数字
			{
				return true;  //不是数字则留给数字验证器去验证
			}

			s = str + this.oper + cmpV;
		} else if (this.cmpType == "v")// 是字符串比较
		{
			s = "\"" + str + "\"" + this.oper + "\"" + cmpV + "\"";
		}
		return eval(s) == true;
	}
});
tt.VF = tt.C.ext({
	init : function() {
		this.vArr = [];  //validatorArray
		this.ip = new tt.RV().set(/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/).setI18(tt.i18Ip);
		this.email = new tt.RV().set(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).setI18(tt.i18Email);
		this.postcode = new tt.RV().set(/^[1-9]\d{5}(?!\d)$/).setI18(tt.i18Postcode);
		this.tel = new tt.RV().set(/^\d{3}-\d{8}$|^\d{4}-\d{7}$/).setI18(tt.i18Tel);
		this.idcard = new tt.RV().set(/^\d{15}$|^\d{17}[\d,x,X]{1}$/).setI18(tt.i18Idcard);
		this.req = new tt.ReqV();
		this.int = new tt.IV();  
		this.num = new tt.NV();
		
		this.msgs = [];
		this.seq = 0;            //序列号
	},
	rm: function(validatorArr){
		if(validatorArr) {
			for (var i = 0; i < this.vArr.length; i++){
				for (var j = 0; j < validatorArr.length; j++){
					if(validatorArr[j] == this.vArr[i]){
						this.vArr[i].rmAll();
						this.vArr[i] = null;
					}
				}
			}
		}
		this.vArr = tt.rmNull(this.vArr);
	},
	/**
	 * 移除所有验证器
	 */
	rmAll : function() {
		for ( var i = 0; i < this.vArr.length; i++) {
			this.vArr[i].isInFactory = false;
			this.vArr[i].rmAll();
		}
		this.vArr = [];
	},
	/**
	 * 用法:tt.vf.add(validator1, validator2,validator3... ...
	 * validatorx);
	 */
	add : function() {
		var startIndex = this.vArr.length;
		for ( var i = 0; i < arguments.length; i++) {
			this.vArr[i + startIndex] = arguments[i];
		}
	},
	vBf : function(f) {
		var ret = true;
		this.invalidEs = [];
		this.msgs = [];
		for (var i = 0; i < this.vArr.length; i++) {
			if (!this.vArr[i].vBf(f)) {
				ret = false;
			}
		}
		return ret;
	},
	resizeWindow : function() {
		for (var i = 0; i < tt.vf.msgs.length; i++) {
			tt.moveToPos(tt.vf.msgs[i].msg, tt.vf.msgs[i].ele);
		}
	}
});
tt.vf = new tt.VF();
tt.Util.addEventHandler(window, "resize", tt.vf.resizeWindow);
