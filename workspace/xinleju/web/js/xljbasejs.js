
var appurl = "/";
//var appurl = "http://59.108.51.122:100/";
//var appurl = "http://192.168.3.81:100/";
var endpoint = "http://192.168.3.5:8080/iTMS/WebService/FundExternalService?wsdl";

document.write("<link rel='stylesheet' type='text/css' href='css/mask.css'/>");
$(function(){
	$("input[data-options*='function(e)']").next().find('.textbox-text-readonly').css({'background-color':'#FFFFFF'});
	$(".textbox .textbox-text").css("border-radius","0px");

	$(".buttoncontrol").css("display","none");
	$(".buttoncontrol").each(function(){
		
		var text1=$(this).text();
		if(text1=='修改'){
			$(this).css("display","");
		}
	});
	$(".buttoncontrol").click(function(){
		var text=$(this).text();
		$(".buttoncontrol").css("display","none");
		if(text=='保存'){
			$(".buttoncontrol").each(function(){
				var text1=$(this).text();
				if(text1=='修改'){
					$(this).css("display","");
				}
			});
			savedata();
		}else if(text=='修改'){
			$(".buttoncontrol").each(function(){
				var text1=$(this).text();
				if(text1=='保存'||text1=='取消'){
					$(this).css("display","");
				}
			});
			
			editdata();
		}else if(text=='取消'){
			$(".buttoncontrol").each(function(){
				var text1=$(this).text();
				if(text1=='修改'){
					$(this).css("display","");
				}
			});
			canceldata();
		}
	});
	
})



//}

function iFrameHeight(obj){
	obj.height=0;
	var fdh=(obj.Document?obj.Document.body.scrollHeight:obj.contentDocument.body.offsetHeight);
	obj.height=(fdh>700?fdh:700);
}

/**
 * 跳转页面 xl
 * @param url
 * @param isRefresh
 */
function popWin(url,isRefresh) {
	//所有参数
	//url,isRefreshForm,conditions,width,height
	var args = popWin.arguments;
	var urlArgsConditions = '' ;
	var dialogWidth= 850;
	var dialogHeight= 550;
	if(args.length > 2) {
		urlArgsConditions = args[2] ;
	}
	if(args.length > 4) {
		dialogWidth = args[3] ;
		dialogHeight = args[4] ;
	}
	
	var result = window.showModalDialog(url + "?dateTime="+new Date().getTime() + urlArgsConditions,arguments,"minimize:no;maximize:no;menubar:no;status=no;toolbar=no;scrollbars:no;localtion:no;help:no;status:no;center:yes;dialogWidth="+dialogWidth+"px;dialogHeight=" + dialogHeight + "px;dialogLeft:"+(window.screen.width/2-dialogWidth/2)+";dialogTop:"+(window.screen.height/2-dialogHeight/2)+";");
	if(isRefresh){
		window.document.frm.submit();
	}
	return result ;
}
/**
 * 跳转页面 xl
 * @param url
 * @param isRefresh
 */
function popWinByParam(url,isRefresh) {
	//所有参数
	//url,isRefreshForm,conditions,width,height
	var args = popWinByParam.arguments;
	var dialogWidth= 850;
	var dialogHeight= 550;
	if(args.length > 4) {
		dialogWidth = args[3] ;
		dialogHeight = args[4] ;
	}
	var result = window.showModalDialog(url + " && dateTime="+new Date().getTime(),arguments,"minimize:no;maximize:no;menubar:no;status=no;toolbar=no;scrollbars:no;localtion:no;help:no;status:no;center:yes;dialogWidth="+dialogWidth+"px;dialogHeight=" + dialogHeight + "px;dialogLeft:"+(window.screen.width/2-dialogWidth/2)+";dialogTop:"+(window.screen.height/2-dialogHeight/2)+";");
	if(isRefresh){
		window.document.frm.submit();
	}
	return result ;
}

/**
 * 跳转页面 xl
 * @param url
 * @param isRefresh
 * @param para
 */
function popWinPara(url,isRefresh) {

	var flag=window.showModalDialog(url,arguments,"minimize:no;maximize:no;menubar:no;status=no;toolbar=no;scrollbars:no;localtion:no;help:no;status:no;center:yes;dialogWidth=850px;dialogHeight=550px;dialogLeft:"+(window.screen.width/2-850/2)+";dialogTop:"+(window.screen.height/2-550/2)+";");
	if(isRefresh){
		window.document.frm.submit();
	}
	if(flag!=null){
	   if(flag){
		window.location.reload();
	   }
	}
}

/**
 * 跳转页面 xl, 可以根据传入的宽度，高度，自定义显示弹窗的大小--刘忠庆
 * @param url
 * @param isRefresh
 */
function popWinDef(url,isRefresh,width,height) {

	window.showModalDialog(url+"?dateTime="+(new Date()).getTime(),arguments,"minimize:no;maximize:no;menubar:no;status=no;toolbar=no;scrollbars:no;localtion:no;help:no;status:no;center:yes;dialogWidth="+width+"px;dialogHeight="+height+"px;dialogLeft:"+(window.screen.width/2-850/2)+";dialogTop:"+(window.screen.height/2-550/2)+";");
	if(isRefresh){
		window.document.frm.submit();
	}
}

/**
 * 打开页面xl
 * @param url
 */
function winOpen(url) {
    window.open(url+"?dateTime="+(new Date()).getTime(),'_blank','width=850px,height=550px;toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no,screenX='+(window.screen.width/2-850/2)+',screenY='+(window.screen.height/2-550/2)); 
}


/**
 * 打开页面xl
 * @param url
 */
function winOpen1(url, title) {
    //window.open(url+"?dateTime="+(new Date()).getTime(),'_blank','width=800px,height=600px;toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no,alwaysRaised=yes,z-look=yes,titlebar=no');
	var obj = new Object();
	obj.title=title;
	obj.targetUrl=url;
	window.showModalDialog("iframe.jsp",obj,"dialogWidth=850px;dialogHeight=650px;center=yes;help=no;resizable=no;status=no;scroll=off;edge=raised;unadorned=yes");
}

function winOpen2(url){
	window.open(url+"?dateTime="+(new Date()).getTime(),'_blank','width=700px,height=380px,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no,screenX='+(window.screen.width/2-900/2)+',screenY='+(window.screen.height/2-800/2));
}

/**
 * 打开页面xl
 * @param url
 */
function winOpenPara(url,width,height) {
    window.open(url+"?dateTime="+(new Date()).getTime(),'_blank','width='+width+'px,height='+height+'px;toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=no, status=no,screenX='+(window.screen.width/2-width/2)+',screenY='+(window.screen.height/2-height/2)); 
}


//add by hezhh
function showModalWin(url, title, width , height ,iframejsp ) {
	var obj = new Object();
	obj.title=title;
	obj.targetUrl=url;
	if(iframejsp == null){
		if(width == null && height == null){
			window.showModalDialog("iframe.jsp",obj,"dialogWidth:880px;dialogHeight:550px;center:yes;help:no;resizable:no;status:no;scroll:off;edge:raised;unadorned:yes;dialogLeft:"+(window.screen.width/2-880/2)+";dialogTop:"+(window.screen.height/2-550/2));
		}else if(width == null && height != null){
			window.showModalDialog("iframe.jsp",obj,"dialogWidth:880px;dialogHeight:"+height+"px;center:yes;help:no;resizable:no;status:no;scroll:off;edge:raised;unadorned:yes;dialogLeft:"+(window.screen.width/2-880/2)+";dialogTop:"+(window.screen.height/2-height/2));
		}else if(width != null && height == null){
			window.showModalDialog("iframe.jsp",obj,"dialogWidth:"+width+"px;dialogHeight:550px;center:yes;help:no;resizable:no;status:no;scroll:off;edge:raised;unadorned:yes;dialogLeft:"+(window.screen.width/2-width/2)+";dialogTop:"+(window.screen.height/2-550/2));
		}else{
			window.showModalDialog("iframe.jsp",obj,"dialogWidth:"+width+"px;dialogHeight:"+height+"px;center:yes;help:no;resizable:no;status:no;scroll:off;edge:raised;unadorned:yes;dialogLeft:"+(window.screen.width/2-width/2)+";dialogTop:"+(window.screen.height/2-height/2));
		}
	}else{
		if(width == null && height == null){
			window.showModalDialog(iframejsp+".jsp",obj,"dialogWidth:880px;dialogHeight:550px;center:yes;help:no;resizable:no;status:no;scroll:off;edge:raised;unadorned:yes;dialogLeft:"+(window.screen.width/2-880/2)+";dialogTop:"+(window.screen.height/2-550/2));
		}else if(width == null && height != null){
			window.showModalDialog(iframejsp+".jsp",obj,"dialogWidth:880px;dialogHeight:"+height+"px;center:yes;help:no;resizable:no;status:no;scroll:off;edge:raised;unadorned:yes;dialogLeft:"+(window.screen.width/2-880/2)+";dialogTop:"+(window.screen.height/2-height/2));
		}else if(width != null && height == null){
			window.showModalDialog(iframejsp+".jsp",obj,"dialogWidth:"+width+"px;dialogHeight:550px;center:yes;help:no;resizable:no;status:no;scroll:off;edge:raised;unadorned:yes;dialogLeft:"+(window.screen.width/2-width/2)+";dialogTop:"+(window.screen.height/2-550/2));
		}else{
			window.showModalDialog(iframejsp+".jsp",obj,"dialogWidth:"+width+"px;dialogHeight:"+height+"px;center:yes;help:no;resizable:no;status:no;scroll:off;edge:raised;unadorned:yes;dialogLeft:"+(window.screen.width/2-width/2)+";dialogTop:"+(window.screen.height/2-height/2));
		}
	}
}


