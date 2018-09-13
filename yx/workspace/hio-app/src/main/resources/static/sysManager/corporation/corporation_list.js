var rowData;//当前选中数据
var rowDataBefore;
$(function(){
    //页面加载完成之后执行
    pageInit();
    
    $.xljUtils.resizeNestedGrid();
    $("#Corname").inputPlaceholder();
    $("#Corname").keypress(function(e){
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13){
     	   searchDate();
        }
 })
});  


/**
 * author:liuf
 * 页面加载 显示数据列表 以及加载select框选择
 * param:null
 */
function pageInit(){
	getCorporationData();
	//getAccontData(); 显示字表  
    getCompanyAndZb();//加载筛选条件  
  	 getBaseRegionData();
	 
}
/**
 * author:liuf
 * describe:查询所有公司数据 
 * param:null
 */
function getCompanyAndZb(){
	$('#companyName,#selectCompanyName').on('click', function() {
		var urlBody = "sys/org/orgnazation/queryListCompanyAndZb";
		var urlAll = serviceUrl + urlBody;
		var dataPost = {
			menuDelFlag : "0",
			menuStatus : "1",
			appId : $('#appId').val(),
		}
		$(document.body).data($(this).attr('id'), '');
		$(this).xljSingleSelector({
			title : '选择所属公司',//选择器标题，默认是'选择组织机构'
			selectorType : 'selectCompanyAndZb',//选择器类型，默认是组织机构选择器
			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
			treeUrl : urlAll,
			treeParam : dataPost,//生成zTree树的参数
			targetId : 'companyId',//选择的数据的ID存储input域
			targetName : 'companyName',//选择的数据的Name存储input域
			ajaxType : 'POST', //ajax的type 默认为post
			formatTreeJson : function(data) {
				return data;
			},
			treeSettings : {
				data : {
					simpleData : {
						enable : true,
						idKey : 'id',
						pIdKey : 'parentId'
					}
				}
			}
		});
	});

}
function empty(obj) {
	$("#companyName").val("");
	$("#companyId").val("");
}
/**
 * author:liuf
 * describe:加载页面上部的select框选择  查询省级数据
 * param:null
 */
function getBaseRegionData(){
	  $.ajax({
          type:'POST',
          url:serviceUrl+'sys/base/baseRegion/getBaseRegionData',
          dataType:'json',
          contentType:'application/json',
          async:false,
          data:"{}",
          success: function(json) {
        	  if(json.success){
        		  data=json.result;
        		  var bodyData = {};
        		  for (var o in data){
        			  if(!data[o].parentId){
        				  $("#selectProvice").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>")//数据压到select元素里面  
        			  }
        		
        		  }
        	  }else{
        			$.xljUtils.tip("red",json.msg);
        	  }
          },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        },
            gridComplete:function(){

             }
      });
}
/**
 * author:liuf
 * describe:删除供方信息  伪删除  包括字表 账号  支持批量删除
 * param:null
 */
function deleteCorporation(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要删除的行");
		return;
	}
	var prvid=$("#"+ids).prev().attr("id");
