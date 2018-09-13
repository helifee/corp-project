var rowIdList="";
var idForList="";
var themeId=null;
var type=$.xljUtils.getUrlParam('type');
var id=$.xljUtils.getUrlParam('id');
var countList=new Array();
$(function(){
	pageInit();
    $("#corname").keypress(function(e){
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13){
        	searchDate();
        }
 })
});
function pageInit(){
	 if(type=="add"){
		  $("#supplierTitle").html("办公用品领用-新增");
		   document.title="办公用品领用-新增";
		   getUserInfo();
		 //初始化UUID
		 $.ajax({
			 type:"GET",
			 url:serviceUrl+"/sys/uuid/generator/getGuuid"+'?time='+Math.random(),
			 dataType:"json",
			 success: function(resultValue, textStatus) {
				 uuid = resultValue.result;
				 $('#id').val(uuid);
				 //上传图片初始化
				 $('.attachment-container').xljAttachment({appId:'officeOut',businessId:uuid,categoryId:'1',mode:'add',singleUpload:false});
			 },
			 error: function(XMLHttpRequest, textStatus, errorThrown) {
				 $.xljUtils.tip("red","服务异常,请联系管理员！");
			 }
		 });
		   var date=new Date().getTime()
		   $("#createFormdata").val(dateFtt("yyyy-MM-dd hh:mm:ss",new Date(date)));
		 // $(".removetr").hide();
	  }else if(type=="edit"){
		  $("#supplierTitle").html("办公用品领用-修改");
		   document.title="供办公用品领用-修改";
		 //上传图片初始化
		 $('.attachment-container').xljAttachment({appId:'officeOut',businessId:id,categoryId:'1',mode:'edit',singleUpload:false});
		   getOfficeOutEcho(id);
	  }
	  $("#saveBtn").on('click',function(){
		  $("#officeOutForm").attr("data-validate-success","saveOfficeOutInfo('save')");
		  $("#officeOutForm").submit();
	  });
	  $("#startFlow").on('click',function(){
		  $("#officeOutForm").attr("data-validate-success","saveOfficeOutInfo('startFlow')");
		  $("#officeOutForm").submit();
	  });
	 
}
function dateFtt(fmt,date)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
} 
function getOrgInfo(backdata,ele){
	var rootElement=$(ele).parent().parent().parent().parent();
	rootElement.find("input[name='proposeDeptId']").val(backdata.prefixId);
	rootElement.find("input[name='proposeDept']").val(backdata.prefixName);
	rootElement.find("#proposeDept").val(backdata.prefixName);
	}
