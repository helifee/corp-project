<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
		<!-- 共通css -->
		<link rel="stylesheet" type="text/css" href="../css/gray.css">
		<link rel="stylesheet" type="text/css" href="../css/manual.css">
		<link rel="stylesheet" type="text/css" href="../js/highlighter/highlighter.css">
		<!-- 共通js -->
		<script type="text/javascript" src="../js/common/prototype.js"></script>
		<script type="text/javascript" src="../js/common/util.js"></script>
		<script type="text/javascript" src="../js/common/sortTable.js"></script>
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
					<!-- 内容开始 -->
					<div class="container span-20 last">
						<div class="title">
							<div class="float_l"><h2>表格排序</h2></div>
							<div class="float_r"><hr class="codetoggleall"/></div>
						</div>
						<div class="span-20 last">
							<div class="h2">一、 功能简介</div>
							<div class="prepend-1">
								给表格加上排序和选择列个能，可指定排序方式与数据源。
								<ul>
									<li>需要引用 <b>js/common/sortTable.js</b> </li>
								</ul>
							</div>
						</div>
						<div class="span-20 last">
							<div class="h2 float_l">
								二、实例说明
							</div>
							<div class="prepend-1 span-19">
								<div class="span-18 prepend-h">
									<div class="module code">
										<div class="module_header">
											实例演示：
										</div>
										<div class="module_body span-17">
											<div class="span-16 prepend-h">
												<!-- SAMPLE START -->
												<div class="box_border span-16 last overflow_hd">
													<table class="datagrid2" id="myHead">
														<tr>
															<th class="percent_8" sorttype="number">ID</th>
															<th locked="1">书名</th>
															<th class="percent_12">作者</th>
															<th class="percent_24">出版社</th>
															<th class="percent_12" nosort="1">ISBN</th>
															<th class="percent_12" sorttype="number" source="me.innerHTML.substr(1)">售价</th>
														</tr>
													</table>
													<div class="span-16 last">
														<div class="span-16 last">
															<table class="datagrid2" id="myTable">
																<tbody>
																	<s:iterator var="book" value="bookList" status="st">
																		<tr>
																			<td class="percent_8 text_center">${book.bookId}</td>
																			<td class="">${book.bookName}</td>
																			<td class="percent_12 text_center">${book.bookAuthor}</td>
																			<td class="percent_24">${book.bookPublisher}</td>
																			<td class="percent_12 text_center">${book.bookIsbn}</td>
																			<td class="percent_12 text_right padding_scroll">￥${book.bookPrice}</td>
																		</tr>
																	</s:iterator>
																</tbody>
															</table>
														</div>
													</div>
												</div>
												<script type="text/javascript">
													Event.observe(window, 'load', function(){
														listColor('myTable',400);
														new SortTable('myHead', 'myTable');
													});
												</script>
												<!-- SAMPLE END -->
											</div>
										</div>
									</div>
								</div>
								<div class="prepend-1 span-18">
									<div class="h4 float_l">1. 表格配置</div>
									<div class="module code">
										<div class="module_header">
											JSP：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: xml">
												&lt;div class="box_border span-16 last overflow_hd"&gt;
													&lt;table class="datagrid2" id="myHead"&gt;
														&lt;tr&gt;
															&lt;th class="percent_8" sorttype="number"&gt;ID&lt;/th&gt;
															&lt;th locked="1"&gt;书名&lt;/th&gt;
															&lt;th class="percent_12"&gt;作者&lt;/th&gt;
															&lt;th class="percent_24"&gt;出版社&lt;/th&gt;
															&lt;th class="percent_12" nosort="1"&gt;ISBN&lt;/th&gt;
															&lt;th class="percent_12" sorttype="number" source="me.innerHTML.substr(1)"&gt;售价&lt;/th&gt;
														&lt;/tr&gt;
													&lt;/table&gt;
													&lt;div class="span-16 last"&gt;
														&lt;div class="span-16 last"&gt;
															&lt;table class="datagrid2" id="myTable"&gt;
																&lt;tbody&gt;
																	&lt;s:iterator var="book" value="bookList" status="st"&gt;
																		&lt;tr&gt;
																			&lt;td class="percent_8 text_center"&gt;${book.bookId}&lt;/td&gt;
																			&lt;td class=""&gt;${book.bookName}&lt;/td&gt;
																			&lt;td class="percent_12 text_center"&gt;${book.bookAuthor}&lt;/td&gt;
																			&lt;td class="percent_24"&gt;${book.bookPublisher}&lt;/td&gt;
																			&lt;td class="percent_12 text_center"&gt;${book.bookIsbn}&lt;/td&gt;
																			&lt;td class="percent_12 text_right padding_scroll"&gt;￥${book.bookPrice}&lt;/td&gt;
																		&lt;/tr&gt;
																	&lt;/s:iterator&gt;
																&lt;/tbody&gt;
															&lt;/table&gt;
														&lt;/div&gt;
													&lt;/div&gt;
												&lt;/div&gt;
											</pre>
										</div>
									</div>
								</div>
								<div class="prepend-1 span-18">
									<div class="h4 float_l">2. 初始化JS</div>
									<div class="module code">
										<div class="module_header">
											Javascript：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: js">
												new SortTable('myHead', 'myTable');
											</pre>
										</div>
									</div>
								</div>
								<div class="prepend-1 span-18">
									<div class="h4 float_l">3. Source属性说明</div>
									<div class="float_l clear_both">
										在排序时，会使用source属性中的js语句来获取该TD的内容。
									</div>
									<div class="module code">
										<div class="module_header">
											Text：<hr class="codetoggle"/>
										</div>
										<div class="module_body span-17">
											<div class="span-14 prepend-h">
											A、<br/>
											　结构：&lt;td&gt;&lt;span class="bd"&gt;编号：&lt;/span&gt;&lt;span&gt;89757&lt;/span&gt;&lt;/td&gt;<br/>
											　写法：source="me.down().next().innerHTML"<br/>
											B、<br/>
											　结构：&lt;td&gt;$598.35&lt;/td&gt;<br/>
											　写法：source="me.innerHTML.substr(1)"<br/>
											C、<br/>
											　结构：&lt;td pinyin="zhangsan"&gt;张三&lt;/td&gt;<br/>
											　写法：source="me.readAttribute('pinyin')"
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="span-20 last">
							<div class="h2">三、 方法接口</div>
							<div class="prepend-1 span-19 last">
								<div class="h3">1. 绑定排序功能</div>
								<div class="prepend-h span-18 h4">
									new SortTable(headId, bodyId) 绑定排序 
								</div>
								<div class="prepend-h span-18">
									<ul class="font_mono">
										<li class="font_size_14"><b>headId</b>:string 表头部分表格ID</li>
										<li class="font_size_14"><b>bodyId</b>:string 数据部分表格ID</li>
									</ul>
								</div>
							</div>
							<div class="prepend-1 span-19 last">
								<div class="h3">2. 表头属性</div>
								<div class="prepend-h span-18">
									<ul class="font_mono">
										<li class="font_size_14"><i>sorttype</i>:string 排序方式(string,number,date)，默认为string</li>
										<li class="font_size_14"><i>locked</i>:int 设为1则此列不可隐藏</li>
										<li class="font_size_14"><i>nosort</i>:int 设为1则此列不可排序</li>
										<li class="font_size_14"><i>source</i>:string 排序数据源，内容为一句JS代码，以me表示当前单元格</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="span-20 last">
							<div class="h2">四、 常见问题</div>
							<div class="prepend-1 span-19 last">
								<div class="h3">1. 没有</div>
							</div>
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
