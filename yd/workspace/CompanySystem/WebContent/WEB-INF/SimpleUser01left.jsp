<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="/pager-taglib.tld" prefix="pg"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>user</title>
<script language="JavaScript" type="text/javascript" src="simpleUser01left.js"></script>

</head>
<body>

<table>
<tr>
<td>
<TABLE align=left border="0" width="50%">
 	<tr>
      <td align="left" >
     </td>
    </tr>
   <tr>
      <td align="left" >
      <s:select name="startdate"  list="{'2001','2002','2003','2004','2005','2006','2007','2008','2009'}" headerKey="0" headerValue="--年を選びます--" />
       <s:submit onclick="add1();" name="sub" value=" 検索  "> </s:submit>
       </td>
   </tr>     
</table>
</td>
</tr>
<tr>
<td>

    <table border="1" width="99%" >
    <tr style="background-color:#CCCCCC" >
  			<td align=CENTER width=30 height=40 ><font size="3">&nbsp;</font></td>
            <td align=CENTER width=120 height=40><font size="3">プロジェクトID</font></td>
            <td align=CENTER width=150><font size="3">プロジェクト名</font></td>
            <td align=CENTER width=120 ><font size="3">管理者名</font></td>
            <td align=CENTER width=120><font size="3">客さん名</font></td>
            <td align=CENTER width=120><font size="3">実際開始日</font></td>
            <td align=CENTER width=120 ><font size="3">実際終了日</font></td>
            <td align=CENTER width=80><font size="3">作業量</font></td>
            <td align=CENTER width=220><font size="3">プロジェクト中文名</font></td>
            <td align=CENTER width=220><font size="3">プロジェクト英文名</font></td>
      </tr>
    	
		<s:iterator value="pjs" status="st">
		 
        <tr>
       		 <td align="center" width=30 height=40><input type="radio" name="key_hidden" value="<s:property value="projectid_a"/>" checked></td>
           	<td align="center" width=120 height=40> <s:property value="projectid_a"/> </td>
           	<td align="center" width=150> <s:property value="prjmei_a"/> </td>
           	<td align="center" width=120> <s:property value="musername_a"/> </td>
           	<td align="center" width=120> <s:property value="kyakuname_a"/> </td>
           	<td align="center" width=120> <s:property value="startdate_a"/> </td>
           	<td align="center" width=120> <s:property value="enddate_a"/> </td>
           	<td align="center" width=80> <s:property value="usernum_a"/> </td>
           	<td align="center" width=220> <s:property value="projecttyuname_a"/> </td>
           	<td align="center" width=220> <s:property value="projectuiname_a"/> </td>
           	
           	
        </tr>
	</s:iterator>

	<!-- 列表数据? -->
	<c:if test="${!empty pjs}">
		<!-- ?里就是要?示的数据了 -->
	</c:if>
	<!-- 在列表数据?空的?候，要?示的提示信息 -->
	<c:if test="${empty pjs}">
		<tr>
			<td colspan="5">相応のデータを探し当てていません！</td>
		</tr>
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
	
共に${cnt}条 　　　共に${ss}ページ  
<%-- 如果当前??是第一?,?"上一?"和"首?"按?不可用; --%>

		<c:choose>
			<c:when test="${pageNum==1}"> 
　　　トップページ  　 　前ページ  
</c:when>
			<c:otherwise>
				<a href="${url}?pageNum=1">トップページ</a>
				<a href="${url_pre}">前ページ</a>
			</c:otherwise>
		</c:choose>
		<c:forEach begin="${i+1}"
			end="${ss}" var="i" step="1">
			<c:choose>
				<c:when test="${pageNum!=i}">
					<a href="${url}?pageNum=${i}">${i}</a>
				</c:when>
				<c:otherwise> 
<font color="red">${i}</font>
</c:otherwise>
			</c:choose>
		</c:forEach> 	
		<%-- 如果当前??是最后?,?"下一?"和"尾?"按?不可用; --%>
		<c:choose>
			<c:when test="${pageNum==ss}"> 
　　　次のページ  　尾のページ    
</c:when>
			<c:otherwise>
				<a href="${url_next}">次のページ </a>
				<a href="${url}?pageNum=${ss}">尾のページ</a>
			</c:otherwise>
		</c:choose>
	
	</pg:pager>
	</table>
	</td>
	</tr>
	<tr>
	<td>
	<table  border="0">
	<tr >
	  <td height=20 colspan="10">
	  &nbsp;
	  </td>
   </tr>
	<tr >
		<td ><input name="bbb" type="button"   value=" 詳細 " onclick="javascript:ss();"/></td>
		<td width=10>&nbsp;&nbsp;</td>
		<td colspan="9" align="right"><font size="4"><a href="./Upload.jsp">ファイルのアップロード</a></font></td>
   </tr>
  <tr >
	  <td height=50 colspan="10">
	  &nbsp;
	  </td>
  </tr>
</table>
</td>
</tr>
</table>
</body>
</html>