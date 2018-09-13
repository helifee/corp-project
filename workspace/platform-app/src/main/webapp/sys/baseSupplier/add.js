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
		    $("#baseSupplierFrom").find("input[name='id']").val(guuid);
	     }
		})
		$.ajax({
	        type:'post',
	        url:'/platform-app/sys/org/orgnazation/queryListCompany',
	        dataType:'json',
	        contentType:'application/json',
	        data:"{}",
	        async:false,
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
		
	   $.ajax({
	        type:'post',
	        url:'/platform-app//sys/res/appSystem/queryList',
	        contentType:'application/json',
	        data:"{}",
	        success: function(data) {
	        	if(data.success){
	        		var sysapp=data.result
	        		for(var o in sysapp){
	        			$("#systemCheck").append("<input type='checkbox' name='supplierApp' value="+sysapp[o].id+">"+sysapp[o].name);
	        		}
	        	}
	     }
	   });
        // Initialize Select2 Elements
	   $(".select2").select2();
		$("#companyId").multiselect({
			selectedList: 6
		});
		   $("#companyId_ms").height("30px");
	     addCount();
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

  function SelectCity(ele){
	var chird=  $(ele).parent().next().find("select");
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
	
	var name=$("#baseSupplierFrom").find("input[name='name']").val();
	if(!name){
		$("#baseSupplierFrom").find("input[name='name']").parent().addClass("has-error has-feedback");
		$("#baseSupplierFrom").find("input[name='name']").attr("title","请输入供方名称");
		return;
	}else{
		$("#baseSupplierFrom").find("input[name='name']").parent().removeClass();
		$("#baseSupplierFrom").find("input[name='name']").attr("title","");
	}
	
	var code=$("#baseSupplierFrom").find("input[name='code']").val();
	if(!code){
		$("#baseSupplierFrom").find("input[name='code']").parent().addClass("has-error has-feedback");
		$("#baseSupplierFrom").find("input[name='code']").attr("title","请输入供方编码");
		return;
	}else{
		$("#baseSupplierFrom").find("input[name='code']").parent().removeClass();
		$("#baseSupplierFrom").find("input[name='code']").attr("title","");
	}
	var companyId=$("#baseSupplierFrom").find("select[name='companyId']").val();
	if(!companyId||companyId=="-1"){
		$("#baseSupplierFrom").find("input[name='companyId']").parent().addClass("has-error has-feedback");
		$("#baseSupplierFrom").find("input[name='companyId']").attr("title","请选择所属公司");
		return;
	}
	
	
	
	var supplierId=$("#baseSupplierFrom").find("input[name='id']").val();
	var data=[];
	$("#countForm").find("tr").each(function(i){
		if(i>0){
		var jsonDataArr =$(this).find(":input").serializeArray();
		var jsonData = {};
		jsonData.supplierId=supplierId;
		jsonData.delflag=0;
		for(var i in jsonDataArr){
				jsonData[jsonDataArr[i].name]=jsonDataArr[i].value;
				
		}
		if(jsonData.bankName&&jsonData.bankCode){
			data.push(jsonData);
		}
		}
	});
	var baseSupplierArr= $("#baseSupplierFrom").serializeArray();
	var baseSupplierDto={};
		for(var i in baseSupplierArr){
			if(baseSupplierArr[i].name=="registrationDate"||"createDate"==baseSupplierArr[i].name||"updateDate"==baseSupplierArr[i].name|| "disabledDate"==baseSupplierArr[i].name){
				baseSupplierDto[baseSupplierArr[i].name]=new Date().getTime();
			}else if(baseSupplierArr[i].name=="companyId"){
				var companyIdvalue=$("#companyId").val().join(",");
				baseSupplierDto[baseSupplierArr[i].name]=companyIdvalue;
			}else{
				baseSupplierDto[baseSupplierArr[i].name]=baseSupplierArr[i].value;
			}
		}
		 var chk_value ="";   
		  $("input[name='supplierApp']:checked").each(function(){    
				   chk_value+=$(this).val();    
				   chk_value+=",";    
		});    
		baseSupplierDto.supplierApp=chk_value;
		baseSupplierDto.list=data;
		baseSupplierDto.delflag=0;
   $.ajax({
       url:"/platform-app/sys/base/baseSupplier/save",
       data:JSON.stringify(baseSupplierDto),
       type:'POST',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData ) {
           if(resultData) {
               toastr.options={
                   positionClass:"toast-top-center"
               };
               var successFlag = resultData.success;
               var result = resultData.result;
               var msg = resultData.msg;
               if(successFlag) {
                   toastr.success('数据保存成功！');
                   if(op=="over"){
                	   window.opener.location.href = window.opener.location.href;
                	   window.close();
                   }else if(op=="continue"){
                	   $("#baseSupplierFrom")[0].reset();
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
         +'<td><input type="checkbox" name="check" ></td>'
         +'<td style="text-align:center"></td>'
         +'<td><input type="text" name="bankName"  class="form-control"><input type="hidden" name="id" value="'+guuid+'"></td>'
         +'<td><input type="text" name="bankCode"  class="form-control"></td>'
         +'<td>'
         +'<select name="provinceId"  onchange="SelectCity(this)" class="mar_b_20 form-control select2"><option value="-1" selected="selected">请选择</option>'
         +'</select>'
         +'</td>'
         +'<td>'
         +'<select  name="cityId" class="form-control select2"> <option value="-1" selected="selected">请选择</option>'
         +'</select>'
         +'</td>'
         +'<td>'
         +'<input type="text" name="address" class="form-control" >'
         +'</td>'
         +'<td>'
         +'<select name="isDefault" onchange="changeDefault(this)" class="form-control">'
         +'<option selected="selected"  value="1">是</option>'
         +'<option  value="0">否</option>'
         +'</select>'
         +'</td>'
         +'<td>'
         +'<input type="text"  name="remark" class="form-control">'
         +'</td>'
         +'</tr>');
	     $("#countForm").append(row);
		 reNum();
		 loadProvince(row);
		 resetDeafault(row);
     }
	});
}
function loadProvince(row){
	var region =  $("body").data()["_NA_"];
	var op=row.find("td").eq(4).find("select");
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
function delAcount(){
	var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
	checkedTrObjs.remove();
	reNum();
	
}
function Tolist(){
	   window.opener.location.href = window.opener.location.href;
	   window.close();
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