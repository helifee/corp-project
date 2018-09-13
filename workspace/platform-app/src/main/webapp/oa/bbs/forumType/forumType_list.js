/**
 * @author luorongxin
 */
var rowData;//当前选中数据
var rowDataBefore;//上一次选中数据
var openUrl="forumType/forumType_edit.html";//编辑页
/**
 * 初始化
 */
$(function(){
    if($.inArray("addBtn", menuArray)>-1){
        $('#addBtn').show();
    }
    if($.inArray("updateBtn", menuArray)>-1){
        $('#updateBtn').show();
    }
    if($.inArray("delsBtn", menuArray)>-1){
        $('#delsBtn').show();
    }

    //加载grid
    pageInit();
    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    // //重置模糊搜索关键字
    // $('#keywords').val('');
    //input添加伪placeholder

    $("#keywords").inputPlaceholder();
    // 按钮事件绑定
    $("#updateBtn").unbind('click').on('click',function () {
        editForumType();
    });
    //删除
    $("#delsBtn").unbind('click').on('click',function () {
        del();
    });
    //新增
    $("#addBtn").unbind('click').on('click',function () {
        addForumType();
    });
/*    //启用
    $("#actBtn").unbind('click').on('click',function () {
        changeState(true);
    });
    //禁用
    $("#disBtn").unbind('click').on('click',function () {
        changeState(false);
    });*/
    //模糊查询按钮绑定回车键
    $(document).keydown(function(event){
        if(event.keyCode==13){
            $("#searchBtn").click();
        }
    });
    //禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
    //阻止默认行为
    $('.btn').click(function(e) {
        e.preventDefault();
    });

});
/**
 * 模糊查询: 名字
 */
function fuzzySearch(){
        $('#list').jqGrid().trigger("reloadGrid");
};
/**
 * 加载版块分类列表
 */
function pageInit(n){
    $("#list").jqGrid({
        url: baseUrl+'oa/bbs/forumType/getTree',
        ajaxGridOptions: { contentType: 'application/json' },
        mtype : "POST",
        treeGrid: true,
        treeGridModel: "adjacency",
        ExpandColumn:"name",
        datatype : "json",
        autowidth:true,
        subGrid:true,
        multiselect :true,
        jsonReader : {
            root:function(data){
         	   var name=$("#keywords").getInputVal();// 获取名称
         	   var array=new Array();
         	   var arr=data.result;
         	   	  name=$.trim(name);
         		  if(name){
         			  for(var o in arr){
        				   if(arr[o].name.indexOf(name)>-1){
        					   array.push(arr[o]);
        				   }
        				   arr[o].expanded=false;
         			  }
         			  var resultArray=new Array();
         			  if(arr!=null && arr.length>0){
         				  resultArray = getRecursionData(arr,array,resultArray);
         				  for(var t=0;t<resultArray.length;t++){
         					  for(var s=0;s<arr.length;s++){
         						  if(resultArray[t].id==arr[s].id){
         							 arr[s].expanded=true;
         							 break;
         						  }
         					  }
         				  }
         			  }
         			  return arr;
         		  }else{
         			  return data.result; 
         		  }
            },
            repeatitems : false  
        },
        colModel : [
            {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true},
            {name : 'name',label : '名称',editable:true,width : 60,sortable:false,align:'center'},
            {name : 'code',label : '编码',editable:true,width : 60,sortable:false,align:'center'},
            {name : 'parentName',label : '父级名称',editable:true,width : 60,sortable:false,align:'center'},
            {name : 'createPersonName',label : '创建人',editable:true,width : 60,sortable:false,align:'center'},
            {name : 'createDate',label : '创建时间',editable:true,width : 60,sortable:false,align:'center'}

        ],
        treeReader:{
            level_field: "level",
            parent_id_field: "parentId",
            leaf_field: "isLeaf",
            expanded_field: "expanded",
            left_field:"lft",
            right_field: "rgt"
        },
        onSelectRow: function () {
        	var rowId=$('#list').jqGrid("getGridParam","selrow");
		    rowData = $('#list').jqGrid('getRowData',rowId);
        },
        onCellSelect: function(){
        	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
        		$('#list '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
        	}
        },
        ondblClickRow:function(rowid){
//        	 rowData = $('#list').jqGrid('getRowData',rowid);
//         	window.open(openUrl+"?oper=detail&id="+rowid+"&pname="+encodeURI(rowData.parentName,"UTF-8"));
            rowData = $('#list').jqGrid('getRowData',rowid);
            window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8")+"&pname="+encodeURI(rowData.parentName,"UTF-8"));
        },
        gridComplete: function () {
            $.xljUtils.addGridScroll();
//            var rowId=$('#list').jqGrid("getGridParam","selrow");
//            rowData = $('#list').jqGrid('getRowData',rowId);
//            $('#list '+'#'+rowId).find("td").addClass("ui-state-highlight");
            //模糊查询加粗
            var arrdata=jQuery("#list").jqGrid('getRowData');   
            for(var o in arrdata){
           	 	if(arrdata[o].expanded=="false"){
           	 		$("#"+arrdata[o].id).hide();
           	 	}
            }
            rowDataBefore = rowData;
            if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            	$('#list').setSelection(rowDataBefore.id,true);
            	$('#list '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
            }
        },
        rowNum:-1,
        rowTotal:-1,
        loadError:function(xhr,status,error){
            //异常处理
            if(xhr.status==404){
                $.xljUtils.tip("red","请求url有误！");
                return;
            }
            if(xhr.status==405){
                $.xljUtils.tip("red","请求方法有误！");
                return;
            }
            $.xljUtils.tip("red","网络异常,请联系管理员！");
        },
        loadComplete:function(xhr){
            if(!xhr.success){
                switch (xhr.code) {
                    case "50000":
                        $.xljUtils.tip("red",xhr.msg);
                        break;
                    case "50001":
                        $.xljUtils.tip("red",xhr.msg);
                        break;
                    case "50002":
                        $.xljUtils.tip("blue",xhr.msg);
                        break;
                    case "50003":
                        $.xljUtils.tip("red",xhr.msg);
                        break;

                    default:
                        $.xljUtils.tip("red","查询数据失败！");
                        break;
                }
            }else{
                idsArray(xhr);//生成父子id数组
            }
        }

    });
}

