<%@ page language="java" contentType="text/html; charset=GBK"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<link href="<%=path%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>        
<title>系统首页</title>
</head>
<body>
		<div  class="table_content" style="height: 700px;">
<form name="myfrom" id="myform" action="" method="post">
		
		<table width="100%"  border="0" cellpadding="0"
										cellspacing="0" >
										<tr>
											<td >
												<div align="center" >
													<span class="text_blue2"></span>
												</div>
											</td>
										</tr>
										<tr>
											<td  class="text_tablehead">
											&nbsp;
											</td>
										</tr>
										<tr>
											<td  class="text_tablehead">
											系统工作信息
											</td>
										</tr>
										<tr>
											
											<td  class="text_tablehead_b">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大额系统日期：
											</td>
											<td >
											[${sessionScope.workDatehvps }]
											</td>
										</tr>
										<tr>
											
											<td  class="text_tablehead_b">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大额系统状态：
											</td>
											<td >
											
											<c:if test="${sessionScope.workStatehvps eq '01'}" ><font color="red">[启  运] </font>   </c:if>
											<c:if test="${sessionScope.workStatehvps eq '02'}" ><font color="red">[停  运] </font>   </c:if>
											<c:if test="${sessionScope.workStatehvps eq '03'}" ><font color="red">[维  护]</font>    </c:if>
											<c:if test="${sessionScope.workStatehvps eq '10'}" ><font color="green">[日  间]</font>    </c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '00'}" ><font color="red">[营业准备]</font></c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '20'}" ><font color="red">[业务截止]</font></c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '30'}" ><font color="red">[清算窗口]</font></c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '40'}" ><font color="red">[日终处理]</font></c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '15'}" ><font color="red">[日  切]</font>  </c:if> 
											
											</td>
										</tr>
										<tr>
											
											<td  class="text_tablehead_b">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小额系统日期：
											</td>
											<td  >
											[${sessionScope.workDatebeps }]
											</td>
										</tr>
										<tr>
											<td  class="text_tablehead">
											&nbsp;
											</td>
										</tr>
										<tr>
											<td  class="text_tablehead">
											系统待处理信息
											</td>
										</tr>
										<tr>
											
											<td  class="text_tablehead_b">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											</td>
											<td  >
											&nbsp;
										
											</td>
										</tr>
										
									</table>
		
		
		</form>
		</div>
	</body>
</html>