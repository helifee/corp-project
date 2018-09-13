<%--	
 * @(#)j030031.jsp	
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司	
 * All rights reserved.	
 *      Project: 远东公司内部网	
 *    SubSystem: 教育子系统	
--%>	
	
<%--	
 * 教材信息画面（主页面JSP）	
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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
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
 		<script type="text/javascript" src="<%=basePath %>js/ttTraining/j030031.js"></script>

		<title>教材详细</title>
	</head>

	<body onload="initForm(${mode})">
		<div class="container">
			<s:include value="../manager/head.jsp" />
			<div class="span-24 margin_top_2">
			<div class="tt_module padding_bottom_4 overflow_hd">
				<s:include value="../manager/navigator.jsp" />
		<div id="div_main"  class="container showgrid">
               	<!-- title -->
               	<div class="span-24 padding_top_8 title_tt">
                	<h2>教材详细</h2>
                </div>

        <s:form id="mainForm"  validate="true"
       	 action="j030031RefuseBook">
       	 		<!--画面模式-->
       	 		 				<s:hidden id="mode" name="mode"/>
 				<s:hidden id="editNoHidden" name="bookInfo.editNo"/>
        		<s:hidden id="chapterNoHidden" name="bookChapterNo"/>
        		<s:hidden id="bookStatusHidden" name="bookInfo.bookStatus"/>
        		<s:hidden id="callScreenIdHidden" name="callScreenId"/>
			<div class="span-24">
                <!-- 教材封面显示区域 -->
                <div class="span-6 text_center margin_top_10">
                	<img id="bookCovImg" class="span-5 ttImg" src="../../tt/manager/getFile.action?flag=BOOK_IMAGE&fileName=${bookInfo.bookCover}"/>
                </div>
                <!-- 教材信息显示区域 -->
                <div class="span-18 last">
                	<div class="span-18 text_right last ">
                		<div class="span-8">
                        	<div class="span-3">
                        		<s:label value="教材ID：" />
                        	</div>
                        	<div class="span-5 text_left last">
                        		<span id="bookId">
                        			<s:label id="bookInfo.bookId" name="bookInfo.bookId" keep="1"/>
                        		</span>
                       		</div>
                       	</div>
                       	<div class="span-9">
                        	<div class="span-3">
                        		<s:label value="教材名称：" />
                        	</div>
                        	<div class="span-6 text_left last">
                        		<s:label id="bookInfo.bookName" name="bookInfo.bookName" keep="1"/>
                        	</div>
                        </div>
                    </div>
                    <div class="span-18 text_right last">
                		<div class="span-8">
                        	<div class="span-3">
                        		<s:label value="教材分类：" />
                        	</div>
                        	<div class="span-5 text_left last">
                        		<s:label id="bookInfo.categoryName" name="bookInfo.categoryName" keep="1"/>
                       		</div>
                       	</div>
                       	<div class="span-9">
                        	<div class="span-3">
                        		<s:label value="预备知识：" />
                        	</div>
                        	<div class="span-6 text_left last">
                        		<s:label id="bookInfo.preKnowledge" name="bookInfo.preKnowledge" keep="1"/>
                        	</div>
                        </div>
                    </div>
                    <div class="span-18 text_right last">
                       	<div class="span-8">
                        	<div class="span-3">
                        		<s:label value="教材版本：" />
                        	</div>
                        	<div class="span-5 text_left last">
                        		<s:label id="bookInfo.versionNo" name="bookInfo.versionNo" keep="1"/>.
                        		<s:label id="bookInfo.updateNo" name="bookInfo.updateNo" keep="1"/>
                        	</div>
                        </div>
                        <div class="span-9">
                        	<div class="span-3">
                        		<s:label value="适用人群：" />
                        	</div>
                        	<div class="span-6 text_left last">
                        		<s:label id="bookInfo.applyto" name="bookInfo.applyto" keep="1"/>
                       		</div>
                       	</div>
                    </div>
                    <s:if test="mode == 3||mode == 4">
                    	<div class="span-18 text_right last" id = "bookStatusName">
                    		<div class="span-8">
	                			<div class="span-3">
	                       			<s:label value="教材状态：" />
	                       		</div>
	                       		<div class="span-5 text_left last">
	                       			<span id="bookStatus">
	                       				<s:label id="bookInfo.bookStatusName" name="bookInfo.bookStatusName" keep="1"/>
	                       			</span>
	                    		</div>
                    		</div>
                       		<div class="span-9" id = "quoteFlag">
                        		<div class="span-3">
                        			<s:label value="可否引用：" />
                        		</div>
                        		<div class="span-6 text_left last">
                        			<s:label id="bookInfo.quoteFlagName" name="bookInfo.quoteFlagName" keep="1"/>
                        		</div>
                        	</div>
                    	</div>
                    </s:if>
                    
                    <div class="span-18 text_right last">
                		<div class="span-8">
                        	<div class="span-3">
                        		<s:label value="发布日期：" />
                        	</div>
                        	<div class="span-5 text_left last">
                        		<s:label id="bookInfo.createTime" name="bookInfo.approverTime" keep="1"/>
                       		</div>
                       	</div>
                       	<div class="span-9">
                        	<div class="span-3">
                        		<s:label value="来源：" />
                        	</div>
                        	<div class="span-6 text_left last">
                        		<s:label id="bookInfo.source" name="bookInfo.source"  keep="1"/>
                       		</div>
                        </div>
                    </div>
                    
                    <div class="span-18 text_right last">
                       	<div class="span-8">
                      		<div class="span-3">
                        		<s:label value="发布者：" />
                        	</div>
                        	<div class="span-5 text_left last">
                        		<s:label id="bookInfo.createUserName" name="bookInfo.approverUserName" keep="1"/>
                        	</div>
                       		
                       	</div>
                       	<div class="span-9">
                        	<div class="span-3">
                        		<s:label value="关键字：" />
                        	</div>
                        	<div class="span-6 text_left last">
                        		<s:label id="bookInfo.keyword" name="bookInfo.keyword"  keep="1"/>
                        	</div>
                        </div>
                    </div>
                    
                    <div class="span-18 last">
                        <div class="span-3 text_right">
                        	<s:label value="编辑者：" />
                        </div>
                        <div class="span-13 text_left last">
                        	<s:label id="bookInfo.updateUserName" name="bookInfo.updateUserName" keep="1"/>
                        </div>
                    </div>
                    <div class="span-18 margin_top_6 last" id="txtAbstract">
                        <div class="span-3 text_right">
                        	<s:label value="概述：" />
                        </div>
                        <div class="span-10 last">
                        	<s:textarea cssClass="span-10" id="abstract" rows="4" cols="50"  name="bookInfo.bookAbstract" readOnly='true'/>
                        </div>
                    </div>
                    <s:if test="bookInfo.versionNo != 1 || bookInfo.updateNo != 0">
                    	<div class="span-18 margin_top_6 last" id="txtModifyHistory">
                       		<div class="span-3 text_right">
                        		<s:label value="变更履历：" />
                        	</div>
                        	<div class="span-10 last">
								<s:textarea cssClass="span-10" id="modifyHistory" rows="2" cols="50" name="bookInfo.modifyHistory" readOnly='true'/>
							</div>
                    	</div>
                    </s:if>
                    <s:if test="mode == 3">
                    	<div class="span-18 margin_top_6 last" id="approverBook">
                       		<div class="span-3 text_right">
                      		  	<s:label value="不批准理由：" />
                     	   	</div>
                     	   	<div class="span-10">
								<s:textarea cssClass="span-10" id="txtRefuseReason" rows="4" cols="50" name="bookInfo.refuseReason"/>
           					</div>
           					<div class="span-2">
                				<input type="button" id="btnRatifyBook" value="批准" class="span-2 btn" onclick="ratifyBook()"/>
                			</div>
             				<div class="span-2">
           						<input type="button" id="btnRefuseBook" value="不批准" class="span-2 btn" onclick="refuseBook()"/>
           					</div>
                    	</div>
                    </s:if>
                </div>
            </div>
            <!-- 按钮区域 -->
            <div class="span-24 prepend-1 margin_top_6">
                <s:if test="bookChapterNum == 1">
                	<div class="span-2">
                		<input type="button" id="btnOpenBook" value="打开" class="span-2 btn" onclick="openBookContent()"/>
                	</div>
                </s:if>
                <s:if test="mode == 4">
                	<div class="span-2">
                		<input type="button" id="btnDeleteBook" value="删除" class="span-2 btn" onclick="deleteBook()"/>
                	</div>
                </s:if>
       		</div>
       		<!-- 教材章节目录显示区域 -->
       		<s:if test="bookChapterNum != 1">
            	<div class="span-24 margin_top_10 treenav margin_bottom_10">
					<ul class="title_2 text_left prepend-1">
						<s:label value="教材章节目录" />
					</ul>
            		<div class="span-24 prepend-2 treenav overflow_auto maxheight" id="divmenulist">
            			<s:iterator value="bookMenuList" id="menulist"> 
					  		<ul class="prepend-${showLevel - 1}">
								<li>
									<a href="#" onclick="getContentByChapterNo(${chapterNo})">
										<s:property value="chapterTitle"></s:property>
									</a>
								</li>
		        	  		</ul>
					 	</s:iterator> 
					</div>
            	</div>
            </s:if>
            <div class="clear_both"></div>　　
            <div class="prepend-2 span-20">
				<s:fielderror></s:fielderror>
			</div>
    	</s:form>
		</div>

        </div>
  	</div>
	<s:include value="../manager/foot.jsp" />
	</div>
	</body>
</html>
