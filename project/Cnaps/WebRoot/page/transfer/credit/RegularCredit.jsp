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
<title>���ڴ���ҵ����ϸ����</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>

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
	/*function ch_cxtj(obj){
		
		if(obj.value == "zfjyzh"){
			this.document.getElementById("zfjyzh_td").style.display="";
			this.document.getElementById("qt_td").style.display="none";
			var tmp = this.document.getElementById("qt_td").all;
			for(var i=0;i<tmp.length;i++){
				tmp.item(i).value="";
			}
		}else{
			this.document.getElementById("qt_td").style.display="";
			this.document.getElementById("zfjyzh_td").style.display="none";
			var tmp = this.document.getElementById("zfjyzh_td").all;
			for(var i=0;i<tmp.length;i++){
				tmp.item(i).value="";
			}
		}
	}*/
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
	
	var url = getRootPath()+"/transfer/RegularCreditAction.do?method=createMsgid";
	
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
				+ "/transfer/RegularCreditAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
</script>

</head>
<body >




<html:form method="post" action="/transfer/RegularCreditAction.do?method=queryList&syspara=cx">
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
             <table width="95%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td >
                  <div  class="text_title"><span class="text_blue2">֧��ҵ��������ѯ</span></div>
                 </td>
                </tr>
              </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
               <tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                <tr>
                <%--  
                  <td id="cxtj" class="text_tablehead_b" >
	                				 
	                					<html:select property="cxtjflag" onchange="ch_cxtj(this)">
	                						<html:option value="zfjyzh">֧���������</html:option>
	                						<html:option value="qt">����</html:option>
	                					</html:select>
	                					
				                    </td>
				                    --%>
              		<td class="text_tablehead_b">֧���������</td>
             		 <td id="zfjyzh_td" >
				                  		<html:text property="po.paymentGroupNum" maxlength="20" />
				                  	</td>
              		<td class="text_tablehead_b">�������˺�</td>
                   <td id="qt_td" >
				                  		<html:text property="po.payerAcount" maxlength="32" />
				   </td>
				  
			           </tr>
			           <tr>
			           	 <td class="text_tablehead_b">�ͻ���</td>
				   <td id="qt_td" >
				      <!--   <html:text property="po.chargamount"  maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>-->
				            <html:text property="po.proposerCstmrId"  maxlength="19"  />
				          
			        </td>
			           </tr>
			           <tr>     
			           <td class="text_tablehead_b"  colspan="3">&nbsp;</td>   		
				                    <td >
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="nullsubmit1()"/>
				                  		 <input name="addButton" type="button" class="button" value="�� ��" onClick="addView()"/>
				                  	</td><!-- repairView('/page/transfer/credit/inputParentDetail.jsp') -->
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
                  <td  class="text_listhead"> ֧���������</td>
                  <td  class="text_listhead">�������˺�</td>
                  <td  class="text_listhead">����������</td>
                   <td  class="text_listhead">�����˿������к�</td>
                  <td  class="text_listhead">�ͻ���</td>
                   <td  class="text_listhead">ҵ������</td>
                    <td  class="text_listhead">ҵ������</td>
                   <td width="260"  class="text_listhead">���ݲ���</td>
                   </tr>
                <logic:present name="queryList">
                <logic:iterate id="pot" name="queryList">
                <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                  <td  class="text_list"><div class="gridCell_standard">${pot.paymentGroupNum}</td>
							                  <td  class="text_list">${pot.payerAcount}</td>
							                   <td  class="text_list">${pot.dbtrNm}</td>
							                    <td  class="text_list">${pot.applyOpenBankNum}</td>
							                  <td  class="text_list">${pot.proposerCstmrId}</td>
							                    <td  class="text_list">
							                    	<c:if test="${pot.businessSizeCode eq 'E100'}">��ͨ���ڴ���ҵ��</c:if>
							                    	<c:if test="${pot.businessSizeCode eq 'C210'}">н�𱨳�</c:if>
							                    	<c:if test="${pot.businessSizeCode eq 'A101'}">�������ʽ�㻮</c:if>
							                   </td>
							                <td  class="text_list">
							                	
							                	<c:if test="${pot.businessClassCode eq '00100'}">���</c:if>         
												<c:if test="${pot.businessClassCode eq '00200'}">ˮů��</c:if>       
												<c:if test="${pot.businessClassCode eq '00300'}">ú����</c:if>       
												<c:if test="${pot.businessClassCode eq '00400'}">�绰��</c:if>       
												<c:if test="${pot.businessClassCode eq '00500'}">ͨѶ��</c:if>       
												<c:if test="${pot.businessClassCode eq '00600'}">���շ�</c:if>       
												<c:if test="${pot.businessClassCode eq '00700'}">���ݹ����  </c:if> 
												<c:if test="${pot.businessClassCode eq '00800'}">��������  </c:if> 
												<c:if test="${pot.businessClassCode eq '00900'}">ѧ�̷�</c:if>       
												<c:if test="${pot.businessClassCode eq '01000'}">��ҵ�������</c:if> 
												<c:if test="${pot.businessClassCode eq '09001'}">����</c:if>         
												<c:if test="${pot.businessClassCode eq '01100'}">��������</c:if>   
												<c:if test="${pot.businessClassCode eq '01200'}">н�𱨳�</c:if>     
												<c:if test="${pot.businessClassCode eq '01300'}">���ƾ��</c:if>     
							                	
							                </td>
							               
                 
                   <td  class="text_list">
                      <div >
                      <span class="text_list"> 
                       <a href="#" onclick="queryDetail('/transfer/RegularCreditChildrenAction.do?method=queryDetail&pmtkd=${pot.businessClassCode}&id=${pot.id}')">�տ�������</a>&nbsp;
	             	  <a href="#" onclick="repairView('/transfer/RegularCreditAction.do?method=queryParentDetail&id=${pot.id}')">��ϸ</a>&nbsp;
	             	<!--<a href="#" onclick="queryDelete('/transfer/RegularCreditAction.do?method=queryParentModify&id=${pot.id}')">�޸�</a>&nbsp;-->
	             	   <a href="#" onclick="queryDelete('/transfer/RegularCreditAction.do?method=queryDelete&flag=deleteParent&id=${pot.id}')">ɾ��</a>
							                        
                      </span>
                      </div>
                 </td>
                 
                </tr>
				</logic:iterate>
				<logic:empty name="queryList">
					                  	<tr>
					                		<td colspan="9" align="center"><font color="red">û�з��������ļ�¼!</font></td>
					                	</tr>
					                  </logic:empty>    
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














