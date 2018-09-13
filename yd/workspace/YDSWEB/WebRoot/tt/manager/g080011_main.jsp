<%--
 * @(#)g80011_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理
--%>

<%--
 * 系统维护画面（主画面JSP）
 * 
 * @author zhanghaibo
 * @version 1.00 2010/04/20
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>系统维护</title>
<link rel="stylesheet" type="text/css" href="<%=basePath%>${session.userTheme}">
<link rel="stylesheet" type="text/css" href="<%=basePath%>js/tafelTree/css/tree.css" />
<!-- 共通js -->
<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/formValidation.js"></script>
<script type="text/javascript" src="<%=basePath%>js/ttManager/ttCommon.js"></script>

<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath%>js/ttManager/g080011.js"></script>
<script type="text/javascript" src="<%=basePath%>js/tafelTree/Tree.js"></script>
<script type="text/javascript" src="<%=basePath%>js/tafelTree/js/scriptaculous.js"></script>
</head>
<body onload="initMain()">
<div id="div_ttManager_systemMaintain" class="container showgrid">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
	
	<div class="padding_top_8 title_tt span-24">
		<h2>系统维护</h2>
	</div>
	
	<div class="prepend-h span-23 last">
	<div class="nTab ">
	
		<!-- 选项卡头部 -->
		<div class="TabTitle span-23">
			<s:hidden id="systemStatus" name="systemStatus"/>
			<s:hidden id="editAutority" name="editAutority"/>
			<s:hidden id="errorMessage" name="errorMessage"/>
			<s:form id="resetForm" validate="true" action="g080011InitSystemMaintain"></s:form>
			<div class="span-20">
		        <ul id="tab">
		            <li class="active" onclick="initCategory(this,0);">
		            	<s:label value="类别表设置" />
		            </li>
		            <li class="normal" onclick="initDiff(this,1);">
		            	<s:label value="区分表设置" />
		            </li>
		            <li class="normal" onclick="initUnconfData(this,2);">
		            	<s:label value="不整合数据" />
		            </li>
		        </ul>
	        </div>
	        <div class="span-3 last">
	        		<input class="span-2 btn" id="startMaintBtn" type="button"
						value="开始维护" onclick="startMaint()" /> 
	        	
					<input class="span-2 btn" id="stopMaintBtn" type="button" 
						value="结束维护" onclick="stopMaint()" />
			</div>
        </div>
		
		<!-- 选项主体 -->
		<div class="TabContent">
		
			<!-- 类别表设置 -->
			<div id="tab0" class="TabbedPanelsContent">
				<div class="span-16">
				
					<!-- 类别编辑块 -->
					<div class="span-16 prepend-h">
						<s:form id="categoryEditForm" validate="true" >
							<div class="span-16 last">
								<s:hidden id="editFlag"/>
								<s:hidden id="selectedBranch" name="selectedBranch"/>
								<s:hidden id="changeStatus" />
								<s:hidden id="updateCount" />
								<div class="span-3">
									<input class="span-3 btn" id="createRootBtn" type="button" 
										value="新建一级类别" onclick="createRoot();"/>
								</div>
								<div class="span-2">
									<input class="span-2 btn" id="createChildBtn" type="button" 
										value="新建子类别" onclick="createChild();"/>
								</div>
								<div class="span-2">
									<input class="span-2 btn" id="modifyBtn" type="button" 
										value="修改" onclick="modify();"/>
								</div>
								<div class="span-2">
									<input class="span-2 btn" id="deleteBtn" type="button" 
										value="删除类别" onclick="deleteCategory();"/>
								</div>
								<div class="span-2 last">
									<input class="span-2 btn" id="undoBtn" type="button" 
										value="取消删除" onclick="undo();"/>
								</div>
							</div>
							<div class="span-16 last margin_top_10 ">
								<div class="span-2 text_right">
									<s:label value="类别名称：" />
								</div>
								<div class="span-6">
									<s:textfield id="categoryName" name="categoryName1" 
										maxlength="40" cssClass="span-6" />
								</div>
								<div class="span-2 last">
									<input class="span-2 btn" id="dataSubmitBtn" type="button" 
										value="确定" onclick="dataSubmit();" />
								</div>
								
							</div>
						</s:form>
					</div>
					
					<!-- 不整合数据统计块 -->
					<div class="span-16 margin_top_20 prepend-h">
						<div class="span-15 title_3 text_left ">
							<s:label cssClass=" title_2" value="不整合数据统计："/>
						</div>
						<div class="span-15 margin_top_6">
							<table class="datagridtt">
								<tr>
									<th class="percent_40">不整合类别</th>
									<th class="percent_10">权限</th>
									<th class="percent_10">课程</th>
									<th class="percent_10">教材</th>
									<th class="percent_10">考试</th>
									<th class="percent_10">试卷</th>
									<th class="percent_10">试题</th>
								</tr>
							</table>
					  	</div>
					  	<div id="div_unconformityList" class="span-15 last">
							<s:include value="g080011_unconformity_list.jsp"/>
						</div>
					</div>
				</div>
				
				<!-- 树形列表块 -->
				<div id="categoryTree" class=" line_h t_auto span-7 last">
					
				</div>
			</div>
			
			<!-- 区分表设置 -->
			<div id="tab1" class="TabbedPanelsContent none">
			
				<!-- 区分一览块-->
				<div class="span-12 prepend-h">
					<div class="span-12 title_3 text_center ">
						<s:label cssClass=" title_2" value="区分表一览"/>
					</div>
					<div class="span-12 margin_top_6">
						<table class="datagridtt ellipsis">
							<tr>
								<th class="percent_20">区分ID</th>
								<th class="percent_50">区分名称</th>
								<th class="percent_30">操作</th>
							</tr>
							<s:if test="diffList.size > 0">
								<s:iterator value="diffList" status="stat">
									<tr>
										<td class="text_center">
											<s:property value="typeId"/>
										</td>
										<td>
											<s:label title="%{typeName}" name="typeName"/>
										</td>
										<td class="text_center">
											<a class="cur_pointer" onclick="getDiffDetails('${typeId}','${typeName}');" >查看/修改</a>
										</td>
									</tr>
								</s:iterator>
							</s:if>
						</table>
				  	</div>
				</div>
				
				<!-- 区分编辑块-->
				<div id="div_diffEdit" class="span-10 last">
					<s:include value="g080011_diff_edit.jsp"/>
				</div>
			</div>
			
			<!-- 不整合数据 -->
			<div id="tab2" class="TabbedPanelsContent none">
				<div class="prepend-2 span-23 title_3 text_left last ">
					<s:label cssClass=" title_2" value="不整合数据一览："/>
				</div>
				<div class="prepend-5 span-15 margin_top_6 text_center last ">
					<table class="datagridtt">
						<tr>
							<th class="percent_14">对象ID</th>
							<th class="percent_30">对象名</th>
							<th class="percent_10">对象类别</th>
							<th class="percent_30">不整合分类</th>
							<th class="percent_16">创建时间</th>
						</tr>
					</table>
			  	</div>
				<div id="div_unconfData_list" class="prepend-5 span-15  last ">
					<s:include value="g080011_unconformity_data_list.jsp"/>
				</div>
				
			</div>
		</div>
	</div>
	</div>
	<div class="prepend-2">
	<s:fielderror></s:fielderror>
	</div>
	<div class="clear_both"></div>
</div>
</div>
<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>