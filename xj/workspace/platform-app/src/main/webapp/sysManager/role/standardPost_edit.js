/**
 * 角色新增修改
 * @author guoyanhong 
 */

//打开方式：0新增，1修改
var editType=0;
//修改角色类型
var editmold="role";
//修改时用原父级Id
var patentIdold;
var zTreeObj;

var selNodeId="";
var selNodeName="";
var selNodeType="";
var ss ;
var openerObject ;
var setting = {
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			beforeClick: beforeClick,
			onClick: onClick
		}
	};

/**
 * 递归获取树图片样式
 */
function recursionArray(arr) {
    for(var i in arr) {
    	if(arr[i].mold == "cata") {
            arr[i].iconSkin = "diy-roleType";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].mold == "role" ) {
        	if(arr[i].type == "0" ){
        		arr[i].iconSkin = "diy-fictitious";
        	}else{
        		arr[i].iconSkin = "diy-role";
        	}
        }
    }
};
/**
 * 初始化角色目录
 */
function initRoleTree() {
	var urlBody = "sys/org/roleCatalog/getRoleTree";
    var urlAll = hostUrl + urlBody;
    //不查询出角色（叶子节点） add by gyh
    var postData={
    	isRole:'N',
    	type:1
    };
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(postData),
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeRole"), setting, zNodes);
        }
    })
}

/**
 * 根据ID获取要修改的角色
 */
function getRoleById(){
//	var orgId="9bbbfdad059345ffada9e20b1ea8d1e2";
	var roleId = window.opener.edit_roleId;
	var uBody = "sys/org/standardRole/get/"+roleId+"?time="+Math.random();
    var uAll = hostUrl + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
//         var guuid=data.result;
        	$("#roleFrom").find("input[name='id']").val(data.result.id);
        	$("#roleFrom").find("input[name='code']").val(data.result.code);
        	$("#roleFrom").find("input[name='name']").val(data.result.name);
        	$("#roleFrom").find("input[name='catalogId']").val(data.result.catalogId);
        	patentIdold=data.result.catalogId;
        	$("#roleFrom").find("input[name='sort']").val(data.result.sort);
           	$("input[name='mold'][value=role]").attr("checked",true);
           	$("#roleFrom").find("input[name='type']").val(data.result.type);
           	$("input[name='mold']").attr("disabled",true); 
        	if(data.result.status == "1"){
           	 $("input[name='status'][value=1]").attr("checked",true); 
            }else{
           	 $("input[name='status'][value=0]").attr("checked",true); 
            }
        	$("#remark").val(data.result.remark);
        }
	})
}

/**
 * 根据ID获取要修改的角色类型
 */
function getRoleCataById(){
//	var orgId="9bbbfdad059345ffada9e20b1ea8d1e2";
	var roleId = window.opener.edit_roleId;
	var uBody = "sys/org/roleCatalog/get/"+roleId+"?time="+Math.random();
    var uAll = hostUrl + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
//         var guuid=data.result;
        	$("#roleFrom").find("input[name='id']").val(data.result.id);
        	$("#roleFrom").find("input[name='code']").val(data.result.code);
        	$("#roleFrom").find("input[name='name']").val(data.result.name);
        	$("#roleFrom").find("input[name='catalogId']").val(data.result.parentId);
        	patentIdold=data.result.parentId;
        	$("#roleFrom").find("input[name='sort']").val(data.result.sort);
        	$("#roleFrom").find("input[name='type']").val(data.result.type);
           	 $("input[name='mold'][value=cata]").attr("checked",true); 
           	$("input[name='mold']").attr("disabled",true); 
        	if(data.result.status == "1"){
           	 $("input[name='status'][value=1]").attr("checked",true); 
            }else{
           	 $("input[name='status'][value=0]").attr("checked",true); 
            }
        	$("#remark").val(data.result.remark);
        }
	})
}



function beforeClick(treeId, treeNode) {
	return true;
}

function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeRole"),
	nodes = zTree.getSelectedNodes(),
	 v = "";
	 k = "";
	 t = "";
	nodes.sort(function compare(a,b){return a.id-b.id;});
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
		k += nodes[i].id + ",";
		t += nodes[i].type + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	if (k.length > 0 ) k = k.substring(0, k.length-1);
	if (t.length > 0 ) t = t.substring(0, t.length-1);
	if(t==1){
		t= true;
	}else{
		t= false;
	}
	var catalogId = $("#catalogId");
	var catalogIdName = $("#catalogIdName");
	var catalogtype = $("#type");
	
	/*catalogId.attr("value", k);
	catalogIdName.attr("value", v);
	catalogtype.attr("value", t);*/
	catalogId.val(k);
	catalogIdName.val(v);
	catalogtype.val(t);
}

