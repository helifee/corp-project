<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	
	<!-- 共通css -->
	<link rel="stylesheet" type="text/css" href="<%=basePath %>css/style.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath %>/css/manual.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath %>/js/highlighter/highlighter.css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/highlighter/highlighter.js"></script>
	<script type="text/javascript" src="<%=basePath %>/js/manual/common.js"></script>
	

	<title>related select</title>
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
							<div class="float_l"><h2>树形分类下拉列表</h2></div>
							<div class="float_r"><hr class="codetoggleall"/></div>
						</div>
						<div class="span-20 last">
							<div class="h2">一、 功能简介</div>
							<div class="prepend-1">
								树形分类下拉列表:下拉列表的内容采用树形的分类结构表示，适用于二级分类条件的显示。
								<br/>
								该下拉框返回值为：大分类ID，小分类ID。如返回字符串 ——"001,0001" ； 下拉框首项的返回值和显示内容由用户自己设定。						
							</div>
						</div>
						<div class="span-20 last">
							<div class="h2 float_l">
								二、示例说明
							</div>							
							<div class="prepend-1 span-19">								
								<div class="prepend-h span-18">
									<div class="module code">
										<div class="module_header">
											实例演示：
										</div>
										<div class="module_body span-17 margin_left_10 last">
											<s:select name="cityName" listKey="categoryKey" listValue="categoryValue" list="treeInfoList" />
										</div>
									</div>
								</div>
								<div class="prepend-1 span-18">	
									<div class="h4 float_l">1.检索bean</div>
									<div class="float_l clear_both">
										检索bean必须继承包com.yds.common.bean下的TreeListResult接口，接口中对应关系如下：
										<br/>
										refID1():对应一级分类的ID;
										<br/>
										refID2():对应二级分类的ID; 
										<br/>
										refName1():对应一级分类的名字;
										<br/>
										refName2()：对应二级分类的名字。
									</div>
									<div class="module code">
										<div class="module_header">
											bean：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: java">										
												String provinceId;
											    String provinceName;
											    String cityId;
											    String cityName;
												
												public String getProvinceId() {
													return provinceId;
												}
												public void setProvinceId(String provinceId) {
													this.provinceId = provinceId;
												}
												public String getProvinceName() {
													return provinceName;
												}
												public void setProvinceName(String provinceName) {
													this.provinceName = provinceName;
												}
												public String getCityId() {
													return cityId;
												}
												public void setCityId(String cityId) {
													this.cityId = cityId;
												}
												public String getCityName() {
													return cityName;
												}
												public void setCityName(String cityName) {
													this.cityName = cityName;
												}

												//一级分类的ID对应省的ID
												@Override
												public String refID1() {
													return provinceId;
												}
												//二级分类的ID对应城市的ID
												@Override
												public String refID2() {
													return cityId;	
												}
												//一级分类的名字对应省的名字
												@Override
												public String refName1() {
											        return provinceName;
												}
												//二级分类的名字对应城市的名字
												@Override
												public String refName2() {		
													return cityName;
												}
											</pre>
										</div>
									</div>
									<div class="h4 float_l">2.Service代码</div>
									<div class="module code">
										<div class="module_header">
											Service：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: java">
												//调用包 com.yds.util.service下的ListToTreeCMB内的convert方法，
												//将从数据库中检索出来的列表转化成放入页面标签【select】内的列表类型。
												public List&lt;TreeListInfo&gt; getTreeInfoList(String... diff) {
													return ListToTreeCMB.convert((List)treeComboxDao.getCityInfoList(),diff);
												}
												}
											</pre>
										</div>
									</div>
									<div class="h4 float_l">3.JSP文件</div>																
									<div class="module code">
										<div class="module_header">
											JSP：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: html">											    
												&lt;s:select name="cityName" list="treeInfoList" listKey="categoryKey" listValue="categoryValue" /&gt;												
											</pre>											
										</div>										
									</div>					
								</div>																									
							</div>						
						</div>
						<div class="span-20 last">
						    <div class="h2">三、 方法接口</div>
							<div class="prepend-1 span-19 last">
								<div class="h3">1. 树形分类下拉框转化方法</div>
								<div class="prepend-h span-18 h4">
									ListToTreeCMB.convert(listInfo,diff ...) 
								</div>
								<div class="prepend-h span-18">
									<ul class="font_mono">
										<li class="font_size_14"><b>listInfo</b>:List&lt;TreeListResult&gt; 检索出的列表</li>
										<li class="font_size_14"><b>diff ...</b>:不定参数，用于设定下拉框的首项返回值和显示内容。<br/>	
											<div class="prepend-2 span-16">一个参数时:设定下拉框首项显示内容，返回值为空。</div>
											<div class="prepend-2 span-16">二个参数时:参数一为首项返回值；参数二为首项显示内容。</div>	
											<div class="prepend-2 span-16">其他情况时:下拉框首项为检索出列表的树形结构第一项。</div>
										</li>										
										<li class="font_size_14"><b>返回值</b>:List&lt;TreeListInfo&gt; 下拉框显示的列表</li>
									</ul>
								</div>
							</div>
							<div class="prepend-1 span-19 last">
								<div class="h3">2. 传入数据接口</div>
								<div class="prepend-h span-18 h4">
									public interface TreeListResult {
									<br/>
									　　　　//一级分类的ID
									<br/>
									　　　　public String refID1();
									<br/>
									　　　　//二级分类的ID
									<br/>
									　　　　public String refID2();
									<br/>
									　　　　//一级分类的名字
									<br/>	
									　　　　public String refName1();
									<br/>
									　　　　//二级分类的名字
									<br/>
									　　　　public String refName2();
									<br/>	
									} 
								</div>								
							</div>							
						</div>
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