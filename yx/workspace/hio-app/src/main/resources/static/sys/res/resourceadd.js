var rowNum=1;
var zTreeObj;



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
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	parentId.attr("value", k);
	parentIdName.attr("value", v);
}

function showMenu() {
	var cityObj = $("#parentIdName");
	var cityOffset = $("#parentIdName").offset();
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

//获取上级菜单树
function getResourceTree(appIds) {
    var urlBody = "platform-app/sys/res/resource/getResourceTree";
    var urlAll = urlHost + urlBody;
    var dataPost={
    		delflag:false,
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
        }
    })
}


//初始化主键ID
function initUuid(){
	var uBody = "platform-app/sys/uuid/generator/getGuuid";
    var uAll = urlHost + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
         var guuid=data.result;
	    $("#resourceFrom").find("input[name='id']").val(guuid);
     }
	})
}

function saveForm(){
	var resourceArr= $("#resourceFrom").serializeArray();
	var resourceDto={};
		for(var i in resourceArr){
			if(resourceArr[i].name=="registrationDate"||"createDate"==resourceArr[i].name||"updateDate"==resourceArr[i].name|| "disabledDate"==resourceArr[i].name){

			}else if(resourceArr[i].name=="parentIdName" || resourceArr[i].name=="upLeaderIdName" || resourceArr[i].name=="leaderIdName"){
				
			}else{
				resourceDto[resourceArr[i].name]=resourceArr[i].value;
			}
		}
		resourceDto.delflag=false;

   var uBody = "platform-app/sys/res/resource/save";
   var uAll = urlHost + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(resourceDto),
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


function getAppData(){
	var ubody = "platform-app/sys/res/appSystem/queryList";
	var uall = urlHost+ubody;
	var postdata ={
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
        				 if(o == 0){
        					 getResourceTree(appList[o].id);
        				 }
        				 $("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
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
	parentId.attr("value", "");
	parentIdName.attr("value", "");
	getResourceTree(ele.value);
  }

$(function () {
	getAppData();
	initUuid();
		
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



