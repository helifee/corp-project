<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title></title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
<script type="text/javascript"></script>
</head>
<body >
   <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">				
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF;" ><br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
						<br/>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								<br></td>
								<td>
									<div align="center">
									<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">Ʊ������������</span></div>
                					</td>
                				</tr>
                			</table>
                			
			<table width="95%" height="30" border="0" cellpadding="0" cellspacing="0" class="table_head" >
                <tr>
					<td height="30">
					<div align="center">
					<br/>
					<div align="center">
					    <fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;bgcolor="E6E6E6"  >
						<legend >������ϸ</legend>	
						 <table>
				          <c:if test="${hbn==null}">
				           
				             
				              <tr>
				                 <td  align="center" class="text_details_L">���������鿴����ʧ�ܣ�</td>
				              </tr>
				              
				          </c:if>
	                      <c:if test="${hbn!=null}">
				           <tr>
			                   <td  class="text_details_L">��ţ�</td><td  class="text_details_R" >${hbn.id}</td>
			                   <td  class="text_details_L">�ϼ��ڵ㣺</td><td  class="text_details_R">${hbn.parented}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">�˵��˱�ʶ�ţ�</td><td  class="text_details_R">${hbn.endtoendid}</td>
			                   <td  class="text_details_L">��ϸ��ʶ�ţ�</td><td  class="text_details_R">${hbn.txid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">ҵ�����ͱ��룺</td><td  class="text_details_R">
			               			  	 ${hbn.pmttp}
			               		</td>
			                   <td  class="text_details_L">���ҷ��ţ�</td><td  class="text_details_R">
			                   		${hbn.currencycd}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">��</td><td  class="text_details_R"> ${hbn.amount}</td>
			               	  	<td  class="text_details_L">�����˻�����</td><td  class="text_details_R">${hbn.dbtrnm}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">�������˺ţ�</td><td  class="text_details_R">${hbn.dbtracct}</td>
			               		<td  class="text_details_L">�����˿������кţ�</td><td  class="text_details_R">${hbn.dbtrissuer}</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">�����������кţ�</td>
			                   <td  class="text_details_R"  >
			                   ${hbn.dbtrmmbid}
																
			                   </td>
			                    <td  class="text_details_L">�������кţ� </td>
			                   <td  class="text_details_R"  >
			                  ${hbn.dbtrbrnchid}								
			                   </td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">�տ��������кţ�</td><td  class="text_details_R">	${hbn.cdtrmmbid}</td>
			                   <td  class="text_details_L">�տ����кţ�</td><td  class="text_details_R">${hbn.cdtrbrnchid}</td>
			               </tr>
			               
			               <tr>
			                   <td  class="text_details_L">�տ������ƣ�</td><td  class="text_details_R"  >  ${hbn.cdtrnm} </td> 
			                 <td  class="text_details_L">�տ����˺ţ�</td><td  class="text_details_R"  >${hbn.cdtracct}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">�տ��˿������кţ�</td><td  class="text_details_R"  >  ${hbn.cdtrissuer} </td> 
			                 <td  class="text_details_L">ҵ��������룺</td><td  class="text_details_R"  >${hbn.pmtkd}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">���ԣ�</td><td  class="text_details_R"  >${hbn.addtlinf}</td> 
			                 <td  class="text_details_L">��ע��</td><td  class="text_details_R"  >${hbn.ustrd}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">ԭCISί�����ڣ�</td><td  class="text_details_R"  >${hbn.ornglciscnsgndt} </td> 
			                 <td  class="text_details_L">ԭCIS������ţ�</td><td  class="text_details_R"  >${hbn.ornglcistxid}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">ԭCISƱ�ݺ��룺</td><td  class="text_details_R"  >  ${hbn.ornglcisnotesno} </td> 
			                 <td  class="text_details_L">��ִ״̬��</td><td  class="text_details_R"  >${hbn.rcptsts}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">ҵ��ܾ������룺</td><td  class="text_details_R"  >  ${hbn.txrjctcd} </td> 
			                 <td  class="text_details_L">ҵ��ܾ���Ϣ��</td><td  class="text_details_R"  >${hbn.txrjctinf}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">NPC����״̬��</td><td  class="text_details_R"  >${hbn.prcsts} </td> 
			                 <td  class="text_details_L">NPC�������ڣ�</td><td  class="text_details_R"  >${hbn.netgdt}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">NPC����Σ�</td><td  class="text_details_R"  >  ${hbn.netgrnd} </td> 
			                 <td  class="text_details_L">NPC��������/��̬���ڣ�</td><td  class="text_details_R"  >${hbn.sttlmdt}</td>
			                 </tr>
			                 
				          </c:if>
	                       
 
	 					</table>
	 					</fieldset>
				       </div>	
				       
				       <c:if test="${hbn!=null}">
	 					<div align="center">
					    <fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;bgcolor="E6E6E6"  >
						<legend >ҵ����</legend>	
	 					<table width="95%" height="30" border="0" cellpadding="0" cellspacing="0" >
	 					
	 					 <tr>
	 					    <td  class="text_details_L">�� ��</td>
							<td  class="text_details_L">�� ��</td>
                          </tr>
                          <tr>
                            <td align="center"><input style="width:20" type="radio" name="a" value="1"></td>
							<td align="center"><input style="width:20" type="radio" name="a" value="1"></td>
                          </tr>
	 					 
	 					 
                          <tr>
                          <td align="center" width="100%"  colspan="2">
                            <input name="addButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="commitForm();" />
                            <!-- 
                            <input name="addButton" type="button" style="cursor: pointer" class="button" value="ȡ  ��" onclick="commitForm();" />
                             -->
                          </td>
                          </tr>
	 		            </table>
	 				   </fieldset>
				       </div>	
				       </c:if>
	 				 <br/>
                   
                  </div>
                 </td>
				</tr>	
				
			</table>
			 
		</div>
	<br></td>
	</tr>
	</table>
	<br></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	</tr>
</table>
</body>
</html>
 