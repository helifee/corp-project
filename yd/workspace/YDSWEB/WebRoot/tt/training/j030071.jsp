<%--
 * @(#)J030071.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>

<%--
 * 教材内容浏览(主页面JSP)
 * 
 * @author yukunpeng
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
	
	<!-- 语法高亮显示css -->
	<link type="text/css" rel="stylesheet" href="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/styles/shCore.css"/>	 
	<link type="text/css" rel="stylesheet" href="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/styles/shThemeDefault.css"/>	 
	<link type="text/css" rel="stylesheet" href="<%=basePath %>css/style/editorContents.css">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>	
	
	<!-- 语法高亮显示js -->
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shCore.js"></script> 	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushBash.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushCpp.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushCSharp.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushCss.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushDelphi.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushDiff.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushGroovy.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushJava.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushJScript.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushPhp.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushPlain.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushPython.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushRuby.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushScala.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushSql.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushVb.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/ckeditor/plugins/syntaxhighlight/scripts/shBrushXml.js"></script>	 
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTraining/j030071.js"></script>
	
	<title>${chapterInfo.chapterTitle} - <s:property value="bookName"/> - 教材内容浏览</title>
</head>
<body onload="initPage(${showBookMark})">
	<div class="container showgrid">            
	<s:include value="../manager/head.jsp" />
	<div class="span-24 margin_top_2">
	<div class="tt_module padding_bottom_4 overflow_hd bgclr_eee">
	<s:include value="../manager/navigator.jsp" />
    	<!-- title --><!--
        <div class="span-24 padding_top_8 title_tt">
        	<h2>教材内容浏览</h2>
        </div>
        -->
        <div class="span-24">
           	<div class=" span-23 text_right last" id="divbtns">
           		<input type="button" id="btnprevpage" class="btn span-2" value="上一页"    onclick ="getPrevChapter()"/>
                <input type="button" id="btnnextpage" class="btn span-2" value="下一页"    onclick ="getNextChapter()"/>
                <input type="button" id="btnhidemenu" class="btn none span-2" value="隐藏书目"  onclick="memuHide()"/>
                <input type="button" id="btnshowmenu" class="btn span-2" value="显示书目"  onclick="memuShow()"/>
                <input type="button" id="btnsave"     class="btn span-2" value="保存进度"  onclick="editBookMark()"/>
            </div>
		</div>
        <div class="span-24">
        
        	<div class="span-4 bgclr_eee bd_1sa8" style="position:fixed; top:150px; left:5px;" id="divmenu">
        		<div class="tt_module_header">目录</div>
        		<div id="div_book_mark_list" class="tt_module_body" style="height:auto!important;min-height:76px;">
        			<div class="span-4 last">
	               		<span class="title_2" id="bookName"><s:property value="bookName"/></span>
	           		</div>
	        		<div class="span-4 overflow_auto none ellipsis" style="padding-left: 5px;" id="divmenulist">
						<s:hidden id="totalPages" name ="totalPages"/>
	            		<s:if test="totalPages > 0">
	   						<s:iterator value="bookMenuList" id="menulist"> 
						  		<ul class="tt_left_${showLevel}">
									<li style="white-space:nowrap;">						
									<s:a href="#" onclick="getContentByChapterNo(%{chapterNo})" title="%{chapterTitle}"> <s:property value="chapterTitle"></s:property></s:a></li>
								</ul>
							</s:iterator> 
						</s:if>
							<div style="padding-right:10px;" id="divinnerlink">
								<s:include value="j030071_innerlink.jsp" />
							</div>
					</div>

        		</div>
			</div>
            <!-- 教材内容详细 -->
			<div class="prepend-h span-23 last" id="divcontentview">
               	<s:include value="j030071_content.jsp" />
			</div>
		</div>
		<div class="span-24 text_center">
			<input type="button" id="btnprevpage2" class="btn span-2" value="上一页"    onclick ="getPrevChapter()"/>
			<input type="button" id="returnToTop"  class="btn span-2" value="返回顶部"  onclick ="scroll(0,0);"/>
            <input type="button" id="btnnextpage2" class="btn span-2" value="下一页"    onclick ="getNextChapter()"/>
		</div>
	<s:fielderror></s:fielderror>
	<div class="clear_both"></div>
 	</div>
 	</div>
	<s:include value="../manager/foot.jsp" />　
</div>
</body>
</html>
