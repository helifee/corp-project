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
<title>ϵͳ��ҳ</title>
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
											ϵͳ������Ϣ
											</td>
										</tr>
										<tr>
											
											<td  class="text_tablehead_b">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;���ϵͳ���ڣ�
											</td>
											<td >
											[${sessionScope.workDatehvps }]
											</td>
										</tr>
										<tr>
											
											<td  class="text_tablehead_b">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;���ϵͳ״̬��
											</td>
											<td >
											
											<c:if test="${sessionScope.workStatehvps eq '01'}" ><font color="red">[��  ��] </font>   </c:if>
											<c:if test="${sessionScope.workStatehvps eq '02'}" ><font color="red">[ͣ  ��] </font>   </c:if>
											<c:if test="${sessionScope.workStatehvps eq '03'}" ><font color="red">[ά  ��]</font>    </c:if>
											<c:if test="${sessionScope.workStatehvps eq '10'}" ><font color="green">[��  ��]</font>    </c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '00'}" ><font color="red">[Ӫҵ׼��]</font></c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '20'}" ><font color="red">[ҵ���ֹ]</font></c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '30'}" ><font color="red">[���㴰��]</font></c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '40'}" ><font color="red">[���մ���]</font></c:if>                                                    
											<c:if test="${sessionScope.workStatehvps eq '15'}" ><font color="red">[��  ��]</font>  </c:if> 
											
											</td>
										</tr>
										<tr>
											
											<td  class="text_tablehead_b">
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;С��ϵͳ���ڣ�
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
											ϵͳ��������Ϣ
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