<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>��ϸ��Ϣ</title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/page_color1.css"  />
		<script language="javascript">
    </script>
	</head>
	<body>
		<form>
			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">				
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF;" ><br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
						<br />
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
                						<div  class="text_title"><span class="text_blue2">��ϸ��Ϣ</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
														<table class="tbcolor">
														 
					 <tr><td class="text_details_L">���</td><td class="text_details_R" style="width: 220;">${po.id}</td>                         
										<td class="text_details_L">��������</td><td class="text_details_R" style="width: 220;">${po.workDt}</td>                 </tr>
										<tr><td class="text_details_L">���ı�ʶ��</td><td class="text_details_R" style="width: 220;">${po.msgId}</td>                
										<td class="text_details_L">���ķ���ʱ��</td><td class="text_details_R" style="width: 220;">${po.creDtTm}</td>            </tr>
										<tr><td class="text_details_L">�����������к�</td><td class="text_details_R" style="width: 220;">${po.instgPty}</td>       
										<td class="text_details_L">���ղ�������к�</td><td class="text_details_R" style="width: 220;">${po.instdPty}</td>       </tr>
										<tr><td class="text_details_L">����ֱ�Ӳ������</td><td class="text_details_R" style="width: 220;">${po.instgDrctPty}</td>  
										<td class="text_details_L">����ֱ�Ӳ������</td><td class="text_details_R" style="width: 220;">${po.instdDrctPty}</td>   </tr>
										<tr><td class="text_details_L">��ִ���ı�ʶ��</td><td class="text_details_R" style="width: 220;">${po.recptMsgId}</td>       
										<td class="text_details_L">�ظ�����ʱ��</td><td class="text_details_R" style="width: 220;">${po.recptDtTm}</td>          </tr>
										<tr><td class="text_details_L">ϵͳ���</td><td class="text_details_R" style="width: 220;">${po.systemCd}</td>               
										<td class="text_details_L">��ע</td><td class="text_details_R" style="width: 220;">${po.ustrd}</td>                      </tr>
										<tr><td class="text_details_L">ACS�����������</td><td class="text_details_R" style="width: 220;">${po.acctgSbjtCd}</td>     
										<td class="text_details_L">ACS������������</td><td class="text_details_R" style="width: 220;">${po.acctgSbjtNm}</td>     </tr>
										<tr><td class="text_details_L">ACS�������</td><td class="text_details_R" style="width: 220;">${po.brnchCd}</td>             
										<td class="text_details_L">ACS��������</td><td class="text_details_R" style="width: 220;">${po.brnchNm}</td>             </tr>
										<tr><td class="text_details_L">���ױ�ʶ��</td><td class="text_details_R" style="width: 220;">${po.txId}</td>                 
										<td class="text_details_L">ԭ���ױ�ʶ��</td><td class="text_details_R" style="width: 220;">${po.orgnlTxId}</td>          </tr>
										<tr><td class="text_details_L">ȡ���������к�</td><td class="text_details_R" style="width: 220;">${po.mmbId}</td>            
										<td class="text_details_L">ȡ�����кţ����С����У�</td><td class="text_details_R" style="width: 220;">${po.brnchId}</td></tr>
										<tr><td class="text_details_L">ACS�����˺�</td><td class="text_details_R" style="width: 220;">${po.pstngAcct}</td>           
										<td class="text_details_L">ACS�����˻�����</td><td class="text_details_R" style="width: 220;">${po.pstngNm}</td>         </tr>
										<tr><td class="text_details_L">�����������</td><td class="text_details_R" style="width: 220;">${po.instnId}</td>           
										<td class="text_details_L">�����������</td><td class="text_details_R" style="width: 220;">${po.instnNm}</td>            </tr>
										<tr><td class="text_details_L">ҵ�����ͱ���</td><td class="text_details_R" style="width: 220;">${po.pmtTp}</td>              
										<td class="text_details_L">ҵ���������</td><td class="text_details_R" style="width: 220;">${po.pmtKd}</td>              </tr>
										<tr><td class="text_details_L">ҵ�����ȼ�</td><td class="text_details_R" style="width: 220;">${po.sttlmPrty}</td>            
										<td class="text_details_L">���ҷ���</td><td class="text_details_R" style="width: 220;">${po.currencyCd}</td>             </tr>
										<tr><td class="text_details_L">���</td><td class="text_details_R" style="width: 220;">${po.amount}</td>                     
										<td class="text_details_L">֧ȡ��ʽ</td><td class="text_details_R" style="width: 220;">${po.drawTp}</td>                 </tr>
										<tr><td class="text_details_L">�ⷿ���                </td><td class="text_details_R" style="width: 220;">${po.strHsTp}</td></tr>
		                		
														</table>
													  
													 <br />
													</div>
												<br></td>
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
		</form>		
	</body>
</html>
