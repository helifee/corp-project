var url="../../";
var type=$.xljUtils.getUrlParam('type');
/**
 * 关闭窗口
 * add by yongmei.xiao
 */


function closeWin() {
	window.close();
}

//选择父节点
$('.fatherNodeSelector').click(function() {
	var dataPost = {
		delflag: 0,
		sidx: "sortNumber",
		state: "1"
	};
	 $(this).xljSingleSelector({
			title:'所属类别',//选择器标题，默认是'选择组织机构'
        selectorType:'officehouse',//选择器类型，默认是组织机构选择器
        immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
        treeUrl: baseUrl + "oa/office/officeHouse/queryTreeList"+"?time="+Math.random(),
        targetId:"stockHouseId",//选择的数据的ID存储input域
        targetName:"houseName",//选择的数据的Name存储input域
		treeParam: JSON.stringify(dataPost),//生成zTree树的参数
        formatTreeJson:formatZTreeData,
        ajaxType:"POST",
        treeSettings:{
        	data:{
					simpleData: {
						enable: true,
						idKey: 'id',
						pIdKey: 'parentNodeId'
					},
					key: {
						name: "typeName"
					}
				},
			 callback: {
			    	beforeClick: function(treeId, treeNode, clickFlag) {
			    		return !treeNode.isParent;
			    	},
			    	beforeDblClick:function (event, treeNode) {
			    		return !treeNode.isParent;
					 }
			 },
			 
        }
	});
})

function formatZTreeData(arr) {
	
	$.each(arr, function(index, value){
		value.iconSkin = '';
	});
	
	return arr;
};

//清除父类别内容
function empty(obj) {
	$(obj).siblings('input[name="stockHouseId"]').val('');
	$(obj).siblings('input[name="houseName"]').val('');
	$(obj).siblings('input[name="accoutId"]').val('');
}
 


/**
 * 编辑页面-初始化档案信息
 */
function getOfficeInfoById(){
	var infoId = window.opener.selInfoId;
	var uBody = "oa/office/officeInfo/get/"+infoId+"?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#id").val(data.result.id);
			$("#stockName").val(data.result.stockName);
			$("#stockNum").val(data.result.stockNum);
			$("#stockHouseId").val(data.result.stockHouseId);
			$("#stockSpecifications").val(data.result.stockSpecifications);
			$("#stockBrand").val(data.result.stockBrand);
			$("#price").val(data.result.price);
			$("#meteringUnit").val(data.result.meteringUnit);
			$("#inStockCount").val(data.result.stockCount);
			$("input[name='stockCount']").val(data.result.stockCount);
			$("input[name='outStockCount']").val(data.result.outStockCount);
			$("#remark").val(data.result.remark);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化档案信息请求失败");
		}
	})
}
/**
 * 初始化
 * add by yongmei.xiao
 */
var editType=window.opener.editType;
var selHouseId=window.opener.selHouseId;
var selComId=window.opener.selComId;
var selHouseName=window.opener.selHouseName;
$(document).ready(function(){
	$("#stockHouseId").val(selHouseId);
	$("#houseName").val(selHouseName);
	$("#accoutId").val(selComId);
	if(editType==1){//修改
		$("#officeInfoTitle").html("用品及档案-修改");
		document.title="用品及档案-修改";
		$("#saveAndCloseOfficeHouse").hide();
		$("#stockCount").attr("disabled",true);
		$("#price").attr("disabled",true);
		$("#stockNum").attr("disabled",true);
		getOfficeInfoById();
	}else{
		$("#officeInfoTitle").html("用品及档案-新增");
		document.title="用品及档案-新增";
		initUUId();
	}
	 
	 /**
	  * 保存用品分类
	  * add by yongmei.xiao
	  */
	 $("#saveOfficeHouse").click(function () {
		$("#officeInfoForm").attr("data-validate-success","saveForm(false)");
		$("#officeInfoForm").submit();
	 });
	 $("#saveAndCloseOfficeHouse").click(function () {
		$("#officeInfoForm").attr("data-validate-success","saveForm(true)");
		$("#officeInfoForm").submit();
//	 	submitForm(true);
	 });
});

