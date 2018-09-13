var rowNum=1;
//var urlHost = "http://127.0.0.1:8080/";
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




$(function () {
	initOrgTree();
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


function saveForm(){
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

   var uBody = "platform-app/sys/org/orgnazation/save";
   var uAll = urlHost + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(orgnazationDto),
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
function closeWin(){
	window.close();
}
function add() {
	
//	window.opener.document.getElementById(elementId);
	var ss = window.opener.zTreeObj;
	var parentId = $("#parentId").val();
	var treeNode = ss.getNodeByParam("id", parentId, null);
	var id = $("#id").val();
	var name = $("#name").val();
	var type ;
	var icon ;
	var sort = $("#sort").val();
	var rootId = $("#rootId").val();
	var children = [];
	
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
	
	if (treeNode) {
		treeNode = ss.addNodes(treeNode, {id:id, name:name, type:type, sort:sort,rootId:rootId,children:children,icon:icon});
	} else {
		treeNode = ss.addNodes(null, {id:id, name:name, type:type, sort:sort,rootId:rootId,children:children,icon:icon});
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

function addCount(){
	$.ajax({
        type:'get',
        url:'http://127.0.0.1:8080/platform-app/generator/getGuuid',
        success: function(data) {
         var guuid=data.result;
		 var row=$('<tr>'
			+'<td></td>'
			+'<td><div class="form-group"><input type="text" class="form-control" name="bankName" ><input type="hidden" name="id" value="'+guuid+'"></div></td>'
			+'<td><div class="form-group"><input type="text" class="form-control" name="bankCode"></div></td>'
			+'<td><div class="form-group"><select name="provinceId"  class="form-control select2 "onchange="SelectCity(this)"></select></div></td>'
			+'<td><div class="form-group"><select name="cityId" class="form-control select2"></select></div></td>'
			+'<td><div class="form-group"><input type="text" class="form-control" name="address"></div></td>'
			+'<td><div class="form-group"><select name="" id="" class="form-control" style="width: 70px;">'
			+'<option selected="selected">是</option><option>否</option></select></div></td>'
	        +'<td><div class="form-group"><input type="text" class="form-control" name="remark"></div></td>'
			+'</tr>');
	     $("#countForm").append(row);
		 reNum();
		 loadProvince(row);
     }
	})
	
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