// add by hezhh  显示提示信息  
function showmsg( title , msg , time){
	$.messager.show({
		title: title,
		msg: msg,
		timeout:(1000 * 2.5),
		showType:'slide' ,
		style:{
			right:'',
			top:document.body.scrollTop+document.documentElement.scrollTop,
			bottom:''
		}
	});
}



/**
 * hezhh
 * 表体行删除，这个是真删除（包括删除界面和数据库）
 * @param gridid
 * @param args
 * @param index
 * @param myurl
 */
function databaseDel( gridid , args , index , myurl ) {
	var $dg = $('#' + gridid);
	// 解决由于点击超链接时，同时执行选中行和触发超链接事件而导致的加载数据错误 
	$dg.datagrid('selectRow', index);
    var row = $dg.datagrid('getSelected');
    if (row) {
        $.messager.confirm('询问', '你确定要删除此条数据吗?', function (r) {
            if (r) {
            	//var myurl = '/sa/feebusiness/szgl/fee_bill!deleteFeeBillB.ajax';
            	//var args = { "id" : row.id };
            	if(args == null){
            		args = { "id" : row.id };
            	}
            	$('body').mask("正在处理，请稍候...");
            	$.get(myurl,args,function(data){
            		if (data.success) {
            			$dg.datagrid('reload');    // 重新加载数据  
                    	showmsg("提示",data.msg,5);
                    	$('body').unmask();
                    } else {
                    	showmsg("错误提示",data.msg,5);  // 显示错误消息
                    	$('body').unmask();
                    } 
                }, 'json'); 
            }
        });
    } 
}  

/**
 * hezhh
 * 表体行删除，这个只删除界面
 * @param gridid
 * @param index
 */
function pageDel( gridid , index ) {
	var $dg = $('#' + gridid);
	// 解决由于点击超链接时，同时执行选中行和触发超链接事件而导致的加载数据错误 
	$dg.datagrid('selectRow', index);
    var row = $dg.datagrid('getSelected');
    if (row) {
        $.messager.confirm('询问', '你确定要删除此条数据吗?', function (r) {
            if (r) {
            	$dg.datagrid('deleteRow',index);
            	//showmsg("提示","数据删除成功！",5);
            } else {
            	//showmsg("错误提示","数据删除失败！",5);  // 显示错误消息
            } 
        });
    } 
}

/**
 * hezhh
 * 表体行批量删除，这个只删除界面
 * @param gridid
 * @param index
 */
function pageDelAll( gridid ) {
	var $dg = $('#' + gridid);
	var rows = $dg.datagrid('getSelections');
	if (rows) {
		$.messager.confirm('询问', '你确定要删除此条数据吗?', function (r) {
			if (r) {
				for(var i = 0 ; i < rows.length ; i++){
					var index = $dg.datagrid('getRowIndex',rows[i]);
					$dg.datagrid('deleteRow',index);
				}
			}
		});
	} 
}  

/**
 * hezhh
 * 表体行编辑，弹出框的形式
 * @param gridid
 * @param dlgid
 * @param formid
 * @param index
 */
function editPOPDialog( gridid , dlgid , formid , index ) {
	var $dg = $('#' + gridid);
	var $dlg = $('#' + dlgid);
	var $fm = $('#' + formid);
	// 解决由于点击超链接时，同时执行选中行和触发超链接事件而导致的加载数据错误 
	$dg.datagrid('selectRow', index);
    var row = $dg.datagrid("getSelected");
    if (row) {
    	$dlg.dialog("open").dialog('setTitle', '编辑').css({ "height": "auto" });;
    	$fm.form("load", row);
    }
}

/**
 * hezhh
 * 表格编辑弹出框的保存，直接保存（会更新数据库）
 * @param gridid
 * @param dlgid
 * @param formid
 * @param method
 * @param myurl
 */
function saveDlg( gridid , dlgid , formid , method , myurl ) {
	var $dg = $('#' + gridid);
	var $dlg = $('#' + dlgid);
	var $fm = $('#' + formid);
	$fm.form("submit", {
        //url: '/sa/feebusiness/szgl/fee_bill!updateFeeBillB.ajax',
		url: myurl ,
        method : method , 
        onsubmit: function () {
            return $(this).form("validate");
        },
        success: function (data) {
        	var d = eval("("+data+")");
            if (d.success) {
            	$dlg.dialog("close");
            	$dg.datagrid("load");
                showmsg("提示信息","内容修改成功！",5);
            }
            else {
                showmsg("提示信息","操作失败！",5);
            }  
        }
    });
}

/**
 * hezhh
 * 表格编辑弹出框的取消
 * @param gridid
 */
function cancelDlg(gridid){
	var $dlg = $('#' + gridid);
	$dlg.dialog('close');
}

/**
 * hezhh
 * 判断表格中是否有编辑中的行
 * @param $dg
 */
