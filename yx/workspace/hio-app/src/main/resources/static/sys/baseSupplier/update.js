 	var AcountdataList = [];
$(function () {
	  $.getUrlParam = function(name){
          var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");       
          var r = window.location.search.substr(1).match(reg);
          if (r!=null ){
              return unescape(r[2]);
          }
          return null;     
      };
var id = $.getUrlParam('id'); 
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
        			  
        			  if(data[o].parentId){
        				  continue;
        			  }else{
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
	        type:'get',
	        url:'/platform-app/sys/base/baseSupplier/get/'+id,
	        success: function(data) {
	        	var SupplierData=data.result;
	        		$("input[name='id']").val(SupplierData.id);
	        		$("input[name='name']").val(SupplierData.name);
	        		$("input[name='code']").val(SupplierData.code);
	        		 $("select[name='provinceId']").val(SupplierData.provinceId);
	        		 var provinceName = $("#provinceId  option:selected").text();
	        		 $('span[id*="provinceId"]').attr("title",provinceName);
	        		 $('span[id*="provinceId"]').text(provinceName);
	        		 SelectCityForm($("#provinceId")[0]);
	        		$("input[name='relationPerson']").val(SupplierData.relationPerson);
	        		$("input[name='representative']").val(SupplierData.representative);
	        		$("input[name='registrationDate']").val(SupplierData.registrationDate);
	        		$("input[name='status']").val(SupplierData.status).attr("checked",true);
	        	     var supplierAppData=(SupplierData.supplierApp).split(",");
	        	    for(var o in supplierAppData){
	        	    	$("input[name='supplierApp']").each(function(){
	        	    		if($(this).val()==supplierAppData[o]){
	        	    			$(this).attr("checked",true);
	        	    		}
	        	    	})
	        	    }
	        	    $("select[name='companyId']").val(SupplierData.companyId);
	        		var companyArray=SupplierData.companyId.split(",")
	        		var companyName=[];
	        		for(var o in companyArray){
	        			$("ul").find("input[name='multiselect_companyId']").each(function(){
	        				if($(this).val()==companyArray[o]){
	        					companyName.push($(this).next().text());
	        					this.checked = true;
	        				}
	        			})
	        		}
	        		$("#companyId_ms").find("span:eq(1)").text(companyName);
	        		$("#cityId").val(SupplierData.cityId);
	        		 var cityName = $("#select[name='cityId'] option:selected").text();
	        		 $('span[id*="cityId"]').attr("title",cityName);
	        		 $('span[id*="cityId"]').text(cityName);
	        		
	        		$("input[name='phone']").val(SupplierData.phone);
	        		$("input[name='license']").val(SupplierData.license);
	        		$("input[name='workPhone']").val(SupplierData.workPhone);
	        		$("input[name='supplierResoure']").val(SupplierData.supplierResoure);
	        		$("input[name='address']").val(SupplierData.address);
	        		$("input[name='remark']").val(SupplierData.remark);
	        		
	        		$("input[name='createPersonId']").val(SupplierData.createPersonId);
	        		$("input[name='createPersonName']").val(SupplierData.createPersonName);
	        		$("input[name='updatePersonId']").val(SupplierData.updatePersonId);
	        		$("input[name='updatePersonName']").val(SupplierData.updatePersonName);
	        		$("input[name='disabledId']").val(SupplierData.disabledId);
	        		$("input[name='createDate']").val(SupplierData.createDate);
	        		$("input[name='updateDate']").val(SupplierData.updateDate);
	        		$("input[name='disabledDate']").val(SupplierData.disabledDate);
	        		var SupplierAcount=SupplierData.list;
	        		if(SupplierAcount.length>0){
	        			var countLengt=1;
	        			for(var o in SupplierAcount){
	        				addCountList();
	        				var  Acount=$("#countForm").find("tr").eq(countLengt);
	        				Acount.find("input[name='bankName']").val(SupplierAcount[o].bankName);
	        				Acount.find("input[name='bankCode']").val(SupplierAcount[o].bankCode);
	        				Acount.find("input[name='id']").val(SupplierAcount[o].id);
	        				Acount.find("select[name='provinceId']").val(SupplierAcount[o].provinceId);
	        				SelectCity($("select[name='provinceId']")[countLengt]);
	        				Acount.find("select[name='cityId']").val(SupplierAcount[o].cityId);
	        				
	        				Acount.find("input[name='address']").val(SupplierAcount[o].address);
	        				Acount.find("input[name='isDefault']").val(SupplierAcount[o].isDefault);
	        				Acount.find("input[name='remark']").val(SupplierAcount[o].remark);
	        				Acount.find("input[name='concurrencyVersion']").val(SupplierAcount[o].concurrencyVersion);
	        				countLengt++;
	        			}
	        		}
	        	}
		});

        // Initialize Select2 Elements
	  $(".select2").select2();
		$("#companyId").multiselect({
			selectedList: 6
		});
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
      $("#companyId_ms").height("30px");
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
function addCountList(){
		 var row=$('<tr>'
		    +'<td><input type="checkbox" name="check"></td>'
			+'<td style="text-align:center"></td>'
			+'<td><div class="form-group"><input type="text" class="form-control" name="bankName" ><input type="hidden" name="id" value=""></div></td>'
			+'<td><div class="form-group"><input type="text" class="form-control" name="bankCode"></div></td>'
			+'<td><div class="form-group"><select name="provinceId"  class="form-control select2 "onchange="SelectCity(this)"><option value="-1">请选择</option></select></div></td>'
			+'<td><div class="form-group"><select name="cityId" class="form-control select2"></select></div></td>'
			+'<td><div class="form-group"><input type="text" class="form-control" name="address"></div></td>'
			+'<td><div class="form-group"><select name="isDefault" onchange="changeDefault(this)"  class="form-control" style="width: 70px;">'
			+'<option selected="selected" value="1">是</option><option value="0">否</option></select></div></td>'
	        +'<td><div class="form-group"><input type="text" class="form-control" name="remark"><input type="hidden" class="form-control" name="concurrencyVersion"></div></td>'
			+'</tr>');
	     $("#countForm").append(row);
	     reNum();
		 loadProvince(row);
	
}

function  reNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td").eq(1).html(i);
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
function delAcount(){
	var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
	//alert(checkedTrObjs);
	for(var o=0;o<checkedTrObjs.length;o++){
		var delDatas =	$(checkedTrObjs[o]).find(":input").serializeArray();
		var jsonData = {};
		for(var i in delDatas){
			jsonData[delDatas[i].name]=delDatas[i].value;
		}
		jsonData.supplierId=$("#baseSupplierFrom").find("input[name='id']").val();
		jsonData.delflag=1;
		AcountdataList.push(jsonData);
	}
	checkedTrObjs.remove();
	reNum();
}
function Tolist(){
	window.close();
}

function saveForm(){
	var supplierId=$("#baseSupplierFrom").find("input[name='id']").val();
	$("#countForm").find("tr").each(function(i){
		if(i>0){
		var jsonDataArr =$(this).find(":input").serializeArray();
		var jsonData = {};
		jsonData.supplierId=supplierId;
		jsonData.delflag=0;
		for(var j in jsonDataArr){
				jsonData[jsonDataArr[j].name]=jsonDataArr[j].value;
		}
		AcountdataList.push(jsonData);
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
		baseSupplierDto.list=AcountdataList;
		baseSupplierDto.delflag=0;
	$.ajax({
       url:"/platform-app/sys/base/baseSupplier/update/"+supplierId,
       data:JSON.stringify(baseSupplierDto),
       type:'PUT',
       contentType:'application/json',
       dataType:'JSON',
       success:function (resultData){
    	    if(resultData.success){
         	   window.opener.location.href = window.opener.location.href;
    	    	window.close();
    	    }
       }
   });
}

function addCount(){
	$.ajax({
        type:'get',
        url:'/platform-app/sys/uuid/generator/getGuuid',
        success: function(data) {
         var guuid=data.result;
		 var row=$('<tr>'
			+'<td><input type="checkbox" name="check"></td>'
			+'<td style="text-align:center"></td>'
			+'<td><div class="form-group"><input type="text" class="form-control" name="bankName" ><input type="hidden" name="id" value="'+guuid+'"></div></td>'
			+'<td><div class="form-group"><input type="text" class="form-control" name="bankCode"></div></td>'
			+'<td><div class="form-group"><select name="provinceId"  class="form-control select2 "onchange="SelectCity(this)"></select></div></td>'
			+'<td><div class="form-group"><select name="cityId" class="form-control select2"></select></div></td>'
			+'<td><div class="form-group"><input type="text" class="form-control" name="address"></div></td>'
			+'<td><div class="form-group"><select name="isDefault"onchange="changeDefault(this)"  class="form-control" style="width: 70px;">'
			+'<option selected="selected" value="1">是</option><option value="0">否</option></select></div></td>'
	        +'<td><div class="form-group"><input type="text" class="form-control" name="remark"></div></td>'
			+'</tr>');
	     $("#countForm").append(row);
		 reNum();
		 loadProvince(row);
     }
	})
	
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