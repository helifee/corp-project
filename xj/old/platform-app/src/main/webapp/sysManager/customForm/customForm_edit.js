/**
 * author:zhangfangzhi
 * date:20170323
 */
var zTreeObj;
var zTreeTemplateObj;
var type = null;
$(function () {
	var appId = $.xljUtils.getUrlParam('appId');
	
	//初始化form数据
    initFormData(appId);
    
    //初始化按钮事件
    initButton();
    
  	//所有ajax请求异常的统一处理函数，处理
    $(document).ajaxError(
        function(event,xhr,options,exc ){
            if(xhr.status == 'undefined'){
                return;
            }
            switch(xhr.status){
                case 403:
                    pop_tip_open("red","系统拒绝。");
                    break;
                case 404:
                    pop_tip_open("red","您访问的资源不存在。");
                    break;
                case 500:
                    pop_tip_open("red","服务器异常。");
                    break;
            }
        }
    );
});

/**
 * 外部连接
 */
function externalDeal(){
	$('#_external').css('display', 'none');
	$('#isParent').css("display",'');
	$('#dataAuth').css('display', 'none');
	$('#exControl').css('display', 'none');
	$('#dataAuthControl').css('display', 'none');
	$('#_url').removeAttr("readonly");
	$("#resourceId").val("");
	$("#resourceName").val("");
}

/**
 * 内部连接
 */
function innerDeal(){
	$('#_external').css('display', '');
	$('#isParent').css("display",'');
	$('#dataAuth').css('display', 'none');
	$('#exControl').css('display', 'none');
	$('#dataAuthControl').css('display', 'none');
	$('#_url').attr("readonly","readonly");
//	$("#resourceName,#selectBtn").on('click',function(){
//		$("#modal_list").empty();
//		$("#modal_list").load("entry_resource.html");
//		$("#myModal").modal("show");
//	});
}

/**
 * 自定义表单
 */
function customFormDeal(){
	$("#resourceId").val("");
	$("#resourceName").val("");
	$('#_external').css('display', 'none');
	$('#isParent').css('display', 'none');
	$('#dataAuthControl').css('display', '');
	$('#dataAuth').css('display', '');
	$('#exControl').css('display', '');
}

/**
 * 初始化按钮事件
 */
