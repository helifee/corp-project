var AcountdataList =new Array(); //全局变量 子表list 
var type=$.xljUtils.getUrlParam('type');// type 添加页面add  修改页面edit
var companyId=$.xljUtils.getUrlParam('companyId');// 公司 添加页面add  修改页面edit
var modelcode=$.xljUtils.getUrlParam('modelcode');// 来源 添加页面add  修改页面edit
var ztofUrl= $.xljUtils.htmlDecode($.xljUtils.getUrlParam('ztofUrl'));// 来源 添加页面add  修改页面edit
var regInput=true;
var idForList="";
$(document).ready(function(){
	  $('.form_datetime').datetimepicker({
	        language:  'zh-CN',
	        format: 'yyyy-mm-dd hh:ii',
	        weekStart: 1,
	        todayBtn:  1,
	        autoclose: 1,
	        todayHighlight: 1,
	        startView: 2,
	        forceParse: 0,
	        showMeridian: 1
	    });
	  changeTitle();
	  pageInit();
	  $("#saveBtn").on('click',function(){
		  //saveForm('continue')
		  //saveForm('over')
		  $("#baseSupplierForm").attr("data-validate-success","saveForm('over')");
		  $("#baseSupplierForm").submit();
		 
	  });
	  
	  $("#saveAndCreateBtn").on('click',function(){
		  $("#baseSupplierForm").attr("data-validate-success","saveForm('continue')");
		  $("#baseSupplierForm").submit();
	  });
	  $('#myModal').on('hide.bs.modal', function () {
      	$('#myModal').find(".ztree-box").getNiceScroll().hide();
     	$('#myModal').find(".grid2").getNiceScroll().hide();
      });
		$('#companyName,#selectcompanyName').on('click', function() {
			$("#myModal").modal("show");
			$("#myModal .modal-dialog").height($(window).height()*0.8);
			$("#myModal .modal-dialog .ztree-box").height($("#myModal .modal-dialog").height()-130);
			$("#myModal .modal-dialog .tableStyle").height($("#myModal .modal-dialog").height()-105);
			var setting = {
					data: {
						simpleData: {
							enable: true,
							pIdKey: 'parentId'
						},
						key: {}
					},
					callback: {
						beforeClick: function (treeId, treeNode, clickFlag) {
							return true;//!treeNode.isParent;
						},
						onClick: appendDataToRight,
						onCollapse: function () {
							$.xljUtils.treeResizeFn();
						},
						onExpand: function () {
							$.xljUtils.treeResizeFn();
						}
					}

				};
			$.ajax({
				type: "post",
				url: serviceUrl + "sys/org/orgnazation/queryListCompanyAndZb",
				dataType: "json",
				data:"{}",
				contentType: 'application/json',
				success: function (typeNodes) {
					var zNodes = typeNodes.result;
					var inputVal=$("#corname").val();
					if(inputVal){
						var dataArr=new Array();
					  for(var o in zNodes){
						  if((zNodes[o].assName).indexOf(inputVal)>-1){
							  dataArr.push(zNodes[o]);
						  }
					  }
						zNodes=	dataArr;
					}
					recursionArray(zNodes);
					var treeObj = $.fn.zTree.init($("#_zTree"), setting, zNodes);
					treeObj.expandAll(true);
					//默认加载第一个菜单的列表数据
					/*		var nodesId=idForList.split(",");
					
				for(var o in nodesId){
						for(var j in zNodes){
							if(zNodes[j].id==nodesId[o]){
								var row=$("<tr style='text-align:center'>" +
										"<td style='width:20%;'></td>" +
										"<td  style='display:none'>"+zNodes[j].id+"</td>" +
										"<td style='width:80%;'>"+$.xljUtils.htmlEncode(zNodes[j].name)+"</td>" +
										"</tr>");
									row.on("dblclick",function(){
									$(this).remove();
									idForList=idForList.replace(zNodes[j].id,"");
									});
								$("#resultcompanyList").append(row);
								resetModelNum();
							}
						}
					}*/
					$.xljUtils.addTreeScroll('ztree-box');
					$.xljUtils.treeResizeFn();
				},
				complete:function(){
				
				}
			});
		});
    });