var editIndex = undefined;
function endEditing($dg){
	//var $dg = $('#pttg');
	if (editIndex == undefined){return true}
	if ($dg.datagrid('validateRow', editIndex)){
		$dg.datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

/**
 * hezhh
 * 表格中是所有的行都可以编辑
 * @param dlgid
 */
function allRowEdit(gridid){
	var $dg = $('#' + gridid);
	var allrow = $dg.datagrid('getRows');
	for(var i = 0 ; i < allrow.length ; i++){
		var rowindex = $dg.datagrid('getRowIndex', allrow[i]);
		$dg.datagrid('beginEdit', rowindex);
	} 
}

/**
 * hezhh
 * 表格增加行，在所有行的最后,增加多行时所有加的行都可以编辑
 * @param dlgid
 */
function addRowToEnd(gridid){
	var $dg = $('#' + gridid);
	$dg.datagrid('appendRow',{});
	editIndex = $dg.datagrid('getRows').length-1;
	$dg.datagrid('selectRow', editIndex)
	   .datagrid('beginEdit', editIndex);
}

/**
 * hezhh
 * 表格增加行，在所有行的最后,增加多行时只有最后加的行可以编辑
 * @param dlgid
 */
function addRowToEnd1(gridid){
	var $dg = $('#' + gridid);
	if (endEditing($dg)){
		$dg.datagrid('appendRow',{});
		editIndex = $('#pttg').datagrid('getRows').length-1;
		$dg.datagrid('selectRow', editIndex)
		   .datagrid('beginEdit', editIndex);
	}
}

/**
 * hezhh
 * 表格上单行变为可编辑
 * @param dlgid
 * @param index
 */
function editRow(gridid,index){
	var $dg = $('#' + gridid);
	if (endEditing($dg)){
		$dg.datagrid('selectRow', index)
		   .datagrid('beginEdit', index);
		editIndex = index;
	} else {
		$dg.datagrid('selectRow', editIndex);
		//$dg.datagrid('refreshRow', editIndex);
	}
}

/**
 * hezhh
 * 主子表的保存，保存的时候主表和子表的入库
 * 
 * @param dlgid
 * @param formid
 * @param myurl
 */
function saveAll(gridid , formid , myurl){
	//$("#fm").submit();
	var $dg = $('#' + gridid);
	var $fm = $('#' + formid);
	var jsondata = $fm.serializeArray();
	var tolrow = $dg.datagrid('getRows');
	for(var i = 0 ; i < tolrow.length ; i++){
		var rowindex = $dg.datagrid('getRowIndex', tolrow[i]);
		$dg.datagrid('endEdit', rowindex);
	}
    var rows = $dg.datagrid('getChanges');
    var effectRow = new Object();
    if (rows.length) {
        var inserted = $dg.datagrid('getChanges', "inserted");
        var deleted = $dg.datagrid('getChanges', "deleted");
        var updated = $dg.datagrid('getChanges', "updated");
        if (inserted.length) {
           effectRow["inserted"] = JSON.stringify(inserted);
        }
        if (deleted.length) {
            effectRow["deleted"] = JSON.stringify(deleted);
        }
        if (updated.length) {
            effectRow["updated"] = JSON.stringify(updated);
        }
    }
    
    if(formid != null){
    	effectRow["zbjson"] = JSON.stringify(jsondata)
    	.replace(/\"name\":/gm, "")
    	.replace(/,\"value\":/gm, ":")
    	.replace(/},{/gm, ",")
    	.replace("[","")
    	.replace("]","");
    }
    
	//var myurl = '/sa/feebusiness/dsfgl/dsftzll!savemxb.ajax';
	$.get(myurl,effectRow,function(data){
		if (data.success) {
			showmsg("提示","数据保存成功！",5);
			$dg.datagrid('reload');    // 重新加载数据  
		} else {
			showmsg("错误提示","数据保存失败！",5);   // 显示错误消息
		} 
	}, 'json'); 
    
}


/**
 * hezhh 
 * 表格中行的向上移动
 * @param gridid 表格的ID
 */
function MoveUp(gridid) {
	var $dg = $('#' + gridid);
    var row = $dg.datagrid('getSelected');
    var index = $dg.datagrid('getRowIndex', row);
    mysort(index, 'up', gridid);
}

/**
 * hezhh 
 * 表格中行的向下移动
 * @param gridid 表格的ID
 */
function MoveDown(gridid) {
	var $dg = $('#' + gridid);
    var row = $dg.datagrid('getSelected');
    var index = $dg.datagrid('getRowIndex', row);
    mysort(index,'down',gridid);
     
}
 
/**
 * hezhh
 * 表格中上下移动调用的方法
 * @param index   行索引
 * @param type    上下移的标志
 * @param gridid  表格的ID
 */
function mysort(index, type, gridid) {
	var $dg = $('#' + gridid);
    if ("up" == type) {
        if (index != 0) {
            var toup = $dg.datagrid('getData').rows[index];
            var todown = $dg.datagrid('getData').rows[index - 1];
            $dg.datagrid('getData').rows[index] = todown;
            $dg.datagrid('getData').rows[index - 1] = toup;
            $dg.datagrid('refreshRow', index);
            $dg.datagrid('refreshRow', index - 1);
            $dg.datagrid('selectRow', index - 1);
        }
    } else if ("down" == type) {
        var rows = $dg.datagrid('getRows').length;
        if (index != rows - 1) {
            var todown = $dg.datagrid('getData').rows[index];
            var toup = $dg.datagrid('getData').rows[index + 1];
            $dg.datagrid('getData').rows[index + 1] = todown;
            $dg.datagrid('getData').rows[index] = toup;
            $dg.datagrid('refreshRow', index);
            $dg.datagrid('refreshRow', index + 1);
            $dg.datagrid('selectRow', index + 1);
        }
    }
 
}

/**
 * Jack
 * 表格中上移置顶，下移至底
 * @param index
 * @param type
 * @param gridid
 */
function tbsort(index, type, gridid) {
	var $dg = $('#' + gridid);
    if ("top" == type) {
        if (index != 0) {
        	var rows = $dg.datagrid('getData');
        	var toup = rows.rows[index];
        	for(var i=index;i>0;i--){
        		rows.rows[i]=rows.rows[i-1];
        		$dg.datagrid('refreshRow', i);
        	}
        	rows.rows[0] = toup;
            $dg.datagrid('refreshRow', 0);
            $dg.datagrid('selectRow', 0);
        }
    } else if ("bottom" == type) {
        var rowsLength = $dg.datagrid('getRows').length;
        var rows = $dg.datagrid('getData');
        if (index != rowsLength - 1) {
            var todown = rows.rows[index];
            for(var i=index;i<rowsLength-1;i++){
        		rows.rows[i]=rows.rows[i+1];
        		$dg.datagrid('refreshRow', i);
        	}
            rows.rows[rowsLength-1] = todown;
            $dg.datagrid('refreshRow', rowsLength - 1);
            $dg.datagrid('selectRow', rowsLength - 1);
        }
    }
}
/**
 * Jack
 * 结束所有行编辑
 * @param gridId
 */
function endAll(gridId){
	var tolrow = $("#"+gridId).datagrid('getRows');
	for(var i = 0 ; i < tolrow.length ; i++){
		var rowindex = $("#"+gridId).datagrid('getRowIndex', tolrow[i]);
		$("#"+gridId).datagrid('endEdit', rowindex);
	}
}
/**
 * Jack
 * 上下移动操作,上移置顶,下移置底
 * @param gridId
 * @param operation
 */
function sort(gridId,operation){
	var row = $("#"+gridId).datagrid("getSelected");
	var rowIndex = $("#"+gridId).datagrid("getRowIndex",row);
	if(row!=null){
		$(".save").show();
		if(operation=="up"){
			mysort(rowIndex,"up",gridId);
		}else if(operation=="down"){
			mysort(rowIndex,"down",gridId);
		}else if(operation=="top"){
			tbsort(rowIndex,"top",gridId);
		}else if(operation=="bottom"){
			tbsort(rowIndex,"bottom",gridId);
		}
	}else{
		showmsg('警告提示','请选择一行!',3);
	}
}
/**
 * Jack
 * 取消修改
 */
function cancel(gridId){
	var rows = $("#"+gridId).datagrid("getRows");
	for(var i=0;i<rows.length;i++){
		var index = $("#"+gridId).datagrid('getRowIndex',rows[i]);
		$('#'+gridId).datagrid('cancelEdit',index);
	}
}
/**
 * linxiaoqiang
 * 树的上移 
 * @param gridid  treegrid的id
 */
function MoveUpOrtree(gridid) {
	var flage=false;
	var $treeid=$("#"+gridid);
	var subdata = $treeid.treegrid('getSelected');
    if(subdata!=null){
    	
    	var $tr=$(".datagrid-row-selected").prevAll(".datagrid-row");
    	var id=$tr.attr("node-id");
    	if($tr.length!=0){
    		$treeid.treegrid('remove',subdata.id);
    		$treeid.treegrid('insert', {
        		before: id,
        		data:subdata
        	});
    		$treeid.treegrid('select',subdata.id);
    		flage=true;
    	}
    	
    }else{
    	showmsg("提示信息", "请选择一行！", 1.5);
    }
	return flage;
}
/**
 * linxiaoqiang
 * 树的上移置顶
 * @param gridid  treegrid的id
 */
function TopupOrtree(gridid) {
	var flage=false;
	var $treeid=$("#"+gridid);
	
	var subdata = $treeid.treegrid('getSelected');
    if(subdata!=null){
    	var $tr=$(".datagrid-row-selected").parent().children().first(".datagrid-row");
    	var id=$tr.attr("node-id");
    	if($tr.length!=0){
    		if(id==subdata.id){
        		return false;
        	}
    		$treeid.treegrid('remove',subdata.id);
    		$treeid.treegrid('insert', {
        		before: id,
        		data:subdata
        	});
        	$treeid.treegrid('select',subdata.id);
        	flage=true;
    	}
    	
    }else{
    	showmsg("提示信息", "请选择一行！", 1.5);
    }
    return flage;
}
/**
 * linxiaoqiang
 * 树的下移
 * @param gridid  treegrid的id
 */
function MoveDownOrtree(gridid) {
	var flage=false;
	var $treeid=$("#"+gridid);
	var subdata = $treeid.treegrid('getSelected');
    if(subdata!=null){
    	var $tr=$(".datagrid-row-selected").nextAll(".datagrid-row");
    	var id=$tr.attr("node-id");
    	
    	var data = $treeid.treegrid('find',id);
    	
    	if($tr.length!=0){
    		$treeid.treegrid('remove',data.id);
    		$treeid.treegrid('insert', {
        		before: subdata.id,
        		data:data
        	});
        	$treeid.treegrid('select',subdata.id);
        	flage=true;
    	}
    	
    }else{
    	showmsg("提示信息", "请选择一行！", 1.5);
    }
    return flage;
	
}
/**
 * linxiaoqiang
 * 树的下移置底
 * @param gridid  treegrid的id
 */
function TopdownOrtree(gridid){
	var flage=false;
	var $treeid=$("#"+gridid);
	var subdata = $treeid.treegrid('getSelected');
    if(subdata!=null){
    	var $tr=$(".datagrid-row-selected").parent().children(".datagrid-row").last(".datagrid-row");
    	var id=$tr.attr("node-id");
    	if($tr.length!=0){
    		if(id==subdata.id){
        		return false;
        	}
    		$treeid.treegrid('remove',subdata.id);
    		$treeid.treegrid('insert', {
        		before: id,
        		data:subdata
        	});
        	$treeid.treegrid('select',subdata.id);
        	flage=true;
        	MoveDownOrtree(gridid);
    	}
    	
    }else{
    	showmsg("提示信息", "请选择一行！", 1.5);
    }
    return flage;
}
/**
 * Jack
 * 去空格
 * @returns
 */
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
}
/**********************************************wang'ao*****start************************************/
/**此部分是参照所用**/


/**表格参照
 * params:
 *  参数1:参照表中的code主键
 *  参数2:参照的列字段名
 *  参数3:主键ID
 *  参数4:是否是参照多列
 *  参数5++:以后的参数是过滤的条件,参数为相应的字段名,用多少写多少,按次序写
 */
function referTable() {
	//所有参数
	var args = referTable.arguments;
	var tl = 0 ;
	
	var params = '' ;
	//尾加参数
	for(i = 0 ;i < 6 ;i ++) {
		params += '&arg' + i + '=' +args[i] ;
	}
	var moreArgs = [] ;
	moreArgs = args[6] ;
		
		for(i = 0 ;i < moreArgs.length  ;i ++) {
			var name="";
			//此种是针对两个表以上的，将id名称取名为  表明+.+属性字段名称；将name取名为 属性字段名称；则通过name属性获取
			var src=moreArgs[i].indexOf('.');
			if(src>0){
				name=moreArgs[i].substring(src+1,moreArgs[i].length);
				params += '&' + moreArgs[i] + '=' +document.getElementsByName(name)[0].value ;
			}else{
			params += '&' + moreArgs[i] + '=' +$('#'+moreArgs[i]).val() ;
			}
		}
	//获得路径
	var curPath=window.document.location.href;
	var pathName=window.document.location.pathname;
	var pos=curPath.indexOf(pathName);
	var localhostPaht=curPath.substring(0,pos);
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	//有汉字，要解码，编码
	var url = encodeURI(localhostPaht+projectName+"/page/refer_table.jsp"+"?dateTime="+(new Date()).getTime()+params) ;
	return url ;
}
/**
 * 树参照
 * @returns {String}
 */
function referTree() {
	//所有参数
	var args = referTree.arguments;
	var code = args[0] ;
	var params = "&" + "code=" +code ;
	//获得路径
	var curPath=window.document.location.href;
	var pathName=window.document.location.pathname;
	var pos=curPath.indexOf(pathName);
	var localhostPaht=curPath.substring(0,pos);
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	var url = localhostPaht+projectName+"/page/refer_tree.jsp"+"?dateTime="+(new Date()).getTime()+params ;
	return url ;
	
}
/**
 * 树表参照
 * @returns {String}
 */
function referTreeTable() {
	//所有参数
	var args = referTreeTable.arguments;
	var code = args[0] ;
	var params = "&" + "code=" +code ;
	
	return getProjectPath() + '/page/refer_tree_datagrid.jsp' +"?dateTime="+(new Date()).getTime() + params;
}
/**
 * 表表参照
 * @returns {String}
 */
function referTableTable() {
	//所有参数
	var args = referTableTable.arguments;
	var code = args[0] ;
	var params = "&" + "code=" +code ;
	
	return getProjectPath() + '/page/refer_datagrid_datagrid.jsp' +"?dateTime="+(new Date()).getTime() + params;
}
/**
 * 列表表参照
 * @returns {String}
 */
function referListTable() {
	//所有参数
	var args = referListTable.arguments;
	var code = args[0] ;
	var params = "&" + "code=" +code ;
	
	return getProjectPath() + '/page/refer_list_datagrid.jsp' +"?dateTime="+(new Date()).getTime() + params;
}
/**
 * 最后一列的超链接
 * @param val
 * @param row
 * @returns {String}
 */
function  referColLink(val,row){
	var tocss = ' <div style="text-align:right;margin:0 auto;" > '
					+'<a class="col0070c0" href="javascript:void(0);" onclick="writeback()">选择</a>'
				+'</div>';
	return tocss ;
}


/**对话框**/
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
                option.content = '<iframe  scrolling="auto" id="iframedialog'+option.self.replace("#","")+'" frameborder="0"  src="' + option.iframe + '" style="width:100%;height:98%;"></iframe>';
            }
            self.dialog(option);
        }
    }
}