function initButton(){
	$(":radio[name='isInner']").click(function(){
		$('#_url').val('');
		if($(this).val()==1){
			innerDeal();
		}else if($(this).val()==0){
			externalDeal();
		}else if($(this).val()==2){
			customFormDeal();
		}
	});
	
	$(":radio[name='dataItemControl']").click(function(){
		if($(this).val()==1){
			$("#dataItem").prop('disabled', 'disabled');
			$('#dataAuth').css('display', 'none');
			$('#exControl').css('display', '');
		}else if($(this).val()==2){
			$("#dataItem").find("option[value='CustomFormSearchAuthority']").prop("selected","selected");
			$("#dataItem").prop('disabled', 'disabled');
			$('#dataAuth').css('display', '');
			$('#exControl').css('display', '');
		}else if($(this).val()==3){
			$("#dataItem").prop('disabled', '');
			$('#dataAuth').css('display', '');
			$('#exControl').css('display', '');
		}
	});
	
	//弹窗确认
	$("#confirmData").on('click',function(){
		confirmResource();
	});
	
	//弹窗初始化
	$('#myModal').on('hidden.bs.modal', function () {
		$("#modal_list").empty();//清空div
	});
	
	//分类替换绑定方法
  	$('.parent-selecter').xljSingleSelector({
		title:'选择分类',//选择器标题，默认是'选择组织机构'
		selectorType:'eeee',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:hostUrl + '/sys/base/customFormGroup/getTree'+'?time='+Math.random(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{},//生成zTree树的请求参数，json对象
		targetId:'parentId',//选择的数据的ID存储input域的id
		targetName:'parentName',//选择的数据的Name存储input域
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("#custForm").find("input[name='parentName']").val(selectData.name);
				$("#custForm").find("input[name='parentId']").val(selectData.id);
			}
		},
		selectNodeType:{
			"flag":"1",
			"msg":"请选择二级分类！"
		},
		formatTreeJson:formatZTreeData,
		treeSettings:{data:{
			simpleData: {
				enable: true
			}
		}}
	});
  	
  	//资源绑定方法
  	$('.resource-selecter').xljSingleSelector({
		title:'资源',//选择器标题，默认是'选择组织机构'
		selectorType:'eeee',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:hostUrl + '/sys/res/resource/getResourceTreeAll'+'?time='+Math.random(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{"appStatus":"1",
			"menuStatus":"1",
			"appDelFlag":"0",
			"menuDelFlag":"0"},//生成zTree树的请求参数，json对象
		targetId:'resourceId',//选择的数据的ID存储input域的id
		targetName:'resourceName',//选择的数据的Name存储input域
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("#custForm").find("input[name='resourceName']").val(selectData.name);
				$("#custForm").find("input[name='resourceId']").val(selectData.id);

				//业务系统资源特殊处理
				var _proUrl = selectData.resourceurl.replace('?',"&");
				if(selectData.resourceurl.indexOf("http:")>-1){
					//获取所选节点根节点
					var rootUrl = getCurrentRoot(selectData);
					//url参数转json对象
					var _proUrlParam = rootUrl.substring(rootUrl.indexOf('?'));
					_proUrlParam = _proUrlParam.replace('?', '').replace(/&/g, '","');
					_proUrlParam = _proUrlParam.replace(/=/g, '":"');
					if (_proUrlParam != "") {
						_proUrlParam = JSON.parse('{"' + _proUrlParam + '"}');
					}
					delete _proUrlParam['_t'];//删除时间戳参数
					if(_proUrlParam.erpUrl) {
						_proUrlParam.erpUrl = _proUrl;//替换穿透系统后的打开页面
					}
					var targetUrl = rootUrl.substring(0,rootUrl.indexOf('?')+1);
					for(var item in _proUrlParam){
						targetUrl += item + '=' + _proUrlParam[item] + '&';//参数添加
					}
					targetUrl = targetUrl.substring(0,targetUrl.lastIndexOf('&'));

					$("#custForm").find("input[name='url']").val(targetUrl);//赋值快速入口菜单url
				}else{
					$("#custForm").find("input[name='url']").val(selectData.resourceurl);
				}
			}
		},
		treeSettings:{data:{
			simpleData: {
				enable: true
			}
		}}
	});
}
//获取当前节点的根节点(treeNode为当前节点)
function getCurrentRoot(treeNode){
	if(treeNode.getParentNode()!=null){
		var parentNode = treeNode.getParentNode();
		return getCurrentRoot(parentNode);
	}else{
		return treeNode.resourceurl;
	}
}
/**
 * 数据权限下拉
 * @param appId
 */
function getDataItemSelect(appId){
	$.ajax({
        type:'POST',
        url:baseUrl + "sys/res/dataItem/queryDataItemAndPointList",
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'delflag':false,'appId':appId}),
        success: function(resultData) {
        	if(resultData&&resultData.success) {
        		var dataItem=resultData.result;
        		for(var i=0;i<dataItem.length;i++){
        			if("CustomFormSearchAuthority"==dataItem[i].itemCode){
        				$("#dataItem").append("<option selected = 'selected' value='"+dataItem[i].itemCode+"'>"+dataItem[i].itemName+"</option>")  
        			}else{
        				$("#dataItem").append("<option value='"+dataItem[i].itemCode+"'>"+dataItem[i].itemName+"</option>")
        			}
        			  
        		}
        	}
        }
    })
}

/**
 * 根据查询返回数据整理成zTree需要的JSON数据
 * @param arr
 * @returns
 */
function formatZTreeData(arr) {
	var zNodes = [];
	var flag=null;
	for (var i = 0; i < arr.length; i++) {
		var iconStyle='diy-group';
		if(arr[i].pId == '0') {
			iconStyle = "diy-program";
		}else {
			iconStyle = "diy-group";
	    } 
		if(arr[i].pId=="0"){
			flag="0";
		}else{
			flag="1";
		}
		zNodes.push({id:arr[i].id, pId:arr[i].pId, name:arr[i].name,flag:flag,iconSkin:iconStyle});
	}
	return zNodes;
};

/**
 * 初始化form数据
 */
