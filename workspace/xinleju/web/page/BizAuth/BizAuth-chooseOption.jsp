<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>标准分类</title>
<base target="_self" />
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<script type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="page/BizAuth/BizAuth-chooseOption.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="page/BizAuth/BizAuth-chooseOptionList.js?t=<%=System.currentTimeMillis()%>"></script>
<style type='text/css'>
html{overflow:hidden;}
</style>
</head>
<body>
	<div class="popgsfl_title" style="width:650px">
		<div class="popgsfl_title_h1">请选择标准分类【双击选择】</div>
		<div class="popgsfl_title_close" id="tjDiv">
			<a href="#" onclick="saveOptions()">确认</a><a href="#" onclick="window.close();">关闭</a>
		</div>
	</div>
	<div class="pop_msgalert" style="height:30px;">
		温馨提示：请从左侧“标准分类”中<font style="color: red;font-weight: bold;">“双击”</font>选择您需要的标准分类至“已选标准分类”。
	</div>
	<input type="hidden" id="scopeId" value="${scopeId}"/>
	<table width="650" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td width="290" height="380" valign="top" class="popleft">
				<div id="roleTree"></div>
			</td>
			<td valign="top"><iframe id="role_frame" frameborder="0" src="" width="100%" marginheight="0" marginwidth="0" height="400px"> </iframe>
			</td>
		</tr>
	</table>
	
	<script type="text/javascript">
		//选择所选供商分类
		function saveOptions(){
			var returnValue = $("#scopeId").attr("value") + "-";
			var options = document.getElementById("role_frame").contentWindow.document.getElementsByName("r_role");
			for(var i = 0; i < options.length; i++){
				if(i > 0){
					returnValue += ","
				}
				returnValue += options[i].value + "/" + options[i].alt;
			}
	        if(options.length > 0){
	            window.returnValue = returnValue;
	            window.close();
	        } else{
	     	   window.returnValue = $("#scopeId").attr("value");
	     	   window.close();  
	        }
		}
		var obj = window.dialogArguments;
		//解决乱码
		obj = encodeURI(obj);
		obj = encodeURI(obj);  
		$("#role_frame").attr("src", "BizAuth!chooseOptionList.do?options="+obj);
	</script>
</body>