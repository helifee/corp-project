var AcountdataList =new Array();
var type=$.xljUtils.getUrlParam('type');
var regInput=true;
$(document).ready(function() {
	  pageInit();
	  if(type=="add"){
		  $("#corporationTitle").html("法人档案-新增");
		   document.title="法人档案-新增";
		/*  $(".removetr").hide();*/
	  }else{
		  $("#corporationTitle").html("法人档案-修改");
		   document.title="法人档案-修改";
		/*  $(".removetr").show();*/
	  }
	  $("#saveBtn").on('click',function(){
		 $("#baseCorporationForm").attr("data-validate-success","saveForm('over')");
		  $("#baseCorporationForm").submit();
	  });
	  
	  $("#saveAndCreateBtn").on('click',function(){
		  $("#baseCorporationForm").attr("data-validate-success","saveForm('continue')");
		  $("#baseCorporationForm").submit();
	  });
	  
		$('#companyName,#selectCompanyName').on('click', function() {
			var urlBody = "sys/org/orgnazation/queryListCompanyAndZb";
			var urlAll = serviceUrl + urlBody;
			var dataPost = {
				menuDelFlag : "0",
				menuStatus : "1",
				appId : $('#appId').val(),
			}
			$(document.body).data($(this).attr('id'), '');
			$(this).xljSingleSelector({
				title : '选择所属公司',//选择器标题，默认是'选择组织机构'
				selectorType : 'selectCompanyAndZb',//选择器类型，默认是组织机构选择器
				immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
				treeUrl : urlAll,
				treeParam : dataPost,//生成zTree树的参数
				targetId : 'companyId',//选择的数据的ID存储input域
				targetName : 'companyName',//选择的数据的Name存储input域
				ajaxType : 'POST', //ajax的type 默认为post
				formatTreeJson : function(data) {
					return data;
				},
				treeSettings : {
					data : {
						simpleData : {
							enable : true,
							idKey : 'id',
							pIdKey : 'parentId'
						}
					}
				}
			});
		});
	  
});
function pageInit(){
	//判断是否是编辑页面 如果是回显 不是略过
	getBaseRegionData();
	//$(".select2").select2();

	if(type=="add"){
		getuuid();
		addCount();
	}else{
		var id = $.xljUtils.getUrlParam('id'); 
		getConporationEcho(id);
	}
}
function  empty(){
	$("#companyId").val("");
	$("#companyName").val("");
}
/**
 * author:liuf
 * describe:新增的时候 自动的生成表单id
 * param: null
 */
function getuuid(){
	$.ajax({
		type:'get',
		url:serviceUrl+'sys/uuid/generator/getGuuid?time='+Math.random(),
		success: function(data) {
			if(data.success){
				var guuid=data.result;
				$("#baseCorporationForm").find("input[name='id']").val(guuid);
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	})
}

/**
 * author:liuf
 * describe:获取所有公司
 * param: null
 */
/*function  getCompanyId(){
	$.ajax({
        type:'post',
        url:serviceUrl+'sys/org/orgnazation/queryListCompany',
        dataType:'json',
        contentType:'application/json',
        data:"{}",
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var company=data.result;
        			 for(var o in company){
        				 $("#companyId").append("<option value='"+company[o].value+"'>"+company[o].name+"</option>")
        			 }
        		 }
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
	
}*/
/**
 * author:liuf
 * describe:获取省市区的所有数据
 * param: null
 */
function getBaseRegionData(){
	  $.ajax({
          type:'POST',
          url:serviceUrl+'sys/base/baseRegion/getBaseRegionData',
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
        				  $("#provinceId").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>")  
        			  }
        		  }
        		/*  	var region =  $("body").data()[data[0].id];
        			var region2 =  $("body").data()[region[0].id];
        			for(var i in region2){
        				 $("#cityId").append("<option value='"+region2[i].id+"'>"+region2[i].name+"</option>") ;
        			}*/
        	  }else{
        			pop_tip_open("red",json.msg);
        	  }
          },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        }
      });
	
}
/**
 * author:liuf
 * describe:编辑状态时表单数据回显
 * param: id
 */
