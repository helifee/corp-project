<%@page import="java.net.URLEncoder"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>人员选择</title>
<link href="css/xy_data.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/zTree/jquery.ztree.all-3.5.js"></script>
<script type="text/javascript" src="page/OrgnSelect/OrgnSelect_index.js"></script>
<script type="text/javascript">
 	var zNodes = ${typeTree};
 	var funcTree;
 	$(document).ready(function(){
     	funcTree = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
     	initUserIds();
 	});
</script>
</head>

<body>
<table width="900px" border="0" align="left" cellpadding="0"   cellspacing="1" class="xy_11" display="block">
  <tr>
    <td nowrap="nowrap" style="height:30px;">温馨提示：请从“可选人员”中选择您需要的人员至“已选人员”，点击左侧“部门”列表可切换至当前部门下的人员。</td>
   
    <td height="50" align="right" valign="middle"  width="90" >
    	<input type="button"  value="确定"  onclick="checkResult() ;"  style="margin-right: 20px;"/>
    	<span id="chooseModel"  style="display: none">${chooseModel }</span>
    </td>
  </tr>
</table>
<br />
<table width="900" border="0" cellspacing="0" cellpadding="0"  display="block">
  <tr>
	<td width="250" valign="top" >
           <div id="comContent"   width="100%">
                 <ul id="treeDemo" class="ztree" style="margin-top:0; width:160px;"></ul>
           </div>	
    </td>        
    <td  width="400"  valign="top"  height="700px">
    		<iframe id="user_frame" frameborder="0" src="OrgnSelect!usersList.do	"  frameborder="no" border="0"   width="100%" height="700px"  marginheight="0" marginwidth="0" scrolling="yes"  ></iframe>
    </td>
    <td valign="top"  width="250px">
    <s:hidden name="userIds" id="userIds"></s:hidden>
    <s:hidden name="objName" id="objName"></s:hidden> 
    <table width="100%" border="0" align="center" cellpadding="0" cellspacing="1" class="xy_01 mgb8"  id="r_table">
    <tbody  id="addTr">
      <tr>
        <th width="40"><input type="checkbox" name="r_check_all" id="r_check_all" onclick="javascript:checkAllIndex(this);" /></th>
        <th width="70">用户名</th>
        <th width="50">姓名</th>
      </tr>
      <s:iterator value="#request.list" var="item">
	      <tr  id="${item.id}" ondblclick="javascript:removeUserSingleIndex(${item.id});return false;">
	        <td align="center"><input type="checkbox" name="r_user" value="${item.id}" onclick="javascript:checkOneIndex(this);"  /></td>
	        <td name="mytd">${item.loginName }</td>
	        <td>${item.realName }</td>
	      </tr>
	  </s:iterator>
    </tbody>
    </table>
    </td>
  </tr>
</table>
</body>
</html>
