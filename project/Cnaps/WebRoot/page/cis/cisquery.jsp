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
<title>票交业务查询</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript">
	function viewbykeyfkrxx(id,pmtgrpid){
		var newurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=fkrxx&id="+id+"&pmtgrpid="+pmtgrpid;
		this.document.forms[0].action=newurl;
		this.document.forms[0].submit();
	}
	function repairView1(id,pmtgrpid){
	
	var url = getRootPath()+ "/RegularDebitChildrenAction.do?method=queryList&id="+id+"&pmtgrpid="+pmtgrpid;
	   	var i = createWin("wind","付款人列表",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/regularDebitAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
	function viewDetail(id){
	
	
	var url = getRootPath()+ "/CisAction.do?method=queryList&id="+id;
	   	var i = createWin("wind","明细查看",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/CisAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
	
	function viewbykeydelete(id){
		if(confirm("确定要删除吗？")){
			var newurl = "<%=path %>/regularDebitAction.do?method=deleteDebit&id="+id;
			//var newurl = "<%=path %>/regularDebitAction.do?method=gotoPage&syspara=delmxjl&id="+id;
			//var newurl = "<%=path %>/regularDebitAction.do?method=sendMsgcreatedetails&syspara=delete&id="+id;
			var oldurl = "<%=path %>/regularDebitAction.do?method=queryList";
			closeaddwin(newurl,oldurl,"");
		}
	}
 	function viewbykeyadd(){
		//var newurl = "<%=path %>/regularDebitAction.do?method=gotoPage&syspara=addmxjl";
		var newurl = "<%=path %>/page/transfer/debit/inputParentDebit.jsp";
		var oldurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=cx";
		closeaddwin(newurl,oldurl,"");
	}
	 
 
	
	function closetmp(pmtgrpid,amount,nboftxs,aclmtamt,proposercertid,proposercerttp,proposercertissued,proposeracct,proposernm,proposeraddr,proposertel,proposercstmrid,proposeraccttp,proposeracctccy){
		window.parent.document.getElementById("pmtgrpid").value=pmtgrpid;
		window.parent.document.getElementById("pmtgrpid").focus();
		window.parent.document.getElementById("amount").value=amount;
		window.parent.document.getElementById("totalamt").value=amount;
		window.parent.document.getElementById("nboftxs").value=nboftxs;
		window.parent.document.getElementById("aclmtamt").value=aclmtamt;
		window.parent.summxhzje(window.parent.document.getElementById("totalamt"));
		
		//申请人信息
		window.parent.document.getElementById("proposercertid").value=proposercertid;
		window.parent.document.getElementById("proposercstmrid").value=proposercstmrid;
		window.parent.document.getElementById("proposercertissued").value=proposercertissued;
		window.parent.document.getElementById("proposeraccttp").value=proposeraccttp;
		window.parent.document.getElementById("proposeracctccy").value=proposeracctccy;
		window.parent.document.getElementById("proposercerttp").value=proposercerttp;
		//window.parent.document.getElementById("proposernm").value=proposernm;
		window.parent.document.getElementById("proposertel").value=proposertel;
		//window.parent.document.getElementById("proposeracct").value=proposeracct;
		//window.parent.document.getElementById("proposeraddr").value=proposeraddr;
		
		window.parent.closetmpwin();
	}
</script>

</head>
<body  >
<html:form method="post" action="/CisAction.do?method=queryList">
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
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2">票交业务查询</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
               <tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                <tr>
                 
              		<td class="text_tablehead_b">票据号码</td>
             		 <td   >
				                  <html:text property="po.cdtrAcct" maxlength="20" style="width:210px;"/>
				                  	</td>
              		<td class="text_tablehead_b">票交交易序号</td>
                   <td   >
				              	<html:text property="po.dbtrAcct" maxlength="32" style="width:210px;"/>
				   </td>
				  
			           </tr>
			           
			           <tr>     
			           <td class="text_tablehead_b"  colspan="2">&nbsp;</td>   		
				                    <td >
				                  			<input name="query" type="button" class="button" value="查 询"  onclick="nullsubmit()"/>
				                  
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
			      <td  align="center" class="text_listhead">支付交易组号</td>
			      <td  align="center" class="text_listhead">签发行</td>
			      <td  align="center" class="text_listhead">金额</td>					                  
			      <td  align="center" class="text_listhead">付款人名称</td>
			      <td  align="center" class="text_listhead">付款人账号</td>
			      <td  align="center" class="text_listhead">接收行行号</td>
			      <td  align="center" class="text_listhead">业务类型号</td>
			      <td  align="center" class="text_listhead">出票日期</td>
			      <td  align="center" class="text_listhead">票据号码</td>
			      <td  align="center" class="text_listhead">状态</td>
				  <td  align="center" class="text_listhead">操作</td>
					       				 
					                </tr> 
                 <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                                    <td  class="text_list"><div class="gridCell_standard">${po.dbtrAcct}</td>
							        <td  class="text_list"><div class="gridCell_standard">${po.cdtrAcct}</td>
							        <td  class="text_list"><div class="gridCell_standard">${po.txId}</td>
							        <td  class="text_list"><div class="gridCell_standard">${po.ornglCisTxId}</td>
						 	        <td  class="text_list">
							      <a href="#" onclick="viewDetail('${po.id}')">明细</a>&nbsp;
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
