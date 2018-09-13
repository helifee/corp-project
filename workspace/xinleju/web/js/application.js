function Application() {

}

// 以下3个常量,注意和Constan.java类中保存保持一致
Application.CONST_SA = "sa";
Application.CONST_ORGN_CODE_ROOT = "tele-hot-dev";
Application.CONST_ZONE_CODE_ROOT = "tele-hot";
Application.CONST_SP_MSG = "系统建议的操作步骤是输入完毕先点击保存，等确认无误后再点击提交。您确定要提交吗？";
// 首页上面横条显示子系统
// Application.TBAR_APPS =
// [['系统管理','system','true','app!main.do',],['权利监察',function(){window.open('1.html')},null,'']];
Application.TBAR_APPS = [];
// 是否显示'区域显示'
Application.ZONE_SWITCHER_ENABLED = false;
// 首页Tab地址
Application.INDEX_PAGE_URL = 'app!main.do';
//统计分析统一的开始时间注意和Constan.java类中保存保持一致
Application.STATISTIC_START_DATE = 2014;


// 以下是javascript函数
function isEmpty(value) {
    return value == 'undefined' || value == null || value == '' || !value;
}
function isNotEmpty(value) {
    return !isEmpty(value);
}

function getInputValue(id) {
    var input = eval('document.all.' + id);
    return input.value;
}
function setInputValue(id, value, defaultValue) {
    var input = eval('document.all.' + id);
    var v = isEmpty(value) && isNotEmpty(defaultValue) ? defaultValue : value;
    input.value = v;
}

function getSelectValue(id, value) {
    var select = eval('document.all.' + id);
    return select.value;
}
function setSelectValue(id, value, defaultValue) {
    var select = eval('document.all.' + id);
    var v = isEmpty(value) && isNotEmpty(defaultValue) ? defaultValue : value;
    jsSelected(select, v);
}

function getMSelectValue(id) {
    var select = eval('document.all.' + id);

    var o = select.options || select.items;
    var val_list = "";

    for (var i = 0; i < o.length; i++) {
        var val = (o[i].value + ":" + o[i].text);
        if (i == 0) {
            val_list = val;
        }
        else {
            val_list = val_list + ";" + (val)
        }
    }

    return val_list;
}
function setMSelectValue(id, val_list) {

    var select = eval('document.all.' + id);
    jsRemoveAllSelect(select);
    if (!isEmpty(val_list)) {
        var vals = val_list.split(";");
        for (var i = 0; i < vals.length; i++) {
            var val = vals[i].split(":");
            jsAddItemToSelect(select, val[1], val[0]);
        }
    }
}

function removeMSelectValue(id, val_list) {

    var select = eval('document.all.' + id);
    if (!isEmpty(val_list)) {
        var vals = val_list.split(";");
        for (var i = 0; i < vals.length; i++) {
            var val = vals[i].split(":");
            jsRemoveItemFromSelect(select, val[0]);

        }
    }
}

function getCheckBoxValue(id, value) {
    var checkbox = eval('document.all.' + id);
    return checkbox.checked ? "1" : "0";
}

function setCheckBoxValue(id, value, defaultValue) {
    var checkbox = eval('document.all.' + id);
    if (checkbox) {
        var v = isEmpty(value) && isNotEmpty(defaultValue) ? defaultValue : value;
        checkbox.checked = v && (v == 1 || v == 'true' || v == 'yes' || v == 't' || v == 'y')
    }
    else {
        // alert(id);
    }
}

function getCheckBoxValues(name) {
    var o = document.getElementsByName(name);
    var cpList = [];
    var jj;

    for (jj = 0; jj < o.length; jj++) {
        if (o[jj].checked) {
            cpList.push(o[jj].value);
        }
    }
    var val_string = "";
    if (cpList.length > 0)
        val_string = cpList.join(";");

    return val_string;
}
function setCheckBoxValues(name, val_string) {
    if (val_string != null) {
        var vals = val_string.split(";");
        if (vals != null && vals.length > 0) {
            checkByValue(name, vals);
        }
    }
}