function getConporationEcho(id){
	$.ajax({
        type:'get',
        url:serviceUrl+'sys/base/baseCorporation/get/'+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	var CorporationData=data.result;
        	console.log(CorporationData);
        		$("input[name='id']").val(CorporationData.id);// id
        		$("input[name='name']").val(CorporationData.name);//名称
        		$("input[name='code']").val(CorporationData.code);//编号
        		 $("#provinceId").val(CorporationData.provinceId);//省级数据
        		 //回显省级数据的 文本内容
        		 var provinceName = $("#provinceId  option:selected").text();
        		 $('span[id*="provinceId"]').attr("title",provinceName);
        		 $('span[id*="provinceId"]').text(provinceName);
        		 //根据省级id加载市级数据
        		 selectCityForm($("#provinceId")[0]);
        		$("input[name='representative']").val(CorporationData.representative);//法人代表
        		$("input[name='status'][value="+CorporationData.status+"]").attr("checked",true);//状态
        		 //回显所属公司的 文本内容
        		$("#companyId").val(CorporationData.companyId);	
        		if(CorporationData.companyName){
        			$("#companyName").val(CorporationData.companyName);
        			$("#companyName").attr("title",CorporationData.companyName);
        		}
        		if(CorporationData.companyId&&(!CorporationData.companyName)){
        			$.ajax({
        				type:'get',
        				url:serviceUrl+'sys/org/orgnazation/get/'+CorporationData.companyId+'?time='+Math.random(),
        				success: function(data) {
        					if(data.success){
        						var dataResult=data.result;
        						$("#companyName").val(dataResult.name);
        	        			$("#companyName").attr("title",dataResult.name);
        					}else{
        						pop_tip_open("red",data.msg);
        					}
        				},
        				error: function (jqXHR, textStatus, errorThrown) {
        					$.xljUtils.getError(jqXHR.status);
        		        }
        			})
        		}
        		//回显市区的 文本内容
        		$("#cityId").val(CorporationData.cityId);
        		 var cityName = $("#select[name='cityId'] option:selected").text();
        		 $('span[id*="cityId"]').attr("title",cityName);
        		 $('span[id*="cityId"]').text(cityName);
        		 
        		$("input[name='address']").val(CorporationData.address);//地址
        		$("textarea[name='remark']").html(CorporationData.remark);//说明
        		
        	/*	$("input[name='createPersonId']").val(CorporationData.createPersonId);//创建人
        		$("input[name='createPersonName']").val(CorporationData.createPersonName);//创人名字
        		$("input[name='updatePersonId']").val(CorporationData.updatePersonId);//修改人
        		$("input[name='updatePersonName']").val(CorporationData.updatePersonName);//修改人名字
        		$("input[name='disabledId']").val(CorporationData.disabledId);//禁用人
        		$("input[name='createDate']").val(CorporationData.createDate);//创建日期
        		$("input[name='updateDate']").val(CorporationData.updateDate);//修改日期
        		$("input[name='disabledDate']").val(CorporationData.disabledDate);//禁用日期
*/        		var CorporationAcount=CorporationData.list;//法人账户字表 list
        		if(CorporationAcount.length>0){
        			var countLengt=1;
        			for(var o in CorporationAcount){//循环创建form  回显数据
        				addCountList();
        				var  Acount=$("#countForm").find("tr").eq(countLengt);//序号
        				Acount.find("input[name='bankName']").val(CorporationAcount[o].bankName);//法人账户名称
        				Acount.find("input[name='bankCode']").val(CorporationAcount[o].bankCode);//法人账号代码
        				Acount.find("input[name='id']").val(CorporationAcount[o].id);//id
        				Acount.find("select[name='provinceId']").val(CorporationAcount[o].provinceId);//省
        				 selectCity($("select[name='provinceId']")[countLengt]);//根据省id加载市区的数据
        				 Acount.find("select[name='cityId']").val(CorporationAcount[o].cityId);//市
        				Acount.find("input[name='address']").val(CorporationAcount[o].address);//地址
        				Acount.find("select[name='isDefault']").val(CorporationAcount[o].isDefault);//是否默认
        				Acount.find("input[name='remark']").val(CorporationAcount[o].remark);//说明
        				Acount.find("input[name='concurrencyVersion']").val(CorporationAcount[o].concurrencyVersion);//版本号
        				countLengt++;//序号添加一个
        			}
        		}
        	}else{
        		pop_tip_open("red",data.msg);
        	}
        	},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        }
	});

}

