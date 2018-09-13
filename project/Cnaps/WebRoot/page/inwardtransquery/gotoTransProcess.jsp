<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
			
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script language="javascript">
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
			function viewdetails(opertype,id){
				var newurl = "<%=path %>/RecvTransProcessAction.do?method=gotoProcess&id="+id+"&opertype="+opertype;
				viewDetails(newurl);	
			}
			
		</script>
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					<%-- 
					<td background="<%=path%>/image/content_table_line_L.jpg"></td>
					--%>
					<td ></td>
					<td >
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
                <td colspan="6"><div  class="text_title"><span class="text_blue2">业务来账待处理</span></div></td>
                </tr>
              </table>
										
  												
  												<table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
  												<tr class="text_list" bgcolor="E6E6E6"><td colspan="4" align="left">交易信息</td></tr>
  													<tr class="text_list"   bgcolor="E6E6E6">
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">支付交易序号</td>
														<td  class="text1" width="150">&nbsp;${entity.txid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">业务类型编码</td>
														<td  class="text1" width="150">&nbsp;
																	<c:if test="${entity.pmttp eq 'A108'}">现金汇款</c:if>
																	<c:if test="${entity.pmttp eq 'A110'}">托收承付</c:if>
																	<c:if test="${entity.pmttp eq 'A109'}">委托收款(划回)</c:if>
																	<c:if test="${entity.pmttp eq 'B100'}">普通借记业务</c:if>
																	<c:if test="${entity.pmttp eq 'C102'}">个人储蓄通存业务</c:if>
																	<c:if test="${entity.pmttp eq 'D102'}">个人储蓄通兑业务</c:if>
																	<c:if test="${entity.pmttp eq 'E100'}">普通定期贷记业务</c:if>
																	<c:if test="${entity.pmttp eq 'A113'}">跨境支付</c:if>
														</td>
														</tr><tr class="text_list"   bgcolor="E6E6E6">
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">业务种类编码</td>
														<td  class="text1" width="150">&nbsp;
														
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
																	<c:if test="${entity.pmtkd eq'09001'}">其它	</c:if>
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
																	<c:if test="${entity.pmtkd eq'09001'}">其它	</c:if>
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
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >交易状态</td>
														<td  class="text1" width="150">&nbsp;
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
														
													</tr>
													
													
													<tr class="text_list"   bgcolor="E6E6E6">
														<td   class="text_tablehead_b" align="right" class="text1" width="190">币种代码</td>
														<td class="text1" width="150">&nbsp;${entity.currencycd}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">汇款金额</td>
														<td  class="text1" width="150">&nbsp;${entity.amount}</td>
														
														</tr><tr class="text_list"   bgcolor="E6E6E6">
														
													
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">系统工作日</td>
														<td  class="text1" width="150">&nbsp;${entity.workdt}</td>
														<td></td><td></td>
														
													</tr>
													
												
												
													
  												</table>
											  	<table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
											  	<tr class="text_list" bgcolor="E6E6E6"><td colspan="4" align="left">收款人信息</td></tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td   class="text_tablehead_b" align="right" class="text1" width="190">收款行行号</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">收款行名称</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
												</tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人开户行行号</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuer}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人开户行名称</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuernm}</td>
												</tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >收款人账号</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtracct}</td>
													<td    class="text_tablehead_b" align="right" class="text1" width="190">收款人名称</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrnm}</td>
												</tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人地址</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtraddr}</td>
													
												</tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人清算行行号</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtrmmbid}</td>
												</tr>
												</table>
										  	<table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
												
											
											<tr class="text_tablehead_b" bgcolor="E6E6E6"><td colspan="4" align="left">付款人信息</td></tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td  class="text_tablehead_b"  align="right" class="text1" width="190">付款人账号</td>
												<td  class="text_tablehead_b"  align="right" class="text1" width="190">&nbsp;${entity.dbtracct}</td>
												<td    class="text_tablehead_b"  align="right" class="text1" width="190">付款人名称</td>
												<td  class="text_tablehead_b"  align="right" class="text1" width="190">&nbsp;${entity.dbtrnm}</td>
											</tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td  class="text_tablehead_b" align="right" class="text1" width="190">付款人地址</td>
												<td  class="text1" width="150" colspan="3">&nbsp;${entity.dbtraddr}</td>
												
											</tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">付款人开户行行号</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">付款人开户行名称</td>
												<td  class="text1">&nbsp;${entity.dbtrissuernm}</td>
												
											</tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">付款人清算行行号</td>
												<td  class="text1" colspan="3">&nbsp;${entity.dbtrmmbid}</td>
											</tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td   class="text_tablehead_b" align="right" class="text1" width="190">付款行行号</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">付款行名称</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
											</tr>
											
											</table>
											  
												


										<br />
										
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td ></td>

					<%--
					<td background="<%=path%>/image/content_table_line_R.jpg"></td> --%>
				</tr>
			</table>

		</form>
	</body>
</html>
