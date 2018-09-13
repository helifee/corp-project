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
<title> 定期借记-付款签约 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
       
<script language="javascript">
	function viewbykey(htbh){
		var newurl = "<%=path %>/RegularDebitASignupAction.do?method=sendMsgMaintenanceSigned&syspara=mx&htbh="+htbh;
		viewDetails(newurl);
	}
	function viewbykeyadd(){
		var newurl = "<%=path %>/RegularDebitASignupAction.do?method=gotoPage&syspara=add";
		var oldurl = "<%=path %>/RegularDebitASignupAction.do?method=sendMsgMaintenanceSigned&syspara=query";
		closeaddwin(newurl,oldurl,"");
	}
	function viewbykeymod(htbh){
		var newurl = "<%=path %>/RegularDebitASignupAction.do?method=sendMsgMaintenanceSigned&syspara=modify&htbh="+htbh;
		var oldurl = "<%=path %>/RegularDebitASignupAction.do?method=sendMsgMaintenanceSigned&syspara=query";
		closeaddwin(newurl,oldurl,"");
	}
	function viewbykeydelete(htbh){		
		if(confirm("确定要删除吗？")){
			var newurl = "<%=path %>/RegularDebitASignupAction.do?method=sendMsgSigned&syspara=delete&htbh="+htbh;
			var oldurl = "<%=path %>/RegularDebitASignupAction.do?method=sendMsgMaintenanceSigned&syspara=query";
			closeaddwin(newurl,oldurl,"");
		}
	}
</script>
</head>
<body>
<html:form method="post" action="/RegularDebitASignupAction.do?method=sendMsgMaintenanceSigned&syspara=query">
<input id="repeatmark" type="hidden" value="0">
 
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
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2"> 定期借记付款签约</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
            <tr>
				                	<td width="120" height="40" class="text_tablehead_b">合同编号 </td>
				                  	<td><div align="left">
				                   		<html:text property="poSigned.htbh" maxlength="26" onkeyup="fun_number(this)" onblur="fun_number(this)" style="width:200px;"/>
				                  	</td>
				                   	<td>
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="nullsubmit()"/>
				                  		<input name="add" type="button" class="button" value="添 加"  onclick="viewbykeyadd()"/> 
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
					                   <td  align="center" class="text_listhead">付款人名称</td>
					                   <td  align="center" class="text_listhead">付款人开户行名称</td>
					                   <td  align="center" class="text_listhead">收款人名称</td>					                  
					                   <td  align="center" class="text_listhead">收款人开户行行名</td>
					                   <td  align="center" class="text_listhead">操作</td>
					       				 
					                </tr> 
                 <logic:present name="MaintenanceSigned">
									  <logic:iterate id="po" name="MaintenanceSigned">
									
                
                
              	  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                 		                <td  class="text_list"><div class="gridCell_standard">${po.fkrmc}</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.fkrkhhmc}</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.skrmc}</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.skrkhhhm}</td>
							                  <td  class="text_list">
	             								<a href="#" onclick="viewbykey('${po.htbh}')">明细</a>&nbsp;
	             								<a href="#" onclick="viewbykeymod('${po.htbh}')">修改</a>&nbsp;
	             								<a href="#" onclick="viewbykeydelete('${po.htbh}')">删除</a>
							                  </td>			
						             
					                  </tr>
              				</logic:iterate>
                </logic:present>
             </table> 
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