var dialogDefaultWidth = '' ;
var dialogDefaultHeight = '' ;
var dialogDefaultLeft = '' ;
var dialogDefaultTop = '' ;
var dialogResultValue = [] ;
var defaultTitle = '选择参照' ;
function showDialog() {
	var resultValue = '' ;
	// showDialog('refer_table','user_id','001',true,'tpost','table','tname');
	// 所有参数
	var args = showDialog.arguments;
	// 得到各个参数
	var hiddenId = args[1];
	var referTagId = args[0];
		if(referTagId.indexOf(",") != -1){}
	var referCode = args[2];
	var isMul = args[3];
	var dataField = args[4];
	var referDataType = args[5];
	var moreReferFields = [];
	if (args.length > 6) {

		for (i = 6; i < args.length; i++) {
			moreReferFields[i - 6] = args[i];
		}
	}
	// alert('moreReferFields --' + moreReferFields) ;

	// 判断树还是表格
	var url = '';// referTable(referCode,dataField,'null',true,moreReferFields);
	if (referDataType == 'tree') {
		if (dialogDefaultWidth == '' && dialogDefaultHeight == '') {

			dialogDefaultWidth = 400;
			dialogDefaultHeight = 425;
		}
		else if (dialogDefaultWidth == '' && dialogDefaultHeight != '') {

			dialogDefaultWidth = 400;
		}
		else if (dialogDefaultWidth != '' && dialogDefaultHeight == '') {

			dialogDefaultHeight = 425;
		}
		url = referTree(referCode);
	} else if (referDataType == 'table') {
		if (dialogDefaultWidth == '' && dialogDefaultHeight == '') {

			dialogDefaultWidth = 500;
			dialogDefaultHeight = 510;
		}
		else if (dialogDefaultWidth == '' && dialogDefaultHeight != '') {

			dialogDefaultWidth = 500;
		}
		else if (dialogDefaultWidth != '' && dialogDefaultHeight == '') {

			dialogDefaultHeight = 510;
		}
		url = referTable(referTagId,hiddenId,referCode, dataField, 'null', isMul, moreReferFields);
	} else if (referDataType == 'tree-table') {
		if (dialogDefaultWidth == '' && dialogDefaultHeight == '') {
			dialogDefaultWidth =760;
			dialogDefaultHeight = 470;
		}
		else if (dialogDefaultWidth == '' && dialogDefaultHeight != '') {

			dialogDefaultWidth = 760;
		}
		else if (dialogDefaultWidth != '' && dialogDefaultHeight == '') {

			dialogDefaultHeight = 470;
		}
		url = referTreeTable(referCode);//getProjectPath() + '/page/preproject/saleteam/team_main_body.jsp' ;//
	}
	else if (referDataType == 'table-table') {
		if (dialogDefaultWidth == '' && dialogDefaultHeight == '') {
			dialogDefaultWidth =760;
			dialogDefaultHeight = 470;
		}
		else if (dialogDefaultWidth == '' && dialogDefaultHeight != '') {

			dialogDefaultWidth = 760;
		}
		else if (dialogDefaultWidth != '' && dialogDefaultHeight == '') {

			dialogDefaultHeight = 470;
		}
		url = referTableTable(referCode);//getProjectPath() + '/page/preproject/saleteam/team_main_body.jsp' ;//
	}
	else if (referDataType == 'list-table') {
		if (dialogDefaultWidth == '' && dialogDefaultHeight == '') {
			dialogDefaultWidth =760;
			dialogDefaultHeight = 470;
		}
		else if (dialogDefaultWidth == '' && dialogDefaultHeight != '') {

			dialogDefaultWidth = 760;
		}
		else if (dialogDefaultWidth != '' && dialogDefaultHeight == '') {

			dialogDefaultHeight = 470;
		}
		url = referListTable(referCode);//getProjectPath() + '/page/preproject/saleteam/team_main_body.jsp' ;//
	}
	//设置位置
	if (dialogDefaultLeft == '' && dialogDefaultTop == '') {

		dialogDefaultLeft = (document.body.clientWidth - dialogDefaultWidth) / 2
		+ document.body.scrollLeft;
		dialogDefaultTop = 40 ; //(document.body.clientHeight - dialogDefaultHeight) / 2 + document.body.scrollTop;
	}
	else if (dialogDefaultLeft == '' && dialogDefaultTop != '') {

		dialogDefaultLeft = (document.body.clientWidth - dialogDefaultWidth) / 2
		+ document.body.scrollLeft;
	}
	else if (dialogDefaultLeft != '' && dialogDefaultTop == '') {

		dialogDefaultTop = 220 ;//(document.body.clientHeight - dialogDefaultHeight) / 2+ document.body.scrollTop;
	}

	dialoginit({
		self : '#pushDialog',
		title : defaultTitle,
		width : dialogDefaultWidth,
		height : dialogDefaultHeight,
		iframe : url,
		buttons : [
				{
					text : '确定',
					handler : function() {
						//okBtnAction() ;
						var ss = $("#iframedialogpushDialog")[0].contentWindow.getData();
						// $('#'+referId).val=ss ;
						// alert(ss);
		
						if (referTagId != '' && hiddenId != '') {
							$('#' + referTagId).textbox('setValue', ss[0]);
							$('#' + hiddenId).val(ss[1]);
						}

						$('#pushDialog').dialog('close');
						dialogResultValue = ss;
						pushDialogOkClick();
						pushDialogOkClickArgs(referTagId,hiddenId);
						
						pushDialogOkClickArgs11(referTagId,hiddenId);
						
					}
				}, {
					text : '取消',
					handler : function() {
						$('#pushDialog').dialog('close');

					}
				} ],
		left : dialogDefaultLeft,
		top : dialogDefaultTop
	});
	$('#pushDialog').dialog('open');
	
	//样式设置
	var parentDialog = $('#pushDialog').parent();
	parentDialog.css({"background-color": "#C7CCD1"});
	parentDialog.find('.dialog-button').css({"text-align": "center"});
	parentDialog.find('.l-btn').css({"border-radius": "0px","width":"100px"});
	parentDialog.css({"border-radius": "0px"});
	return resultValue ;
}
/**********************
//确定按钮事件动作
function okBtnAction() {
	var ss = $("#iframedialogpushDialog")[0].contentWindow.getData();
	// $('#'+referId).val=ss ;
	// alert(ss);
	if (referTagId != '' && hiddenId != '') {
		$('#' + referTagId).textbox('setValue', ss[0]);
		$('#' + hiddenId).val(ss[1]);
	}

	$('#pushDialog').dialog('close');
	dialogResultValue = ss;
	pushDialogOkClick();
	
}
********************/

