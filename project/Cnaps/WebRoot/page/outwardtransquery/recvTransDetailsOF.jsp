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
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

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
			
		</script>
	</head>
	<body>
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=02">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<input type="hidden" name="systemcd" value="${entity.systemcd }" />
			<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }" />

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
																<td class="text_zcx" align="right" class="text1">明细标识号</td>
																<td class="text1" width="150">&nbsp;${entity.msgid}</td>
																<td class="text_zcx">
																	支付交易序号
																</td>

																<td class="text1" width="150">
																	&nbsp;${entity.txid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	业务类型编码
																</td>
																<td class="text1" width="150">
																	&nbsp;
														<c:if test="${entity.pmttp eq 'A100'}">普通汇兑	</c:if>
												<c:if test="${entity.pmttp eq 'A108'}">现金汇款	</c:if>
												<c:if test="${entity.pmttp eq 'A109'}">委托收款（划回）	</c:if>
												<c:if test="${entity.pmttp eq 'A110'}">托收承付（划回）	</c:if>
												<c:if test="${entity.pmttp eq 'A201'}">支票	</c:if>
												<c:if test="${entity.pmttp eq 'A202'}">银行汇票	</c:if>
												<c:if test="${entity.pmttp eq 'A111'}">商业汇票	</c:if>
												<c:if test="${entity.pmttp eq 'A112'}">外汇清算	</c:if>
												<c:if test="${entity.pmttp eq 'A113'}">跨境支付	</c:if>
												<c:if test="${entity.pmttp eq 'A101'}">公益性资金汇划	</c:if>
												<c:if test="${entity.pmttp eq 'A114'}">人行跨区域票据交换轧差净额	</c:if>
												<c:if test="${entity.pmttp eq 'A102'}">国库汇款	</c:if>
												<c:if test="${entity.pmttp eq 'A307'}">国库资金国债兑付贷记划拨	</c:if>
												<c:if test="${entity.pmttp eq 'A105'}">退汇	</c:if>
												<c:if test="${entity.pmttp eq 'A103'}">国库同城交换净额清算	</c:if>
												<c:if test="${entity.pmttp eq 'A104'}">国库资金贷记划拨	</c:if>
												<c:if test="${entity.pmttp eq 'A106'}">支取发行基金	</c:if>
												<c:if test="${entity.pmttp eq 'A115'}">再贷款	</c:if>
												<c:if test="${entity.pmttp eq 'A116'}">再贴现	</c:if>
												<c:if test="${entity.pmttp eq 'A117'}">票据转贴现	</c:if>
												<c:if test="${entity.pmttp eq 'A200'}">行间资金汇划	</c:if>
												<c:if test="${entity.pmttp eq 'G101'}">公开市场交易结算	</c:if>
												<c:if test="${entity.pmttp eq 'G102'}">债券市场交易结算	</c:if>
												<c:if test="${entity.pmttp eq 'G103'}">债券发行、兑付及收益划拨	</c:if>
												<c:if test="${entity.pmttp eq 'G104'}">银行卡轧差净额	</c:if>
												<c:if test="${entity.pmttp eq 'G105'}">电子商业汇票资金清算	</c:if>
												<c:if test="${entity.pmttp eq 'G106'}">外汇交易市场结算	</c:if>
												<c:if test="${entity.pmttp eq 'G107'}">资金池结算	</c:if>
												<c:if test="${entity.pmttp eq 'G108'}">日终自动拆借	</c:if>
												<c:if test="${entity.pmttp eq 'G109'}">质押融资	</c:if>
												<c:if test="${entity.pmttp eq 'H010'}">外汇交易轧差净额	</c:if>
												<c:if test="${entity.pmttp eq 'H011'}">证券交易轧差净额	</c:if>
												<c:if test="${entity.pmttp eq 'H012'}">其他系统轧差净额	</c:if>
												               
												<c:if test="${entity.pmttp eq 'A102'}"> 国库汇款	                       </c:if>                 
												<c:if test="${entity.pmttp eq 'A307'}"> 国库资金国债兑付贷记划拨	       </c:if>                 
												<c:if test="${entity.pmttp eq 'A301'}"> 缴费	                           </c:if>                 
												<c:if test="${entity.pmttp eq 'A400'}"> 其他（普通贷记业务）	           </c:if>                 
												<c:if test="${entity.pmttp eq 'C100'}"> 普通实时贷记业务	               </c:if>                 
												<c:if test="${entity.pmttp eq 'C101'}"> 实时代付	                       </c:if>                 
												<c:if test="${entity.pmttp eq 'C102'}"> 个人储蓄通存业务	               </c:if>                 
												<c:if test="${entity.pmttp eq 'C210'}"> 薪金报酬	                       </c:if>                 
												<c:if test="${entity.pmttp eq 'E100'}"> 普通定期贷记业务     	           </c:if>                 
												<c:if test="${entity.pmttp eq 'E101'}"> 定期代付     	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'B100'}"> 普通借记业务	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'B104'}"> 国库资金借记划拨业务	           </c:if>                 
												<c:if test="${entity.pmttp eq 'B309'}"> 小额支付系统通用票据截留业务	   </c:if>                 
												<c:if test="${entity.pmttp eq 'B308'}"> 小额支付系统支票截留业务	       </c:if>                 
												<c:if test="${entity.pmttp eq 'D102'}"> 个人储蓄通兑	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'D100'}"> 普通实时借记业务	               </c:if>                 
												<c:if test="${entity.pmttp eq 'D200'}"> 实时代收	                       </c:if>                 
												<c:if test="${entity.pmttp eq 'D203'}"> 实时通用票据截留业务	           </c:if>                 
												<c:if test="${entity.pmttp eq 'F100'}"> 普通定期借记	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'E102'}"> 定期代收     	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'A308'}"> CIS支票业务回执	                 </c:if>                 
												<c:if test="${entity.pmttp eq 'A309'}"> CIS通用票据业务回执	             </c:if>    
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	业务种类编码
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${entity.pmtkd eq'02102'}">普通汇兑	</c:if>
																	<c:if test="${entity.pmtkd eq'02101'}">现金汇款	</c:if>
																	<c:if test="${entity.pmtkd eq'02106'}">委托收款（划回）	</c:if>
																	<c:if test="${entity.pmtkd eq'02107'}">托收承付（划回）	</c:if>
																	<c:if test="${entity.pmtkd eq'03401'}">支票	</c:if>
																	<c:if test="${entity.pmtkd eq'02901'}">银行汇票资金移存	</c:if>
																	<c:if test="${entity.pmtkd eq'02902'}">银行汇票资金清算	</c:if>
																	<c:if test="${entity.pmtkd eq'02903'}">银行汇票资金多余划回	</c:if>
																	<c:if test="${entity.pmtkd eq'02904'}">银行汇票资金未用退回	</c:if>
																	<c:if test="${entity.pmtkd eq'03404'}">银行承兑汇票	</c:if>
																	<c:if test="${entity.pmtkd eq'03403'}">商业承兑汇票	</c:if>
																	<c:if test="${entity.pmtkd eq'02104'}">外汇清算	</c:if>
																	<c:if test="${entity.pmtkd eq'02112'}">货物贸易结算	</c:if>
																	<c:if test="${entity.pmtkd eq'02113'}">货物贸易结算退款	</c:if>
																	<c:if test="${entity.pmtkd eq'02114'}">服务贸易结算	</c:if>
																	<c:if test="${entity.pmtkd eq'02115'}">服务贸易结算退款	</c:if>
																	<c:if test="${entity.pmtkd eq'02116'}">资本项下跨境支付	</c:if>
																	<c:if test="${entity.pmtkd eq'02117'}">资本项下跨境支付退款	</c:if>
																	<c:if test="${entity.pmtkd eq'02125'}">其他经常项目支出	</c:if>
																	<c:if test="${entity.pmtkd eq'02123'}">个人跨境汇款	</c:if>
																	<c:if test="${entity.pmtkd eq'02124'}">个人跨境退款	</c:if>
																	<c:if test="${entity.pmtkd eq'01300'}">慈善捐款	</c:if>
																	<c:if test="${entity.pmtkd eq'09001'}">其他	</c:if>
																	<c:if test="${entity.pmtkd eq'02122'}">人行跨区域票据交换轧差净额	</c:if>
																	<c:if test="${entity.pmtkd eq'03001'}">国库汇款	</c:if>
																	<c:if test="${entity.pmtkd eq'02205'}">国债兑付	</c:if>
																	<c:if test="${entity.pmtkd eq'02108'}">退汇	</c:if>
																	<c:if test="${entity.pmtkd eq'03101'}">国库同城交换净额清算	</c:if>
																	<c:if test="${entity.pmtkd eq'02201'}">中央级预算收入	</c:if>
																	<c:if test="${entity.pmtkd eq'02202'}">省级预算收入	</c:if>
																	<c:if test="${entity.pmtkd eq'02203'}">地市级预算收入	</c:if>
																	<c:if test="${entity.pmtkd eq'02204'}">县级预算收入	</c:if>
																	<c:if test="${entity.pmtkd eq'03201'}">支取发行基金	</c:if>
																	<c:if test="${entity.pmtkd eq'04101'}">再贷款	</c:if>
																	<c:if test="${entity.pmtkd eq'04001'}">再贴现	</c:if>
																	<c:if test="${entity.pmtkd eq'02704'}">买断式转贴现	</c:if>
																	<c:if test="${entity.pmtkd eq'02705'}">回购式转贴现	</c:if>
																	<c:if test="${entity.pmtkd eq'02706'}">回购式转贴现赎回	</c:if>
																	<c:if test="${entity.pmtkd eq'02118'}">场内资金拆借	</c:if>
																	<c:if test="${entity.pmtkd eq'02119'}">场内资金拆借还款	</c:if>
																	<c:if test="${entity.pmtkd eq'02120'}">场外资金拆借	</c:if>
																	<c:if test="${entity.pmtkd eq'02121'}">场外资金拆借还款	</c:if>
																	<c:if test="${entity.pmtkd eq'02105'}">资金调拨	</c:if>
																	<c:if test="${entity.pmtkd eq'02301'}">公开市场交易现券买卖	</c:if>
																	<c:if test="${entity.pmtkd eq'02302'}">公开市场交易质押式回购首期	</c:if>
																	<c:if test="${entity.pmtkd eq'02303'}">公开市场交易质押式回购到期	</c:if>
																	<c:if test="${entity.pmtkd eq'02304'}">公开市场交易买断式回购首期	</c:if>
																	<c:if test="${entity.pmtkd eq'02305'}">公开市场交易买断式回购到期	</c:if>
																	<c:if test="${entity.pmtkd eq'02401'}">债券市场交易现券买卖	</c:if>
																	<c:if test="${entity.pmtkd eq'02402'}">债券市场交易质押式回购首期	</c:if>
																	<c:if test="${entity.pmtkd eq'02403'}">债券市场交易质押式回购到期	</c:if>
																	<c:if test="${entity.pmtkd eq'02404'}">债券市场交易买断式回购首期	</c:if>
																	<c:if test="${entity.pmtkd eq'02405'}">债券市场交易买断式回购到期	</c:if>
																	<c:if test="${entity.pmtkd eq'02501'}">债券发行缴款	</c:if>
																	<c:if test="${entity.pmtkd eq'02502'}">债券还本付息	</c:if>
																	<c:if test="${entity.pmtkd eq'02503'}">债券还本金	</c:if>
																	<c:if test="${entity.pmtkd eq'02504'}">债券付息	</c:if>
																	<c:if test="${entity.pmtkd eq'02505'}">债券发行手续费	</c:if>
																	<c:if test="${entity.pmtkd eq'02506'}">债券兑付手续费	</c:if>
																	<c:if test="${entity.pmtkd eq'02507'}">附息式债券兑付手续费	</c:if>
																	<c:if test="${entity.pmtkd eq'02601'}">银行卡轧差净额	</c:if>
																	<c:if test="${entity.pmtkd eq'02701'}">买断式贴现	</c:if>
																	<c:if test="${entity.pmtkd eq'02702'}">回购式贴现	</c:if>
																	<c:if test="${entity.pmtkd eq'02703'}">回购式贴现赎回	</c:if>
																	<c:if test="${entity.pmtkd eq'02704'}">买断式转贴现	</c:if>
																	<c:if test="${entity.pmtkd eq'02705'}">回购式转贴现	</c:if>
																	<c:if test="${entity.pmtkd eq'02706'}">回购式转贴现赎回	</c:if>
																	<c:if test="${entity.pmtkd eq'02707'}">买断式再贴现	</c:if>
																	<c:if test="${entity.pmtkd eq'02713'}">买断式再贴现到期收回	</c:if>
																	<c:if test="${entity.pmtkd eq'02708'}">回购式再贴现	</c:if>
																	<c:if test="${entity.pmtkd eq'02709'}">回购式再贴现赎回	</c:if>
																	<c:if test="${entity.pmtkd eq'02710'}">央行卖出商业汇票	</c:if>
																	<c:if test="${entity.pmtkd eq'02711'}">提示付款	</c:if>
																	<c:if test="${entity.pmtkd eq'02712'}">逾期提示付款	</c:if>
																	<c:if test="${entity.pmtkd eq'02801'}">外汇交易市场询价交易	</c:if>
																	<c:if test="${entity.pmtkd eq'02802'}">外汇交易市场竞价交易	</c:if>
																	<c:if test="${entity.pmtkd eq'03601'}">资金池结算	</c:if>
																	<c:if test="${entity.pmtkd eq'03602'}">日终自动拆借	</c:if>
																	<c:if test="${entity.pmtkd eq'03501'}">融资支付	</c:if>
																	<c:if test="${entity.pmtkd eq'03502'}">融资扣款	</c:if>
																	<c:if test="${entity.pmtkd eq'02602'}">外汇交易轧差净额	</c:if>
																	<c:if test="${entity.pmtkd eq'02603'}">证券交易轧差净额	</c:if>
																	<c:if test="${entity.pmtkd eq'02604'}">其他系统轧差净额	</c:if>

																</td>
																</tr><tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	交易状态
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${entity.status eq 'PR04' }">已清算</c:if>
																	<c:if test="${entity.status eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${entity.status eq 'PR08' }">已撤销</c:if>
																	<c:if test="${entity.status eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${entity.status eq 'PR21' }">已止付</c:if>
																	<c:if test="${entity.status eq 'PR22' }">已冲正</c:if>
																	<c:if test="${entity.status eq 'PR32' }">已超期</c:if>
																	<c:if test="${entity.status eq 'PR05' }">已成功</c:if>
																	<c:if test="${entity.status eq 'PR98' }">待确认    </c:if>
																	<c:if test="${entity.status eq 'PR90' }">新建      </c:if>
																	<c:if test="${entity.status eq 'PR81' }">待复核    </c:if>
																	<c:if test="${entity.status eq 'PR82' }">待审核    </c:if>
																	<c:if test="${entity.status eq 'PR83' }">待审批    </c:if>
																	<c:if test="${entity.status eq 'PR95' }">待组包    </c:if>
																	<c:if test="${entity.status eq 'PR96' }">待发送    </c:if>
																	<c:if test="${entity.status eq 'PR97' }">已发送    </c:if>
																	<c:if test="${entity.status eq 'PR11' }">已轧差排队</c:if>
																	<c:if test="${entity.status eq 'PR12' }">已清算排队</c:if>
																	<c:if test="${entity.status eq 'PR99' }">故障</c:if>
																	<c:if test="${entity.status eq 'PR03' }">已轧差</c:if>
																	<c:if test="${entity.status eq 'PR89' }">待回执 </c:if>
																	<c:if test="${entity.status eq 'PR88' }">已回执</c:if>
																</td>

																<td class="text_zcx" align="right" width="190">
																	收款行行号
																</td>
																<td class="text1" width="150">
																	&nbsp;&nbsp;${entity.cdtrbrnchid}
																</td>
																<td class="text_zcx" align="right" width="190">
																	收款行名称
																</td>
																<td class="text1">
																	&nbsp;${entity.cdtrbrnchnm}ee
																</td>


																<td class="text_zcx" align="right" class="text1">
																	系统工作日
																</td>
																<td class="text1">
																	&nbsp;${entity.workdt}
																</td>
																</tr><tr>
																<td class="text_zcx" align="right" class="text1">
																	汇款金额
																</td>
																<td class="text1">
																	&nbsp;
																	<fmt:formatNumber
																		pattern="###,###,###,###,###,###,##0.00"
																		value="${entity.amount }" />
																</td>
																
																
																<td class="text_zcx" align="right" class="text1">
																	币种代码
																</td>
																<td class="text1">
																	&nbsp;${entity.currencycd}
																</td>
																<td></td><td></td>
																</tr>
														</table>


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
																					付款人账号
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.dbtracct}
																				</td>
																				
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					付款人名称
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.dbtrnm}
																				</td>
																		</tr><tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					付款人地址
																				</td>
																				<td class="text1" >
																					&nbsp;${entity.dbtraddr}
																				</td>

																			
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					付款人开户行行号
																				</td>
																				<td class="text1">
																					&nbsp;${entity.dbtrissuer}
																				</td>
																				</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					付款人开户行名称
																				</td>
																				<td class="text1">
																					&nbsp;${entity.dbtrissuernm}
																				</td>
																			
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					付款行行号
																				</td>
																				<td class="text1">
																					&nbsp;${entity.dbtrbrnchid}
																				</td>
																				</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					付款行名称
																				</td>
																				<td class="text1">
																					&nbsp;${entity.dbtrbrnchnm}
																				</td>
																			
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					付款清算行行号
																				</td>
																				<td class="text1" colspan="3">
																					&nbsp;${entity.dbtrmmbid}
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
																					收款行行号
																				</td>
																				<td class="text1" width="150">
																					&nbsp;&nbsp;${entity.cdtrbrnchid}
																				</td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					收款行名称
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtrbrnchnm}
																				</td>
																			</tr>