function showMenu() {
	var cityObj = $("#catalogIdName");
	var cityOffset = $("#catalogIdName").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}


/**
 * 初始化主键ID
 */
function initUuid(){
	var uBody = "generator/getGuuid"+"?time="+Math.random();
    var uAll = hostUrl + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
         var guuid=data.result;
	    $("#roleFrom").find("input[name='id']").val(guuid);
     }
	});
}


/**
 * 保存表单
 */
function saveForm(sign){
	if(editType==1){//编辑
		if(editmold == "cata"){
			editRoleCataSaveForm();
		}else if(editmold == "role"){
			editRoleSaveForm();
		}
		
	}else{//新增
		addSaveForm(sign);
	}
}
/**
 * 修改保存表单（角色类型）
 */
function editRoleCataSaveForm(){
	var roleAndCataArr= $("#roleFrom").serializeArray();
	console.log($("#catalogId").val());
	var roleAndCataDto={};
		for(var i in roleAndCataArr){
			if(roleAndCataArr[i].name=="registrationDate"||"createDate"==roleAndCataArr[i].name||"updateDate"==roleAndCataArr[i].name|| "disabledDate"==roleAndCataArr[i].name){
				roleAndCataDto[roleAndCataArr[i].name]=1486542885000;
			}else if(roleAndCataArr[i].name=="catalogIdName" || roleAndCataArr[i].name=="mold" || roleAndCataArr[i].name=="_id"|| roleAndCataArr[i].name=="_name" ){
				
			}else if(roleAndCataArr[i].name=="catalogId"){
				roleAndCataDto["parentId"]=roleAndCataArr[i].value;
			}else{
				roleAndCataDto[roleAndCataArr[i].name]=roleAndCataArr[i].value;
			}
		}
		roleAndCataDto.delflag=false;
		var roleCataId = $('#id').val();
		roleAndCataDto.id=roleCataId;
   var uBody = "sys/org/roleCatalog/update/"+roleCataId;
   var uAll = hostUrl + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(roleAndCataDto),
       type:'PUT',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData ) {
           if(resultData) {
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   editTreeNode();
                   closeWin();
               }else {
            	   //alert('数据保存失败！');
            	   pop_tip_open("red",msg);
               }
           }
       }
   });
	
}

/**
 * 修改保存表单（角色）
 */
function editRoleSaveForm(){
	var roleAndCataArr= $("#roleFrom").serializeArray();
	var roleAndCataDto={};
		for(var i in roleAndCataArr){
			if(roleAndCataArr[i].name=="registrationDate"||"createDate"==roleAndCataArr[i].name||"updateDate"==roleAndCataArr[i].name|| "disabledDate"==roleAndCataArr[i].name){
				roleAndCataDto[roleAndCataArr[i].name]=1486542885000;
			}else if(roleAndCataArr[i].name=="catalogIdName" || roleAndCataArr[i].name=="mold" || roleAndCataArr[i].name=="_id"|| roleAndCataArr[i].name=="_name"){
				
			}else{
				roleAndCataDto[roleAndCataArr[i].name]=roleAndCataArr[i].value;
			}
		}
		roleAndCataDto.delflag=false;
		var roleId = $('#id').val();
		roleAndCataDto.id=roleId;
   var uBody = "sys/org/standardRole/update/"+roleId;
   var uAll = hostUrl + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(roleAndCataDto),
       type:'PUT',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData ) {
           if(resultData) {
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   editTreeNode();
                   closeWin();
               }else {
            	   //alert('数据保存失败！');
            	   pop_tip_open("red",msg);
               }
           }
       }
   });
	
}

/**
 * 新增保存表单
 */
