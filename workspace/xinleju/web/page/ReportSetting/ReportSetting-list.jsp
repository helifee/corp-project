<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<title>报表字典管理</title>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="css/mask.css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
	<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
	<script type="text/javascript" src="page/ReportSetting/ReportSetting-list.js"></script>
	<script type="text/javascript" >
	
	   function sysData(url){
		   $.post(url,{},function(data){
				alert("同步成功!");
	  		});
	   }
	   
	</script>
</head>
<body>
	<s:form id="frm" action="ReportSetting!list.do" method="post">
		<!-- 标题 -->
		<div class="t_title">
			<div class="hh">报表配置列表</div>
			<div class="t_title_input">
				&nbsp;
			</div>
			<div class="tool">
				<a href="javascript:void(0)" onclick="addReportSetting('${code}');return false;" class="t_new">新增</a>
				<a href="javascript:void(0)" onclick="editReportSetting();return false;" class="t_edit">编辑</a>
				<a href="javascript:void(0)" onclick="batchDel();return false;" class="t_del">删除</a>
			</div>
			<div class="clear"></div>
		</div>
		<div>
			<table width="100%" cellpadding="0" cellspacing="1" class="wd_tablelist01">
			 <tr>
				<th width="5%"><input type="checkbox" name="checkbox" id="checkbox" onclick="AutoCheckAll('dictIds',this,window.event);" value="total" /></th>
				<th width="10%">应用</th>
				<th width="10%">编码</th>
				<th width="15%">名称</th>
				<th width="15%">URL</th>
				<th width="15%">参数模版路径</th>

				<th width="10%">结果模版路径</th>
				<th width="10%">同步视图</th>
			</tr>
			<s:if test="page.items.size>0">
				<s:iterator value="page.items" var="item" status="stat">
					<tr>
						<td align="center">
							<input name="dictIds" type="checkbox"  value="${item.id}" />
						</td>
						<td align="left">${item.appCode}</td>
						<td align="left">${item.reportCode }</td>
						<td align="left">${item.reportName }</td>
						<td align="left"><a herf="javascript:void(0)" onclick="searchReport('${item.url }')">${item.url }<a/></td>
						<td align="left">${item.queryPath}</td>
						<td align="left">${item.resultPath}</td>
						<td align="left">
						   <s:if test="#item.viewUrl !='' && #item.viewUrl !=null ">
						      <a href="javascript:void(0);sysData('${item.viewUrl}')" >同步</a>
						   </s:if>
						</td>
					</tr>
				</s:iterator>
			</s:if>
		 </table>
		<div class="page">
			<app:PageTag actionName="Dict!list.do"></app:PageTag>
		</div>
	</s:form>
</body>
</html>