/**
 * author:liuf
 * describe:回显状态时 自动的添加表格
 * param: null
 */
function addCountList(){
		 var row=$('<tr style="text-align: center">'
		 +'<td><input type="checkbox" name="check"></td>'
		 +'<td style="text-align:center"></td>'
		 +'<td>'
		 +'<div>'
		 +'<input type="text" data-html="true" name="bankName" class="form-control addInputWidth" placeholder="开户银行" data-maxlength="50" onblur="regData(this)">'
		 +'<input type="hidden" name="id" value="">'
		 +'</div>'
		 +'</td>'
		 +'<td>'
		 +'<div>'
		 +'<input type="text" data-html="true" name="bankCode" class="form-control addInputWidth" id="" placeholder="银行账号" data-maxlength="50" onblur="regData(this)" >'
		 +'</div>'
		 +'</td>'
		 +'<td>'
		 +'<div>'
		 +'<select  name="provinceId" class="form-control addInputWidth" onchange="selectCity(this)"><option value="-1" selected="selected">请选择</option>'
		 +'</select>'
		 +'</div>'
		 +'</td>'
		 +' <td>'
		 +'<div>'
		 +'<select   name="cityId" class="form-control addInputWidth"><option value="-1" selected="selected">请选择</option>'
		 +'</select>'
		 +'</div>'
		 +'</td>'
		 +'<td>'
		 +'<div>'
		 +'<input type="text" data-html="true" name="address" class="form-control addInputWidth" placeholder="银行地址" data-maxlength="200" onblur="regData(this)" >'
		 +'</div>'
		 +'</td>'
		 +'<td>'
		 +'<div>'
		 +'<select name="isDefault" class="form-control addInputWidth" onchange="changeDefault(this)"   style="width: 70px;">'
		 +'<option selected="selected" value="1">是</option>'
		 +'<option value="0">否</option>'
		 +'</select>'
		 +'</div>'
		 +'</td>'
		 +'<td>'
		 +'<div>'
		 +'<input type="text" data-html="true" class="form-control addInputWidth"  name="remark" placeholder="备注" data-maxlength="1000" onblur="regData(this)">'
		 +'<input type="hidden" class="form-control"  name="concurrencyVersion">'
		 +'</div>'
		 +'</td>'
		 +'</tr>');
	     $("#countForm").append(row);
	     resetNum();
		 loadProvince(row);
	
}
/**
 * author:liuf
 * describe:预设编号
 * param: null
 */
function   resetNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td").eq(1).html(i);
		}
	});
}
/**
 * author:liuf
 * describe:加载省级数据
 * param: row (省级数据id)
 */
function loadProvince(row){
	var region =  $("body").data()["_NA_"];
	var op=row.find("td").eq(4).find("div").find("select");
	for(var o in region){
	op.append("<option value='"+region[o].id+"'>"+region[o].name+"</option>") ;
	}
	selectCity(op);
}
/**
 * author:liuf
 * describe:子表加载市级数据
 * param: ele当前元素
 */
function selectCity(ele){
	var chird=  $(ele).parent().parent().next().find("select");
	chird.html("");
	//  $("#cityId").html("");
	 var region =  $("body").data()[$(ele).val()];
	 for(var i in region){
	/*	 if(region[i].label=="市辖区"||region[i].label=="县"){
			 var region2 =  $("body").data()[region[i].id];//从缓存数据中拿到数据集合
			 for(var i in region2){
				 chird.append("<option value='"+region2[i].id+"'>"+region2[i].label+"</option>") ;
			 }
			 return;
		 }*/
		 chird.append("<option value='"+region[i].id+"'>"+region[i].name+"</option>") ;
	 }
}
/**
 * author:liuf
 * describe:主表加载市级数据
 * param: null
 */
