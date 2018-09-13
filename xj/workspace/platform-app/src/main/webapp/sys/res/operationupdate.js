var rowNum=1;
var zTreeObj;
var zTreeObjOperation;


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
var settingOperation = {
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			beforeClick: beforeClickOperation,
			onClick: onClickOperation
		}
	};

function beforeClick(treeId, treeNode) {
	return true;
}

function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeOrg"),
	nodes = zTree.getSelectedNodes(),
	v = "";
	k = "";
	nodes.sort(function compare(a,b){return a.id-b.id;});
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
		k += nodes[i].id + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	if (k.length > 0 ) k = k.substring(0, k.length-1);
	var resourceId = $("#resourceId");
	var resourceIdName = $("#resourceIdName");
	resourceId.attr("value", k);
	resourceIdName.attr("value", v);
	getOperationTree(k);
}

function showMenu() {
	var cityObj = $("#resourceIdName");
	var cityOffset = $("#resourceIdName").offset();
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

function beforeClickOperation(treeId, treeNode) {
	return true;
}

function onClickOperation(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeOrgOperation"),
	nodes = zTree.getSelectedNodes(),
	v = "";
	k = "";
	nodes.sort(function compare(a,b){return a.id-b.id;});
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
		k += nodes[i].id + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	if (k.length > 0 ) k = k.substring(0, k.length-1);
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.attr("value", k);
	parentIdName.attr("value", v);
}

function showMenuOperation() {
	var cityObj = $("#parentIdName");
	var cityOffset = $("#parentIdName").offset();
	$("#menuContentOperation").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

	$("body").bind("mousedown", onBodyDownOperation);
}
function hideMenuOperation() {
	$("#menuContentOperation").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDownOperation);
}
function onBodyDownOperation(event) {
	if (!(event.target.id == "menuBtnOperation" || event.target.id == "menuContentOperation" || $(event.target).parents("#menuContentOperation").length>0)) {
		hideMenuOperation();
	}
}


//获取上级菜单树
function getResourceTree(appIds) {
    var urlBody = "platform-app/sys/res/resource/getResourceTree";
    var urlAll = urlHost + urlBody;
    var dataPost={
    		appId:appIds
    }
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(dataPost),
        success: function(json) {
            var zNodes = json.result;
            zTreeObj = $.fn.zTree.init($("#treeOrg"), setting, zNodes);
            zTreeObjOperation = $.fn.zTree.init($("#treeOrgOperation"), settingOperation, zNodes);
        }
    })
}

//获取上级按钮树
function getOperationTree(resourceIds) {
    var urlBody = "platform-app/sys/res/operation/getOperationTreeByResourceId";
    var urlAll = urlHost + urlBody;
    var dataPost={
    		resourceId:resourceIds
    }
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(dataPost),
        success: function(json) {
            var zNodes = json.result;
            zTreeObjOperation = $.fn.zTree.init($("#treeOrgOperation"), settingOperation, zNodes);
        }
    })
}


//初始化主键ID
function initUuid(){
	var uBody = "platform-app/generator/getGuuid";
    var uAll = urlHost + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
         var guuid=data.result;
	    $("#operationFrom").find("input[name='id']").val(guuid);
     }
	})
}

function saveForm(){
	var operationArr= $("#operationFrom").serializeArray();
	var operationDto={};
		for(var i in operationArr){
			if(operationArr[i].name=="registrationDate"||"createDate"==operationArr[i].name||"updateDate"==operationArr[i].name|| "disabledDate"==operationArr[i].name){

			}else if(operationArr[i].name=="parentIdName" || operationArr[i].name=="resourceIdName" || operationArr[i].name=="leaderIdName"){
				
			}else{
				operationDto[operationArr[i].name]=operationArr[i].value;
			}
		}
		operationDto.delflag=false;

   var uBody = "platform-app/sys/res/operation/save";
   var uAll = urlHost + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(operationDto),
       type:'POST',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData ) {
           if(resultData) {
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   alert('数据保存成功！');
                   add();
               }else {
            	   alert('数据保存失败！');
               }
           }
       }
   });
	
}
function add() {
	
	var queryData2={
			delflag:false
			};
	window.opener.jqGrid2.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	closeWin();
};
function closeWin(){
	window.close();
}


