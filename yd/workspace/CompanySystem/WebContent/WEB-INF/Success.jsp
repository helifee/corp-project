<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="s" uri="/struts-tags" %>
    <%@ taglib uri="/pager-taglib.tld" prefix="pg"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>

<script language="JavaScript" type="text/javascript" src="upload.js"></script>

</head>
<body>	
<table>

	<tr>
	<td width="10%">
	上传成功！
	</td>
	</tr>
	<tr>
	<td width="10%">
	上传文件为 :  <s:property value=" + title"/><br>
	</tr>

</table>
<s:form>
	<table border="1" width="100%" >
	
    <tr>
            <td align=CENTER width="10%" ><font size="3">文件名</font></td>
            <td align=CENTER width="10%"><font size="3">上传者ID</font></td>
 			<td align=CENTER width="10%"><font size="3">上传时间</font></td>
            <td align=CENTER width="10%"><font size="3">上传路径</font></td>
            <td align=CENTER width="10%"><font size="3">文件下载</font></td>

      </tr>
    	
		<s:iterator value="uploadlist" status="st">
		 
        <tr <s:if test="#st.odd">style="background-color:gray" </s:if>>
           	<td align="center" width="8%"> <s:property value="filename_p"/> </td>
           	<td align="center" width="8%"> <s:property value="upfileuser_p"/> </td>
			<td align="center" width="8%"> <s:property value="upfiledate_p"/> </td>
           	<td align="center" width="8%"> <s:property value="upfiledir_p"/> </td>	
           <td align="center" width="8%"> <a href="javascript:movedown('<s:property value="filename_p"/>')">文件下载</a></td>
		   </tr>
        
	</s:iterator>
	
	<tr>
		<TD colspan=5">
			<p align=center><a href="simpleUser01_init.action">返回</a></p>
		</TD>
	</tr>
	
		<!-- 列表数据? -->
	<c:if test="${!empty pjs}">
		<!-- ?里就是要?示的数据了 -->
	</c:if>
	
	<!-- 可以在?里插入分??航条 -->
	<pg:pager items="${cnt}" url="" maxIndexPages="5"
		maxPageItems="5">
		<pg:first>
			<s:url id="url_pre">
				<s:param name="pageNum" value="pageNum-1"></s:param>
			</s:url>
		</pg:first>
		<pg:last>
			<s:url id="url_next">
				<s:param name="pageNum" value="pageNum+1"></s:param>
			</s:url>
		</pg:last>
	
共に${cntu}条 　　共に${ss}ページ 　　　
<%-- 如果当前??是第一?,?"上一?"和"首?"按?不可用; --%>

		<c:choose>
			<c:when test="${pageNum==1}"> 
　　　トップページ  　 　前ページ  
</c:when>
			<c:otherwise>
				<a href="${url}?pageNum=1">トップページ</a>&nbsp;&nbsp;
				<a href="${url_pre}">前のページ</a>
			</c:otherwise>
		</c:choose>
		<c:forEach begin="${i+1}"
			end="${ss}" var="i" step="1">
			<c:choose>
				<c:when test="${pageNum!=i}">
					<a href="${url}?pageNum=${i}">${i}</a>&nbsp;
				</c:when>
				<c:otherwise> 
<font color="red">${i}</font>
</c:otherwise>
			</c:choose>
		</c:forEach> 	
		<%-- 如果当前??是最后?,?"下一?"和"尾?"按?不可用; --%>
		<c:choose>
			<c:when test="${pageNum==ss}"> 
　　　次のページ  　 尾のページ    
</c:when>
			<c:otherwise>
				<a href="${url_next}">次のページ </a>&nbsp;&nbsp;&nbsp;
				<a href="${url}?pageNum=${ss}">尾のページ</a>
			</c:otherwise>
		</c:choose>
	
	</pg:pager>
</table>
<s:hidden name="key_hidden" id="hidden1"/>
</s:form>
	
</body>
</html>