function initFormData(appId) {
    //获取url中的参数type,id
    type = $.xljUtils.getUrlParam('type');
    var id = $.xljUtils.getUrlParam('id');
    if("add"==type){
    	getDataItemSelect(appId);
    	$("#dataItem").prop('disabled', 'disabled');
    	customFormDeal();
    	$(".custform_title").html("自定义表单-新增");
    	$.ajax({
	          type:'get',
	          url:baseUrl+'/generator/getGuuid?time='+Math.random(),
	          success: function(data) {
	  	        var guuid=data.result;
	  		    $("#custForm").find("input[name='id']").val(guuid);
	  	    }
	  	});
	  	$.ajax({
	          type:'get',
	          url:baseUrl+'/sys/base/customFormGroup/get/'+id+"?time="+Math.random(),
	          success: function(data) {
	          	var customFormGroupDto=data.result;
	          	$("#custForm").find("input[name='parentName']").val(customFormGroupDto.name);
	          	$("#custForm").find("input[name='parentId']").val(customFormGroupDto.id);
	          }
	  	});
        $("#custForm").attr('action',baseUrl+'/sys/base/customForm/save');
        $("#custForm").attr('method','POST');
    }else if("edit"==type){
    	$(".custform_title").html("自定义表单-修改");
    	$('#dataAuthControl').css('display', '');
        $.ajax({
            url:baseUrl+'/sys/base/customForm/getForUpdate/'+id+"?time="+Math.random(),
            type:'GET',
            success:function (resultData) {
                if(resultData&&resultData.success) {
                    var result = resultData.result;
                    for(var item in result) {
                        if($("#custForm :input[name='"+item+"']").length>0){
                        	if(item!="isInner" && item!="status" && item!="dataItemControl" && item!="isEx" && item!="isMobileAllowed"){
                        		$("#custForm :input[name='"+item+"']").val(result[item]);
                        	}
                        }
                    }
					$(".custform_title").html(result.name+"-修改");
                    $("#custForm").find('input[name=isInner]').eq(0).prop('disabled', 'disabled');
	        		$("#custForm").find('input[name=isInner]').eq(1).prop('disabled', 'disabled');
                    $("#custForm").find('input[name=isInner]').eq(2).prop('disabled', 'disabled');
                    if(result.isInner=="2"){
    	        		$("#custForm").find('input[name=isInner]').eq(0).prop('checked', 'checked');
                        $('#isParent').css('display', '');
                        $('#dataAuth').css('display', '');
                        $('#exControl').css('display', '');
                        if(result.dataItemControl==1){
                        	$("#custForm").find('input[name=dataItemControl]').eq(0).prop('checked', 'checked');
                        	$("#dataItem").prop('disabled', 'disabled');
                        	$('#dataAuth').css('display', 'none');
                        	$('#exControl').css('display', '');
                        }else if(result.dataItemControl==2){
                        	$("#custForm").find('input[name=dataItemControl]').eq(1).prop('checked', 'checked');
                        	$("#dataItem").prop('disabled', 'disabled');
                        	$('#dataAuth').css('display', '');
                        	$('#exControl').css('display', '');
                        }else if(result.dataItemControl==3){
                        	$("#custForm").find('input[name=dataItemControl]').eq(2).prop('checked', 'checked');
                        	$("#dataItem").prop('disabled', '');
                        	$('#dataAuth').css('display', '');
                        	$('#exControl').css('display', '');
                        }
                        $("#dataItem").append(result.dataItem);
                    	$('#_url').attr("readonly","readonly");
    	        	}else if(result.isInner=="1"){
    	        		$("#custForm").find('input[name=isInner]').eq(1).prop('checked', 'checked');
    	        		innerDeal();
    	        	}else if(result.isInner=="0"){
    	        		$("#custForm").find('input[name=isInner]').eq(2).prop('checked', 'checked');
    	        		externalDeal();
    	        	}
                    if(result.status=="1"){
    	        		$("#custForm").find('input[name=status]').eq(0).prop('checked', 'checked');
    	        	}else if(result.status=="0"){
    	        		$("#custForm").find('input[name=status]').eq(1).prop('checked', 'checked');
    	        	}
                    if(result.isEx=="1"){
    	        		$("#custForm").find('input[name=isEx]').eq(0).prop('checked', 'checked');
    	        	}else if(result.isEx=="0"){
    	        		$("#custForm").find('input[name=isEx]').eq(1).prop('checked', 'checked');
    	        	}
                    if(result.isMobileAllowed=="1"){
    	        		$("#custForm").find('input[name=isMobileAllowed]').eq(0).prop('checked', 'checked');
    	        	}else if(result.isEx=="0"){
    	        		$("#custForm").find('input[name=isMobileAllowed]').eq(1).prop('checked', 'checked');
    	        	}
                    $("#custForm").attr('action',baseUrl+'/sys/base/customForm/update/'+result['id']);
                    $("#custForm").attr('method','PUT');
                }
            }
        });
    }else if("copy"==type){
    	$(".custform_title").html("自定义表单-复制");
		$('#dataAuthControl').css('display', '');
        $.ajax({
            url:baseUrl+'/sys/base/customForm/getForUpdate/'+id+"?time="+Math.random(),
            type:'GET',
            success:function (resultData) {
                if(resultData&&resultData.success) {
                    var result = resultData.result;
                    for(var item in result) {
                        if($("#custForm :input[name='"+item+"']").length>0){
                            $("#custForm :input[name='"+item+"']").val(result[item]);
                        }
                    }
					$("#custForm").find('input[name=isInner]').eq(1).prop('disabled', 'disabled');
					$("#custForm").find('input[name=isInner]').eq(2).prop('disabled', 'disabled');
                    $("#_external").css('display', 'none');
                    $("#isParent").css('display', 'none');
                    $('#dataAuth').css('display', '');
                    $('#exControl').css('display', '');
                    $("#dataItem").append(result.dataItem);
                    $("#custForm").find("input[name='copySourceId']").val($("#custForm").find("input[name='id']").val());
                    $("#custForm").find("input[name='id']").val("");

					if(result.isInner=="2"){
						$("#custForm").find('input[name=isInner]').eq(0).prop('checked', 'checked');
						$('#isParent').css('display', '');
						$('#dataAuth').css('display', '');
						$('#exControl').css('display', '');
						if(result.dataItemControl==1){
							$("#custForm").find('input[name=dataItemControl]').eq(0).prop('checked', 'checked');
							$("#dataItem").prop('disabled', 'disabled');
							$('#dataAuth').css('display', 'none');
							$('#exControl').css('display', '');
						}else if(result.dataItemControl==2){
							$("#custForm").find('input[name=dataItemControl]').eq(1).prop('checked', 'checked');
							$("#dataItem").prop('disabled', 'disabled');
							$('#dataAuth').css('display', '');
							$('#exControl').css('display', '');
						}else if(result.dataItemControl==3){
							$("#custForm").find('input[name=dataItemControl]').eq(2).prop('checked', 'checked');
							$("#dataItem").prop('disabled', '');
							$('#dataAuth').css('display', '');
							$('#exControl').css('display', '');
						}
						$("#dataItem").append(result.dataItem);
						$('#_url').attr("readonly","readonly");
					}else if(result.isInner=="1"){
						$("#custForm").find('input[name=isInner]').eq(1).prop('checked', 'checked');
						innerDeal();
					}else if(result.isInner=="0"){
						$("#custForm").find('input[name=isInner]').eq(2).prop('checked', 'checked');
						externalDeal();
					}



					if(result.status=="1"){
						$("#custForm").find('input[name=status]').eq(0).prop('checked', 'checked');
					}else if(result.status=="0"){
						$("#custForm").find('input[name=status]').eq(1).prop('checked', 'checked');
					}
					if(result.isEx=="1"){
						$("#custForm").find('input[name=isEx]').eq(0).prop('checked', 'checked');
					}else if(result.isEx=="0"){
						$("#custForm").find('input[name=isEx]').eq(1).prop('checked', 'checked');
					}
					if(result.isMobileAllowed=="1"){
						$("#custForm").find('input[name=isMobileAllowed]').eq(0).prop('checked', 'checked');
					}else if(result.isEx=="0"){
						$("#custForm").find('input[name=isMobileAllowed]').eq(1).prop('checked', 'checked');
					}

                    $("#custForm").attr('action',baseUrl+'/sys/base/customForm/saveTemplate');
                    $("#custForm").attr('method','POST');
                }
            }
        });
    }
}

