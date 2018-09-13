<%@page import="freemarker.template.utility.DateUtil"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
	<link href="css/PhoneUI.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/App.js"></script>
</head>
<body>
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
		<s:if test="null != #request.abList && #request.abList.size() > 0">
		<tr>
			<td align="left">
				<div class="item_box" style="border-top: 0px;border-bottom: 0px;">
					<s:iterator value="#request.abList" var="ab" status="abs">
						<div class="item_title">${ab.userName}<span class="item_title_data"><s:date name="#ab.logDate" format="yyyy-MM-dd HH:mm"/></span></div>
						<div class="item_content">
							<s:property value="lineFeed(#ab.userNote)" escape="false"/>
							<s:set id="uploadMapKey" value="'fiId_' + #ab.fiId + '_wiId_' + #ab.wiId"></s:set>
							<s:iterator value="#request.spUploadsMap['fiId_' + #ab.fiId + '_wiId_' + #ab.wiId]" var="upload" status="stat">
								<s:if test="#stat.index == 0"><br/></s:if>
								<br/>
								<s:if test="#upload.fileName.endsWith(\".url\")">
									<a href="${upload.userLabel}" target="_blank">${upload.fileName }</a>
								</s:if>
								<s:else>
									<a href="File!download.do?id=${upload.id}" target="_blank">${upload.fileName }</a>
								</s:else>
							</s:iterator>&nbsp;
						</div>
						<div class="item_status">操作：${ab.opName}&nbsp;&nbsp;节点：${ab.nodeName}</div>
					</s:iterator>
				</div>
			</td>
		</tr>
		</s:if>
		<s:else>
			<tr>
				<td colspan="1">&nbsp;</td>
			</tr>
		</s:else>
	</table>
</body>
</html>