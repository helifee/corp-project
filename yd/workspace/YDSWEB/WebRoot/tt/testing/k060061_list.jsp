<%--
 * @(#)k060061_list.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试总体设计及生成（所选考试一览页面）
 * 
 * @author qiliqiang
 * @version 1.00 2010/05/20
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>	
<%@ taglib prefix="s" uri="/struts-tags"%>
     <div class="span-22 margin_top_6">
		<table class="datagridtt">
			<tr>
				<th class="span-2">试卷ID</th>
				<th class="span-3">试卷标题</th>
				<th class="span-3">试卷分类</th>
				<th class="span-3">试卷总分（分）</th>
				<th class="span-3">答题时间（分钟）</th>
				<th class="span-2">更新日期</th>
				<th class="span-2">状态</th>
				<th class="span-2">更新者</th>
				<th class="span-2">操作</th>
			</tr>
		</table>
	</div>
	<div class="span-22">
		<div class="span-22">
		<table id="paperListTb" class="datagridtt ellipsis">
			<tbody>
	            	<s:if test="testPaperInfoList.size > 0">
	                  	<s:iterator value="testPaperInfoList" status="stat">
	                  		<tr>
	                  			<td class="span-2 text_center">
	                  				<s:property value="paperId"/>
	                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperId" name="testPaperInfoList[%{#stat.index}].paperId" />
	                  			</td>
	                  			<td class="span-3">
	                  				<s:label title="%{paperTitle}" name="paperTitle" />
	                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperTitle" name="testPaperInfoList[%{#stat.index}].paperTitle" />
	                  			</td>
	                  			<td class="span-3">
	                  				<s:label title="%{categoryName}" name="categoryName" />
	                  				<s:hidden id="testPaperInfoList[%{#stat.index}].categoryName" name="testPaperInfoList[%{#stat.index}].categoryName" />
	                  			</td>
	                  			<td class="span-3 text_center">
	                  				<s:property value="paperTotalScore" />
	                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperTotalScore" name="testPaperInfoList[%{#stat.index}].paperTotalScore" />
	                  			</td>
	                  			<td class="span-3 text_center">
	                  				<s:label id="paperTime" name="paperTime" />
	                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperTime" name="testPaperInfoList[%{#stat.index}].paperTime"/>
	                  			</td>
	                  			<td class="span-2 text_center">
	                  				<s:property value="updateTime" />
	                  				<s:hidden id="testPaperInfoList[%{#stat.index}].updateTime" name="testPaperInfoList[%{#stat.index}].updateTime"/>
	                  			</td>
	                  			<td class="span-2 text_center">
	                  				<s:property value="paperStatusName" />
	                  				<s:hidden id="testPaperInfoList[%{#stat.index}].paperStatusName" name="testPaperInfoList[%{#stat.index}].paperStatusName"/>
	                  			</td>
	                  			<td class="span-2 text_center">
	                  				<s:property value="updateUserName" />
	                  				<s:hidden id="testPaperInfoList[%{#stat.index}].updateUserName" name="testPaperInfoList[%{#stat.index}].updateUserName"/>
	                  			</td>
								<td class="span-2 text_center">
									<s:if test="operatMode==1">
										<label id="removePaperLb${stat.index}">移除</label>&nbsp;
										<label id="lookPaperLb${stat.index}">查看</label>
									</s:if><s:else>
										<s:a id="removePaperA%{#stat.index}" href="#" onclick="removeSelectedPaper('%{paperId}')">移除</s:a>&nbsp;
										<s:a id="lookPaperA%{#stat.index}" href="#" onclick="viewSelectedPaper('%{paperId}','%{paperVersionNo}')">查看</s:a>
									</s:else>
								</td>
	                  		</tr>
	                  	</s:iterator>
	                </s:if>
	            </tbody> 
		</table>
		</div>
	</div>
               
            