function empty(obj){
	$(obj).parent().prev().val("");
	$(obj).parent().prev().prev().val("");
	$(obj).parent().parent().parent().next().next().find(":input").val("");
}
function addofficeRecord(){
	// window.open('officeOutInfo_edit.html');
	$("#myModal").modal("show");
	getModelData();
}
function getOfficeOutEcho(id){
	$.ajax({
	      type:'get',
	      url: serviceUrl+"/oa/officeOut/getOfficeOut/"+id+"?time="+Math.random(),
	      success: function(data) {
	    	  if(data.success){
	    		  var officeOutData=data.result;
	    		  $("#theme").val(officeOutData.theme);
				    $("#id").val(id);
	    		  	$("#proposeUserId").val(officeOutData.proposeUserId);
	    			$("#proposeUser").val(officeOutData.proposeUser);
	    			$("#proposeDeptId").val(officeOutData.proposeDeptId);
	    			$("#proposeDept").val(officeOutData.proposeDept);
	    			$("#createPersonName").val(officeOutData.createPersonName);
	    			$("#createFormdata").val(officeOutData.createFormdata);
	    		  $("textarea[name='remark']").html(officeOutData.remark);
	    	     	var officeOutInfoList=officeOutData.list;
	    	     	alert(officeOutInfoList);
	        		if(officeOutInfoList.length>0){
	        		  	var countLengt=0;
	        			for(var o in officeOutInfoList){
	        				addOutInfoList(countLengt);
	        				
	        				var  OutInfoList=$("#officeOutList").find("tr").eq(countLengt);
	        				OutInfoList.find("input[name='id']").val(officeOutInfoList[o].id);
	        				OutInfoList.find("input[name='stockNum']").val(officeOutInfoList[o].stockNum);
	        				$("#stockNum-"+countLengt).val(officeOutInfoList[o].stockNum);
	        				OutInfoList.find("input[name='stockName']").val(officeOutInfoList[o].stockName);
	        				$("#stockName-"+countLengt).val(officeOutInfoList[o].stockName);
	        				OutInfoList.find("input[name='typeName']").val(officeOutInfoList[o].typeName);
	        				$("#typeName-"+countLengt).val(officeOutInfoList[o].typeName);
	        				OutInfoList.find("input[name='stockSpecifications']").val(officeOutInfoList[o].stockSpecifications);
	        				$("#stockSpecifications-"+countLengt).val(officeOutInfoList[o].stockSpecifications);
	        				OutInfoList.find("input[name='outStockCount']").val(officeOutInfoList[o].outStockCount);
	        				$("#outStockCount-"+countLengt).val(officeOutInfoList[o].outStockCount);
	        				OutInfoList.find("input[name='inCount']").val(officeOutInfoList[o].officeinfoNum);
	        				OutInfoList.find("input[name='officeInfoId']").val(officeOutInfoList[o].officeinfoId);
	        				rowIdList+=officeOutInfoList[o].officeinfoId;
	        				countLengt++;
	        			}
						addCustomTbodyScroll(".table_List");
						resizeTbodyScroll(".table_List");
	        		}
	    	  }
	      }

	 });
}
function addOutInfoList(countLengt){
	var row=$("<tr style='text-align:center'><td><input type='checkbox' name='rowCheck'></td>" +
			"<td></td>" +
			"<td><input type='hidden'  name='stockNum'  ><input type='text'  id='stockNum-"+countLengt+"'  disabled></td>" +
			"<td><input type='hidden'  name='stockName' ><input type='text'  id='stockName-"+countLengt+"'  disabled></td>" +
			"<td><input type='hidden' name='typeName' ><input type='text'   id='typeName-"+countLengt+"'  disabled></td>" +
			"<td><input type='hidden'  name='stockSpecifications' ><input type='text' id='stockSpecifications-"+countLengt+"'  disabled></td>" +
			"<td><input type='hidden'  name='outStockCount'  ><input type='text'   id='outStockCount-"+countLengt+"'  disabled></td>"+
			"<td><input type='text' data-html='true'  name='inCount' ></td>" +
			"<td><input type='hidden' name='id' ><input type='hidden' name='officeInfoId' ></td>" +
			"</tr>");
$("#officeOutList").append(row);
resetNum();

}

function resetNum(){
	$("#officeOutList").find("tr").each(function(i){
		if(i>-1){
			$(this).find("td").eq(1).html(i+1);
		}
	});
}

/**
 * 保存附件
 */
function saveAttachement() {
	var defObjs = {};
	var def = new $.Deferred();
	$('.attachment-container').xljAttachmentSubmit(function (isSuccess, obj) {
		if (isSuccess) {
			if (obj.success === true) {
				$.xljUtils.tip('green', '附件信息提交成功');
			}
			def.resolve(true);
		} else {
			$.xljUtils.getError(obj);
			def.resolve(false);
		}
	});
	defObjs.attachDef = def.promise();

	return defObjs;
}

