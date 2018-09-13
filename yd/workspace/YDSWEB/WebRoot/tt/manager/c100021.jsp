<%--
 * @(#)c100021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 共通子系统
--%>

<%--
 * 关键字选择画面（一览JSP）
 * 
 * @author chenjunshuai
 * @version 1.00 2010/3/18
 --%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="../../css/style.css" rel="stylesheet" type="text/css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="../../js/common/prototype.js"></script>
	<script type="text/javascript" src="../../js/common/util.js"></script>
	<script type="text/javascript" src="../../js/common/commonMessage.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="../../js/ttManager/c100021.js"></script>
	
	<title>关键字选择画面</title>
</head>
<body onload="regBtnFunc()" class="showgrid">
<div  class="container"> 　
	<div  class="span-24 padding_top_8 title_tt"><h2>关键字选择画面</h2></div>
	<div id ="divTtKeyList" class="span-23 prepend-h">
		<s:form id ="ttKeySelectForm" action ="" method ="post" >
			<div class="span-23">
				<s:label id="ttKinds" cssClass = "font_size_16" value="类别:"/>
				<s:label id="gateName" cssClass = "font_size_16" name="gateName"/>
			</div>
			<div class="span-20 prepend-h">
				<div class="span-20">
				<s:label id="keyOld" cssClass = "font_size_14" value="用户新输入关键字一览:"/>
				</div>
				<s:if test = "ttKeyInfoListOld.size > 0">
				<s:hidden id="flagOld" value="0"/>
				<div class = "span-21">
					<s:iterator value="ttKeyInfoListOld">
						<div class="span-4"><s:checkbox id="oldDfName" name="oldDfName" fieldValue="%{keywordName}" value="1" />
						<s:property value="keywordName"/></div>
					</s:iterator>					
				</div>
				</s:if>
				<s:else>
					<s:hidden id="flagOld" value="1"/>
				</s:else>
				<div class="span-20 margin_top_6">
					<s:label id="keyNew" cssClass = "font_size_14" value="类别原有关键字:"/>
				</div>
				<div class = "span-21">
					<s:if test="ttKeyInfoList.size > 0">
						<s:hidden id="flag" value="0"/>
						<s:iterator value="ttKeyInfoList">
						<div class="span-4 "><s:checkbox id="ttKeywordName" name="ttKeywordName" fieldValue="%{keywordName}" value="%{flag}" />
						<s:property value="keywordName"/></div>							
						</s:iterator>
					</s:if>
					<s:else>
						<s:hidden id="flag" value="1"/>
					</s:else>
				</div>
			</div>	
				<div class="span-20 margin_top_6 text_center">
					<input type="button" id="refer" name="refer" value="提交" class="span-2 btn"
						onclick="submitKeyStr(this.form,'${keyStrId}')" /> 
					<input type="button" id="cancel"
						name="cancle" value="取消" class="span-2 btn" onclick="closeKey('${keyStrId}')" />
				</div>											
		</s:form>
	</div>
	<div class="clear_both"></div>
</div>
</body>
</html>