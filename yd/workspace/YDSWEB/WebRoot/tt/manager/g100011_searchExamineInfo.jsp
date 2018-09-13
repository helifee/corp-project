<%--
 * @(#)G100011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理子系统
--%>

<%--
 * 主画面
 * 
 * @author liuyiwei
 * @version 1.00 2010/03/30
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
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>	

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttManager/g100011.js"></script>

	<title>考试检索</title>
</head>
<body onload="initSearchExamineInfo()">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2" >
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
<div id="div_main"  class="container showgrid">
	<div class="span-24 padding_top_8 title_tt">
		<h2>考试检索</h2>
	</div>

<div class="span-24 margin_top_2" >
<!-- left area -->
<div class="span-18">
	<!-- 检索条件-->
   	<s:form id="examineInfoForm" action="g100011SearchExamineInfoList"  method ="post" validate="true">
   		<div class="span-17">
 			<div class="span-2 text_right">	        
            	<s:label id="examineIdLbl" value="考试ID："/>
 	        </div>
	        <div class="span-2">
             <s:textfield id="examineId" name="examineInfo.examineId" cssClass="span-2" maxlength="8"/>
 	        </div>  		
			<div class="span-2 text_right">	        
            	<s:label id="examineNameLbl" value="考试名称："/>
 	        </div>
	        <div class="span-6 last">
             <s:textfield id="examineName" name="examineInfo.examineName" cssClass="span-6" maxlength="100"/>
 	        </div>
    	</div>
		<div class="span-17">
			<div class="span-2 text_right">	        
            	<s:label id="categoryLbl" value="分类："/>
			</div>
		  	<div class="span-12 append-2 last">
				<select class="span-3" id="examineCategory1" name="examineInfo.category1Id" type="category1Id"></select>
				<select class="span-3" id="examineCategory2" name="examineInfo.category2Id" type="category2Id"></select>
				<select class="span-3 last" id="examineCategory3" name="examineInfo.category3Id" type="category3Id"></select>
		  	</div>
		</div>
		<div class="span-17">
	        <div class="span-2 text_right">	        
           <s:label id="examineTimeLbl" value="考试时间："/>
	        </div>
		   	<div class="span-13 append-2 last">
          <s:textfield id="examineTimeFrom" name="examineInfo.examineTimeFrom" onclick="WdatePicker()" cssClass="span-2"/>
           <s:label id="wavesLineLbl" value="～"/>
           <s:textfield id="examineTimeTo" name="examineInfo.examineTimeTo" onclick="WdatePicker()" cssClass="span-2"/>
			</div>
		</div>
	</s:form> 		
	<div class="span-17">
		<div class="span-2 text_right">	        
               <s:label id="examineStatusLbl" value="状态："/>
		</div>
	   	<div class="span-13 append-2 last">
        	<div class="span-3">
        		<s:checkbox id="mustExamineFlgList[0]"  name="mustExamineFlgList[0]"/>
        		<s:label for="mustExamineFlgList[0]" value="必考"/>
        		<s:hidden id="examineInfo.mustExamineFlgList[0]" name="examineInfo.mustExamineFlgList[0]"/>
        	</div>
        	<div class="span-3">
        		<s:checkbox id="mustExamineFlgList[1]"  name="mustExamineFlgList[1]" onclick="unselExAttention()"/>
        		<s:label for="mustExamineFlgList[1]" value="非必考" onclick="unselExAttention()"/>
        		<s:hidden id="examineInfo.mustExamineFlgList[1]" name="examineInfo.mustExamineFlgList[1]"/>
        	</div>
        	<div class="span-3">
        		<s:checkbox id="exaAttentionFlagList[0]" name="exaAttentionFlagList[0]" onclick="selMustExamine()"/>
        		<s:label for="exaAttentionFlagList[0]" value="关注" onclick="selMustExamine()"/>
        		<s:hidden id="examineInfo.exaAttentionFlagList[0]" name="examineInfo.exaAttentionFlagList[0]"/>
        	</div>
        	<div class="span-3">
        		<s:checkbox id="exaAttentionFlagList[1]" name="exaAttentionFlagList[1]" onclick="selMustExamine()"/>
        		<s:label for="exaAttentionFlagList[1]" value="不关注" onclick="selMustExamine()"/>
        		<s:hidden id="examineInfo.exaAttentionFlagList[1]" name="examineInfo.exaAttentionFlagList[1]"/>
        	</div>		        		        	
		</div>
	</div>
	<div class="span-17">
	   	<div class="span-16 prepend-2">
        	<div class="span-3">
        		<s:checkbox id="exaStatusList[0]"  name="exaStatusList[0]"/>
        		<s:label for="exaStatusList[0]" value="报名中"/>
        		<s:hidden id="examineInfo.examineStatusList[0]" name="examineInfo.examineStatusList[0]"/>
        	</div>
        	<div class="span-3">
        		<s:checkbox id="exaStatusList[1]"  name="exaStatusList[1]"/>
        		<s:label for="exaStatusList[1]" value="报名结束"/>
        		<s:hidden id="examineInfo.examineStatusList[1]" name="examineInfo.examineStatusList[1]"/>
        	</div>
        	<div class="span-3">
        		<s:checkbox id="exaStatusList[2]" name="exaStatusList[2]"/>
        		<s:label for="exaStatusList[2]" value="报名已批准"/>
        		<s:hidden id="examineInfo.examineStatusList[2]" name="examineInfo.examineStatusList[2]"/>
        	</div>
        	<div class="span-3 none">
        		<s:checkbox id="exaStatusList[3]" name="exaStatusList[3]"/>
        		<s:label for="exaStatusList[3]" value="评分任务未分配"/>
        		<s:hidden id="examineInfo.examineStatusList[3]" name="examineInfo.examineStatusList[3]"/>
        	</div>
        	<div class="span-3 none">
        		<s:checkbox id="exaStatusList[4]"  name="exaStatusList[4]"/>
        		<s:label for="exaStatusList[4]" value="评分任务已分配"/>
        		<s:hidden id="examineInfo.examineStatusList[4]" name="examineInfo.examineStatusList[4]"/>
        	</div>
        	<div class="span-3">
        		<s:checkbox id="exaStatusList[5]"  name="exaStatusList[5]"/>
        		<s:label for="exaStatusList[5]" value="评分中"/>
        		<s:hidden id="examineInfo.examineStatusList[5]" name="examineInfo.examineStatusList[5]"/>
        	</div>
        	<div class="span-3 none">
        		<s:checkbox id="exaStatusList[6]" name="exaStatusList[6]"/>
        		<s:label for="exaStatusList[6]" value="评分已汇总"/>
        		<s:hidden id="examineInfo.examineStatusList[6]" name="examineInfo.examineStatusList[6]"/>
        	</div>
        	<div class="span-3 last">
        		<s:checkbox id="exaStatusList[7]" name="exaStatusList[7]"/>
        		<s:label for="exaStatusList[7]" value="成绩已发布"/>
        		<s:hidden id="examineInfo.examineStatusList[7]" name="examineInfo.examineStatusList[7]"/>
        	</div>
		</div>
	</div>		
	<div class="span-17">
	   	<div class="span-16 prepend-2">
	   		<div class="text_right">
	 			<input type="button" id="searchexamineinfoBtn" name="searchexamineinfoBtn" 
					class="span-2 btn" value="检索" onclick="searchExamineInfo()">	        	
        	</div>
		</div>
	</div>		
	<!-- 检索结果-->
	<div id="div_examineInfoList" class="span-17 margin_top_6">
		<s:include value="g100011_examineinfolist.jsp" />
	</div>
	<!-- 保存检索的部门id用于 点击分页时的查询参数 -->
	<s:hidden id="oldParam1" name="oldParam1" value=""/>
</div>
<!-- right area -->
<div class="span-6 last">
    <div class="tt_module margin_right_8" >
      <div class="tt_module_header">快捷检索条件</div>
      <div id="div_book_mark_list" class="tt_module_body" style="height:auto!important;min-height:200px;">
 
       </div>
    </div>
</div>
</div>

 <div class="clear_both"></div>
 </div>
</div>
</div>
 <s:include value="../manager/foot.jsp" />
</div>
</body>
</html>

