<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>人员选择</title>
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
	
	<div class="title"><h2>人员选择</h2></div>
	
	<div class="span-18 margin_top_20 prepend-2">
	
		<s:form action="selectSearch" namespace="/manual" method="post">
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
		
		<s:form action="selectSubmit" namespace="/manual" method="post">
			<div class="span-16 box_border margin_top_20">
	
				<table class="datagrid2">
					<tr>
						<th class="percent_10"></th>
						<th class="percent_18">ID</th>
						<th class="percent_18">姓名</th>
						<th class="percent_18">部门</th>
						<th class="percent_18">职位</th>
						<th>电话</th>
					</tr>
					
					<s:if test="persons.size > 0">
						<s:iterator value="persons">
							<tr>
								<td class="percent_10 text_center">
									<s:checkbox name="selectPersonId" fieldValue="%{id}"></s:checkbox>
								</td>
								<td class="percent_18 text_center"><s:property value="id" /></td>
								<td class="percent_18"><s:property value="name" /></td>
								<td class="percent_18"><s:property value="department" /></td>
								<td class="percent_18"><s:property value="position" /></td>
								<td class="text_center"><s:property value="phoneNumber" /></td>
							</tr>
						</s:iterator>
					</s:if>		
				</table>
	
			</div>
			<div class="span-16 margin_top_20">
				<div class="float_r">
					<s:submit value="确认选择" cssClass="imgBtn2"/>
				</div>
			</div>
		</s:form>
		
		<div class="span-16 margin_top_20">
			<p>说明 ： 查询后，选择查询结果，点击“确认选择”，返回前页面，输入数据会被还原。</p>
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