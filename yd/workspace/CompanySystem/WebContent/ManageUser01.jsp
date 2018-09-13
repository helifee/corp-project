<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="/pager-taglib.tld" prefix="pg"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理者初期画面（張瑜）</title>
<script language="JavaScript" type="text/javascript" src="Login.js"></script>
</head>
<body background=imag\vb.jpg>
<s:form >
<p ><font size=4 >該当ユーザー所属プロジェクト一覧</font></p>
<TABLE align=center border=1 width="100%"　CELLSPACING=0>
 <tr>
 　　　　　　　　　　<td align=CENTER width="160" height="40" >プロジェクトID</td>
            <td align=CENTER  width="160" >日本語名称</td>
            <td align=CENTER  width="160">リーダー     </td>
            <td align=CENTER  width="160">客様</td>
            <td align=CENTER  width="160">実際開始日   </td>
            <td align=CENTER width="160">実際終了日 </td>
            <td align=CENTER   width="80">工数    </td>
             <td align=CENTER  width="160" >英語名称</td>
            <td align=CENTER  width="120" >中国語名称</td> 
            <td align="center"  width="80">EDIT</td> 
      </tr>
      <s:iterator value="PJIN" status="st">
        <tr <s:if test="#st.odd"> </s:if>>
        	
           	<td align="center"  width="160"  height="40"> <s:property value="projectid_a"/> </td>
            <td align="center"   width="160"> <s:property value="prjmei_a"/> </td>
            <td align="center"  width="160" > <s:property value="username_a"/> </td>
            <td align="center"  width="160" > <s:property value="kyakuname_a"/> </td>
            <td align="center" width="160" > <s:property value="startdate_a"/> </td>
            <td align="center"  width="160"> <s:property value="enddate_a"/> </td>
           	<td align="center"  width="80"> <s:property value="usernum_a"/> </td>
           	<td align="center"   width="160"> <s:property value="projecttyuname_a"/> </td>
            <td align="center"  width="120"> <s:property value="projecteiname_a"/> </td>
            <td align="center" width="80"> <a href="javascript:move('<s:property value="projectid_a"/>')">詳細</a></td>
        </tr>
	</s:iterator>
<tr>
	
	 <td width="135" colspan=1 align="right">
	
	 
	<input type="button" value="Excelに出力" name="B1" onclick="outputExcel1()"></td>
	 	
	 

</tr>
<!-- 列表数据栏 -->
	<c:if test="${!empty PJIN}">
		<!-- 这里就是要显示的数据了 -->
	</c:if>
	<!-- 可以在这里插入分页导航条 -->
	<pg:pager items="${cnt0}"  maxIndexPages="5"
		maxPageItems="5">
		<pg:first>
			<s:url id="url_pre" value="url_pre">

			</s:url>
		</pg:first>
		<pg:last>
			<s:url id="url_next"  value="url_next">
			</s:url>
		</pg:last>
	
総計${cnt0}レコード   
　　総計${ss}頁   
<%-- 如果当前页码是第一页,则"上一页"和"首页"按钮不可用; --%>

		<c:choose>
			<c:when test="${pageNum==1}"> 
　　先  頭   前ページ    
</c:when>
			<c:otherwise>
				<a href="<s:property value="url_pre"/>?pageNum=1&&pagenum=1">先  頭 </a>
				<a href="<s:property value="url_pre"/>?pageNum=<s:property value="pagenum"/>">前ページ </a>
			</c:otherwise>
		</c:choose>
		<c:forEach begin="${i+1}"
			end="${ss}" var="i" step="1">
			<c:choose>
				<c:when test="${pageNum!=i}">
					<a href="<s:property value="url"/>?pageNum=${i}">${i}</a>
				</c:when>
				<c:otherwise> 
<font color="red">${i}</font>
</c:otherwise>
			</c:choose>
		</c:forEach> 	
		<%-- 如果当前页码是最后页,则"下一页"和"尾页"按钮不可用; --%>
		<c:choose>
			<c:when test="${pageNum==ss}"> 
　　次ページ   最  後    
</c:when>
			<c:otherwise>
				<a href="<s:property value="url_next"/>?pageNum=<s:property value="pagenum"/>">次ページ</a>
				<a href="<s:property value="url_next"/>?pageNum=${ss}&&pagenum=${ss}">最  後</a>
			</c:otherwise>
		</c:choose>
	
	</pg:pager>
	<!-- 在列表数据为空的时候，要显示的提示信息 -->
	<c:if test="${empty PJIN}">
		<tr>
			<td colspan="5">相応のデータを探し当てていません！</td>
		</tr>
	</c:if>
	
