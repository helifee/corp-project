var rowNum=1;
//var urlHost = "http://127.0.0.1:8080/";
var zTreeObj;
var patentIdold;
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

//递归树传icon
function recursionArray(arr) {
    for(var i in arr) {
    	if(arr[i].type == "zb" || arr[i].type == "company") {
            arr[i].icon = "../css/zTreeStyle/img/diy/main.png";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "dept" ) {
            arr[i].icon = "../css/zTreeStyle/img/diy/1_open.png";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "group" ) {
            arr[i].icon = "../css/zTreeStyle/img/diy/5.png";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "branch" ) {
            arr[i].icon = "../css/zTreeStyle/img/diy/3.png";
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }else if(arr[i].type == "cata" ) {
            if(arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        } 
    }
};
//获取组织机构树
function initOrgTree() {
    var urlBody = "platform-app/sys/org/root/getTree";
    var urlAll = urlHost + urlBody;
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:'{}',
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeOrg"), setting, zNodes);
        }
    })
}

function beforeClick(treeId, treeNode) {
	return true;
}

function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeOrg"),
	nodes = zTree.getSelectedNodes(),
	v = "";
	k = "";
	r = "";
	nodes.sort(function compare(a,b){return a.id-b.id;});
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
		k += nodes[i].id + ",";
		r += nodes[i].rootId + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	if (k.length > 0 ) k = k.substring(0, k.length-1);
	if (r.length > 0 ) r = r.substring(0, r.length-1);
	var rootId = $("#rootId");
	var parentId = $("#parentId");
	var parentIdName = $("#parentIdName");
	rootId.attr("value", r);
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


//初始化主键ID
function initUuid(){
	var uBody = "platform-app/generator/getGuuid";
    var uAll = urlHost + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
         var guuid=data.result;
	    $("#orgnazationFrom").find("input[name='id']").val(guuid);
     }
	})
}

//根据ID获取业务系统
function getOrgById(){
//	var orgId="9bbbfdad059345ffada9e20b1ea8d1e2";
	var orgId = window.opener.edit_orgId;
	var uBody = "platform-app/sys/org/orgnazation/get/"+orgId;
    var uAll = urlHost + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
//         var guuid=data.result;
         if(data.result.type == "zb"){
        	 $("input[name='type'][value=zb]").attr("checked",true); 
         }else if(data.result.type == "company"){
        	 $("input[name='type'][value=company]").attr("checked",true); 
         }else if(data.result.type == "dept"){
        	 $("input[name='type'][value=dept]").attr("checked",true); 
         }else if(data.result.type == "group"){
        	 $("input[name='type'][value=group]").attr("checked",true); 
         }else if(data.result.type == "zb"){
        	 $("input[name='type'][value=branch]").attr("checked",true); 
         }else{
        	 $("input[name='type'][value=zb]").attr("checked",true); 
         }
         $("#orgnazationFrom").find("input[name='id']").val(data.result.id);
         $("#orgnazationFrom").find("input[name='type']").val(data.result.type);
         $("#orgnazationFrom").find("input[name='code']").val(data.result.code);
         $("#orgnazationFrom").find("input[name='name']").val(data.result.name);
         $("#orgnazationFrom").find("input[name='leaderId']").val(data.result.leaderId);
         //$("#orgnazationFrom").find("input[name='leaderIdName']").val(data.result.leaderIdName);
         $("#orgnazationFrom").find("input[id='parentId']").val(data.result.parentId);
         patentIdold=data.result.parentId;
         //$("#orgnazationFrom").find("input[name='parentIdName']").val(data.result.parentIdName);
         $("#orgnazationFrom").find("input[name='upLeaderId']").val(data.result.upLeaderId);
         //$("#orgnazationFrom").find("input[name='upLeaderIdName']").val(data.result.upLeaderIdName);
         $("#orgnazationFrom").find("input[name='sort']").val(data.result.sort);
         if(data.result.status == "1"){
        	 $("input[name='status'][value=1]").attr("checked",true); 
         }else{
        	 $("input[name='status'][value=0]").attr("checked",true); 
         }
         $("#orgnazationFrom").find("input[name='remark']").val(data.result.remark);
         $("#orgnazationFrom").find("input[name='createPersonId']").val(data.result.createPersonId);
         $("#orgnazationFrom").find("input[name='createPersonName']").val(data.result.createPersonName);
         $("#orgnazationFrom").find("input[name='createDate']").val(data.result.createDate);
         $("#orgnazationFrom").find("input[name='updatePersonId']").val(data.result.updatePersonId);
         $("#orgnazationFrom").find("input[name='updatePersonName']").val(data.result.updatePersonName);
         $("#orgnazationFrom").find("input[name='updateDate']").val(data.result.updateDate);
         //$("#orgnazationFrom").find("input[name='disabledId']").val(data.result.disabledId);
         $("#orgnazationFrom").find("input[name='disabledDate']").val(data.result.disabledDate);
         
         $("#remark").val(data.result.remark);
//	    $("#orgnazationFrom").find("input[name='id']").val(guuid);
     }
	})
}