/**
 * 表单保存
 * @param op
 */
function saveForm(op){
	$('#custForm').attr('data-callback','formCallBack(true)');
    $('#custForm').submit();
}


/*********************************************treeBegin*********************************************/
/**
 * 树参数设置
 */
var setting = {
		view: {
            dblClickExpand: false,  
            showLine: true,  
            selectedMulti: false,
            fontCss: false,
            nameIsHTML: true
        },  
	edit: {  
		enable: true,
		showRemoveBtn:false,
        showRenameBtn:false,
        drag: {  
            autoExpandTrigger: true,  
            prev: null,  
            inner: null,  
            next: null,
            isCopy: false,
            isMove: true
        }
        
    },  
    data: {
    	keep: {
			leaf: false,
			parent: true
		},
        simpleData: {
            enable: true
        }
    },
    callback: {  
        onClick: null,  
        beforeDrag: null, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
        beforeDrop: null, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
        beforeDragOpen: null, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
        onDrag: null, //捕获节点被拖拽的事件回调函数  
        onDrop: null, //捕获节点拖拽操作结束的事件回调函数  
        onExpand: null, //捕获节点被展开的事件回调函数  
//        onClick:zTreeOnClick //点击节点事件
    }  
};

/**
 * 替换分类树
 */
function getOrgGroupTree() {
    urlAll = baseUrl + "/sys/base/customFormGroup/getTree";
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'showAll':true}),
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeReplace"), setting, zNodes);
            zTreeObj.expandAll(true); 
        }
    })
}