function pushDialogOkClickArgs(referTagId,hiddenId){
	
}

function pushDialogOkClickArgs11(referTagId,hiddenId){
	
}
//设置宽
function setDialogWidth(dialogWidth) {
	dialogDefaultWidth = dialogWidth ;
}
//设置高
function setDialogHeight(dialogHeight) {
	dialogDefaultHeight = dialogHeight ;
}
//设置left
function setDialogLeft(dialogLeft) {
	dialogDefaultLeft = dialogLeft ;
}
//设置高top
function setDialogTop(dialogTop) {
	dialogDefaultTop = dialogTop ;
}
//设置高标题
function setDefaultTitle(title) {
	defaultTitle = title ;
}
//回调方法
function pushDialogOkClick() {
	//alert() ;
}
//获得返回值
function getDialogResultValue(){
	return dialogResultValue ;
}
//拆分返回值 id数组  "id1,id2,id3"
function getDialogParamId() {
	return dialogResultValue[1];
}
//拆分返回值 参照列数据 数组"data1,data2,data3"
function getDialogParamData() {
	return dialogResultValue[0];
}
//拆分返回值 全部数据，对象数组[obj1,obj2]
function getDialogParamAllObj() {
	return dialogResultValue[2];
}
/**********************************************wang'ao*****end************************************/
//获得contextPath路径
function getContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}



function commafy(num) {
	//alert("进入："+num);
	//1.先去除空格,判断是否空值和非数   
	num = num + "";
	num = num.replace(/[ ]/g, ""); //去除空格  
	if (num == "") {
		num = parseFloat(parseFloat((0 + "")).toFixed(2)).toFixed(2) + ""; 
		return num;
	}
	if (isNaN(num)) {
		num = parseFloat(parseFloat((0 + "")).toFixed(2)).toFixed(2) + ""; 
		return num;
	}
	
	/*if(prec == 0){
		var index = num.indexOf(".");
		var intPart = num.substring(0, index);
		num=parseFloat((intPart + "")).toFixed(2);
	}else{*/
		num = parseFloat(parseFloat((num + "")).toFixed(2)).toFixed(2) + ""; 
	/*}*/
	
	//2.针对是否有小数点，分情况处理   
	var index = num.indexOf(".");
	/*if (index == -1) {//无小数点   
		var reg = /(-?\d+)(\d{3})/;
		while (reg.test(num)) {
			num = num.replace(reg, "$1,$2");
		}
	} else {*/
		var intPart = num.substring(0, index);
		var pointPart = num.substring(index + 1, num.length);
		var reg = /(-?\d+)(\d{3})/;
		while (reg.test(intPart)) {
			intPart = intPart.replace(reg, "$1,$2");
		}
		num = intPart + "." + pointPart;
	/*}*/
		//alert("num:"+num);
	return num;
} 

/**
 * 获取页面url参数
 * @param 要获取的参数：例如 id
 * @returns 参数值
 */

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
/** 
 * xuelin 
 * 数字格式转换成千分位 4位小数 
 *@param{Object}num  
 */  
function commafyandfour(num) {
	if (num == "") {
		return 0.0000;
	}
	if (isNaN(num)) {
		return 0.0000;
	}
	num=parseFloat(num+"").toFixed(4);
	return num;
}

/** 
 * xuelin 
 * 数字格式转换成千分位 2位小数 
 *@param{Object}num  
 */  
function commafyandtwo(num) {
	if (num == "") {
		return 0;
	}
	if (isNaN(num)) {
		return 0;
	}
	num=parseFloat(num+"").toFixed(2);
	return num;
}
/** 
 * 林晓强   不是文本框，
 * <td class='numberd'></td>
 * 数字格式转换成千分位 2位小数 
 *@param{Object}num  
 */
function pasedivtime(){
	var innumb=$(".numberd");
	for(var i=0;i<innumb.length;i++){
		if($(innumb[i]).text()!=""){
			var noqfwnum=$(innumb[i]).text();
			var number=commafy(noqfwnum.replace(",",""));
			$(innumb[i]).text(number);
		}
	}

	
	
	
	
}

/*必输校验*/
function mustCheck(){
	var flag= true;
	var check = $('.mustCheck');
	for(var i=0;i<check.length;i++){
		var inputV = $(check[i]).val();
		var reg = /[^\s]{1,}/;
		if(!inputV.match(reg)){
			$(check[i]).addClass("redinput");

			var span=$(check[i]).parent().find('span');
			if(span.length==0){
				$(check[i]).parent().append("<span style='color:red'>&nbsp;必填</span>");
			}
			
			flag=false;
			//return false;
		}else{
			$(check[i]).parent().find('span').remove();
			$(check[i]).removeClass("redinput");
			//flag=true;
		}
		
	}
	
	return flag;
}
/*移除掉必输校验*/
function removeMustCheckClass(){
	var flag= true;
	var check = $('.mustCheck');
	for(var i=0;i<check.length;i++){
		$(check[i]).parent().find('span').remove();
		$(check[i]).removeClass("redinput");
	}
	return flag;
}
/*移除掉必输校验*/
function removeMustCheckAllClass(){
	var flag= true;
	var check = $('.mustCheck');
	for(var i=0;i<check.length;i++){
		$(check[i]).parent().find('strong').remove();
		$(check[i]).removeClass("redinput");
	}
	return flag;
}