function getAppData(appId){
	var ubody = "platform-app/sys/res/appSystem/queryList";
	var uall = urlHost+ubody;
	var postdata={
		delflag:false
	};
	$.ajax({
        type:'post',
        url:uall,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(postdata),
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var appList=data.result;
        			 for(var o in appList){
        				 if(appId == appList[o].id){
        					 getResourceTree(appList[o].id);
        					 $("#appId").append("<option value='"+appList[o].id+"' selected>"+appList[o].name+"</option>")
        				 }else{
        					 $("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
        				 }
        			 }
        		 }
        	}else{
        		return data.msg
        	}
     }
	})
}

function SelectAppForm(ele){
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	var resourceId = $("#resourceId");
	var resourceIdName = $("#resourceIdName");
	parentId.attr("value", "");
	parentIdName.attr("value", "");
	resourceId.attr("value", "");
	resourceIdName.attr("value", "");
	getResourceTree(ele.value);
  }

//根据ID获取按钮
function getOperationById(){
	var operationId = window.opener.updateOperationId;
	var uBody = "platform-app/sys/res/operation/get/"+operationId;
    var uAll = urlHost + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
         var guuid=data.result;
         $("#operationFrom").find("input[name='id']").val(data.result.id);
         $("#operationFrom").find("input[name='code']").val(data.result.code);
         $("#name").attr("value", data.result.name);
         $("#resourceId").attr("value", data.result.resourceId);
         $("#parentId").attr("value", data.result.parentId);
         $("#url").attr("value", data.result.url);
         if(data.result.type == "1"){
        	 $("input[name='type'][value=1]").attr("checked",true); 
         }else{
        	 $("input[name='type'][value=0]").attr("checked",true); 
         }
         $("#sort").attr("value", data.result.sort);
         $("#remark").val(data.result.remark);
         getAppData(data.result.appId);
//	    $("#appFrom").find("input[name='id']").val(guuid);
     }
	})
}


$(function () {
	getOperationById();
//	getAppData();
//	initUuid();
		
        // Initialize Select2 Elements
	  $(".select2").select2();

      //Datemask dd/mm/yyyy
      $("#datemask").inputmask("dd/mm/yyyy", {"placeholder": "dd/mm/yyyy"});
      //Datemask2 mm/dd/yyyy
      $("#datemask2").inputmask("mm/dd/yyyy", {"placeholder": "mm/dd/yyyy"});
      //Money Euro
      $("[data-mask]").inputmask();

      //Date range picker
      $('#reservation').daterangepicker();
      //Date range picker with time picker
      $('#reservationtime').daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A'});
      //Date range as a button
      $('#daterange-btn').daterangepicker(
              {
                  ranges: {
                      'Today': [moment(), moment()],
                      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                      'This Month': [moment().startOf('month'), moment().endOf('month')],
                      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                  },
                  startDate: moment().subtract(29, 'days'),
                  endDate: moment()
              },
              function (start, end) {
                  $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
              }
      );

      //Date picker
      $('#datepicker').datepicker({
          autoclose: true
      });

      //iCheck for checkbox and radio inputs
      $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
          checkboxClass: 'icheckbox_minimal-blue',
          radioClass: 'iradio_minimal-blue'
      });
      //Red color scheme for iCheck
      $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
          checkboxClass: 'icheckbox_minimal-red',
          radioClass: 'iradio_minimal-red'
      });
      //Flat red color scheme for iCheck
      $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
          checkboxClass: 'icheckbox_flat-green',
          radioClass: 'iradio_flat-green'
      });

      //Colorpicker
      $(".my-colorpicker1").colorpicker();
      //color picker with addon
      $(".my-colorpicker2").colorpicker();

      //Timepicker
      $(".timepicker").timepicker({
          showInputs: false
      });
      //addCount();
    });



