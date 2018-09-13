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
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemGroupManage/queryGroup.js"></script>
<script type="text/javascript" src="<%=path %>/js/ybjs/hvpsfront141.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">

	
	function viewdetailss(id){
	
		var newurl = "<%=path %>/transfer/SAPSAccountQueueManagementAction.do?method=queryDetail&id="+id;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form method="post" action="/transfer/SAPSAccountQueueManagementAction.do?method=queryList">

 


<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" >
								<h5 align="left">&nbsp;</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
             <table width="95%" height="22" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2"> 清算排队管理申请  </span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
              <tr>
                  <td width="120" height="40" class="text_tablehead_b">交易流水号：</td>
                  <td width="120"><div align="left">
                    
                   <html:text property="msgIdf"> </html:text>
                  </div></td>  
                  <td width="120" height="40" class="text_tablehead_b">付款清算行行号：</td>
                  <td width="120"><div align="left">
                       <html:text property="senddrctpty"> </html:text>
                  </div></td> 
                   <td width="120" height="40" class="text_tablehead_b">工作日期：</td>
                  <td width="120"><div align="left">
                   <html:text property="workdate" readonly="true" title="工作日期" style="width: 180px;"
									
								 styleClass="Wdate"	  onclick="WdatePicker()"> </html:text></div>
                  </td>
                   <td  width="90" height="40" class="text_tablehead_b"> </td>
                </tr> 
                <tr>
                <td  colspan="6" align="center">
                  <input name="query" type="button" class="button" value="查 询"  onclick="querysapsList()"/> 
                  </td>
                </tr> 
                 </table>
              <table width="761" height="23" border="0" cellpadding="0" cellspacing="0">
                <tr >
                <td width="41"   ></td>
                <td width="41" align="center"></td>
                <td width="414" ><div align="right">
                </div></td>
                </tr>
              </table>
              
              <table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
                 <tr>
                  <td   align="center" class="text_listhead">交易流水号</td>
                  <td   align="center" class="text_listhead">付款清算行行号</td>
                  <td   align="center" class="text_listhead">付款行行号</td>
                  <td   align="center" class="text_listhead">收款清算行行号</td>
                  <td   align="center" class="text_listhead">收款行行号</td>
                 
                  <td   align="center" class="text_listhead">数据操作</td>
                </tr> 
                 <logic:present name="queryList">
                 <logic:iterate id="hvpsfront141" name="queryList">
				<tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                 <td  class="text_list">${hvpsfront141.msgId}</td>
                  <td  class="text_list">${hvpsfront141.sendDrctPty}</td>
                  <td  class="text_list">${hvpsfront141.sendIndrctPty}</td>
                  <td  class="text_list">${hvpsfront141.recvDrctPty}</td>
                  <td  class="text_list">${hvpsfront141.recvIndrctPty}</td>
                 
	              <td  class="text_list"><div align="center"><span class="text_list">
                 <!-- <a href="#" onClick="detailClient('/transfer/SAPSAccountQueueManagementAction.do?method=queryDetail&id=${hvpsfront141.id}')"><u>明细</u></a>-->
                    <a href="#"   onClick="viewDetails('<%=path %>/transfer/SAPSAccountQueueManagementAction.do?method=queryDetail&id=${hvpsfront141.id}')"><u>明细</u></a>
                  <!-- 
              	  <a href="<%=path%>/page/hvps/checkTransferOfClient.jsp" onClick=""><u>复核</u></a>
              	  
              	  <a href="#" onClick="deleteTransferOfClient('${hvpsfront111.id}')"><u>删除</u></a>
                   -->
                   </span></div></td>
                  
                 
                </tr>
				  </logic:iterate>
                  </logic:present>
             </table></td>
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
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	
  </tr>  
</table>







































 

</html:form>
</body>
</html>
