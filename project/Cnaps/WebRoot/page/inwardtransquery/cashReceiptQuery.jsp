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
<title>取现回执查询</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemGroupManage/queryGroup.js"></script>
<script type="text/javascript" src="<%=path %>/js/ybjs/hvpsfront141.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript">
function querysapsQueryList(){

	document.forms[0].action=getRootPath()+"/cashReceiptAction.do?method=sendQueryXML";
	document.forms[0].submit();
	
}
function queryDetail(detailId){
	var newurl = "<%=path %>/cashReceiptAction.do?method=sendQueryDetailXML&id="+detailId;
		viewDetails(newurl);
}
</script>
</head>
<body>
<html:form method="post" action="/cashReceiptAction.do?method=sendQueryXML">
 





<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
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
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2"> 取现回执查询申请 </span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
              <tr>
                  <td width="120" height="40" class="text_tablehead_b">报文标识号：</td>
                  <td width="120"><div align="left">
                   <html:text property="msgId"> </html:text>
                  </div></td>  
                   <td width="120" height="40" class="text_tablehead_b">工作日期：</td>
                  <td width="120"><div align="left">
                   <html:text property="workDt" readonly="true" title="工作日期" style="width: 180px;"
								 styleClass="Wdate"	  onclick="WdatePicker()"> </html:text> 
                  </div></td>
                  <td  colspan="6" align="center">
                  <input name="query" type="button" class="button" value="查 询"  onclick="querysapsQueryList()"/> 
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
                  <td   align="center" class="text_listhead">工作日期</td>
					<td   align="center" class="text_listhead">报文标识号</td>
					<td   align="center" class="text_listhead">回执报文标识号</td>
					<td   align="center" class="text_listhead">回复报文时间</td>
					<td   align="center" class="text_listhead">交易标识号</td>
					<td   align="center" class="text_listhead">原交易标识号</td>
					<td   align="center" class="text_listhead">取现清算行行号</td>
					<td   align="center" class="text_listhead">取现行行号</td>
                 	<td   align="center" class="text_listhead">数据操作</td>
                </tr> 
                 <logic:present name="queryList">
                 <logic:iterate id="po" name="queryList">
				<tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                 		<td  class="text_list">${po.workDt}</td>
						<td  class="text_list">${po.msgId}</td>
						<td  class="text_list">${po.recptMsgId}</td>
						<td  class="text_list">${po.recptDtTm}</td>
						<td  class="text_list">${po.txId}</td>
						<td  class="text_list">${po.orgnlTxId}</td>
						<td  class="text_list">${po.mmbId}</td>
						<td  class="text_list">${po.brnchId}</td>
						<td  class="text_list"><a href="#" onClick="queryDetail('${po.id}')">明细</a></td>
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
 