function addSaveForm(sign){
	var roleAndCataArr= $("#roleFrom").serializeArray();
	var roleAndCataDto={};
		for(var i in roleAndCataArr){
			if(roleAndCataArr[i].name=="registrationDate"||"createDate"==roleAndCataArr[i].name||"updateDate"==roleAndCataArr[i].name|| "disabledDate"==roleAndCataArr[i].name){
				roleAndCataDto[roleAndCataArr[i].name]=1486542885000;
			}else if(roleAndCataArr[i].name=="catalogIdName" || roleAndCataArr[i].name=="_id"|| roleAndCataArr[i].name=="_name"){
				
			}else{
				roleAndCataDto[roleAndCataArr[i].name]=roleAndCataArr[i].value;
			}
		}
		roleAndCataDto.delflag=false;

   var uBody = "sys/org/roleCatalog/saveByMold"+"?time="+Math.random();
   var uAll = hostUrl + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(roleAndCataDto),
       type:'POST',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData ) {
           if(resultData) {
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   addTreeNode();
                   if(sign==1){//保存并新增
                	   pop_tip_open("green","数据保存成功");
						refreshWin();
					}else{
						closeWin();
					}
               }else {
            	   //alert('数据保存失败！');
            	   pop_tip_open("red",msg);
               }
           }
       }
   });
	
}
/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}

/**
 * 回写到父页面，插入到角色树中节点
 */