function checkByValue(checkname, values) {

    if (values == null || values.length == 0)
        return;
    var o = document.getElementsByName(checkname);

    if (o.length >= 1) {
        for (i = 0; i < o.length; i++) {
            o[i].checked = false;
            var v, j;
            for (j = 0; j < values.length; j++) {
                if (values[j] == o[i].value) {
                    o[i].checked = true;
                    break;
                }
            }
        }
    }
    else {
        // o.checked = true;
    }
}
function getRadioValue(name) {
    var radioList = document.getElementsByName(name);

    for (var j = 0; j < radioList.length; j++) {
        if (radioList[j].checked == true) {
            return radioList[j].value;
        }
    }
}
function setRadioValue(name, value) {
    var radioList = document.getElementsByName(name);

    for (var j = 0; j < radioList.length; j++) {
        if (radioList[j].value == value) {
            radioList[j].checked = true;
            break;
        }
    }
}
// 0.判断select选项中 是否存在Value="paraValue"的Item
function jsSelectAllItem(objSelect) {
    var isExit = false;
    for (var i = 0; i < objSelect.options.length; i++) {
        objSelect.options[i].selected = true;
    }
}
// 1.判断select选项中 是否存在Value="paraValue"的Item
function jsSelectIsExitItem(objSelect, objItemValue) {
    var isExit = false;
    for (var i = 0; i < objSelect.options.length; i++) {
        if (objSelect.options[i].value == objItemValue) {
            isExit = true;
            break;
        }
    }
    return isExit;
}

// 2.向select选项中 加入一个Item
function jsAddItemToSelect(objSelect, objItemText, objItemValue) {
    // 判断是否存在
    if (jsSelectIsExitItem(objSelect, objItemValue)) {
    }
    else {
        var varItem = new Option(objItemText, objItemValue);
        objSelect.options.add(varItem);
    }
}

// 3.从select选项中 删除一个Item
function jsRemoveItemFromSelect(objSelect, objItemValue) {
    // 判断是否存在
    if (jsSelectIsExitItem(objSelect, objItemValue)) {
        for (var i = 0; i < objSelect.options.length; i++) {
            if (objSelect.options[i].value == objItemValue) {
                objSelect.options.remove(i);
                break;
            }
        }
    }
    else {
    	
    }
}

// 4.删除select中选中的项
function jsRemoveSelectedItemFromSelect(objSelect) {
    var length = objSelect.options.length - 1;
    for (var i = length; i >= 0; i--) {
        if (objSelect[i].selected == true) {
            objSelect.options[i] = null;
        }
    }
}

// 5.删除select中的项
function jsRemoveAllSelect(objSelect) {
    var length = objSelect.options.length - 1;
    for (var i = length; i >= 0; i--) {
        objSelect.options[i] = null;
    }
}
// 6.选中select中的项
function jsSelected(objSelect, value) {

    var length = objSelect.options ? objSelect.options.length - 1 : objSelect.length;

    for (var i = length; i >= 0; i--) {
        if (objSelect.options && objSelect.options[i].value == value) {
            objSelect.options[i].selected = true;
            break;
        }
        else if (objSelect.item(i) && objSelect.item(i).value == value) {
            objSelect.item(i).selected = true;
            break;
        }
    }
}
// Select左右选择
function moveOption(e1, e2) {
    try {
        for (var i = 0; i < e1.options.length; i++) {
            if (e1.options[i].selected) {
                var e = e1.options[i];
                e2.options.add(new Option(e.text, e.value));
                e1.remove(i);
                i = i - 1;
            }
        }
    }
    catch (e) {
    }
}

function setCookie(name, value, Days, path, domain, secure) {
    var exp = new Date(); // new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

    document.cookie = name + "=" + escape(value) + ((exp) ? "; expires=" + exp.toGMTString() : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");

}
function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix);

    if (start == -1) {
        return null;
    }

    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }

    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}

