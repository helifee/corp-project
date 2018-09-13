<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>

<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		
	 <script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>

 
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		
		
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"	src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript">
			
			function commitForm(){
			 
			  	document.forms[0].submit();
			  
				
			}
			function selectDet(i){
				var len = document.getElementsByName("details").length;
				for(var j=0;j<len;j++){
					if(j==i){
						 document.getElementsByName("details")[j].style.display="block";
					}else{
						document.getElementsByName("details")[j].style.display="none";
					}
				}
				
			}
		function viewdetails(id,pmttpbgclsotid,systemcd){
		var newurl = "<%=path %>/TransProcessAction.do?method=gotoTransDetails&pmtgrpid="+id+"&pmttpbgclsotid=A&systemcd="+systemcd;
		viewDetails(newurl);	
	}
	function querydetail(id,pmttpbgclsotid,systemcd){
	
	var url = getRootPath()+"/TransProcessAction.do?method=gotoTransDetails&pmtgrpid="+id+"&pmttpbgclsotid=A&systemcd="+systemcd;;
	 viewDetails(url);
 	/*var i = createWin("wind","��ϸ�鿴",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/TransProcessAction.do?method=queryPKGInfoDetail&pmtgrpid=${msgid}";
			return true;
	 	});
 	i.show();*/
}
</script>
		 
	</head>
	<body>
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=queryPKGInfoDetail">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />

			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr valign="top">
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF;">
						<br>
					</td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
									<br>
								</td>
								<td>
									<div align="center">
										<table width="95%" border="0" align="center" cellpadding="0"
											cellspacing="0">
											<tr>
												<td colspan="6">
													<div class="text_title">
														<span class="text_blue2"> С����������ϸ </span>
													</div>
												</td>
											</tr>
										</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head">
											<tr>
												<td height="30">
													<div align="center">
														<br />
														<br />
														<br />
														<table   width="95%"  class="tbcolor">
															<tr>
															<td>
															<input type="hidden" name="pmtgrpid" />
																<table  width="100%"  class="tbcolor">
																<tr>
													                   <td  align="center" class="text_listhead">֧���������</td>
													                   <td  align="center" class="text_listhead">ǩ�����к�</td>
													                   <td  align="center" class="text_listhead">�������к�</td>
													                   <td  align="center" class="text_listhead">���ı��</td>					                  
													                   <td  align="center" class="text_listhead">ҵ������</td>
													                   <td  align="center" class="text_listhead">���</td>					                   
													                   <td  align="center" class="text_listhead">״̬</td>
													                   <td  align="center" class="text_listhead">��ϸ�鿴</td>
													              </tr> 
													              <logic:present name="queryList">
																	  <logic:iterate id="po" name="queryList">
																		 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
															                  <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid }</div></td>
															                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
															                  <td  class="text_list"><div class="gridCell_standard">${po.instdpty }</div></td>
															                   <td  class="text_list"><div class="gridCell_standard">
																                   
																                  
																          
																                       
								                  <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">���ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'hvps.112.001.01'}">��������ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">С��ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.122.001.01'}">С�������ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">��ͨ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">ʵʱ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">ʵʱ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.125.001.01'}">���ڴ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.133.001.01'}">���ڽ��</c:if>
								                   <c:if test="${po.msgtpid eq 'beps.130.001.01'}">	CISͨ�û�ִҵ����</c:if>
																                  </div>
																               </td>
															                  
															                  <td  class="text_list"><div class="gridCell_standard">
																                  <c:if test="${po.pmttp eq 'A100'}">��ͨ���</c:if>
							                  	 <c:if test="${po.pmttp eq 'A108'}">�ֽ���</c:if>
								                  <c:if test="${po.pmttp eq 'A109'}">ί���տ�(����)</c:if>
								                  <c:if test="${po.pmttp eq 'A110'}">���ճи�(����)</c:if>
								                   <c:if test="${po.pmttp eq 'A200'}">�м��ʽ�㻮</c:if>
								                   <c:if test="${po.pmttp eq 'A202'}">���л�Ʊ</c:if>
								                  <c:if test="${po.pmttp eq 'A112'}">�������</c:if>
								                  <c:if test="${po.pmttp eq 'A101'}">�������ʽ�㻮)</c:if>
								                  <c:if test="${po.pmttp eq 'A102'}">������</c:if>
								                  <c:if test="${po.pmttp eq 'A104'}">�����ʽ���ǻ���</c:if>
								                   <c:if test="${po.pmttp eq 'A106'}">֧ȡ�����ʽ�</c:if>
								                  <c:if test="${po.pmttp eq 'A301'}">�ɷ�ҵ��</c:if>
								                  <c:if test="${po.pmttp eq 'A201'}">֧Ʊ</c:if>
								                   <c:if test="${po.pmttp eq 'B100'}">��ͨ���</c:if>
								                   <c:if test="${po.pmttp eq 'B104'}">�����ʽ��ǻ���</c:if>
								                   <c:if test="${po.pmttp eq 'B307'}">�����ʽ��ծ�Ҹ���ǻ���</c:if>
								                    <c:if test="${po.pmttp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���</c:if>
								                   
								                     <c:if test="${po.pmttp eq 'C102'}">���˴���ͨ��</c:if>
								                      <c:if test="${po.pmttp eq 'D102'}">���˴���ͨ��</c:if>
								                      <c:if test="${po.pmttp eq 'D200'}">ʵʱ����</c:if>
								                     <c:if test="${po.pmttp eq 'C101'}">ʵʱ����</c:if>
								                     <c:if test="${po.pmttp eq 'C210'}">н�𱨳�</c:if>
								                    <c:if test="${po.pmttp eq 'C100'}">ʵʱ����</c:if>
								                    <c:if test="${po.pmttp eq 'D100'}">ʵʱ���</c:if>
								                    <c:if test="${po.pmttp eq 'D203'}">ʵʱͨ��Ʊ�ݽ���</c:if>
								                     <c:if test="${po.pmttp eq 'E100'}">���ڴ���</c:if>
								                   <c:if test="${po.pmttp eq 'F100'}">���ڽ��</c:if>
								                   <c:if test="${po.pmttp eq 'B308'}">֧Ʊ����</c:if>
								                    <c:if test="${po.pmttp eq 'B309'}">ͨ��Ʊ�ݽ���</c:if>
								                      <c:if test="${po.pmttp eq 'A308'}">CIS֧Ʊҵ���ִ</c:if>
								                    <c:if test="${po.pmttp eq 'A309'}">CISͨ��Ʊ��ҵ���ִ</c:if>
																                  </div>
																               </td>
															                  <td  class="text_list"><div class="gridCell_standard">
															                  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
															                  </div></td>
															                  <td  class="text_list"><div class="gridCell_standard">
															                	<c:if test="${po.status eq 'PR91'}">������</c:if>
															                 
															                	 
															       
							                                        <c:if test="${po.status eq 'PR04' }">������</c:if>
																	<c:if test="${po.status eq 'PR09' }">�Ѿܾ�</c:if>
																	<c:if test="${entity.status eq 'PR08' }">�ѳ���</c:if>
																	<c:if test="${po.status eq 'PR09' }">�Ѿܾ�</c:if>
																	<c:if test="${po.status eq 'PR21' }">��ֹ��</c:if>
																	<c:if test="${po.status eq 'PR22' }">�ѳ���</c:if>
																	<c:if test="${po.status eq 'PR32' }">�ѳ���</c:if>
																	<c:if test="${po.status eq 'PR05' }">�ѳɹ�</c:if>
																	<c:if test="${po.status eq 'PR98' }">��ȷ��    </c:if>
																	<c:if test="${po.status eq 'PR90' }">�½�      </c:if>
																	<c:if test="${po.status eq 'PR81' }">������    </c:if>
																	<c:if test="${po.status eq 'PR82' }">�����    </c:if>
																	<c:if test="${po.status eq 'PR83' }">������    </c:if>
																	<c:if test="${po.status eq 'PR95' }">�����    </c:if>
																	<c:if test="${po.status eq 'PR96' }">������    </c:if>
																	<c:if test="${po.status eq 'PR97' }">�ѷ���    </c:if>
																	<c:if test="${po.status eq 'PR11' }">�������Ŷ�</c:if>
																	<c:if test="${po.status eq 'PR12' }">�������Ŷ�</c:if>
																	<c:if test="${po.status eq 'PR99' }">����</c:if>
																	<c:if test="${po.status eq 'PR03' }">������</c:if>
																	<c:if test="${po.status eq 'PR89' }">����ִ </c:if>
																	<c:if test="${po.status eq 'PR88' }">�ѻ�ִ</c:if>
															                  </div></td> 
															                   <td  class="text_list"><div align="center"><span class="text_list">
                                          
                                                  <a href="#"   onClick="querydetail('${po.pmtgrpid}','${po.pmttpbgclsotid}','${po.systemcd}')"><u>��ϸ</u></a></span></div>
                                           
                                               </td>	
														                  </tr>  
													                  </logic:iterate> 
													                   <logic:empty name="queryList">
													                  	<tr>
													                		<td colspan="9" align="center"><font color="red">û�з��������ļ�¼!</font></td>
													                	</tr>
													                  </logic:empty>                    
													                </logic:present>
																</table>
																</td>
															</tr>
															
														</table>
														<br />
														<br>
												</td>
											</tr>
										</table>
						</table>
						<br>
					</td>
					<td
						
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<br>
					</td>
				</tr>
				
			</table>
	</body>
</html>