/**
 * 递归查询
 * @param dataArr		原数据
 * @param keyArray		含有查询关键字的数据
 * @param resultArray	返回结果数据
 * @returns
 */
function getRecursionData(dataArr,keyArray,resultArray){
    for(var i=0;i<keyArray.length;i++){
    	resultArray.push(keyArray[i]);
    	for(var k=0;k<dataArr.length;k++){
    		if(keyArray[i].parentId == dataArr[k].id){
    			var isRepeat=isRepeatArray(resultArray,dataArr[k]);
    			if(isRepeat){
    				resultArray.push(dataArr[k]);
    			}
    			resultArray=getParentRecursionData(dataArr,dataArr[k],resultArray);
    		}
    	}
    }
    
    return resultArray;
}

/**
 * @param dataArr		原数据
 * @param dataArrObj	递归中间节点
 * @param resultArray	结果数据
 * @returns
 */
function getParentRecursionData(dataArr,dataArrObj,resultArray){
	if(dataArrObj.parentId!=null && dataArrObj.parentId!=""){
		for(var k=0;k<dataArr.length;k++){
    		if(dataArrObj.parentId == dataArr[k].id){
    			var isRepeat=isRepeatArray(resultArray,dataArr[k]);
    			if(isRepeat){
    				resultArray.push(dataArr[k]);
    			}
    			getParentRecursionData(dataArr,dataArr[k],resultArray);
    		}
    	}
	}
	return resultArray;
}

/**
 * 判断当前节点是否重复
 * @param resultArray	当前所有不重复节点		
 * @param dataArrObj	新的判断是否重复节点
 * @returns {Boolean}	重复false 不重复true
 */
function isRepeatArray(resultArray,dataArrObj){
	var flag=true;
	if(resultArray!=null && resultArray.length>0){
		for(var s=0;s<resultArray.length;s++){
			if(dataArrObj.id==resultArray[s].id){
				flag=false;
				break;
			}
		}
	}
	return flag;
}

/**
 * 生成父子id数组
 */
function idsArray(xhr){
    dataArray = new Array();
    for(var i in xhr.result){
        if(xhr.result[i].level=="0"){
            var data= new Array();
            data.push(xhr.result[i].id);
            dataArray.push(data);
        }
    }
    for(var i in xhr.result){
        if(xhr.result[i].level=="1"){
            var pid = xhr.result[i].parentId;
            var id = xhr.result[i].id;
            for(var j in dataArray){
                var arr = dataArray[j];
                if(arr.indexOf(pid)> -1){
                    arr.push(id);
                }
            }
        }
    }
}
/**
 * 获取对应父子数组
 */
function getIds(pid){
    for(i in dataArray){
        if(dataArray[i].indexOf(pid)>-1){
            return dataArray[i];
        }
    }
}
/**
 * 新增版块分类
 */