function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function getArgs() {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1)
            continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args;
}

function getParameter(param) {
    var args = getArgs();
    return args == null ? null : args[param];
}

function getObject(objectId) {
    if (document.getElementById && document.getElementById(objectId)) {
        // W3C DOM
        return document.getElementById(objectId);
    }
    else if (document.all && document.all(objectId)) {
        // MSIE 4 DOM
        return document.all(objectId);
    }
    else if (document.layers && document.layers[objectId]) {
        // NN 4 DOM.. note: this won't find nested layers
        return document.layers[objectId];
    }
    else {
        return false;
    }
}

function showOne(prefix, sid) {
    var all_ele = document.body.all;
    var menu = prefix + sid;
    var current_menu = all_ele.item(menu);

    for (var i = 0; current_menu != null && all_ele != null && i < all_ele.length; i++) {
        if (all_ele(i).id) {
            if (all_ele(i).id.substr(0, prefix.length) == prefix) {
                if (all_ele(i).id != menu) {
                    all_ele(i).style.display = "none";
                }
                else {
                    all_ele(i).style.display = "block";
                }
            }
        }
    }
}

function isCheck(checkname){
	if(!$("[name="+checkname+"]:checked").length){
		alert("请选择要打包下载的文件");
		return false;
	}
	
	return true;
}

function CheckAll(checkname) {
    $("[name="+checkname+"]").each(function(i,selectObject){
		selectObject.checked = true;
		//selectObject.click();
	});
}
function UnCheckAll(checkname) {
    $("[name="+checkname+"]").each(function(i,selectObject){
		selectObject.checked = false;
		//selectObject.click();
	});

}

function AutoCheckAll(checkname,elemObject,e) {
	if(e){
		var event1 = $.event.fix(e);
		var elem = event1.target; 
		$("[name="+checkname+"]").each(function(i,selectObject){
			selectObject.checked = !(elem.checked);
			selectObject.click();
		});
	}
	else{
		$("[name="+checkname+"]").each(function(i,selectObject){
			selectObject.checked = (elemObject.checked);
		});
	}
}

function AutoCheckAllByEvent(checkname,e) {
  e = e?e:(window.event?window.event:null);
  var myevent=e.srcElement?e.srcElement:e.target; 
  var o = document.getElementsByName(checkname);
  for (i = 0; i < o.length; i++){
	  if(!o[i].disabled){
		  o[i].checked = myevent.checked;
	  }
	
	  
  }
    
  
}

function changeCheckAll(checkname,name) {
    var o = document.getElementsByName(checkname);
    var j=0;
    for (i = 0; i < o.length; i++){
      if(o[i].checked==true){
        j++
        }
      }
      if(j==o.length){
         document.getElementById(name).checked=true;
      }else
      {
        document.getElementById(name).checked=false;
      }
}

function openwindow(url, name, iWidth, iHeight,scroll) {
	if (isEmpty(iWidth)){
		iWidth = 0;
	}
	if (isEmpty(iHeight)){
		iHeight = 0;
	}
	if(iHeight==0){
		iHeight = window.screen.availHeight - 100;
	}
	if(iWidth==0){
		iWidth = window.screen.availWidth - 100;
	}
	var iTop = (window.screen.availHeight - 30 - iHeight) / 2 - 10; // 获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth - 10 - iWidth) / 2 - 10; // 获得窗口的水平位置;
	window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars='+(scroll?scroll:'yes')+',resizable=yes,location=no,status=no');
}


Date.prototype.format = function(format) {

	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"H+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
		// millisecond
	}
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

function randomCode(prefix, len) {
    return prefix + randomCode(len);
}
function randomCode(len) {
    var maxNum = 10;
    var i; // 生成的随机数
    var count = 0; // 生成的密码的长度
    /*
     * char[] str = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
     * 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
     * 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };
     */

    var str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    var rt = "";
    while (count < len) {
        // 生成随机数，取绝对值，防止生成负数

        i = parseInt(Math.random() * 10); // 生成的数最大为36-1

        if (i >= 0 && i < str.length) {
            rt += str[i];// pwd.append();
            count++;
        }
    }

    return rt;
}