/*function selectorCallback(data,ele){
	console.info(data);
}*/
function appendDataToRight(e,treeId,treeNode){
	var row=$("<tr style='text-align:center'>" +
			"<td style='width:20%;'></td>" +
			"<td  style='display:none'>"+treeNode.id+"</td>" +
			"<td style='width:80%;'>"+$.xljUtils.htmlEncode(treeNode.name)+"</td>" +
			"</tr>");
	row.on("dblclick",function(){
		$(this).remove();
		idForList=idForList.replace(treeNode.id,"");
		$.xljUtils.treeResizeFn("grid2");
	});
	if(idForList.indexOf(treeNode.id)<0){
		$("#resultcompanyList").append(row);
		idForList+=treeNode.id;
	}
	resetModelNum();
	$.xljUtils.addGridScroll("grid2");
	$.xljUtils.treeResizeFn("grid2");
}
function recursionArray(arr) {
    for(var i in arr) {
    	arr[i].iconSkin = "diy-company";
    	arr[i].name=$.xljUtils.htmlDecode(arr[i].name);
    }
};
function  resetModelNum(){
	$("#resultcompanyList").find("tr").each(function(i){
		if(i>-1){
			$(this).find("td").eq(0).html(i+1);
		}
	});
}
function saveCompanyIds(){
	var idlist='';
	var nameList='';
	$("#resultcompanyList").find("tr").each(function(i){
		idlist+=$(this).find("td").eq(1).html()+",";
		nameList+=$(this).find("td").eq(2).html()+",";
	})
	$("#companyId").val(idlist.substring(0,idlist.length-1));
	$("#companyName").val(nameList.substring(0,nameList.length-1));
	$("#myModal").modal("hide");
}
function changeTitle(){
	   if(modelcode){
			$("input[name='supplierResoure']").val(modelcode);	
			$("#saveAndCreateBtn").hide();
	    }
	  if(type=="add"){
		  $("#supplierTitle").html("供方档案-新增");
		   document.title="供方档案-新增";
		   if(companyId){
			   $("input[name='companyId']").val(companyId);
				$.ajax({
			        type:'get',
			        url:serviceUrl+'sys/org/orgnazation/get/'+companyId+'?time='+Math.random(),
			        success: function(data) {
			        	if(data.success){
			        		 if(data.result){	
			        			 $("#companyName").val(data.result.name);
			               	    $("#companyName").attr("title",data.result.name);	 
			        		 }
			        	}else{
			        		pop_tip_open("red",data.msg);
			        	}
			     },
					error: function (jqXHR, textStatus, errorThrown) {
						$.xljUtils.getError(jqXHR.status);
			        }
				})
		   }
		
		 // $(".removetr").hide();
	  }else{
		  $("#supplierTitle").html("供方档案-修改");
		   document.title="供方档案-修改";
		//  $(".removetr").show();
	  }
}
function pageInit(){
	getBaseRegionData();// 加载三级联动数据
	/*$("#personName1"). xljMultipleSelector({
		selectorType:'org',
		
	});*/

	//getcompany();// 加载所属公司数据
	if(type=="add"){ // 添加页面时 请求后台绑定一条id 自动添加一条子表
		getuuid();
	   addCount();
	   getAppSystem("");//加载供方系统数据
	}else{
		var id = $.xljUtils.getUrlParam('id'); //编辑页面回显一条数据
		getBaseSupplierEcho(id);
	}
/*	$("#companyId").multiselect({
		selectedList: 6
	});*/
/*	$("#companyId_ms").width("100%");*/
}
/**
 * author:liuf
 * describe: 编辑时回显数据
 * param: id
 */
