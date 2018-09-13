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
      　	<s:select name="startdate"  list="{'2001','2002','2003','2004','2005','2006','2007','2008','2009'}" headerKey="0" headerValue="--選択年--" />
       　　　　<s:submit onclick="add1();" name="sub" value=" 検索  "> </s:submit>
      </td>
   </tr>     
</table>
</td>
</tr>
<tr>
<td>

    <table border="1" width="99%" CELLSPACING=0>
    <tr style="background-color:#CCCCCC" >
  			<td align=CENTER width=30 height=40 ><font size="3">&nbsp;</font></td>
            <td align=CENTER width=120 height=40><font size="3">プロジェクトID</font></td>
            <td align=CENTER width=150><font size="3">プロジェクト名</font></td>
            <td align=CENTER width=120 ><font size="3">管理者</font></td>
            <td align=CENTER width=120><font size="3">お客さん</font></td>
            <td align=CENTER width=120><font size="3">実際開始日</font></td>
            <td align=CENTER width=120 ><font size="3">実際終了日</font></td>
            <td align=CENTER width=80><font size="3">工数</font></td>
            <td align=CENTER width=220><font size="3">中国語名称</font></td>
            <td align=CENTER width=220><font size="3">英語名称</font></td>
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

	<c:if test="${!empty pjs}">
	</c:if>
	<c:if test="${empty pjs}">
		<tr>
			<td colspan="5">相応のデータを探し当てていません！</td>
		</tr>
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
	
総計${cnt}レコード  　　　総計${ss}頁  
<%-- 如果当前??是第一?,?"上一?"和"首?"按?不可用; --%>

		<c:choose>
			<c:when test="${pageNum==1}"> 
　　先  頭   前ページ 
</c:when>
			<c:otherwise>
				<a href="${url}?pageNum=1">先  頭 </a>
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
		<c:choose>
			<c:when test="${pageNum==ss}"> 
　　次ページ    最  後     
</c:when>
			<c:otherwise>
				<a href="${url_next}">次ページ</a>
				<a href="${url}?pageNum=${ss}"> 最  後 </a>
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
		<td ><input name="bbb" type="button"   value=" 詳細 " onclick="javascript:move1();"/></td>
		<td width=10>&nbsp;&nbsp;</td>
		<td colspan="9" align="right"><font size="4"><a href="./Upload.jsp">アップロードファイル</a></font></td>
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