/**
 * 递归树匹配节点icon
 * @param arr
 */
function recursionArray(arr) {
	for(var i in arr) {
		arr[i].iconSkin = "diy-group";
	}
}
/********************************************treeEnd**************************************************/

/**
 * 资源传值
 */
function confirmResource(rowData){
	if(!rowData){
		var ids=$('#resourcelist').jqGrid('getGridParam','selrow');
		if(!ids||ids.length==0) {
			pop_tip_open("blue","请选择一行数据行！");
			return;
		}
		rowData = $("#resourcelist").jqGrid("getRowData",ids);
	}
	$("#resourceId").val(rowData.id);
	$("#resourceName").val(rowData.name);
	$("#_url").val(rowData.url);
	$("#myModal").modal("hide");
	//右侧滚动条
	$.xljUtils.removeGridScroll("nicescroll-rails");
}

/**
 * 替换所属分类
 */
function saveGroupTree(){
	var treeObj = $.fn.zTree.getZTreeObj("treeReplace");
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length>0){
    	$("#custForm").find("input[name='parentName']").val(nodes[0].name);
		$("#custForm").find("input[name='parentId']").val(nodes[0].id);
		$('#replaceGroupModal').modal('hide');
	}else{
		pop_tip_open("blue","请选中操作结点！");
	}
}

/**
 * 模板选择树确定回写数据
 */
function saveTemplate(){
	var treeObj = $.fn.zTree.getZTreeObj("templateTree");
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length>0){
		$('#replaceGroupModal').modal('hide');
	}else{
		pop_tip_open("blue","请选中操作结点！");
	}
}

/**
 * 关闭Modal（冲突需手动关闭）
 * @param modal
 */
function closeModleSelf(modal){
	$('#'+modal).modal('hide');
}

/**
 * form表单提交回调函数
 */
function formCallBack(isSave,resultJsonData) {
    if(resultJsonData) {
        var successFlag = resultJsonData.success;
        var msg = resultJsonData.msg;
        var result = resultJsonData.result;
        if(successFlag) {
     	   if(result.codeExist){
     		   //code重复
     		   $("#custForm").find("input[name='code']").parent().addClass("has-error has-feedback");
	           $("#custForm").find("input[name='code']").after("<label id='code-error' class='error help-block' style='margin: 0px; float: left;' for='code'>编码重复请重新输入</label>");
     	   }else{
     		   $("#custForm").find("input[name='code']").parent().removeClass("has-error has-feedback");
	           $("#custForm").find("input[name='code']").after("");
     	   }
     	   if(result.nameExist){
     		   //name重复
     		   $("#custForm").find("input[name='name']").parent().addClass("has-error has-feedback");
	           $("#custForm").find("input[name='name']").after("<label id='name-error' class='error help-block' style='margin: 0px; float: left;' for='name'>名称重复请重新输入</label>");
     	   } else{
     		   $("#custForm").find("input[name='name']").parent().removeClass("has-error has-feedback");
	           $("#custForm").find("input[name='name']").after("");
     	   }
     	   if(result.codeExist==false && result.nameExist==false){
     		   window.opener.reloadList(type,$("#custForm").find("input[name='id']").val());
               pop_tip_open("green","数据保存成功！");
               window.close();
     	   }
        }else {
            pop_tip_open("red","数据保存失败！");
        }
    }
}
