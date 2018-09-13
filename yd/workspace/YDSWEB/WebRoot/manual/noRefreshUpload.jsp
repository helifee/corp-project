<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>无刷新上传</title>
		<!-- 共通css -->
		<link rel="stylesheet" type="text/css" href="<%=basePath%>${session.userTheme}">
		<link rel="stylesheet" type="text/css" href="<%=basePath %>css/manual.css">
		<link rel="stylesheet" type="text/css" href="<%=basePath %>js/highlighter/highlighter.css">
		<!-- 共通js -->
		<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
		<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
		<script type="text/javascript" src="<%=basePath %>js/highlighter/highlighter.js"></script>
		<script type="text/javascript" src="<%=basePath %>js/manual/common.js"></script>
		<script type="text/javascript" src="<%=basePath %>js/common/JsFileUpload.js"></script>
	</head>
	
	<script language="javascript">
		function init() {
			// 无刷新文件上传
			new JsFileUpload({
				fileInputId: 'upload',
				eventElementId: 'uploadButton',
				backVarName: 'fileName',
				onSuccess: function() {
					$('testImg').src = getTempUrl($('fileName').value);
				}
			});
			window['g_path'] = '<%=path %>';
			window['g_basePath'] = '<%=basePath %>';
		}
	</script>
	
	<body onLoad="init()" class="bgclr_gray">
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
							<div class="float_l"><h2>无刷新上传</h2></div>
							<div class="float_r"><hr class="codetoggleall"/></div>
						</div>
							
						<!-- 功能简介  -->
						<div class="span-20 last">
							<div class="h2">一、 功能简介</div>
							<div class="prepend-1">
								使用共通的文件上传action(uploadFile)上传文件，不刷新页面。
								<br/>
								将文件存放在临时目录中并返回临时文件名，通过另一个共通action(getTempImage)来下载它。
								<ul>
									<li>需要引用 <b>js/common/JsFileUpload.js</b> </li>
								</ul>
							</div>
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
												<div class="margin_bottom_8"><img id="testImg" class="ttImg"></img></div>
												<input type="file" id="upload" name="uploadA" class="jsFileInput cur_pointer"/>
												<input id="uploadButton" type="button" value="上传图片" class="btn span-2"/>
												<s:hidden id="fileName" name="fileName"/>
												<s:fielderror></s:fielderror>
											</div>
										</div>
									</div>
								</div>
								<div class="prepend-1 span-18">
									<div class="h4 float_l">1. JSP代码</div>
									<div class="module code">
										<div class="module_header">
											html：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: html">
												&lt;body onload="init()"&gt;
												&lt;div&gt;&lt;img id="testImg" class="ttImg"&gt;&lt;/img&gt;&lt;/div&gt;
												&lt;input type="file" id="upload" name="upload" class="jsFileInput cur_pointer"/&gt;
												&lt;input id="uploadButton" type="button" value="上传图片" class="btn span-2"/&gt;
												&lt;s:hidden id="fileName" name="fileName"/&gt;
											</pre>
										</div>
									</div>
								</div>
								<div class="prepend-1 span-18">
									<div class="h4 float_l">2. Js代码</div>
									<div class="module code">
										<div class="module_header">
											Javascript：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: js">
												function init() {
													// 无刷新文件上传
													new JsFileUpload({
														fileInputId: 'upload',					// file控件ID
														backVarName: 'fileName',				// 储存路径的隐藏控件ID
														eventElementId: 'uploadButton',			// 上传图片按钮ID
														onSuccess: function() {					// 成功返回执行方法
															$('testImg').src = getTempUrl($('fileName').value);
														}
													});
												}
											</pre>
										</div>
									</div>
								</div>
								<div class="prepend-1 span-18">
									<div class="h4 float_l">3.文件转储</div>
									<div class="float_l clear_both">
										文件成功上传后，将暂时存放在临时目录，并返回一个临时文件名用来引用(例如显示出图片)。
										<br/>
										提交它到你的action中，在Action中把此临时文件转存到目标位置完成上传。
									</div>
									<div class="module code">
										<div class="module_header">
											Java：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: xml">
												// 文件扩展名会自动保持。
												FileUtil.saveFile(fileName, propMgr.getParameter(CommonConstants.FILE_PATH.EMP_IMG.value()), empId);
											</pre>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<!-- 方法接口  -->
						<div class="span-20 last">
							<div class="h2">三、 方法接口</div>
							<div class="prepend-1 span-19 last">
								<div class="h3">初始化方法</div>
								<div class="prepend-h span-18 h4">
									JsFileUpload(options) 无刷新文件上传
									<br/>
									参数属性：
								</div>
								<div class="prepend-h span-18">
									<ul class="font_mono">
										<li class="font_size_14"><b>fileInputId</b>:string file控件ID</li>
										<li class="font_size_14"><b>backVarName</b>:string 储存路径的隐藏控件ID</li>
										<li class="font_size_14"><b>eventElementId</b>:string 上传图片按钮ID</li>
										<li class="font_size_14"><i>onUpload</i>:function 上传时调用的方法（返回false则不进行上传）</li>
										<li class="font_size_14"><i>onSuccess</i>:function 成功返回执行方法</li>
									</ul>
								</div>
							</div>
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
