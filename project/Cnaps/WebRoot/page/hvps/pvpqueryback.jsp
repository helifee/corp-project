<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>无标题文档</title>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemGroupManage/queryGroup.js"></script>
<script type="text/javascript" src="<%=path %>/js/ybjs/hvpsback141.js"></script>

</head>
<body>
<form method="post" action="<%=path%>/transfer/transferManage/pvpDBAction.do?method=queryPVPfromback">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
 <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">&nbsp;大额支付系统&nbsp;->pvp结算申请业务->pvp结算申请查询</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
   <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
            <table width="95%" height="30" border="0" cellpadding="0" cellspacing="0" > 
                <tr>
                  <td><div align="center"><span class="text_blue2">查询条件</span></div></td>
                </tr>
            </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="border:1px #99bbe8 solid; padding:3px;" >
               <tr>
                  <td width="120" height="40" class="text_tablehead_b">交易流水号：</td>
                  <td width="120"><div align="left">
                   <input type="text" name="msgId"/>
                  </div></td>  
                  <td width="120" height="40" class="text_tablehead_b">付款清算行行号：</td>
                  <td width="120"><div align="left">
                   <input type="text" name="dbtrAcctId"/>
                  </div></td>
                   <td  width="90" height="40" class="text_tablehead_b"></td>
                </tr> 
                <tr>
                <td  colspan="4" align="center">
                  <input name="query" type="button" class="button" value="查 询"  onclick="queryTranssferOfClientList()"/> 
                  </td>
                </tr> 
            </table>
              <br><div align="center">
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
                <td   align="center" class="text_listhead">交易流水号</td>
                  <td   align="center" class="text_listhead">付款清算行行号</td>
                  <td   align="center" class="text_listhead">付款行行号</td>
                   <td   align="center" class="text_listhead">收款清算行行号</td>
                  <td   align="center" class="text_listhead">收款行行号</td>
                  <td   align="center" class="text_listhead">买入价</td>
                  <td   align="center" class="text_listhead">买入外汇数</td>
                   <td   align="center" class="text_listhead">数据操作</td>
                </tr> 
                <logic:present name="hvpssend141List">
                 <logic:iterate id="hvpsfront141" name="hvpssend141List">
				  <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">		
                  <td  class="text_list">${hvpsfront141.chnmsgid}</td>
                  <td  class="text_list">${hvpsfront141.senddrctpty}</td>
                  <td  class="text_list">${hvpsfront141.sendindrctpty}</td>
                  <td  class="text_list">${hvpsfront141.recvdrctpty}</td>
                  <td  class="text_list">${hvpsfront141.recvindrctpty}</td>
                  <td  class="text_list">${hvpsfront141.purchspric}</td>
                  <td  class="text_list">${hvpsfront141.buyamt}</td>
	              <td  class="text_list"><div align="center"><span class="text_list">
	              <a href="pvpbackDetail.html" ><u>测试明细</u></a>
                  <a href="#" onClick="detailTransferOfClient('${hvpsfront141.id}')"><u>明细</u></a>
                 <a href="#" onClick="checkfindTransferOfClientById('${hvpsfront141.id}')"></a>
                 
                  <!-- <u>复核</u>
              	  <a href="<%=path%>/page/hvps/checkTransferOfClient.jsp" onClick=""><u>复核</u></a>
              	  
              	  <a href="#" onClick="deleteTransferOfClient('${hvpsfront111.id}')"><u>删除</u></a>
                   -->
                   </span></div></td>
                  </tr>    
                  </logic:iterate>
                  </logic:present>            </table></td>
        </tr>
		<tr>  
	      <td></td>      
	      <td>
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
        </tr>
      </table>	      </td>
	      <td></td>
	      </tr>
    </table>    </td>
   <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
   
   </tr>  
</table>

</form>
</body>
</html>
