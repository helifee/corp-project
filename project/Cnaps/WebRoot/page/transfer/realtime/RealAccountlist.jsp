<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>���ڴ���ҵ����ϸ����</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>

<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript">
function queryDelete1(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}
function queryDelete(url){
	
	var url = getRootPath()+url;
	
 	var i = createWin("wind","ɾ��",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/RegularCreditAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
function queryDetail(url){
	
	var url = getRootPath()+url;
	
 	var i = createWin("wind","�տ��������б�",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/RegularCreditAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
function nullsubmit1()
{
	 
		this.document.forms[0].submit();
	 
}
	 
	function dis_cxtj(){
 
		var obj = this.document.getElementById('cxtj').all;
		for(var i=0;i<obj.length;i++){
			if(obj.item(i).name == 'cxtjflag' && obj.item(i).value == 'zfjyzh'){
				this.document.getElementById('zfjyzh_td').style.display="";
				this.document.getElementById('qt_td').style.display="none";
				break;
			}else{
				this.document.getElementById('zfjyzh_td').style.display="none";
				this.document.getElementById('qt_td').style.display="";
				break;
			}
		}
	}
	function addView(){
	
	var url = getRootPath()+"/page/transfer/credit/inputParentDetail.jsp";
	
 	var i = createWin("wind","����",url);
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
 	var i = createWin("wind","��ϸ�鿴",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/RealAccountAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
</script>

</head>
<!-- <body onload="dis_cxtj()"> -->

<body >


<html:form method="post" action="/RealAccountAction.do?method=queryList">










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
             <table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                  	<div  class="text_title"><span class="text_blue2">��ѯ����</span></div>
                 </td>
                </tr>
              </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
               <tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                <tr>
                	 
              	 	 <td class="text_tablehead_b">��������</td>
				   <td id="qt_td" >
				             <html:text property="po.workDt" styleClass="Wdate"	  onclick="WdatePicker()"  maxlength="19"  />
				          
			        </td>
              	 
              		<td class="text_tablehead_b">�ͻ��˻��˺�</td>
                   <td id="qt_td" >
				                  		<html:text property="po.cstmrAcctId" maxlength="32" />
				   </td>
				  
			           </tr>
			           
			           <tr>     
			           <td class="text_tablehead_b"  colspan="3">&nbsp;</td>   		
				                    <td >
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="nullsubmit1()"/>
				                  		 
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
                  <td  class="text_listhead">������������</td>
                 
                   <td  class="text_listhead">�ͻ��˻��˺�</td>
                  <td  class="text_listhead">�ͻ��˻�����</td>
                 
                  <td  class="text_listhead">��������</td>
                  <td  class="text_listhead">ҵ��״̬</td>
                  <td  class="text_listhead">��ǰ�˻�״̬</td>
                  <td  class="text_listhead">��ǰ���</td>
                  <td width="260"  class="text_listhead">���ݲ���</td>
                   
                   </tr>
                <logic:present name="queryList">
                <logic:iterate id="pot" name="queryList">
                <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                     <td  class="text_list">${pot.instgPty}</td>
                     
                       <td  class="text_list">${pot.cstmrAcctId}</td>
                     <td  class="text_list">${pot.cstmrAcctNm}</td>
							                
							                  <td  class="text_list">${pot.workDt}</td>
							                  <td  class="text_list">
							                     <c:if test="${pot.status eq 'PR04' }">������</c:if>
													<c:if test="${pot.status eq 'PR09' }">�Ѿܾ�</c:if>
													<c:if test="${pot.status eq 'PR08' }">�ѳ���</c:if>
													<c:if test="${pot.status eq 'PR09' }">�Ѿܾ�</c:if>
													<c:if test="${pot.status eq 'PR21' }">��ֹ��</c:if>
													<c:if test="${pot.status eq 'PR22' }">�ѳ���</c:if>
													<c:if test="${pot.status eq 'PR32' }">�ѳ���</c:if>
													<c:if test="${pot.status eq 'PR05' }">�ѳɹ�</c:if>
													<c:if test="${pot.status eq 'PR98' }">��ȷ��    </c:if>
													<c:if test="${pot.status eq 'PR90' }">�� ��     </c:if>
													<c:if test="${pot.status eq 'PR91' }">������    </c:if>
													<c:if test="${pot.status eq 'PR92' }">�����    </c:if>
													<c:if test="${pot.status eq 'PR93' }">������    </c:if>
													<c:if test="${pot.status eq 'PR94' }">������    </c:if>
												 
													<c:if test="${pot.status eq 'PR95' }">�����    </c:if>
													<c:if test="${pot.status eq 'PR96' }">������    </c:if>
													<c:if test="${pot.status eq 'PR97' }">�ѷ���    </c:if>
													<c:if test="${pot.status eq 'PR11' }">�������Ŷ�</c:if> 
													<c:if test="${pot.status eq 'PR12' }">�������Ŷ�</c:if> 
													<c:if test="${pot.status eq 'PR99' }">�� ��</c:if>
													<c:if test="${pot.status eq 'PR03' }">������</c:if> 
													<c:if test="${pot.status eq 'PR89' }">����ִ </c:if>
													<c:if test="${pot.status eq 'PR88' }">�ѻ�ִ</c:if>
							                 </td>
							                 <td  class="text_list"> ${pot.crrntAcctSts}
							                   <c:if test="${pot.crrntAcctSts eq 'AS01' }">�ѿ�����������</c:if>	
			                  <c:if test="${pot.crrntAcctSts eq 'AS06' }">����</c:if>	
							                 
							                 
							                 </td>
							                 <td  class="text_list">  
							                 		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${pot.crrntBal}"/>
							                 
							                 </td>
                 
                   <td  class="text_list">
                      <div >
                      <span class="text_list"> 
                       <a href="#" onclick="repairView('/RealAccountAction.do?method=queryList&id=${pot.id}')">��ϸ</a>&nbsp;
	              
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














