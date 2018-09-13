<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib prefix="s" uri="/struts-tags" %>
    <%@ taglib uri="/pager-taglib.tld" prefix="pg"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>画面（李化娟）</title>

<script language="JavaScript" type="text/javascript" src="upload.js"></script>

</head>
<body background="imag\vb.jpg">
<table>
	<tr>
	<td height=80>
	&nbsp;
	</td>
	</tr>
	<tr>
	<td width="10%">
	アップロードすることに成功します！
	</td>
	</tr>
	<tr>
	<td width="10%">
	アップロードファイル :  <s:property value=" + title"/><br>
	</tr>

</table>
<s:form>
	<table border="1" width="100%" CELLSPACING=0>
	
     <tr style="background-color:#CCCCCC" >
            <td align=CENTER width="10%" height=40 ><font size="3">アップロードファイル名</font></td>
            <td align=CENTER width="10%"><font size="3">ユーザーID</font></td>
 			<td align=CENTER width="10%"><font size="3">アップロード時間</font></td>
            <td align=CENTER width="10%"><font size="3">アップロードパース</font></td>
            <td align=CENTER width="10%"><font size="3">ダウンロードファイル</font></td>

      </tr>
    	
		<s:iterator value="uploadlist" status="st">
		 
        <tr>
           	<td align="center" width="8%" height=40> <s:property value="filename_p"/> </td>
           	<td align="center" width="8%"> <s:property value="upfileuser_p"/> </td>
			<td align="center" width="8%"> <s:property value="upfiledate_p"/> </td>
           	<td align="center" width="8%"> <s:property value="upfiledir_p"/> </td>	
           <td align="center" width="8%"> <a href="javascript:movedown('<s:property value="filename_p"/>')">ダウンロードファイル</a></td>
		   </tr>
        
	</s:iterator>
	
	<tr>
		<TD colspan=5">
			<p align=center><a href="simpleUser01_init.action">戻る</a></p>
		</TD>
	</tr>
	
	<c:if test="${!empty pjs}">
	</c:if>
	
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
	
総計${cntu}レコード  　　総計${ss}頁 　　　
<%-- 如果当前??是第一?,?"上一?"和"首?"按?不可用; --%>

		<c:choose>
			<c:when test="${pageNum==1}"> 
　　先  頭   前ページ 
</c:when>
			<c:otherwise>
				<a href="${url}?pageNum=1">先  頭</a>&nbsp;&nbsp;
				<a href="${url_pre}">前ページ</a>
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
		<c:choose>
			<c:when test="${pageNum==ss}"> 
　　次ページ    最  後     
</c:when>
			<c:otherwise>
				<a href="${url_next}">次ページ</a>&nbsp;&nbsp;&nbsp;
				<a href="${url}?pageNum=${ss}">最  後 </a>
			</c:otherwise>
		</c:choose>
	
	</pg:pager>
</table>
<s:hidden name="key_hidden" id="hidden1"/>
</s:form>
	
</body>
</html>