// ChangeSelect(上一级的值,下一级Select控件的ID值,下一级Select控件要选中的值(即value而非text),数据源数组名,默认显示字符(如:请选择...如果不写的话会用默认值填充))，第一级的上级值为0
function ChangeSelect(ParentValue, NextId, NextSelectedValue, ArrObj, DefaultStr) {
    StrObj = eval(document.getElementById(NextId));
    StrObj.length = 0;
    // 判断它是二级数据源，还是三级
    if (ArrObj.length > 0) {
        if (ArrObj[0].length == 2) {
            ArrNum = 0;
        }
        else {
            ArrNum = 2;
        }
    }
    // 显示所有列表
    for (i = 0; i < ArrObj.length; i++) {
        if (i == 0) {
            if (DefaultStr == undefined)
                DefaultStr = "==请选择==";
            StrObj.options[StrObj.length] = new Option(DefaultStr, "");
        }
        if (ArrObj[i][1] == ParentValue) {
            StrObj.options[StrObj.length] = new Option(ArrObj[i][0], ArrObj[i][ArrNum]);
        }
    }
    // 选中列表内某一项
    for (i = 0; i < StrObj.length; i++) {
        if (StrObj.options[i].value == NextSelectedValue) {
            StrObj.options[i].selected = true;
        }
    }

    // 激发下一级的onchange事件以实现多级级联
    StrObj.onchange();
}

//字数计算
function countTextLength(obj, max, spanId) {
    var maxLength = max;
    var nowLength = obj.value.length;
    var oldTxtaDiv = document.getElementById(spanId).innerHTML;
    var allowableLength = 0;
    if (nowLength > maxLength) {
        if (oldTxtaDiv == 1) {
            obj.value = (obj.value.substring(0, (maxLength - 1)));
            allowableLength = 0;
        }
        else {
            obj.value = (obj.value.substring(0, maxLength));
        }
    }
    else {
        allowableLength = maxLength - nowLength;
    }
    document.getElementById(spanId).innerHTML = allowableLength;
}

function openModalDialog(width,height,URL,scroll){
    var obj = new Object();
    if(width==''||width==null){
        width = 900;
    }
    if(height==''||height==null){
        height = 420;
    }
    obj.height=height;
    var dt = new Date().getTime();
    if(URL!=null&&URL.indexOf('dt')<0){
        if(URL.indexOf('?')>-1){
            URL += "&dt="+dt;
        }else{
            URL += "?dt="+dt;
        }
    }
    var returnValue = window.showModalDialog(URL,self,'dialogWidth='+width+'px;dialogHeight='+height+'px;scroll='+scroll);
    if("refresh"==returnValue){
        if(document.getElementById('linkObject')==null){
            location.href =location.href;
        }else{
            document.getElementById('linkObject').click();
        }
    }
}
function iframeResize(iframe) {
    try {
        //var iframe = document.getElementById("contentFrame"); //("contentFrame");
        var idocumentElement = iframe.contentWindow.document.documentElement;
        if (idocumentElement.scrollHeight > 560) {
            iframe.height -= 5;
            iframe.height = idocumentElement.scrollHeight;
        }
        else {
            iframe.height = idocumentElement.scrollHeight;
        }
    }
    catch (e) {
        window.status = 'Error: ' + e.number + '; ' + e.description;
    }
}

function iframeChangeSize(iframe,extHeight) {
	if(extHeight==null){
		extHeight = 0;
	}
	var pTar = null; 
	if (document.getElementById){ 
		pTar = document.getElementById(iframe); 
	} 
	else{ 
		eval('pTar = ' + iframe + ';'); 
	} 
	if (pTar && !window.opera){ 
		pTar.style.display="block" ;
		if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){ 
			//ns6 syntax 
			pTar.height = pTar.contentDocument.body.offsetHeight +20 +extHeight; 
		} 
		else if (pTar.Document && pTar.Document.body.scrollHeight){ 
			//ie5+ syntax 
			pTar.height = pTar.Document.body.scrollHeight +extHeight; 
		}
	}   
}



