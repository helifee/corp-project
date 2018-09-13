<%--
 * @(#)j030061.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 章节编辑画面（主页面JSP）
 * 
 * @author xinzhipeng
 * @version 1.00 2010/03/11
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

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j030061.js"></script>

	<title>章节编辑</title>
</head>
<body onload="initForm()">
	<div class="container">
		<s:include value="../manager/head.jsp" />
		<div class="span-24 margin_top_2">
			<div class="tt_module padding_bottom_4 overflow_hd">
			<s:include value="../manager/navigator.jsp" />
				<div id="J030061" class="container showgrid">
        			<s:form id="chapter" method="post"  >
        				<div class="span-24 ">
       						<!-- title -->
       						<div class="title_tt span-24">章节编辑</div>
           					<div class="span-24">
       						 	<!-- 状态 -->
           						<input type="button" id="save" name="save" class="span-2 btn" value="保存" onclick="savechapter()"/>
               					<input type="button" id="add" name="add" class="span-2 btn" value="添加" onclick="addline()"/>
               					<input type="button" id="del" name="del" class="span-2 btn" value="删除" onclick="deleteline()"/>
               					<input type="button" id="up" name="up" class="span-2 btn" value="上移" onclick="upline()"/>
               					<input type="button" id="down" name="down" class="span-2 btn" value="下移" onclick="downline()"/>
               					<input type="button" id="exit" name="exit" class="span-2 btn" value="关闭" title="关闭并解锁画面" onclick="quitEdit()"/>
       						</div>
						</div>
       					<div class="prepend-1 span-23 margin_top_10 margin_bottom_10">
        					<s:hidden id="bookId" name="bookId" />
        					<s:hidden id="editNo" name="editNo" />
        					<table id="chaptertb" cellspacing="0" cellpadding="0" class="span-11 datagridtt">
            					<tr>
                					<th class="percent_10"></th>
                    				<th class="percent_60">章节标题</th>
                    				<th class="percent_30">目录显示层级</th>
								</tr>
								<s:if test="chapterSize > 0">
									<s:iterator value="chapterInfos" status="stat">
										<tr>
											<td class="text_center"><input type="radio" id="radio${stat.index}" name="radio"/></td>
		                					<td>
		                						<s:textfield name="chapterInfos[%{#stat.index}].chapterTitle" id="cinfo%{#stat.index}"  />
		                					</td>
		                					<td class="text_center">
		                    					<input type="button" id="mul${stat.index}" class="span-1 btn" value="-" onclick="mullevel('${stat.index}')"/>
		                    					<s:label name="chapterInfos[%{#stat.index}].showLevel" id="clevel%{#stat.index}" value="%{showLevel}"  />
		                    					<s:hidden id="showLevel%{#stat.index}" name="chapterInfos[%{#stat.index}].showLevel" />
		                    					<input type="button" id="add${stat.index}"  class="span-1 btn" value="+" onclick="addlevel('${stat.index}')"/>           
		                    				</td>
		                    				<s:hidden id="bookId%{#stat.index}" name="chapterInfos[%{#stat.index}].bookId" value="%{bookId}" />
		                    				<s:hidden id="editNo%{#stat.index}" name="chapterInfos[%{#stat.index}].editNo" value="%{editNo}" />
		                   					<s:hidden id="chapterNo%{#stat.index}" name="chapterInfos[%{#stat.index}].chapterNo" value="%{chapterNo}" />
		                    				<s:hidden id="showOrder%{#stat.index}" name="chapterInfos[%{#stat.index}].showOrder" value="%{showOrder}" />
		                    				<s:hidden id="hideFlg%{#stat.index}" name="chapterInfos[%{#stat.index}].hideFlg" value="1" />
										</tr>
									</s:iterator>
								</s:if>
								<tr id="cloneline" class="none">
									<td class="percent_10 text_center">
										<input type="radio" id="radioadd" name="radio"/>
									</td>
									<td class="percent_60">
										<s:textfield name="chapterTitle" id="chapterTitle"  value="教学内容"/>
									</td>
									<td class="percent_30 text_center">
										<input type="button" id="buttonmul" class="span-1 btn" value="-"/>
										<s:label name="showLevel" id="showLevel" value="1"  />
										<s:hidden id="hideshowLevel" name="hideshowLevel" />
										<input type="button" id="buttonadd"  class="span-1 btn" value="+"/>           
									</td>
									<s:hidden id="hidebookId" name="hidebookId" />
									<s:hidden id="hideeditNo" name="hideeditNo" />
									<s:hidden id="hidechapterNo" name="hidechapterNo" />							
									<s:hidden id="hideshowOrder" name="hideshowOrder" />
									<s:hidden id="hideFlg" name="hideFlg" value="1" />									
								</tr>				     
          					</table>
          				</div>
    				</s:form>    
     				<s:hidden id="chaptersize" name="chapterSize" />     	
					<div class="clear_both"></div>
				</div>
    		</div>
  		</div>
		<s:include value="../manager/foot.jsp" />
	</div>
</body>
</html>