</TABLE>
<s:hidden name="key_hidden" id="hidden1" />

<p ><font size=4 >管理者担当プロジェクト一覧</font></p>
<TABLE align=center border=1 width="100%"　CELLSPACING=0>


    <tr>
     <td align="left" width=%15>
     
		<s:select name="year"  list="{'2008','2007','2006','2005','2004','2003','2002','2001'}" ></s:select><font  size="2">年</font>
	   
	</td>
	<td align="left" width=15%><s:submit name="sub" value="検索" onclick="se();"></s:submit></td>
    </tr>
 

     <tr>
            <td align=CENTER  height="40">プロジェクトID</td>
            <td align=CENTER >日本語名称</td>
            <td align=CENTER >リーダー     </td>
            <td align=CENTER  >客様</td>
            <td align=CENTER  >実際開始日 </td>
            <td align=CENTER  >実際終了日</td>
            <td align=CENTER   >工数         </td>
           	<td align=CENTER  >英語名称</td> 
            <td align=CENTER  >中国語名称</td>
            <td align="center" >EDIT</td> 
      </tr>
   <s:iterator value="PJ" status="st">
        <tr <s:if test="#st.odd"></s:if>>
        	
           	<td align="center"height="40" > <s:property value="projectid_b"/> </td>
            <td align="center" > <s:property value="prjmei_b"/> </td>
            <td align="center" > <s:property value="username_b"/> </td>
            <td align="center" > <s:property value="kyakuname_b"/> </td>
            <td align="center" > <s:property value="startdate_b"/> </td>
            <td align="center" > <s:property value="enddate_b"/> </td>
           	<td align="center" > <s:property value="usernum_b"/> </td>
           	<td align="center" > <s:property value="projecteiname_b"/> </td>
           	<td align="center" > <s:property value="projecttyuname_b"/> </td>
            
            <td align="center" > <a href="javascript:detail('<s:property value="projectid_b"/>')">edit</a></td>
       
        </tr>
        
	</s:iterator> 
<!-- 列表数据栏 -->
	<c:if test="${!empty PJ}">
		<!-- 这里就是要显示的数据了 -->
			<pg:pager items="${cnt2}"  maxIndexPages="5"
		maxPageItems="5">
		<pg:first>
			<s:url id="url_pre" value="url_pre1">
			
			</s:url>
		</pg:first>
		<pg:last>
			<s:url id="url_next" value="url_next2">
				
			</s:url>
		</pg:last>
	
総計 ${cnt2}レコード  
　　総計 ${ss2}頁    
<%-- 如果当前页码是第一页,则"上一页"和"首页"按钮不可用; --%>

		<c:choose>
			<c:when test="${pageNum1==1}"> 
　　先  頭  前ページ   
</c:when>
			<c:otherwise>
				<a href="<s:property value="url_pre1"/>?pageNum1=1&&pagenum1=1">先  頭</a>
				<a href="<s:property value="url_pre1"/>?pageNum1=<s:property value="pagenum1"/>">前ページ</a>
			</c:otherwise>
		</c:choose>
		<c:forEach begin="${i+1}"
			end="${ss2}" var="i" step="1">
			<c:choose>
				<c:when test="${pageNum!=i}">
					<a href="${url}?pageNum1=${i}">${i}</a>
				</c:when>
				<c:otherwise> 
<font color="red">${i}</font>
</c:otherwise>
			</c:choose>
		</c:forEach> 	
		<%-- 如果当前页码是最后页,则"下一页"和"尾页"按钮不可用; --%>
		<c:choose>
			<c:when test="${pageNum1==ss2}"> 
　　次ページ   最  後    
</c:when>
			<c:otherwise>
				<a href="<s:property value="url_next1"/>?pageNum1=<s:property value="pagenum1"/>">次ページ</a>
				<a href="<s:property value="url_next1"/>?pageNum1=${ss2}$$pagenum1=${ss2}">最  後</a>
			</c:otherwise>
		</c:choose>
	
	</pg:pager>	
	</c:if>
	<!-- 在列表数据为空的时候，要显示的提示信息 -->
	<c:if test="${empty PJ}">
		<tr>
			<td colspan="5">相応のデータを探し当てていません！</td>
		</tr>
	</c:if>
	<!-- 可以在这里插入分页导航条 -->

</TABLE>
<s:hidden name="key_hidden1" id="hidden2" />
</s:form>
</body>
</html>