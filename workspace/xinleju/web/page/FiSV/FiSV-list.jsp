<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="${pageContext.request.contextPath}/css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/css/xy_cost.css" rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/jquery-easyui-1.4.1/themes/icon.css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/App.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-1.7.1.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/mask.css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.loadmask.min.js"></script>
<script language="javascript" type="text/javascript" src="${pageContext.request.contextPath}/js/My97DatePicker/WdatePicker.js" defer="defer"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/search.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/ajax.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/TemplateWindow.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/page/FiSV/FiSV-list.js"></script>
<script>
	var contextPath = '${pageContext.request.contextPath}';
</script>
</head>
<body>
	<div class="easyui-layout" data-options="border:false,fit:true">
		<div data-options="region:'west',split:true,title:'财务系统公司'" style="width: 200px; padding: 5px; background: #eee;">
			<input id="sysSearch" style="width: 180px" type="text" />
			<input id="fisysinfoid" style="display:none;" type="text" />
			<ul id="tree"></ul>
		</div>

		<div data-options="region:'center',title:'凭证输出'" style="padding: 5px; background: #eee;">
			<div class="easyui-layout" data-options="border:false,fit:true" id="layout">
				<div data-options="region:'north',height:'auto',border:false">
					<form id="frm" action="BusinessObject!list">
						<!-- 查询条件 -->
						<div class="s1_searchWrap">
							<div class="s2">
								<div class="sl-key">
									<span>已选条件:</span>
								</div>
								<div class="s2-clear">
									<a href="javascript:void(0)" onclick="clearAllParam();">清除条件</a>
								</div>
								<div class="s2-value">
									<ul id="selectedCond">
									</ul>
								</div>
								<div class="clear"></div>
							</div>
							<div class="sl-wrap">
								<div class="sl-key">
									<span>状态:</span>
								</div>
								<div class="sl-value">
									<ul>

									</ul>
								</div>
								<div class="clear"></div>
							</div>
						</div>
					</form>
					<div id="tb" class="t_title">
	           		<div class="t_title_input">
					   <input id="bmname" style="width: 180px" type="text" />
						<input id="bmid" style="display:none;" type="text" />
				  </div>
				  <div class="t_title_input">
				 <input type="text" id="createDate" name="createDate" id="title"  class="easyui-datebox" data-options="editable:false"/>
				  </div>
				  <div class="t_title_input">
				  
				  	<a href="#" title="查询" onclick="query();"><img src="${pageContext.request.contextPath }/images/icon_search.png" width="24" height="24" align="bottom"/> </a>
				  </div>
				  <div class="tool">
				  <a href="#" onclick="javascript:outputVoucher();" class="t_more">输出凭证</a>
				  <a href="#" onclick="javascript:del();" class="t_del">删除</a>
				  </div>
			  	<div class="clear"></div>
			  </div>
				</div>
			
			<div data-options="region:'center',border:false">
				<table id="grid"></table>
			</div>
		</div>
		</div>
	</div>
	</div>

	<div id="newDialog"></div>

</body>
</html>
