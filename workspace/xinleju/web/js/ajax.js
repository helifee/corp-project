function fromSubmit(context, successCallback, errorCallback) {
    loadWin(true, '提示', '数据处理中...');
    context.form('submit', {
        onSubmit: function() {
            var s = $(this).form('validate');
            if(!s)
            {
                loadWin(false);
            }
            return s;
        },
        success: function(result) {
            loadWin(false);
            var result = eval('(' + result + ')');
            if (result.code != 0) {
                $.messager.show({
                    title: '成功提示',
                    msg: result.message,
                    timeout: 3000
                });
                if (successCallback) {
                    successCallback(result);
                }
            } else {
                $.messager.show({
                    title: '失败提示',
                    msg: result.message,
                    timeout: 3000
                });
                if (errorCallback) {
                    errorCallback(result);
                }
            }
        }
    });
}

function ajaxState(url, params, successCallback, errorCallback) {
    loadWin(true, '提示', '数据处理中...');
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'text',
        data: params,
        ontentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            loadWin(false);
            var result = eval('(' + result + ')');
            if (result.code != 0) {
                $.messager.show({
                    title: '成功提示',
                    msg: result.message,
                    timeout: 3000
                });
                if (successCallback) {
                    successCallback(result);
                }
            } else {
                $.messager.show({
                    title: '失败提示',
                    msg: result.message,
                    timeout: 3000
                });
                if (errorCallback) {
                    errorCallback(result);
                }
            }
        }
    });
}

function queryAjax(url, params, successCallback, errorCallback) {
    loadWin(true, '提示', '数据处理中...');
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'text',
        data: params,
        ontentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            loadWin(false);
            var d = null;
            if (result) {
                d = eval('(' + result + ')');
            }
            if (successCallback) {
                successCallback(d);
            }
        }
    });
}

function loadWin(isShow, title, msg) {
    if (!isShow) {
        $.messager.progress('close');
        return;
    }
    var win = $.messager.progress({
        title: title,
        msg: msg
    });
}

function ashow(message) {
    $.messager.show({
        title: '提示',
        msg: message,
        timeout: 3000,
		showType:'slide',
		style:{
			right:'',
			top:document.body.scrollTop+document.documentElement.scrollTop,
			bottom:''
		}
    });
}

function getids(dArray, field) {
    var ids = "";
    for (var i = 0; i < dArray.length; i++) {
        var r = dArray[i];
        if (ids) ids += ',';
        ids += r[field];
    }
    return ids;
}

function dialoginit(option)
{
    if(option)
    {
        var self = $(option.self);
        if(self)
        {
            option.modal = true;
            option.cache = false;
            option.closed = true;
            option.onClose = function () {
                if($('.validatebox-tip'))
                {
                    $('.validatebox-tip').remove();
                }
            };
            if(option.iframe){
                option.content = '<iframe  scrolling="auto" id="iframedialog'+option.self.replace("#","")+'" frameborder="0"  src="' + option.iframe + '" style="width:100%;height:99%;"></iframe>';
            }
            if(option.size == 'max'){
            	option.maximized = true;
            }
            if(option.size == 'big'){
            	option.width = 1024;
            	option.height = 500;
            }else if(option.size == 'middle'){
            	option.width = 600;
            	option.height = 400;
            }else if(option.size == 'small'){
            	option.width = 400;
            	option.height = 300;
            }
            self.dialog(option);
        }
    }
}

function getQueryString(url,name) { 
	var url = "http://localhost:8088/qu/aa?flowCode=1234&bizid=222";
	if(url.indexOf('?')){
		url = url.substr(url.indexOf('?')+1);
	}
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = url.match(reg); 
	if (r != null) return unescape(r[2]); 
	return null; 
} 
