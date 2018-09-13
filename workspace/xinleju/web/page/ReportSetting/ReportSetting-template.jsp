<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib uri="/WEB-INF/raqsoftReport.tld" prefix="report" %>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<%@ page import="java.net.*" %>
<%@ page import="com.raqsoft.report.usermodel.Context"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>报表模板</title>
<% 
request.setCharacterEncoding( "UTF-8" );
String appmap = request.getContextPath();
%>
<link rel="stylesheet" type="text/css" href="<%=appmap%>/raqsoft/easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="<%=appmap%>/raqsoft/easyui/themes/icon.css">
<script type="text/javascript" src="<%=appmap%>/raqsoft/easyui/jquery.min.js"></script>
<script type="text/javascript" src="<%=appmap%>/raqsoft/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=appmap%>/raqsoft/easyui/locale/easyui-lang-zh_CN.js"></script>
<script src="<%=appmap%>/raqsoft/build/dist/echarts.js"></script>
<script language=javascript>
    require.config({
        paths: {
            echarts: '<%=appmap%>/raqsoft/build/dist',
            zrender: '<%=appmap%>/raqsoft/build/dist/zrender'
        },
        packages: [
            {
                name: 'BMap',
                location: '<%=appmap%>/raqsoft/build/dist/extension/BMap/src',
                main: 'main'
            }
        ]
    });
</script>


<link type="text/css" href="<%=request.getContextPath() %>/page/ReportSetting/css/style.css" rel="stylesheet"/>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
</head>

<body topmargin=0 leftmargin=0 rightmargin=0 bottomMargin=0 style="background:#F1F4F7">
<%

StringBuffer param=new StringBuffer();
String  reportName = request.getParameter("reportName");
String  queryPath = request.getParameter("queryPath");
String  resultPath = request.getParameter("resultPath");
  
    reportName = URLDecoder.decode(reportName,"UTF-8");
 
   // reportName=new String(reportName.getBytes("ISO-8859-1"),"UTF-8");
	//reportName = java.net.URLDecoder.decode(reportName, "GB2312");
	//reportName = new String(reportName.getBytes("ISO-8859-1"));


	queryPath = java.net.URLDecoder.decode(queryPath, "GB2312");
	queryPath = new String(queryPath.getBytes("ISO-8859-1"));


	resultPath = java.net.URLDecoder.decode(resultPath, "GB2312");
	resultPath = new String(resultPath.getBytes("ISO-8859-1"));


Enumeration paramNames = request.getParameterNames();
if(paramNames!=null){
	while(paramNames.hasMoreElements()){
		String paramName = (String) paramNames.nextElement();
		String paramValue=URLDecoder.decode(request.getParameter(paramName),"utf-8");
		if(paramValue!=null){
			//把参数拼成name=value;name2=value2;.....的形式
			param.append(paramName).append("=").append(paramValue).append(";");
		}
	}
}
%>

<div id=mengban style="background-color:white;position:absolute;z-index:999;width:100%;height:100%">
	<table width=100% height=100%>
		<tr><td width=100% style="text-align:center;vertical-align:middle"><img src="../raqsoft/images/loading.gif"><br>正在加载报表......</td></tr>
	</table>
</div>
<div id=reportArea class="easyui-layout" data-options="fit:true" style="display:none;width:100%;height:100%">
<div data-options="region:'north',border:false" style="height:30px;overflow:hidden">
<jsp:include page="toolbar.jsp" flush="false" />
</div>
<div data-options="region:'center',border:false">

<div class="easyui-layout" data-options="fit:true">
<%	//如果参数模板存在，则显示参数模板
	if( queryPath!=null && !"".equals(queryPath)) {
	%>
	<div data-options="region:'north',border:false"><center>
			<table id="param_tbl"><tr><td>
			   	<report:param 
			           name="form1" 
					   paramFileName="<%=queryPath%>"  
					   needSubmit="no" 
					   needInputCssStyle="yes" 
					   needImportEasyui="no"
			     />
			</td>
			<td style="padding-left:15px"><a href="javascript:_submit( form1 )" class="easyui-linkbutton" style="vertical-align:middle;padding:0px 8px;">查询</a></td>
			</tr></table>
		</center></div>
	<%	
	   }
	%>
		<div id=reportContainer data-options="region:'center',border:false" style="text-align:center;overflow:hidden ; " >
			<report:html name="report1" 
				reportFileName="<%=resultPath %>" 
				params="<%=param.toString()%>"  
			      saveAsName="<%=reportName%>" 
			      exceptionPage="/page/ReportSetting/myError2.jsp" 
			      appletJarName="raqsoftReportApplet.jar" 
			      useCache="yes"
				funcBarLocation="no"
			generateParamForm="no"
			needScroll="yes"
			scrollWidth="100%"
			scrollHeight="99%"
			needImportEasyui="no" 
			       />
	</div>
</div>
</div>
<script language="javascript">
	//设置分页显示值
	try {
		document.getElementById( "t_page_span" ).innerHTML = getPageCount( "report1" );
		document.getElementById( "report1_currPage" ).innerHTML = getCurrPage( "report1" );
	}catch(e){}
	document.getElementById( "mengban" ).style.display = "none";
	document.getElementById( "reportArea" ).style.display = "";
</script>
</body>
</html>
