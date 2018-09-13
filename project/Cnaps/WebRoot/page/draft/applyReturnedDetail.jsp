<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>退回申请明细信息</title>
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
														 
														<!-- <tr><td  class="text_details_L" >序号                </td><td  class="text_list_L" >${po.id            }</td>-->
														<!-- <td  class="text_details_L" >&nbsp;           </td><td  class="text_list_L" >&nbsp;       </td>-->
														<!--  <td  class="text_details_L" >工作日期            </td><td  class="text_list_L" >${po.workDt        }</td></tr>-->
														<tr><td  class="text_details_L" >报文标识号          </td><td  class="text_list_L" >${po.msgId         }</td>
														<td  class="text_details_L" >报文发送时间        </td><td  class="text_list_L" >${po.creDtTm       }</td></tr>
														<tr><td  class="text_details_L" >发起参与机构行号    </td><td  class="text_list_L" >${po.instgPty      }</td>
														<td  class="text_details_L" >接收参与机构行号    </td><td  class="text_list_L" >${po.instdPty      }</td></tr>
														<tr><td  class="text_details_L" >发起直接参与机构    </td><td  class="text_list_L" >${po.instgDrctPty  }</td>
														<td  class="text_details_L" >接收直接参与机构    </td><td  class="text_list_L" >${po.instdDrctPty  }</td></tr>
														<tr><td  class="text_details_L" >出票日期            </td><td  class="text_list_L" >${po.issueDt       }</td>
														<td  class="text_details_L" >票据号码            </td><td  class="text_list_L" >${po.notesNo       }</td></tr>
														<tr><td  class="text_details_L" >汇票密押            </td><td  class="text_list_L" >${po.billSeal      }</td>
														<td  class="text_details_L" >汇票种类            </td><td  class="text_list_L" >
														 <c:if test="${po.billTp eq 'CT00'}">可转让汇票</c:if>
								                  						<c:if test="${po.billTp eq 'CT01'}">不可转让汇票</c:if>
								                  						<c:if test="${po.billTp eq 'CT02'}">现金汇票</c:if>
														</td></tr><tr>
														<td  class="text_details_L" >出票金额            </td><td  class="text_list_L" >
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.issueAmt }" />
														</td>
														<td  class="text_details_L" >汇票签发行行号      </td><td  class="text_list_L" >${po.issuerBk      }</td></tr>
														<tr><td  class="text_details_L" >汇票申请人账号      </td><td  class="text_list_L" >${po.issuerAcct    }</td>
														<td  class="text_details_L" >汇票申请人名称      </td><td  class="text_list_L" >${po.issuerNm      }</td></tr>
														<tr><td  class="text_details_L" >票面记载的收款人名称</td><td  class="text_list_L" >${po.rcvrNm        }</td>
														<td  class="text_details_L" >业务状态            </td><td  class="text_list_L" >
														<c:if test="${po.status eq 'PR04' }">已清算</c:if>
													<c:if test="${po.status eq 'PR09' }">已拒绝</c:if>
													<c:if test="${po.status eq 'PR08' }">已撤销</c:if>
													<c:if test="${po.status eq 'PR21' }">已止付</c:if>
													<c:if test="${po.status eq 'PR22' }">已冲正</c:if>
													<c:if test="${po.status eq 'PR32' }">已超期</c:if>
													<c:if test="${po.status eq 'PR05' }">已成功</c:if>
													<c:if test="${po.status eq 'PR98' }">待确认    </c:if>
													<c:if test="${po.status eq 'PR90' }">新建      </c:if>
													<c:if test="${po.status eq 'PR81' }">待复核    </c:if>
													<c:if test="${po.status eq 'PR82' }">待审核    </c:if>
													<c:if test="${po.status eq 'PR83' }">待审批    </c:if>
													<c:if test="${po.status eq 'PR95' }">待组包    </c:if>
													<c:if test="${po.status eq 'PR96' }">待发送    </c:if>
													<c:if test="${po.status eq 'PR97' }">已发送    </c:if>
													<c:if test="${po.status eq 'PR11' }">已轧差排队</c:if> 
													<c:if test="${po.status eq 'PR12' }">已清算排队</c:if> 
													<c:if test="${po.status eq 'PR99' }">故障</c:if>
													<c:if test="${po.status eq 'PR03' }">已轧差</c:if> 
													<c:if test="${po.status eq 'PR89' }">待回执 </c:if>
													<c:if test="${po.status eq 'PR88' }">已回执</c:if>
														</td></tr>
														<tr>
														<td  class="text_details_L" >备注                </td><td  class="text_list_L" colspan="4">${po.ustrd         }
														</tr>

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
