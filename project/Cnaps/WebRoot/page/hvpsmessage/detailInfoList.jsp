<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
	String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>明细信息</title>
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/css/page_color1.css" />
		<script language="javascript">
    </script>
	</head>
	<body>
		<form>
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
														<span class="text_blue2">明细信息</span>
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
														<table class="tbcolor">

															<c:choose>
																<c:when test="${cnaps2jydm =='1510931602'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																			<br>
																		</td>
																		<td class="text_list_L">
																			${po.id }
																		</td>
																		<td class="text_details_L">
																			渠道报文标识号
																		</td>
																		<td class="text_details_R" style="width: 180px;">
																			${po.chnmsgid }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.chncredttm }
																		</td>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm }
																		</td>
																		<td class="text_details_L">
																			发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.sendbranch }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvbranch }
																		</td>
																		<td class="text_details_L">
																			原发起机构号
																		</td>
																		<td class="text_details_R">
																			${po.orisendbranch }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原业务报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.orimsgid }
																		</td>
																		<td class="text_details_L">
																			原报文类型代码
																		</td>
																		<td class="text_details_R">
																			${po.orimsgcode }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原业务类型编码
																		</td>
																		<td class="text_details_R">
																			${po.oripmttp }
																		</td>
																		<td class="text_details_L">
																			备注
																		</td>
																		<td class="text_details_R">
																			${po.remarkinfo }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			应答报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.replymsgid }
																		</td>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.replycredttm }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			申请报文NPC业务状态
																		</td>
																		<td class="text_details_R">
																			${po.appsts }
																		</td>
																		<td class="text_details_L">
																			申请报文业务处理码
																		</td>
																		<td class="text_details_R">
																			${po.appprocode }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			申请业务拒绝信息
																		</td>
																		<td class="text_details_R">
																			${po.apprjctdesc }
																		</td>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R">
																			${po.pmtsts }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode }
																		</td>
																		<td class="text_details_L">
																			拒绝业务的参与机构行号
																		</td>
																		<td class="text_details_R">
																			${po.rjctbranch }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			参与机构业务拒绝码
																		</td>
																		<td class="text_details_R">
																			${po.rjctrsn }
																		</td>
																		<td class="text_details_L">
																			业务拒绝信息
																		</td>
																		<td class="text_details_R">
																			${po.rjctdesc }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			轧差日期或终态日期
																		</td>
																		<td class="text_details_R">
																			${po.prodate }
																		</td>
																		<td class="text_details_L">
																			轧差场次
																		</td>
																		<td class="text_details_R">
																			${po.rptgsrcprtry }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务清算日期
																		</td>
																		<td class="text_details_R">
																			${po.valdt }
																		</td>
																		<td class="text_details_L">
																			付款人名称
																		</td>
																		<td class="text_details_R">
																			${po.dbtrnm }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			付款人账号
																		</td>
																		<td class="text_details_R">
																			${po.dbtracctid }
																		</td>
																		<td class="text_details_L">
																			付款人开户行名称
																		</td>
																		<td class="text_details_R">
																			${po.dbtracctissr }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			付款人账户类型
																		</td>
																		<td class="text_details_R">
																			${po.dbtraccttp }
																		</td>
																		<td class="text_details_L">
																			回复备注
																		</td>
																		<td class="text_details_R">
																			${po.replyremarkinfo }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.workdate }
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510990702'}">
																	<tr>
																		<td class="text_details_L" style="width: 80px;">
																			序号
																		</td>
																		<td style="width: 250px;" class="text_details_R">
																			${po.id }
																		</td>
																		<td class="text_details_L">
																			关联序号
																		</td>
																		<td style="width: 250px;" class="text_details_R">
																			${po.parentid }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			生效类型
																		</td>
																		<td class="text_details_R">
																			${po.fctvtp }
																		</td>
																		<td class="text_details_L">
																			生效日期
																		</td>
																		<td class="text_details_R">
																			${po.effdate }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			公共数据类型
																		</td>
																		<td class="text_details_R">
																			${po.cmondatatp }
																		</td>
																		<td class="text_details_L">
																			公共数据代码
																		</td>
																		<td class="text_details_R">
																			${po.cmondatacd }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			公共数据名称
																		</td>
																		<td class="text_details_R">
																			${po.cmondatanm }
																		</td>
																		<td class="text_details_L">
																			公共数据值
																		</td>
																		<td class="text_details_R">
																			${po.cmondataval }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			变更类型
																		</td>
																		<td class="text_details_R">
																			${po.chgtp }
																		</td>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R">
																			${po.workdate }
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510930703'}">
																	<tr>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R" style="width: 200px;">
																			${po.msgid }
																		</td>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起参与机构行号
																		</td>
																		<td class="text_details_R">
																			${po.sendbranch }
																		</td>
																		<td class="text_details_L">
																			接收参与机构行号
																		</td>
																		<td class="text_details_R">
																			${po.recvbranch }
																		</td>
																	<tr>
																		
																		<td class="text_details_L">
																			原报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.orimsgid }
																		</td>
																		<td class="text_details_L">
																			原报文类型代码
																		</td>
																		<td class="text_details_R">
																		
																			  <c:if test="${po.orimsgcode eq 'hvps.111.001.01'}">大额客户普通贷记</c:if>
								                  <c:if test="${po.orimsgcode eq 'hvps.112.001.01'}">大额机构普通贷记</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.121.001.01'}">小额客户普通贷记</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.122.001.01'}">小额机构普通贷记</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.127.001.01'}">普通借记</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.123.001.01'}">实时贷记</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.131.001.01'}">实时借记</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.125.001.01'}">定期贷记</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.133.001.01'}">定期借记</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.130.001.01'}">CIS通用回执业务报文</c:if>
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			处理状态
																		</td>
																		<td class="text_details_R">
																				<c:if test="${po.pmtsts eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${po.pmtsts eq 'PR08' }">已撤销</c:if>
																	<c:if test="${po.pmtsts eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${po.pmtsts eq 'PR05' }">已成功</c:if>
																	<c:if test="${po.pmtsts eq 'PR96' }">待发送    </c:if>
																	<c:if test="${po.pmtsts eq 'PR97' }">已发送    </c:if>
																	<c:if test="${po.pmtsts eq 'PR99' }">故障</c:if>
																	<c:if test="${po.pmtsts eq 'PR89' }">待回执 </c:if>
																	<c:if test="${po.pmtsts eq 'PR88' }">已回执</c:if>
																		</td>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R">
																			${po.workdate }
																		</td>
																	</tr>
																	
																	<tr>
																		
																		<td class="text_details_L">
																			回复报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.replymsgid }
																		</td>
																		<td class="text_details_L">
																			回复报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.replycredttm }
																		</td>
																	</tr>
																	<tr>
																		
																		<td class="text_details_L">
																			业务处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode }
																		</td>
																		<td class="text_details_L">
																			业务拒绝码
																		</td>
																		<td class="text_details_R">
																			${po.rjctrsn }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			NPC业务处理信息
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.proinfo }
																		</td>
																		
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			撤销日期
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.prodate }
																		</td>
																		
																	</tr>
																	<tr>
																		
																		<td class="text_details_L">
																			备注
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.remarkinfo }
																		</td>
																	</tr>
																	
																</c:when>
																<c:when test="${cnaps2jydm =='1510993801'}">
																	<tr>
																		<td style="width: 60px;" class="text_details_L">
																			序号
																		</td>
																		<td style="width: 280px;" class="text_details_R">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			关联序号
																		</td>
																		<td style="width: 280px;" class="text_details_R">
																			${po.parentid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			变更类型
																		</td>
																		<td class="text_details_R">
																			${po.chgtp}
																		</td>
																		<td class="text_details_L">
																			行别代码
																		</td>
																		<td class="text_details_R">
																			${po.bkctgycd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			行别名称
																		</td>
																		<td class="text_details_R">
																			${po.bkctgynm}
																		</td>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R">
																			${po.workdate}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510930302'}">
																	<tr>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid }
																		</td>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R">
																			${po.workdate }
																		</td>
																		<td class="text_details_L">
																			终态日期
																		</td>
																		<td class="text_details_R">
																			${po.prodate }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			系统编号
																		</td>
																		<td class="text_details_R">
																			<c:if test="${po.systemcd eq 'HVPS'}">大额实时支付系统</c:if>
																			<c:if test="${po.systemcd eq 'BEPS'}">小额批量支付系统</c:if>
																			<c:if test="${po.systemcd eq 'IBPS'}">网上支付跨行清算系统</c:if>
																		</td>
																		<td class="text_details_L">
																			来往标识
																		</td>
																		<td class="text_details_R">
																			<c:if test="${po.direction eq 'O'}">发送</c:if>
																			<c:if test="${po.direction eq 'I'}">接收</c:if>
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instgpty }
																		</td>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.sendbranch }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instdpty }
																		</td>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvbranch }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			信息内容
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.msgcnt }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R">
																			<c:if test="${po.pmtsts eq 'PR09' }">已拒绝</c:if>
																			<c:if test="${po.pmtsts eq 'PR08' }">已撤销</c:if>
																			<c:if test="${po.pmtsts eq 'PR09' }">已拒绝</c:if>
																			<c:if test="${po.pmtsts eq 'PR05' }">已成功</c:if>
																			<c:if test="${po.pmtsts eq 'PR96' }">待发送    </c:if>
																			<c:if test="${po.pmtsts eq 'PR97' }">已发送    </c:if>
																			<c:if test="${po.pmtsts eq 'PR99' }">故障</c:if>
																			<c:if test="${po.pmtsts eq 'PR89' }">待回执 </c:if>
																			<c:if test="${po.pmtsts eq 'PR88' }">已回执</c:if>

																		</td>
																		<td class="text_details_L">
																			处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode }
																		</td>
																	</tr>

																	<tr>
																		<td class="text_details_L">
																			业务拒绝原因
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.rjctdesc }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务拒绝码
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.rjctrsn }
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510993702'}">
																	<tr>
																		<td style="width: 80px;" class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R" style="width: 280px;">
																			${po.id }
																		</td>
																		<td class="text_details_L">
																			关联序号
																		</td>
																		<td class="text_details_R" style="width: 280px;">
																			${po.parentid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			变更类型
																		</td>
																		<td class="text_details_R">
																			${po.purposetypenotify}
																		</td>
																		<td class="text_details_L">
																			生效类型
																		</td>
																		<td class="text_details_R">
																			${po.effectivetype}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			生效日期
																		</td>
																		<td class="text_details_R">
																			${po.effdate}
																		</td>
																		<td class="text_details_L">
																			失效日期
																		</td>
																		<td class="text_details_R">
																			${po.invdate}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			城市代码
																		</td>
																		<td class="text_details_R">
																			${po.citycode}
																		</td>
																		<td class="text_details_L">
																			城市名称
																		</td>
																		<td class="text_details_R">
																			${po.cityname}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			城市类型
																		</td>
																		<td class="text_details_R">
																			${po.citytype}
																		</td>
																		<td class="text_details_L">
																			节点代码
																		</td>
																		<td class="text_details_R">
																			${po.nodecode}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510991503'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R" style="width: 280px;">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			关联序号
																		</td>
																		<td class="text_details_R" style="width: 280px;">
																			${po.parentid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			变更类型
																		</td>
																		<td class="text_details_R">
																			${po.purposetypenotify}
																		</td>
																		<td class="text_details_L">
																			生效类型
																		</td>
																		<td class="text_details_R">
																			${po.effectivetype}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			生效日期
																		</td>
																		<td class="text_details_R">
																			${po.effdate}
																		</td>
																		<td class="text_details_L">
																			失效日期
																		</td>
																		<td class="text_details_R">
																			${po.invdate}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.initiateparticipant}
																		</td>
																		<td class="text_details_L">
																			接收参与机构
																		</td>
																		<td class="text_details_R">
																			${po.receiveparticipant}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务权限清单
																		</td>
																		<td colspan="3" class="text_details_R">
																			${po.businessauthorityinformation}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510991602'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R" style="width: 250px;">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			关联序号
																		</td>
																		<td class="text_details_R" style="width: 250px;">
																			${po.parentid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			变更类型
																		</td>
																		<td class="text_details_R">
																			${po.purposetypenotify}
																		</td>
																		<td class="text_details_L">
																			生效类型
																		</td>
																		<td class="text_details_R">
																			${po.effectivetype}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			生效日期
																		</td>
																		<td class="text_details_R">
																			${po.effdate}
																		</td>
																		<td class="text_details_L">
																			失效日期
																		</td>
																		<td class="text_details_R">
																			${po.invdate}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			参与机构行号
																		</td>
																		<td class="text_details_R">
																			${po.bankcode}
																		</td>
																		<td class="text_details_L">
																			参与机构类别
																		</td>
																		<td class="text_details_R">
																			${po.participanttype}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			行别代码
																		</td>
																		<td class="text_details_R">
																			${po.bankcategorycode}
																		</td>
																		<td class="text_details_L">
																			所属直参行号
																		</td>
																		<td class="text_details_R">
																			${po.directbankcode}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			所属法人
																		</td>
																		<td class="text_details_R">
																			${po.legalperson}
																		</td>
																		<td class="text_details_L">
																			本行上级参与机构
																		</td>
																		<td class="text_details_R">
																			${po.higerparticipant}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			承接行行号
																		</td>
																		<td class="text_details_R">
																			${po.bearbankcode}
																		</td>
																		<td class="text_details_L">
																			管辖人行行号
																		</td>
																		<td class="text_details_R">
																			${po.chargebankcode}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			所属CCPC
																		</td>
																		<td class="text_details_R">
																			${po.nodecode}
																		</td>
																		<td class="text_details_L">
																			所在城市代码
																		</td>
																		<td class="text_details_R">
																			${po.citycode}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			参与机构全称
																		</td>
																		<td class="text_details_R">
																			${po.participantname}
																		</td>
																		<td class="text_details_L">
																			参与机构简称
																		</td>
																		<td class="text_details_R">
																			${po.participantshortname}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			加入业务系统标识
																		</td>
																		<td class="text_details_R">
																			${po.sign}
																		</td>
																		<td class="text_details_L">
																			地址
																		</td>
																		<td class="text_details_R">
																			${po.address}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			邮编
																		</td>
																		<td class="text_details_R">
																			${po.postcode}
																		</td>
																		<td class="text_details_L">
																			电话/电挂
																		</td>
																		<td class="text_details_R">
																			${po.telephone}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			电子邮件地址
																		</td>
																		<td class="text_details_R">
																			${po.email}
																		</td>
																		<td class="text_details_L">
																			备注
																		</td>
																		<td class="text_details_R">
																			${po.remarkinformation}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510991302'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td style="width: 250px;" class="text_details_R">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			关联序号
																		</td>
																		<td style="width: 250px;" class="text_details_R">
																			${po.parentid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			变更类型
																		</td>
																		<td class="text_details_R">
																			${po.purposetypenotify}
																		</td>
																		<td class="text_details_L">
																			生效类型
																		</td>
																		<td class="text_details_R">
																			${po.effectivetype}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			生效日期
																		</td>
																		<td class="text_details_R">
																			${po.effdate}
																		</td>
																		<td class="text_details_L">
																			失效日期
																		</td>
																		<td class="text_details_R">
																			${po.invdate}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			票交机构行号
																		</td>
																		<td class="text_details_R">
																			${po.ncisbankcode}
																		</td>
																		<td class="text_details_L">
																			小额代理行行号
																		</td>
																		<td class="text_details_R">
																			${po.bepsagencybankcode}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510931802'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td style="width: 220px;" class="text_details_R">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td style="width: 220px;" class="text_details_R">
																			${po.workdate}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			来往标识
																		</td>
																		<td class="text_details_R">
																			${po.sendrecvflag}
																		</td>
																		<td class="text_details_L">
																			渠道报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.chnmsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			渠道报文接收时间
																		</td>
																		<td class="text_details_R">
																			${po.chndttm}
																		</td>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm}
																		</td>
																		<td class="text_details_L">
																			结果报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.resultmsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			结果报文时间
																		</td>
																		<td class="text_details_R">
																			${po.resultdttm}
																		</td>
																		<td class="text_details_L">
																			回复报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.replymsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回复报文时间
																		</td>
																		<td class="text_details_R">
																			${po.replydttm}
																		</td>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.senddrctpty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.sendindrctpty}
																		</td>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvdrctpty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvindrctpty}
																		</td>
																		<td class="text_details_L">
																			系统编号
																		</td>
																		<td class="text_details_R">
																			${po.systemcode}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			备注
																		</td>
																		<td class="text_details_R">
																			${po.remarkinfo}
																		</td>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R">
																			${po.pmtsts}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode}
																		</td>
																		<td class="text_details_L">
																			业务拒绝信息
																		</td>
																		<td class="text_details_R">
																			${po.rjctdesc}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			终态日期
																		</td>
																		<td class="text_details_R">
																			${po.prodate}
																		</td>
																		<td class="text_details_L">
																			退回类型
																		</td>
																		<td class="text_details_R">
																			${po.backtype}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.originalmessageid}
																		</td>
																		<td class="text_details_L">
																			原发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.originalinstructingparty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文类型
																		</td>
																		<td class="text_details_R">
																			${po.originalmessagetype}
																		</td>
																		<td class="text_details_L">
																			退回应答状态
																		</td>
																		<td class="text_details_R">
																			${po.replystatus}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			附言
																		</td>
																		<td colspan="3" class="text_details_R">
																			${po.replycontent}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510931803'}">
																	<tr>
																		<td style="width: 35px;" class="text_details_L">
																			序号
																		</td>
																		<td style="width: 80px;" class="text_details_L">
																			关联序号
																		</td>
																		<td style="width: 130px;" class="text_details_L">
																			原发起直接参与机构
																		</td>
																		<td style="width: 130px;" class="text_details_L">
																			原发起间接参与机构
																		</td>
																		<td style="width: 130px;" class="text_details_L">
																			原接收直接参与机构
																		</td>
																		<td style="width: 130px;" class="text_details_L">
																			原接收间接参与机构
																		</td>
																		<td style="width: 90px;" class="text_details_L">
																			原明细标识号
																		</td>
																		<td class="text_details_L">
																			原业务类型编码
																		</td>
																		<td style="width: 50px;" class="text_details_L">
																			固定值
																		</td>
																	</tr>
																	<logic:present name="queryList">
																		<logic:iterate id="po" name="queryList">
																			<tr>
																				<td class="text_details_R">
																					${po.id}
																				</td>
																				<td class="text_details_R">
																					${po.parentid}
																				</td>
																				<td class="text_details_R">
																					${po.orisenddrctpty}
																				</td>
																				<td class="text_details_R">
																					${po.orisendindrctpty}
																				</td>
																				<td class="text_details_R">
																					${po.orirecvdrctpty}
																				</td>
																				<td class="text_details_R">
																					${po.orirecvindrctpty}
																				</td>
																				<td class="text_details_R">
																					${po.oritransactionid}
																				</td>
																				<td class="text_details_R">
																					${po.oritransactiontypecode}
																				</td>
																				<td class="text_details_R">
																					${po.rtrdintrbksttlmamt}
																				</td>
																			</tr>
																		</logic:iterate>
																	</logic:present>
																</c:when>
																<c:when test="${cnaps2jydm =='1510980502'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R" style="width: 230px;">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			渠道报文标识号
																		</td>
																		<td class="text_details_R" style="width: 230px;">
																			${po.chnmsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			渠道报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.chncredttm}
																		</td>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm}
																		</td>
																		<td class="text_details_L">
																			回复报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.replymsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回复报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.replycredttm}
																		</td>
																		<td class="text_details_L">
																			发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.sendbranch}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvbranch}
																		</td>
																		<td class="text_details_L">
																			系统号
																		</td>
																		<td class="text_details_R">
																			${po.syscd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			操作类型
																		</td>
																		<td class="text_details_R">
																			${po.oprtp}
																		</td>
																		<td class="text_details_L">
																			系统当前日期
																		</td>
																		<td class="text_details_R">
																			${po.curorgnlsysdt}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			系统当前状态
																		</td>
																		<td class="text_details_R">
																			${po.cursyssts}
																		</td>
																		<td class="text_details_L">
																			NPC处理状态
																		</td>
																		<td class="text_details_R">
																			${po.pmtsts}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode}
																		</td>
																		<td class="text_details_L">
																			拒绝信息
																		</td>
																		<td class="text_details_R">
																			${po.rjctdesc}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R">
																			${po.workdate}
																		</td>
																		<td class="text_details_L">
																			转发状态
																		</td>
																		<td class="text_details_R">
																			${po.transsts}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510990302'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td style="width: 230px;" class="text_details_R">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			渠道报文标识号
																		</td>
																		<td style="width: 230px;" class="text_details_R">
																			${po.chnmsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			渠道报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.chncredttm}
																		</td>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm}
																		</td>
																		<td class="text_details_L">
																			回复报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.replymsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回复报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.replycredttm}
																		</td>
																		<td class="text_details_L">
																			来往标识
																		</td>
																		<td class="text_details_R">
																			${po.sendrecvflag}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.sendbranch}
																		</td>
																		<td class="text_details_L">
																			系统号
																		</td>
																		<td class="text_details_R">
																			${po.syscd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			变更类型
																		</td>
																		<td class="text_details_R">
																			${po.chgtp}
																		</td>
																		<td class="text_details_L">
																			备注
																		</td>
																		<td class="text_details_R">
																			${po.remarkinfo}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R">
																			${po.pmtsts}
																		</td>
																		<td class="text_details_L">
																			转发状态
																		</td>
																		<td class="text_details_R">
																			${po.transsts}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode}
																		</td>
																		<td class="text_details_L">
																			拒绝机构行号
																		</td>
																		<td class="text_details_R">
																			${po.rjctbranch}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			机构业务拒绝码
																		</td>
																		<td class="text_details_R">
																			${po.rjctrsn}
																		</td>
																		<td class="text_details_L">
																			拒绝信息
																		</td>
																		<td class="text_details_R">
																			${po.rjctdesc}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			处理日期
																		</td>
																		<td class="text_details_R">
																			${po.prodate}
																		</td>
																		<td class="text_details_L">
																			回复备注
																		</td>
																		<td class="text_details_R">
																			${po.replyremarkinfo}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R">
																			${po.workdate}
																		</td>
																		<td class="text_details_L">
																			拒绝参与机构ID
																		</td>
																		<td class="text_details_R">
																			${po.rjctbrchid}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510931404'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td style="width: 220px;" class="text_details_R">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td style="width: 220px;" class="text_details_R">
																			${po.workdate}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			来往标识
																		</td>
																		<td class="text_details_R">
																			${po.sendrecvflag}
																		</td>
																		<td class="text_details_L">
																			渠道报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.chnmsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			渠道报文接收时间
																		</td>
																		<td class="text_details_R">
																			${po.chndttm}
																		</td>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm}
																		</td>
																		<td class="text_details_L">
																			结果报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.resultmsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			结果报文时间
																		</td>
																		<td class="text_details_R">
																			${po.resultdttm}
																		</td>
																		<td class="text_details_L">
																			回复报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.replymsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回复报文时间
																		</td>
																		<td class="text_details_R">
																			${po.replydttm}
																		</td>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.senddrctpty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.sendindrctpty}
																		</td>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvdrctpty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvindrctpty}
																		</td>
																		<td class="text_details_L">
																			系统编号
																		</td>
																		<td class="text_details_R">
																			${po.systemcode}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			备注
																		</td>
																		<td class="text_details_R">
																			${po.remarkinfo}
																		</td>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R">
																			${po.pmtsts}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode}
																		</td>
																		<td class="text_details_L">
																			业务拒绝信息
																		</td>
																		<td class="text_details_R">
																			${po.rjctdesc}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			终态日期
																		</td>
																		<td class="text_details_R">
																			${po.prodate}
																		</td>
																		<td class="text_details_L">
																			查询类型
																		</td>
																		<td class="text_details_R">
																			${po.querytype}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.originalmessageid}
																		</td>
																		<td class="text_details_L">
																			原发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.originalinstructingparty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文类型
																		</td>
																		<td class="text_details_R">
																			${po.originalmessagetype}
																		</td>
																		<td class="text_details_L">
																			原发起间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instructingindirectparty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原接收间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instructedindirectparty}
																		</td>
																		<td class="text_details_L">
																			原明细标识号
																		</td>
																		<td class="text_details_R">
																			${po.oritransactionid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原业务类型编码
																		</td>
																		<td class="text_details_R">
																			${po.oritransactiontypecode}
																		</td>
																		<td class="text_details_L">
																			待查询业务货币符号、金额:
																		</td>
																		<td class="text_details_R">
																			${po.amount}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			查询内容
																		</td>
																		<td class="text_details_R">
																			${po.querycontent}
																		</td>
																		<td class="text_details_L">
																			查复内容
																		</td>
																		<td class="text_details_R">
																			${po.replycontent}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510931503'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R">
																			${po.workdate}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			来往标识
																		</td>
																		<td class="text_details_R">
																			${po.sendrecvflag}
																		</td>
																		<td class="text_details_L">
																			渠道报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.chnmsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			渠道报文接收时间
																		</td>
																		<td class="text_details_R">
																			${po.chndttm}
																		</td>
																		<td class="text_details_L">
																			原查询书报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm}
																		</td>
																		<td class="text_details_L">
																			结果报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.resultmsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			结果报文时间
																		</td>
																		<td class="text_details_R">
																			${po.resultdttm}
																		</td>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.replymsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回复报文时间
																		</td>
																		<td class="text_details_R">
																			${po.replydttm}
																		</td>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.senddrctpty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.sendindrctpty}
																		</td>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvdrctpty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvindrctpty}
																		</td>
																		<td class="text_details_L">
																			系统编号
																		</td>
																		<td class="text_details_R">
																			${po.systemcode}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			备注
																		</td>
																		<td class="text_details_R">
																			${po.remarkinfo}
																		</td>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R">
																			${po.pmtsts}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode}
																		</td>
																		<td class="text_details_L">
																			业务拒绝信息
																		</td>
																		<td class="text_details_R">
																			${po.rjctdesc}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			终态日期
																		</td>
																		<td class="text_details_R">
																			${po.prodate}
																		</td>
																		<td class="text_details_L">
																			查询类型
																		</td>
																		<td class="text_details_R">
																			${po.querytype}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.originalmessageid}
																		</td>
																		<td class="text_details_L">
																			原发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.originalinstructingparty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文类型
																		</td>
																		<td class="text_details_R">
																			${po.originalmessagetype}
																		</td>
																		<td class="text_details_L">
																			原发起间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instructingindirectparty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原接收间接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instructedindirectparty}
																		</td>
																		<td class="text_details_L">
																			原明细标识号
																		</td>
																		<td class="text_details_R">
																			${po.oritransactionid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原业务类型编码
																		</td>
																		<td class="text_details_R">
																			${po.oritransactiontypecode}
																		</td>
																		<td class="text_details_L">
																			待查询业务货币符号、金额:
																		</td>
																		<td class="text_details_R">
																			${po.amount}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			查询内容
																		</td>
																		<td class="text_details_R">
																			${po.querycontent}
																		</td>
																		<td class="text_details_L">
																			查复内容
																		</td>
																		<td class="text_details_R">
																			${po.replycontent}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510713302'}">
																	<tr>
																		<td class="text_details_L">
																			付款人账号
																		</td>
																		<td style="width: 220px;" class="text_details_R">
																			${po.fkrzh}
																		</td>
																		<td class="text_details_L">
																			付款人名称
																		</td>
																		<td style="width: 220px;" class="text_details_R">
																			${po.fkrmc}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			付款人开户行行号
																		</td>
																		<td class="text_details_R">
																			${po.fkrkhhhh}
																		</td>
																		<td class="text_details_L">
																			付款人开户行名称
																		</td>
																		<td class="text_details_R">
																			${po.fkrkhhmc}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			收款人代码
																		</td>
																		<td class="text_details_R">
																			${po.skrdm}
																		</td>
																		<td class="text_details_L">
																			收款人名称
																		</td>
																		<td class="text_details_R">
																			${po.skrmc}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			收款人开户行行号
																		</td>
																		<td class="text_details_R">
																			${po.skrkhhhh}
																		</td>
																		<td class="text_details_L">
																			收款人开户行行名
																		</td>
																		<td class="text_details_R">
																			${po.skrkhhhm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务类型编码
																		</td>
																		<td class="text_details_R">

																			<c:if test="${po.ywlxbm=='F100'}">普通定期借记业务</c:if>
																			<c:if test="${po.ywlxbm=='E102'}">定期代收</c:if>


																		</td>
																		<td class="text_details_L">
																			业务种类编码
																		</td>
																		<td class="text_details_R">
																			<c:if test="${po.ywzlbm=='00100'}">电费</c:if>
																			<c:if test="${po.ywzlbm=='00200'}">水暖费</c:if>
																			<c:if test="${po.ywzlbm=='00300'}">煤气费</c:if>
																			<c:if test="${po.ywzlbm=='00400'}">电话费</c:if>
																			<c:if test="${po.ywzlbm=='00500'}">通讯费</c:if>
																			<c:if test="${po.ywzlbm=='00600'}">保险费</c:if>
																			<c:if test="${po.ywzlbm=='00700'}">房屋管理费</c:if>
																			<c:if test="${po.ywzlbm=='00800'}">代理服务费</c:if>
																			<c:if test="${po.ywzlbm=='00900'}">学教费</c:if>
																			<c:if test="${po.ywzlbm=='01000'}">有线电视费</c:if>
																			<c:if test="${po.ywzlbm=='01100'}">企业管理费用</c:if>
																			<c:if test="${po.ywzlbm=='09001'}">其他</c:if>


																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			合同编号
																		</td>
																		<td class="text_details_R">
																			${po.htbh}
																		</td>
																		<td class="text_details_L">
																			备注
																		</td>
																		<td class="text_details_R">
																			${po.bz}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510713306'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R" style="width: 220px;">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			关联序号
																		</td>
																		<td class="text_details_R" style="width: 220px;">
																			${po.prntid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid}
																		</td>
																		<td class="text_details_L">
																			回执报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.recptmsgid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			支付业务序号
																		</td>
																		<td class="text_details_R">
																			${po.txid}
																		</td>
																		<td class="text_details_L">
																			支付交易组号
																		</td>
																		<td class="text_details_R">
																			${po.pmtgrpid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务种类编码
																		</td>
																		<td class="text_details_R">
																			${po.pmtkd}
																		</td>
																		<td class="text_details_L">
																			端到端标识号
																		</td>
																		<td class="text_details_R">
																			${po.endtoendid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			支付业务参考号
																		</td>
																		<td class="text_details_R">
																			${po.reftxid}
																		</td>
																		<td class="text_details_L">
																			单笔金额
																		</td>
																		<td class="text_details_R">
																			${po.snglamt}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			交易状态
																		</td>
																		<td class="text_details_R">
																			${po.status}
																		</td>
																		<td class="text_details_L">
																			轧差日期
																		</td>
																		<td class="text_details_R">
																			${po.netgdt}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			轧差场次
																		</td>
																		<td class="text_details_R">
																			${po.netgrnd}
																		</td>
																		<td class="text_details_L">
																			清算日期
																		</td>
																		<td class="text_details_R">
																			${po.sttlmdt}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			附言
																		</td>
																		<td class="text_details_R">
																			${po.addtlinf}
																		</td>
																		<td class="text_details_L">
																			备注
																		</td>
																		<td class="text_details_R">
																			${po.ustrd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			扣款合同编号
																		</td>
																		<td class="text_details_R">
																			${po.pmtagrmtnb}
																		</td>
																		<td class="text_details_L">
																			回执日期
																		</td>
																		<td class="text_details_R">
																			${po.rcptdt}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务拒绝码
																		</td>
																		<td class="text_details_R">
																			${po.txrjctcd}
																		</td>
																		<td class="text_details_L">
																			业务拒绝原因
																		</td>
																		<td class="text_details_R">
																			${po.txrjctinf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回执状态
																		</td>
																		<td class="text_details_R">
																			${po.rcptsts}
																		</td>
																		<td class="text_details_L">
																			回执附言
																		</td>
																		<td class="text_details_R">
																			${po.rcptaddtlinf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			付款人账号
																		</td>
																		<td class="text_details_R">
																			${po.dbtracct}
																		</td>
																		<td class="text_details_L">
																			付款人名称
																		</td>
																		<td class="text_details_R">
																			${po.dbtrnm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			付款人地址
																		</td>
																		<td class="text_details_R">
																			${po.dbtraddr}
																		</td>
																		<td class="text_details_L">
																			付款人开户行行号
																		</td>
																		<td class="text_details_R">
																			${po.dbtrissuer}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			付款人开户行行名
																		</td>
																		<td class="text_details_R">
																			${po.dbtrissuernm}
																		</td>
																		<td class="text_details_L">
																			付款清算行行号
																		</td>
																		<td class="text_details_R">
																			${po.dbtrmmbid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			付款行行号
																		</td>
																		<td class="text_details_R">
																			${po.dbtrbrnchid}
																		</td>
																		<td class="text_details">
																			付款行行名
																		</td>
																		<td class="text_details_R">
																			${po.dbtrbrnchnm}
																		</td>
																	</tr>
																</c:when>

																<c:when test="${cnaps2jydm =='1510931501'}">
																	<tr>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid }
																		</td>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R">
																			${po.workdate }
																		</td>
																		<td class="text_details_L">
																			终态日期
																		</td>
																		<td class="text_details_R">
																			${po.prodate }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			系统编号
																		</td>
																		<td class="text_details_R">
																			<c:if test="${po.systemCd eq 'HVPS'}">大额实时支付系统</c:if>
																			<c:if test="${po.systemCd eq 'BEPS'}">小额批量支付系统</c:if>
																			<c:if test="${po.systemCd eq 'IBPS'}">网上支付跨行清算系统</c:if>
																		</td>
																		<td class="text_details_L">
																			来往标识
																		</td>
																		<td class="text_details_R">
																			<c:if test="${po.direction eq 'O'}">发送</c:if>
																			<c:if test="${po.direction eq 'I'}">接收</c:if>
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instgpty }
																		</td>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.sendbranch }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instdpty }
																		</td>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvbranch }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			信息内容
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.msgcnt }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R">
																			${po.pmtsts }
																		</td>
																		<td class="text_details_L">
																			处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode }
																		</td>
																	</tr>

																	<tr>
																		<td class="text_details_L">
																			业务拒绝原因
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.rjctdesc }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务拒绝码
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.rjctrsn }
																		</td>
																	</tr>
																</c:when>

																<c:when test="${cnaps2jydm =='1510931401'}">
																	<tr>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R">
																			${po.msgid }
																		</td>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R">
																			${po.credttm }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R">
																			${po.workdate }
																		</td>
																		<td class="text_details_L">
																			终态日期
																		</td>
																		<td class="text_details_R">
																			${po.prodate }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			系统编号
																		</td>
																		<td class="text_details_R">
																			<c:if test="${po.systemcd eq 'HVPS'}">大额实时支付系统</c:if>
																			<c:if test="${po.systemcd eq 'BEPS'}">小额批量支付系统</c:if>
																			<c:if test="${po.systemcd eq 'IBPS'}">网上支付跨行清算系统</c:if>
																		</td>
																		<td class="text_details_L">
																			来往标识
																		</td>
																		<td class="text_details_R">
																			<c:if test="${po.direction eq 'O'}">发送</c:if>
																			<c:if test="${po.direction eq 'I'}">接收</c:if>
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instgpty }
																		</td>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.sendbranch }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收参与机构
																		</td>
																		<td class="text_details_R">
																			${po.instdpty }
																		</td>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R">
																			${po.recvbranch }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			信息内容
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.msgcnt }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R">
																			${po.pmtsts }
																		</td>
																		<td class="text_details_L">
																			处理码
																		</td>
																		<td class="text_details_R">
																			${po.procode }
																		</td>
																	</tr>

																	<tr>
																		<td class="text_details_L">
																			业务拒绝原因
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.rjctdesc }
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务拒绝码
																		</td>
																		<td class="text_details_R" colspan="3">
																			${po.rjctrsn }
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510741301'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			支付交易组号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.pmtGrpId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.workDt}
																		</td>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.msgId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.creDtTm}
																		</td>
																		<td class="text_details_L">
																			回执报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.recptMsgId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回执报文时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.recptDtTm}
																		</td>
																		<td class="text_details_L">
																			发起参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instgPty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instdPty}
																		</td>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instgDrctPty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instdDrctPty}
																		</td>
																		<td class="text_details_L">
																			原发起直接参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.orgnlInstdDrctPty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.orgnlMsgId}
																		</td>
																		<td class="text_details_L">
																			原报文类型号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.orgnlMsgTpCd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			附言
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.addtlInf}
																		</td>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.status}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			处理状态
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.prcSts}
																		</td>
																		<td class="text_details_L">
																			处理码
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.prcCd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			拒绝码
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctCd}
																		</td>
																		<td class="text_details_L">
																			拒绝信息
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctInf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			拒绝业务的参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctedPtyId}
																		</td>
																		<td class="text_details_L">
																			处理日期
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.prcDt}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			NPC接收时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.npcRcvDt}
																		</td>
																		<td class="text_details_L">
																			NPC处理时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.npcTrnsmtTm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			轧差日期
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.netgDt}
																		</td>
																		<td class="text_details_L">
																			轧差场次
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.netgRnd}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510741101'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			支付交易组号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.pmtGrpId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.workDt}
																		</td>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.msgId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.creDtTm}
																		</td>
																		<td class="text_details_L">
																			回执报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.recptMsgId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回执报文时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.recptDtTm}
																		</td>
																		<td class="text_details_L">
																			发起参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instgPty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instdPty}
																		</td>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instgDrctPty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instdDrctPty}
																		</td>
																		<td class="text_details_L">
																			止付类型标识
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.grpCxlId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原发起参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.orgnlInstdDrctPty}
																		</td>
																		<td class="text_details_L">
																			原报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.orgnlMsgId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文类型号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.orgnlMsgTpCd}
																		</td>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.status}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			处理状态
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.prcSts}
																		</td>
																		<td class="text_details_L">
																			处理码
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.prcCd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			拒绝码
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctCd}
																		</td>
																		<td class="text_details_L">
																			拒绝信息
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctInf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			拒绝业务的参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctedPtyId}
																		</td>
																		<td class="text_details_L">
																			处理日期
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.prcDt}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510931801'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			支付交易组号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.pmtGrpId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.msgID}
																		</td>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.creDtTm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回执报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.recptMsgId}
																		</td>
																		<td class="text_details_L">
																			回复报文时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.recptDtTm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instgPty}
																		</td>
																		<td class="text_details_L">
																			接收参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instdPty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instgDrctPty}
																		</td>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instdDrctPty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.ornglMsgId}
																		</td>
																		<td class="text_details_L">
																			原报文类型代码
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.ornglMsgTpCd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原发起参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.orgnlInstgPty}
																		</td>
																		<td class="text_details_L">
																			退回类型
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.backTpCd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.status}
																		</td>
																		<td class="text_details_L">
																			附言
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.addtlInf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.workDt}
																		</td>
																		<td class="text_details_L">
																			来往标识
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.direction}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务处理码
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.prcCd}
																		</td>
																		<td class="text_details_L">
																			业务拒绝原因
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctInf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			拒绝业务的参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctedPtyId}
																		</td>
																		<td class="text_details_L">
																			终态日期
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.sttlmDt}
																		</td>
																	</tr>
																</c:when>
																<c:when test="${cnaps2jydm =='1510931901'}">
																	<tr>
																		<td class="text_details_L">
																			序号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.id}
																		</td>
																		<td class="text_details_L">
																			支付交易组号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.pmtGrpId}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.msgID}
																		</td>
																		<td class="text_details_L">
																			报文发送时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.creDtTm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			回执报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.recptMsgId}
																		</td>
																		<td class="text_details_L">
																			回复报文时间
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.recptDtTm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instgPty}
																		</td>
																		<td class="text_details_L">
																			接收参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instdPty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			发起直接参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instgDrctPty}
																		</td>
																		<td class="text_details_L">
																			接收直接参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.instdDrctPty}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原报文标识号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.ornglMsgId}
																		</td>
																		<td class="text_details_L">
																			原报文类型代码
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.ornglMsgTpCd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			原发起参与机构
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.orgnlInstgPty}
																		</td>
																		<td class="text_details_L">
																			退回类型
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.backTpCd}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务状态
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.status}
																		</td>
																		<td class="text_details_L">
																			附言
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.addtlInf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			工作日期
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.workDt}
																		</td>
																		<td class="text_details_L">
																			来往标识
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.direction}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			业务处理码
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.prcCd}
																		</td>
																		<td class="text_details_L">
																			业务拒绝原因
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctInf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_details_L">
																			拒绝业务的参与机构行号
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.rjctedPtyId}
																		</td>
																		<td class="text_details_L">
																			终态日期
																		</td>
																		<td class="text_details_R" style="width: 220;">
																			${po.sttlmDt}
																		</td>
																	</tr>
																</c:when>
															</c:choose>


														</table>

														<br />
													</div>
													<br>
												</td>
											</tr>
										</table>
									</div>
									<br>
								</td>
							</tr>
						</table>
						<br>
					</td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<br>
					</td>

				</tr>
			</table>
		</form>
	</body>
</html>
