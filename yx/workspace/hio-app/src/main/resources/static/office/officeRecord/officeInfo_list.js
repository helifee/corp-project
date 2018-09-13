
var treeObj;
var selHouseId;
var selComId;
var selHouseName;
var rowData;//当前选中数据
var rowDataBefore;
$(function() {

	var menuArray = getOperationAuthorition();
	if($.inArray("btnSeeHistory", menuArray)>-1){
		$('#btnSeeHistory').show();
	}
	if($.inArray("btnInCount", menuArray)>-1){
		$('#btnInCount').show();
	}
	if($.inArray("btnDelete", menuArray)>-1){
		$('#btnDelete').show();
	}
	if($.inArray("btnUpdate", menuArray)>-1){
		$('#btnUpdate').show();
	}
	if($.inArray("btnAdd", menuArray)>-1){
		$('#btnAdd').show();
	}
	//生成左侧的菜单数

	getLeftTree();
    $("#searchName").inputPlaceholder();
    $("#searchName").keypress(function(e){
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13){
     	   searchDate();
        }
 })
 $("#officeList").inputPlaceholder();
 $("#officeList").keypress(function(e){
	 var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	 if (eCode == 13){
		 searchList();
	 }
 });

	/**
	 * 删除按钮
	 * add by  yongmei.xiao
	 */
	$("#btnDelete").click(function() {
	    var gr = jQuery("#officeInfoList").jqGrid('getGridParam', 'selarrrow');
	    if (!gr.length||gr.length<1){
	    	pop_tip_open("blue", "请选择要删除的行!");
	    	 return;
	    }
	    var prvid="";
	    	var url;
	        var grStr = gr.join(',');
	        var flag=true;
	        jQuery(gr).each(function(){
	        	var rowDataDel = $('#officeInfoList').jqGrid('getRowData',this);
	        	if(rowDataDel.stockCount!=""&&rowDataDel.stockCount>0){
	        		flag=false;
	        		return false;
	        	}
	        });
	        if(!flag){
	        	pop_tip_open("blue","库存量大于零不可删除");
	        	return false;
	        }
	        if(gr.length > 1) {	//批量删除
	        	url = serviceUrl + "oa/office/officeInfo/deleteBatch/"+grStr
	        }else {	//单个删除
	        	 prvid=$("#"+grStr).prev().attr("id");
	        	url = serviceUrl + "oa/office/officeInfo/delete/"+grStr
	        }
	  	  pop_text_open("blue",'确认要删除这'+gr.length+'条档案吗？',function(){
	    	 $.ajax({
	        	   type: "delete",
	        	   url: url,
	        	   dataType:"json",
	        	   success: function(result){
	        		   if(prvid){
	        				 rowData={id:prvid};
	        		   }
	        		  jQuery("#officeInfoList").trigger('reloadGrid');
	        	   }
	    	 });
	  	 },function(){
			  return;
		  });
	    
	});

	/**
	 * 新增按钮
	 * add by  yongmei.xiao
	 */
	$("#btnAdd").click(function() {
		var nodes = treeObj.getSelectedNodes();
		if(nodes.length != 1 || nodes[0].level==0){
			pop_tip_open("blue","请选择一个分类");
			return false;
		}
		//TODO
		selHouseId=nodes[0].pId;
		selComId=nodes[0].ownedCompany;
		selHouseName=nodes[0].name;
		editType=0;
		window.open('officeInfo_edit.html');
	});

	resizeHeight();
	$(window).resize(function() {
	    resizeHeight();
	});
	//计算高度

});
function resizeHeight(){
	var w_h = $(window).height();
    //左侧  头部底部为60px  title类 为50px
	$(".slide-left .ztree-box").height((w_h-132)+"px");
	//右侧table
	$(".con-table .mytable").height((w_h-80)+"px");
/*	$.xljUtils.resizeNestedGrid();*/
}

/**
 * 查询大类树结构
 * null 参数代表查询所有的树结构，不带条件搜索
 */

