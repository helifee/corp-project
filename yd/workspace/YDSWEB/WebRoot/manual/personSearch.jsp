<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>人员查询</title>
		<!-- 共通css -->
		<link rel="stylesheet" type="text/css" href="../css/gray.css">
		<link rel="stylesheet" type="text/css" href="../css/manual.css">
		<link rel="stylesheet" type="text/css" href="../js/highlighter/highlighter.css">
		<!-- 共通js -->
		<script type="text/javascript" src="../js/common/prototype.js"></script>
		<script type="text/javascript" src="../js/common/util.js"></script>
		<script type="text/javascript" src="../js/highlighter/highlighter.js"></script>
		<script type="text/javascript" src="../js/manual/common.js"></script>
	</head>
	
	<body class="bgclr_gray">
		<table class="mbg">
			<tr>
				<td class="mbg_lt"></td>
				<td class="mbg_t"></td>
				<td class="mbg_rt"></td>
			</tr>
			<tr>
				<td class="mbg_l"></td>
				<td class="mbg_c">		
				<!-- 内容开始 -->		
	
	<jsp:include page="../common/commonPage.jsp"></jsp:include>
	
	<div class="span-18 margin_top_20 prepend-2">
	
		<s:form action="searchPersons" namespace="/manual" method="post">
			<div class="span-5">
				<div class="span-1">ID</div>
				<s:textfield name="personSearchInfo.id"/>
			</div>
			<div class="span-5">
				<div class="span-1">姓名</div>
				<s:textfield name="personSearchInfo.name"/>
			</div>
			
			<div class="span-5">
				<div class="span-1">部门</div>
				<s:textfield name="personSearchInfo.department"/>
			</div>
			
			<div class="span-5">
				<div class="span-1">职位</div>
				<s:textfield name="personSearchInfo.position"/>
			</div>
			
			<div class="span-5">
				<div class="span-1">电话</div>
				<s:textfield name="personSearchInfo.phoneNumber"/>
			</div>
			
			<div class="span-16">
				<div class="float_r">
					<s:submit value="查询" cssClass="imgBtn2"/>
				</div>
			</div>

		</s:form>
		
		<div class="span-16 box_border margin_top_20">

			<table class="datagrid2">
				<tr>
					<th class="percent_16">ID</th>
					<th class="percent_16">姓名</th>
					<th class="percent_16">部门</th>
					<th class="percent_16">职位</th>
					<th class="percent_16">电话</th>
					<th class="">操作 </th>
				</tr>
				
				<s:if test="persons.size > 0">
					<s:iterator value="persons">
						<tr>
							<td class="percent_16 text_center"><s:property value="id" /></td>
							<td class="percent_16"><s:property value="name" /></td>
							<td class="percent_16"><s:property value="department" /></td>
							<td class="percent_16"><s:property value="position" /></td>
							<td class="percent_16 text_center"><s:property value="phoneNumber" /></td>
							<td class="text_center">
								<s:url action="initSearchPerson" id="viewInfoUrl">
									<s:param name="fromId" value="'personSearch'"></s:param>
									<s:param name="personInfo.id" value="id"></s:param>
								</s:url>		
								<s:a href="%{viewInfoUrl}">查看信息</s:a>
							</td>
						</tr>
					</s:iterator>
				</s:if>		
			</table>

		</div>
		<div class="span-16 margin_top_20">
			<p>说明 ： 输入查询条件（例如：ID输入2008，职位输入PG），进行查询后，点击查询结果后的查看信息。</p>
			<p>如果没有数据，使用R:\00_DB设计\11_YDSWEB_DB_DDL\data\man_major_info.sql添加数据。</p>
		</div>
	</div>
	
				<!-- 内容结束 -->	
				</td>
				<td class="mbg_r"></td>
			</tr>
			<tr>
				<td class="mbg_lb"></td>
				<td class="mbg_b"></td>
				<td class="mbg_rb"></td>
			</tr>
		</table>
		<script type="text/javascript">SyntaxHighlighter.config.clipboardSwf="../js/highlighter/scripts/clipboard.swf";SyntaxHighlighter.all();</script>
	</body>
</html>