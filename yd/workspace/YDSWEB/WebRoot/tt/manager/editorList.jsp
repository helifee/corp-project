<%--
 * @(#)editorList.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 共通
--%>

<%--
 * 编辑人员一览（JSP）
 * 
 * @author qianguorong
 * @version 1.00 2010/03/11
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>			
	        <div class="prepend-3 span-21">
	        	<input type="button" id="btnSelectEditors" name="refer" value="选择人员" class="span-2 btn" onclick="userSelect(2, 'editorListTable');"/>	
	        </div>
	        <!-- 人员一览表 -->
           <div class="prepend-3 margin_top_4">
              <div class="span-10 bd_1s666">
             		<div class=" span-10 text_center">
                       <table class="datagridtt">
                           <tr>
                               <th class="span-2">员工姓名</th>
                               <th class="span-3">开始日期</th>
                               <th class="span-3">结束日期</th>
                               <th>操作</th>
                           </tr>
                       </table>
              	 	</div>
            		<table class="none" id="editorList">
	                  	<tr id="cloneTr">	
		                    <td class="span-2 text_center" id="editorList">
		                        <s:property value="userName"/>
		                    </td>
		                    <td class="text_center span-3"><s:textfield id="editorList[%{#stat.index}].startTime" name="editorList[%{#stat.index}].startTime"  onclick="WdatePicker()" cssClass="span-2" /></td>
		                    <td class="text_center span-3"><s:textfield id="editorList[%{#stat.index}].endTime" name="editorList[%{#stat.index}].endTime"  onclick="WdatePicker()" cssClass="span-2" /></td>		                                        
		                    <td class="text_center">
								<s:a href="#" onclick="removeRow(this,'editorListTable')">移除</s:a> 
							</td>
							<td class="none">
								<s:hidden id="editorList[%{#stat.index}].userId" name="editorList[%{#stat.index}].userId" />	
							    <s:hidden id="editorList[%{#stat.index}].userName" name="editorList[%{#stat.index}].userName"/>
							</td>                                	
		                </tr>  
		        	</table>
		        	
               		<div class="span-10 overflow_scr_y">
                         <div class="span-10">
                        	<table id="editorListTable" class="datagridtt">
                        	<tbody>
			           		<s:if test="editorList.size > 0">
							<s:iterator value="editorList" status="stat">
								<tr class="odd">
				                    <td class="span-2 text_center" id="editorList">
				                         <s:property value="userName"/>
				                    </td>
									<td class="text_center span-3">
									<s:textfield id="editorList[%{#stat.index}].startTime" name="editorList[%{#stat.index}].startTime"  onclick="WdatePicker()" cssClass="span-2"/>
									</td>
									<td class="text_center span-3">
									<s:textfield id="editorList[%{#stat.index}].endTime" name="editorList[%{#stat.index}].endTime"  onclick="WdatePicker()" cssClass="span-2"/>
									</td>
									<td class="text_center">
										<s:if test="courseInfo.coursePublishStatus==2">
											<s:label value="移除" ></s:label>
										</s:if>
										<s:else>
											<s:a href="#" onclick="removeRow(this,'editorListTable')">移除</s:a> 
										</s:else>
									</td>
									<td class="none">
										<s:hidden id="editorList[%{#stat.index}].userId" name="editorList[%{#stat.index}].userId"/>
										<s:hidden id="editorList[%{#stat.index}].userName" name="editorList[%{#stat.index}].userName"/>
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