function getLeftTree(){
	var setting = {
		    data: {
		        simpleData: {
		            enable: true,
		            pIdKey: 'parentId'
		        },
		        key: {
		        	
		        }
		    },
		    callback: {
		    	beforeClick: function(treeId, treeNode, clickFlag) {
		    		return !treeNode.isParent;
		    	},
		        onClick: loadContentChildByTypeId,
				onCollapse: function(){
					$.xljUtils.treeResizeFn();
				},
				onExpand: function(){
					$.xljUtils.treeResizeFn();
				}
		    }
		};
    $.ajax({
        type: "GET",
        url: serviceUrl + "oa/office/officeHouse/getOfficeHouseTreeById/null?t=" + (+new Date()),
        dataType: "json",
        contentType: 'application/json',
        success: function (typeNodes) {
            var zNodes = typeNodes.result;
    		var inputVal=$("#searchName").getInputVal();
			if(inputVal){
				var resultId="";
				var dataArr=new Array();
			  for(var o in zNodes){
				  if((zNodes[o].name).indexOf(inputVal)>-1){
					  resultId+=zNodes[o].id+","
					  resultId+=zNodes[o].parentId+","
				  }
			  }
			  for(var o in zNodes){
				  if((resultId).indexOf(zNodes[o].id)>-1){
					  dataArr.push(zNodes[o]);
				  }
			  }
				zNodes=	dataArr;
			}
            recursionArray(zNodes);
            treeObj = $.fn.zTree.init($("#_zTree"), setting, zNodes);
            //treeObj.expandAll(true);
            //默认加载第一个菜单的列表数据
            if(zNodes.length>0){
            	var firstChildNode = null;
            	var nodes =  treeObj.transformToArray(treeObj.getNodes());
            	for(var i = 0, len = nodes.length;i<len;i++) {
            		if(!nodes[i].isParent) {
            			firstChildNode = nodes[i];
            			break;
            		}
            	}
            	treeObj.selectNode(firstChildNode);	//选中第一个节点
            	onClick("","",firstChildNode);
            }else{
				onClick("","",null);
			}
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
        },
		error: function(e) {
			onClick("","",null);
		}
	});
}

/**
 * 默认进入只是目录页面的时候，加载左侧树第一个大类信息
 * 加载对应jqgrid数据列表
 */
function onClick(e,treeId,treeNode){
	var parameterData = {};
	if(null!=treeNode){
		parameterData = {stockHouseId: treeNode.pId,accoutId:treeNode.ownedCompany,officeInfoName:""};
	}else{
		parameterData = {stockHouseId: "null",accoutId:"null",officeInfoName:""};
	}
	jQuery("#officeInfoList").jqGrid({
    	url : serviceUrl + "oa/office/officeInfo/getOfficeInfopage",
        ajaxGridOptions: { contentType: 'application/json', aync:true },
        mtype : "post",
        datatype : "json",
        contentType : "application/json",
        postData:parameterData ,
        jsonReader : {
        	repeatitems: false
        },
        colModel : [
             {name : 'id',label : 'id', align:"center",hidden : true},
             {name : 'accoutId',label : 'accoutId', align:"center",hidden : true},
             {name : 'stockNum',label : '编号', align:"center",defaultValue:"eeee"},
             {name : 'stockName',label : '名称', align:"center"},
             {name : 'typeName',label : '所属类别', align:"center"},
             {name : 'stockSpecifications',label : '规格',align:"center"},
             {name : 'stockBrand',label : '品牌',align:"center"},
             {name : 'meteringUnit',label : '单位',align:"center"},
             {name : 'price',label : '单价',align:"center",formatter: "currency", formatoptions: {thousandsSeparator:",",decimalSeparator:"."}},
             {name : 'stockCount',label : '库存量',align:"center"},
             {name : 'outStockCount',label : '可领用量',align:"center"},
             {name : 'buyPrice',label : '入库价格',align:"center",editable : true,formatter: "currency", formatoptions: {thousandsSeparator:",",decimalSeparator:"."}},
             {name : 'inCount',label : '入库量',align:"center",editable : true}
        ],
        rowNum : 20,//一页显示多少条
        rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
        autowidth:true,
        pager : '#pagered',//表格页脚的占位符(一般是div)的id
        rownumbers:true,
        onCellSelect: function(){
        	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
        		//重新选择行时清除上一次选中行的样式
        		$('#officeInfoList'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
        	}
        },
        onSelectRow: function () {
        	var rowId=$('#officeInfoList').jqGrid("getGridParam","selrow");
		      rowData = $('#officeInfoList').jqGrid('getRowData',rowId);
        },
        viewrecords : true,
//        multiboxonly : true,
        multiselect: true,
        gridComplete: function() {
        	$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
			rowDataBefore = rowData;
            if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            	//添加回显选中行样式
            	$('#officeInfoList').setSelection(rowDataBefore.id,true);
            	$('#officeInfoList'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
            }
        }
	});
	$.xljUtils.resizeNestedGrid();
}

/**
 * 单击左侧菜单事件
 * 加载对应jqgrid数据列表
 */

function loadContentChildByTypeId(e,treeId,treeNode){
	jQuery("#officeInfoList").jqGrid('setGridParam',{
		postData: {stockHouseId: treeNode.pId,accoutId:treeNode.ownedCompany},
		page:1
	}).trigger('reloadGrid');
}

//树增加样式
function recursionArray(arr) {
    for(var i in arr) {
    	if(arr[i].pId==""){
    		arr[i].iconSkin = "diy-company";
    	}else{
			arr[i].iconSkin = "diy-officetype";
			if(arr[i].children&&arr[i].children.length > 0) {
				that._recursionArray(arr[i].children);
			}
		}
    }
};

/**
 * 修改档案信息
 */
