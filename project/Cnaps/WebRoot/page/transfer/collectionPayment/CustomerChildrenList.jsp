<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
 <title>定期贷记收款人明细</title> 
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>

<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript">
 
 
  
	 function queryDetail(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}
	function xiugaibc(){
		if(confirm("确定要更改吗？")){
			ckeckwethornull();
		}
	}
	
	function detailAdd(path){
	 
	
	 var url = getRootPath()+path;
	 
 	var i = createWin("wind","定期贷记收款人增加",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/RegularCreditChildrenAction.do?method=queryDetail&id=${parentid}";
			return true;
	 	});
 	i.show();
}
	function detailView(path){
	 
	
	 var url = getRootPath()+path;
	 
 	var i = createWin("wind","明细查看",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/BatchCustomerAction.do?method=queryChildrenList&parentId=${parentid}";
			return true;
	 	});
 	i.show();
}
function queryDelete(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}	
</script>

</head>
<body  >




<html:form method="post" action="/transfer/RegularCreditChildrenAction.do?method=queryDetail&id=${parentid}">
	<input id="business_name" type="hidden" value="regularDebitSigned">
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
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2"> 账户清单信息</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
                <tr>
                
                 
			        	<td width="10">&nbsp;
			        	
			        	</td>
			        	<td style="font-size: 14px;font-weight: bold;color: #2A5BB8;white-space: normal;text-align: center;">&nbsp;
			         	  
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
                             <td  align="center" class="text_listhead">账户账号(卡号)</td>
				                   <td  align="center" class="text_listhead">账户名称</td>					                  
				                   <td  align="center" class="text_listhead">账户状态</td>
				                   <td  align="center" class="text_listhead">开户行行号</td>
				                   <td  align="center" class="text_listhead">业务状态</td>
				                   <td  align="center" class="text_listhead">业务拒绝处理码</td>
				                   <td  align="center" class="text_listhead">操作</td>
				       				 
                </tr>
                <logic:present name="queryList">
                <logic:iterate id="po" name="queryList">
                    <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
             
              
                    	                  <td  class="text_list"><div class="gridCell_standard">${po.acctId}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.acctNm}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.acctSts}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.issuer}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.status}</td>
						            		 
                                        <td  class="text_list"><div class="gridCell_standard">${po.txRjctCd}</td>
                   <td  class="text_list">
                      <div align="center">
                      <span class="text_list"> 
                    
          	<a href="#" onclick="detailView('/BatchCustomerAction.do?method=queryChildrenList&id=${po.id}')">明细</a>&nbsp;
             							 
						                                   
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














