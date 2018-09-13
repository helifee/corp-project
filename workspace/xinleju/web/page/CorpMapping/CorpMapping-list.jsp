<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css"
	rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css"
	href="js/jquery-easyui-1.4.1/themes/icon.css" />
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script language="javascript" type="text/javascript"
	src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/TemplateWindow.js"></script>
<script type="text/javascript" src="page/CorpMapping/CorpMapping-list.js?time=New Date()"></script>
<script>
	var contextPath = '${pageContext.request.contextPath}';
	if (contextPath.length == 1) {
		contextPath = '';
	}
	
	var spanEl = "";
	$(function(){
		var h = $("#center").height();
	    var w = $("#center").width();
	    
	    //alert($("#center").height());
	    $("#h1").height(h-35);
	    $("#t1").height(h-35);
	    var sysid=$('#ownerSys').combobox('getValue');
		if(sysid == '销售系统'){
			sysid = 1;
		}
		spanEl = document.getElementsByTagName("span");
		if(sysid != 1){
			for (var i = 0; i < spanEl.length; i++) {
		    	if(spanEl[i].innerHTML == '代收类型科目对照'){
		    		$(spanEl[i].parentNode).hide();
		    	}
		    }
		}else{
			for (var i = 0; i < spanEl.length; i++) {
		    	if(spanEl[i].innerHTML == '代收类型科目对照'){
		    		$(spanEl[i].parentNode).show();
		    	}
		    }  
		}
	    //根据选择的业对应的系统获取对应的配置数据
	   $('#ownerSys').combobox({
		    onChange:function(newValue,oldValue){
		    	var ownerSys = '';
		    	if(newValue == '销售系统'){
		    		ownerSys = 1;
		    	}else{
		    		ownerSys = newValue;
		    	}
		    	//给科目管理和辅助核算的账套赋值
				var tab = $('#tt').tabs('getSelected');
				var index = $('#tt').tabs('getTabIndex',tab);
		    	if(ownerSys != 1){
		    		for (var i = 0; i < spanEl.length; i++) {
				    	if(spanEl[i].innerHTML == '代收类型科目对照'){
				    		$(spanEl[i].parentNode).hide();
				    	}
				    }
		    		if(index == 6){
		    			index = 0;
		    		}
				}else{
					for (var i = 0; i < spanEl.length; i++) {
				    	if(spanEl[i].innerHTML == '代收类型科目对照'){
				    		$(spanEl[i].parentNode).show();
				    	}
				    } 
				}
		    	if(ownerSys != 2){
					for (var i = 0; i < spanEl.length; i++) {
				    	if(spanEl[i].innerHTML == '成本控制科目对照' || spanEl[i].innerHTML == '成本款项类型对照' || spanEl[i].innerHTML == '成本控制科目对照(投入)'){
				    		$(spanEl[i].parentNode).hide();
				    	}
				    } 
					if(index == 7 || index == 8 || index == 9){
		    			index = 0;
		    		}
				}else{
					for (var i = 0; i < spanEl.length; i++) {
				    	if(spanEl[i].innerHTML == '成本控制科目对照' || spanEl[i].innerHTML == '成本款项类型对照' || spanEl[i].innerHTML == '成本控制科目对照(投入)'){
				    		$(spanEl[i].parentNode).show();
				    	}
				    }  
				}
		    	if(ownerSys ==3){
                    for (var i = 0; i < spanEl.length; i++) {
                        if(spanEl[i].innerHTML == '银行科目对照'){
                            $(spanEl[i].parentNode).hide();
                        }
                    } 
                    if(index == 5){
                        index = 0;
                    }
                }else{
                    for (var i = 0; i < spanEl.length; i++) {
                        if(spanEl[i].innerHTML == '银行科目对照'){
                            $(spanEl[i].parentNode).show();
                        }
                    }  
                }
		    	
		    	$('#tt').tabs('select',index);
	            if(index == 0){
	            	$("#t1").attr("src","FiAccountSetData!list.do?accountSetId="+accountSetId+"&sysId="+ownerSys+"&companyCode="+company_code);
	            }
	            if(index == 1){
	            	$("#t2").attr("src","FiAccountSubject!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
	            }
	            if(index == 2){
	            	$("#t6").attr("src","FiCashFlowCase!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
	            }
	            if(index == 3){
	            	$("#t5").attr("src","FiBudgetCap!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
	            }
	            if(index == 4){
	            	$("#t3").attr("src","FiAssMapping!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
	            }
	            if(index == 10){
	            	$("#t4").attr("src","FiVoucherTempType!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
	            }
	            if(index == 5){
	            	$("#t7").attr("src","FiBankCap!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
	            }
	            if(index == 6){
	            	$("#t8").attr("src","FiCollectionTypeCap!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
	            }
	            if(index == 7){
	            	$("#t9").attr("src","FiCoCap!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
	            }
	            if(index == 8){
                    $("#t11").attr("src","FiCoCapInput!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
                }
	            if(index == 9){
                    $("#t10").attr("src","FiPaymentType!list.do?accountSetCode="+accountSetCode+"&sysId="+ownerSys+"&accountSetId="+accountSetId+"&companyCode="+company_code);
                }
		    } 
	    }); 
	   
	});
</script>
</head>
<body>
	<div class="easyui-layout" data-options="border:false,fit:true">
		<div id="fs" data-options="region:'west',split:true,title:'财务系统公司'" style="width:338px;padding:5px;background:#eee;">
			<div id="grid_tb">
				<a class="easyui-linkbutton" iconCls="icon-add" plain="true"
					onclick="javascript:newAccountset();" class="t_more">新增</a><!--  <a
					class="easyui-linkbutton" iconCls="icon-edit" plain="true"
					onclick="javascript:editAccountset();" class="t_more">编辑</a> --> <a
					class="easyui-linkbutton" iconCls="icon-remove" plain="true"
					onclick="javascript:deleteAccountSet();" class="t_more">删除</a>
				<a class="easyui-linkbutton"  plain="true" 
					onclick="javascript:exportAccountSet();" class="t_more">导出</a>
				<a class="easyui-linkbutton"  plain="true" 
					onclick="javascript:importAccountSet();" class="t_more">导入</a>
			</div>

			<div class="t_title_input">
				财务系统名称： <select id="fiSysId" class="easyui-combobox"
					style="width:120px;">
					<s:iterator value="#request.fss" var="fs">
							<option value="${fs.id }">${fs.fiSysName }</option>
					</s:iterator>
				</select>
				<a href="#" title="查询" onclick="query();"><img src="images/icon_search.png" width="20" height="20" align="bottom"/> </a>
			</div> 
			<!-- <div id="partyTree" style="height:350px;overflow-y:auto;"></div> -->
			<div id="gridCorp"></div>
		</div>
		<div id="center" data-options="region:'center'" style="background: #fafafa;/*overflow: hidden;*/">
		    <div id="sys" data-options="region:'west',split:true,title:'财务系统公司'" style="padding:5px;background:#eee;">
				<select class="easyui-combobox" id="ownerSys" name="ownerSys"
					style="width:120px;">
					<option value="销售系统" selected="selected">销售系统</option>
					<option value="2">成本系统</option>
					<option value="3">费用系统</option>
				</select>
			</div>
		    <div id="tt" class="easyui-tabs" data-options="onSelect:tabOnSelect">   
			    <div id="h1" class="tab_" title="公司对照" data-options="fit:true" url="FiAccountSetData!list.do?accountSetId="  frameId="t1" >   
					<iframe id="t1" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0" ></iframe>
				</div>
				<div id="h2" class="tab_" title="会计科目同步" data-options="fit:true" url="FiAccountSubject!list.do?accountSetId=" frameId="t2">
					<iframe id="t2"  frameborder="0" height="100%" width="100%"  frameborder="0"></iframe>
				</div>
				<div id="h6" class="tab_" title="现金流量项目" data-options="fit:true" url="FiCashFlowCase!list.do?accountSetId=" frameId="t6">
					<iframe id="t6"  frameborder="0" height="100%" width="100%"  frameborder="0"></iframe>
				</div>
				<div id="h5" class="tab_" title="预算科目对照" data-options="fit:true" url="FiBudgetCap!list.do?accountSetId=" frameId="t5" >
					<iframe id="t5" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0"></iframe>
				</div>
				<div id="h3" class="tab_" title="辅助核算对照" data-options="fit:true" url="FiAssMapping!list.do?accountSetId="  frameId="t3">
					<iframe id="t3" frameborder="0" height="100%" width="100%" frameborder="0"></iframe>
				</div>
				<div id="h7" class="tab_" title="银行科目对照" data-options="fit:true" url="FiBankCap!list.do?accountSetId=" frameId="t7" >
					<iframe id="t7" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0"></iframe>
				</div>
				<div id="h8" class="tab_" title="代收类型科目对照" data-options="fit:true" url="FiCollectionTypeCap!list.do?accountSetId=" frameId="t8" >
					<iframe id="t8" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0"></iframe>
				</div>
				<div id="h9" class="tab_" title="成本控制科目对照" data-options="fit:true" url="FiCoCap!list.do?accountSetId=" frameId="t9" >
					<iframe id="t9" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0"></iframe>
				</div>
				<div id="h11" class="tab_" title="成本控制科目对照(投入)" data-options="fit:true" url="FiCoCapInput!list.do?accountSetId=" frameId="t11" >
                    <iframe id="t11" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0"></iframe>
                </div>
				<div id="h10" class="tab_" title="成本款项类型对照" data-options="fit:true" url="FiPaymentType!list.do?accountSetId=" frameId="t10" >
                    <iframe id="t10" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0"></iframe>
                </div>
				<div id="h4" class="tab_" title="凭证模板设置" data-options="fit:true" url="FiVoucherTempType!list.do?accountSetId=" frameId="t4">
					<iframe id="t4" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0"></iframe>
				</div>
			</div>
		</div>
	</div>
	<div id="newDialog"></div>
	<div id="editDialog" class="easyui-dialog" data-options="
		title:'编辑',
		resizable:true,
		closed:true,
		buttons:[{
				text:'保存',
				handler:save,
				plain:true,
				iconCls:'icon-save'
			},{
				text:'关闭',
				plain:true,
				iconCls:'icon-cancel',
				handler:function(){
					$('#editDialog').dialog('close');
				}
			}]
	">
	<s:form id="frm2" method="post">
		<s:token/>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%"  border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01"  >
							  <tr align = center>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>账套名称:
								</td>
								<td width="29%" align="left"  >
								<s:textfield id="fiAccountSet.name" name="fiAccountSet.name" cssClass="easyui-validatebox" data-options="required:true,validType:'length[0,20]'" ></s:textfield>  
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>账套编码:
								</td>
								<td width="29%" align="left" >
									<s:textfield name="fiAccountSet.code"  cssClass="easyui-validatebox" data-options="required:true"  cssStyle="width:98%"></s:textfield>									
								</td>
							</tr>			  
							<tr>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>公司名称:
								</td>
								<td width="29%">
									<s:textfield name="fiAccountSet.companyName"  cssClass="easyui-validatebox" data-options="required:true"  cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>公司编码:
								</td>
								<td width="29%">
									<s:textfield name="fiAccountSet.companyCode" cssClass="easyui-validatebox" data-options="required:true"   cssStyle="width:98%"></s:textfield>
								</td>
								<%-- <tr>
									<td align="right" class="sd" width="19%">
										<font color=red>*</font>公司ID:
									</td>
									<td width="29%">
										<s:textfield name="fiAccountSet.companyId" cssClass="easyui-validatebox" data-options="required:true"   cssStyle="width:98%"></s:textfield>
									</td>
									<td align="right" class="sd" width="19%">
										
									</td>
									<td width="29%">
										
									</td>
								</tr> --%>
								<input id="sys_id" name="fiAccountSet.fiSysId" value="" style="display: none"/>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<s:hidden id="accountsetid" name="fiAccountSet.id"></s:hidden>
		</s:form>
	</div>
	
	<div id="editDialog3" class="easyui-dialog" data-options="
		title:'编辑',
		resizable:true,
		closed:true,
		buttons:[{
				text:'保存',
				handler:saveCrop,
				plain:true,
				iconCls:'icon-save'
			},{
				text:'关闭',
				plain:true,
				iconCls:'icon-cancel',
				handler:function(){
					$('#editDialog3').dialog('close');
				}
			}]
	">
	<%-- <s:form id="frm3" method="post">
		<s:token/>
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%"  border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01"  >
							  <tr align = center>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>公司名称:
								</td>
								<td width="29%" align="left"  >
								<input id="cn" name="fiAccountSetData.companyName" value="" /> 
								</td>
								<td align="right" class="sd" width="19%">
									分期:
								</td>
								<td width="29%" align="left" >
									<s:textfield name="fiAccountSetData.projectName"  cssStyle="width:98%"></s:textfield>									
								</td>
							</tr>	
							<tr>
								<td align="right" class="sd" width="19%">
									分期代码:
								</td>
								<td width="29%">
									<s:textfield name="fiAccountSetData.projectCode"   cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="19%">
									付款单位:
								</td>
								<td width="29%">
									<s:textfield name="fiAccountSetData.paymentOrganName"  cssStyle="width:98%"></s:textfield>
								</td>
							</tr>		  
							<tr>
								<td align="right" class="sd" width="19%">
									付款单位代码:
								</td>
								<td width="29%">
									<s:textfield name="fiAccountSetData.paymentOrganCode"  cssStyle="width:98%"></s:textfield>
								</td>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>适用系统:
								</td>
								<td width="19%"  align="left" >
									<select class="easyui-combobox" name="fiAccountSetData.sysId"  style="width:120px;">   
									    <option value="1">销售系统</option>   
									    <option value="2">成本系统</option> 
									    <option value="3">费用系统</option>   
									</select> 
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<s:hidden id="asId" name="fiAccountSetData.accountSetId"></s:hidden>
			<s:hidden id="cCode" name="fiAccountSetData.companyCode"></s:hidden>
			<s:hidden name="fiAccountSetData.id"></s:hidden>
		</s:form>
	</div> --%>
	
	<div id="importDialog" class="easyui-dialog" style="background:#fff;padding:0 10 0 10;vertical-align: middle;" data-options="title:'导入excel',closed:true">
	<s:form id="importfrm" enctype="multipart/form-data" theme="simple"  method="post" >
			
			<table width=100%  >
		        <tr height=30 >
		            <td align=center  >
		                <input type="file" name="uploadfile" id="uploadfile" >
		            </td>
		        </tr>
		        <tr height=30 >
		            <td align=center  >
		                <input type="button" value="保存" onclick="updateload();" >
		            </td>
		        </tr>
		    </table>
		</s:form>
	</div>	
</body>
</html>
