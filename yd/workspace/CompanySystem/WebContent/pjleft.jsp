<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib uri="/pager-taglib.tld" prefix="pg"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body background=imag\vb.jpg>
<p><font size=４>管理者情報一覧</font></p>
<script language="JavaScript" type="text/javascript" src="pj.js"></script>
<TABLE align=center width="100%">

	<tr>
		<td align="left"><font size="2"> <SELECT
			style="WIDTH: 80px; HEIGHT: 18PX" name="nd">

			<OPTION VALUE=2001>2001</OPTION>

			<OPTION VALUE=2002>2002</OPTION>

			<OPTION VALUE=2003>2003</OPTION>

			<OPTION VALUE=2004>2004</OPTION>

			<OPTION VALUE=2005>2005</OPTION>

			<OPTION VALUE=2006>2006</OPTION>

			<OPTION VALUE=2007>2007</OPTION>

			<OPTION selected VALUE=2008>2008</OPTION>

		</SELECT></font><font size="4">年</font></td>

		<td align="left"><s:submit value="検索" onclick="ndsearch();"></s:submit></td>
		<td align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		<td align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		<td align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		<td align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		<td align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>

		<td></td>
	</tr>
</table>
<table border="1" width="100%">
	<tr>
		<td align="center">プロジェクト番号</td>
		<td align="center">プロジェクト主管者</td>
		<td align="center">お客さん</td>
		<td align="center">日本語名称</td>
		<td align="center">実際開始日</td>
		<td align="center">実際終了日</td>
	</tr>
	<s:iterator value="pjs" status="st">
		<tr>

			<td align="center"><s:property value="projectid_a" /></td>
			<td align="center"><s:property value="muserid_a" /></td>
			<td align="center"><s:property value="kyakuname_a" /></td>
			<td align="center"><s:property value="prjmei_a" /></td>
			<td align="center"><s:property value="startdate_a" /></td>
			<td align="center"><s:property value="enddate_a" /></td>

			<td align="center"><a
				href="javascript:research('<s:property value="projectid_a"/>')">詳細</a></td>
			<td align="center"><a
				href="javascript:remove('<s:property value="projectid_a"/>')">削除</a></td>



		</tr>
	</s:iterator>


	<s:hidden name="key_hidden" id="hidden1" />
<!-- ****************************** -->
 <tr align="right">
    	<td colspan="9">
    		共<s:property value="totalRows"/>行&nbsp;
    		第<s:property value="currentPage"/>页&nbsp;
    		共<s:property value="pager.getTotalPages()"/>页&nbsp;
    		<a href="<s:url value="searchPageAction.action">
    			<s:param name="currentPage" value="currentPage"/>
    			<s:param name="pagerMethod" value="'first'"/>
    			
    		</s:url>">首页</a>
    		<a href="<s:url value="searchPageAction.action">
    			<s:param name="currentPage" value="currentPage"/>
    			<s:param name="pagerMethod" value="'previous'"/>
    		</s:url>">上一页</a>
    		<a href="<s:url value="searchPageAction.action">
    			<s:param name="currentPage" value="currentPage"/>
    			<s:param name="pagerMethod" value="'next'"/>
    		</s:url>">下一页</a>
    		<a href="<s:url value="searchPageAction.action">
    			<s:param name="currentPage" value="currentPage"/>
    			<s:param name="pagerMethod" value="'last'"/>
    		</s:url>">尾页</a>
    	</td>
    </tr>	
	<tr>

		<td align="left" width=750 colspan=9><s:submit value="新規"
			onclick="superuser05_init();"></s:submit></td>
	</tr>
</table>

</body>
</html>