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
		});
		
		$.ajax({
	        type:'get',
	        url:'/platform-app/sys/base/baseCorporation/get/'+id,
	        success: function(data) {
	        	var CorporationData=data.result;
	        		$("input[name='id']").val(CorporationData.id);
	        		$("input[name='name']").val(CorporationData.name);
	        		$("input[name='code']").val(CorporationData.code);
	        		 $("#provinceId").val(CorporationData.provinceId);
	        		 var provinceName = $("#provinceId  option:selected").text();
	        		 $('span[id*="provinceId"]').attr("title",provinceName);
	        		 $('span[id*="provinceId"]').text(provinceName);
	        		 SelectCityForm($("#provinceId")[0]);
	        		
	        		
	        		$("input[name='representative']").val(CorporationData.representative);
	        		$("input[name='status']").val(CorporationData.status).attr("checked",true);
	        		
	        		$("#companyId").val(CorporationData.companyId);
	        		 var companyName = $("#companyId  option:selected").text();
	        		 $('span[id*="companyId"]').attr("title",companyName);
	        		 $('span[id*="companyId"]').text(companyName);
	        		$("#cityId").val(CorporationData.cityId);
	        		 var cityName = $("#select[name='cityId'] option:selected").text();
	        		 $('span[id*="cityId"]').attr("title",cityName);
	        		 $('span[id*="cityId"]').text(cityName);
	        		$("input[name='address']").val(CorporationData.address);
	        		$("input[name='remark']").val(CorporationData.remark);
	        		
	        		$("input[name='createPersonId']").val(CorporationData.createPersonId);
	        		$("input[name='createPersonName']").val(CorporationData.createPersonName);
	        		$("input[name='updatePersonId']").val(CorporationData.updatePersonId);
	        		$("input[name='updatePersonName']").val(CorporationData.updatePersonName);
	        		$("input[name='disabledId']").val(CorporationData.disabledId);
	        		$("input[name='createDate']").val(CorporationData.createDate);
	        		$("input[name='updateDate']").val(CorporationData.updateDate);
	        		$("input[name='disabledDate']").val(CorporationData.disabledDate);
	        		var CorporationAcount=CorporationData.list;
	        	//	alert(CorporationAcount.length);
	        		if(CorporationAcount.length>0){
	        			var countLengt=1;
	        			for(var o in CorporationAcount){
	        				addCountList();
	        				var  Acount=$("#countForm").find("tr").eq(countLengt);
	        				Acount.find("input[name='bankName']").val(CorporationAcount[o].bankName);
	        				Acount.find("input[name='bankCode']").val(CorporationAcount[o].bankCode);
	        				Acount.find("input[name='id']").val(CorporationAcount[o].id);
	        				Acount.find("select[name='provinceId']").val(CorporationAcount[o].provinceId);
	        				 SelectCity($("select[name='provinceId']")[countLengt]);
	        				Acount.find("select[name='cityId']").val(CorporationAcount[o].cityId);
	        				Acount.find("input[name='address']").val(CorporationAcount[o].address);
	        				Acount.find("input[name='isDefault']").val(CorporationAcount[o].isDefault);
	        				Acount.find("input[name='remark']").val(CorporationAcount[o].remark);
	        				Acount.find("input[name='concurrencyVersion']").val(CorporationAcount[o].concurrencyVersion);
	        				countLengt++;
	        			}
	        		}
	        	}
		});
	
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
function addCountList(){
		 var row=$('<tr>'
		 +'<td><input type="checkbox" name="check"></td>'
		 +'<td style="text-align:center"></td>'
		 +'<td>'
		 +'<div class="form-group">'
		 +'<input type="text" name="bankName" class="form-control">'
		 +'<input type="hidden" name="id" value="">'
		 +'</div>'
		 +'</td>'
		 +'<td>'
		 +'<div class="form-group">'
		 +'<input type="text" name="bankCode" class="form-control" id="" >'
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
		 +'<option selected="selected" value="1">是</option>'
		 +'<option value="0">否</option>'
		 +'</select>'
		 +'</div>'
		 +'</td>'
		 +'<td>'
		 +'<div class="form-group">'
		 +'<input type="text" class="form-control"  name="remark">'
		 +'<input type="hidden" class="form-control"  name="concurrencyVersion">'
		 +'</div>'
		 +'</td>'
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
	var op=row.find("td").eq(4).find("div").find("select");
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
		jsonData.corporationId=$("#baseCorporationForm").find("input[name='id']").val();
		jsonData.delflag=true;
		AcountdataList.push(jsonData);
	}
	checkedTrObjs.remove();
	reNum();
}
function Tolist(){
	   window.opener.location.href = window.opener.location.href;
	window.close();
}

function saveForm(){
	var CorporationId=$("#baseCorporationForm").find("input[name='id']").val();
	$("#countForm").find("tr").each(function(i){
		if(i>0){
		var jsonDataArr =$(this).find(":input").serializeArray();
		var jsonData = {};
		jsonData.corporationId=CorporationId;
		jsonData.delflag=false;
		for(var j in jsonDataArr){
				jsonData[jsonDataArr[j].name]=jsonDataArr[j].value;
		}
		AcountdataList.push(jsonData);
		}
	});
	var baseCorporationArr= $("#baseCorporationForm").serializeArray();
	var baseCorporationDto={};
		for(var i in baseCorporationArr){
			if(baseCorporationArr[i].name=="registrationDate"||"createDate"==baseCorporationArr[i].name||"updateDate"==baseCorporationArr[i].name|| "disabledDate"==baseCorporationArr[i].name){
				baseCorporationDto[baseCorporationArr[i].name]=new Date().getTime();
			}else{
				baseCorporationDto[baseCorporationArr[i].name]=baseCorporationArr[i].value;
			}
		}
		baseCorporationDto.list=AcountdataList;
		baseCorporationDto.delflag=0;
	$.ajax({
       url:"/platform-app/sys/base/baseCorporation/update/"+CorporationId,
       data:JSON.stringify(baseCorporationDto),
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
				 +'<select  name="provinceId" class="form-control select2" onchange="SelectCity(this)">'
				 +'</select>'
				 +'</div>'
				 +'</td>'
				 +' <td>'
				 +'<div class="form-group">'
				 +'<select   name="cityId" class="form-control select2">'
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
				 +'<option selected="selected" value="1">是</option>'
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
        }
	});
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