function selectCityForm(ele){
	var chird=  $(ele).parent().next().next().find("select");
	chird.html("");
	//  $("#cityId").html("");
	 var region =  $("body").data()[$(ele).val()];
	 for(var i in region){
	/*	 if(region[i].label=="市辖区"||region[i].label=="县"){
			 var region2 =  $("body").data()[region[i].id];
			 for(var i in region2){
				 chird.append("<option value='"+region2[i].id+"'>"+region2[i].label+"</option>") ;
			 }
			 return;
		 }*/
		 chird.append("<option value='"+region[i].id+"'>"+region[i].name+"</option>") ;
	 }
}
/**
 * author:liuf
 * describe:删除字表
 * param: null
 */
function delAcount(){
	if(type=="add"){
		var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
		checkedTrObjs.remove();
		resetNum();
	}else{
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
		resetNum();
	}
}
/**
 * author:liuf
 * describe:关闭页面 并刷新列表页面
 * param: null
 */
function closed(){
	window.close();
}
/**
 * author:liuf
 * describe:保存表单  
 * thinking: 1 保存法人分为 主表 和 子表  
 *           2 主表的直接的便利form转化成一个json数据格式的对象  
 *           3 新增时 对于子表 直接的便利循环countForm表单  组装成json数据格式的 list  作为主表对象的一个属性 传递后台对象
 *           4 修改时 对于子表 除了便利循环countForm表单之外  还要把删除的 回显数据 组装到list（伪删除） 一同传递到后台 
 *           5 对于 修改时的后台 拿旧的子表数据 跟新的数据数据 比较 如果存在update  如果不存在 save 
 * param: null
 */
function saveForm(op){
	if(!regInput){
		return;
	}
	var CorporationId=$("#baseCorporationForm").find("input[name='id']").val();
	//拼接子表
	$("#countForm").find("tr").each(function(i){
		if(i>0){
		var jsonDataArr =$(this).find(":input").serializeArray();
		var jsonData = {};
		jsonData.corporationId=CorporationId;
		jsonData.delflag=false;
		for(var j in jsonDataArr){
				jsonData[jsonDataArr[j].name]=jsonDataArr[j].value;
		}
		if(jsonData.bankName&&jsonData.bankCode){
			AcountdataList.push(jsonData);
		}
	
		}
	});
	//拼接主表
	var baseCorporationArr= $("#baseCorporationForm").serializeArray();
	var baseCorporationDto={};
		for(var i in baseCorporationArr){
		/*	if(baseCorporationArr[i].name=="registrationDate"||"createDate"==baseCorporationArr[i].name||"updateDate"==baseCorporationArr[i].name|| "disabledDate"==baseCorporationArr[i].name){
				baseCorporationDto[baseCorporationArr[i].name]=new Date().getTime();
			}else{*/
				baseCorporationDto[baseCorporationArr[i].name]=baseCorporationArr[i].value;
			/*}*/
		}
		//把list塞到对象里 作为一个属性  传递给后台
		  delete baseCorporationDto['_id'];
		  delete baseCorporationDto['_name'];
		baseCorporationDto.list=AcountdataList;
		baseCorporationDto.delflag=0;
		if(type=='add'){
			   $.ajax({
			       url:serviceUrl+"/sys/base/baseCorporation/save",
			       data:JSON.stringify(baseCorporationDto),
			       type:'POST',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData ) {
			           if(resultData) {
			               var successFlag = resultData.success;
			               if(successFlag) {
			                   if(op=="over"){
			                	   window.opener.reloadGrid(baseCorporationDto.id);
			                	   window.close();
			                   }else if(op=="continue"){
								   $.xljUtils.tip('green','保存成功！');
			                	   window.opener.reloadGrid(baseCorporationDto.id);
			                	   $("#baseCorporationForm")[0].reset();
			                	   $("#cityId").find("option").remove(); 
			                	   $("#countForm").find("tr").not("tr:first").remove();
			                	   addCount();
			                	   getuuid();
			                	   AcountdataList=[];
			                	   type="add";
			                   }
			               }else {
			            	   pop_tip_open("red",resultData.msg);
			               }
			           }
			       },
					error: function (jqXHR, textStatus, errorThrown) {
						$.xljUtils.getError(jqXHR.status);
			        }
			   });
		}else{
			$.ajax({
				url:serviceUrl+"/sys/base/baseCorporation/update/"+CorporationId,
				data:JSON.stringify(baseCorporationDto),
				type:'PUT',
				contentType:'application/json',
				dataType:'JSON',
				success:function (resultData){
					if(resultData.success){
						   if(op=="over"){
							   window.opener.reloadGrid(baseCorporationDto.id);
		                	   window.close();
		                   }else if(op=="continue"){
							   $.xljUtils.tip('green','保存成功！');
		                	   window.opener.reloadGrid(baseCorporationDto.id);
		                	   $("#baseCorporationForm")[0].reset();
		                	   $("#cityId").find("option").remove(); 
		                	   $("#countForm").find("tr").not("tr:first").remove();
		                	   addCount();
		                	   getuuid();
		                	   AcountdataList=[];
		                	   type="add";
		                   }
					}else{
						pop_tip_open("red",resultData.msg);
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
		        }
			});
		}
}