function saveOfficeOutInfo(op){

		//	保存附件
	var defObjs =  saveAttachement();
		var officeOut={};

		/*if(type=="add"){
		themeId=initUUId();
		}else{
			themeId=id;
		}*/
		themeId=$('#id').val();
		officeOut.theme=$("#theme").val();;
		officeOut.proposeUserId=$("#proposeUserId").val();
		officeOut.proposeUser=$("#proposeUser").val();
		officeOut.proposeDeptId=$("#proposeDeptId").val();
		officeOut.proposeDept=$("#proposeDept").val();
		officeOut.remark=$("#remark").val();
		officeOut.delflag=0;
		var date1=$("#createFormdata").val();
		officeOut.createFormdata=new Date(Date.parse(date1.replace(/-/g,  "/"))).getTime();
		officeOut.status=0;
		officeOut.id=$('#id').val();
		officeOut.code="bgyply";
		var officeOutInfoList=new Array();
	  $("#officeOutList").find("tr").each(function(){
		  var officeInfoId= $(this).find("input[name='officeInfoId']").val();
		  var officeinfoNum= $(this).find("input[name='inCount']").val();
		  var stockName= $(this).find("input[name='stockName']").val();
		  var typeName= $(this).find("input[name='typeName']").val();
		  var stockNum= $(this).find("input[name='stockNum']").val();
		  var stockSpecifications= $(this).find("input[name='stockSpecifications']").val();
		  var outStockCount= $(this).find("input[name='outStockCount']").val();
		  if(officeInfoId&&officeinfoNum&&officeinfoNum!="0"){
			  var officeOutInfo={};
			  officeOutInfo.id=initUUId();
			  officeOutInfo.themeId=$('#id').val();
			  officeOutInfo.officeinfoNum=officeinfoNum;
			  officeOutInfo.officeinfoId=officeInfoId;
			  officeOutInfo.stockName=stockName;
			  officeOutInfo.stockNum=stockNum;
			  officeOutInfo.typeName=typeName;
			  officeOutInfo.stockSpecifications=stockSpecifications;
			  officeOutInfo.outStockCount=outStockCount;
			  officeOutInfo.delflag=0;
			  officeOutInfoList.push(officeOutInfo);
		  }
	  });
	  if(officeOutInfoList.length<1){
			 pop_tip_open("blue","领用物品不能为空");
			 return;
	  }

		 for(var m in officeOutInfoList){
			 if(parseInt(officeOutInfoList[m].outStockCount)<parseInt(officeOutInfoList[m].officeinfoNum)){
				 pop_tip_open("blue","领用数量不能大于可领数量");
				 return;
			 }
		 }
	  officeOut.list=officeOutInfoList;
	$.when(defObjs.attachDef).done(function () {
	  if(type=="add"){
		  $.ajax({
			  type: "POST",
			  contentType: "application/json",
			  url: serviceUrl+"oa/officeOut/save",
			  data:JSON.stringify(officeOut),
			  dataType:"JSON",
			  success: function (result) {
				  if(result && result.success) {
					  window.opener.reloadGrid(themeId);
					  if(op=="save"){
						  window.close();
					  }else if(op=="startFlow"){
						  window.location.href="/platform-app/flow/runtime/approve/start.html?businessObjectCode=bgyply&businessId="+themeId+"&time="+Math.random();
					  }
				  }else {
					  $.xljUtils.tip('red', '数据保存失败！');
				  }
			  }
		  });
	  }else{
		  var officeOutId=id;
		  $.ajax({
			  type: "PUT",
			  contentType: "application/json",
			  url: serviceUrl+"oa/officeOut/update/"+officeOutId,
			  data:JSON.stringify(officeOut),
			  dataType:"JSON",
			  success: function (result) {
				  if(result && result.success) {
					  window.opener.reloadGrid(themeId);
					  if(op=="save"){
						  window.close();
					  }else if(op=="startFlow"){
						  window.location.href="/platform-app/flow/runtime/approve/start.html?businessObjectCode=bgyply&businessId="+themeId+"&time="+Math.random();
					  }
				  }else {
				  	if(result.code == '40001'){
						$.xljUtils.tip('blue', result.msg);
					}else{
						$.xljUtils.tip('red', '数据保存失败！');
					}
				  }
			  }
		  });
	  }

	});

}



function initUUId(){
	 var guuid=null;
	  var url = serviceUrl+"sys/uuid/generator/getGuuid"+"?time="+Math.random();
		$.ajax({
	      type:'get',
	      url:url,
	      async:false,
	      success: function(data) {
	         guuid=data.result;
	   }
	 });
		return guuid;
	}

function getUserInfo(){
	$.ajax({
	      type:'get',
	      url: serviceUrl+"/oa/officeOut/getUserInfo"+"?time="+Math.random(),
	      success: function(data) {
	        $("#proposeUserId").val(data.result.securityUserDto.id);
	        $("#proposeUser").val(data.result.securityUserDto.realName);
	        $("#createPersonName").val(data.result.securityUserDto.realName);
	        $("#proposeDeptId").val(data.result.securityDirectDeptDto.id);
	    	$("#proposeDept").val(data.result.securityDirectDeptDto.prefixName);
	   }
	 });
}
function toclose(){
	  window.close();
}
function delofficeRecord(){
	 $("input[name='rowCheck']:checked").each(function(){    
		 var d= $(this).parent().parent().find("input[name='officeInfoId']").val();
		$(this).parent().parent().remove();
		rowIdList=rowIdList.replace(d,"");
	 });    
	 resetNum();
}
/**
 * 校验num
 */
function regNum(e){
	  var reg =/^\d+$/;  
	  if (!reg.test(e)) {
			pop_tip_open("blue","领用数量只允许输入数字");
			return false;
			//e.val("1");
	  }else{
		  return true;
	  }
}

