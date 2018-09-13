var rowNum=1;
var zTreeObj;

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
	    $("#appFrom").find("input[name='id']").val(guuid);
     }
	})
}

//根据ID获取业务系统
function getAppById(){
	var appId = window.opener.updateAppId;
	var uBody = "platform-app/sys/res/appSystem/get/"+appId;
    var uAll = urlHost + uBody;
	$.ajax({
        type:'get',
        url:uAll,
        success: function(data) {
         var guuid=data.result;
         $("#appFrom").find("input[name='id']").val(data.result.id);
         $("#appFrom").find("input[name='code']").val(data.result.code);
         $("#name").attr("value", data.result.name);
         $("#fullName").attr("value", data.result.fullName);
         $("#url").attr("value", data.result.url);
         if(data.result.isextsys == "1"){
        	 $("input[name='isextsys'][value=1]").attr("checked",true); 
         }else{
        	 $("input[name='isextsys'][value=0]").attr("checked",true); 
         }
         if(data.result.status == "1"){
        	 $("input[name='status'][value=1]").attr("checked",true); 
         }else{
        	 $("input[name='status'][value=0]").attr("checked",true); 
         }
         $("#icon").attr("value", data.result.icon);
         if(data.result.openmode == "1"){
        	 $("input[name='openmode'][value=1]").attr("checked",true); 
         }else{
        	 $("input[name='openmode'][value=0]").attr("checked",true); 
         }
         $("#sort").val(data.result.sort);
         $("#remark").val(data.result.remark);
//	    $("#appFrom").find("input[name='id']").val(guuid);
     }
	})
}

function saveForm(){
	var appArr= $("#appFrom").serializeArray();
	var appDto={};
		for(var i in appArr){
			if(appArr[i].name=="registrationDate"||"createDate"==appArr[i].name||"updateDate"==appArr[i].name|| "disabledDate"==appArr[i].name){

			}else if(appArr[i].name=="parentIdName" || appArr[i].name=="upLeaderIdName" || appArr[i].name=="leaderIdName"){
				
			}else{
				appDto[appArr[i].name]=appArr[i].value;
			}
		}
		appDto.delflag=false;

   var appId = $('#id').val(); 
   var uBody = "platform-app/sys/res/appSystem/update/"+appId;
   var uAll = urlHost + uBody;
   $.ajax({
       url:uAll,
       data:JSON.stringify(appDto),
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




$(function () {
//	initUuid();
	
	getAppById();
		
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
    });


