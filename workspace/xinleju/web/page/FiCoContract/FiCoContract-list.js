var companyId;
var query = function(){
	$('#grid').datagrid('options').queryParams = getQueryParams();
	$('#grid').datagrid('reload');
};

function getQueryParams(){
	var params = {};
	params.keyword = $('#keyword').val();
	return params;
}
var editCoContract = function(id){
	dialoginit({
        self: '#newDialog',
        iframe:contextPath+'/FiCoContract!edit.do'+(id != null ? '?id='+id : '') ,
        size:'max',
        modal: true,
        title: '合同信息编辑',
        onClose: function() {
            $(this).dialog('destroy');
        }
    });
   
    $('#newDialog').dialog('open');
};

function closeDialog(dialogId) {
    $('#' + dialogId).dialog('close');
}

var editBusinessObject = function(){
	 var rows = $('#grid').datagrid('getSelections');
	    if(rows == null || rows.length != 1) {
	        ashow('请勾选要修改的一条数据！');
	        return;
	    }
	    newBusinessObject(rows[0].id);
}

$(function(){
	initGrid();	
});

Date.prototype.format = function (format) {  
    var o = {  
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()  
        // millisecond  
    }  
    if (/(y+)/.test(format))  
        format = format.replace(RegExp.$1, (this.getFullYear() + "")  
            .substr(4 - RegExp.$1.length));  
    for (var k in o)  
        if (new RegExp("(" + k + ")").test(format))  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
    return format;  
}  

/** 初始业务对象列表 **/
function initGrid() {
    $('#grid').datagrid({
        url: 'FiCoContract!loadlist.do?companyId='+companyId,
        toolbar: '#aa',
        columns: [[{
            field : 'ck',
            checkbox:true
            },
            {
                field: 'code',
                title: '合同编码',
                width: 250,
                align: 'center'
            },
            {
                field: 'name',
                title: '合同名称',
                width: 150,
                align: 'center'
            },
            {
                field: 'ncCode',
                title: '财务编码',
                width: 250,
                align: 'center'

            },
            {
                field: 'sendStatus',
                title: '传输状态',
                width: 80,
                align: 'center',
                formatter: function(value,row,index){
    				if (value == "0"){
    					return "未传输";
    				} else if(value == "1"){
    					return "传输成功";
    				}else{
    					return "传输失败";
    				}
    			}
            },
            {
                field: 'errmsg',
                title: '传输信息',
                width: 150,
                halign: 'center'
            },
            {
                field: 'sendDate',
                title: '传输时间',
                formatter:function(value,row,index){
                	if (value == null || value == '') {  
                        return '';  
                    }  
                    var dt;  
                    if (value instanceof Date) {  
                        dt = value;  
                    } else {  
                        dt = new Date(value);  
                    }  
                  
                    return dt.format("yyyy-MM-dd hh:mm:ss");
    			},
                width: 120,
                halign: 'center'
            },
            {
                field: 'id',
                title: '操作',
                width: 50,
                formatter : function(v,r){
                	return '<a href="javascript:void(0);" onclick="editCoContract(\''+v+'\')">编辑</a>';
                }
            }
        ]],
        onLoadSuccess:function(data){   
        	$('#grid').datagrid('doCellTip',{cls:{'background-color':'#CCCCCC'},delay:1000});   
	    },
        fit: true,
        border: false,
        pagination: true,
        singleSelect: false,
        rownumber: true
    });

    var p = $('#grid').datagrid('getPager');
    $(p).pagination({
        beforePageText: '第',
        afterPageText: '共{pages}页',
        displayMsg: '显示{from}到{to},共{total}记录'
    });
}

function newFiCoContract(){
	var url=contextPath+"/FiCoContract!newFiCoContract.do";
	$.post(url,{companyId:companyId},function(result){
		if(result.success){
			$('#grid').datagrid('reload');
		}else{
			$.messager.show({
				title:'出错信息',
				msg:result.msg
			});
		}
	},'json');
}