$(function () {
	getOrgById();
	initOrgTree();
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

//修改-保存组织信息
function editForm(){
	var orgnazationArr= $("#orgnazationFrom").serializeArray();
	var orgnazationDto={};
		for(var i in orgnazationArr){
			if(orgnazationArr[i].name=="registrationDate"||"createDate"==orgnazationArr[i].name||"updateDate"==orgnazationArr[i].name|| "disabledDate"==orgnazationArr[i].name){
//				orgnazationDto[orgnazationArr[i].name]=1486542885000;
			}else if(orgnazationArr[i].name=="parentIdName" || orgnazationArr[i].name=="upLeaderIdName" || orgnazationArr[i].name=="leaderIdName" || orgnazationArr[i].name=="disabledId"){
				
			}else{
				orgnazationDto[orgnazationArr[i].name]=orgnazationArr[i].value;
			}
		}
		orgnazationDto.delflag=false;
		var orgId = $('#id').val();
		orgnazationDto.id=orgId;
   var uBody = "platform-app/sys/org/orgnazation/update/"+orgId;
   var uAll = urlHost + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(orgnazationDto),
       type:'PUT',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData ) {
           if(resultData) {
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   alert('数据保存成功！');
                   editNode();
               }else {
            	   alert('数据保存失败！');
               }
           }
       }
   });
	
}
function closeWin(){
	window.close();
}
function editNode() {
	
//	window.opener.document.getElementById(elementId);
	var ss = window.opener.zTreeObj;
	var parentId = $("#parentId").val();
	var treeNodep = ss.getNodeByParam("id", parentId, null);
	var id = $("#id").val();
	var treeNodec = ss.getNodeByParam("id", id, null);	
	var name = $("#name").val();
	var type ;
	var icon ;
	var sort = $("#sort").val();
	var rootId = $("#rootId").val();
	var temp = document.getElementsByName("type");
	  for(var i=0;i<temp.length;i++)
	  {
	     if(temp[i].checked)
	    	 type = temp[i].value;
	  }
	  
	  if(type == "zb" || type == "company") {
        icon = "../css/zTreeStyle/img/diy/main.png";
    }else if(type == "dept" ) {
        icon = "../css/zTreeStyle/img/diy/1_open.png";
    }else if(type == "group" ) {
        icon = "../css/zTreeStyle/img/diy/5.png";
    }else if(type == "branch" ) {
        icon = "../css/zTreeStyle/img/diy/3.png";
    }else if(type == "cata" ) {
    } 
	treeNodec.name = name;
	treeNodec.type = type;
	treeNodec.icon = icon;
	treeNodec.sort = sort;
	treeNodec.rootId = rootId;
	ss.updateNode(treeNodec);//更新节点属性
	
	if(patentIdold!=parentId){//移动节点
		ss.moveNode(treeNodep, treeNodec, "inner");
	}
	closeWin();
};


function SelectCity(ele){
	var chird=  $(ele).parent().parent().next().find("select");
	chird.html("");
	//  $("#cityId").html("");
	 var region =  $("body").data()[$(ele).val()];
	 for(var i in region){
		 if(region[i].label=="市辖区"||region[i].label=="县"){
			 var region2 =  $("body").data()[region[i].id];
			 for(var i in region2){
				 chird.append("<option value='"+region2[i].id+"'>"+region2[i].label+"</option>") ;
			 }
			 return;
		 }
		 chird.append("<option value='"+region[i].id+"'>"+region[i].label+"</option>") ;
	 }
  }

function loadProvince(row){
	var region =  $("body").data()["_NA_"];
	var op=row.find("td").eq(3).find("div").find("select");
	for(var o in region){
	op.append("<option value='"+region[o].id+"'>"+region[o].label+"</option>") ;
	}
	SelectCity(op);
}
function  reNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td:first").html(i);
		}
	});
}