String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);  
    } else {  
        return this.replace(reallyDo, replaceWith);  
    }  
} 

function pickedFunc(){
	var p,c = $dp.cal;
	p = 'm';
	var flag = "";
	if(c.newdate[p] >= 0 && c.newdate[p] < 15){
		p = '0';
	}else if(c.newdate[p] >= 15 && c.newdate[p] < 45){
		p = '30';
	}else if(c.newdate[p] >= 45 && c.newdate[p] <= 59){
		flag = "1";
		p = '0';
	}
	$dp.cal.newdate.m = p;
	if(flag == "1"){
		p = 'H';
		if((c.newdate[p] + 1) == 24){
			p = '0';
			flag = "2";
		}else{
			p = '' + (c.newdate[p] + 1);
		}
		$dp.cal.newdate.H = p;
	}
	if(flag == "2"){
		p = 'd';
		p = '' + (c.newdate[p] + 1);
		$dp.cal.newdate.d = p;
	}
}

function pickedFuncTime(textId){
	var p,c = $dp.cal;
	p = 'm';
	var flag = "";
	//超过整点没到30的..全都跳到30,超过30的直接进下一个整点
	//alert("1---"+c.newdate[p]);
	if((c.newdate[p] > 0 && c.newdate[p] < 30) || c.newdate[p] == 30){
		p = '30';
		//alert("1-1--"+p);
	}else if((c.newdate[p] > 30 && c.newdate[p] <= 59) || c.newdate[p] == 0){
		flag = "1";
		p = '0';
		//alert("1-2--"+p);
	}
	$dp.cal.newdate.m = p;
	if(flag == "1"){
		p = 'H';
		if((c.newdate[p] + 1) == 24){
			p = '0';
			flag = "2";
		}else{
			p = '' + (c.newdate[p] + 1);
		}
		$dp.cal.newdate.H = p;
	}
	if(flag == "2"){
		p = 'd';
		p = '' + (c.newdate[p] + 1);
		$dp.cal.newdate.d = p;
	}
	//$("#date2").val($dp.cal.getNewDateStr());
	$("#"+textId).val($dp.cal.getNewDateStr());
	//alert("2---"+$dp.cal.getNewDateStr());
	//pickedFunc2($dp,$dp.cal.newdate);
}

function pickedFunc2(dp,date){
	alert(date.H);
	var p,c = dp.cal;
	$dp.cal.date.m = date.m;
	$dp.cal.date.H = date.H;
	$dp.cal.date.d = date.d;
}

function showOrHide(target,imgTarget){
	try{
		var targetObj = document.getElementById(target);
		var imgTarget = document.getElementById(imgTarget);
		if(targetObj.style.display=='none'){
			targetObj.style.display=''
			imgTarget.src = "images/icons/up_list.gif";
			imgTarget.title = "点击隐藏";
		}else{
			targetObj.style.display='none'
			imgTarget.src = "images/icons/down_list.gif";
			imgTarget.title = "点击打开";
		}
	}catch(e){
		
	}
}

function printTable(printObj){
	var bdhtml = window.document.body.innerHTML; //前页面body内容    
	prnhtml = document.getElementById(printObj).innerHTML;
	window.document.body.innerHTML = prnhtml; //截取部分重新赋予给body内容 替换
	window.print(); //打印
	window.document.body.innerHTML = bdhtml; //前页面body内容 
}