/*必输校验 在其中已经有span标签 -- 刘忠庆*/
function mustCheckSpecial(){
	var flag= true;
	var check = $('.mustCheck');
	for(var i=0;i<check.length;i++){
		var inputV = $(check[i]).val();
		//判空用的 -- 刘忠庆
		var reg = /[^\s]{1,}/;
		if(!inputV.match(reg)){
			$(check[i]).addClass("redinput");
			var a =$(check[i]).parent().find('strong');
			if(a.length==0){
				$(check[i]).parent().append("<strong style='color:red'>&nbsp;必填</strong>");
			}
			
			flag=false;
		}else{
			$(check[i]).parent().find('strong').remove();
			$(check[i]).removeClass("redinput");
			//flag=true;
		}
		
	}
	
	return flag;
}

/*必输校验 在其中已经有span标签 -- 刘忠庆*/
function mustCheckAll(){
	var flag= true;
	var check = $('.mustCheck');
	for(var i=0;i<check.length;i++){
		var inputV = $(check[i]).val();
		var reg = /[^\s]{1,}/;
		if(!inputV.match(reg)){
			
			$(check[i]).addClass("redinput");
			
			var a =$(check[i]).parent().find('strong');
			if(a.length==0){
				$(check[i]).parent().append("<strong style='color:red'>&nbsp;必填</strong>");
			}
			
			flag=false;
		}else{
			$(check[i]).parent().find('strong').remove();
			$(check[i]).removeClass("redinput");
			//flag=true;
		}
		
	}
	
	return flag;
}

/*
 * 获得工程路径
 * xx/sa
 */
function getProjectPath() {
	//获得路径
	var curPath=window.document.location.href;
	var pathName=window.document.location.pathname;
	var pos=curPath.indexOf(pathName);
	var localhostPaht=curPath.substring(0,pos);
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	return localhostPaht+projectName ;
	
}
//带radio必输！ 只支持校验一个字段的，不支持多个；
function radioMust(arr){
	var flag=false;
	for(var i=0;i<arr.length;i++){
		var obj =$("input[name='"+arr[i]+"']");
		
		for(i=0; i<obj.length;i++)    {
			if(obj[i].checked){ 
			 flag = true;
			}
		} 
		if(flag){
			$(obj).parent().parent().find("strong").remove("strong");
			
		}else{
			if($(obj).parent().parent().find('strong').length==0){
				$(obj).parent().parent().append("<strong style='color:red'>&nbsp;必填</strong>");
			}
		}
		 
	}
	
	return flag;
}

//带日期必输！
function dateMust(arr){
	var flage=true;
	for(var i=0;i<arr.length;i++){
		var riqi=$("input[name='"+arr[i]+"']");
		var reg = /[^\s]{1,}/;
		if(!$(riqi).val().match(reg)){
			$(riqi).parent().css("border","1px solid red");
			if($(riqi).parent().parent().find('strong').length==0){
				$(riqi).parent().parent().append("<strong style='color:red'>&nbsp;必填</strong>");
			}
			
			flage=false;
		}else{
			$(riqi).parent().css("border","1px solid #ABADB3");
			$(riqi).parent().parent().find("strong").remove("strong");
		}
	}
	
	return flage;
}
$(function(){
	var innumb=$(".number");
	for(var i=0;i<innumb.length;i++){
		var number=commafy($(innumb[i]).attr("value"));
		$(innumb[i]).val(number);
		if($(innumb[i]).attr("value")==undefined||$(innumb[i]).attr("value")==""){
			$(innumb[i]).attr("value","0.00");
		}
	}
	var innumb=$(".area");
	for(var i=0;i<innumb.length;i++){
		var number=commafyandfour($(innumb[i]).attr("value"));
		$(innumb[i]).val(number);
	}
	var innumb=$(".discount");
	for(var i=0;i<innumb.length;i++){
		var number=commafyandtwo($(innumb[i]).attr("value"));
		$(innumb[i]).val(number);
	}
	$(".discount").focus(function(){
		var data=$(this).val();
		data=data.replace(/,/g,"");
		$(this).val(data);
	});
$(".number").focus(function(){
	var data=$(this).val();
	data=data.replace(/,/g,"");
	$(this).val(data);
});
$(".area1").focus(function(){
	var data=$(this).val();
	data=data.replace(/,/g,"");
	$(this).val(data);
});
$(".area").focus(function(){
	var data=$(this).val();
	data=data.replace(/,/g,"");
	$(this).val(data);
});

//千分位数字校验
$(".number").blur(function(){
	 var pattern = /^([0-9.-]+)$/;
	var data=$(this).val();
	data=data.replace(/,/g,"");
	if(pattern.test(data)){
		
		var zhnumber=commafy(data);
		
		$(this).val(zhnumber);
		zhnumber=zhnumber.replace(/,/g,"");
		parseFloat(zhnumber);
		$(this).attr("value",zhnumber);
	}else{
		  
		if(data.replace(/(^\s*)|(\s*$)/g, "")==""){
			$(this).attr("value","0.00");
			return;
		}
		$(this).val("0.00");
		alert_warning("必须输入数字");
		$(this).attr("value","0.00");
	}
	
	
});
$(".area").blur(function(){
	 var pattern = /^([0-9.]+)$/;
	var data=$(this).val();
	if(pattern.test(data)){
		$(this).val(parseFloat(data).toFixed(4));
		$(this).attr("value",parseFloat(data).toFixed(4));
	}else{
		  
		if(data.replace(/(^\s*)|(\s*$)/g, "")==""){
			return;
		}
		$(this).val("0.0000");
		alert_warning("必须输入数字");
		$(this).attr("value","0.0000");
	}
	
	
});
});
function isString(num) {
    return Object.prototype.toString.apply(num) == '[object String]';
}
function onblurdata(data,n){   
	
	var s=$(data).val();
	if(s.indexOf(",")>=0){
		return s;
	}
    n = n > 0 && n <= 20 ? n : 2;   
    
    if(isString(s)) {
        s = s * 1;
    }
    s = parseFloat((s + "")).toFixed(n) + ""; 
    var l = s.split(".")[0].split(""),   
        r = s.split(".")[1];  
        
        t = "";   
   for(var i = 0; i < l.length; i ++ ){   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   $(data).attr("value",s);
   //数字靠右 -- 刘忠庆
   $(data).addClass("tar");
   return t.split("").join("") + "." + r; 
} 
function firstblue(data){
	
}
function showtime(){
	var innumb=$(".number");
	for(var i=0;i<innumb.length;i++){
		$(innumb[i]).val($(innumb[i]).attr('value'));
	}
	var unit=$(".unit");
	for(var i=0;i<unit.length;i++){
		$(unit[i]).val($(unit[i]).attr('value'));
	}
}
function pasetime(){
	var innumb=$(".number");
	for(var i=0;i<innumb.length;i++){
		var number=commafy($(innumb[i]).attr("value"));
		$(innumb[i]).val(number);
	}
	var unit=$(".unit");
	for(var i=0;i<unit.length;i++){
		var number=commafysion($(unit[i]).attr("value"));
		$(unit[i]).val(number);
	}
}
function loadtime(){
	var innumb=$(".number");
	for(var i=0;i<innumb.length;i++){
		var data = $(innumb[i]).val();
		data=data.replace(/,/g,"");
		$(innumb[i]).attr("value",data);
		var number=commafy(data);
		$(innumb[i]).val(number);
		
	}
	
	var unit=$(".unit");
	for(var i=0;i<unit.length;i++){
		var data = $(unit[i]).val();
		data=data.replace(/,/g,"");
		$(unit[i]).attr("value",data);
		var number=commafysion(data);
		$(unit[i]).val(number);
		
	}
	
}

function keeptwo(){
	//保留两位小数 ， 但是不够任何参数的控制 -- 刘忠庆
	var unit=$(".keeptwo");
	for(var i=0;i<unit.length;i++){
		var data = $(unit[i]).val();
		data=data.replace(/,/g,"");
		$(unit[i]).attr("value",data);
		var number=commafyandtwo(data);
		$(unit[i]).val(number);
		
	}
}

//验证身份证
function checkIdCard(idcard){
	var reg =  /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
	var flag= true;
	var check = $('.errordes');
	var way = $(".vdocutype");
	for(var i=0;i<check.length;i++){
		var inputV = $(check[i]).val();
		var way11 = $(way[i]).val();
		//alert(inputV);
		//var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		 if (way11 == "身份证" ) {
			 if (inputV=="") {
					return true;
				}
				if(reg.test(inputV) == false){
					$(check[i]).addClass("redinput");
					var a =$(check[i]).parent().find('a');
					if(a.length==0){
						$(check[i]).parent().append("<a style='color:red'>&nbsp;不合法</a>");
					}
					flag=false;
				}else{
					$(check[i]).parent().find('a').remove();
					$(check[i]).removeClass("redinput");
					//flag=true;
				}
		 }else {
			 $(check[i]).parent().find('a').remove();
			 $(check[i]).removeClass("redinput");
		 }
		 
		
	}
	
	return flag;
}
//校验手机号
$(function(){
	$('.mobilenum').blur(function(){
		savechecke(this);
	
	});
});

