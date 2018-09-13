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
<script type="text/javascript" src="page/FiCoContract/FiCoContract-list.js?t=<%=System.currentTimeMillis() %>"></script>
<script type="text/javascript" src="page/FiVoucher/jquery.tips.js"></script>
<script>
	var contextPath = '${pageContext.request.contextPath}';
	if(contextPath.length==1){
		contextPath = '';
	}
	var accountSetsjson = ${accountSetsjson};
	$(function(){
		//公司
	    $("#compay").combobox({
	        valueField:'id',    
	        textField:'name',
	        data:accountSetsjson,
	        onChange:function(newValue,oldValue){
	            companyId = newValue;
	            initGrid();
	        } ,
	        onLoadSuccess: function() { //加载完成后,设置选中第一项
	             var val = $(this).combobox("getData");
	             $(this).combobox("select", val[0].id);
	             companyId = val[0].id;
	        }
	    });
	});
</script>
	 
</head>
	<body>
	<div class="easyui-layout" data-options="fit:true,border:false" id="northpanel">
		
		<div data-options="region:'center',border:false">
		
		<div id="aa" class="t_title">
			  <div class="t_title_input">
			    <input id="compay" name="compay" class="easyui-textbox" />
			    <input type="text" id="keyword" name="keyword" id="title" placeholder="合同名称/编码"  value="${keyword}"/>
			  </div>
			  
			  <div class="t_title_input">
			  	<a href="#" title="查询" onclick="query();"><img src="images/icon_search.png" width="24" height="24" align="bottom"/> </a>
			  </div>
			  <div class="tool">
                    <a href="#" onclick="javascript:newFiCoContract()">抽取</a>
                    <a href="#" onclick="javascript:sendFiCoContract()" class="t_more">推送到辅助核算</a>
              </div>
			  <div class="clear"></div>
			</div>
		
		<table id="grid" class="easyui-datagrid" data-options="toolbar:'#aa',fit:true,pagination:true">
		</table>
		</div>
	</div>
	<div id="newDialog"></div>
	</body>
</html>
