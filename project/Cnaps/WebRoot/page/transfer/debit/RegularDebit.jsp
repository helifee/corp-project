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
<title>���ڽ��ҵ����ϸ�����б�</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
  <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript">
	function viewbykeyfkrxx(id,pmtgrpid){
		var newurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=fkrxx&id="+id+"&pmtgrpid="+pmtgrpid;
		this.document.forms[0].action=newurl;
		this.document.forms[0].submit();
	}
	function repairView1(id,pmtgrpid,pmtkd){
	
	var url = getRootPath()+ "/RegularDebitChildrenAction.do?method=queryList&id="+id+"&pmtgrpid="+pmtgrpid+"&pmtkd="+pmtkd;
	   	var i = createWin("wind","�������б�",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/regularDebitAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
	function viewDetail(id,pmtgrpid){
	
	var url = getRootPath()+ "/regularDebitAction.do?method=queryDetaisById&id="+id+"&pmtgrpid="+pmtgrpid;
	   	var i = createWin("wind","��ϸ�鿴",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/regularDebitAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
	
	function viewbykeydelete(id){
		if(confirm("ȷ��Ҫɾ����")){
			var newurl = "<%=path %>/regularDebitAction.do?method=deleteDebit&id="+id;
			//var newurl = "<%=path %>/regularDebitAction.do?method=gotoPage&syspara=delmxjl&id="+id;
			//var newurl = "<%=path %>/regularDebitAction.do?method=sendMsgcreatedetails&syspara=delete&id="+id;
			var oldurl = "<%=path %>/regularDebitAction.do?method=queryList";
			closeaddwin(newurl,oldurl,"");
		}
	}
	/*
	function viewbykeymodify(pmtgrpid){
		var newurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=modifymxjl&pmtgrpid="+pmtgrpid;
		var oldurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=cx";
		closeaddwin(newurl,oldurl,"");
	}
	*/
	function viewbykeyadd(){
		//var newurl = "<%=path %>/regularDebitAction.do?method=gotoPage&syspara=addmxjl";
		//var newurl = "<%=path %>/page/transfer/debit/inputParentDebit.jsp";
		var newurl = "<%=path %>/regularDebitAction.do?method=createMsgid";
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
		
		//��������Ϣ
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
<html:form method="post" action="/regularDebitAction.do?method=queryList">
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
                  <td width="134" >
                  	<div  class="text_title"><span class="text_blue2">���ڽ�ǲ�ѯ</span></div>
                  </td><td width="781"></td>
                
                </tr>
              </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
               <tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                <tr>
                 
              		<td class="text_tablehead_b">֧���������</td>
             		 <td   >
				                  <html:text property="po.pmtgrpid" maxlength="20" />
				                  	</td>
              		<td class="text_tablehead_b">�տ����˺�</td>
                   <td   >
				              	<html:text property="po.cdtracct" maxlength="32" />
				   </td>
				  
			           </tr>
			           <tr>
			           	 <td class="text_tablehead_b">�ͻ���</td>
				   <td   >
				         <html:text property="po.proposercstmrid"  maxlength="19"   />
			                   		 
			        </td>
			           </tr>
			           <tr>     
			           <td class="text_tablehead_b"  colspan="3">&nbsp;</td>   		
				                    <td >
				                  			<input name="query" type="button" class="button" value="�� ѯ"  onclick="nullsubmit()"/>
				                  
				                  		 <input name="add" type="button" class="button" value="�� ��"  onclick="viewbykeyadd()"/>
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
					                   <td  align="center" class="text_listhead"> ֧���������</td>
					                   <td  align="center" class="text_listhead">�տ����˺�</td>
					                    <td  align="center" class="text_listhead">�տ�������</td>
					                     <td  align="center" class="text_listhead">�տ��˿������к�</td>
					                   <td  align="center" class="text_listhead">�ͻ���</td>					                  
					                   <td  class="text_listhead">ҵ������</td>
                    					<td  class="text_listhead">ҵ������</td>
					                   <td  align="center" class="text_listhead">����</td>
					       				 
					                </tr> 
                 <logic:present name="RegularDebit">
									  <logic:iterate id="po" name="RegularDebit">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                     <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid}</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.cdtracct}</td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.cdtrnm}</td>
							                    <td  class="text_list"><div class="gridCell_standard">${po.cdtrissuer}</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.proposercstmrid}</td>
							                  
							                    <td  class="text_list">
							                    	<c:if test="${po.pmttp eq 'F100'}">��ͨ���ڽ��ҵ��</c:if>
							                    	<c:if test="${po.pmttp eq 'E102'}">���ڴ���</c:if>
							                   </td>
							                <td  class="text_list">
							                	<c:if test="${po.pmtkd eq '00100'}">���</c:if> 
												<c:if test="${po.pmtkd eq '00200'}">ˮů��</c:if> 
												<c:if test="${po.pmtkd eq '00300'}">ú����</c:if> 
												<c:if test="${po.pmtkd eq '00400'}">�绰��</c:if> 
												<c:if test="${po.pmtkd eq '00500'}">ͨѶ��</c:if> 
												<c:if test="${po.pmtkd eq '00600'}">���շ�</c:if> 
												<c:if test="${po.pmtkd eq '00700'}">���ݹ����</c:if>   
												<c:if test="${po.pmtkd eq '00800'}">��������</c:if> 
												<c:if test="${po.pmtkd eq '00900'}">ѧ�̷�</c:if>
												<c:if test="${po.pmtkd eq '01000'}">���ߵ��ӷ�</c:if>
												<c:if test="${po.pmtkd eq '01100'}">��ҵ�������</c:if>
												<c:if test="${po.pmtkd eq '09001'}">����</c:if>
							                </td>
							                  <td  class="text_list">
							                  	<c:if test="${ispop != 'true'}">
							                  	<!--  <a href="#" onclick="viewbykeyfkrxx('${po.id}','${po.pmtgrpid}')">���������� </a>&nbsp;-->
							                  	<a href="#" onclick="repairView1('${po.id}','${po.pmtgrpid}','${po.pmtkd }')">����������</a>&nbsp;
	             								<!-- <a href="#"   onclick="viewbykeyfkrxx('${po.id}','${po.pmtgrpid}')">����������</a>&nbsp; -->
	             								 <a href="#" onclick="viewDetail('${po.id}','${po.pmtgrpid}')">��ϸ</a>&nbsp;
	             								<a href="#" onclick="viewbykeydelete('${po.id}')">ɾ��</a>
							                  	</c:if>
	             								<c:if test="${ispop == 'true'}">
							                  		<a href="#" onclick="closetmp('${po.pmtgrpid}','${po.amount}','${po.nboftxs}','${po.aclmtamt}','${po.proposercertid}','${po.proposercerttp}','${po.proposercertissued}','${po.proposeracct}','${po.proposernm}','${po.proposeraddr}','${po.proposertel}','${po.proposercstmrid}','${po.proposeraccttp}','${po.proposeracctccy}')">ѡ��</a>
							                  	</c:if>
							                  </td>
                 
                </tr>
				</logic:iterate>
					<logic:empty name="RegularDebit">
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 
	
	
	
	
	
	
<!--
	
	
	
	
	<table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td class="text_tablehead_b">
				 
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
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
	        		<tr>
			        	<td width="10">&nbsp;</td>
			        	<td style="font-size: 14px;font-weight: bold;color: #2A5BB8;white-space: normal;text-align: center;">���ڽ��ҵ����ϸ����</td>
			        </tr>
			        <tr>
			        	<td width="10">&nbsp;</td>
			        	<td width="10">&nbsp;</td>
			        </tr>
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="border:1px #99bbe8 solid; padding:3px;">
                				<tr>
	                				<td id="cxtj" class="text_tablehead_b" width="170" height="40">
	                					��ѯ����
	                					<html:select property="po.cxtj" onchange="ch_cxtj(this)">
	                						<html:option value="zfjyzh">֧���������</html:option>
	                						<html:option value="qt">����</html:option>
	                					</html:select>
	                					
				                    </td>
				                    <td id="zfjyzh_td" class="text_tablehead_b" width="510"><div align="center">
				                  		֧���������<html:text property="po.pmtgrpid" maxlength="20" style="width:210px;"/>
				                  	</td>
				                  	<td id="qt_td" width="510" class="text_tablehead_b"><div align="center">
				                  		�տ����˺�<html:text property="po.cdtracct" maxlength="32" style="width:210px;"/>
				                  		���<html:text property="po.aclmtamt" style="width:150px;" maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
			                   		</td>
				                    <td class="text_tablehead_b" width="20">
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="nullsubmit()"/>
				                  	</td>
				                  	<c:if test="${ispop != 'true'}">
					                  	<td class="text_tablehead_b" width="20">
					                  		<input name="add" type="button" class="button" value="�� ��"  onclick="viewbykeyadd()"/>
					                  	</td>
				                  	</c:if>
				                 </tr>
            				</table>
            				<br/>
	          			  <div align="center"><br><div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr>
					                   <td  align="center" class="text_listhead">С��֧���������</td>
					                   <td  align="center" class="text_listhead">�տ���</td>
					                   <td  align="center" class="text_listhead">�ۼ�¼�����</td>					                  
					                   <td  align="center" class="text_listhead">�ۼ�¼����</td>
					                   <td  align="center" class="text_listhead">״̬</td>
					                   <td  align="center" class="text_listhead">����</td>
					       				 
					                </tr> 
					                <logic:present name="RegularDebit">
									  <logic:iterate id="po" name="RegularDebit">
										  <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid}</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.amount}</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.nboftxs}</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.aclmtamt}</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.status}</td>
							                  <td  class="text_list">
							                  	<c:if test="${ispop != 'true'}">
							                  		<a href="#" onclick="viewbykeyfkrxx('${po.id}','${po.pmtgrpid}')">����������</a>&nbsp;
	             							 
	             								<a href="#" onclick="viewbykeydelete('${po.id}')">ɾ��</a>
							                  	</c:if>
	             								<c:if test="${ispop == 'true'}">
							                  		<a href="#" onclick="closetmp('${po.pmtgrpid}','${po.amount}','${po.nboftxs}','${po.aclmtamt}','${po.proposercertid}','${po.proposercerttp}','${po.proposercertissued}','${po.proposeracct}','${po.proposernm}','${po.proposeraddr}','${po.proposertel}','${po.proposercstmrid}','${po.proposeraccttp}','${po.proposeracctccy}')">ѡ��</a>
							                  	</c:if>
							                  </td>
						                  </tr>
					                  </logic:iterate>
					                </logic:present>
		                		</table>
		                		<br>
		             		</div>
	          			</td>
	        		</tr>
	    		</table>
	    		<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
		        	<tr>
		          		<td> jsp include page="/page/common/Page.jsp" </td>
		          	</tr>
	         	</table>
	    	</td>
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);"/>
	  	</tr>
	</table>-->
	
	
	
</html:form>
</body>
</html>
