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
		<title>明细信息</title>
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
                						<div  class="text_title"><span class="text_blue2">明细信息</span></div>
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
														 
					 <tr><td class="text_details_L">序号</td><td class="text_details_R" style="width: 220;">${po.id}</td>                         
										<td class="text_details_L">工作日期</td><td class="text_details_R" style="width: 220;">${po.workDt}</td>                 </tr>
										<tr><td class="text_details_L">报文标识号</td><td class="text_details_R" style="width: 220;">${po.msgId}</td>                
										<td class="text_details_L">报文发送时间</td><td class="text_details_R" style="width: 220;">${po.creDtTm}</td>            </tr>
										<tr><td class="text_details_L">发起参与机构行号</td><td class="text_details_R" style="width: 220;">${po.instgPty}</td>       
										<td class="text_details_L">接收参与机构行号</td><td class="text_details_R" style="width: 220;">${po.instdPty}</td>       </tr>
										<tr><td class="text_details_L">发起直接参与机构</td><td class="text_details_R" style="width: 220;">${po.instgDrctPty}</td>  
										<td class="text_details_L">接收直接参与机构</td><td class="text_details_R" style="width: 220;">${po.instdDrctPty}</td>   </tr>
										<tr><td class="text_details_L">回执报文标识号</td><td class="text_details_R" style="width: 220;">${po.recptMsgId}</td>       
										<td class="text_details_L">回复报文时间</td><td class="text_details_R" style="width: 220;">${po.recptDtTm}</td>          </tr>
										<tr><td class="text_details_L">系统编号</td><td class="text_details_R" style="width: 220;">${po.systemCd}</td>               
										<td class="text_details_L">备注</td><td class="text_details_R" style="width: 220;">${po.ustrd}</td>                      </tr>
										<tr><td class="text_details_L">ACS核算主体代码</td><td class="text_details_R" style="width: 220;">${po.acctgSbjtCd}</td>     
										<td class="text_details_L">ACS核算主体名称</td><td class="text_details_R" style="width: 220;">${po.acctgSbjtNm}</td>     </tr>
										<tr><td class="text_details_L">ACS网点代码</td><td class="text_details_R" style="width: 220;">${po.brnchCd}</td>             
										<td class="text_details_L">ACS网点名称</td><td class="text_details_R" style="width: 220;">${po.brnchNm}</td>             </tr>
										<tr><td class="text_details_L">交易标识号</td><td class="text_details_R" style="width: 220;">${po.txId}</td>                 
										<td class="text_details_L">原交易标识号</td><td class="text_details_R" style="width: 220;">${po.orgnlTxId}</td>          </tr>
										<tr><td class="text_details_L">取现清算行行号</td><td class="text_details_R" style="width: 220;">${po.mmbId}</td>            
										<td class="text_details_L">取现行行号（本行、他行）</td><td class="text_details_R" style="width: 220;">${po.brnchId}</td></tr>
										<tr><td class="text_details_L">ACS记账账号</td><td class="text_details_R" style="width: 220;">${po.pstngAcct}</td>           
										<td class="text_details_L">ACS记账账户名称</td><td class="text_details_R" style="width: 220;">${po.pstngNm}</td>         </tr>
										<tr><td class="text_details_L">货金机构代码</td><td class="text_details_R" style="width: 220;">${po.instnId}</td>           
										<td class="text_details_L">货金机构名称</td><td class="text_details_R" style="width: 220;">${po.instnNm}</td>            </tr>
										<tr><td class="text_details_L">业务类型编码</td><td class="text_details_R" style="width: 220;">${po.pmtTp}</td>              
										<td class="text_details_L">业务种类编码</td><td class="text_details_R" style="width: 220;">${po.pmtKd}</td>              </tr>
										<tr><td class="text_details_L">业务优先级</td><td class="text_details_R" style="width: 220;">${po.sttlmPrty}</td>            
										<td class="text_details_L">货币符号</td><td class="text_details_R" style="width: 220;">${po.currencyCd}</td>             </tr>
										<tr><td class="text_details_L">金额</td><td class="text_details_R" style="width: 220;">${po.amount}</td>                     
										<td class="text_details_L">支取方式</td><td class="text_details_R" style="width: 220;">${po.drawTp}</td>                 </tr>
										<tr><td class="text_details_L">库房类别                </td><td class="text_details_R" style="width: 220;">${po.strHsTp}</td></tr>
		                		
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