function addTreeNode() {
	
//	window.opener.document.getElementById(elementId);
	var parentId = $("#catalogId").val();
	var treeNode = ss.getNodeByParam("id", parentId, null);
	var id = $("#id").val();
	var name = $("#name").val();
	var code = $("#code").val();
	var type = $("#type").val();
	var mold ;
	var iconSkin ;
	var sort = $("#sort").val();
	var children = [];
	
	var temp = document.getElementsByName("mold");
	  for(var i=0;i<temp.length;i++)
	  {
	     if(temp[i].checked)
	    	 mold = temp[i].value;
	  }
	  
	  if(mold == "cata") {
		  iconSkin = "diy-roleType";
		  if(type == "true"){
			   type="1";
	    	}else{
	    		type="0";
	    	}
      }else if(mold == "role" ) {
		  if(type == "true"){
			   type="1";
	    		iconSkin = "diy-role";
	    	}else{
	    		type="0";
	    		iconSkin = "diy-fictitious";
	    	}
      }
//	  console.log({id:id, name:name,code:code, type:type,mold:mold, sort:sort,children:children,iconSkin:iconSkin,parentId:parentId});
	  name = name.replace(/\\\\/g,"\\");
	  name = name.replace(/\\\'/g,"'");
	if (treeNode) {
		treeNode = ss.addNodes(treeNode, {id:id, name:name,code:code, type:type,mold:mold, sort:sort,children:children,iconSkin:iconSkin,parentId:parentId});
	} else {
		treeNode = ss.addNodes(null, {id:id, name:name,code:code, type:type,mold:mold, sort:sort,children:children,iconSkin:iconSkin});
	}
	// //重置父级滚动条
	// $(window.opener.document.getElementById('treeDemo').parentNode).niceScroll({
	// 	autohidemode: false,
	// 	cursorcolor: "#fff",
	// 	cursorwidth: "6px", // 滚动条的宽度，单位：便素
	// 	cursorborder: "1px solid #fff", // CSS方式定义滚动条边框
	// 	horizrailenabled: true, // nicescroll可以管理水平滚动
	// 	background: "#fff"
    //
	// });
	// $(window.opener.document.getElementById('treeDemo').parentNode).getNiceScroll().show().resize();
	openerObject.location="javascript:resizeZTree();";
	//openerObject=null;
//	closeWin();
};

/**
 * 父页面角色树修改角色或者角色目录的节点
 */
function editTreeNode() {
//	var ss = window.opener.zTreeObj;
	var parentId = $("#catalogId").val();
	var treeNodep = ss.getNodeByParam("id", parentId, null);
	var id = $("#id").val();
	var treeNodec = ss.getNodeByParam("id", id, null);	
	var name = $("#name").val();
	var code = $("#code").val();
	var type = $("#type").val();
	var mold ;
	var iconSkin ;
	var sort = $("#sort").val();
	var children = [];
	var temp = document.getElementsByName("mold");
	  for(var i=0;i<temp.length;i++)
	  {
	     if(temp[i].checked)
	    	 mold = temp[i].value;
	  }
	  
   if(mold == "cata") {
	  iconSkin = "diy-roleType";
	  if(type == "true"){
		   type="1";
	  }else{
		type="0";
	  }
    }else if(mold == "role" ) {
    	if(type == "true"){
    		type="1";
    		iconSkin = "diy-role";
    	}else{
    		type="0";
    		iconSkin = "diy-fictitious";
    	}
    }
   	name = name.replace(/\\\\/g,"\\");
   	name = name.replace(/\\\'/g,"'");
	treeNodec.name = name;
	treeNodec.type = type;
	treeNodec.iconSkin = iconSkin;
	treeNodec.sort = sort;
	treeNodec.mold = mold;
	treeNodec.parentId = parentId;
	ss.updateNode(treeNodec);//更新节点属性
	
	if(patentIdold!=parentId){//移动节点
		ss.moveNode(treeNodep, treeNodec, "inner");
	}
//	closeWin();
};

/**
 * 清空上级目录
 */
function empty(){
	$("#roleFrom").find("input[id='catalogId']").val("");
	$("#roleFrom").find("input[id='catalogIdName']").val("");
	$("#roleFrom").find("input[id='type']").val("");
}

/**
 * 上级目录回调函数
 * @param data
 */
function roleCallback(data) {
	if(data.prefixId.indexOf($("#id").val())>=0){
		pop_tip_open("blue","上级目录不可选择自己及其下级");
		return false;
	}else{
		$("#roleFrom").find("input[id='catalogId']").val(data.id);
		var name=$.xljUtils.htmlEncode(data.name);
		$("#roleFrom").find("input[id='catalogIdName']").val(name);
		var type=data.type=="1"?true:false;
		$("#roleFrom").find("input[id='type']").val(type);
	}
}

$(function () {
	
//	var urlBody = "sys/org/roleCatalog/getRoleTree";
//    var urlAll = hostUrl + urlBody;
	
	$("#parentButton").on('click',function(){
		var postData={
		    	isRole:'N'	,
		    	type:1
		    };
			$(this).xljSingleSelector({
				title:'',//选择器标题，默认是'选择组织机构'
	            selectorType:'role',//选择器类型，默认是组织机构选择器
	            immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
	            treeUrl:null,
	            treeParam:postData,//生成zTree树的参数
	            //targetId:'catalogId',//选择的数据的ID存储input域
	            //targetName:'catalogIdName',//选择的数据的Name存储input域
	            ajaxType: 'POST',	//ajax的type 默认为post
	            /**
	             * 保存回调函数
	             * @param selectDatas 已选择的数据json对象
	             * @param ele 绑定选择器的对象
	             */
	            saveCallback:roleCallback,
	            formatTreeJson:function(data){return data;},
	            treeSettings:{}
			});
			///$('body').data($(this).attr('id'),undefined);
			
	});
	
	$("#saveBtn").on('click',function(){
		$("#roleFrom").attr("data-validate-success","saveForm(0)");
		$("#roleFrom").submit();
	});

	$("#saveAndCreateBtn").on('click',function(){
		$("#roleFrom").attr("data-validate-success","saveForm(1)");
		$("#roleFrom").submit();
	});
	
	//打开方式：0新增，1修改
	editType=window.opener.editType;
	//角色类型
	editmold=window.opener.editmold;
	if(editType==1){
		$("#saveAndCreateBtn").hide();
		$("#editTitel").text("修改");
		$("title").html("标准岗位-修改");
		if(editmold == "role"){
			getRoleById();
		}else{
			getRoleCataById();
		}
		
	}else{
		$("#editTitel").text("新增");
		$("title").html("标准岗位-新增");
		initUuid();
	}
	ss = window.opener.zTreeObj;
	openerObject = window.opener;
	//上级目录
	 selNodeId=window.opener.selNodeId;
	 selNodeName=window.opener.selNodeName;
	 selNodeType=window.opener.selNodeType;
	if(selNodeId != "" && selNodeName != "" && selNodeType !=""){
		$("#catalogId").val(selNodeId);
		$("#catalogIdName").val(selNodeName);
		if(selNodeType=="1"){
			selNodeType =true;
		}else if(selNodeType=="0"){
			selNodeType =false;
		}else if(selNodeType == true){
			selNodeType = true;
		}else{
			selNodeType = false;
		}
		$("#type").val(selNodeType);
	}
	initRoleTree();
});

/**
 * 刷新页面
 */
function refreshWin(){
	$("#id").val("");
	$("#code").val("");
	$("#name").val("");
	$("input[name='mold']").attr("checked",false); 
	$("input[name='status'][value=1]").attr("checked",true); 
	$("#remark").val("");
	
	if(selNodeId != "" && selNodeName != "" && selNodeType !=""){
		$("#catalogId").val(selNodeId);
		$("#catalogIdName").val(selNodeName);
		if(selNodeType=="1"){
			selNodeType =true;
		}else if(selNodeType=="0"){
			selNodeType =false;
		}else if(selNodeType == true){
			selNodeType = true;
		}else{
			selNodeType = false;
		}
		
		$("#type").val(selNodeType);
	}
	editType=0;
	initUuid();
}