if(ids&&ids!='') {
	  pop_text_open("blue",'确认要删除这条数据吗？',function(){
			$.ajax({
				url:serviceUrl+"sys/base/baseCorporation/delete/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						 rowData = {id:prvid};
						$('#list2').jqGrid().trigger("reloadGrid");
						pop_tip_open("green","删除成功！");
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
}
/**
 * author:liuf
 * describe:装载过滤查询的条件
 * param:null
 */
function searchDate(){
	var name=$("#Corname").getInputVal();
	var companyname=$("#companyId").val();
	var provicename=$("#selectProvice option:selected").val();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{name:name,companyname:companyname,provicename:provicename},page:1}).trigger("reloadGrid");
	getCorporationData();
}
/**
 * author:liuf
 * describe:删除供方信息  伪删除  包括字表 账号  支持批量删除
 * param: name companyname provincename
 */
function getCorporationData(){
    jQuery("#list2").jqGrid(
            {
                url: serviceUrl+'sys/base/baseCorporation/page',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                postData:{name:"",companyname:"",provicename:""},
                autowidth:true,
                rownumbers:true,
                jsonReader : {
                    repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'name',label : '法人名称',align : "center",cellattr: addCellAttr},
                    {name : 'code',label : '法人代表',align : "center"},
                    {name : 'status',label : '状态',align : "center",formatter:function(status){
                    	if(status=="0"){
                    		return "禁用";
                    	}else if(status=="1"){
                    		return "启用";
                    	}else{
                    		return "";
                    	}
                    },cellattr: addCellAttr},
                    {name : 'provinceName',label : '所在省',align : "center"},
                    {name : 'cityName',label : '所在市',align : "center"},
                    {name : 'companyName',label : '所属公司',align : "center"},
                    {name : 'remark',label : '备注',align : "center"}
                ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
                ondblClickRow:function(rowid){
                	window.open("corporation_edit.html?type=edit&id="+rowid);//跳转查看页面
                },
                onCellSelect: function(){
                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#list2'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                onSelectRow: function () {
                	var rowId=$('#list2').jqGrid("getGridParam","selrow");
        		      rowData = $('#list2').jqGrid('getRowData',rowId);
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
                        	$('#list2').setSelection(rowDataBefore.id,true);
                        	$('#list2'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                        }
              
                }
            });
};
/**
 * author:liuf
 * describe:查询字表数据 
 * param:null
 */
function getAccontData(){
    jQuery("#list3").jqGrid({
		url: serviceUrl+'sys/base/baseCorporationAccont/getAccontByCorporationId',
        ajaxGridOptions: { contentType: 'application/json' },
        mtype : "POST",  
        contentType : "application/json",  
        datatype : "json", 
        autowidth:true,
        rownumbers:true,
        postData:{id:""},
        jsonReader : {
            repeatitems: false
        },
        colModel : [ 
            {name : 'id',label : 'id',hidden:true,align : "center"},
            {name : 'bankName',label : '开户银行',align : "center"},
            {name : 'bankCode',label : '银行账号',align : "center"},
            {name : 'provinceName',label : '银行所在省',align : "center"},
            {name : 'cityName',label : '银行所在市',align : "center"},
            {name : 'address',label : '银行地址',align : "center"},
            {name : 'isDefault',label : '是否默认',align : "center",formatter:function(isDefault){
            	if(isDefault=="0"){
            		return "否";
            	}else if(isDefault=="1"){
            		return "是";
            	}else{
            		return "";
            	}
            }
            },
            {name : 'remark',label : '备注',align : "center"}
        ],
        pager : '#pager3',
        viewrecords : true
	});
    
}
/**
 * author:liuf
 * describe:修改状态  0 是禁用 1是启用
 * param:e(0 or 1)
 */
function  updateStatus(e){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要修改状态的行！");
		return;
	}
	var rowData = $("#list2").jqGrid("getRowData",ids);
	var  dataStatus="";
	if(rowData.status=="启用"){
		dataStatus=1;
	}else if(rowData.status=="禁用"){
		dataStatus=0;
	}
	if(e==dataStatus){
		return;
	}else{
		$.ajax({
			url:serviceUrl+"sys/base/baseCorporation/updateStatus/"+ids,
			type:'PUT',
			dataType:'JSON',
			success:function (resultData ) {
				if (resultData&&resultData.success) {
				$('#list2').jqGrid().trigger("reloadGrid");
					pop_tip_open("green","修改状态成功！");
				}else{
					pop_tip_open("red","修改状态失败！");
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        },complete:function(){
	     
	        	
	        }
		});
	}
}
/**
 * author:liuf
 * describe:跳转编辑页面
 * param:id(行id)
 */
function toupdate(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要修改的行！");
		return;
	}
	window.open("corporation_edit.html?type=edit&id="+ids);
}
/**
 * author:liuf
 * describe:跳转新增页面
 * param:null
 */
function toadd(){
	window.open("corporation_edit.html?type=add");
}

function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}
function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowData = {id:id};
	 $('#list2').jqGrid().trigger("reloadGrid");
}