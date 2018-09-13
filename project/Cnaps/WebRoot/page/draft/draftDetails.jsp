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
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css"
			type="text/css" media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		
		<script type="text/javascript">
			
			function commitForm(){
			  	document.forms[0].submit();
			}
			function selectDet(i){
				var len = document.getElementsByName("details").length;
				for(var j=0;j<len;j++){
					if(j==i){
						 document.getElementsByName("details")[j].style.display="block";
						 document.getElementsByName("tabdetails")[j].style.background="#B3B3B3";
					}else{
						document.getElementsByName("details")[j].style.display="none";
						document.getElementsByName("tabdetails")[j].style.background="#dbdbdb";
					}
				}
				
			}
			
		</script>
	</head>
	<body>
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=02">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<input type="hidden" name="systemcd" value="${po.systemcd }" />
			<input type="hidden" name="pmtgrpid"value="${po.pmtgrpid }" />
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
														<span class="text_blue2"> 业务明细界面 </span>
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
														<table>
															

															<tr>
																<td class="text_zcx">
																	支付交易组号
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.pmtgrpid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	业务类型编码
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${po.pmttp eq 'A108'}">现金汇款</c:if>
																	<c:if test="${po.pmttp eq 'A110'}">托收承付</c:if>
																	<c:if test="${po.pmttp eq 'A109'}">委托收款(划回)</c:if>
																	<c:if test="${po.pmttp eq 'A101'}">公益性资金汇划</c:if>
																	<c:if test="${po.pmttp eq 'A102'}">国库汇款</c:if>
																	<c:if test="${po.pmttp eq 'A104'}">国库资金贷记划拨</c:if>
																	<c:if test="${po.pmttp eq 'A301'}">缴费业务</c:if>
																	<c:if test="${po.pmttp eq 'A201'}">支票</c:if>
																	<c:if test="${po.pmttp eq 'A100'}">普通汇兑</c:if>
																	<c:if test="${po.pmttp eq 'A112'}">外汇清算</c:if>
																	<c:if test="${po.pmttp eq 'A200'}">行间资金汇划</c:if>
																	<c:if test="${po.pmttp eq 'A202'}">银行汇票</c:if>
																	<c:if test="${po.pmttp eq 'A113'}">跨境支付</c:if>

																	<c:if test="${po.pmttp eq 'B100'}">普通借记业务</c:if>
																	<c:if test="${po.pmttp eq 'C102'}">个人储蓄通存业务</c:if>
																	<c:if test="${po.pmttp eq 'D102'}">个人储蓄通兑业务</c:if>
																	<c:if test="${po.pmttp eq 'E100'}">普通定期贷记业务</c:if>
																	<c:if test="${po.pmttp eq 'B308'}">支票截留</c:if>
																	<c:if test="${po.pmttp eq 'B309'}">票据截留</c:if>
																	<c:if test="${po.pmttp eq 'A113'}">跨境支付</c:if>
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	业务种类编码
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${po.pmtkd eq'02102'}">普通汇兑	</c:if>
																	<c:if test="${po.pmtkd eq'02101'}">现金汇款	</c:if>
																	<c:if test="${po.pmtkd eq'02106'}">委托收款（划回）	</c:if>
																	<c:if test="${po.pmtkd eq'02107'}">托收承付（划回）	</c:if>
																	<c:if test="${po.pmtkd eq'03401'}">支票	</c:if>
																	<c:if test="${po.pmtkd eq'02901'}">银行汇票资金移存	</c:if>
																	<c:if test="${po.pmtkd eq'02902'}">银行汇票资金清算	</c:if>
																	<c:if test="${po.pmtkd eq'02903'}">银行汇票资金多余划回	</c:if>
																	<c:if test="${po.pmtkd eq'02904'}">银行汇票资金未用退回	</c:if>
																	<c:if test="${po.pmtkd eq'03404'}">银行承兑汇票	</c:if>
																	<c:if test="${po.pmtkd eq'03403'}">商业承兑汇票	</c:if>
																	<c:if test="${po.pmtkd eq'02104'}">外汇清算	</c:if>
																	<c:if test="${po.pmtkd eq'02112'}">货物贸易结算	</c:if>
																	<c:if test="${po.pmtkd eq'02113'}">货物贸易结算退款	</c:if>
																	<c:if test="${po.pmtkd eq'02114'}">服务贸易结算	</c:if>
																	<c:if test="${po.pmtkd eq'02115'}">服务贸易结算退款	</c:if>
																	<c:if test="${po.pmtkd eq'02116'}">资本项下跨境支付	</c:if>
																	<c:if test="${po.pmtkd eq'02117'}">资本项下跨境支付退款	</c:if>
																	<c:if test="${po.pmtkd eq'02125'}">其他经常项目支出	</c:if>
																	<c:if test="${po.pmtkd eq'02123'}">个人跨境汇款	</c:if>
																	<c:if test="${po.pmtkd eq'02124'}">个人跨境退款	</c:if>
																	<c:if test="${po.pmtkd eq'01300'}">慈善捐款	</c:if>
																	<c:if test="${po.pmtkd eq'09001'}">其他	</c:if>
																	<c:if test="${po.pmtkd eq'02122'}">人行跨区域票据交换轧差净额	</c:if>
																	<c:if test="${po.pmtkd eq'03001'}">国库汇款	</c:if>
																	<c:if test="${po.pmtkd eq'02205'}">国债兑付	</c:if>
																	<c:if test="${po.pmtkd eq'02108'}">退汇	</c:if>
																	<c:if test="${po.pmtkd eq'03101'}">国库同城交换净额清算	</c:if>
																	<c:if test="${po.pmtkd eq'02201'}">中央级预算收入	</c:if>
																	<c:if test="${po.pmtkd eq'02202'}">省级预算收入	</c:if>
																	<c:if test="${po.pmtkd eq'02203'}">地市级预算收入	</c:if>
																	<c:if test="${po.pmtkd eq'02204'}">县级预算收入	</c:if>
																	<c:if test="${po.pmtkd eq'09001'}">其它	</c:if>
																	<c:if test="${po.pmtkd eq'03201'}">支取发行基金	</c:if>
																	<c:if test="${po.pmtkd eq'04101'}">再贷款	</c:if>
																	<c:if test="${po.pmtkd eq'04001'}">再贴现	</c:if>
																	<c:if test="${po.pmtkd eq'02704'}">买断式转贴现	</c:if>
																	<c:if test="${po.pmtkd eq'02705'}">回购式转贴现	</c:if>
																	<c:if test="${po.pmtkd eq'02706'}">回购式转贴现赎回	</c:if>
																	<c:if test="${po.pmtkd eq'02118'}">场内资金拆借	</c:if>
																	<c:if test="${po.pmtkd eq'02119'}">场内资金拆借还款	</c:if>
																	<c:if test="${po.pmtkd eq'02120'}">场外资金拆借	</c:if>
																	<c:if test="${po.pmtkd eq'02121'}">场外资金拆借还款	</c:if>
																	<c:if test="${po.pmtkd eq'02105'}">资金调拨	</c:if>
																	<c:if test="${po.pmtkd eq'02301'}">公开市场交易现券买卖	</c:if>
																	<c:if test="${po.pmtkd eq'02302'}">公开市场交易质押式回购首期	</c:if>
																	<c:if test="${po.pmtkd eq'02303'}">公开市场交易质押式回购到期	</c:if>
																	<c:if test="${po.pmtkd eq'02304'}">公开市场交易买断式回购首期	</c:if>
																	<c:if test="${po.pmtkd eq'02305'}">公开市场交易买断式回购到期	</c:if>
																	<c:if test="${po.pmtkd eq'02401'}">债券市场交易现券买卖	</c:if>
																	<c:if test="${po.pmtkd eq'02402'}">债券市场交易质押式回购首期	</c:if>
																	<c:if test="${po.pmtkd eq'02403'}">债券市场交易质押式回购到期	</c:if>
																	<c:if test="${po.pmtkd eq'02404'}">债券市场交易买断式回购首期	</c:if>
																	<c:if test="${po.pmtkd eq'02405'}">债券市场交易买断式回购到期	</c:if>
																	<c:if test="${po.pmtkd eq'02501'}">债券发行缴款	</c:if>
																	<c:if test="${po.pmtkd eq'02502'}">债券还本付息	</c:if>
																	<c:if test="${po.pmtkd eq'02503'}">债券还本金	</c:if>
																	<c:if test="${po.pmtkd eq'02504'}">债券付息	</c:if>
																	<c:if test="${po.pmtkd eq'02505'}">债券发行手续费	</c:if>
																	<c:if test="${po.pmtkd eq'02506'}">债券兑付手续费	</c:if>
																	<c:if test="${po.pmtkd eq'02507'}">附息式债券兑付手续费	</c:if>
																	<c:if test="${po.pmtkd eq'02601'}">银行卡轧差净额	</c:if>
																	<c:if test="${po.pmtkd eq'02701'}">买断式贴现	</c:if>
																	<c:if test="${po.pmtkd eq'02702'}">回购式贴现	</c:if>
																	<c:if test="${po.pmtkd eq'02703'}">回购式贴现赎回	</c:if>
																	<c:if test="${po.pmtkd eq'02704'}">买断式转贴现	</c:if>
																	<c:if test="${po.pmtkd eq'02705'}">回购式转贴现	</c:if>
																	<c:if test="${po.pmtkd eq'02706'}">回购式转贴现赎回	</c:if>
																	<c:if test="${po.pmtkd eq'02707'}">买断式再贴现	</c:if>
																	<c:if test="${po.pmtkd eq'02713'}">买断式再贴现到期收回	</c:if>
																	<c:if test="${po.pmtkd eq'02708'}">回购式再贴现	</c:if>
																	<c:if test="${po.pmtkd eq'02709'}">回购式再贴现赎回	</c:if>
																	<c:if test="${po.pmtkd eq'02710'}">央行卖出商业汇票	</c:if>
																	<c:if test="${po.pmtkd eq'02711'}">提示付款	</c:if>
																	<c:if test="${po.pmtkd eq'02712'}">逾期提示付款	</c:if>
																	<c:if test="${po.pmtkd eq'09001'}">其它	</c:if>
																	<c:if test="${po.pmtkd eq'02801'}">外汇交易市场询价交易	</c:if>
																	<c:if test="${po.pmtkd eq'02802'}">外汇交易市场竞价交易	</c:if>
																	<c:if test="${po.pmtkd eq'03601'}">资金池结算	</c:if>
																	<c:if test="${po.pmtkd eq'03602'}">日终自动拆借	</c:if>
																	<c:if test="${po.pmtkd eq'03501'}">融资支付	</c:if>
																	<c:if test="${po.pmtkd eq'03502'}">融资扣款	</c:if>
																	<c:if test="${po.pmtkd eq'02602'}">外汇交易轧差净额	</c:if>
																	<c:if test="${po.pmtkd eq'02603'}">证券交易轧差净额	</c:if>
																	<c:if test="${po.pmtkd eq'02604'}">其他系统轧差净额	</c:if>
																	<c:if test="${po.pmtkd eq'01400'}">缴费业务	</c:if>
																	
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	交易状态
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${po.status eq 'PR04' }">已清算</c:if>
																	<c:if test="${po.status eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${po.status eq 'PR08' }">已撤销</c:if>
																	<c:if test="${po.status eq 'PR09' }">已拒绝</c:if>
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
																</td>

															</tr>

															<tr>
																<td class="text_zcx" align="right" width="190">
																	收款行行号
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.cdtrbrnchid}
																</td>
																<td class="text_zcx" align="right" width="190">
																	收款行名称
																</td>
																<td class="text1" colspan="3">
																	${po.cdtrbrnchnm}
																</td>
																<td class="text_zcx" align="right" class="text1"
																			width="190">
																			业务优先级
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;
																			<c:if test="${po.sttlmprty eq 'NORM'}">一般</c:if>
																			<c:if test="${po.sttlmprty eq 'HIGH'}">特急</c:if>
																			<c:if test="${po.sttlmprty eq 'URGT'}">紧急</c:if>
																		</td>
															</tr>
															<tr>
																<td class="text_zcx" >
																	网点号
																</td>
																<td class="text1">
																	&nbsp;${po.brnchid}
																</td>
																<td class="text_zcx" align="right">
																	系统编号
																</td>
																<td class="text1">
																	&nbsp;大额</td>
																<td class="text_zcx" align="right" class="text1">
																	系统日期
																</td>
																<td class="text1">
																	&nbsp;${po.workdt}
																</td>
																<td class="text_zcx" align="right">
																	签发模式
																</td>
																<td class="text1">
																	&nbsp;
																	<c:if test="${po.signmd eq '01'}">现金</c:if>
																	<c:if test="${po.signmd eq '02'}">卡折</c:if>
																	<c:if test="${po.signmd eq '03'}">转账</c:if>
																	<c:if test="${po.signmd eq '04'}">总账</c:if>
																</td>
															</tr>
															<tr>
																<td class="text_zcx" align="right">
																	渠道标识
																</td>
																<td class="text1">
																	&nbsp;
																	<c:if test="${po.chnlrmkid eq '1510'}">柜面</c:if>
																</td>
																<td class="text_zcx" align="right" class="text1">
																	币种代码
																</td>
																<td class="text1">
																	&nbsp;${po.currencycd}
																</td>
																<td class="text_zcx" align="right" class="text1">
																	汇款金额
																</td>
																<td class="text1">
																	&nbsp;
																	<fmt:formatNumber
																		pattern="###,###,###,###,###,###,##0.00"
																		value="${po.amount }" />
																</td>
																<td class="text_zcx" align="right" class="text1">
																	总&nbsp;&nbsp;&nbsp;&nbsp;额
																</td>
																<td class="text1">
																	&nbsp;
																	<fmt:formatNumber
																		pattern="###,###,###,###,###,###,##0.00"
																		value="${po.totalamt }" />
																</td>
															</tr>
															<tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	签发柜员
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.signerid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	签发终端
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.signedtrmlid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	签发日期
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.signeddt}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	签发时间
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.signedtm}
																</td>
															</tr>
															<tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	轧差日期
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.netgdt}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	轧差场次
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.netgrnd}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	清算日期
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.sttlmdt}
																</td>
															</tr>
															
															<tr>
																		
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			附&nbsp;&nbsp;&nbsp;&nbsp;言
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${po.addtlinf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			备&nbsp;&nbsp;&nbsp;&nbsp;注
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${po.ustrd}
																		</td>
																	</tr>
															
															<tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	&nbsp;
																</td>
																<td class="text1" width="150">
																	&nbsp;
																</td>

															</tr>
															
														</table>
<%-- 
														<table>
															<tr>
																<td style="width: 14%;">
																	<input type="button" class="tabdetails" value="付款人信息"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(0)" />
																</td>
																<td style="width: 1%;">
																	|
																</td>

																<td style="width: 14%;">

																	<input type="button" value="收款人信息"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(1)" />

																</td>

																<td style="width: 1%;">
																	|
																</td>
																<td style="width: 14%;">

																	<input type="button" value="收费信息"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(2)" />

																</td>
																<td style="width: 1%;">
																	|
																</td>
																<!-- 
												<td style="width:14%;">
								 
													<c:if test="${po.pmttp eq 'F100'}">
														<input type="button" value="付款人信息"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="viewbykeyfkrxx('${po.id}','${po.pmtgrpid}')"/>
													</c:if>													
													<c:if test="${po.pmttp != 'F100'}">
														<input type="button" value="付款人信息"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(3)"/>
													</c:if>
												
											
											
											</td>
								
											<td style="width:1%;">| -->
																<td style="width: 14%;">
																	<input type="button" value="柜员信息"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(4)" />
																<td style="width: 1%;">
																	|
																</td>

																<td style="width: 14%;">
																	<input type="button" value="附加信息"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(5)" />

																</td>

															</tr>


														</table>
--%>

														<div  style="width: 90%;" align="left">

															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;background: #B3B3B3;"
																onclick="selectDet(0)">
																付款人信息
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(1)">
																收款人信息
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(2)">
																收费信息
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(3)">
																柜员信息
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(4)">
																附加域信息
															</div>

														</div>

														<div id="details" name="details" style="display: block;">
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;">
																<%-- <legend >付款人信息</legend>	--%>
																<table>


																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			申请人证件类型
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<c:if test="${po.proposercerttp eq '01'}">身份证</c:if>
																			<c:if test="${po.proposercerttp eq '02'}">军官证</c:if>
																			<c:if test="${po.proposercerttp eq '03'}">学生证</c:if>
																			<c:if test="${po.proposercerttp eq '04'}">营业执照</c:if>
																			<c:if test="${po.proposercerttp eq '05'}">组织机构代码</c:if>
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			申请人证件号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.proposercertid}
																		</td>
																		
																	</tr>
																	
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			申请人联系电话
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.proposertel}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			申请人客户号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.proposercstmrid}
																		</td>
																	</tr>

																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			申请人账户类型
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<c:if test="${po.proposeraccttp eq 'AT00'}">对公账户</c:if>
																			<c:if test="${po.proposeraccttp eq 'AT01'}">个人贷记卡账户</c:if>
																			<c:if test="${po.proposeraccttp eq 'AT02'}">个人借记卡账户</c:if>
																			<c:if test="${po.proposeraccttp eq 'AT03'}">存在</c:if>
																			<c:if test="${po.proposeraccttp eq 'AT04'}">其他</c:if>
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			申请人账户币种
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.proposeracctccy}
																		</td>
																	</tr>

																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			付款人账号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.dbtracct}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			付款人名称
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.dbtrnm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			付款人地址
																		</td>
																		<td class="text1" width="150" colspan="3">
																			&nbsp;${po.dbtraddr}
																		</td>
																	</tr>

																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			付款人开户行行号
																		</td>
																		<td class="text1">
																			&nbsp;${po.dbtrissuer}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			付款人开户行名称
																		</td>
																		<td class="text1">
																			&nbsp;${po.dbtrissuernm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			付款行行号
																		</td>
																		<td class="text1">
																			&nbsp;${po.dbtrbrnchid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			付款行名称
																		</td>
																		<td class="text1">
																			&nbsp;${po.dbtrbrnchnm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			付款清算行行号
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${po.dbtrmmbid}
																		</td>
																	</tr>


																</table>
															</fieldset>
														</div>



														<div id="details" name="details" style="display: none;">
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>
																<%-- <legend >收款人信息</legend>--%>
																<table>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			收款人账号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtracct}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			收款人名称
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtrnm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			收款人地址
																		</td>
																		<td class="text1" width="150" colspan="3">
																			&nbsp;${po.cdtraddr}
																		</td>

																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			收款人开户行行号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtrissuer}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			收款人开户行名称
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtrissuernm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			收款行行号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;&nbsp;${po.cdtrbrnchid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			收款行名称
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtrbrnchnm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			收款人清算行行号
																		</td>
																		<td class="text1" width="150" colspan="3">
																			&nbsp;${po.cdtrmmbid}
																		</td>
																	</tr>
																</table>
															</fieldset>
														</div>

														<div id="details" name="details" style="display: none;">
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>
																
																<table>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			汇款金额
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.amount }" />
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			总额
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.totalamt }" />
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			手续费
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.servicecharge }" />
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			邮电费
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.postage }" />
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			异地加收
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.outstationcharge }" />
																		</td>
																		<%-- 
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			减免
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<c:if test="${po.waive eq 'Y'}">减免</c:if>
																			<c:if test="${po.waive eq 'N'}">不减免</c:if>
																		</td>
																		--%>
																	</tr>
																</table>
															</fieldset>

														</div>


														
														<div id="details" name="details" style="display: none;">
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>
																
																<table>
																  <tr>
																	<td  class="text_zcx" align="right" class="text1" width="190" >签发柜员</td>
																	<td  class="text1" width="150">&nbsp;${po.signerid}</td>
																	<td    class="text_zcx" align="right" class="text1" width="190">签发终端号</td>
																	<td  class="text1" width="150">&nbsp;${po.signedtrmlid}</td>
																</tr>
																<tr>
																	<td    class="text_zcx" align="right" class="text1" width="190">签发日期</td>
																	<td  class="text1" width="150">&nbsp;${po.signeddt}</td>
																	<td   class="text_zcx"  align="right" class="text1" width="190">签发时间</td>
																	<td  class="text1" width="150">&nbsp;${po.signedtm}</td>
																</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			复核柜员
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.checkerid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			复核终端号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.checkedtrmlid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			复核日期
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.checkeddt}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			复核时间
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.checkedtm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			审核柜员
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.approvalid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			审核终端号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.approvedtrmlid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			审核日期
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.approveddt}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			审核时间
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.approvedtm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			审批柜员
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.authenticateid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			审批终端号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.authenticatedtrmlid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			审批日期
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.authenticateddt}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			审批时间
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.authenticatedtm}
																		</td>
																	</tr>
																	


																</table>
															</fieldset>
														</div>


														<div id="details" name="details" style="display: none">
															
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>
																
																<table>

																<c:choose>

																		<c:when test="${po.pmttp eq 'A202'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					出票日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.issueDt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					汇票种类
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;
																					<c:if test="${addentity.billtp eq 'CT00' }">可转让汇票</c:if>
																					<c:if test="${addentity.billtp eq 'CT01' }">不可转让汇票</c:if>
																					<c:if test="${addentity.billtp eq 'CT02' }">现金汇票</c:if>
																				

																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据号码
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${po.endtoendid}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					汇票密押
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.billseal}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票面收款人名称
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.rcvrnm}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					现金汇兑兑付行
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.cashpaybrnch}
																				<br></td>
																			</tr>
																			

																		</c:when>


																		
																		<c:otherwise>
无附加信息。
																		</c:otherwise>

																	</c:choose>	
																	
																	<c:choose>
																		<c:when test="">
																	
																		</c:when>
																		<c:otherwise>
																	
																		</c:otherwise>
																	</c:choose>

																</table>
															</fieldset>
														</div>
														
</div>
<br />
														<br />
														<br />
</td></tr>
														
										</table>
								</td>
							</tr>
						</table>


					</td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<br>
					</td>

				</tr>
			</table>
	</body>
</html>