function searchDate(){
	getLeftTree();
}
function getModelData(){
	 $("input[name='rowCheck']:checked").removeAttr("checked");
	 var parentHtml = "";
	 $("#officeOutList").find("tr").each(function(i){
			var row="<tr class='textCenter'>" + "<td style='width:5%;padding: 0;'><input type='checkbox' name='rowCheck'></td>" ;
			row = row+ "<td style='width:5%;padding: 0;'>"+(i+1)+"</td>";
 		var jsonDataArr =$(this).find(":input").serializeArray();
 		var jsonData = {};
 		for(var i in jsonDataArr){
 			if(jsonDataArr[i].name=="officeInfoId"){																	
 				row = row+ "<td style='width:0;padding: 0;'><input type='hidden' name='"+jsonDataArr[i].name+"' value="+jsonDataArr[i].value+"></td>";
 			}else if(jsonDataArr[i].name=="inCount"){
 				row = row+ "<td style='width:15%;padding: 0;'><input type='text' data-html='true'   name='"+jsonDataArr[i].name+"' value="+jsonDataArr[i].value+" onblur='regNum(this.value)'></td>";
 			}else if(jsonDataArr[i].name=="id"){
 				
 			}else{
 				row = row+ "<td style='width:15%;padding: 0;'><input type='hidden' data-html='true'  name='"+jsonDataArr[i].name+"' value='"+jsonDataArr[i].value+"' ><input type='text' data-html='true'  value='"+jsonDataArr[i].value+"'  disabled></td>";
 			}																													  
 		}
 		row = row + "</tr>";
 		parentHtml = parentHtml + row;
 	});
	
	$("#ModelofficeOutList").html(parentHtml);

/*	$("#officeOutList").find("tr").each(function(i){
 		var jsonDataArr =$(this).find(":input").serializeArray();
 		var jsonData = {};
 		for(var i in jsonDataArr){
 			if(jsonDataArr[i].name=="officeInfoId"){
 				rowIdList = rowIdList+jsonDataArr[i].value+",";
 			}
 		}
 	});
	if(rowIdList.length>0){
		rowIdList = rowIdList.substring(0, rowIdList.length-1);
	}*/
	getLeftTree();
	//弹出框加滚动条部分  勿动
	 $.xljUtils.addModalScroll("myModal","ui-jqgrid-bdiv");
	resizeHeight();
	addCustomTbodyScroll();
	resizeTbodyScroll();
	$.xljUtils.addModalScroll("myModal","grid2");
	$(window).resize(function() {
	    resizeHeight();
		resizeGrid();
	});

}
function  getLeftTree(){
	var setting = {
			data: {
				simpleData: {
					enable: true,
					pIdKey: 'parentId'
				},
				key: {}
			},
			callback: {
				beforeClick: function (treeId, treeNode, clickFlag) {
					return !treeNode.isParent;
				},
				onClick: loadContentChildByTypeId,
				onCollapse: function () {
					$.xljUtils.treeResizeFn();
				},
				onExpand: function () {
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
			var inputVal=$("#corname").val();
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
			var treeObj = $.fn.zTree.init($("#_zTree"), setting, zNodes);
			//默认加载第一个菜单的列表数据
			if (zNodes.length > 0) {
				var firstChildNode = null;
				var nodes = treeObj.transformToArray(treeObj.getNodes());
				for (var i = 0, len = nodes.length; i < len; i++) {
					if (!nodes[i].isParent) {
						firstChildNode = nodes[i];
						break;
					}
				}
				treeObj.selectNode(firstChildNode);	//选中第一个节点
				if(!inputVal){
					onClick("", "", firstChildNode);
				}else{
			   jQuery("#officeInfoList").jqGrid("setGridParam",{postData:{stockHouseId:firstChildNode.pId}}).trigger("reloadGrid");
				}
			}
			$.xljUtils.addTreeScroll('ztree-box');
			$.xljUtils.treeResizeFn();
		}
	});
}