var popup;
function addForumType(){
    var rowId=$('#list').jqGrid("getGridParam","selrow");
    rowData = $('#list').jqGrid('getRowData',rowId);
    //查询该节点下是否有表单
	$.ajax({
        type:'get',
        url:baseUrl+'oa/bbs/forumType/getCount/'+rowId+'?time='+Math.random(),
        success: function(data) {
        	var count=data.result;
        	if(count>0){
        		pop_tip_open("blue","该分类下存在版块不能新增！");
        	}else{
    			if(rowId!=null){
    		        popup = window.open(openUrl+"?oper=add&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));
    		    }else{
    		        popup = window.open(openUrl+"?oper=add");
    		    }
        	}
    	}
	});
}


/**
 * 编辑分类
 * @param
 */
function editForumType(){
    var rowId=$('#list').jqGrid("getGridParam","selrow");
    if(rowId==null||rowId=="undefined"){
        $.xljUtils.tip("blue","请选择要修改的数据！");
        return;
    }
    rowData = $('#list').jqGrid('getRowData',rowId);
    window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8")+"&pname="+encodeURI(rowData.parentName,"UTF-8"));
}
/**
 * 位移
 */
function toLocation(oper){
    var rowId=$('#list').jqGrid("getGridParam","selrow");
    if(rowId==null){
        $.xljUtils.tip("blue","请选择要移动的数据！");
        return;
    }
    rowData = $('#list').jqGrid('getRowData',rowId);
    if(rowData){
        var obj = {'id':rowData.id,'sort':rowData.sort,'parentId':rowData.parentId}
        $.ajax({
            url:baseUrl+'/oa/sys/sysNaviMenu/move/'+oper,
            type:'PUT',
            dataType:'JSON',
            contentType:'application/json',
            data:JSON.stringify(obj),
            success:function (xhr, textStatus) {
                if (xhr){
                    if(xhr.success) {
                        $.xljUtils.tip("green",xhr.msg);
                        $('#list').jqGrid().trigger("reloadGrid");
                    }else{
                        if(xhr.code=="50000"){
                            $.xljUtils.tip("red",xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red","数据移动失败！");
                    }
                }else{
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
    }else{
        $.xljUtils.tip("blue","未获取到数据信息！");
    }
}

/**
 * 状态修改
 * @param n
 */
/*function changeState(n){
    var idsVal = $('#list').jqGrid('getGridParam','selarrrow');
    if(idsVal&&idsVal!="") {
        if(idsVal.length>1) {
            $.xljUtils.tip("blue","只能选择一行数据进行状态更新！");
            return;
        }
        var idVal = $('#list').jqGrid('getGridParam','selrow');
        rowData = $('#list').jqGrid('getRowData',idVal);
        //不进行同样状态的操作
        if(n==false&&rowData.state=='false'){
            $.xljUtils.tip("blue","该记录已禁用！");
            return;
        }
        if(n==true&&rowData.state=='true'){
            $.xljUtils.tip("blue","该记录已启用！");
            return;
        }
        $.ajax({
            url:baseUrl+"oa/bbs/forumType/update/"+idVal,
            type:'PUT',
            dataType:'JSON',
            contentType:'application/json',
            data:JSON.stringify({'id':idVal,'state':n}),
            success:function (xhr,textStatus ) {
                console.log(xhr);
                if (xhr){
                    if(xhr.success) {
                        $.xljUtils.tip("green","状态修改成功！");
                        $('#list').jqGrid().trigger("reloadGrid");
                    }else{
                        if(xhr.code=="50000"){
                            $.xljUtils.tip("red",xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red","状态修改失败！");
                    }
                }else{
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }

            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }

        });
    }else{
        $.xljUtils.tip("blue","请选择要操作的数据！");
    }
}*/
/**
 * 删除版块分类
 */
function del(){
    var idsVal = $('#list').jqGrid('getGridParam','selrow');
    var prevId = $("#list #" + idsVal).prev()[0].id;
    if(idsVal&&idsVal!="") {
    	$.ajax({
            type:'get',
            url:baseUrl+'oa/bbs/forumType/isExistForum/'+idsVal+'?time='+Math.random(),
            success: function(data) {
            	var count=data.result;
            	if(count>0){
            		pop_tip_open("blue","该分类或子分类下存在版块不能删除！");
            	}else{
            		pop_text_open("blue", "确认要删除这条数据吗？",function(){
    		            $.ajax({
    		                url:baseUrl+"oa/bbs/forumType/deletePseudo/"+idsVal,
    		                type:'DELETE',
    		                dataType:'JSON',
    		                contentType:'application/json',
    		                data:JSON.stringify({}),
    		                success:function (xhr,textStatus ) {
    		                    if (xhr){
    		                        if(xhr.success) {
    		                            $.xljUtils.tip("green","数据删除成功！");
    		                            rowData = $("#list").jqGrid("getRowData",prevId);
    		                            $('#list').jqGrid().trigger("reloadGrid");
    		                        }else{
    		                            if(xhr.code=="50000"){
    		                                $.xljUtils.tip("red",xhr.msg);
    		                                return;
    		                            }
    		                            $.xljUtils.tip("red","数据删除失败！");
    		                        }
    		                    }else{
    		                        $.xljUtils.tip("red","服务异常,请联系管理员！");
    		                    }
    		                },
    		                error: function(xhr, textStatus, errorThrown) {
    		                    $.xljUtils.tip("red","服务异常,请联系管理员！");
    		                }
    		            });
    		        },true);
            	}
            }
    	});
    }else{
        $.xljUtils.tip("blue","请选择要删除的数据！");
    }
}
/**
 * 刷新grid
 */
function reloadGrid(type,id){
    $.xljUtils.tip("green","数据操作成功！");
    $('#list').jqGrid().trigger("reloadGrid");
    if(type=="add"){
		rowData = {id:id};
	}
}
