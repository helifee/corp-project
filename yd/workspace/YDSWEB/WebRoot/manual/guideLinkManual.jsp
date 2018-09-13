<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>导航栏</title>
		<!-- 共通css -->
		<link rel="stylesheet" type="text/css" href="../css/gray.css">
		<link rel="stylesheet" type="text/css" href="../css/manual.css">
		<link rel="stylesheet" type="text/css" href="../js/highlighter/highlighter.css">
		<!-- 共通js -->
		<script type="text/javascript" src="../js/common/prototype.js"></script>
		<script type="text/javascript" src="../js/common/util.js"></script>
		<script type="text/javascript" src="../js/highlighter/highlighter.js"></script>
		<script type="text/javascript" src="../js/manual/common.js"></script>
	</head>
	
	<body class="bgclr_gray">
		<table class="mbg">
			<tr>
				<td class="mbg_lt"></td>
				<td class="mbg_t"></td>
				<td class="mbg_rt"></td>
			</tr>
			<tr>
				<td class="mbg_l"></td>
				<td class="mbg_c">
					
					<!-- 内容开始  -->
					<div class="container span-20 last">
						<div class="title">
							<div class="float_l"><h2>导航栏</h2></div>
							<div class="float_r"><hr class="codetoggleall"/></div>
						</div>
						
						<!-- 功能简介  -->
						<div class="span-20 last">
							<div class="h2">一、 功能简介</div>
							<div class="prepend-1">显示当前页面位置的导航栏。</div>
						</div>
						
						<!-- 示例说明  -->
						<div class="span-20 last">
							
							<div class="h2">二、示例说明</div>
							<div class="prepend-1 span-19">
								<div class="span-18 prepend-h">
									<div class="module code">
										<div class="module_header">
											实例演示：
										</div>
										<div class="module_body span-17">
											<div class="span-16 text_center">
												<p><a href="guideA.action">进入A页面</a></p>
												<p><a href="guideD.action">进入D页面</a></p>
												
												<p>A页面 -&gt; B页面 -&gt; C页面</p>
												<p>D页面 -&gt; E页面 -&gt; C页面</p>
											</div>
										</div>
									</div>
								</div>
								
								<div class="prepend-1 span-18">
									<div class="h4 float_l">1. 节点结构</div>
									<div class="float_l clear_both">
										在需要导航栏的页面引入导航JSP
									</div>
									<div class="module code">
										<div class="module_header">
											JSP：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: html">
												&lt;jsp:include page="../../common/guideLink.jsp" /&gt;
											</pre>
										</div>
									</div>
								</div>
									
								<div class="prepend-1 span-18">
									<div class="h4 float_l">2. 节点配置</div>
									<div class="float_l clear_both">
										对guideLink.xml进行配置
									</div>
									<div class="module code">
										<div class="module_header">
											xml：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: xml">
												&lt;?xml version="1.0" encoding="UTF-8" ?&gt;
												
												&lt;root title="Guide Link Manual" action="/manual/guideLinkManual.action"&gt;
													
													&lt;node title="A页面" action="/manual/guideA.action"&gt;
														&lt;node title="B页面" action="/manual/guideB.action"&gt;
															&lt;node title="C页面" action="/manual/guideC.action"&gt;	
															&lt;/node&gt;
														&lt;/node&gt;
													&lt;/node&gt;
													
													&lt;node title="D页面" action="/manual/guideD.action" clickable="0"&gt;
														&lt;node title="E页面" action="/manual/guideE.action"&gt;
															&lt;!-- 同一action有多条路径，用action后第一个参数的值来区分 --&gt;
															&lt;node title="C页面" action="/manual/guideC.action1"&gt;	
															&lt;/node&gt;
														&lt;/node&gt;
													&lt;/node&gt;
													
												&lt;/root&gt;
											</pre>
											<div class="clear_both prepend-1">
												<p>title : 链接显示内容</p>
												<p>action : action路径</p>
												<p>clickable : 链接是否可点击，"0"不可点击，"1"可点击</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<!-- 方法接口  -->
						<div class="span-20 last">
							<div class="h2">三、 方法接口</div>
						</div>
						
						<!-- 常见问题  -->
						<div class="span-20 last">
							<div class="h2">四、 常见问题</div>
						</div>
						
					</div>
					<!-- 内容结束 -->
				</td>
				<td class="mbg_r"></td>
			</tr>
			<tr>
				<td class="mbg_lb"></td>
				<td class="mbg_b"></td>
				<td class="mbg_rb"></td>
			</tr>
		</table>
		<script type="text/javascript">SyntaxHighlighter.config.clipboardSwf="../js/highlighter/scripts/clipboard.swf";SyntaxHighlighter.all();</script>
	</body>
</html>