function onClick(e,treeId,treeNode){
	idForList=rowIdList;
	jQuery("#officeInfoList").jqGrid({
    	url : serviceUrl + "oa/office/officeInfo/getOfficeInfopage",
        ajaxGridOptions: { contentType: 'application/json', aync:true },
        mtype : "post",
        datatype : "json",
        contentType : "application/json",
        postData: {stockHouseId:treeNode.pId,accoutId:treeNode.ownedCompany},
        jsonReader : {
        	repeatitems: false
        },
        colModel : [
             {name : 'id',label : 'id', align:"center",hidden : true},
             {name : 'accoutId',label : 'accoutId', align:"center",hidden : true},
             {name : 'stockNum',label : '编号', align:"center"},
             {name : 'stockName',label : '名称', align:"center",editable : true},
             {name : 'typeName',label : '所属类别', align:"center",editable : true},
             {name : 'stockSpecifications',label : '规格',align:"center",editable : true},
             {name : 'stockBrand',label : '品牌',align:"center",editable : true},
             {name : 'meteringUnit',label : '单位',align:"center",editable : true},
             {name : 'price',label : '单价',align:"center",editable : true},
             {name : 'stockCount',label : '库存量',align:"center",editable : true},
             {name : 'outStockCount',label : '可领数量',align:"center",editable : true}
        ],
        rowNum : 20,//一页显示多少条
        rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
        autowidth:true,
        height:$('.grid1').height()-80,
        pager : '#pagered',//表格页脚的占位符(一般是div)的id
        rownumbers:true,
        viewrecords : true,
        ondblClickRow:function(rowid){
        	var rowData=$("#officeInfoList").jqGrid('getRowData',rowid);
			var row = $("<tr>", {class:"textCenter",html:"<td style='width:5%;padding: 0;'><input type='checkbox' name='rowCheck'></td>" +
			"<td style='width:5%;padding: 0;'></td>" +
			"<td style='width:15%;padding: 0;'><input type='hidden' data-html='true'  name='stockNum' value="+rowData.stockNum+" ><input type='text' data-html='true'  id='stockNum-"+rowid+"' value="+rowData.stockNum+" disabled></td>" +
			"<td style='width:15%;padding: 0;'><input type='hidden' data-html='true'  name='stockName' value="+rowData.stockName+" readonly><input type='text' data-html='true'  id='stockName-"+rowid+"' value="+rowData.stockName+" disabled></td>" +
			"<td style='width:15%;padding: 0;'><input type='hidden' data-html='true'  name='typeName' value="+rowData.typeName+" readonly><input type='text' data-html='true'  id='typeName-"+rowid+"' value="+rowData.typeName+" disabled></td>" +
			"<td style='width:15%;padding: 0;'><input type='hidden' data-html='true'  name='stockSpecifications' value='"+rowData.stockSpecifications+"'readonly><input type='text' data-html='true'  id='stockSpecifications-"+rowid+"' value='"+rowData.stockSpecifications+"'disabled></td>" +
			"<td style='width:15%;padding: 0;'><input type='hidden' data-html='true'  name='outStockCount' value='"+(rowData.outStockCount==""?0:rowData.outStockCount)+"' readonly><input type='text' data-html='true'  id='outStockCount-"+rowid+"' value='"+(rowData.outStockCount==""?0:rowData.outStockCount)+"' disabled></td>"
			
			});
			//本次领用数量
        	var countTd= $("<td style='width:15%;padding: 0;'>");
			var countInput = $("<input>",{type:"text",name:"inCount",value:"1"});
			countInput.on("blur",function(){
				var inputVal=countInput.val();
				regNum(inputVal);
				});
			$(countTd).append(countInput);
			$(row).append(countTd);
			$(row).append("<td style='width:0;padding: 0;'><input type='hidden' name='officeInfoId' value="+rowData.id+"></td>");
			//表格追加
			if(idForList.indexOf(rowid)<0&&rowData.outStockCount>0){
        		$("#ModelofficeOutList").append(row);
				addCustomTbodyScroll();
				resizeTbodyScroll();
				$.xljUtils.addModalScroll("myModal","grid2");
				idForList+=rowid+",";
        	}
        	resetModelNum();
        },
        gridComplete: function() {
       		 $.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
        }
	});
}

/**
 * 单击左侧菜单事件
 * 加载对应jqgrid数据列表-
 */

function loadContentChildByTypeId(e,treeId,treeNode){
	jQuery("#officeInfoList").jqGrid('setGridParam',{
		postData: {stockHouseId: treeNode.pId,accoutId:treeNode.ownedCompany}
	}).trigger('reloadGrid');
}