/**
 * 保存-新增或编辑保存
 * @param ifNew:0只保存，1保存并新增
 */
function saveForm(ifNew){
	if(editType==1){//编辑
		editSaveForm();
	}else{//新增
		submitForm(ifNew);
	}
}
/**
 * 编辑--保存
 */
function editSaveForm(ifNew){
	var id=$("#id").val();
	var officeHouseArr= $("#officeInfoForm").serializeArray();
	var officeHouseDto={};
	for(var i in officeHouseArr){
		if(officeHouseArr[i].name=='houseName'||officeHouseArr[i].value==""){
		}else{
			officeHouseDto[officeHouseArr[i].name]=officeHouseArr[i].value;
		}
	}
	officeHouseDto.stockCount=$("#inStockCount").val();
	officeHouseDto.delflag=false;
	if(!officeHouseDto.stockCount){
		officeHouseDto.stockCount=0;
	}
	if(!officeHouseDto.outStockCount){
		officeHouseDto.outStockCount=officeHouseDto.stockCount;
	}
	if(parseInt(officeHouseDto.outStockCount)<0){
		officeHouseDto.outStockCount=0;
	}
	if(parseInt(officeHouseDto.stockCount)<0){
		officeHouseDto.stockCount=0;
	}
	//TODO
//	officeHouseDto.stockHouseId=1;
	var url = baseUrl+"oa/office/officeInfo/update/"+id;
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		url: url,
		data:JSON.stringify(officeHouseDto),
		dataType:"JSON",
		success: function (result) {
			if(result && result.success) {
//				window.opener.location.href=window.opener.location.href;
				  window.opener.reloadGrid(officeHouseDto.id);
					closeWin();
			}else {
				$.xljUtils.tip('red', '数据保存失败！');
			}
		}
	});
}

//提交数据  flag为标识  标识保存后是否关闭
function submitForm(flag) {
	var id=$("#id").val();
	var officeHouseArr= $("#officeInfoForm").serializeArray();
	var officeHouseDto={};
	for(var i in officeHouseArr){
		if(officeHouseArr[i].name=='houseName'||officeHouseArr[i].value==""){
		}else{
			officeHouseDto[officeHouseArr[i].name]=officeHouseArr[i].value;
		}
	}
	officeHouseDto.delflag=false;
	if(!officeHouseDto.stockCount){
		officeHouseDto.stockCount=0;
	}
	if(!officeHouseDto.outStockCount){
		officeHouseDto.outStockCount=officeHouseDto.stockCount;
	}
	//TODO
//	officeHouseDto.stockHouseId=1;
	var url = baseUrl+"oa/office/officeInfo/save";
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: url,
		data:JSON.stringify(officeHouseDto),
		dataType:"JSON",
		success: function (result) {
			if(result && result.success) {
//				window.opener.location.href=window.opener.location.href;
//					window.opener.reloadGrid();
				  window.opener.reloadGrid(officeHouseDto.id);
					if(flag === true) {	//保存并新增
						initUUId();
						$("#officeInfoForm")[0].reset();
						$("#stockHouseId").val(selHouseId);
						$("#houseName").val(selHouseName);
						$("#accoutId").val(selComId);
						pop_tip_open("green","保存成功请继续");
					}else {	//保存并关闭
						
						closeWin();
					}
			}else {
				$.xljUtils.tip('red',result.msg);
			}
		}
	});
}
 
/**
 * 刷新业务系统表格
 */
/*function refreshGrid() {
	var pd={pdstockHouseId:$("#stockHouseId").val()};
	window.opener.officeInfoFrid.jqGrid('setGridParam',{ postData: pd }).trigger('reloadGrid');
};*/
/**
 * 系统统一入口生成ID
 */
function initUUId(){
  var url = baseUrl+"generator/getGuuid"+"?time="+Math.random();
	$.ajax({
      type:'get',
      url:url,
      success: function(data) {
       var guuid=data.result;
	    $("#id").val(guuid);
   }
 });
}
