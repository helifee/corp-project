<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>流程转移</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />

<link href="css/mask.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="js/ext/resources/css/ext-all.css" type="text/css" media="screen,projection" />
<link rel="stylesheet" href="js/ext/resources/css/xtheme-blue.css" type="text/css" media="screen,projection" />
<link rel="stylesheet" href="js/ext/ext-patch.css" type="text/css" media="screen,projection" />
</head>
<body>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title">
         <tr id="upBtn">
             <td>
                 <div class="wdtable_titleh">流程转移</div>
                 <div class="wdtable_titletool" id="submitDiv">
                     <a href="#" onclick="confirmMove('upBtn')">确认转移</a> <a href="#" onclick="window.close();">关闭</a>
                 </div>
             </td>
         </tr>
     </table>
	<table width="100%" cellpadding="0" cellspacing="1" id="ttt">
		<tr>
			<td width="20%" valign="top" id="ctTree" valign="top"></td>
			<s:hidden name="ctId" id="ctId"></s:hidden>
			<input type="hidden" name="flowIds" id="flowIds" value="${flowIds}"/>
		</tr>
		<tr>
            <td align="center">
                <div class="spyj_btn" id="downBtn">
                    <input type="button" id="saveButton" name="button6" id="button6" value="确认转移" onclick="confirmMove('downBtn')" />
                    <input type="button" id="saveButton" name="button6" id="button6" value="关闭" onclick="window.close()" />
                </div>
            </td>
        </tr>
	</table>
</body>
<!-- 加载js脚本  begin -->
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
<script src="js/ext/adapter/ext/ext-base.js"></script>
<script src="js/ext/ext-all.js" type="text/javascript"></script>
<script src="js/ext/TreeCheckNodeUI.js" type="text/javascript"></script>
<script type="text/javascript" src="page/Designer/Designer-moveFlow.js"></script>
<!-- 加载js脚本end -->
</html>