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
<title>���ڽ��ҵ����ϸ</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
  <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript">
	function xiugaibc(){
		if(confirm("ȷ��Ҫ������")){
			ckeckwethornull();
		}
	}
	function viewbykeyfkradd(PrntId,pmtgrpid){
		var newurl = "<%=path %>/regularDebitAction.do?method=gotoPage&syspara=fkradd&prntid="+PrntId+"&pmtgrpid="+pmtgrpid;
		var oldurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=fkrxx&id="+PrntId+"&pmtgrpid="+pmtgrpid;
		closeaddwin(newurl,oldurl,"");
	}
	function viewbykeyfkrmx(id){
		var newurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=fkrmx&id="+id;
		viewDetails(newurl);
	}
	function viewbykeymodfkr(id,PrntId,pmtgrpid){
		var newurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=fkrmod&id="+id;
		var oldurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=fkrxx&id="+PrntId+"&pmtgrpid="+pmtgrpid;
		closeaddwin(newurl,oldurl,"");
	}
	function viewbykeydelete(id,PrntId,pmtgrpid){		
		if(confirm("ȷ��Ҫɾ����")){
			var newurl = "<%=path %>/regularDebitAction.do?method=gotoPage&syspara=fkrdelete&id="+id+"&PrntId="+PrntId;
			var oldurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=fkrxx&id="+PrntId+"&pmtgrpid="+pmtgrpid;
			closeaddwin(newurl,oldurl,"");
		}
	}
