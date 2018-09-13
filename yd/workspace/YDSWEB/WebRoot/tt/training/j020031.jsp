<%--
 * @(#)J020031.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 课程详细（管理）
 * 
 * @author zhangaijun
 * @version 1.00 2010/03/15
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
<title>课程详细</title>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">


	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j020031.js"></script>
</head>

<body onload="initForm()" onunload="closeAllChild()">
<div class="container showgrid">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
	<%-- 生成校验js <s:form id="courseInfoForm" action="j020031UpdateCourseDetails" method="post" validate="true" --%>
	<%-- 正式运行用   id="courseInfoForm" action="" method="post"  --%>
	<s:form id="courseInfoForm" method="post" validate="true" action="%{operatMode==2?'j020031UpdateCourseDetails':(operatMode==3?'j020031UnConfirmCourseDetails':'')}" >
	        <div class="span-24 padding_top_8 title_tt"><h2>课程详细</h2></div>
            <!-- 状态 -->
            <div class="span-24">
                <div class="span-3 text_right">
					<s:label value = "状态："/>
				</div>
                <div class="span-21 last">
                	<!-- 操作模式 -->
                	<s:hidden id="operatMode" name="operatMode" />
                	<!-- 课程ID -->
                	<s:hidden id="courseId" name="manaCourseInfo.courseId" />
                	<s:hidden id="paramCourseId" name="paramCourseId" />
                	<!-- 开课状态区分 -->
                	<s:hidden id="coursePublishStatus" name="manaCourseInfo.coursePublishStatus" />
                	<!-- 审批状态区分 -->
                	<s:hidden id="courseConfirmStatus" name="manaCourseInfo.courseConfirmStatus" />
                	<!-- 审批状态 -->
					<span>
						<s:label id="manaCourseInfo.courseConfirmStatusNm" name="manaCourseInfo.courseConfirmStatusNm"  keep="1"/>
					</span>
				</div>
			</div>
			<div class="span-24" >
				<!-- 不批准理由-->
				<!--审批模式(不为已开课)可见，或者编辑模式（未开课）,且不批准理由不为空时可见-->
				<s:if test="(operatMode == 3 || 
						(operatMode== 2 && (manaCourseInfo.refuseReason!=null && manaCourseInfo.refuseReason!=''))) 
						&& manaCourseInfo.coursePublishStatus != 2" >
	                <div class="span-15" id="divRefuseArea">
	                	<div class="span-3 text_right">
							<s:label value="不批准理由："/>
						</div>
						<div class="span-12 last">
	                		<s:textarea cssClass="span-12" rows="4" id="refuseReason" name="manaCourseInfo.refuseReason"></s:textarea>
						</div>
					</div>
				</s:if>
				<!--审批模式,且开课状态不为已开课下才可见-->
            	<s:if test="operatMode == 3 && manaCourseInfo.coursePublishStatus != 2" >
            		<!--审批状态为待审批-->
            		<s:if test="manaCourseInfo.courseConfirmStatus == 2" >
		                <div class="span-2" id="divApproveArea">
		                	<input type="button"  value="批准" onclick="confirmCourse()" id="btnApprove" class="span-2 btn"/>
		                </div>
		        		<div class="span-2 last" id="divDisApproveArea">
		                	<input type="button"  value="不批准" onclick="unConfirmCourse()" id="btnDisApprove" class="span-2 btn"/>
		                </div>
	                </s:if>
	                <!--审批状态为已批准-->
	                <s:if test="manaCourseInfo.courseConfirmStatus != 2">
		                <div class="span-2" id="divApproveArea">
		                	<input type="button"  value="批准" id="btnApprove" class="span-2 btn disabled"/>
		                </div>
		   				<div class="span-2" id="divApproveArea">
		                	<input type="button"  value="不批准" id="btnDisApprove" class="span-2 btn disabled"/>
		                </div>		                
	                </s:if>       
                </s:if>
            </div>
            <!-- 课程名称 -->
			<div class="span-24" >
                <div class="span-3 text_right">
					<s:label value="课程名称："/>
				</div>
                <div class="span-12 append-9 last">
					<s:textfield id="courseName" name="manaCourseInfo.courseName" cssClass="span-12"/>
				</div>
            </div>
            <!-- 课程简介 -->
			<div class="span-24" >
                <div class="span-3 text_right">
					<s:label value="课程简介："/>
				</div>
                <div class="span-12 append-9 last">
                	<s:textarea cssClass="span-12 " rows="4" id="courseAbstract" name="manaCourseInfo.courseAbstract"></s:textarea>
				</div>
            </div>
            <!-- 课程分类 -->
			<div class="span-24" >
                <div class="span-3 text_right">
					<s:label value="课程分类："/>
				</div>
                <div class="span-21 last">
                	<!-- 一级分类ID -->
                	<s:hidden id="category1Id" name="manaCourseInfo.category1Id" />
                	<!-- 二级分类ID -->
                	<s:hidden id="category2Id" name="manaCourseInfo.category2Id" />
                	<!-- 三级分类ID -->
                	<s:hidden id="category3Id" name="manaCourseInfo.category3Id" />
					<span>
						<s:label id="manaCourseInfo.categoryName" name="manaCourseInfo.categoryName" keep="1"/>
					</span>
				</div>
            </div>
             
            <!-- 所选教材一览 -->
			<div class="span-23 prepend-h text_left margin_top_6">
            	<s:label value="所选教材一览"/>
            </div>
            <div class="span-23 prepend-h margin_top_6"> 
            	<!-- 编辑模式且开课状态不为已开课才可见 -->
            	<s:if test="operatMode ==2 && manaCourseInfo.coursePublishStatus != 2">
	                <div class="span-2">
	                   <input type="button" id="btnAddBook" name="btnAddBook" value="追加教材" onClick ="addBooks()" class="span-2 btn"/>
	                </div>
	                <div class="last">
	                    <input type="button" id="btnCreateBook" name="btnCreateBook" value="创建新教材" onClick ="createBooks()" class="span-2 btn"/>
	                </div>
                </s:if>
                <!-- 教材一览表 -->
                <div class="span-23 overflow_hd margin_top_6">
                	<div class="span-23 ">
	                    <table class="datagridtt ellipsis">
	                        <tr>
	                            <th class="percent_8">教材ID</th>
	                            <th class="percent_20">教材名称</th>
	                            <th class="percent_14">教材分类</th>
	                            <th class="percent_10">发布日期</th>
	                            <th class="percent_8">创建者</th>
	                            <th class="percent_8">教材状态</th>
	                            <th class="percent_14">来源</th>
	                            <!-- 操作模式为参与，或者操作模式为编辑且开课状态不为已开课-->
	                            <s:if test="operatMode == 7 || (operatMode ==2 && manaCourseInfo.coursePublishStatus != 2)">
	                            	<th class="percent_16">操作</th>
	                            </s:if>
	                            
	                        </tr>
	                    </table>
                    </div>
	                <div class="span-23">
		                <div class="span-23">
			                  <table class="datagridtt ellipsis" id="table_bookList">
			                  <tbody>
			                  	<s:if test="manaBookInfoList.size > 0">
			                  		<s:iterator value="manaBookInfoList" status="stat">
			                  		<tr> 
			                  			<td class="percent_8 text_center">
			                  			<s:if test="versionNum == 1 && bookStatus !=3">
			                  				<s:property value="bookId" />
			                  			</s:if>
			                  			<s:else>
			                  				<s:a href="#" onclick="showBook('%{bookId}')">
			                  					<s:property value="bookId" />
			                  				</s:a>	                  				
			                  			</s:else>
			                  			</td>
			                  			<td class="percent_20">
			                  				<s:label title="%{bookName}" name="bookName"/>							                  				
			                  			</td>
			                  			<td class="percent_14">
			                  				<s:label title="%{category}" name="category"/>							                  					                  				
			                  			</td>
			                  			<td class="percent_10 text_center">
			                  				<s:property value="approverTime" />
			                  			</td>
			                  			<td class="percent_8 text_center">
			                  				<s:property value="createUserName" />
			                  			</td>
			                  			<td class="percent_8 text_center">
			                  				<s:property value="statusName" />
			                  			</td>
			                  			<td class="percent_14">
			                  				<s:property value="source" />
			                  			</td>
			                  			<!-- 编辑模式且开课状态不为已开课时 -->
			                  			<s:if test="operatMode == 2 && manaCourseInfo.coursePublishStatus != 2">
				                  			<td class="percent_16 text_center">
				                  			<s:if test="deleteFlg == 1">
				                  				<s:a href="#" onclick="removeBook(this,'%{bookId}')">移除</s:a>
				                  				<label><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></label>
				                  				<label><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></label>
				                  				<label><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></label>
				                  				<label>移除</label>
				                  				<label><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></label>
				                  				<label><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></label>
				                  				<label><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></label>
				                  			</s:if>
				                  			<!-- 2个全角空格 -->
				                  			<s:else>
				                  				<label><s:a href="#" onclick="removeBook(this,'%{bookId}')">移除</s:a></label>
				                  				<s:a href="#" onclick="editBook('%{bookId}')" >编辑</s:a>
				                  				<s:a href="#" onclick="manageBook('%{bookId}')">管理</s:a>
				                  				<s:a href="#" onclick="deleteBook('%{bookId}')">删除</s:a>
				                  				<label>移除</label>
				                  				<label>编辑</label>
				                  				<label>管理</label>
				                  				<label>删除</label>
				                  			</s:else>
				                  			</td>
			                  			</s:if>
			                  			<s:else>
				                  			<!-- 参与模式 -->
				                  			<s:if test="operatMode == 7">
				                  				<td class="percent_16">
						                  			<s:if test="editFlg == 1">
						                  				<s:a href="#" onclick="editBook('%{bookId}')">编辑</s:a>
						                  			</s:if>
					                  			</td>
				                  			</s:if>		
			                  			</s:else>
			                  			<td class="none">
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].bookId" name="manaBookInfoList[%{#stat.index}].bookId" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].bookName" name="manaBookInfoList[%{#stat.index}].bookName" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].category" name="manaBookInfoList[%{#stat.index}].category" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].approverTime" name="manaBookInfoList[%{#stat.index}].approverTime" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].createUserName" name="manaBookInfoList[%{#stat.index}].createUserName" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].statusName" name="manaBookInfoList[%{#stat.index}].statusName" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].source" name="manaBookInfoList[%{#stat.index}].source" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].editFlg" name="manaBookInfoList[%{#stat.index}].editFlg" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].bookStatus" name="manaBookInfoList[%{#stat.index}].bookStatus" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].versionNum" name="manaBookInfoList[%{#stat.index}].versionNum" ></s:hidden>
			                  				<s:hidden id="manaBookInfoList[%{#stat.index}].deleteFlg" name="manaBookInfoList[%{#stat.index}].deleteFlg" ></s:hidden>
			                  			</td>
			                  		</tr>
			                  		</s:iterator>
			                  	</s:if>
			                  </tbody>	                  	
			                  </table>
			                 </div>
		                 </div>
                	</div>
            	</div>
            <!--编辑模式(且不是已开课的)下才有操作按钮-->
            <s:if test="operatMode == 2 && manaCourseInfo.coursePublishStatus !=2">
	            <div class="span-24 text_center margin_top_6" id ="divBtnArea">
	                <input type="button" id="btnReEdit" name="btnReEdit" value="再编辑" onclick="reEditCourseInfo()" class="span-2 btn"/>
	                <input type="button" id="btnOk" name="btnOk" value="保存" onclick="submitCourseInfo()" class="span-2 btn"/>
	                <input type="button" id="btnConfirm" name="btnConfirm" value="提交审批" onclick="applyCourse()" class="span-2 btn"/>
	            </div>
            </s:if>
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
