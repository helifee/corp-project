<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
		<link href="js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css"/>
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="css/mask.css" />
		<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
		<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js" defer="defer"></script>
		<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="js/search.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<script type="text/javascript" src="js/TemplateWindow.js"></script>
		<script type="text/javascript" src="page/CorpMapping/CorpMapping-list.js"></script>
        <script>
				var contextPath = '${pageContext.request.contextPath}';
				if(contextPath.length==1){
					contextPath = '';
				}
				<s:iterator value="#request.refs" var="map">
			    var ${map.key} = ${map.value};
			</s:iterator>
				</script>
	</head>
	<body>
		<div class="easyui-layout" data-options="border:false,fit:true">
			<div data-options="region:'west',split:true,title:'财务系统公司'" style="width:200px;padding:5px;background:#eee;">
              <input  id="sysSearch" style="width:120px" type="text"/>
              <input  id="fisysinfoid" type="text" style="display:none"/>
                <ul id="tree"></ul>
        </div>
        
          <div data-options="region:'center',title:'公司对照'" style="padding:5px;background:#eee;">
          <div id="tb" class="t_title">
			  <div class="tool">
			  		<a href="#" onclick="javascript:newCorpMapping()">新增</a>
			  		<a href="#" onclick="javascript:del()" class="t_del">删除</a>
			  </div>
			  <div class="clear"></div>
			</div>
                <table  id="grid"></table>
        </div>
		</div>
	
		<div id="newDialog"></div>
		
	</body>
</html>