function getBaseSupplierEcho(id){
	$.ajax({
        type:'get',
        url:serviceUrl+'sys/base/baseSupplier/get/'+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        	var SupplierData=data.result;
        		$("input[name='id']").val(SupplierData.id);
        		$("input[name='name']").val(SupplierData.name);
        		$("input[name='code']").val(SupplierData.code);
        		 $("select[name='provinceId']").val(SupplierData.provinceId);
        		 var provinceName = $("#provinceId  option:selected").text();
        		 $('span[id*="provinceId"]').attr("title",provinceName);
        		 $('span[id*="provinceId"]').text(provinceName);
        		 selectCityForm($("#provinceId")[0]);
        		$("input[name='relationPerson']").val(SupplierData.relationPerson);
        		$("input[name='representative']").val(SupplierData.representative);
        		$("input[name='registrationDate']").val(SupplierData.registrationDate);
        		$("input[name='financeCode']").val(SupplierData.financeCode);
        		$("input[name='status'][value="+SupplierData.status+"]").attr("checked",true);//状态
        	   //  var supplierAppData=(SupplierData.supplierApp).split(",");
        	  //  var appData=
        	     getAppSystem(SupplierData.supplierApp);//加载供方系统数据
        	    // $(":checkbox[name='supplierApp']").val(supplierAppData);
        	/*    for(var o in supplierAppData){
        	    	$("input[name='supplierApp']").each(function(){
        	    		if($(this).val()==supplierAppData[o]){
        	    			$(this).attr("checked",true);
        	    		}
        	    	})
        	    }*/
        	    $("input[name='companyId']").val(SupplierData.companyId);
        	    $("#companyName").val(SupplierData.companyName);
    /*    	    $("#companyName").attr("title",SupplierData.companyName);*/
        	/*	var companyArray=SupplierData.companyId.split(",")
        		var companyName=[];
        		for(var o in companyArray){
        			$("ul").find("input[name='multiselect_companyId']").each(function(){
        				if($(this).val()==companyArray[o]){
        					companyName.push($(this).next().text());
        					this.checked = true;
        				}
        			})
        		}*/
        		$("#cityId").val(SupplierData.cityId);
        		 var cityName = $("#select[name='cityId'] option:selected").text();
        		 $('span[id*="cityId"]').attr("title",cityName);
        		 $('span[id*="cityId"]').text(cityName);
        		
        		$("input[name='phone']").val(SupplierData.phone);
        		$("input[name='license']").val(SupplierData.license);
        		$("input[name='workPhone']").val(SupplierData.workPhone);
        		$("input[name='supplierResoure']").val(SupplierData.supplierResoure);
        		$("input[name='address']").val(SupplierData.address);
        		$("textarea[name='remark']").html(SupplierData.remark);
        	
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
        				selectCity($("select[name='provinceId']")[countLengt]);
        				Acount.find("select[name='cityId']").val(SupplierAcount[o].cityId);
        				
        				Acount.find("input[name='address']").val(SupplierAcount[o].address);
        				Acount.find("select[name='isDefault']").val(SupplierAcount[o].isDefault);
        				Acount.find("input[name='remark']").val(SupplierAcount[o].remark);
        				Acount.find("input[name='concurrencyVersion']").val(SupplierAcount[o].concurrencyVersion);
        				countLengt++;
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
 * describe: 新增时 请求后台绑定id
 * param: null
 */
function getuuid(){
	$.ajax({
        type:'get',
        url:serviceUrl+'sys/uuid/generator/getGuuid?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        		var guuid=data.result;
        		$("#baseSupplierForm").find("input[name='id']").val(guuid);
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	})
};
/**
 * author:liuf
 * describe: 请求所有的供方系统数据
 * param: null
 */
function getAppSystem(supplierAppData){
	   $.ajax({
	        type:'post',
	        url:serviceUrl+'sys/res/appSystem/queryListToSupplier',
	        contentType:'application/json',
	        data:"{}",
	        success: function(data) {
	        	if(data.success){
	        		var sysapp=data.result;
	        		for(var o in sysapp){
	        			if(sysapp[o]){
	        				if(supplierAppData.indexOf(sysapp[o].id)>-1){
	        					$("#systemCheck").append("<input type='checkbox' checked='checked'  name='supplierApp' value="+sysapp[o].id+">"+sysapp[o].name);
	        					$("#systemCheck").append("&nbsp;&nbsp;&nbsp;&nbsp;");
	        				}else{
	        					$("#systemCheck").append("<input type='checkbox' name='supplierApp' value="+sysapp[o].id+">"+sysapp[o].name);
	        					$("#systemCheck").append("&nbsp;&nbsp;&nbsp;&nbsp;");
	        				}
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
 * describe: 获取所有的所属公司数据
 * param: null
 */
/*function getcompany(){
	$.ajax({
        type:'post',
        url:serviceUrl+'sys/org/orgnazation/queryListCompany',
        dataType:'json',
        async:false,
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
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	})
}*/
/**
 * author:liuf
 * describe: 获取三级联动数据
 * param: null
 */
function  getBaseRegionData(){
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
        				  $("#provinceId").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>")  
        			  }
        		  }
        		 /* 	var region =  $("body").data()[data[0].id];
        			var region2 =  $("body").data()[region[0].id];
        			for(var i in region2){
        				 $("#cityId").append("<option value='"+region2[i].id+"'>"+region2[i].label+"</option>") ;
        			}*/
        		
        		  
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
 * describe: 子表从缓存数据中回显市区的数据
 * param: ele(当前元素)
 */
function selectCity(ele){
	var chird=  $(ele).parent().parent().next().find("select");
	chird.html("");
	//  $("#cityId").html("");
	 var region =  $("body").data()[$(ele).val()];
	 for(var i in region){
	/*	 if(region[i].label=="市辖区"||region[i].label=="县"){
			 var region2 =  $("body").data()[region[i].id];
			 for(var i in region2){
				 chird.append("<option value='"+region2[i].id+"'>"+region2[i].name+"</option>") ;
			 }
			 return;
		 }*/
		 chird.append("<option value='"+region[i].id+"'>"+region[i].name+"</option>") ;
	 }
}

  /**
   * author:liuf
   * describe: 主表从缓存数据中回显市区的数据
   * param:  ele(当前元素)
   */
function selectCityForm(ele){
	var chird=  $(ele).parent().next().next().find("select");
	chird.html("");
	//  $("#cityId").html("");
	var region =  $("body").data()[$(ele).val()];
	for(var i in region){
	/*	if(region[i].label=="市辖区"||region[i].label=="县"){
			var region2 =  $("body").data()[region[i].id];
			for(var i in region2){
				chird.append("<option value='"+region2[i].id+"'>"+region2[i].name+"</option>") ;
			}
			return;
		}*/
		chird.append("<option value='"+region[i].id+"'>"+region[i].name+"</option>") ;
	}
}
  /**
   * author:liuf
   * describe: 保存数据
   *  thinking: 1 保存法人分为 主表 和 子表  
   *            2 主表的直接的便利form转化成一个json数据格式的对象  
   *            3 新增时 对于子表 直接的便利循环countForm表单  组装成json数据格式的 list  作为主表对象的一个属性 传递后台对象
   *            4 修改时 对于子表 除了便利循环countForm表单之外  还要把删除的 回显数据 组装到list（伪删除） 一同传递到后台 
   *            5 对于 修改时的后台 拿旧的子表数据 跟新的数据数据 比较 如果存在update  如果不存在 save 
   * param:  op("over"保存  "continue" 保存并继续)
   */
function saveForm(op){
	if(!regInput){
		return;
	}
	var supplierId=$("#baseSupplierForm").find("input[name='id']").val();
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
			AcountdataList.push(jsonData);
		}
		}
	});
	var baseSupplierArr= $("#baseSupplierForm").serializeArray();
	var baseSupplierDto={};
		for(var i in baseSupplierArr){
			if("createDate"==baseSupplierArr[i].name||"updateDate"==baseSupplierArr[i].name|| "disabledDate"==baseSupplierArr[i].name){
				baseSupplierDto[baseSupplierArr[i].name]=new Date().getTime();
			}else if(baseSupplierArr[i].name=="registrationDate"){
				baseSupplierDto[baseSupplierArr[i].name]=new Date(Date.parse(baseSupplierArr[i].value.replace(/-/g,  "/"))).getTime();
			}else{
				baseSupplierDto[baseSupplierArr[i].name]=baseSupplierArr[i].value;
			}
		}
		 var chk_value ="";   
		  $("input[name='supplierApp']:checked").each(function(){    
				   chk_value+=$(this).val();    
				   chk_value+=",";    
		});    
		  delete baseSupplierDto['_orgPrefixIds'];
		  delete baseSupplierDto['_orgPrefixNames'];
		  delete baseSupplierDto['_orgNames'];
		  delete baseSupplierDto['_orgIds'];
		  delete baseSupplierDto['companyName'];
		baseSupplierDto.supplierApp=chk_value;
		baseSupplierDto.list=AcountdataList;
		baseSupplierDto.delflag=0;
		if(type=="add"){
			baseSupplierDto.messageType=0;
			   $.ajax({
			       url:serviceUrl+"sys/base/baseSupplier/save?time="+Math.random(),
			       data:JSON.stringify(baseSupplierDto),
			       type:'POST',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData ) {
			           if(resultData) {
			               var successFlag = resultData.success;
			               var result = resultData.result;
			               var msg = resultData.msg;
			               if(successFlag) {
			                   if(op=="over"){
			                	    if(!modelcode){
			                	    	window.opener.reloadGrid(supplierId);
			                	    }
			                	    window.close();
			                   }else if(op=="continue"){
								   $.xljUtils.tip('green','保存成功！');
			                	   window.opener.reloadGrid(supplierId);
			                	   $("#baseSupplierForm")[0].reset();
			                	   $("#companyId").val("");
			                	   $("#cityId").find("option").remove(); 
			                	   $("#countForm").find("tr").not("tr:first").remove();
			                	   addCount();
			                	   getuuid();
			                	   AcountdataList=[];
			                	   type="add";
			                   }
			               }else {
							   if(resultData.code=='50001'){
								   $.xljUtils.tip('blue',resultData.msg);
							   }else{
								   $.xljUtils.tip("red",resultData.msg);
							   }
			               }
			           }
			       },
					error: function (jqXHR, textStatus, errorThrown) {
						$.xljUtils.getError(jqXHR.status);
						
			        },
			        complete:function(){
			      /*  	$("#companyId_ms").width("100%");*/
			        }
			   });
		}else{
			var supplierId=$("#baseSupplierForm").find("input[name='id']").val();
			$.ajax({
			       url:serviceUrl+"sys/base/baseSupplier/update/"+supplierId,
			       data:JSON.stringify(baseSupplierDto),
			       type:'PUT',
			       contentType:'application/json',
			       dataType:'JSON',
			       success:function (resultData){
			    	    if(resultData.success){
			    	        if(op=="over"){
			    	        	   if(!modelcode){
			                	    	window.opener.reloadGrid(supplierId);
										window.close();
			                	    }else{
			                	    	autoIFrame(JSON.stringify(AcountdataList));
										setTimeout('iframclose()','1000');
			                	    }
			                	  
			                   }else if(op=="continue"){
								   $.xljUtils.tip('green','保存成功！');
			                	   window.opener.reloadGrid(supplierId);
			                	   $("#baseSupplierForm")[0].reset();
			                	   $("#companyId").val("");
			                	   $("#cityId").find("option").remove(); 
			                	   $("#countForm").find("tr").not("tr:first").remove();
			                	   addCount();
			                	   getuuid();
			                	   AcountdataList=[];
			                	   type="add";
			                	   changeTitle();
			                   }
			    	    }else{
			    	    	if(resultData.code=='50001'){
									$.xljUtils.tip('blue',resultData.msg);
							}else{
								$.xljUtils.tip("red",resultData.msg);
							}

			    	    }
			       },
					error: function (jqXHR, textStatus, errorThrown) {
						$.xljUtils.getError(jqXHR.status);
			        },
			        complete:function(){
			        /*	$("#companyId_ms").width("100%");*/
			        }
			   });
		}

	
}

function autoIFrame(dataJson){
	var supper_iframe = document.getElementById("supper_iframe");
	var agentUrl =(ztofUrl==null?'http://192.168.3.62:100/ex/page/ztofproxy.html':ztofUrl);
	supper_iframe.src = agentUrl + "?random="+Date.now()+"#" + dataJson;
}

function iframclose(){
	window.close();
}

/**
 * author:liuf
 * describe: 子表新增时 添加行元素
 * param:  null
 */
function addCount(){
	$.ajax({
        type:'get',
        url:serviceUrl+'sys/uuid/generator/getGuuid?time='+Math.random(),
        success: function(data) {
        	if(data.success){
         var guuid=data.result;
         var row=$('<tr>'
         +'<td><input type="checkbox" name="check" ></td>'
         +'<td style="text-align:center"></td>'
         +'<td><div><input type="text" data-html="true" name="bankName"  class="form-control addInputWidth" placeholder="开户银行" data-maxlength="50" onblur="regData(this)" ><input type="hidden" name="id" value="'+guuid+'"></div></td>'
         +'<td><div><input type="text" data-html="true" name="bankCode"  class="form-control addInputWidth" placeholder="银行账号" data-maxlength="50" onblur="regData(this)"></div></td>'
         +'<td>'
         +'<div><select name="provinceId"  onchange="selectCity(this)" class="form-control addInputWidth"><option value="-1" selected="selected">请选择</option>'
         +'</select></div>'
         +'</td>'
         +'<td>'
         +'<div><select  name="cityId" class="form-control addInputWidth"> <option value="-1" selected="selected">请选择</option>'
         +'</select></div>'
         +'</td>'
         +'<td>'
         +'<div><input type="text" data-html="true" name="address" class="form-control addInputWidth" placeholder="银行地址" data-maxlength="200" onblur="regData(this)" ><div>'
         +'</td>'
         +'<td>'
         +'<div><select name="isDefault" onchange="changeDefault(this)" class="form-control addInputWidth">'
         +'<option selected="selected"  value="1">是</option>'
         +'<option  value="0">否</option>'
         +'</select></div>'
         +'</td>'
         +'<td>'
         +'<div><input type="text" data-html="true"  name="remark" class="form-control addInputWidth" placeholder="备注" data-maxlength="1000" onblur="regData(this)"></div>'
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
 * describe: 选择省级数据
 * param:  ele(当前元素)
 */
function loadProvince(row){
	var region =  $("body").data()["_NA_"];
	var op=row.find("td").eq(4).find("select");
	for(var o in region){
	op.append("<option value='"+region[o].id+"'>"+region[o].name+"</option>") ;
	}
	selectCity(op);
}
/**
 * author:liuf
 * describe: 重设编号
 * param:  null
 */
function  resetNum(){
	$("#countForm").find("tr").each(function(i){
		if(i>0){
			$(this).find("td").eq(1).html(i);
		}
	});
}
/**
 * author:liuf
 * describe:删除子表
 * param: 
 */
function delAcount(){
	if(type=="add"){
		var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
		checkedTrObjs.remove();
		resetNum();
	}else{
		var checkedTrObjs = $("input[name='check']:checked").parent("td").parent("tr");
		for(var o=0;o<checkedTrObjs.length;o++){
			var delDatas =	$(checkedTrObjs[o]).find(":input").serializeArray();
			var jsonData = {};
			for(var i in delDatas){
				jsonData[delDatas[i].name]=delDatas[i].value;
			}
			jsonData.supplierId=$("#baseSupplierForm").find("input[name='id']").val();
			jsonData.delflag=1;
			AcountdataList.push(jsonData);
		}
		checkedTrObjs.remove();
		resetNum();
	}
	
}
function empty(){
	$("input[id='companyId']").val("");
	$("input[id='companyName']").val("");
}

/**
 * author:liuf
 * describe: 所有的子表有且只有一个默认账号
 * param:  ele(当前元素)
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
 * describe: 新增时 默认第一行是默认 是
 * param:  ele(当前元素)
 */
function resetDeafault(row){
		if(row.find("td").eq(1).html()=="1"){
			return;
		}else{
			row.find("td").eq(7).find("select").val("0");
		}
	}
/**
 * author:liuf
 * describe: 修改时 添加子表页面
 * param: null
 */
function addCountList(){
	 var row=$('<tr>'
	    +'<td><input type="checkbox" name="check"></td>'
		+'<td style="text-align:center"></td>'
		+'<td><div><input type="text" data-html="true" class="form-control addInputWidth" name="bankName" placeholder="开户银行" data-maxlength="50" onblur="regData(this)" ><input type="hidden" name="id" value=""></div></td>'
		+'<td><div><input type="text" data-html="true" class="form-control addInputWidth" name="bankCode"  placeholder="银行账号" data-maxlength="50" onblur="regData(this)"></div></td>'
		+'<td><div><select name="provinceId"  class="form-control addInputWidth "onchange="selectCity(this)"><option value="-1">请选择</option></select></div></td>'
		+'<td><div><select name="cityId" class="form-control addInputWidth"></select></div></td>'
		+'<td><div><input type="text" data-html="true" class="form-control addInputWidth" name="address"  placeholder="银行地址" data-maxlength="200" onblur="regData(this)"></div></td>'
		+'<td><div><select name="isDefault" onchange="changeDefault(this)"  class="form-control addInputWidth">'
		+'<option selected="selected" value="1">是</option><option value="0">否</option></select></div></td>'
       +'<td><div><input type="text" data-html="true" class="form-control addInputWidth" name="remark"  placeholder="备注" data-maxlength="1000" onblur="regData(this)"><input type="hidden" class="form-control" name="concurrencyVersion"></div></td>'
		+'</tr>');
    $("#countForm").append(row);
      resetNum();
	 loadProvince(row);

}
/**
 * author:liuf
 * describe: 关闭页面
 * param:  ele(当前元素)
 */
function closed(){
	   window.close();
}
function regData(ele){
	var placeholder=$(ele).attr("placeholder");
	var specialKey ="#$%\\'\\\\^*\"\+[]【】{}";
	var inputval=$(ele).val();
	if((specialKey.indexOf(inputval)>-1&&(inputval!=""))||inputval.indexOf("'")>-1||inputval.indexOf("&gt;")>-1||inputval.indexOf("&lt;")>-1){
		pop_tip_open("blue",placeholder+"不允许输入特殊字符");
		$(ele).val("");
		regInput=false;
		return;
	}
	var dataLength=$(ele).val().length;
	var dataMaxLength=$(ele).attr("data-maxlength");
	if(parseInt(dataLength)>parseInt(dataMaxLength)){
		pop_tip_open("blue",placeholder+"输入超长,请重新输入");
		$(ele).val("");
		regInput=false;
		return;
	}else{
		regInput=true;
	}		
}
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}