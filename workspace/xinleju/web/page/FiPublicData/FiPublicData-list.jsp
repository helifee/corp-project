<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css"
	rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css"
	href="js/jquery-easyui-1.4.1/themes/icon.css" />
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<link rel="stylesheet" type="text/css" href="css/mask.css" />
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script language="javascript" type="text/javascript"
	src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/ajax.js"></script>
<script type="text/javascript" src="js/TemplateWindow.js"></script>
<script type="text/javascript" src="page/FiPublicData/FiPublicData-list.js?t=<%=System.currentTimeMillis() %>"></script>
<script>
	var contextPath = '${pageContext.request.contextPath}';
	if (contextPath.length == 1) {
		contextPath = '';
	}
	
	$(function(){
		var h = $("#center").height();
	    var w = $("#center").width();
	    $("#h1").height(h-35);
	    $("#t1").height(h-35);
	    var tab = $('#tt').tabs('getSelected');
        var index = $('#tt').tabs('getTabIndex',tab);
        $('#tt').tabs('select',index);
        if(index == 0){
            $("#t1").attr("src","FiCoContract!list.do");
        }
	});
</script>
</head>
<body>
	<div class="easyui-layout" data-options="border:false,fit:true">
		<div id="center" data-options="region:'center'" style="background: #fafafa;">
		    <div id="tt" class="easyui-tabs" data-options="onSelect:tabOnSelect">   
			    <div id="h1" class="tab_" title="合同信息" data-options="fit:true" url="FiCoContract!list.do"  frameId="t1" >   
					<iframe id="t1" scrolling="no" frameborder="0" height="100%" width="100%"  frameborder="0" ></iframe>
				</div>
			</div>
		</div>
	</div>
	<div id="newDialog"></div>
</body>
</html>