function priceAccuracy(priceObj,accuracy){
	if(priceObj!=null){
		//默认为小数点后2位
		if(accuracy==''||accuracy==null||accuracy<0){
			accuracy = 2;
		}
		try{
			var price = "";
			var priceObjVal = priceObj.value;
			if(isNotEmpty(priceObjVal)){
				price = priceObjVal.toString().replaceAll(",","");
			}
			if(price.lastIndexOf(".")>=0){
				var bigValue = price.substring(0,price.lastIndexOf("."));
				var extValue = price.substring(price.lastIndexOf("."),price.lastIndexOf(".")+accuracy+1);
				priceObj.value = bigValue+extValue;
			}else{
				var zeroStr = "00000000000000000000";
				//补足小数
				if(price!=""){
					priceObj.value = price+'.'+zeroStr.substring(0,accuracy);
				}else{
					priceObj.value = "";
				}
			}
		}catch(e){
			
		}
	}
}

function trim(str){ //删除左右两端的空格
	if(null != str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}else{
		return "";
	}
}
function ltrim(str){ //删除左边的空格
	if(null != str){
		return str.replace(/(^\s*)/g,"");
	}else{
		return "";
	}
}
function rtrim(str){ //删除右边的空格
	if(null != str){
		return str.replace(/(\s*$)/g,"");
	}else{
		return "";
	}
}

//将一个值赋给另一Hidden
function corpValToHid(hidId,val){
	$("#"+hidId).val(val);
}

//将一个值赋给另一Hidden
function copyNumberToHid(hidId,val){
	if(!val || isNaN(val)){
		$("#"+hidId).val('');
	}else{
		$("#"+hidId).val(val);
	}
}

//数字带千位符显示
function formatMbcb(id,tag){
	var formatV = $("#"+id).val();
	formatV = formatV.replaceAll(",","");
	if(tag == 'true'){//点击获取焦点的时候重新变回数字
		formatV = formatMbcbByValue(formatV);
		$("#"+id).val(formatV);
	}else if(formatV == 0){
		formatV = "";
		$("#"+id).val(formatV);
	}else{
		$("#"+id).val(formatV);
	}
}

//数字带千位符显示
function formatMbcbByValue(formatV){
	var returnV;
	formatV = formatV.replaceAll(",","");
	if(formatV != 0 && formatV != '0'){//点击获取焦点的时候重新变回数字
		//formatV = formatV.replace(/\b(0+)/gi,"");
		var array = new Array();
		array = formatV.split(".");
		//将整数部分前面的0给去除掉  例如  0002230041 -- > 2230041
		if(array[0] != null || array[0] != ""){
			array[0] = array[0].replace(/\b(0+)/gi,"");
		}
		var re = /(-?\d+)(\d{3})/;
		while(re.test(array[0])){
			array[0] = array[0].replace(re,"$1,$2");
		}
		
		returnV = array[0];
		if(array[0] == null || array[0] == ""){
			returnV = "0";
		}
		if(array.length == 1) {
			returnV += '.00';
		}else{
			for(var i=1;i<array.length;i++){
				if(array[i] == null || array[i] == ""){
					returnV += ".00";
				}else{
					returnV += "."+array[i];
				}
			}
		}
	}else if(formatV == 0){
		returnV = "0.00";
	}else{
		returnV = formatV;
	}
	return returnV;
}

function formatFieldLength(objectId,length){
	if(objectId!='' && length!=''){
		try{
			var objectValue = document.getElementById(objectId).value;
			if(objectValue.length>length){
				document.getElementById(objectId).value = objectValue.substring(0,length);
			}
		}catch(e){
		
		}
	}
}

//判定是否为金额
function checkPrice(price){
  return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(price.toString());
}


var _setAutoHeight = function(iframeID, _iframe, fixNum) {

    var IS_IE = 0 <= navigator.userAgent.indexOf("MSIE");

    if ( _iframe && (IS_IE && _iframe.readyState == "complete"  || !IS_IE)) {
        var mainheight = $("#" + iframeID).contents().find("body").height() + (fixNum ? fixNum : 0);
        $("#" + iframeID).height(mainheight);
       
    }
}
var _setClientHeight = function(iframeID, _iframe, fixNum) {
	
	var IS_IE = 0 <= navigator.userAgent.indexOf("MSIE");
	if ( _iframe && (IS_IE && _iframe.readyState == "complete"  || !IS_IE)) {
        var mainheight = $(window).height() - $("#" + iframeID).offset().top + (fixNum ? fixNum : 0);
        $("#" + iframeID).height(mainheight);
    }
}


