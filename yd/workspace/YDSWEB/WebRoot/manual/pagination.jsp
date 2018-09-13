<%--
 * @(#)pagination.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 开发手册
--%>

<%--
 * 分页示例
 * 
 * @author 远东)xupai
 * @version 1.00 2010/08/04
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<!-- 共通css -->
<link href="../css/gray.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="../css/gray.css">
<link rel="stylesheet" type="text/css" href="../css/manual.css">
<link rel="stylesheet" type="text/css"
	href="../js/highlighter/highlighter.css">
<!-- 共通js -->
<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/highlighter/highlighter.js"></script>
<script type="text/javascript" src="<%=basePath%>js/manual/common.js"></script>

<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath%>js/manual/pagination.js"></script>
<title>分页示例</title>
</head>
<body  class="bgclr_gray">
<table class="mbg">
	<tr>
		<td class="mbg_lt"></td>
		<td class="mbg_t"></td>
		<td class="mbg_rt"></td>
	</tr>
	<tr>
		<td class="mbg_l"></td>
		<td class="mbg_c"><!-- 内容区域 -->
			<div class="container span-20 last">
				<div class="title">
					<div class="float_l">
						<h2>数据分页显示</h2>
					</div>
				<div class="float_r">
					<hr class="codetoggleall" />
				</div>
				</div>
			<div class="span-20 last">
			<div class="h2">一、 功能简介</div>
				<div class="prepend-1">当查询的数据列表超过一定条数，无法同时显示在同一页面时需要进行数据分页显示处理。
					<ul>
						<li>需要引用 <b>/common/pagerNavigation.jsp"</b></li>
					</ul>
				</div>
			</div>
			<div class="span-20 last">
				<div class="h2 float_l">二、实例说明</div>
					<div class="prepend-1 span-19">
						<div class="span-18 prepend-h">
							<div class="module code">
								<div class="module_header">实例演示：</div>
								<div class="module_body span-17">
								<div class="span-16 prepend-h">
								<!-- SAMPLE START --> 
									<s:form id = "paginationForm" action="manualFindPageLst" namespace="/manual"  method="post" validate ="true" >
										<div class="span-16">
						            		<div class="span-3 text_center"><s:label value="作品名称：" /></div>
											<div class="span-4"><s:textfield id="belongto" name="paginationCondA.belongto"  cssClass="span-3"/></div>
											<input type="button" id="Search" name="search" Value="查询" class="btn span-2"  onclick="searchPageInfo()"/>
										</div>
									</s:form>
									<s:hidden	id="oldParam" name="oldParam" value="" />
										<div id="div_manual_pagelist" align="center">
											
										</div>
								</div>
								<!-- SAMPLE END -->
								</div>
							</div>
						</div>
					</div>
					<div class="prepend-1 span-18">
						<div class="h4 float_l">1. 分页共通</div>
						<div class="module code">
							<div class="module_header">JSP：
								<hr class="codetoggle none" />
							</div>
							<div class="module_body span-17"><pre class="brush: xml">	
								&lt;div class="span-16 text_center"&gt;
									&lt;s:include	value="/common/pagerNavigation.jsp" /&gt;
								&lt;/div&gt;
								&lt;div class="span-16"&gt;
									&lt;div class="span-16 bd_1s000 overflow_hd margin_top_4"&gt;
										&lt;table id="table_peoListHead" class="datagrid2"&gt;
											&lt;tr&gt;
												&lt;th class="percent_12"&gt;ID&lt;/th&gt;
												&lt;th class="percent_10 "&gt;作品名&lt;/th&gt;
												&lt;th class="percent_12 "&gt;英文名&lt;/th&gt;
												&lt;th class="percent_12  "&gt;中文名&lt;/th&gt;
												&lt;th class="percent_10 "&gt;昵称&lt;/th&gt;
												&lt;th&gt;简介&lt;/th&gt;
											&lt;/tr&gt;
										&lt;/table&gt;
									&lt;/div&gt;
									&lt;div id="table_peo" class="span-16 overflow_scr_y"&gt;
										&lt;div class="span-16"&gt;
											&lt;table id="table_peoList" class="datagrid2"&gt;
												&lt;s:if test="paginationCondAList.size &gt; 0"&gt;
													&lt;s:iterator value="paginationCondAList"&gt;
														&lt;tr&gt;
															&lt;td class="text_center percent_12"&gt;&lt;s:property value="id" /&gt;&lt;/td&gt;
															&lt;td class="text_left percent_10"&gt;&lt;s:property value="belongto" /&gt;&lt;/td&gt;
															&lt;td class="text_left percent_12"&gt;&lt;s:property value="ennm" /&gt;&lt;/td&gt;
															&lt;td class="text_left percent_12"&gt;&lt;s:property value="chnm" /&gt;&lt;/td&gt;
															&lt;td class="text_left percent_10"&gt;&lt;s:property value="nicknm" /&gt;&lt;/td&gt;
															&lt;td&gt;&lt;s:property value="introduce" /&gt;&lt;/td&gt;
														&lt;/tr&gt;
													&lt;/s:iterator&gt;
												&lt;/s:if&gt;
											&lt;/table&gt;
										&lt;/div&gt;
									&lt;/div&gt;
								&lt;/div&gt;
							</pre></div>
							
							</div>
							<div class="clear_both"><p>在表格的上方引用分页共通jsp</p></div>
						</div>
						<div class="prepend-1 span-18">
						<div class="h4 float_l">2. 分页用JS</div>
						<div class="module code">
							<div class="module_header">Javascript：
								<hr class="codetoggle none" />
							</div>
							<div class="module_body span-17"><pre class="brush: js">
													
													//点击 第几页时调用的提交函数。
													function pagerCommonTag(pageUrl , pageNumber){
														
														//调用自己的具体实现 函数 ，该函数中必须至少包含pageUrl , pageNumber两个参数
														myOwnPagerSubmit(pageUrl , pageNumber);
													
													}
													
													//实现自己的分页提交。
													function myOwnPagerSubmit(pageUrl , pageNumber){
														
														//从隐藏控件中取出上次使用的检索条件
														var pars = $('oldParam').value;
														//设定url以及其余参数
														var url = pageUrl +'&pageNumber=' + pageNumber + '&' +pars;
														new Ajax.Updater('div_manual_pagelist', url , {    
															   onLoading : function() {},
															   onSuccess : function(response) {},
															   onComplete : function(response) {
																   var flg = checkException(response);
																    if(!flg) {		    	
																		listColor('table_peoList', 200);
													
																    }
															   }
														   });		
													}
					
										</pre></div>
								</div>
							</div>
							<div class="prepend-1 span-18">
							<div class="h4 float_l">3. 分页用action</div>
								<div class="module code">
								<div class="module_header">action：
									<hr class="codetoggle none" />
								</div>
								<div class="module_body span-17"><pre class="brush: java">	
									public String findPaginationCondALst() throws Exception {
										paginationCondA = new PaginationCondA();
										super.setPagerParamter(
												paginationService.getTotalCount(paginationCondA),
												"manualFindPageLst.action");
								
										this.paginationCondAList = paginationService.getPaginationCondAList(
												pager.getOffset().intValue(), pager.getPerDisplayCount()
														.intValue(), paginationCondA);
								
										return SUCCESS;
									}		
										
									</pre></div>
								</div>
							</div>
														<div class="prepend-1 span-18">
							<div class="h4 float_l">4. 分页用Dao</div>
								<div class="module code">
								<div class="module_header">Dao：
									<hr class="codetoggle none" />
								</div>
								<div class="module_body span-17"><pre class="brush: java">	
									public List&lt;PaginationCondA&gt; getPaginationCondAList(int offset,
											int perCounts, PaginationCondA paginationCondA);
									</pre></div>
								</div>
								<div class="clear_both"><p>增加两项传入参数：offset 数据开始数；perCounts 每页显示条数</p></div>
							</div>
						</div>
					</div>
				<div class="span-20 last">
					<div class="h2">三、 方法接口</div>
					<div class="prepend-1 span-19 last">
						<div class="h3">1. 继承类</div>
						<div class="prepend-h span-18">Action 里面继承BasePagerAction类</div>
						</div>
						<div class="prepend-1 span-19 last">
							<div class="h3">2. 参数介绍</div>
							<div class="prepend-h span-18">
								<ul class="font_mono">
									<li class="font_size_14">offset： 数据开始条数</li>
									<li class="font_size_14">perCounts： 每页显示数据总数（默认20条）</li>
									<li class="font_size_14">public Long getTotalCount()： 获得数据总数</li>
								</ul>
							</div>
						</div>
				</div>
				<div class="span-20 last">
					<div class="h2">四、 常见问题</div>
					<div class="prepend-1 span-19 last">
						<div class="h3">1. 画面迁移</div>
				<div class="clear_both"><p>画面迁移后返回迁移前画面，如需保存迁移前画面状态，需要在session里面保存当前画面信息</p></div>						

						
					</div>
				</div>

		<!-- 内容结束 --></td>
		<td class="mbg_r"></td>
	</tr>
	<tr>
		<td class="mbg_lb"></td>
		<td class="mbg_b"></td>
		<td class="mbg_rb"></td>
	</tr>
</table>
<script type="text/javascript">
	SyntaxHighlighter.config.clipboardSwf = "../js/highlighter/scripts/clipboard.swf";
	SyntaxHighlighter.all();
</script>
</body>
</html>