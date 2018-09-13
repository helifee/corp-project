<%--
 * @(#)g010021.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 权限管理
--%>

<%--
 * 权限管理画面
 * 
 * @author guozhizhou
 * @version 1.00 2010/03/12
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- 共通css -->
<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
<!-- 共通js -->
<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/JsInputFilter.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>
<script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>
<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath%>js/ttManager/ttCommon.js"></script>
<script type="text/javascript" src="<%=basePath%>js/ttManager/g010021.js"></script>
<title>权限管理</title>
</head>
<body onload="G010021initForm()">
<%-- 生成校验js action="g010021Action" method="post" namespace="/tt/manager" validate="true" --%>
<%-- 正式运行用   action="" method="post"  --%>
<div id="all" class="container showgrid">
<div id="div_head">
	<s:include value="../manager/head.jsp" />
</div>
<div class="container span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
	<s:include value="../manager/navigator.jsp" />
    <div class="span-24 padding_top_8 title_tt"><h2>权限管理</h2></div>
       	<!-- 舌签分页显示 -->
	   	<div class="prepend-h span-23 last">
       	<div class="nTab">
     		<div class="TabTitle">
     			<s:hidden id="parameter" name="parameter"/>
	            <ul id="myTab0">
	                <li class="active" onclick="search(this,0);" id="tab0"">维护权限分配</li>
	                <li class="normal" onclick="searchOther(this,1);"  id="tab1">其他权限分配</li>
	                <li class="normal" onclick="searchPassword(this,2);"  id="tab2">密码维护</li>
	            </ul>
          	</div>
            <div class="TabContent">
                <div id="myTab0_Content0" class="TabbedPanelsContent">
            	 	<!-- 维护权限分配 -->
                	<s:form id="maintenanceFrom" action="g010021AddMaintPerm" method="post" validate="true">
	               	<!-- 权限申请查看按钮 -->
                    <div class="prepend-20 span-3 append-1 margin_top_10 last">
                   		<input type="button" id="application" class="btn" onclick="openApplication('../../tt/manager/g010021InitPermRequestList.action');" value="权限申请查看">
                    </div>
                    <!-- 分类选择 -->
                    <div class="span-23 margin_top_6">
                        <div class="span-3 text_right">分类选择:</div>
						<!--分类选择-->
						<div class="span-12 text_left">
						<select class="span-3" id="sltCategory1" type="category1Id" name="category1Id" ></select>
						<select class="span-3" id="sltCategory2" type="category2Id" name="category2Id"></select>
						<select class="span-3" id="sltCategory3" type="category3Id" name="category3Id"></select>		
						</div>
                    </div>
                    <!-- 权限选择 -->
                    <div class="span-23 margin_top_6">
						<div class="span-3 text_right">权限选择:</div>
        				<s:select id="authorityList"  cssClass="span-3"
							list="authorityList" listValue="diffName" listKey="diffNo" name="authorityId" />
					</div>
                    <!-- 管理员选择 -->
                    <div class="span-23 margin_top_6">
                        <div class="span-3 text_right">管理员选择:</div>
                        <s:textfield id="userIdNum_0" name="g010021aInfo.userIdNum" cssClass="span-2" maxlength="6" />
						<s:textfield id="userNm_0" name="g010021aInfo.userNm" cssClass="span-2"/>
					</div>
                    <!-- 有效日期 -->
                    <div class="span-23 margin_top_6">
                        <div class="span-3 text_right">有效期间:</div>
                        <s:textfield id="startTimeNm_0" name="g010021aInfo.startTimeNm" cssClass="span-2" maxlength="10" onclick="WdatePicker()" /> 
					    <s:label value="～" /> 
					    <s:textfield id="endTimeNm_0" name="g010021aInfo.endTimeNm" cssClass="span-2"  maxlength="10" onclick="WdatePicker()" />
                    </div>
                    <!-- 添加 清空按钮 -->
                    <div class="span-23 append-1 margin_top_6 last">
                    <div class="prepend-9 span-2">
                        <input type="button" id="add" class="span-2 btn" onclick="submitCreate(0)" value="添加">
                    </div>
                    <div class="prepend-1 span-2 append-9 last">
                        <input type="button" id="qk" class="span-2 btn" onclick="maintenanceClear()" value="清空">
                    </div>
                    </div>
					</s:form>
                    <div class="span-23 margin_top_10" id="table_dateAList">
                        <s:include value="g010021_maintenance_jurisdiction_table.jsp" />
					</div>
				</div>
                <!-- 其他权限分配 -->
                <div id="myTab0_Content1" style="display:none;" class="TabbedPanelsContent">
                    <!-- 管理员选择 -->
                    <s:form id="otherJurisdictionForm" action="g010021AddOtherPerm" method="post" validate="true">
                    <div class="span-24 margin_top_10">
                        <div class="span-3 text_right">管理员选择:</div>
                       	<s:textfield id="userIdNum_1" name="g010021aInfo.userIdNum" cssClass="span-2" maxlength="6" />
                       	<s:textfield id="userNm_1" name="g010021aInfo.userNm" cssClass="span-2"/>
                    </div>
                    <!-- 权限选择 -->
                    <div class="span-24 margin_top_6">
						<div class="span-3 text_right">权限选择:</div>
        				<s:select id="authorityOtherList" cssClass="span-3"
							list="authorityOtherList" listValue="diffName" listKey="diffNo" name="authorityId"/>
                    </div>
                    <!-- 有效日期 -->
                    <div class="span-24 margin_top_6">
                        <div class="span-3 text_right">有效期间:</div>
                        <s:textfield id="startTimeNm_1" name="g010021aInfo.startTimeNm" cssClass="span-2"  maxlength="10" onclick="WdatePicker()" /> 
					    <s:label value="～" /> 
					    <s:textfield id="endTimeNm_1" name="g010021aInfo.endTimeNm" cssClass="span-2"  maxlength="10" onclick="WdatePicker()" />
                    </div>
                    <!-- 添加 清空按钮 -->
                    <div class="span-23 append-1 margin_top_6 last">
                        <div class="prepend-9 span-2">
                        	<input type="button" id="addOther" class="span-2 btn" onclick="submitCreateOther(1);" value="添加">
                        </div>
                        <div class="prepend-1 span-2 append-9 last">
                        	<input type="button" id="resetOther" class="span-2 btn" onclick="otherJurisdictionClear()" value="清空">
                        </div>
                    </div>
					</s:form>
                    <div class="span-24 margin_top_10" id="table_dateOtherList">
                    	<s:include value="g010021_other_jurisdiction_table.jsp" />
					</div>
                </div>
                <!-- 密码维护 -->
				<div id="myTab0_Content2" style="display:none;" class="TabbedPanelsContent">
					<s:include value="g010021_password_maintenance.jsp" />
               	</div>
	   		</div>
		</div>
	</div>
	<div class="clear_both"></div>
	</div>
	<s:include value="../manager/foot.jsp" />　
</div>
</div>
</body>
</html>