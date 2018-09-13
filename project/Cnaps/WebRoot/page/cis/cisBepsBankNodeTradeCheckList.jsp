<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>票交来报待处理-复核</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script language="javascript">
	function viewInfo(id){
		var newurl = "<%=path%>/handleBankNodeTradeCheckAction.do?method=handleBankNodeTradeCheck&id="+id;
		viewDetails(newurl,"票交来报待处理复核界面");
	}
</script>
</head>
<body>
<html:form  method="post" action="/cisBepsBankNodeTradeCheckAction.do?method=findBankNodeTradeCheckList&business=${business}">
<input id="repeatmark" type="hidden" value="0" />
 
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
             <table width="95%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                 <td colspan="6">
                  <div class="text_title"><span class="text_blue2">票交来报待处理-复核</span></div>
                  
                 </td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">   
                  <tr>
                  <td width="120" height="40" class="text_tablehead_b">报文标识号：</td>
                  <td width="120">
                  <div align="left">
                   <html:text property="cis.msgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
                  </div>
                  </td>
                 
                   <td width="120" height="40" class="text_tablehead_b">工作日期：</td>
                  <td width="120">
                  <div align="left">
                   <html:text property="cis.workdt" readonly="true" onclick="WdatePicker()"/>
                  </div>
                  </td>
                   <td  colspan="4" align="center">
                  <input name="query" type="button" class="button" value="查 询"  onclick="nullsubmit()"/> 
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
 
                   <td  align="center" class="text_listhead">序号</td>
                   <td  align="center" class="text_listhead">报文标识号</td>
                   <td  align="center" class="text_listhead">工作日期</td>
                   <td  align="center" class="text_listhead">报文发送时间</td>
                   <td  align="center" class="text_listhead">发起参与机构行号</td>
                   <td  align="center" class="text_listhead">拒绝业务的参与机构行号</td>
                   <td  align="center" class="text_listhead">处理日期</td>
                   <td  align="center" class="text_listhead">业务状态</td>
                   <td  align="center" class="text_listhead">处理状态</td>
                   <td  align="center" class="text_listhead">数据操作</td>
                  
                </tr> 
                <logic:present name="queryList">
                <logic:iterate id="po" name="queryList">
                <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6"> 
              <td  class="text_list"><div class="gridCell_standard">${po.id }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.workdt }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.credttm }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.rjctedptyid }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.sttlmdt }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.status }</td>
 				  <td  class="text_list"><div class="gridCell_standard">${po.prcsts }</td>
                  
                  
 				  <td>
 				  <div align="center">
                      <span class="text_list"> 
                        <a href="#" onClick="viewInfo('${po.id}')"><u>复核</u>
                        </a>
                      </span>
                  </div>
 				  </td>	
 				 
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
