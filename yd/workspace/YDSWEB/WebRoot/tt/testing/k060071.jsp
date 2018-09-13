<%--
 * @(#)k060071.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试详细（管理）
 * 
 * @author zhangaijun
 * @version 1.00 2010/04/12
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>	
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>考试详细(管理)</title>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	
	 <!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
    <script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
 	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>   
	
	<!-- 画面用js -->
    <script type="text/javascript" src="<%=basePath %>js/ttTesting/k060071.js"></script>
</head>

<body class="font_size_12" onload="initForm()">
<div class="container showgrid">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
	<%-- 生成校验js action="updateCourseInfoJ020031Action" method="post" namespace="/tt/training" validate="true" --%>
	<%-- 正式运行用   id="courseInfoForm" action="" method="post"  --%>
	<s:form id="TestInfoForm" action="" method="post" validate="true">
		<div class="span-24">
			<div class="padding_top_8 title_tt span-24">
				<h2>考试详细</h2>
			</div>
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="状态："/></div>
				<!--审批状态-->
				<div class="span-12 text_left">
					<!--审批状态ID-->
					<s:hidden id="examineStatus" name="examineInfo.examineStatus" />
					<s:label id="examineInfo.examineStatusName" name="examineInfo.examineStatusName" keep="1"/>
				</div>
			</div>                 
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试ID："/></div>
				<!--考试ID-->
				<div class="span-12 text_left">
					<s:hidden id="examineId" name="examineInfo.examineId" />
					<s:hidden id="paramTestId" name="paramTestId" />
					<s:hidden id="parentExamineId" name="examineInfo.parentExamineId" />
					<s:hidden id="examineInfo.examineVisibleFlg" name="examineInfo.examineVisibleFlg" />
					
					
					<!--画面操作模式-->
					<s:hidden id="operatMode" name="operatMode" />
					<!--考试标志区分-->
					<s:hidden id="examineFlg" name="examineInfo.examineFlg" />
					<s:property value='examineInfo.examineId'/>
				</div>
			</div>
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试名称："/></div>
				<!--考试名称-->
  				<div class="span-18 text_left">
          			<s:textfield id="examineName" maxlength="200" name="examineInfo.examineName" cssClass="span-10" />
     			</div>
			</div>
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试说明："/></div>
				<!--考试说明-->
				<div class="span-18 text_left">
				  <s:textarea name="examineInfo.examineComment" rows="3" cssClass="span-10" id="examineComment"/>
				</div>
			</div>
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试分类："/></div>
				<!-- 一级分类ID -->
              		<s:hidden id="category1Id" name="examineInfo.category1Id" />
              		<!-- 二级分类ID -->
              		<s:hidden id="category2Id" name="examineInfo.category2Id" />
              		<!-- 三级分类ID -->
              		<s:hidden id="category3Id" name="examineInfo.category3Id" />
				<!--考试分类-->
				<div class="span-12 text_left"><s:label id="examineInfo.categoryName" name="examineInfo.categoryName" keep="1"/></div>
			</div>
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试类型："/></div>
				<!--考试分类-->
				<div class="span-12 text_left"><s:label id="examineInfo.examineFlgName" name="examineInfo.examineFlgName" keep="1"/></div>
			</div>
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试时间："/></div>
				<!--考试时间-->
				<div class="span-12 text_left">
					<s:textfield id="examineInfo.examineTime" cssClass="span-1" name="examineInfo.examineTime" maxLength="3" disabled="true" onblur="resetExamineEndTime()"/>
					<s:label value="分钟"/>
				</div>
			</div>
			<div class="span-24">
			<s:if test="examineInfo.examineFlg == 2">
				<div class="span-3 text_right"><s:label value="考试开始日期："/></div>
			</s:if>
			<s:if test="examineInfo.examineFlg != 2">
				<div class="span-3 text_right"><s:label value="考试日期："/></div>
			</s:if>
				<!--考试开始日期-->
				<div class="span-12 text_left">
					<s:textfield onclick="WdatePicker({minDate:'%y-%M-{%d+3}'});setDate('%{examineInfo.examineFlg}')"
					cssClass="span-2" maxlength="10" id="examineStartDate" name="examineInfo.examineStartDate"/>
				</div>
			</div>
			<!--如果考试标志是<随时考试>时不可见-->
			<s:if test="examineInfo.examineFlg != 2">
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试开始时刻："/></div>
				<!--考试开始时刻-->
			  <div class="span-12 text_left">
			   	<s:textfield onclick="WdatePicker({dateFmt:'HH:mm'})" onblur="resetExamineEndTime()"
			   	cssClass="span-2" id="examineStartTime" maxlength="5" name="examineInfo.examineStartTimeStr"/><s:label value="(不填默认为00:00)"/>
			  </div>
			</div>
			</s:if>
			<!--如果考试标志是<随时考试>时可见-->
			<s:if test="examineInfo.examineFlg == 2">					
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试结束日期："/></div>
				<!--考试结束日期-->
				<div class="span-12 text_left">
				<s:textfield onclick="WdatePicker()" cssClass="span-2" maxlength="10" id="examineEndDate" name="examineInfo.examineEndDate"/></div>
			</div>
			</s:if>
			<!--如果考试标志是<随时考试>时不可见-->
			<s:if test="examineInfo.examineFlg != 2">
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试结束时刻："/></div>
				<!--考试结束时刻-->
			  <div class="span-12 text_left"> 
			  	<s:textfield cssClass="span-2 disabled" maxlength="5" id="examineEndTime" readonly="true" name="examineInfo.examineEndTimeStr"/>
			  </div>
			</div>
			</s:if>

			<!--如果考试标志是<普通考试>时可见-->
			<s:if test="examineInfo.examineFlg == 1">
                  <div class="span-24">
				<div class="span-3 text_right"><s:label value="报名截止日期："/></div>
				<!--报名截止日期-->
				<div class="span-12 text_left">
				<s:textfield onclick="WdatePicker({minDate:'%y-%M-{%d+2}',maxDate:g_maxDate_applyClosing});setDate('%{examineInfo.examineFlg}')" 
				cssClass="span-2" maxlength="10" name="examineInfo.applyClosingDate" id="applyClosingDate"/></div>
				
			</div>
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="报名截止时刻："/></div>
				<!--报名截止时刻-->
			  	<div class="span-12 text_left"> 
			  		<s:textfield onclick="WdatePicker({dateFmt:'HH:mm'})"
			  		cssClass="span-2" id="applyClosingTime" maxlength="5" name="examineInfo.applyClosingTimeStr"/><s:label value="(不填默认为23:59)"/>
			  	</div>
				</div>
			</s:if>

			<!--如果考试标志是<试考试>时不可见-->
			<s:if test="examineInfo.examineFlg != 3">
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="通知提醒日期："/></div>
				<!--通知提醒日期-->
				<div class="span-12 text_left">
				<s:textfield onclick="WdatePicker({minDate:'%y-%M-{%d+1}',maxDate:g_maxDate_Notify})" 
				cssClass="span-2" maxlength="10" name="examineInfo.examineNotifyDate" id="examineNotifyDate"/></div>
			</div>
			</s:if>
			
			<div class="span-24 ">
				<div class="span-3 text_right"><s:checkbox name="ckbCheckAnswerFlg" fieldValue="true" id="checkAnswerFlg"/></div>
				<!--考试时间-->
				<div class="span-12 text_left"><s:label value="允许考生在考试成绩发布后查看标准答案"/></div>
			</div>
           	<div class="span-24">
				<div class="span-3 text_right"><s:checkbox name="ckbMustExamineFlg" fieldValue="true" id="mustExamineFlg"/></div>
				<!--考试时间-->
				<div class="span-12 text_left"><s:label value="对象必须参加考试"/></div>
			</div>
            <div class="span-24">
				<div class="span-3 text_right"><s:checkbox name="ckbApplyConfirmFlg" fieldValue="true" id="applyConfirmFlg" /></div>
                <div class="span-21 last">
					<s:label value="报名需批准"/>
				</div>
			</div>    
			
            <div class="span-24">
				<div class="span-3 text_right append-8">
					<s:label value="评定等级："/>
				</div>
                <div class="span-3 ">
					<s:label value="考试通过档次："/>
				</div>
            	<div class="span-2">
                	<s:label value="第"/><s:label id= "examineInfo.passexamineLevel" name="examineInfo.passexamineLevel" keep="1"/><s:label value="档"/>
				</div>
			</div>
            <div class="span-24">
            	<s:hidden id="resultlevelNum" name="examineInfo.resultlevelNum"></s:hidden>
				<div class="span-3 text_right">
					<s:label value="档次1："/>
				</div>
                <div class="span-2">
					<s:label id= "examineInfo.resultlevel1Name" name ="examineInfo.resultlevel1Name" keep="1"/>
				</div>
                <div class="span-1">
                <!-- wanqiuhong 10/13 修改:label更改成 textfield
               	 <s:label id= "examineInfo.resultlevel1Score" name ="examineInfo.resultlevel1Score" keep="1"/>
                -->	
	                <s:if test="examineInfo.resultlevelNum == 2">									
						<s:textfield id="resultlevel1Score" maxlength="3" name="examineInfo.resultlevel1Score" cssClass="span-1 text_right padding_right_2" onblur="chageValue();"/>
					</s:if>
					<s:else>
						<s:textfield id="resultlevel1Score" maxlength="3" name="examineInfo.resultlevel1Score" cssClass="span-1 text_right padding_right_2"/>
					</s:else>
				</div>
                <div class="last">
					<s:label value="分以上"/>
				</div>
            </div>   
           	<div class="span-24">   
                <div class="span-3 text_right">
					<s:label value="档次2：" id= ""/>
				</div>
              	<div class="span-2">
					<s:label id= "examineInfo.resultlevel2Name" name ="examineInfo.resultlevel2Name" keep="1"/>
				</div>
                <div class="span-1">
                <!-- wanqiuhong 10/13 修改:label更改成 textfield
               	 <s:label id= "examineInfo.resultlevel2Score" name ="examineInfo.resultlevel2Score" keep="1"/>
                -->	
                	<s:if test="examineInfo.resultlevelNum == 3">									
						<s:textfield id="resultlevel2Score" maxlength="3" name="examineInfo.resultlevel2Score" cssClass="span-1 text_right padding_right_2" onblur="chageValue();"/>
					</s:if>
					<s:else>
						<s:textfield id="resultlevel2Score" maxlength="3" name="examineInfo.resultlevel2Score" cssClass="span-1 text_right padding_right_2"/>
					</s:else>					
				</div>
                <div class="last">
                	<s:if test="examineInfo.resultlevelNum == 2">
						<s:label value="分以下"/>
					</s:if>
					<s:else>
						<s:label value="分以上"/>
					</s:else>
				</div>
			</div>
			<s:if test="examineInfo.resultlevelNum > 2">
           	<div class="span-24">   
                <div class="span-3 text_right ">
					<s:label value="档次3：" id= ""/>
				</div>
              <div class="span-2">
					<s:label id= "examineInfo.resultlevel3Name" name ="examineInfo.resultlevel3Name" keep="1"/>
				</div>
                <div class="span-1">
                <!-- wanqiuhong 10/13 修改:label更改成 textfield
               	 <s:label id= "examineInfo.resultlevel3Score" name ="examineInfo.resultlevel3Score" keep="1"/>
                -->
                    <s:if test="examineInfo.resultlevelNum == 4">									
						<s:textfield id="resultlevel3Score" maxlength="3" name="examineInfo.resultlevel3Score" cssClass="span-1 text_right padding_right_2" onblur="chageValue();"/>
					</s:if>
					<s:else>
						<s:textfield id="resultlevel3Score" maxlength="3" name="examineInfo.resultlevel3Score" cssClass="span-1 text_right padding_right_2"/>
					</s:else>
				</div>
                <div class="last">
					<s:if test="examineInfo.resultlevelNum == 3">
						<s:label value="分以下"/>
					</s:if>
					<s:else>
						<s:label value="分以上"/>
					</s:else>
				</div>
			</div>
			</s:if>
			<s:if test="examineInfo.resultlevelNum > 3">
            <div class="span-24">   
              	<div class="span-3 text_right ">
					<s:label value="档次4：" id= ""/>
				</div>
            	<div class="span-2">
					<s:label id= "examineInfo.resultlevel4Name" name ="examineInfo.resultlevel4Name" keep="1"/>
				</div>
                <div class="span-1">
                <!-- wanqiuhong 10/13 修改:label更改成 textfield
               	 <s:label id= "examineInfo.resultlevel4Score" name ="examineInfo.resultlevel4Score" keep="1"/>
                -->                    
                	<s:if test="examineInfo.resultlevelNum == 5">									
						<s:textfield id="resultlevel4Score" maxlength="3" name="examineInfo.resultlevel4Score" cssClass="span-1 text_right padding_right_2" onblur="chageValue();"/>
					</s:if>
					<s:else>
						<s:textfield id="resultlevel4Score" maxlength="3" name="examineInfo.resultlevel4Score" cssClass="span-1 text_right padding_right_2"/>
					</s:else>
				</div>
                <div class="last">
					<s:if test="examineInfo.resultlevelNum==4">
						<s:label value="分以下"/>
					</s:if>
					<s:else>
						<s:label value="分以上"/>
					</s:else>
				</div>
			</div> 
			</s:if>
			<s:if test="examineInfo.resultlevelNum > 4">
            <div class="span-24">   
                <div class="span-3 text_right ">
					<s:label value="档次5：" id= ""/>
				</div>
              	<div class="span-2">
					<s:label id= "examineInfo.resultlevel5Name" name ="examineInfo.resultlevel5Name" keep="1"/>
				</div>
                <div class="span-1">
                <!-- wanqiuhong 10/13 修改:label更改成 textfield
               	 <s:label id= "examineInfo.resultlevel5Score" name ="examineInfo.resultlevel5Score" keep="1"/>
                -->
					<s:textfield id="resultlevel5Score" maxlength="3" name="examineInfo.resultlevel5Score" cssClass="span-1 text_right padding_right_2"/>
				</div>
                <div class="last">
					<s:label value="分以下"/>
				</div>
			</div>
			</s:if>
        	<div class="span-24 margin_top_6">
				<div class="span-12 prepend-h">
					<label class="font_weight_b"><s:label value="需要通过的考试："/></label>
				</div>
                <div class="span-11 last">
					<label class="font_weight_b"><s:label value="需要学习的课程："/></label>
				</div>
			</div>
            <div class="span-24 margin_top_6">
                <div id="div_mustexamine_list" class="span-7 prepend-1">
					<s:include value="k060071_mustpassexam_list.jsp"></s:include>
                </div>
                <div class="span-4">
                	<!--编辑模式且在编辑中可见-->
               		<s:if test="operatMode == 2 && examineInfo.examineStatus == 1">
	                    <div class="last">
	                    	<input type="button" id="btnAddTest" name="btnAddTest" value="添加考试" onClick="addTest()" class="span-2 btn"/>
	                    </div>
	                    <div class="last">
	                    	<input type="button" id="btnRemoveTest" name="btnRemoveTest" value="移除考试" onClick="removeTest('sltExamineInfo')" class="span-2 btn"/>
	                    </div>
                    </s:if>    
                    <div class="last">
                    	<input type="button" id="btnViewTest" name="btnViewTest" value="考试查看" onClick="viewTest('sltExamineInfo')" class="span-2 btn"/>
                    </div>    
                </div>
				<div id="div_mustcourse_list" class="span-7 prepend-1">
						<s:include value="k060071_mustpasscourse_list.jsp"></s:include>
                </div>
                <div class="span-4 last">
                	<!--编辑模式且在编辑中可见-->
                	<s:if test="operatMode == 2 && examineInfo.examineStatus == 1">
	                    <div class=" last">
	                    	<input type="button" id="btnAddCourse" name="btnAddCourse" value="添加课程" onClick="addCourse()" class="span-2 btn"/>
	                    </div>
	                    <div class=" last">
	                    	<input type="button" id="btnRemoveCourse" name="btnRemoveCourse" value="移除课程" onClick="removeCourse('sltCourseInfo')" class="span-2 btn"/>
	                    </div>
                    </s:if>   
                    <div class=" last">
                    	<input type="button" id="btnViewCourse" name="btnViewCourse" value="课程查看" onClick="viewCourse('sltCourseInfo')" class="span-2 btn"/>
                    </div> 
                </div>
			</div>
		</div>

		<div class="span-23 prepend-h text_left last font_weight_b margin_top_6" >
			<s:label value="针对对象："/>
		</div>
		<div class="span-24 prepend-h margin_top_6">
			<!-- 针对对象 -->
			<div class="span-3" id="div_objectType">
	         	<s:select id="objectTypeList" name="examineInfo.objectType" list="objectTypeList"
					listKey="diffNo" listValue="diffName" cssClass="span-3" onchange="showSelectDiv()"/>
				<s:hidden name="examineInfo.objectValue" id="objectValue"/>
	       	</div>
			<!-- 针对项目组 -->
	    	<div class="span-3 last none" id="div_project">
	              	<s:select id="projectList" name="projectId" list="projectList"
					listKey="orgId" listValue="orgNm" cssClass="span-3"/>
	    	</div>
			<!--针对工龄 -->
			<div class="span-5 last none" id="div_year">
				<div class="span-2 text_right">
					<s:label value="入社不满："/>
				</div>
	    		<div class="span-3 last">
	               	<s:select id="yearList" name="year" list="yearList" 
						listKey="diffNo" listValue="diffName" cssClass="span-3"/>
				</div>
	       	</div>
			<!-- 针对个人 -->
			<div class="span-3 last none" id="div_person_button">
	       		<div><input type="button" value="选择人员" id="btnSelectUser"
	                 onClick="userSelect(1,'div_person')" class="span-2 btn"/>
	            </div>
	         </div>
	       	<div class="span-18 prepend-3 none" id="div_person">
				<s:hidden id="userIdList" name="strUserIdList"/>
				<s:label id="strUserNameList" name="strUserNameList" keep="1"/>
			</div>
      	</div>
  
		<div class="span-23 prepend-h text_left last font_weight_b margin_top_6" >
			<s:label value="所选试卷一览："/>
		</div>
		<!--编辑模式且在编辑中可见-->
		<s:if test="operatMode == 2 && examineInfo.examineStatus == 1">
		<div class="span-23 margin_top_2 prepend-h margin_top_6" >
			<input type="button" id="btnCreatePaper" name="btnCreatePaper" value="新建试卷" onclick="newPaper()" class="span-2 btn"/>
		    <input type="button" id="btnSelectPaper" name="btnSelectPaper" value="选择试卷" onclick="selectePaper()" class="span-2 btn"/>
		</div>
		</s:if>
		
    	
		<!-- 所选试卷一览 -->
		<div id="div_k060071_list">
			<s:include value="k060071_list.jsp"></s:include>
		</div>  
		<div class="span-23 prepend-h">
			<label>(若有多个试卷，则每个考生考试时从这些试卷中随机抽一张试卷进行考试)</label>
		</div>
		

                

            <div class="span-24 margin_top_6" id="divRefuseReason">
				<div class="span-3 prepend-h text_left font_weight_b"><s:label value="不批准理由：" /></div>
				<!--考试说明-->
				<div class="span-18 text_left">
				  <s:textarea name="examineInfo.refuseReason" rows="3" cols="50" cssClass="span-10" id="refuseReason" />
				</div>
			</div>
			
            <div class="span-24 margin_top_6 text_center">
            	<!--编辑模式,且考试状态是待审批或不批准时可见-->
            	<s:if test="operatMode == 2 && (examineInfo.examineStatus != 1 && examineInfo.examineVisibleFlg==0)" >
                <input type="button" id="btnReEdit" name="btnReEdit" value="再编辑" onClick="reEdit()" class="span-2 btn"/>
                </s:if>
                <!--编辑模式，且编辑中可见 ;或调整模式可见-->
            	<s:if test="(operatMode == 2 && examineInfo.examineStatus == 1)  || operatMode == 5" >
                <input type="button" id="btnSave" name="btnSave" value="保存" onClick="updateExamine()" class="span-2 btn"/>
                </s:if>
                <!--编辑模式，且编辑中可见 -->
            	<s:if test="operatMode == 2 && examineInfo.examineStatus == 1" >
                <input type="button" id="btnApply" name="btnApply" value="提交审批" onClick="applyExamine()" class="span-2 btn"/>
                </s:if>
                <!--删除模式可见-->
                <s:if test="operatMode == 4">
                <input type="button" id="btnDelete" name="btnDelete" value="删除" onClick="deleteExamine()" class="span-2 btn"/>
                </s:if>
                <!--审批模式且待审批或不批准时可见-->
                <s:if test="operatMode == 3 && (examineInfo.examineStatus == 2 || examineInfo.examineStatus == 4)">
                	<input type="button" id="btnApprove" name="btnApprove" value="批准" onClick="approveExamine()" class="span-2 btn"/>
                 </s:if>
                 <!--审批模式且待审批时可见-->
                <s:if test="operatMode == 3 && examineInfo.examineStatus == 2">
                	<input type="button" id="btnDisApprove" name="btnDisApprove" value="不批准" onClick="unApproveExamine()" class="span-2 btn"/>
                </s:if>
                <!--审批模式可见,且已批准才可见-->
                <s:if test="operatMode == 3 && examineInfo.examineStatus == 3">
                <input type="button" id="btnCancel" name="btnCancel" value="撤销发布" onClick="cancelExamine()" class="span-2 btn"/>
                </s:if>
           	</div>
			<div class="span-24" id = "div_err">
				<s:fielderror></s:fielderror>
				<s:label id="fieldinfo" name="fieldinfo"/>
			</div>
			</s:form>
		</div>
	</div>
	<s:include value="../manager/foot.jsp" />
</div>

</body>
</html>