var is_zcb_zbfl = function(zbfl){
	return zbfl =='1.1.1.01';
}

function OpenWin(url) {
    var dt = new Date();
    
    var url = url + ((url.indexOf('?') == -1) ? '?' : '&') + 't=' + dt.getTime()
    
    window.open(url);
}

/**
 * 完成本环节
 * @param outCode
 * @param projectId
 * @param refreshWindow
 */
function finishByOutCode(outCode,projectId,refreshWindow){
	$.ajax({
		url : 'flow_base!finishByOutCode.do?d='+new Date().getTime(),
		data : {outCode : outCode, projectId : projectId},
		method : 'post',
		dataType : 'json',
		success : function(response){
			if(response.success){
				alert(response.msg);
				if(refreshWindow){
					refreshWindow.location.href=refreshWindow.location.href;
				}
			}else{
				alert(response.msg);
			}
		},
		error : function(){
			alert("系统或网络错误！");
		}
	})
	
}

/**
 * 计算模式窗口位置
 * @param dialogWidth
 * @param dialogHeight
 * @returns {String}
 */
function calcShowModalDialogLocation(dialogWidth, dialogHeight,scroll) {
    var iWidth = dialogWidth;
    var iHeight = dialogHeight;
    var scroll = scroll;
    if(scroll=='' || scroll==null){
    	scroll = 'no';
    }
    var iTop = (window.screen.availHeight - 20 - iHeight) / 2;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    return 'dialogWidth:' + iWidth + 'px;dialogHeight:' + iHeight + 'px;dialogTop: ' + iTop + 'px; dialogLeft: ' + iLeft + 'px;center:yes;scroll:'+scroll+';status:no;resizable:0;location:no';
}

/**
 * 打开模式窗口
 * @param url
 * @param vArguments
 * @param sFeatures
 */
function showModalDialogOverride(url,vArguments,sFeatures){
	return window.showModalDialog(url,vArguments,calcShowModalDialogLocation(sFeatures.dialogWidth,sFeatures.dialogHeight,sFeatures.scroll))
}

/**
 * 获得带有一个时间差的url,避免缓存
 */
function getReloadUrl(url){
	if(url.lastIndexOf('#')>0){
		url = url.substring(0,url.length-1);
	}
	if(url.indexOf('?')>0){
          url+=("&t="+Math.random());
    }else{
         url+=("?t="+Math.random());
    }
	return url;
}


/**
 * 浏览器版本判断（可扩展）
 */
var Browser = {
		isIE6 : function(){
			var userAgent = window.navigator.userAgent.toLowerCase();
			$.browser.msie6 = !$.browser.msie8 && !$.browser.msie7 && $.browser.msie && /msie 6\.0/i.test(userAgent);
			if($.browser.msie6){
				return true;
			}else{
				return false;
			}
		},
		isIE7 : function(){
			var userAgent = window.navigator.userAgent.toLowerCase();
			$.browser.msie7 = $.browser.msie && /msie 7\.0/i.test(userAgent);
			if($.browser.msie7){
				return true;
			}else{
				return false;
			}
		}
	};


var __setAutoHeight = function(iframeID, fixNum) {
	var mainheight = $("#" + iframeID).contents().find("body").height() - (fixNum ? fixNum : 0);
	$("#" + iframeID).height(mainheight);
};
var __setClientHeight = function(iframeID, fixNum) {
	var mainheight = $(window).height() - ($("#" + iframeID).offset().top + (fixNum ? fixNum : 0));
	$("#" + iframeID).height(mainheight);
};