function regData(ele){
	var placeholder=$(ele).attr("placeholder");
	var specialKey ="#$%\\'\\\\^*\"\+[]【】{}";
	var inputval=$(ele).val();
	if((specialKey.indexOf(inputval)>-1&&(inputval!=""))||inputval.indexOf("'")>-1||inputval.indexOf("&gt;")>-1||inputval.indexOf("&lt;")>-1){
		pop_tip_open("blue",placeholder+"不允许输入特殊字符");
		regInput=false;
		$(ele).val("");
		return;
	}
	var dataLength=$(ele).val().length;
	var dataMaxLength=$(ele).attr("data-maxlength");
	if(parseInt(dataLength)>parseInt(dataMaxLength)){
		pop_tip_open("blue",placeholder+"输入超长,请重新输入");
		regInput=false;
		$(ele).val("");
		return;
	}else{
		regInput=true;
	}		
}

/**
 * author:liuf
 * describe:新增时自动的添加表格
 * param: null
 */
function addCount(){
	$.ajax({
        type:'get',
        url:serviceUrl+'sys/uuid/generator/getGuuid?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        		var guuid=data.result;
		 var row=$('<tr style="text-align: center">'
				 +'<td><input type="checkbox" ></td>'
				 +'<td style="text-align:center"></td>'
				 +'<td>'
				 +'<div>'
				 +'<input type="text" data-html="true" name="bankName" placeholder="开户银行" data-maxlength="50" onblur="regData(this)" class="form-control addInputWidth">'
				 +'<input type="hidden" name="id" value="'+guuid+'">'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div>'
				 +'<input type="text" data-html="true" name="bankCode" placeholder="银行账号" data-maxlength="50" onblur="regData(this)" class="form-control addInputWidth" >'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div >'
				 +'<select  name="provinceId" class="form-control addInputWidth" onchange="selectCity(this)">'
				 +'</select>'
				 +'</div>'
				 +'</td>'
				 +' <td>'
				 +'<div>'
				 +'<select   name="cityId" class="form-control addInputWidth">'
				 +'</select>'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div>'
				 +'<input type="text" data-html="true" name="address" placeholder="银行地址" data-maxlength="200" onblur="regData(this)" class="form-control addInputWidth"  >'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div>'
				 +'<select name="isDefault"class="form-control addInputWidth" onchange="changeDefault(this)"  style="width: 70px;">'
				 +'<option selected="selected" value="1">是</option>'
				 +'<option value="0">否</option>'
				 +'</select>'
				 +'</div>'
				 +'</td>'
				 +'<td>'
				 +'<div>'
				 +'<input type="text" data-html="true"class="form-control addInputWidth"  name="remark" placeholder="备注" data-maxlength="1000" onblur="regData(this)">'
				 +'</div>'
				 +'</td>'
				 +'</tr>');
	     $("#countForm").append(row);
		 resetNum();
		 loadProvince(row);
		 resetDeafault(row);
        	}else{
        		pop_tip_open("red",data.msg);
        	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
}
/**
 * author:liuf
 * describe:设置是否默认
 * param: ele(当前元素)
 */
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

/**
 * author:liuf
 * describe:设置初始状态第一个是默认选中  其他的都是否
 * param: ele(当前元素)
 */
function resetDeafault(row){
	if(row.find("td").eq(1).html()=="1"){
		return;
	}else{
		row.find("td").eq(7).find("select").val("0");
	}
}