<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					收款人开户行行号
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtrissuer}
																				</td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					收款人开户行名称
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtrissuernm}
																				</td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					收款人账号
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtracct}
																				</td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					收款人名称
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtrnm}
																				</td>
																			</tr>
<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					收款人地址
																				</td>
																				<td class="text1" width="150" >
																					&nbsp;${entity.cdtraddr}
																				</td>

																			
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					收款人清算行行号
																				</td>
																				<td class="text1" width="150" >
																					&nbsp;${entity.cdtrmmbid}
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

																		<c:when test="${entity.pmttp eq 'B308'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					出票日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.issueDt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					提示付款日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.payDt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据号码
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.notesNo}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					用途
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.purpose}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					背书人数
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.numOfEndrsr}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					背书人名称
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.endrsrNm}
																				<br></td>
																			</tr>
																		</c:when>
																		<c:when test="${entity.pmttp eq 'B309'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					出票日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.issueDt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					提示付款日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.payDt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					出票金额
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.issueAmt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					汇票到期日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.maturityDt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					汇票密押
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.billSeal}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					承兑协议编号
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.accptncagrmntNo}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					承兑日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.accptncDt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					承兑人
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.accptncNm}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据申请人名称
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.applyNm}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据申请人账号
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.applyAcct}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					出票人全称
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.drawerNm}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					出票人账号
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.drawerAcct}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					交易合同号码
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.trnsctnCntrctNo}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					原收款人名称
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.oriCrdtrNm}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据号码
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.notesNo}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					用途
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.purpose}
																				<br></td>
																			</tr>

																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					背书人数
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.numOfEndrsr}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					背书人名称
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.endrsrNm}
																				<br></td>
																			</tr>

																		</c:when>



																		<c:when test="${entity.pmttp eq 'A109'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesdt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据种类
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;
																					<c:if test="${addentity.notestp eq '01' }">银行承兑汇票</c:if>
																					<c:if test="${addentity.notestp eq '02' }">定期存单</c:if>
																					<c:if test="${addentity.notestp eq '03' }">凭证式国债</c:if>
																					<c:if test="${addentity.notestp eq '04' }">异地活期存折</c:if>
																					<c:if test="${addentity.notestp eq '99' }">其他</c:if>

																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据号码
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesno}
																				<br></td>
																			</tr>


																		</c:when>


																		<c:when test="${entity.pmttp eq 'A110'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesdt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据号码
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesno}
																				<br></td>
																			</tr>
																			

																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					赔偿金金额
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.amndsamt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					拒付金金额
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.rjctamt}
																				<br></td>
																			</tr>

																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					原托金额
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.orgnlamt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					支付金额
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.pmtamt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					多付金额
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.oddamt}
																				<br></td>

																			</tr>

																		</c:when>


																		<c:when test="${entity.pmttp eq 'A201'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					出票人名称
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据金额
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					牌价
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					票据张数
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																			</tr>

																		</c:when>


																		<c:when test="${entity.pmttp eq 'A104'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					明细汇总金额
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					上报国库代码
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					接收国库代码
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					报表日期
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					报表序号
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					预算级次
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					调整期标志
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					明细条数
																				<br></td>
																				<td class="text1" width="150">3 ${entity.voucherno} 
																				<br></td>
																			</tr>


																		</c:when>
																		
																		<c:when test="${entity.pmttp eq 'A301'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					缴费类型
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;
																					<c:if test="${addentity.pymnttp eq 'TP00' }">现金</c:if>
																					
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					所属期间
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.term}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					收费单位流水号
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.flownum}
																				<br></td>
																				
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					收费附言
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.chrgrmrk}
																				<br></td>
																				
																			</tr>
																			
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
