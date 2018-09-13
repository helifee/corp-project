<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>经办人补充附件信息</title>
	<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="js/application.js"></script>
	<meta name="viewport" content="width=device-width" />
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="js/ext/ext-all.js"></script>
</head>
<body>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="divh3">
		<tr>
			<td>
				<div class="divh3_title">
					<a href="#" onclick="showOrHide('fiFileTable','fiFileTableShowOrHide');">经办人补充附件信息<img title="点击隐藏" id="fiFileTableShowOrHide" src="images/icons/up_list.gif" border="0" align="absmiddle"/></a>
				</div>
			</td>
		</tr>
	</table>
	<div id="fiFileTable" style="width:100%;">
	<form id="frm_downLoadZip" name="frm_downLoadZip" action="File!downloadZip.do" method="post" target="_top">
	<input type="hidden" name=dateId" value="<%=System.nanoTime()%>"/>
	<table width="100%" border="0" cellpadding="0" cellspacing="1" class="table_fj">
	 <tr>
	    <th>文件名称</th>
	    <th>文件类型</th>
	    <th>创建时间</th>
	 </tr>
	 <s:if test="#request.spUploadsMap !=null && #request.spUploadsMap.size() > 0">
	 <tr>
		<td>
			<a href="javascript:void(0);" onclick="document.frm_downLoadZip.submit();return false;">打包下载</a>
		</td>
		<td>
		</td>
		<td>
		</td>
	</tr>
	 <s:iterator value="#request.spUploadsMap" var="item" status="fileStatus">
		 <tr>
		    <td>
		    	<input type="hidden" name="zipUploadIds" value="${item.id }" />
		    	<s:if test="'url' != #item.ext">
					<a href="File!download.do?id=${item.id}" name="${item.fileName }" title="${item.fileName }" class="jiequ">${item.fileName }</a>
				</s:if>
				<s:else>
				    <a href="#" target="_blank" onclick="window.open('${item.userLabel}');" title="${item.fileName }" class="jiequ">${item.fileName }</a>
				</s:else>
		    </td>
		    <td align="center">
		    	<s:if test="'url' != #item.ext">
					附件
				</s:if>
				<s:else>
					地址
				</s:else>
		    </td>
		    <td align="center">
		    	<s:bean id="time" name="java.util.Date"> 
					<s:param name="time" value="item.uploadTime" /> 
				</s:bean> 
				<s:date name="#time" format="yyyy-MM-dd HH:mm:ss" />
		    </td>
		 </tr>
	 </s:iterator>
	 </s:if>
	 <s:else>
			<tr>
				<td>
					&nbsp;
				</td>
				<td>
					&nbsp;
				</td>
				<td>
					&nbsp;
				</td>
			</tr>
	</s:else>
	</table>
 </form>
 </div>
	<%-- 
	 <table width="100%" border="0" cellspacing="1" cellpadding="0" class="wd_tablelist04">
		<s:if test="#request.spUploadsMap !=null && #request.spUploadsMap.size() > 0">
			<td align="left">
				<app:flowFilesTag uploadList="${spUploadsMap}"></app:flowFilesTag>
			</td>
		</s:if>
		<s:else>
			<tr>
				<td>
					&nbsp;
				</td>
			</tr>
		</s:else>
	</table>
	--%>
</body>