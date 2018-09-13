<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>添加报表参数配置</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="page/ReportSetting/ReportSetting-edit.js"></script>
	<%@ include file="/validate.jsp"%>
</head>
<body>
	<form id="frm" action="ReportSetting!save.do" encType="multipart/form-data" method="post">
	<s:token/>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
			<tr>
				<td>
					<div class="wdtable_titleh">
						${isView ? '编辑' : '新增'}报表参数配置
					</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="javascript:dealSave();">提交</a><a href="#" onclick="window.close();return false;">关闭</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
						<tr>
							<td>
								<div class="divh3_title">
									<a href="#">${isView ? '编辑' : '新增'}报表参数配置:</a>
								</div>
							</td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table12">
						<tr>
							<td width="10%" align="right"><span style="color: red;"></span>应用编号:</td>
							<td>
								<select id="reportSetting.appCode" name="reportSetting.appCode" cssStyle="width:30%">
								<s:if test="reportSetting.id !=null">
								  	<s:iterator value="appList" var="app">
						    		    <option value="${app.code}" ${app.code eq reportSetting.appCode? 'selected="selected"' : ''}>${app.name}</option>
						    	    </s:iterator>
								</s:if>
								<s:else>
							    	<s:iterator value="appList" var="app">
							    		 <option value="${app.code}" ${app.code eq code? 'selected="selected"' : ''}>${app.name}</option>
							    	</s:iterator>
								</s:else>
						       </select>
							</td>
						</tr>
						<tr>
							<td width="15%" align="right"><span style="color: red;">*</span>报表编码:</td>
							<td>
							     <s:textfield  id="reportSetting.reportCode" name="reportSetting.reportCode"  cssStyle="width:30%"   datatype="*1-50" ></s:textfield>
							</td>
						</tr>
						<tr>
							<td width="15%" align="right"><span style="color: red;">*</span>报表名称:</td>
							<td>
								<s:textfield  id="reportSetting.reportName" name="reportSetting.reportName"  cssStyle="width:30%"   datatype="*1-50"></s:textfield>
							</td>
						</tr>
						<tr>
							<td width="20%" align="right"><span style="color: red;">*</span>查询参数模版路径:</td>
							<td>
							  <s:file  name="queryPath"  datatype="*"   cssStyle="width:30%" />
							</td>
						</tr>
						<tr>
							<td width="20%" align="right"><span style="color: red;">*</span>集算器路径:</td>
							<td>
							   <s:file  name="calatePath"  datatype="*"  cssStyle="width:30%" />
							</td>
						</tr>
						<tr>
							<td width="20%" align="right"><span style="color: red;">*</span>结果模版路径:</td>
							<td>
							   <s:file  name="resultPath"  datatype="*"   cssStyle="width:30%" />
							</td>
						</tr>
						<tr>
							<td width="20%" align="right">同步连接:</td>
							<td>
							   <s:textfield  id="reportSetting.viewUrl" name="reportSetting.viewUrl"  cssStyle="width:30%"   ></s:textfield>
							</td>
						</tr
					</table>
				</td>
			</tr>
       </table>
	</form>

</body>
</html>
