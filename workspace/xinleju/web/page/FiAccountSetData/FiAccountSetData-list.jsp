<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<link href="css/jeasyui_form.css" rel="stylesheet" type="text/css" />
		<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css"/>
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<script type="text/javascript" src="js/TemplateWindow.js"></script>
		
		<script type="text/javascript" src="page/FiAccountSetData/FiAccountSetData-list.js"></script>
<%-- 		<script type="text/javascript" src="${pageContext.request.contextPath}/js/xljbasejs.js"></script> --%>
        <%-- <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/xljbasestyle.css" />
 --%>
		<script>
		var contextPath = '${pageContext.request.contextPath}';
		if(contextPath.length==1){
			contextPath = '';
		}
		
		global.accountSetId = '${setId}';
		global.sysId = ${sysId};
		
	
		/* var vtype_ref = ${vtype_ref}; 
			<s:iterator value="#request.refs" var="map">
			    var ${map.key} = ${map.value};
			</s:iterator> */
		function closes(){
			$("#Loading").fadeOut("normal",function(){
				$(this).remove();
			});
		}
		var pc_;
		$.parser.onComplete = function(){
			//if(pc_) clearTimeout(pc);
			pc_ = setTimeout(closes, 500);
		}
		
		//var projectBranchs=${projectBranchs};
	
		</script>
	</head>
	<body>
	<div id='Loading' style="position:absolute;z-index:1000;top:0px;left:0px;width:100%;height:100%;background:#DDDDDB ;text-align:center;padding-top: 20%;">
		<h1><image src='images/loading.gif'/><font color="#15428B">加载中···</font></h1>
	</div>	
	<div class="easyui-layout" data-options="fit:true,border:false" id="northpanel">
	<div data-options="region:'north',height:'auto',border:false">
	<s:form id="frm" action="FiAccountSetData!list">
			<s:hidden name="start"></s:hidden>
			<s:hidden id="accountSetId" name="fiAccountSetData.accountSetId"></s:hidden>
			<!-- 查询条件 -->
			<div class="s1_searchWrap">
			<!--   <div class="s2">
			    <div class="sl-key"><span>已选条件:</span></div>
			    <div class="s2-clear"><a href="javascript:void(0)" onclick="clearAllParam()">清除条件</a></div>
			    <div class="s2-value">
			      <ul id="selectedCond">
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div> -->
			 <%--  <div class="sl-wrap">
			    <div class="sl-key"><span>状态:</span></div>
			    <div class="sl-value">
			      <ul>
			        <s:iterator value="#request.statusMap">
			        	<li class="${key eq status ? 'current' :''}"><a href="javascript:void(0)" onclick="selectParam('状态：${value}','${key}','statusLi','status')" id="${key}">${value}</a></li>
			        </s:iterator>
			      </ul>
			    </div>
			    <div class="clear"></div>
			  </div>  --%>
		</div>
		</s:form>
	</div>
	<div data-options="region:'center',border:false">
	<!-- 标题 -->
		<div id="tb_grid">
		  		<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="javascript:newCorp()">新增</a>
		  		<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="javascript:del()">删除</a>
		  		<a class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="javascript:editAccountSetData();" class="t_more">编辑</a>
		</div>
		<table id="grid"></table>
	</div>
	</div>
	
	<div id="newDialog"></div>
	<%-- <div id="editDialog" class="easyui-dialog" data-options="
		title:'新增/编辑',
		resizable:true,
		closed:true,
		width:350,
		buttons:[{
				text:'保存',
				handler:save
			},{
				text:'关闭',
				handler:function(){
					$('#editDialog').dialog('close');
				}
			}]
		">
		<s:form id="frm2" method="post">
			<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
				<tr>
					<td>
						<table width="100%"  border="0" cellpadding="0" cellspacing="1" class="wd_tablelist01"  >
							  <tr align = center>
								<td align="right" class="sd" width="19%">
									<font color=red>*</font>系统:
								</td>
								<td width="80%"   align="left"  id="checkSys">
									<s:radio list="#{1:'销售系统',2:'成本系统',3:'费用系统'}" name="fiAccountSetData.sysId"></s:radio>
								</td>
								</tr>			  
							<tr id="projectBranch">
								<td align="right" class="sd" width="25%">
									<font color=red>*</font>项目分期:
								</td>
								<td width="75%" align="left" >
									<s:textfield name="fiAccountSetData.projectName" cssStyle="width:98%"></s:textfield>		
									<s:select list="#request.projectBranchMap" listKey="key" listValue="value"  name="fiAccountSetData.projectName" headerKey="" headerValue="请选择" onchange="changeProjectBranch(this)" class="easyui-text"></s:select>
									<s:hidden name="fiAccountSetData.accountSetId"></s:hidden>
									<s:hidden name="fiAccountSetData.projectId" id="projectId"></s:hidden>
									<s:hidden name="fiAccountSetData.projectCode" id="projectCode"></s:hidden>
									<s:hidden name="fiAccountSetData.projectBranchId" id="projectBranchId"></s:hidden>
								</td>
							</tr>			  
							<tr id="fundUnit">
								
								<td align="right" class="sd" width="25%">
										<font color=red>*</font>付款单位:
								</td>
								<td width="75%">
									<s:textfield name="fiAccountSetData.paymentOrganName"></s:textfield>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<s:hidden name="fiAccountSetData.createDate"></s:hidden>
			<s:hidden name="fiAccountSetData.status"></s:hidden>
			<s:hidden name="fiAccountSetData.id"></s:hidden>
		</s:form>
	</div>	 --%>
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
	<s:form id="frm3" method="post">
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
								<!-- <input id="cn" name="fiAccountSetData.companyName" class="easyui-searchbox" value="" /> -->
								   <input type="hidden" name="fiAccountSetData.companyId"
									value="" id="companyId" /> <input
									id="companyName" name="fiAccountSetData.companyName"
									style="width:220px;border: 1px solid #ABADB3;"
									class="easyui-textbox forcecheck"
									value=""
									data-options="icons:[{iconCls:'icon-search',
														handler: function(e){
															 companyDialogOpen('companyName','companyId',100);
														}
														}],
												editable: false" />
									<span class="checkspan" title="公司不能为空"> 
										<!-- <a href='#'><img src="" /></a> -->
								   </span>
								</td>
								<td align="right" class="sd" width="19%" id="payUnit1">
									付款单位:
								</td>
								<td width="29%" id="payUnit2">
									<%-- <s:textfield name="fiAccountSetData.paymentOrganName" class="easyui-searchbox"  cssStyle="width:98%"></s:textfield> --%>
									<input type="hidden" name="fiAccountSetData.paymentOrganId"
									value="" id="firstunitid" /> <input
									id="firstunit" name="fiAccountSetData.paymentOrganName"
									style="width:220px;border: 1px solid #ABADB3;"
									class="easyui-textbox forcecheck"
									value=""
									data-options="
																	icons:[{
																	iconCls:'icon-search',
																	handler: function(e){
																		firstunitpDialogOpen('firstunit','firstunitid',100);
																	}
																	}],
																editable: false" />
									<span class="checkspan" title="付款单位不能为空"> 
										<!-- <a href='#'><img src="" /></a> -->
								   </span>
								</td>
								<td align="right" class="sd" width="19%" style="display: none" id="pbanch1">
									分期:
								</td>
								<td width="29%" align="left" style="display: none" id="pbanch2">
									<%-- <s:textfield name="fiAccountSetData.projectName"  cssStyle="width:98%"></s:textfield> --%>									
								    <input id="pbanch" name="fiAccountSetData.projectBranchId"  style="width:98%" > 
								    <input id="pbanchName" name="fiAccountSetData.projectName" style="display: none"> 
								</td>
							</tr>	
							<%-- <tr>
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
									<s:textfield name="fiAccountSetData.paymentOrganName" class="easyui-searchbox"  cssStyle="width:98%"></s:textfield>
									<input type="hidden" name="fiAccountSetData.paymentOrganId"
									value="" id="firstunitid" /> <input
									id="firstunit" name="fiAccountSetData.paymentOrganName"
									style="width:220px;border: 1px solid #ABADB3;"
									class="easyui-textbox forcecheck"
									value=""
									data-options="
																	icons:[{
																	iconCls:'icon-search',
																	handler: function(e){
																		firstunitpDialogOpen('firstunit','firstunitid',100);
																	}
																	}],
																editable: false" />
									<span class="checkspan" title="付款单位不能为空"> <a href='#'><img
											src="" /></a>
								   </span>
								</td>
							</tr>	 --%>	  
							<%-- <tr>
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
							</tr> --%>
						</table>
					</td>
				</tr>
			</table>
			<s:hidden id="asId" name="fiAccountSetData.accountSetId"></s:hidden>
			<s:hidden id="sysId" name="fiAccountSetData.sysId"></s:hidden>
			<s:hidden id="cCode" name="fiAccountSetData.companyCode"></s:hidden>
			<s:hidden name="fiAccountSetData.id"></s:hidden>
		</s:form>
		<div id="deptDialog" title="选择付款单位" style="margin-left:auto;margin-right:auto;margin-bottom: auto;margin-top: auto;">
		</div>
	</div>
	
</body>
</html>
