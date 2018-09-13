<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>相关流程</title>
<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
<script type="text/javascript" src="js/application.js"></script>
<script type="text/javascript" src="page/Form/Form-singleSelectList.js"></script>
<base target="_self" />
</head>
<body>
	<div class="wdtable_title_sp">
		<div class="wdtable_title_sp_t">相关流程</div>
		<div class="wdtable_title_sp_tool" id="submitDiv">
			<input type="button" class="dfbtn" onclick="window.close();" value="关闭" />
		</div>
	</div>
	<div class="sp_wrapper" style="margin-right: 0px;">
		<s:form id="frm" action="Form!singleSelectList.do" method="post">
			<s:hidden name="start"></s:hidden> 
			<table width="100%" border="0" cellpadding="0" cellspacing="1"
				class="t_search">
				<tr>
					<td width="290px">流程名称:
						<s:textfield id="fiName" name="fiName" cssClass="input180" value="%{#request.fiName}"></s:textfield>
					</td>
					<td width="290px">模板编码:
						<s:textfield id="fiCode" name="fiCode" cssClass="input180" value="%{#request.fiCode}"></s:textfield>
					</td>
					<td width="160px">流程状态: 
						<s:select id="fiStatus" list="#{'':'全部','1':'进行中','2':'已完成'}" name="fiStatus" value="%{#request.fiStatus}" listKey="key" listValue="value"></s:select>
					</td>
					<td align="right">
						<img src="images/icon_search.png" width="24" height="24" align="absmiddle" title="查询" onclick="$('#frm').submit();return false;" border="0" style="cursor: pointer;" />
					</td>
				</tr>
			</table>
			<table width="100%" border="0" cellpadding="0" cellspacing="1"
				class="wd_tablelist01">
				<tr>
					<th width="30px">序号</th>
					<th>流程名称</th>
					<th width="100px">模板编码</th>
					<th width="100px">发起人</th>
					<th width="100px">流程状态</th>
					<th width="120px">流程时间</th>
					<th width="60px">操作</th>
				</tr>
				<s:if test="page.items.size()==0">
					<tr>
						<td colspan="7" align="center">无数据</td>
					</tr>
				</s:if>
				<s:iterator value="page.items" var="item" status="stat">
					<tr class="tr_eval" evalId="${item[0]}">
						<td align="center">${stat.index + 1}</td>
						<td><app:TruncateTag size="103" src="${item[1]}"></app:TruncateTag></td>
						<td align="center"><s:property value="#item[2]" /></td>
						<td align="center"><s:property value="#item[3]" /></td>
						<td>
							<s:if test="#item[4] == 1">
								进行中
							</s:if> <s:elseif test="#item[4] == 2">
								已结束
							</s:elseif>
						</td>
						<td align="center">
							<%-- <jdt:date dateTime="${item[5]}" style="yyyy-MM-dd HH:mm:ss"></jdt:date></td> --%>
						<s:date format="yyyy-MM-dd HH:mm:ss" name="#item[5]" id="createTime"/><s:property value="createTime"/>
						<td align="center">
							<a href="javascript:void(0);" onclick="var url = 'Form!dealIndex.do?fiId=${item[0]}';var width = 1270;var height = 600;var scroll = 'yes';url += '&t=' + (new Date()).getTime();window.showModalDialog(url,self,calcShowModalDialogLocation(width, height, scroll));return false;">查看</a>
							<a href="javascript:void(0);" onclick="singleChoose('${item[0]}','${item[1]}');" class="a_choose">选择</a></td>
					</tr>
				</s:iterator>
			</table>
			<div class="page">
				<div style="float: left;">
					&nbsp;
				</div>
				<app:PageTag actionName="Form!singleSelectList.do" ></app:PageTag>
			</div>
		</s:form>
	</div>
</body>
</html>