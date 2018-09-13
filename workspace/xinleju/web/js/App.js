var h = screen.height;
var w = screen.width;
var opts = 'height=' + h + ',width=' + w + ',top=' + (screen.height - h) / 2 + ',left=' + (screen.width - w) / 2 + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no';

function OpenWin(url) {
    var dt = new Date();
    var iWidth = window.screen.availWidth;
    var iHeight = window.screen.availHeight;
    var url = url + ((url.indexOf('?') == -1) ? '?' : '&') + 't=' + dt.getTime();
    window.open(url, '_blank', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=yes,width='+iWidth+',height='+iHeight);
   // window.open(url,"_blank","width:300, height:300,help: no, status: no,top:auto,left:auto");
   //window.open(url);
}

function openWindow(url, title, iWidth, iHeight) {
	var dt = new Date();
	var url = url + ((url.indexOf('?') == -1) ? '?' : '&') + 't=' + dt.getTime();
	var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
	var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
	var win = window.open(url, title, "width=" + iWidth + ", height=" + iHeight + ",top=" + iTop + ",left=" + iLeft + ",toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no,alwaysRaised=yes,depended=yes");
}

function getParameter(param) {
    var args = getArgs();
    return args == null ? null : args[param];
}

function getArgs() {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args;
}
//--Checkbox-------------------------------------------------------------------------------------------------------------------------------------------------------
function CheckAll(checkname) {
    var o = document.getElementsByName(checkname);
    for (i = 0; i < o.length; i++) {
        o[i].checked = true;
    }
    
}
function UnCheckAll(checkname) {
    var o = document.getElementsByName(checkname);
    for (i = 0; i < o.length; i++) {
        o[i].checked = false;
    }
    
}
function AutoCheckAll(checkname,e) {
	e = window.event || e;
	var srcElement = e.srcElement || e.target;
    var o = document.getElementsByName(checkname);
    for (i = 0; i < o.length; i++) {
        o[i].checked = srcElement.checked;
    }
}

//--普通文本框-------------------------------------------------------------------------------------------------------------------------------------------------------
var getInputValue = function(id) {
	var valueStr = $("#" + id).val();
	if (isEmpty(valueStr)){
		valueStr = "";
	}
    return valueStr;
};
var setInputValue = function(id, val) {
    $("#" + id).val(val);
};
//--普通下拉框-------------------------------------------------------------------------------------------------------------------------------------------------------
var getSelectValue = function(id) {
    var value = $("#" + id).val();
    return value == null ? "" : value;
};
var setSelectValue = function(id, val) {
    $("#" + id).val(val);
};
//--普通CheckBox-------------------------------------------------------------------------------------------------------------------------------------------------------
var getCheckBoxValue = function(id) {
    return $("#" + id).prop("checked");
};
var setCheckBoxValue = function(id, val) {
    $("#" + id).attr("checked", (val == 'true' || val == 1 || val == 'yes' || val == 'y' || val == '1') ? true : false);
};
//--普通单选框(Radio)-------------------------------------------------------------------------------------------------------------------------------------------------------
var getRadioValue = function(name) {
	var valueStr = $("input[name='" + name + "']:checked").val()
	if (isEmpty(valueStr)){
		valueStr = "";
	}
    return valueStr;
};
var setRadioValue = function(name, val) {
    $("input[name=" + name + "]").prop("checked", false);
    $("input[name=" + name + "][value='" + val + "']").prop("checked",true);
};

//--多选CheckBox-------------------------------------------------------------------------------------------------------------------------------------------------------
var getCheckBoxValues = function(name) {
    var o = document.getElementsByName(name);
    
    var cpList = [];
    for (var jj = 0; jj < o.length; jj++) {
        if (o[jj].checked) {
            cpList.push(o[jj].value);
        }
    }
    
    var val_string = "";
    if (cpList.length > 0) val_string = cpList.join(";");
    
    return val_string;
};
var getCheckBoxValuesByDocument = function(name, objDocument) {
    var o = objDocument.getElementsByName(name);
    
    var cpList = [];
    for (var jj = 0; jj < o.length; jj++) {
        if (o[jj].checked) {
            cpList.push(o[jj].value);
        }
    }
    
    var val_string = "";
    if (cpList.length > 0) val_string = cpList.join(";");
    
    return val_string;
};
var setCheckBoxValues = function(name, val) {
    var checkboxes = document.getElementsByName(name);
    for (var jj = 0; jj < checkboxes.length; jj++) {
        checkboxes[jj].checked = false;
    }
    if (val != null) {
        var vals = val.split(";");
        if (vals != null && vals.length > 0) {
            
            for (var jj = 0; jj < checkboxes.length; jj++) {
                for (var kk = 0; kk < vals.length; kk++) {
                    if (checkboxes[jj].value == vals[kk]) {
                        checkboxes[jj].checked = true;
                        break;
                    }
                }
            }
        }
    }
};
//--多选下拉框-------------------------------------------------------------------------------------------------------------------------------------------------------
function getMSelectValue(id) {
    var val_list = "";
    
    var i = 0;
    $("#" + id + " option").each(function() {
        var val = $(this).val() + ":" + $(this).text();
        if (i == 0) {
            val_list = val;
        }
        else {
            val_list = val_list + ";" + (val);
        }
        i++;
    });
    
    return val_list;
}

var setMSelectValue = function(id, val_list) {
	
    jsRemoveAllSelect(id);
    if (!isEmpty(val_list)) {
        var vals = val_list.split(";");
        for (var i = 0; i < vals.length; i++) {
            var val = vals[i].split(":");
            jsAddItemToSelect(id, val[1], val[0]);
        }
    }
};

//--清空下拉框-------------------------------------------------------------------------------------------------------------------------------------------------------
var removeSelectValue = function(id, appendEmpty) {
    $("#" + id).empty();
    if (appendEmpty) {
        $("#" + id).append("<option value=''></option>");
    }
};
//--清空多选下拉框指定的数据
var removeMSelectValue = function(id, val_list) {
    $("#" + id).empty();
    var select = $("#" + id);
    
    if (val_list && val_list != null) {
        var vals = val_list.split(";");
        for (var i = 0; i < vals.length; i++) {
            var val = vals[i].split(":");
            $("#" + id + " option[value='" + val[0] + "']").remove();
        }
    }
};
//AJAX下拉框
var init_select = function(id,value,url,params){
	$.post(url, params , function(data) {
		var _list = $("#" + id);
		$(data).each(function(i){
			if(value == data[i].value){
				var str = "<option selected='selected' value='"+data[i].label+"'>"+data[i].value+"</option>";
				user_list.prepend(str); 
			}
			else{
				var str = "<option value='"+data[i].label+"'>"+data[i].value+"</option>";
				user_list.prepend(str); 
			}
			
		});	
	});
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------


// ChangeSelect(上一级的值,下一级Select控件的ID值,下一级Select控件要选中的值(即value而非text),数据源数组名,默认显示字符(如:请选择...如果不写的话会用默认值填充))，第一级的上级值为0
var ChangeSelect = function(ParentValue, NextId, NextSelectedValue, ArrObj, DefaultStr) {
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
    for (var i = 0; i < ArrObj.length; i++) {
        if (i == 0) {
            if (DefaultStr == undefined) DefaultStr = "==请选择==";
            StrObj.options[StrObj.length] = new Option(DefaultStr, "");
        }
        if (ArrObj[i][1] == ParentValue) {
            StrObj.options[StrObj.length] = new Option(ArrObj[i][0], ArrObj[i][ArrNum]);
        }
    }
    // 选中列表内某一项
    for (var i = 0; i < StrObj.length; i++) {
        if (StrObj.options[i].value == NextSelectedValue) {
            StrObj.options[i].selected = true;
        }
    }
    
    // 激发下一级的onchange事件以实现多级级联
    StrObj.onchange();
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

// 0.判断select选项中 是否存在Value="paraValue"的Item
function jsSelectAllItem(objSelect) {
//    var isExit = false;
    for (var i = 0; i < objSelect.options.length; i++) {
        objSelect.options[i].selected = true;
    }
}
// 1.判断select选项中 是否存在Value="paraValue"的Item
function jsSelectIsExitItem(id, value) {
    
    try {
        return $("#" + id + " option[value='" + value + "']").length > 0;
    }
    catch (e) {
        alert(e);
    }
    
    return false;
    
}

// 2.向select选项中 加入一个Item
function jsAddItemToSelect(id, objItemText, objItemValue) {
    // 判断是否存在
    if (!jsSelectIsExitItem(id, objItemValue)) {
        $("#" + id).append("<option value='" + objItemValue + "'>" + objItemText + "</option>");
    }
}

// 3.从select选项中 删除一个Item
function jsRemoveItemFromSelect(id, objItemValue) {
    $("#" + id + " option[value='" + objItemValue + "']").remove();
}

// 4.删除select中选中的项
function jsRemoveSelectedItemFromSelect(id) {
    
    $("#" + id + " option:selected").each(function() {
        $(this).remove();
    });
}

// 5.删除select中的项
function jsRemoveAllSelect(id) {
    $("#" + id).empty();
}
// 6.选中select中的项
function jsSelected(id, value) {
    var objSelect = $("#" + id);
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
    catch (e) {}
}

function isEmpty(value) {
    return value == 'undefined' || value == null || value == '' || !value;
}
function isNotEmpty(value) {
    return !isEmpty(value);
}

//--Iframe自适应---------------------------------------------------------------------------------------------------------------------------------------------------------

var setAutoHeight = function(iframeID, _iframe, fixNum) {
	if (!_iframe || _iframe && (_iframe.readyState == "complete")) {
		  var mainheight = $("#" + iframeID).contents().find("body").height() + (fixNum ? fixNum : 0);
	     $("#" + iframeID).height(mainheight);
	}
};
var setClientHeight = function(iframeID, _iframe, fixNum) {
	
    if (!_iframe || _iframe && (_iframe.readyState == "complete")) {
        var mainheight = $(window).height() - $("#" + iframeID).offset().top + (fixNum ? fixNum : 0);
        $("#" + iframeID).height(mainheight);
    }
};
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
	try {
		if (pTar && !window.opera){ 
			pTar.style.display="block" ;
			if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){ 
				//ns6 syntax 
				pTar.height = pTar.contentDocument.body.offsetHeight +20 +extHeight;
				console.log(pTar.contentDocument.body.offsetHeight,'ns6',iframe);
			} 
			else if (pTar.Document && pTar.Document.body.scrollHeight){ 
				//ie5+ syntax 
				pTar.height = pTar.Document.body.scrollHeight +extHeight;
				console.log(pTar.Document.body.scrollHeight,'ie5',iframe);
			}
		} 
	}catch (e) {
		// TODO: handle exception
	}  
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
 * 替换URL参数
 * @param url
 * @param paramName
 * @param replaceWith
 * @returns
 */
function replaceParamVal(url,paramName,replaceWith) {
    var re=eval('/('+ paramName+'=)([^&]*)/gi');
    var url = url.replace(re,paramName+'='+replaceWith);
    return url;
}


/** 
 * 向上移动选中的option 
 */  
function upSelectedOption(where){ 
    if(null == $('#'+where).val()){  
        alert('请选择一项');  
        return false;  
    }  
    //选中的索引,从0开始  
    var optionIndex = $('#'+where).get(0).selectedIndex;  
    //如果选中的不在最上面,表示可以移动  
    if(optionIndex > 0){  
    	$('#'+where +' option:selected').each(function(i){
            $(this).prev().before($(this));  //上移
    	});
    }  
}  
  
/** 
 * 向下移动选中的option 
 */  
function downSelectedOption(where){  
    if(null == $('#'+where).val()){  
        alert('请选择一项');  
        return false;  
    }  
    //索引的长度,从1开始  
    var optionLength = $('#'+where)[0].options.length; 
    //选中的索引,从0开始  
    var optionIndex = $('#'+where).get(0).selectedIndex;  
    //如果选择的不在最下面,表示可以向下  
    if(optionIndex < (optionLength-1)){  
    	$('#'+where +' option:selected').each(function(i){
            $(this).next().after($(this));  
            $(this).insertAfter($(this).next());  //下移
    	});
    }  
}  
  
/** 
 * 移除选中的option 
 */  
function removeSelectedOption(where){  
    if(null == $('#'+where).val()){  
        alert('请选择一项');  
        return false;  
    }  
    $('#'+where +' option:selected').remove();  
}  
  
/** 
 * 获取所有的option值 
 */  
function getSelectedOption(where){  
    //获取Select选择的Text  
    var checkText = $('#'+where).find('option:selected').text();  
    //获取Select选择的Value  
    var checkValue = $('#'+where).val();  
    //alert('当前被选中的text=' + checkText + ', value=' + checkValue);  
    var ids = '';  
    var options = $('#'+where)[0].options;  
    for(var i=0; i<options.length; i++){  
        ids = ids + '`' + options[i].id;  
    }  
    alert('当前被选中的编号顺序为' + ids);  
}  
  
/** 
 * 添加option 
 */  
function addSelectedOption(){  
    //添加在第一个位置  
    $('#'+where).prepend('<option value="hbin" id="where06">Haerbin</option>');  
    //添加在最后一个位置  
    $('#'+where).append('<option value="hlj" id="where07">HeiLongJiang</option>');  
    $('#'+where).attr('size', 7);  
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
	},
	mateType : function(){
		var u = window.navigator.userAgent;
		//是否iPad 
		if (isNotEmpty(u) && u.indexOf('iPad') > -1){
			return 2;
		//是否为移动终端 
		} else if(!!u.match(/AppleWebKit.*Mobile.*/)){
			return 1;
		//pc
		} else {
			return 0;
		}
	}
};