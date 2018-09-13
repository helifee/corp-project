<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>招标采购首页</title>
    <link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
    <link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/App.js"></script>
    <script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
    <link href="css/mask.css" rel="stylesheet" type="text/css" />
   
</head>
<body>
    <!-- 路径导航 -->
    <table width="100%" border="0" cellpadding="0" cellspacing="1" class="t_search">
        <tr>
            <td width="25%">外部编码分类： <s:select onchange="queryOc(0)" id="isDisabled" name="isDisabled" cssClass="input125" list="#{'0':'未禁用','1':'已禁用'}" listKey="key" listValue="value"></s:select></td>
            <td width="25%">外部编码名称： <s:textfield id="name" name="name" cssClass="input125"></s:textfield></td>
             <td width="25%">编码： <s:textfield id="code" name="code" cssClass="input125"></s:textfield></td>
            <td width="25%">
                <img src="images/icon_search.png" width="24" height="24" align="absmiddle" title="查询" onclick="javascript:queryOc(0)" border="0" style="cursor: pointer;"/>
            </td>
            <td align="right"></td>
        </tr>
    </table>
    <!-- 主区域工具栏 start-->
    <div class="t_title">
		<div class="hh"></div>
		<div class="t_title_input"></div>
		<div class="t_title_input"></div>
		<div class="tool">
		        <span style="float: left;"></span>
		         <a href="#" id="disOrUnDis"  class="t_edit">标记为外部编码分类</a>
		         <a href="#" onclick="javascript:editOcd()" id="editPdTm" class="t_edit">编辑外部编码分类</a>
		         <a href="#" onclick="javascript:newOcd()" id="addPdTm" class="t_new">新建外部编码分类</a>
		         <a href="#" onclick="javascript:newOc()" id="addKyqz" class="t_new">新建外部编码</a>
	   </div>
	   <div class="clear"></div>
	</div>
    <table width="100%" cellpadding="0" cellspacing="1">
        <tr>
            <td width="30%" valign="top"><iframe id="ocdTree" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="yes" src="OutCodeMgr!tree.do" onreadystatechange="setClientHeight('ocdTree',this)" onload="setClientHeight('ocdTree',this)"></iframe></td>
            <td valign="top"><iframe id="ocList" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="no" src="OutCodeMgr!ocList.do" onload="if(Browser.isIE6() || Browser.isIE7()){$('body').unmask();}else{$('body',window.document).unmask();}"></iframe></td>
        </tr>
    </table>
</body>
<script>
	function Resize(){
	    setClientHeight('ocdTree',null);
	}

	$("#ocList").load(function(){
	    var mainheight = $(this).contents().find("body").height()+30;
	    $(this).height(mainheight);
	});
</script>
 <script type="text/javascript" src="page/OutCodeMgr/OutCodeMgr-index.js?t=<%=System.currentTimeMillis()%>"></script>

</html>
