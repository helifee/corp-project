$(function () {
	  $.ajax({
          type:'POST',
          url:'/platform-app/sys/base/baseRegion/getBaseRegionData',
          dataType:'json',
          contentType:'application/json',
          async:false,
          data:"{}",
          success: function(json) {
        	  if(json.success){
        		  data=json.result;
        		  //window.data({"region",data});
        		  var bodyData = {};
        		  for (var o in data){
        			  var parentIdVal = data[o].parentId;
        			  if(!parentIdVal){
        				  parentIdVal = "_NA_";
        			  }
        			  
        			  var groupJsonArr = $("body").data()[parentIdVal];
        			  if(!groupJsonArr){
        				  groupJsonArr = [];
        			  }
        			  groupJsonArr.push(data[o]);
        			  bodyData[parentIdVal]=groupJsonArr;
        			  $("body").data(bodyData);
        			  
        			  if(!data[o].parentId){
        				  $("#provinceId").append("<option value='"+data[o].id+"'>"+data[o].label+"</option>")  
        			  }
        		  }
        		  	var region =  $("body").data()[data[0].id];
        			var region2 =  $("body").data()[region[0].id];
        			for(var i in region2){
        				 $("#cityId").append("<option value='"+region2[i].id+"'>"+region2[i].label+"</option>") ;
        			}
        		
        		  
        	  }
          }
      });
		$.ajax({
	        type:'get',
	        url:'/platform-app/generator/getGuuid',
	        success: function(data) {
	         var guuid=data.result;
		    $("#baseCorporationForm").find("input[name='id']").val(guuid);
	     }
		})
		$.ajax({
	        type:'post',
	        url:'/platform-app/sys/org/orgnazation/queryListCompany',
	        dataType:'json',
	        contentType:'application/json',
	        data:"{}",
	        success: function(data) {
	        	if(data.success){
	        		 if(data.result){	
	        			 var company=data.result;
	        			 for(var o in company){
	        				 $("#companyId").append("<option value='"+company[o].value+"'>"+company[o].label+"</option>")
	        			 }
	        		 }
	        	}else{
	        		return data.msg
	        	}
	     }
		})
		
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
      addCount();
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
  function SelectCityForm(ele){
		var chird=  $(ele).parent().next().next().find("select");
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
function saveForm(op){
	var name=$("#baseCorporationForm").find("input[name='name']").val();
	if(!name){
		$("#baseCorporationForm").find("input[name='name']").parent().addClass("has-error has-feedback");
		$("#baseCorporationForm").find("input[name='name']").attr("title","请输入法人名称");
		return;
	}else{
		$("#baseCorporationForm").find("input[name='name']").parent().removeClass();
		$("#baseCorporationForm").find("input[name='name']").attr("title","");
	}
	
	var code=$("#baseCorporationForm").find("input[name='code']").val();
	if(!code){
		$("#baseCorporationForm").find("input[name='code']").parent().addClass("has-error has-feedback");
		$("#baseCorporationForm").find("input[name='code']").attr("title","请输入法人编码");
		return;
	}else{
		$("#baseCorporationForm").find("input[name='code']").parent().removeClass();
		$("#baseCorporationForm").find("input[name='code']").attr("title","");
	}
	var companyId=$("#baseCorporationForm").find("select[name='companyId']").val();
	if(!companyId||companyId=="-1"){
		$("#baseCorporationForm").find("input[name='companyId']").parent().addClass("has-error has-feedback");
		$("#baseCorporationForm").find("input[name='companyId']").attr("title","请选择所属公司");
		return;
	}
	var corporationId=$("#baseCorporationForm").find("input[name='id']").val();
	var data=[];
	$("#countForm").find("tr").each(function(i){
		if(i>0){
		var jsonDataArr =$(this).find(":input").serializeArray();
		var jsonData = {};
		jsonData.corporationId=corporationId;
		jsonData.delflag=0;
		for(var i in jsonDataArr){
				jsonData[jsonDataArr[i].name]=jsonDataArr[i].value;
				
		}
		if(jsonData.bankName&&jsonData.bankCode){
			data.push(jsonData);
		}
		}
	});
	var baseCorporationArr= $("#baseCorporationForm").serializeArray();
	var baseCorporationDto={};
		for(var i in baseCorporationArr){
			if("createDate"==baseCorporationArr[i].name||"updateDate"==baseCorporationArr[i].name|| "disabledDate"==baseCorporationArr[i].name){
				baseCorporationDto[baseCorporationArr[i].name]=new Date().getTime();
			}else{
				baseCorporationDto[baseCorporationArr[i].name]=baseCorporationArr[i].value;
			}
		}
		baseCorporationDto.list=data;
		baseCorporationDto.delflag=0;
   $.ajax({
       url:"/platform-app/sys/base/baseCorporation/save",
       data:JSON.stringify(baseCorporationDto),
       type:'POST',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData ) {
           if(resultData) {
               var successFlag = resultData.success;
               if(successFlag) {
                   toastr.success('数据保存成功！');
                   if(op=="over"){
                	   window.opener.location.href = window.opener.location.href;
                	   window.close();
                   }else if(op=="continue"){
                	   $("#baseCorporationForm")[0].reset();
                	   $("#countForm").find("tr").not("tr:first").remove();
                	   addCount();
                   }
               }else {
                   toastr.error('数据保存失败！');
               }
           }
       }
   });
	
}
function addCount(){
	$.ajax({
        type:'get',
        url:'/platform-app/generator/getGuuid',
        success: function(data) {
         var guuid=data.result;
		 var row=$('<tr>'
				 +'<td><input type="checkbox" ></td>'
				 +'<td style="text-align:center"></td>'
				 +'<td>'
				 +'<div class="form-group">'
				 +'<input type="text" name="bankName" class="form-control">'
				 +'<input type="hidden" name="id" value="'+guuid+'">'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div class="form-group">'
				 +'<input type="text" name="bankCode" class="form-control" >'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div class="form-group">'
				 +'<select  name="provinceId" class="form-control select2" onchange="SelectCity(this)"><option value="-1" selected="selected">请选择</option>'
				 +'</select>'
				 +'</div>'
				 +'</td>'
				 +' <td>'
				 +'<div class="form-group">'
				 +'<select   name="cityId" class="form-control select2"><option value="-1" selected="selected">请选择</option>'
				 +'</select>'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div class="form-group">'
				 +'<input type="text" name="address" class="form-control"  >'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div class="form-group">'
				 +'<select name="isDefault" class="form-control" onchange="changeDefault(this)"  style="width: 70px;">'
				 +'<option value="1" selected="selected" >是</option>'
				 +'<option value="0">否</option>'
				 +'</select>'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div class="form-group">'
				 +'<input type="text" class="form-control"  name="remark">'
				 +'</div>'
				 +'</td>'
				 +'</tr>');
	     $("#countForm").append(row);
		 reNum();
		 loadProvince(row);
		 resetDeafault(row);
     }
	})
	
}
function loadProvince(row){
	var region =  $("body").data()["_NA_"];
	var op=row.find("td").eq(4).find("div").find("select");
	for(var o in region){
	op.append("<option value='"+region[o].id+"'>"+region[o].label+"</option>") ;
	}
	SelectCity(op);
}
function  reNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td").eq(1).html(i);
		}
	});
}
function Tolist(){
	   window.opener.location.href = window.opener.location.href;
	   window.close();
}

function delAcount(){
	var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
	checkedTrObjs.remove();
	reNum();
}
function changeDefault(ele){
  var j=$(ele).parent().parent().parent().find("td").eq(1).html();
  if($(ele).val()=="1"){
	  $("#countForm").find("tr").each(function(i){
	    if(i!=j){
	    	$(this).find("td").eq(7).find("select").val("0");
	    	
	    }
	  });
  }
}
function resetDeafault(row){
	if(row.find("td").eq(1).html()=="1"){
		return;
	}else{
		row.find("td").eq(7).find("select").val("0");
	}
}