</script>
</head>
<body>
<html:form method="post" action="/regularDebitAction.do?method=sendMsgDebit&syspara=fkrxx&id=${PrntId}&pmtgrpid=${pmtgrpid}&fuhechax=${fuhechax}">
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
                  <td width="134" >
                  	<div  class="text_title"><span class="text_blue2">�������б���Ϣ</span></div>
                  </td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
                <tr>
                
                 
			        	<td width="10">&nbsp;
			        	
			        	</td>
			        	<td style="font-size: 14px;font-weight: bold;color: #2A5BB8;white-space: normal;text-align: center;">&nbsp;
			        	<input id="backButton" style="cursor: pointer" type="button" class="button" value="��  ��" onclick="history.back();" />
			        	  <input name="addButton" type="button" class="button" value="�� ��" onClick="detailAdd('/transfer/RegularCreditChildrenAction.do?method=addChild&flag=flag&parentsize=${parentsize}&id=${parentid}')"/>
			        	
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
				                   <td  align="center" class="text_listhead">���</td>
				                   <td  align="center" class="text_listhead">�������</td>
				                   <td  align="center" class="text_listhead">���ı�ʶ��</td>					                  
				                   <td  align="center" class="text_listhead">�����������к�</td>
				                   <td  align="center" class="text_listhead">�������к�</td>
				                   <td  align="center" class="text_listhead">����������</td>
				                   <c:if test="${fuhechax != '0'}">
				                   	<td  align="center" class="text_listhead">����</td>
				                   </c:if>
				       				 
				                </tr> 
                <logic:present name="RegularCreditDetaillist">
                <logic:iterate id="po" name="RegularCreditDetaillist">
                <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='#E6E6E6'" bgcolor="#E6E6E6">
                     <td  class="text_list"><div class="gridCell_standard">${po.id}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.receAcount}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.receName}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.cdtrBrnchId}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.receOpenBankNum}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.receAddress}</td>
						            		 
                 
                   <td  class="text_list">
                      <div align="center">
                      <span class="text_list"> 
                    
             								<a href="#" onclick="detailView('/transfer/RegularCreditChildrenAction.do?method=personDetail&id=${po.id}')">��ϸ</a>&nbsp;
             								<a href="#" onclick="detailView('/transfer/RegularCreditChildrenAction.do?method=personDetail&beforeModify=beforeModify&parentsize=${parentsize}&parentid=${parentid}&id=${po.id}')">�޸�</a>&nbsp;
             							<!--   	<a href="#" onclick="queryDelete('/transfer/RegularCreditAction.do?method=queryDelete&flag=deleteChild&id=${po.id}')">ɾ��</a>-->
             								<a href="#" onclick="detailView('/transfer/RegularCreditChildrenAction.do?method=deleteChild&parentid=${parentid}&id=${po.id}')">ɾ��</a>
						                 
						                                   
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
  
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 =======================================================
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	<table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td class="text_tablehead_b">
					<%--
						<h5 align="left">&nbsp;С��֧��ϵͳ&nbsp;->&nbsp;��ͨ���ҵ��&nbsp;->&nbsp;��ͨ���-����</h5>
					--%>
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
			<td width="8" ></td>
		</tr>
	  	<tr valign="top">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	      		<table width="95%" border="0" cellspacing="0" cellpadding="0" align="center">
	        		<tr>
			        	<td width="10">&nbsp;</td>
			        	<c:if test="${fuhechax != '0'}">
				        	<td style="font-size: 14px;font-weight: bold;color: #2A5BB8;white-space: normal;text-align: center;">
				        	���ڽ��ҵ����ϸ
				        	<input id="backButton" style="cursor: pointer" type="button" class="button" value="��  ��" onclick="history.back();" />
				        	<input id="backButton" style="cursor: pointer" type="button" class="button" value="��  ��" onclick="viewbykeyfkradd('${PrntId}','${pmtgrpid}')" />
				        	</td>
			        	</c:if>
			        	<c:if test="${fuhechax == '0'}">
				        	<td style="font-size: 14px;font-weight: bold;color: #2A5BB8;white-space: normal;text-align: center;">
			        		��������Ϣ
			        		<input id="backButton" style="cursor: pointer" type="button" class="button" value="�� ��" onclick="window.parent.closetmpwin();" />
			        		</td>
			        	</c:if>
			        	
			        </tr>
			        <tr>
			        	<td width="10">&nbsp;</td>
			        	<td width="10">&nbsp;</td>
			        </tr>
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<div>
				            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
				                <tr>
				                   <td  align="center" class="text_listhead">���</td>
				                   <td  align="center" class="text_listhead">�������</td>
				                   <td  align="center" class="text_listhead">���ı�ʶ��</td>					                  
				                   <td  align="center" class="text_listhead">�����������к�</td>
				                   <td  align="center" class="text_listhead">�������к�</td>
				                   <td  align="center" class="text_listhead">����������</td>
				                   <c:if test="${fuhechax != '0'}">
				                   	<td  align="center" class="text_listhead">����</td>
				                   </c:if>
				       				 
				                </tr> 
				                <logic:present name="RegularDebitdetails">
								  <logic:iterate id="po" name="RegularDebitdetails">
									  <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">		
						                  <td  class="text_list"><div class="gridCell_standard">${po.id}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.prntid}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.msgid}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.dbtrmmbid}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.dbtrbrnchid}</td>
						                  <td  class="text_list"><div class="gridCell_standard">${po.dbtrbrnchnm}</td>
						                  <c:if test="${fuhechax != '0'}">
							                  <td  class="text_list">
	             								<a href="#" onclick="viewbykeyfkrmx('${po.id}')">��ϸ</a>&nbsp;
	             								<a href="#" onclick="viewbykeymodfkr('${po.id}','${po.prntid}','${pmtgrpid}')">�޸�</a>&nbsp;
	             								<a href="#" onclick="viewbykeydelete('${po.id}','${po.prntid}','${pmtgrpid}')">ɾ��</a>
							                  </td>
						                  </c:if>
					                  </tr>
				                  </logic:iterate>
					             </logic:present>
		                		</table>
		             		</div>	                
	            		</td>
	        		</tr>
					<tr>  
			    		<td></td>      
					   	<td>
					       	<table width="100%" border="0" cellpadding="0" cellspacing="0">
					        	<tr>
					          		<td><jsp:include page="/page/common/Page.jsp"/></td>
					          	</tr>
				         	</table>
				        </td>
			     		<td></td>
		     		</tr>
	    		</table>
	    	</td>
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	  	</tr>  
	</table>
</html:form>
</body>
</html>
