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
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>/js/manual/relatedSelect.js"></script>
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
							<div class="float_l"><h2>联动下拉列表</h2></div>
							<div class="float_r"><hr class="codetoggleall"/></div>
						</div>
						<div class="span-20 last">
							<div class="h2">一、 功能简介</div>
							<div class="prepend-1">
								多级联动下拉列表；当上级列表的选择值变化时，发送异步请求（ajax）获得并刷新下级列表内容。
								<br/>
								下拉列表的数量和布局可以自由控制。 每个异步请求前后的动作（JS函数）也可自行设定。
							</div>
						</div>
						<div class="span-20 last">
							<div class="h2 float_l">
								二、示例说明
							</div>
							<div class="prepend-1 float_l clear_both">
								基本流程：在联动列表的jsp页面的onload中请求联动列表的数据（ajax），每个下拉列表对应一个请求数据源的action。
								<br/>
								设置默认值：根据jsp页面中的defaultValue="\${nationId}"，在请求页面的action中设定上nationId值就可以了。
								<br/>
								设置列表的第一项为空项或提示项（请选择等）：在service中对检索出的数据进行自行添加。
							</div>
							<div class="prepend-1 span-19">
								<div class="h3">1. 三级列表联动</div>
								<div class="prepend-1 span-18">
									<div class="module code">
										<div class="module_header">
											实例演示：
										</div>
										<div class="module_body span-17">
											&nbsp;&nbsp;
											<select id="nationId" name="nationId" defaultValue="${nationId}" class="span-2"></select>
											<select id="provinceId" name="provinceId" defaultValue="${provinceId}" class="span-2"></select>
											<select id="cityId" name="cityId" defaultValue="${cityId}" class="span-2"></select>
										</div>
									</div>
								</div>
								<div class="prepend-1 span-18">
									<div class="h4 float_l">1.1 JSP文件</div>
									<div class="float_l clear_both">
										下拉列表代码，可以根据需要进行布局。其中defaultValue为自定义属性，用来指定初期显示项。
									</div>
									<div class="module code">
										<div class="module_header">
											JSP：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: html">
												&lt;select id="nationId" name="nationId" defaultValue="\${nationId}"&gt;&lt;/select&gt;
												&lt;select id="provinceId" name="provinceId" defaultValue="\${provinceId}"&gt;&lt;/select&gt;
												&lt;select id="cityId" name="cityId" defaultValue="\${cityId}"&gt;&lt;/select&gt;
											</pre>
										</div>
									</div>
									<div class="h4 float_l">1.2 初始化脚本</div>
									<div class="float_l clear_both">
										页面加载时设定好的下拉列表的ID组和action组，调用registMultiSelect函数进行绑定。
									</div>
									<div class="module code">
										<div class="module_header">
											Javascript：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: js">
												// Id数组
												selectIdArr = ['nationId', 'provinceId', 'cityId'];
												// Action数组
												actionNameArr = ['getNationListAction.action', 'getProvinceListAction.action', 'getCityListAction.action'];
												registMultiSelect(selectIdArr, actionNameArr);				
											</pre>
										</div>
									</div>
									<div class="h4 float_l">1.3 后台代码</div>
									<div class="float_l clear_both">
										Action中要有页面中各select的name并且返回值类型为str.
										<br/>
										注意Action的namespace要与jsp文件的上级目录要一致如本例中都为manual.
									</div>
									<div class="module code">
										<div class="module_header">
											Action：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: java">
												//返回到页面的字符串
												private String selectList;
												
												//页面中各select的name
												private String nationId;
												private String provinceId;
												private String cityId;
								
												public String findNationList() throws Exception {
													
													//上级列表项Id
													String rootId = "000";
													
													this.setSelectList(relatedSelectService.getItemList(rootId));
											
													return SUCCESS;
												}
											</pre>
										</div>
									</div>
									<div class="module code">
										<div class="module_header">
											struts配置：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: xml">
												&lt;action name="getNationListAction" method="findNationList" class="relatedSelectAction"&gt;
													&lt;result name="success" type="str"&gt;selectList&lt;/result&gt;
												&lt;/action&gt;			
											</pre>
										</div>
									</div>
									<div class="module code">
										<div class="module_header">
											Service：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: java">
												//根据上级列表的选中ID，取得下级内容的方法。
												public String getItemList(String preId) throws Exception {
													//取得下拉列表内容
													List&lt;Item&gt; items = relatedSelectDao.getItemList(preId);

													// ListConverter： items（Bean）本身可以有很多属性，
													//该方法只把指定的两个属性(id,name)取出来，转化为下拉列表的key：value的形式。
													String str =ListConverter.convert(items,"id", "name");
													return str;
												}
											</pre>
										</div>
									</div>
								</div>
							</div>
							<div class="prepend-1 span-19">
								<div class="h3 float_l">2. 列表联动 & 数据加载前后回调</div>
								<div class="prepend-1 span-18">
									<div class="module code">
										<div class="module_header">
											实例演示：
										</div>
										<div class="module_body span-17">
											&nbsp;&nbsp;
											<select id="nationId2" name="nationId2" defaultValue="${nationId2}"></select>
											<s:label id="nationId2Status" name="nationId2Status" value="　"/>
											<select id="provinceId2" name="provinceId2" defaultValue="${provinceId2}"></select>
											<s:label id="provinceId2Status" name="provinceId2Status" value="　"/>
										</div>
									</div>
								</div>
								<div class="prepend-1 float_l">
									<div class="h4 float_l">1.1 JSP内容：</div>
									<div class="module code">
										<div class="module_header">
											JSP：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: html">
												&lt;select id="nationId2" name="nationId2" defaultValue="${nationId2}"&gt;&lt;/select&gt;
												&lt;s:label id="nationId2Status" name="nationId2Status" value="　"/&gt;
												&lt;select id="provinceId2" name="provinceId2" defaultValue="${provinceId2}"&gt;&lt;/select&gt;
												&lt;s:label id="provinceId2Status" name="provinceId2Status" value="　"/&gt;
											</pre>
										</div>
									</div>
									<div class="h4 float_l">1.2 初始化脚本：</div>
									<div class="float_l clear_both">
											调用registMultiSelect函数是，传入了自定义的两个函数，这两个函数分别在每次发送ajax请求的前后执行。
									</div>
									<div class="module code">
										<div class="module_header">
											Javascript：<hr class="codetoggle none"/>
										</div>
										<div class="module_body span-17">
											<pre class="brush: js">
												//带回调函数
												registMultiSelect(selectIdArr2, actionNameArr2, beforeLoad, afterLoad);	
												function beforeLoad(selectId) {
													$(selectId + 'Status').update('等');
												}
												function afterLoad(selectId) {
													$(selectId + 'Status').update('好');
												}
											</pre>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="span-20 last">
							<div class="h2">三、 方法接口</div>
							<div class="prepend-1 span-19 last">
								<div class="prepend-h span-18 last">
									<div class="span-18 h4">
										registMultiSelect(selectIdArr, actionNameArr[, beforeLoad, afterLoad]) 绑定联动菜单
									</div>
									<ul class="font_mono">
										<li class="font_size_14"><b>selectIdArr</b>:array 下拉菜单Id数组</li>
										<li class="font_size_14"><b>actionNameArr</b>:array action数组</li>
										<li class="font_size_14"><i>beforeLoad</i>:function  加载前回调</li>
										<li class="font_size_14"><i>afterLoad</i>:function 加载后回调</li>
									</ul>
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