//树增加样式
function recursionArray(arr) {
    for(var i in arr) {
    	arr[i].iconSkin = "diy-system";
    }
};
function resizeGrid(){
	var mytable = $('.grid1');
	$(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(mytable).height()-80);
	$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(mytable).width()-2, true);
	$.xljUtils.gridResizeFn();
}
resizetable_List();
//计算高度
function resizetable_List(){
	//var w_h = $(window).height();
	//$('.table_List').height(w_h - 340);
}
$(window).resize(function() {
	resizetable_List();
	resizeTbodyScroll(".table_List");
});
function resizeHeight(){
	var w_h = $("#myModal .modal-dialog").height();
    //左侧  头部底部为60px  title类 为50px
	$(".slide-left .ztree-box").height((w_h-80)+"px");
	$('.grid1,.grid2').height((w_h - 80)/2);
	//$('#ModelofficeOutList').height($('.grid2').height()-$(".t_head thead").height()+"px");
}
function resizeTbodyScroll(cl){
	if(!cl) cl = ".grid2";
	$(cl).getNiceScroll().show().resize();
}

//右侧下面表格 tbody加滚动条
function addCustomTbodyScroll(cl){
	if(!cl) cl = ".grid2";
	$(cl).niceScroll({
		autohidemode: false,
		cursorcolor: "#eee",
		cursorwidth: "6px", // 滚动条的宽度，单位：便素
		cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
		horizrailenabled: true, // nicescroll可以管理水平滚动
		background: "#fff"
	});
}
function  resetModelNum(){
	$("#ModelofficeOutList").find("tr").each(function(i){
		if(i>-1){
			$(this).find("td").eq(1).html(i+1);
		}
	});
}
function delModelofficeRecord(){
	 $("input[name='rowCheck']:checked").each(function(){    
			$(this).parent().parent().remove();
			var d= $(this).parent().parent().find("input[name='officeInfoId']").val();
			idForList=idForList.replace(d,"");
			resetModelNum();
		 });
}	

function saveModel(){
	var saFlag=true;
	 $("input[name='rowCheck']:checked").removeAttr("checked");
		 var AcountdataList =new Array();
		 var datahtml = "";
		 $("#ModelofficeOutList").find("tr").each(function(i){
			 var row="<tr style='text-align: center;'>" + "<td><input type='checkbox' name='rowCheck'></td>" ;
			 row = row+ "<td >"+(i+1)+"</td>";
			 var jsonDataArr =$(this).find(":input").serializeArray();
			 var jsonData = {};
			 for(var i in jsonDataArr){
				 var rowId=jsonDataArr[i].officeInfoId;
				 jsonData[jsonDataArr[i].name]=jsonDataArr[i].value;
				 if(jsonDataArr[i].name=="officeInfoId"){
					 row = row+ "<td style='width:0'><input type='hidden' name='"+jsonDataArr[i].name+"' value="+jsonDataArr[i].value+"></td>";
				 }else if(jsonDataArr[i].name=="inCount"){
					 row = row+ "<td><input type='text' data-html='true'  name='"+jsonDataArr[i].name+"' value="+jsonDataArr[i].value+" onblur='regNum(this.value)'></td>";
					 var d=regNum(jsonDataArr[i].value);
					 if(!d){
						 saFlag=false; 
					 }
				 }else{																		
					 row = row+ "<td><input type='hidden' data-html='true'  name='"+jsonDataArr[i].name+"' value='"+jsonDataArr[i].value+"'><input type='text'  value='"+jsonDataArr[i].value+"' disabled></td>";
				 }
			 }
			 row = row + "</tr>";
			 datahtml = datahtml + row;
			 AcountdataList.push(jsonData);
		 });
		 for(var m in AcountdataList){
			 if(parseInt(AcountdataList[m].outStockCount)<parseInt(AcountdataList[m].inCount)){
				 pop_tip_open("blue","领用数量不能大于可领数量");
				 saFlag=false;
			 }
		 }
		 if(saFlag){
		 rowIdList=idForList;
		 idForList="";
		 $("#officeOutList").html(datahtml);
		 addCustomTbodyScroll(".table_List");
		 resizeTbodyScroll(".table_List");
		 $("#myModal").modal("hide");
	 }    
	//var Datahtml=$("#officeOutList").html();
}
/*function startFlow(){
	saveOrstart="start";
	  $("#officeOutForm").submit();
		window.open("/platform-app/flow/runtime/approve/start.html?businessObjectCode=bgyply&businessId="+themeId+"&time="+Math.random());
}*/
function flowCallBack(){
 window.opener.reloadGrid(themeId);
	window.close();
}