function savechecke(data){
		var mustch = $(data).attr("class");
		//if(mustch.contains('mustCheck')){
			if($(data).val()==""){
				$(data).parent().find(".pattern").remove();
				$(data).css("border-color","");
				return;
			}
		//}
		if(!$(data).val().match(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/)){
			if($(data).parent().find(".pattern").length>0){
				
			}else{
				$(data).next().remove();
				$(data).removeClass("redinput");
				$(data).parent().append("<span class='pattern' style='color:red;'>&nbsp;不正确</span>");
				$(data).css("border-color","red");
			}
			// $("#mobilnum").focus();
		} else{
			$(data).parent().find(".pattern").remove();
			$(data).css("border-color","");
		}
	
}
function checkMobile(){
	var mobilenum=$('.mobilenum');
	for(var i=0;i<mobilenum.length;i++){
		savechecke($(mobilenum[i]));
	}
	if($(".pattern").length>0){
		return false;
	}
	return true;
}

/**
 * 设置GridTd>title--某列
 * 内容不含特殊html标签
 * 其值取自datagrid 
 * @param tableid datagrid id
 * @param filed 需要显示title的字段
 * @param index 本页面<script>中按顺序排的序号[1..n]
 */
function setGridTdTitle(tableid,filed,index){
			if(index == undefined || index == ""){
				index = 1;
			}
			var rows = $('#'+tableid).datagrid('getRows'); 
			var len = rows.length;
			for(var i = 0; i < len; i++){
				var mc = rows[i][filed];
				$("#datagrid-row-r"+index+"-2-"+i+" td[field='"+filed+"']").attr("title",mc);
			}
}


/**
 * 设置GridTd>title--某列
 * 内容含特殊html标签
 * 取自页面
 * @param tableid datagrid id
 * @param filed 需要显示title的字段
 * @param index 本页面<script>中按顺序排的序号[1..n]
 */
function setGridTdTitleSpec(tableid,filed,index){
			if(index == undefined || index == ""){
				index = 1;
			}
			var rows = $('#'+tableid).datagrid('getRows'); 
			var len = rows.length;
			for(var i = 0; i < len; i++){
				var mc = $("#datagrid-row-r"+index+"-2-"+i+" td[field='"+filed+"']").text();
				$("#datagrid-row-r"+index+"-2-"+i+" td[field='"+filed+"']").attr("title",mc);
			}
}

/**
 * 设置GridTd>title--
 * 多列
 * 内容不含特殊html标签
 * 其值取自datagrid
 * @param tableid datagrid id
 * @param filed 需要显示title的字段数组
 * @param index 本页面<script>中按顺序排的序号[1..n]
 */
function setGridTdsTitle(tableid,fileds,index){
			if(index == undefined || index == ""){
				index = 1;
			}
			var rows = $('#'+tableid).datagrid('getRows'); 
			var len = rows.length;
			var lg = fileds.length;
			for(var i = 0; i < len; i++){
				for(var j = 0; j < lg; j++){
					var mc = rows[i][fileds[j]];
					$("#datagrid-row-r"+index+"-2-"+i+" td[field='"+fileds[j]+"']").attr("title",mc);
				}
			}
}


/**
 * 设置GridTd>title--
 * 多列{}
 * 内容含有特殊html标签
 * 取自页面
 * @param tableid datagrid id
 * @param filed 需要显示title的字段数组
 * @param index 本页面<script>中按顺序排的序号[1..n]
 */
function setGridTdsTitleSpec(tableid,fileds,index){
			if(index == undefined || index == ""){
				index = 1;
			}
			var rows = $('#'+tableid).datagrid('getRows'); 
			var len = rows.length;
			var lg = fileds.length;
			for(var i = 0; i < len; i++){
				for(var j = 0; j < lg; j++){
					var mc = $("#datagrid-row-r"+index+"-2-"+i+" td[field='"+fileds[j]+"']").text();
					$("#datagrid-row-r"+index+"-2-"+i+" td[field='"+fileds[j]+"']").attr("title",mc);
				}
			}
}

//折扣选择界面，下面选中折扣需要做的校验 -- 刘忠庆
function checkDiscountDownData(tableid){
	var tolrow = $(tableid).datagrid('getRows');
	for(var i = 0 ; i < tolrow.length ; i++){
		var rowindex = $(tableid).datagrid('getRowIndex', tolrow[i]);
		$(tableid).datagrid('endEdit', rowindex);
	} 
	var all= $(tableid).datagrid('getRows');
	var message="";
	for (var i = 0 ; i < all.length ; i++) {
		if (all[i].vdiscounttype == "特批折扣") {
			if (all[i].ndiscountmny > all[i].norigdiscountmny) {
				message+=" 扣款类型为：["+all[i].vdiscounttype+" ]的本次折扣比例（金额）不能大于初始金额值";
				$(tableid).datagrid('updateRow',{
					index: i,
					row: {
						ndiscountmny: all[i].norigdiscountmny
					}});
			}
			
		}else {
				if (all[i].method == '打折' ) {
				
				if (all[i].ndiscountmny < all[i].norigdiscountmny) {
					message+=" 扣款名称为：["+all[i].vdiscountname+" ]的本次折扣比例（金额）不能低于初始比例";
					$(tableid).datagrid('updateRow',{
						index: i,
						row: {
							ndiscountmny: all[i].norigdiscountmny
						}});
				}
				
				if (all[i].ndiscountmny < 0) {
					message+=" 扣款名称为：["+all[i].vdiscountname+" ]的本次折扣比例（金额）不能小于0";
					$(tableid).datagrid('updateRow',{
						index: i,
						row: {
							ndiscountmny: all[i].norigdiscountmny
						}});
				}
				if (all[i].ndiscountmny >100) {
					message+=" 扣款名称为：["+all[i].vdiscountname+" ]的本次折扣比例（金额）不能大于100";
					$(tableid).datagrid('updateRow',{
						index: i,
						row: {
							ndiscountmny: all[i].norigdiscountmny
						}});
				}
				
			}else if (all[i].method == '减点' ) {
				
				if (all[i].ndiscountmny > all[i].norigdiscountmny) {
					message+=" 扣款名称为：["+all[i].vdiscountname+" ]的本次折扣比例（金额）不能大于初始比例";
					
					$(tableid).datagrid('updateRow',{
						index: i,
						row: {
							ndiscountmny: all[i].norigdiscountmny
						}});
				}
				
				if (all[i].ndiscountmny < 0) {
					message+=" 扣款名称为：["+all[i].vdiscountname+" ]的本次折扣比例（金额）不能小于0";
					
					$(tableid).datagrid('updateRow',{
						index: i,
						row: {
							ndiscountmny: all[i].norigdiscountmny
						}});
				}
				if (all[i].ndiscountmny >100) {
					message+=" 扣款名称为：["+all[i].vdiscountname+" ]的本次折扣比例（金额）不能大于100";
					$(tableid).datagrid('updateRow',{
						index: i,
						row: {
							ndiscountmny: all[i].norigdiscountmny
						}});
				}
				
			}else{
				if (all[i].ndiscountmny > all[i].norigdiscountmny) {
					message+=" 扣款名称为：["+all[i].vdiscountname+" ]的本次折扣比例（金额）不能大于初始金额值";
					$(tableid).datagrid('updateRow',{
						index: i,
						row: {
							ndiscountmny: all[i].norigdiscountmny
						}});
				}
			}
		}
	}
	return message;
}

