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
	<script type="text/javascript">
		      $(function(){
		    	  var url=$("#contextPath").val()+"page/ReportSetting/ReportSetting-template.jsp?reportName="+encodeURI(encodeURI($("#reportName").val()))+"&resultPath="+$("#resultPath").val()+"&queryPath="+$("#queryPath").val();
		    	  window.location.href=url;
		      })
		   
    </script>

  </head>
  
  <body>
    <input id="contextPath" type="hidden" value="<%=request.getContextPath()%>">
    <input id="reportName"  type="hidden"  value="${reportName}">
    <input id="resultPath" type="hidden"  value="${resultPath}">
    <input id="queryPath"  type="hidden"  value="${queryPath}">
  </body>
</html>