function sendFiCoContract(){
	$.ajax({
        url:"FiCoContract!sendFiCoContract.do",
        type:"post",
        dataType : "json",
        data:{dt:new Date().getTime(),companyId:companyId},
        dataType : "json",
        error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown);
		},
        success:function(data){
        	if(data && data.success == 'true'){
        		alert(data.msg);
			}else{
				alert(data.msg);
			}
        }
    });
}

/**  
 * 扩展两个方法  
 */  
$.extend($.fn.datagrid.methods, {
    /**
     * 开打提示功能
     * @param {} jq
     * @param {} params 提示消息框的样式
     * @return {}
     */
    doCellTip:function (jq, params) {
        function showTip(showParams, td, e, dg) {
            //无文本，不提示。
            if ($(td).text() == "") return;
            params = params || {};
            var options = dg.data('datagrid');
            var styler = 'style="';
            if(showParams.width){
                styler = styler + "width:" + showParams.width + ";";
            }
            if(showParams.maxWidth){
                styler = styler + "max-width:" + showParams.maxWidth + ";";
            }
            if(showParams.minWidth){
                styler = styler + "min-width:" + showParams.minWidth + ";";
            }
            styler = styler + '"';
            showParams.content = '<div class="tipcontent" ' + styler + '>' + showParams.content + '</div>';
            $(td).tooltip({
                content:showParams.content,
                trackMouse:true,
                position:params.position,
                onHide:function () {
                    $(this).tooltip('destroy');
                },
                onShow:function () {
                    var tip = $(this).tooltip('tip');
                    if(showParams.tipStyler){
                        tip.css(showParams.tipStyler);
                    }
                    if(showParams.contentStyler){
                        tip.find('div.tipcontent').css(showParams.contentStyler);
                    }
                }
            }).tooltip('show');
        };
        return jq.each(function () {
            var grid = $(this);
            var options = $(this).data('datagrid');
            if (!options.tooltip) {
                var panel = grid.datagrid('getPanel').panel('panel');
                panel.find('.datagrid-body').each(function () {
                    var delegateEle = $(this).find('> div.datagrid-body-inner').length ? $(this).find('> div.datagrid-body-inner')[0] : this;
                    $(delegateEle).undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove').delegate('td[field]', {
                        'mouseover':function (e) {
                            //if($(this).attr('field')===undefined) return;
                            var that = this;
                            var setField = null;
                            if(params.specialShowFields && params.specialShowFields.sort){
                                for(var i=0; i<params.specialShowFields.length; i++){
                                    if(params.specialShowFields[i].field == $(this).attr('field')){
                                        setField = params.specialShowFields[i];
                                    }
                                }
                            }
                            if(setField==null){
                                options.factContent = $(this).find('>div').clone().css({'margin-left':'-5000px', 'width':'auto', 'display':'inline', 'position':'absolute'}).appendTo('body');
                                var factContentWidth = options.factContent.width();
                                params.content = $(this).text();
                                if (params.onlyShowInterrupt) {
                                    if (factContentWidth > $(this).width()) {
                                        showTip(params, this, e, grid);
                                    }
                                } else {
                                    showTip(params, this, e, grid);
                                }
                            }else{
                                panel.find('.datagrid-body').each(function(){
                                    var trs = $(this).find('tr[datagrid-row-index="' + $(that).parent().attr('datagrid-row-index') + '"]');
                                    trs.each(function(){
                                        var td = $(this).find('> td[field="' + setField.showField + '"]');
                                        if(td.length){
                                            params.content = td.text();
                                        }
                                    });
                                });
                                showTip(params, this, e, grid);
                            }
                        },
                        'mouseout':function (e) {
                            if (options.factContent) {
                                options.factContent.remove();
                                options.factContent = null;
                            }
                        }
                    });
                });
            }
        });
    },
    /**
     * 关闭消息提示功能（基于1.3.3版本）
     * @param {} jq
     * @return {}
     */
    cancelCellTip:function (jq) {
        return jq.each(function () {
            var data = $(this).data('datagrid');
            if (data.factContent) {
                data.factContent.remove();
                data.factContent = null;
            }
            var panel = $(this).datagrid('getPanel').panel('panel');
            panel.find('.datagrid-body').undelegate('td', 'mouseover').undelegate('td', 'mouseout').undelegate('td', 'mousemove')
        });
    }
});