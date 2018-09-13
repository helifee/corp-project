<%--
 * @(#)Yb0020.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 员工管理
--%>

<%--
 * 员工信息维护画面
 * 
 * @author gaoweiwei
 * @version 1.00 2010/06/25
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
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
    <script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsFileUpload.js"></script>
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath%>js/employee/Yb0020.js"></script>
	
	<title>员工信息维护</title>
</head>
<body onload="init()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div class="ydscontainer" id="empInfo">
	<!--大标题定义-->
    
	<s:form id="mainForm" action="yb0020RegFromMain" method="post" namespace="/employee" validate="true">
		<div id="errorMessage" class="prepend-2 span-22">
			<s:fielderror></s:fielderror>
		</div>
	    <div id="div_empInfo" class="span-24">
	    	<!--个人基本信息-->
	        <div class="span-24 module">
	      		<div class="module_header">
	      		<!-- <span class="img_opt opt_EditTable" ></span> -->
	                <s:label value="个人基本信息" cssClass="font_weight_b font_size_14 prepend-h"/>
	        	</div>
	            <div class="module_body" >
	            	<div class="span-18">
	                	<div class="span-18 last">
	                		<!--员工编号-->
	                        <div class="span-4 text_right"><s:label value="员工编号"/><span class="color_red">*</span></div>
	                        <div class="span-3 append-10">
	                        	<s:textfield id="empIdHid" name="empInfo.empId" maxlength="6" cssClass="span-2" tabindex="1"/>
								<s:hidden id="empImgId" name="empInfo.empImgId" />
		 					</div>
	                    </div>
	                	<div class="span-18 last">
	                		<!--姓名（拼音）-->
	                        <div class="span-4 text_right"><s:label value="姓名（拼音）"/><span class="color_red">*</span></div>
	                        <div class="span-5">
	                        	<s:textfield id="empCpnm" name="empInfo.empCpnm" maxlength="30" cssClass="span-3" tabindex="2"/>
	                        </div>
	                        <!--姓名（拼音首字母）-->
	                        <div class="span-4 text_right"><s:label value="姓名（拼音首字母）"/><span class="color_red">*</span></div>
	                        <div class="span-4">
	                        	<s:textfield id="empCpsnm" name="empInfo.empCpsnm" maxlength="5" cssClass="span-3" tabindex="4"/>
	                        </div>
	                		
	                    </div>
	                	<div class="span-18 last">
	                		<!--姓名（汉字）-->
	                        <div class="span-4 text_right"><s:label value="姓名（汉字）"/><span class="color_red">*</span></div>
	                        <div class="span-5">
	                        	<s:textfield id="empCnm" name="empInfo.empCnm" maxlength="20" cssClass="span-3" tabindex="3"/>
	                        </div>
	                        <!--性别-->
	                        <div class="span-4 text_right"><s:label value="性别"/><span class="color_red">*</span></div>
	                        <div class="span-4">
	                        	<s:radio id="empSex" name="empInfo.empSex" list="sexList" listKey="diffNo" listValue="diffName" value="empInfo.empSex" tabindex="5"/>
	                        </div>
	                		
	                    </div>
	                	<div class="span-18 last">
	                		<!--姓名（日文罗马字）-->
	                        <div class="span-4 text_right"><s:label value="姓名（日文罗马字）"/></div>
	                        <div class="span-5">
	                        	<s:textfield id="empJrnm" name="empInfo.empJrnm" maxlength="30" cssClass="span-4" tabindex="6"/>
	                        </div>
	                        <!--最终学历-->
	                        <div class="span-4 text_right"><s:label value="最终学历"/></div>
	                        <div class="span-4">
	                        	<s:select id="degreeList" name="empInfo.degree" list="degreeList" listKey="diffNo" listValue="diffName" cssClass="span-2" tabindex="9"/>
	                        </div>
	                		
	                    </div>
	                	<div class="span-18 last">
	                		<!--姓名（日文片假名）-->
	                        <div class="span-4 text_right"><s:label value="姓名（日文片假名）"/></div>
	                        <div class="span-5">
	                        	<s:textfield id="empJknm" name="empInfo.empJknm" maxlength="20" cssClass="span-4" tabindex="7"/>
	                        </div>
	                		<!--毕业院校-->
	                        <div class="span-4 text_right"><s:label value="毕业院校"/></div>
	                        <div class="span-4">
	                        	<s:textfield id="graduated" name="empInfo.graduated" maxlength="40" cssClass="span-4" tabindex="10"/>
	                        </div>
	                    </div>
	                	<div class="span-18 last">
	                		<!--姓名（日文汉字）-->
	                        <div class="span-4 text_right"><s:label value="姓名（日文汉字）"/></div>
	                        <div class="span-5 ">
	                        	<s:textfield id="empJnm" name="empInfo.empJnm" maxlength="20" cssClass="span-4" tabindex="8"/>
	                        </div>
	                		<!--所学专业-->
	                        <div class="span-4 text_right"><s:label value="所学专业"/></div>
	                        <div class="span-4">
	                        	<s:textfield id="major" name="empInfo.major" maxlength="30" cssClass="span-4" tabindex="11"/>
	                        </div>
	                    </div>
	                </div>
	                <div class="span-6 last">
	                	<!-- ==============2010/08/03 滕长龙对应无刷新上传 start ===========================-->
	                    <div class="span-6 last text_center">
	                    	
	                    	<div class="span-6 last">
	                    		<img id="empImg" class="empImg" alt="员工照片"></img>
							</div> 
							<div class="span-6 last">
							<input type="file" id="upload" name="upload" class="jsFileInput cur_pointer"/>
							<input type="button" id="uploadButton" name="uploadBtn"  class="span-2 btn margin_top_6 cur_pointer" value="上传照片" />
							<s:hidden id="fileName" name="fileName"/> 
							</div> 
						</div>	
							
						<!-- ==============================================================================
							<div>
						    	<img id="empImg" class="empImg" src="../common/getImage.action?flag=EMP_IMAGE&fileName=${empInfo.empImgId}"/>
							</div>
							<div>
					   			<input type="file" id="upload" name="upload"  class="jsFileInput cur_pointer" />
	                        </div>
							<div>
			        		<input id="filetext" name="ff" class="span-3"/>
						        <input id="buttonDiv" class="span-2 btn" type="button" value="上传照片"  />
			        			<s:label id="uploadWaitInfo" value="上传中，请等待……" cssClass="span-4" /> 			        			
					     	</div>
					    ===================2010/08/03 滕长龙对应无刷新上传 end =============================-->
	                </div>
	            </div>
	        </div>
	        
	    	<!--工作相关信息-->
	        <div class="span-24 module margin_top_6">
	      		<div class="module_header">
	      		<!-- <span class="img_opt opt_EditTable" ></span> -->
	                <s:label value="工作相关信息" cssClass="font_weight_b font_size_14 prepend-h"/>
	        	</div>
	            <div class="module_body" >
	            	<div class="span-24">
		                <div class="span-24 last">
		                    <!--入职日期-->
		                    <div class="span-4 text_right"><s:label value="入职日期"/><span class="color_red">*</span></div>
		                    <div class="span-5">
		                    	<s:textfield id="startDate" name="empInfo.startDate" tabindex="12" maxLength="10" cssClass="span-3" onclick="WdatePicker()"/>
		                    </div>
		                    <!--离职日期-->
		                    <div class="span-4 text_right"><s:label id="lizhi" value="离职日期"/></div>
		                    <div class="span-4">
		                    	<s:textfield id="quitDate" name="endDate" tabindex="13" maxLength="10" cssClass="span-3"/>
		                    </div>
	                        
		                  
		                </div>
		                <div class="span-24 last">
			                <!--员工类别-->
		                    <div class="span-4 text_right"><s:label value="员工类别"/><span class="color_red">*</span></div>
		                    <div class="span-5">
		                        <s:select id="empStatusList" name="empInfo.empStatusId" tabindex="14" list="empStatusList" listKey="diffNo" listValue="diffName" cssClass="span-3" theme="simple"/>
		                    </div>
		                  
		                    <!--员工状态-->
		                    <div class="span-4 text_right"><s:label value="员工状态"/><span class="color_red">*</span></div>
		                    <div class="span-4">
		                    	<s:select id="empStateList" name="empState" tabindex="15" list="empStateList" listKey="diffNo" listValue="diffName" cssClass="span-3" theme="simple"></s:select>
		                   </div>
		                 </div>
		                 <div class="span-24 last">
		                 	<!--所属部门-->
		                    <div class="span-4 text_right"><s:label value="所属部门"/><span class="color_red">*</span></div>
		                    <div class="span-5">
		                    	<s:select id="chargeOrgList" name="empInfo.chargeOrgId" tabindex="16" list="chargeOrgList" listKey="categoryKey" listValue="categoryValue" cssClass="span-3" theme="simple"/>
		                    </div>
			                 <!--担当职位-->
			                 <div class="span-4 text_right"><s:label id="posTypeLabel" value="担当职位"/><span class="color_red">*</span></div>
			                 <div class="span-3 text_left">
			                 	<select id="posType" name="posType" class="span-3"  defaultValue="${posType}" tabindex="17">
			                 		<option>${posType}</option>
			                 	</select>
			                 </div>
			                 <div class="span-3 text_left">
			                 	<select id="posId" name="posId" defaultValue="${posId}" class="span-3">
			                 		<option>${posId}</option>
			                 	</select>
			                 </div>
		                 </div>
		                <div class="span-24 last">
		                    <!--域用户名-->
		                    <div class="span-4 text_right"><s:label value="域用户名"/><span class="color_red">*</span></div>
		                    <div class="span-5">
		                		<%-- 同时进行 --%>
		                    	<s:textfield id="empDmnm" name="empInfo.empDmnm"  tabindex="18" maxlength="25" cssClass="span-4" onkeyup="autoInput()"/>
		                		<%-- 焦点离开时进行 --%>
		                <%--
		                    	<s:textfield id="empDmnm" name="empInfo.empDmnm" maxlength="30" cssClass="span-4" onblur="autoInput()"/>
						--%>
		                    </div>
		                </div>
		                <div class="span-24 last">
		                    <!--内部信箱-->
		                    <div class="span-4 text_right"><s:label value="内部信箱"/><span class="color_red">*</span></div>
		                    <div class="span-5">
		                    	<s:textfield id="empEmailComp" name="empInfo.empEmailComp" tabindex="19" maxlength="25" cssClass="span-3"/>
		                    	<span id="compEmail" class="">@ysys</span>
		                    </div>
		                    <!--外部信箱-->
		                    <div class="span-4 text_right"><s:label value="外部信箱"/></div>
		                    <div class="span-4">
		                    	<s:textfield id="empEmailPub" name="empInfo.empEmailPub" tabindex="20" maxlength="30" cssClass="span-4"/>
		                    </div>
		                </div>
		            </div>
			
	    
				</div>
	    	</div>
	    </div>
	    <div class="prepend-22 span-2 margin_top_6">
	    	<input type="button" id="dosubmit" name="dosubmit" class="btn span-2" value="保存" onclick="saveEmpInfo()" />
	    </div>
	    <!-- 操作模式 -->
        <s:hidden id="mode" name="mode" />
        
        <!-- 隐藏项目 -->
		<s:hidden id="empId" name="empId" />
		<s:hidden id="updateTime" name="empInfo.updateTime" />
	</s:form>
</div>
</body>
</html>