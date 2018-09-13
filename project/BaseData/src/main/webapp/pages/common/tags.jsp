<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix= "c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" scope='request'/>

<link rel="stylesheet" type="text/css" href="${ctx}/static/css/framework/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/framework/themes/icon.css">
<link rel="stylesheet" type="text/css" href="${ctx}/static/css/base.css">

<script src="${ctx}/static/javascript/framework/jquery.min.js" charset="utf-8"></script>
<script src="${ctx}/static/javascript/framework/jquery.easyui.min.js" charset="utf-8"></script>
<script src="${ctx}/static/javascript/framework/easyui-lang-zh_CN.js" charset="utf-8"></script>
<script src="${ctx}/static/javascript/framework/easyui-util.js" charset="utf-8"></script>
<script src="${ctx}/static/javascript/util/common.js" charset="utf-8"></script>
<script src="${ctx}/static/javascript/util/dataGrid.js" charset="utf-8"></script>

<script type="text/javascript">
   var baseUrl = "<%=request.getContextPath() %>";	
</script>
