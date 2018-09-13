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
<title>定期贷记业务明细建立</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>

<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript">
function queryDelete1(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}
function queryDelete(url){
	
	var url = getRootPath()+url;
	
 	var i = createWin("wind","删除",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/RegularCreditAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
function queryDetail(url){
	
	var url = getRootPath()+url;
	
 	var i = createWin("wind","收款人详情列表",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/BatchPaymentAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
function nullsubmit1()
{
	 
		this.document.forms[0].submit();
	 
}
	 
	 
	function addView(){
	
	var url = getRootPath()+"/page/transfer/credit/inputParentDetail.jsp";
	
 	var i = createWin("wind","新增",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/RegularCreditAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}

	function repairView(path){
	
	var url = getRootPath()+path;
	//alert(url);
 	var i = createWin("wind","明细查看",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/BatchPaymentAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
</script>

</head>
<body >




<html:form method="post" action="/BatchPaymentAction.do?method=queryList"
>










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
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2">查询条件</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
               <tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                <tr>
                
              		<td class="text_tablehead_b">批次序号</td>
             		 <td id="zfjyzh_td" >
				                  		<html:text property="po.btchNb" maxlength="20" />
				                  	</td>
              		<td class="text_tablehead_b">支付交易组号</td>
                   <td id="qt_td" >
				                  		<html:text property="po.pmtGrpId" maxlength="32" />
				   </td>
				  
			           </tr>
			          			           <tr>     
			           <td class="text_tablehead_b"  colspan="3">&nbsp;</td>   		
				                    <td >
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="nullsubmit1()"/>
				                  		 
				                  	</td> 
				                  	 <td  >&nbsp;</td> 
                </tr>  
                <tr><td colspan="6">&nbsp;</td></tr>          
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
                <td  class="text_listhead">发起参与机构行号</td>
                <td  class="text_listhead">接收参与机构行号</td>
                  <td  class="text_listhead">批次序号</td>
                  <td  class="text_listhead">支付交易组号</td>
                  <td  class="text_listhead">付款人名称</td>
                   <td  class="text_listhead">总金额</td>
                     <td  class="text_listhead">处理状态</td>
                        <td  class="text_listhead">总笔数</td>
                   <td width="260"  class="text_listhead">数据操作</td>
                   </tr>
                <logic:present name="queryList">
                <logic:iterate id="pot" name="queryList">
                <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                  <td  class="text_list">${pot.instgPty}</td>
                   <td  class="text_list">${pot.instdPty}</td>
                  <td  class="text_list"><div class="gridCell_standard">${pot.btchNb}</td>
							                  <td  class="text_list">${pot.pmtGrpId}</td>
							                  <td  class="text_list">${pot.dbtrNm}</td>
							                  <td  class="text_list">${pot.ttlAmt}</td>
							                 <td  class="text_list">${pot.prcSts}</td>
                 <td  class="text_list">${pot.ttlNb}</td>
                   <td  class="text_list">
                      <div >
                      <span class="text_list"> 
                       <a href="#" onclick="queryDetail('/BatchPaymentAction.do?method=querybatchPaymentChildrenList&parentid=${pot.id}')">收款人详情</a>&nbsp;
	             	  <a href="#" onclick="repairView('/BatchPaymentAction.do?method=queryList&id=${pot.id}')">明细</a>&nbsp;
	              		                        
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