/**  
 * 扩展两个方法 
 * datagrid上的单元格内容显示 -- 刘忠庆 2015-7-23 
 * 使用方法：pttg_gj 为datagrid的id 其他的是固定的
 * onLoadSuccess: function (data) {$('#pttg_gj').datagrid('doCellTip',{'max-width':'100px'});}
 */  
$.extend($.fn.datagrid.methods, {   
    /**
     * 开打提示功能  
     * @param {} jq  
     * @param {} params 提示消息框的样式  
     * @return {}  
     */  
    doCellTip : function(jq, params) {   
        function showTip(data, td, e) {   
            if ($(td).text() == "")   
                return;   
            data.tooltip.text($(td).text()).css({   
                        top : (e.pageY + 10) + 'px',   
                        left : (e.pageX + 20) + 'px',   
                        'z-index' : $.fn.window.defaults.zIndex,   
                        display : 'block'   
                    });   
        };   
        return jq.each(function() {   
            var grid = $(this);   
            var options = $(this).data('datagrid');   
           // if (!options.tooltip) {   
                var panel = grid.datagrid('getPanel').panel('panel');   
                var defaultCls = {   
                    'border' : '1px solid #333',   
                    'padding' : '1px',   
                    //'color' : '#333',   
                    //'background' : '#f7f5d1',  
                    'background' : '#f2f2f2',   
                    'position' : 'absolute',   
                    'max-width' : '200px',   
                    'border-radius' : '4px',   
                    '-moz-border-radius' : '4px',   
                    '-webkit-border-radius' : '4px',   
                    'display' : 'none'   
                }   
                var tooltip = $("<div id='celltip'></div>").appendTo('body');   
                tooltip.css($.extend({}, defaultCls, params.cls));   
                options.tooltip = tooltip;   
                panel.find('.datagrid-body').each(function() {   
                    var delegateEle = $(this).find('> div.datagrid-body-inner').length   
                            ? $(this).find('> div.datagrid-body-inner')[0]   
                            : this;   
                    $(delegateEle).undelegate('td', 'mouseover').undelegate(   
                            'td', 'mouseout').undelegate('td', 'mousemove')   
                            .delegate('td', {   
                                'mouseover' : function(e) {   
                                    if (params.delay) {   
                                        if (options.tipDelayTime)   
                                            clearTimeout(options.tipDelayTime);   
                                        var that = this;   
                                        options.tipDelayTime = setTimeout(   
                                                function() {   
                                                    showTip(options, that, e);   
                                                }, params.delay);   
                                    } else {   
                                        showTip(options, this, e);   
                                    }   
  
                                },   
                                'mouseout' : function(e) {   
                                    if (options.tipDelayTime)   
                                        clearTimeout(options.tipDelayTime);   
                                    options.tooltip.css({   
                                                'display' : 'none'   
                                            });   
                                },   
                                'mousemove' : function(e) {   
                                    var that = this;   
                                    if (options.tipDelayTime) {   
                                        clearTimeout(options.tipDelayTime);   
                                        options.tipDelayTime = setTimeout(   
                                                function() {   
                                                    showTip(options, that, e);   
                                                }, params.delay);   
                                    } else {   
                                        showTip(options, that, e);   
                                    }   
                                }   
                            });   
                });   
  
           // }   
  
        });   
    },   
    /**
     * 关闭消息提示功能  
     * @param {} jq  
     * @return {}  
     */  
    cancelCellTip : function(jq) {   
        return jq.each(function() {   
                    var data = $(this).data('datagrid');   
                    if (data.tooltip) {   
                        data.tooltip.remove();   
                        data.tooltip = null;   
                        var panel = $(this).datagrid('getPanel').panel('panel');   
                        panel.find('.datagrid-body').undelegate('td',   
                                'mouseover').undelegate('td', 'mouseout')   
                                .undelegate('td', 'mousemove')   
                    }   
                    if (data.tipDelayTime) {   
                        clearTimeout(data.tipDelayTime);   
                        data.tipDelayTime = null;   
                    }   
                });   
    }   
});  

//显示打印模板 或直接打印
function displayTemplet(node, BisPreview,receiptid,corpid,deptid){
    var nodetype = node;
//    alert("receiptid:"+receiptid+"corpid:"+corpid+"deptid:"+deptid);
//    return;
    if(corpid==undefined){
        corpid = $("input[name='corpid']").val();
    }
    if(deptid==undefined){
    	deptid = $("input[name='deptid']").val();
    }
    if(receiptid==undefined){
    	receiptid = $("input[name='id']").val();
    }
	if(nodetype=='1'){
		nodetype="日常报销";
	}else if(nodetype=='2'){
		nodetype="合同付款";
	}else if(nodetype=='3'){
		nodetype="领借款";
	}
	if(BisPreview==0){
		//点打印按钮时
		 var uri2 = "/ex/basedoc/templet/stamp!templetisone.do?nodetype="+nodetype+"&";
	   	 $.ajax({
		     type : "POST",
		     url : encodeURI(uri2),
		     async:false,
		     cache:false,
		     success : function(data) {
		    	 if(data.number=='one'){
		    		 //如果只有一个模板，直接打印
		    		 var uri3 = "/ex/basedoc/templet/stamp!preview.do?receiptid="+receiptid+"&vnodereleted="+nodetype+"&";
		    		 $.ajax({
		    		     type : "POST",
		    		     url : encodeURI(uri3),
		    		     data : {"templetid":data.sourceid},
		    		     async:false,
		    		     cache:false,
		    		     success : function(data) {
		    		    	 var dataHtml=data.vtextarea_;
	    			    		if(dataHtml!=null&&dataHtml!=''){
	    			    			var text = dataHtml;
	    			   	    	 //拼接条形码
	    			   	    	 var text_ = joinbarcode(text);
	    			   			 dataHtml=text_;
       			    		     doPrint(dataHtml, '');
	    			    		}
		    		     },
		    		     error : function(e) {
		    		     }
		    		    });
		    	 }else if(data.number=='zero'){
		    			showmsg("提示", "没有对应模板，请建立模板后打印", 3);
		    	 }else{
		    		 //如果多个模板则把所有模板列出
		    		 var uri4 = '/ex/basedoc/templet/stamp!display.do?nodetype='+nodetype+'&receiptid='+receiptid+'&stamp='+stamp+'&'; 
		    		 winOpen(encodeURI(uri4));
		    	 }
		     },
		     error : function(e) {
		     }
		    });

	}else{
		//点打印预览按钮时
		 
		 var uri1 = "/ex/basedoc/templet/stamp!templetisone.do?nodetype="+nodetype+'&receiptid='+receiptid+'&corpid='+corpid+'&deptid='+deptid+'&';

		$.ajax({
		     type : "POST",
		     url : encodeURI(uri1),
		     async:false,
		     cache:false,
		     success : function(data) {
		    	 if(data.number=='zero'){
		    		 showmsg("提示", "没有对应模板，请建立模板后打印", 3);
		    	 }else{
		    		 var uri5 = '/ex/basedoc/templet/stamp!display.do?nodetype='+nodetype+'&receiptid='+receiptid+'&corpid='+corpid+'&deptid='+deptid+'&'; 
		    		 winOpen(encodeURI(uri5));
		    	 }
		     },
		     error : function(e) {
		     }
		    });    	 
	}
}
//拼接条形码
function joinbarcode(text){  
	var start = text.indexOf('[|');
	var end = text.indexOf('|]');
	if(start!=-1&&end!=-1){
		var code = text.substring(start+2,end);
//		alert(code);
		var barcode = createBarcode(code,'B');
//		alert(barcode);
		var text_ = text.replace('[|'+code+'|]',"<div style='width:auto;height:70px;display:inline-block'>"+barcode+"</div>");
		return text_;
	}else{
		return text;
	}
}
function collapsetree(nodenum,dg){ 
	var $dg=$("#"+dg);
	var roots=$dg.treegrid('getRoots'),children,j;
    children= $dg.treegrid('getChildren',roots[0].target);
    for(j=0;j<children.length;j++){
    	var level = $dg.treegrid('getLevel',children[j].treeid);
	    if(level<=nodenum ){
	    	$dg.treegrid('expand', children[j].treeid); 
	    }else {
	    	$dg.treegrid('collapse', children[j].treeid); 
	    }
    }
} 