var selInfoId;
var editType;
function updateOfficeInfo(){
	var gr = jQuery("#officeInfoList").jqGrid('getGridParam', 'selarrrow');
	if(!gr.length){
		$.xljUtils.tip("blue", "请选择要修改的行!");
		return;
	}
	if(gr.length>1){
		$.xljUtils.tip("blue", "请选择一条数据!");
		return;
	}
	selInfoId=gr;
	editType=1;
	var rowDataEdit = jQuery("#officeInfoList").jqGrid('getRowData',gr[0]);
	selHouseId=rowDataEdit.pId;
	selComId=rowDataEdit.accoutId;
	selHouseName=rowDataEdit.typeName;
	window.open('officeInfo_edit.html');
}

/**
 * 调整库存
 */
function updateCount(){
	var ids= jQuery("#officeInfoList").jqGrid('getGridParam', 'selarrrow');
	if(ids==null ||ids.length==0){
		pop_tip_open("blue","请选择要修改的行!");
		return false;
	}
	jQuery(ids).each(function(){
		jQuery("#officeInfoList").jqGrid('editRow', this);
	});
	$("#listButton").hide();
	$("#saveButton").show();
}
/**
 * 取消编辑
 */
var officeInfoFrid=jQuery("#officeInfoList");
function cancel() {
	 jQuery("#officeInfoList").trigger('reloadGrid');
	 $("#listButton").show();
    $("#saveButton").hide();
/*	officeInfoFrid=jQuery("#officeInfoList");
	var ids= officeInfoFrid.jqGrid('getGridParam', 'selarrrow');
	var selData={
    		buyPrice:'',
    		inCount:''
		};
	jQuery(ids).each(function(){
		officeInfoFrid.jqGrid('setRowData', this,selData);
		officeInfoFrid.jqGrid('saveRow', this);
	});
	$("#listButton").show();
	$("#saveButton").hide();*/
}
/**
 * 保存编辑
 */
function addRowData() {
//	var officeInfoFrid=jQuery("#officeInfoList");
	var ids= officeInfoFrid.jqGrid('getGridParam', 'selarrrow');
	var jsonDataS=[];
	var jData={};
	var i=0;
	 var reg =/^\d+$/;  
	 var reg1=/^[0-9]+([.]{1}[0-9]+){0,1}$/;
	jQuery(ids).each(function(){
		officeInfoFrid.jqGrid('saveRow', this);
		var data=officeInfoFrid.jqGrid('getRowData',this);
		console.log(data);
		if(data.buyPrice!="" && data.inCount!=""&& (reg.test(data.inCount)) &&(reg1.test(data.buyPrice))){
			jsonDataS[i]={
					id:data.id,
					buyPrice:data.buyPrice,
					inCount:data.inCount
			};
			i++;
		}
	});
	if(jsonDataS.length <=0){
		jQuery(ids).each(function(){
			jQuery("#officeInfoList").jqGrid('editRow', this);
		});
		pop_tip_open("blue","没有需要入库的档案或数据格式不正确");
		//reloadGrid();
		return false;
	}
	var jd={
			params:jsonDataS
	}
	$.ajax({
		url : serviceUrl + "oa/office/officeInfo/updateCount",
		type : 'PUT',
		dataType : 'JSON',
		contentType : "application/json",
		data : JSON.stringify(jd),
		success : function(resultData) {
			if (resultData.success) {
				reloadGrid();
			} else {
				pop_tip_open("red", resultData.msg);
			}
		},
	});
	$("#listButton").show();
	$("#saveButton").hide();
}
/**
 * 刷新表格
 */
/*function reloadGrid(){
	var nodes = treeObj.getSelectedNodes();
	var pd={};
	if(nodes.length == 1){
		pdstockHouseId=nodes[0].id;
	}
	officeInfoFrid.jqGrid('setGridParam',{ postData: pd }).trigger('reloadGrid');
}
*/
function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowData={id:id};
	 $('#officeInfoList').jqGrid().trigger("reloadGrid");
}
/**
 * 查看调整记录
 */
var selInfoId;
function seeRecordList(){
	var ids= jQuery("#officeInfoList").jqGrid('getGridParam', 'selarrrow');
	if(ids.length!=1){
		pop_tip_open("blue","请选择一条记录!");
		return false;
	}
	selInfoId=ids[0];
	window.open('record_list.html'); 
}

function searchDate(){
	getLeftTree();
}
function searchList(){
	var officeInfoName=$("#officeList").getInputVal();
	jQuery("#officeInfoList").jqGrid("setGridParam",{postData:{officeName:officeInfoName},page:1}).trigger("reloadGrid");
}
/**
 * 获取按钮权限
 */
function getOperationAuthorition() {
	var menuList;
	$.ajax({
		type: 'GET',
		url: serviceUrl + 'sys/authentication/getUserAuthenticationOperation?t_='+new Date().getTime()+'&appCode=OA&menuCode=YPDA',
		dataType: 'json',
		//contentType: 'application/json',
		async: false,
		//data: JSON.stringify(postdata),
		success: function (data) {
			if (data.success) {
				menuList =  data.result;

			} else {
				$.xljUtils.tip('red', '获取按钮权限失败！');
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			$.xljUtils.tip('red', '获取按钮权限失败！');
		}
	});
	return menuList;
}