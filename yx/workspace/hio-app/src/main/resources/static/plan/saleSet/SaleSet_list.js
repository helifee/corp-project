var rowData;//当前选中数据
var rowDataBefore;
$(function(){
    //页面加载完成之后执行
    pageInit();
    $.xljUtils.resizeNestedGrid();
    
  //增加一项字典项条目
    $('#createItemBtn').on('click',function () {
        var uuid = initUUID();
        var rowDatas = $('#saleSetList').jqGrid('getRowData');
        var count = rowDatas.length;
        $('#saleSetList').jqGrid('addRowData',uuid,{id:uuid,specialName:'',description:'',sort:count+1},'last');
        $('#saleSetList').jqGrid('editRow', uuid, true);
    });

    //取消添加数据项条目
    $('#cancleItemSaveBtn').on('click',function () {
        $('#saleSetList').jqGrid().trigger('reloadGrid');
    });

    //删除行
    $('#deleteItemBtn').on('click',function () {
        var ids = $('#saleSetList').jqGrid('getGridParam', 'selarrrow');
        $.xljUtils.confirm('blue','确定要删除这'+ids.length+'条数据么？',function () {
            $.ajax({
                url: serviceUrl + "plan/plSaleSet/deleteBatch/" + ids,
                type: 'DELETE',
                dataType: 'JSON',
                success: function (resultData) {
                    if (resultData && resultData.success) {
                        var ids1 = $('#saleSetList').jqGrid('getGridParam', 'selarrrow');
                        for (var i = 0; i < ids1.length; i++) {
                            var id = ids1[i];
                            $('#saleSetList').jqGrid('delRowData',id);
                        }

                        $.xljUtils.tip('blue', "数据删除成功！");
                    } else {
                        $.xljUtils.tip('blue', "删除数据失败！");
                    }
                }
            });
        },true);
    });

    //保存字典项条目
    $('#saveItemBtn').on('click',function () {
        var ids = $('#saleSetList').jqGrid('getDataIDs');
        for (var i = 0; i < ids.length; i++) {
            var rowId = ids[i];
            $('#saleSetList').jqGrid('saveRow',rowId,true,'clientArray');
        }

        var rowDatas = $('#saleSetList').jqGrid('getRowData');
        var paramJson = {};
        
        paramJson.saleSetList = JSON.stringify(rowDatas);
        $.ajax({
            url:serviceUrl + 'plan/plSaleSet/saveAllSaleSetList',
            data:JSON.stringify(paramJson),
            type:'POST',
            contentType:'application/json',
            dataType:'JSON',
            success:function (resultData ) {
                if(resultData&&resultData.successs) {
                    $.xljUtils.tip('green','数据保存成功！');
                }

            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                var status = XMLHttpRequest.status;
                $.xljUtils.getError(status);
            }
        });

    });


});  

function pageInit(){
	getCompany();//加载筛选条件
	$("#selectCompany").change(function(){
	  getProject();
	});  
	initsaleSetList();
}

/**
 * author:wangpw
 * describe:查询所有公司数据 
 * param:null
 */
function getCompany(){
	$.ajax({
        type:'post',
        url:serviceUrl+'pl/plCompany/queryList',
        dataType:'json',
        contentType:'application/json',
        data:"{}",
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var company=data.result;
        			 for(var o in company){
        				 $("#selectCompany").append("<option value='"+company[o].companyId+"'>"+company[o].name+"</option>");
        			 }
        		 }
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
}
/**
 * author:wangpw
 * describe:装载所属项目
 * param:null
 */
function getProject(){
	
}

/**
 * author:wangpw
 * describe:装载过滤查询的条件
 * param:null
 */
function searchDate(){
	var companyname=$("#selectCompany option:selected").val();
	var provicename=$("#selectProvice option:selected").val();
 	jQuery("#saleSetList").jqGrid("setGridParam",{postData:{companyname:companyname,provicename:provicename}}).trigger("reloadGrid");
 	getSupplierData();
}


/**
 * author:wangpw
 * describe:删除  伪删除 
 * param:null
 */
function deleteSupplier(){
	var ids=$('#saleSetList').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var next=$("#"+ids).next().attr("id");
	  pop_text_open("blue",'确认要删除这条数据吗？',function(){
			$.ajax({
				url:serviceUrl+"sys/base/baseSupplier/delete/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						/*userOnId=next;*/
						$('#saleSetList').jqGrid().trigger("reloadGrid");
						pop_tip_open("green","删除成功！");
						//$('#list3').clearGridData();
					}else{
						pop_tip_open("red",resultData.msg);
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
		        }
			});
	  },function(){
		  return;
	  });	
}




function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}
function reloadGrid(){
	 pop_tip_open("green","数据操作成功！");
	 $('#saleSetList').jqGrid().trigger("reloadGrid");
}
/*-----------------------------------------------------------------------------------*/

/**
 * 初始化grid列表
 */
function initsaleSetList() {
    jQuery("#saleSetList").jqGrid({
    	url:serviceUrl+'plan/plSaleSet/page',
        ajaxGridOptions: { contentType: 'application/json' },
        mtype : "POST",  
        contentType : "application/json",  
        datatype : "json", 
        postData:{},
        multiboxonly:true,
        multiselect:true,
        autowidth:true,
        rownumbers:true,
        jsonReader : {
        	  repeatitems: false
        },
        colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
            {name : 'id',label : 'id',hidden:true,align : "center"},
            {name : 'specialName',label : '销项名称',align : "center",editable : true},
            {name : 'description',label : '销项描述',align : "center",editable : true},
            {name : 'sort',label:'序号', align:"center",width:55,hidden:true}
        ],
        rowNum : 20,//一页显示多少条
        rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
        pager : '#pager2',//表格页脚的占位符(一般是div)的id          
        
        onCellSelect: function(){
        	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
        		//重新选择行时清除上一次选中行的样式
        		$('#saleSetList'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
        	}
        },
        onSelectRow: function () {
        	var rowId=$('#saleSetList').jqGrid("getGridParam","selrow");
		      rowData = $('#saleSetList').jqGrid('getRowData',rowId);
        },
        viewrecords : true,
        loadError:function(jqXHR, textStatus, errorThrown){
     	   $.xljUtils.getError(jqXHR.status);
        },
         gridComplete:function(){
        	 $.xljUtils.addGridScroll();
			 $.xljUtils.gridResizeFn();
        		rowDataBefore = rowData;
                if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                	//添加回显选中行样式
                	$('#saleSetList').setSelection(rowDataBefore.id,true);
                	$('#saleSetList'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                }
         }
    });
}


/**
 * 获取uuid
 * @returns {*}
 */
function initUUID() {
    var guuid;
    var url = serviceUrl + "sys/uuid/generator/getGuuid"+'?time='+Math.random();
    $.ajax({
        type : 'get',
        async:false,
        url : url,
        success : function(data) {
            guuid = data.result;
            //$("#tempid").val(guuid);
        }
    });
    return guuid;
}




//grid 自适应宽度
$(window).resize(function(){
	$.xljUtils.gridResizeFn();
});
