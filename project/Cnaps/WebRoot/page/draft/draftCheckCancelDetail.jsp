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
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
			
			<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	 
	   <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
       <script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>

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
		function save(systemcd){
		if(systemcd == "HVPS"){
		document.forms[0].action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=00";
	
	    
		}else{
		document.forms[0].action="<%=path%>/TransProcessAction.do?method=sendBepsCheckMessage&operway=00";
	
		}
		 commitForm();
		
	}
	function viewbykeyfkrxx(id,pmtgrpid){
		var newurl = "<%=path %>/RegularDebitChildrenAction.do?method=queryList&syspara=fkrxx&id="+id+"&pmtgrpid="+pmtgrpid+"&checkflag=checkflag";
		viewDetails(newurl);
	}
	
	
	
	function ifpass(){
	var val = document.getElementById("yztg").value;
	  if(val=='Y'){
	  $("#backreason").val("");
	  $("#backreason").attr("readonly",true);
	  }else{
	   $("#backreason").attr("readonly",false);
	  }
	}
			
		</script>
	</head>
	<body > 
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=01">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			
			<!--================================================================================-->
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
                						<div  class="text_title"><span class="text_blue2"> 
                						
                							业务取消审核界面
                						
                						</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
														<table >
			           	<tr>
			                	                         <td  class="text_zcx">支付交易组号</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">业务类型编码</td>
														<td  class="text1" width="150">&nbsp;
																<c:if test="${entity.pmttp eq 'A108'}">现金汇款</c:if>
																<c:if test="${entity.pmttp eq 'A110'}">托收承付</c:if>
																<c:if test="${entity.pmttp eq 'A109'}">委托收款(划回)</c:if>
																<c:if test="${entity.pmttp eq 'A101'}">公益性资金汇划</c:if>
																<c:if test="${entity.pmttp eq 'A102'}">国库汇款</c:if>
																<c:if test="${entity.pmttp eq 'A104'}">国库资金贷记划拨</c:if>
																<c:if test="${entity.pmttp eq 'A301'}">缴费业务</c:if>
																<c:if test="${entity.pmttp eq 'A201'}">支票</c:if>
																<c:if test="${entity.pmttp eq 'A100'}">普通汇兑</c:if>
																<c:if test="${entity.pmttp eq 'A112'}">外汇清算</c:if>
																<c:if test="${entity.pmttp eq 'A200'}">行间资金汇划</c:if>
																<c:if test="${entity.pmttp eq 'A202'}">银行汇票</c:if>
																<c:if test="${entity.pmttp eq 'A113'}">跨境支付</c:if>
																
																<c:if test="${entity.pmttp eq 'B100'}">普通借记业务</c:if>
																<c:if test="${entity.pmttp eq 'C102'}">个人储蓄通存业务</c:if>
																<c:if test="${entity.pmttp eq 'D102'}">个人储蓄通兑业务</c:if>
																<c:if test="${entity.pmttp eq 'E100'}">普通定期贷记业务</c:if>
																<c:if test="${entity.pmttp eq 'B308'}">支票截留</c:if>
																<c:if test="${entity.pmttp eq 'B309'}">票据截留</c:if>
																<c:if test="${entity.pmttp eq 'A113'}">跨境支付</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">业务种类编码</td>
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
														
														<td  class="text_zcx" align="right" class="text1" width="190" >交易状态</td>
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
	
	<tr>
			             	<td   class="text_zcx" align="right"  width="190">收款行行号</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_zcx" align="right"  width="190">收款行名称</td>
														<td class="text1"  colspan="5">&nbsp;${entity.cdtrbrnchnm}</td>
														     </tr>
			               <tr>
			              <td   class="text_zcx"  align="right"  >网点号</td>
														<td  class="text1"  >&nbsp;${entity.brnchid}</td>
														<td   class="text_zcx"  align="right" >系统编号</td>
														<td  class="text1"  >&nbsp;
															<c:if test="${entity.systemcd eq 'HVPS'}">大额</c:if>
															<c:if test="${entity.systemcd eq 'BEPS'}">小额</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" >系统工作日</td>
														<td  class="text1" >&nbsp;${entity.workdt}</td>
														<td   class="text_zcx"  align="right"  >签发模式</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.signmd eq '01'}">现金</c:if>
															<c:if test="${entity.signmd eq '02'}">卡折</c:if>
															<c:if test="${entity.signmd eq '03'}">转账</c:if>
															<c:if test="${entity.signmd eq '04'}">总账</c:if>
														</td>
						   </tr>
			              
			               <tr>
			               	 	<td   class="text_zcx"  align="right" >本行户</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.bankcustomer eq 'Y'}">是</c:if>
															<c:if test="${entity.bankcustomer eq 'N'}">否</c:if>
														</td>
														<td   class="text_zcx" align="right" class="text1" >币种代码</td>
														<td class="text1" >&nbsp;${entity.currencycd}</td>
														<td   class="text_zcx"  align="right" class="text1" >汇款金额</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
							              				</td>
														<td   class="text_zcx"  align="right" class="text1" >总额</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
			               </tr>
			                <tr>
			               		<td  class="text_zcx" align="right" class="text1" width="190" >签发柜员</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">签发终端号</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">签发日期</td>
														<td  class="text1" width="150">&nbsp;${entity.signeddt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">签发时间</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
																               </tr>
							
			            
			            <tr>
																		
<table> 




 <tr>
								<td style="width:14%;">
										<input type="button" value="核对信息"   style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"
  onclick="selectDet(0)"/>
								</td>
								<td style="width:1%;">|
								</td>
								
									
										
												<td style="width:14%;">
									
									<input type="button" value="收款人信息"  style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"
  onclick="selectDet(1)"/>
										
									</td>
									
								<td style="width:1%;">|
								</td>
											<td style="width:14%;">											
											
								<input type="button" value="收费信息"   style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"
  onclick="selectDet(2)"/>	
											
											</td>	<td style="width:1%;">|
								</td>
												<td style="width:14%;">
								 
													<c:if test="${entity.pmttp eq 'F100'}">
														<input type="button" value="付款人信息"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="viewbykeyfkrxx('${entity.id}','${entity.pmtgrpid}')"/>
													</c:if>													
													<c:if test="${entity.pmttp != 'F100'}">
														<input type="button" value="付款人信息"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(3)"/>
													</c:if>
												
											
											
											</td>	
											<td style="width:1%;">|
								</td>
											<td style="width:14%;">
									 <input type="button" value="柜员信息" style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(4)"/>
											
													<td style="width:1%;">|</td>
											
											<td style="width:14%;">
									 <input type="button" value="附加信息" style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(5)"/>	
											
											</td>
											</tr>
									 

                      </table>
 
 
 <!-- ================ -->											
		
  
 
     <div id="details" name="details" style="display:block;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;bgcolor="E6E6E6"  >
												
									 	
											  		<legend >核对信息</legend>	
											  	<table >
												<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
												<input type="hidden" name="pmttp" value="${condition.pmttp }"/>
												<input type="hidden" name="username" id="username" value="${userentity.username}"/><!-- 登录人 -->
												<input type="hidden" name="signerid" id="signerid" value="${entity.signerid}"/><!-- 签发人 -->
													<tr>
													<td>
													<input type="hidden" name="passno" value="N" >
													</td>
													
													<td class="text_tablehead_b" align="right" width="190">退回原因:</td>
													<td width="150">
													<textarea id="backreason" name="backreason"  rows="2" cols="30" ></textarea>
													</td>
												</tr>
												
												
												
												</table>
												</fieldset>
											</div>
 
 
 
 
                              
	
	
		                        <div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >收款人信息</legend>
											  	<table >
												<tr>
													<td   class="text_zcx" align="right" class="text1" width="190">收款行行号</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_zcx" align="right" class="text1" width="190">收款行名称</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">收款人开户行行号</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuer}</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">收款人开户行名称</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuernm}</td>
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >收款人账号</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtracct}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">收款人名称</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrnm}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">收款人地址</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtraddr}</td>
													
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">收款人清算行行号</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtrmmbid}</td>
												</tr>
												</table>
												</fieldset>
											</div>
											
												<div id="details"  name="details" style="display: none;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				<legend >收费金额</legend>
										  	<table >
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">汇款金额</td>
													<td  class="text1" width="150">&nbsp;
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
													</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">总额</td>
														<td  class="text1" width="150">&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
											</tr>
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190" >手续费</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.servicecharge }"/>
												</td>
												<td    class="text_zcx" align="right" class="text1" width="190">邮电费</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.postage }"/>
												</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">异地加收</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.outstationcharge }"/>
												</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">减免</td>
												<td  class="text1" width="150">&nbsp;
													<c:if test="${entity.waive eq 'Y'}">减免</c:if>
													<c:if test="${entity.waive eq 'N'}">不减免</c:if>
												</td>
											</tr>
											</table>
											</fieldset>

                                       </div>



											
		<div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				<legend >付款人信息</legend>
										  	<table >
										  	<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">付款人证件号</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercertid}</td>
													
													<td   class="text_zcx"  align="right" class="text1" width="190">付款人证件类型</td>
													<td  class="text1" width="150">&nbsp;
														<c:if test="${entity.proposercerttp eq '01'}">身份证</c:if>
														<c:if test="${entity.proposercerttp eq '02'}">军官证</c:if>
														<c:if test="${entity.proposercerttp eq '03'}">学生证</c:if>
														<c:if test="${entity.proposercerttp eq '04'}">营业执照</c:if>
														<c:if test="${entity.proposercerttp eq '05'}">组织机构代码</c:if>
													</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">付款人证件发行国家</td>
													<td class="text1" width="150" >&nbsp;
														<c:if test="${entity.proposercertissued eq 'CN'}">中华人民共和国</c:if>
													</td>
													
													
												</tr>
												
												<tr>
													<td class="text_zcx"  align="right" class="text1" width="190">付款人联系电话</td>
													<td class="text1" width="150">&nbsp;${entity.proposertel}</td>
												  <td class="text_zcx"  align="right" class="text1" width="190">付款人客户号</td>
													<td class="text1" width="150">&nbsp;${entity.proposercstmrid}</td>
												</tr>
												
												<tr>
													<td class="text_zcx"  align="right" class="text1" width="190">付款人账户类型</td>
													<td class="text1" width="150">&nbsp;
														<c:if test="${entity.proposeraccttp eq 'AT00'}">对公账户</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT01'}">个人贷记卡账户</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT02'}">个人借记卡账户</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT03'}">存在</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT04'}">其他</c:if>
													</td>
														<td class="text_zcx"  align="right" class="text1" width="190">付款人账户币种</td>
													<td class="text1" width="150">&nbsp;${entity.proposeracctccy}</td>
												</tr>
												
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190">付款人账号</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtracct}</td>
												<td    class="text_zcx" align="right" class="text1" width="190">付款人名称</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtrnm}</td>
											</tr>
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190">付款人地址</td>
												<td  class="text1" >&nbsp;${entity.dbtraddr}</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">付款清算行行号</td>
												<td  class="text1" >&nbsp;${entity.dbtrmmbid}</td>
												
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">付款人开户行行号</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">付款人开户行名称</td>
												<td  class="text1">&nbsp;${entity.dbtrissuernm}</td>
											</tr>
											<tr>
												<td   class="text_zcx" align="right" class="text1" width="190">付款行行号</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_zcx" align="right" class="text1" width="190">付款行名称</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
											</tr>
											</table>
											</fieldset>
											</div>	
												<div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
												  				<legend >柜员信息</legend>
												  <table >
													<tr>
														<td  class="text_zcx" align="right" class="text1" width="190" >签发柜员</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">签发终端号</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
													</tr>
													<tr>
														<td    class="text_zcx" align="right" class="text1" width="190">签发日期</td>
														<td  class="text1" width="150">&nbsp;${entity.signeddt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">签发时间</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
													</tr>
													
													
														
														
														
														
														
														
													<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">业务优先级</td>
														<td class="text1" colspan="3">&nbsp;
															<c:if test="${entity.sttlmprty eq 'NORM'}">一般</c:if>
															<c:if test="${entity.sttlmprty eq 'HIGH'}">紧急</c:if>
															<c:if test="${entity.sttlmprty eq 'URGT'}">特急</c:if>
														</td>
													</tr>
													<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">附言</td>
														<td  class="text1"colspan="3">&nbsp;${entity.ustrd}</td>
													</tr>
													
													
													</table>
													</fieldset>
											</div>
											
											<div id="details" name="details" style="display: none">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >附加信息</legend>
											  <table>
												 
												
												
	 	<c:choose>

                 <c:when test="${entity.pmttp eq 'B308'}">
                                <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >出票日期</td>
													<td  class="text1" width="150">&nbsp;${entity.issueDt}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">提示付款日期</td>
													<td  class="text1" width="150">&nbsp;${entity.payDt}</td>
												</tr>
												 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >票据号码</td>
													<td  class="text1" width="150">&nbsp;${entity.notesNo}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">用途</td>
													<td  class="text1" width="150">&nbsp;${entity.purpose}</td>
												</tr>
												 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >背书人数</td>
													<td  class="text1" width="150">&nbsp;${entity.numOfEndrsr}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">背书人名称</td>
													<td  class="text1" width="150">&nbsp;${entity.endrsrNm}</td>
												</tr>
               </c:when>
                 <c:when test="${entity.pmttp eq 'B309'}">
                                                <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >出票日期</td>
													<td  class="text1" width="150">&nbsp;${entity.issueDt}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">提示付款日期</td>
													<td  class="text1" width="150">&nbsp;${entity.payDt}</td>
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >出票金额</td>
													<td  class="text1" width="150">&nbsp;${entity.issueAmt}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">汇票到期日期</td>
													<td  class="text1" width="150">&nbsp;${entity.maturityDt}</td>
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >汇票密押</td>
													<td  class="text1" width="150">&nbsp;${entity.billSeal}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">承兑协议编号</td>
													<td  class="text1" width="150">&nbsp;${entity.accptncagrmntNo}</td>
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >承兑日期</td>
													<td  class="text1" width="150">&nbsp;${entity.accptncDt}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">承兑人</td>
													<td  class="text1" width="150">&nbsp;${entity.accptncNm}</td>
												</tr>
													<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >票据申请人名称</td>
													<td  class="text1" width="150">&nbsp;${entity.applyNm}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">票据申请人账号</td>
													<td  class="text1" width="150">&nbsp;${entity.applyAcct}</td>
												</tr>
													<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >出票人全称</td>
													<td  class="text1" width="150">&nbsp;${entity.drawerNm}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">出票人账号</td>
													<td  class="text1" width="150">&nbsp;${entity.drawerAcct}</td>
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >交易合同号码</td>
													<td  class="text1" width="150">&nbsp;${entity.trnsctnCntrctNo}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">原收款人名称</td>
													<td  class="text1" width="150">&nbsp;${entity.oriCrdtrNm}</td>
												</tr>
											 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >票据号码</td>
													<td  class="text1" width="150">&nbsp;${entity.notesNo}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">用途</td>
													<td  class="text1" width="150">&nbsp;${entity.purpose}</td>
												</tr>
												 
												 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >背书人数</td>
													<td  class="text1" width="150">&nbsp;${entity.numOfEndrsr}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">背书人名称</td>
													<td  class="text1" width="150">&nbsp;${entity.endrsrNm}</td>
												</tr>
												
               </c:when>
               
               
              
               <c:when test="${entity.pmttp eq 'A109'}">
                    <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >票据日期</td>
								<td  class="text1" width="150">&nbsp;${entity.notesdt}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">票据种类</td>
								<td  class="text1" width="150">&nbsp;${entity.notestp}</td>
					</tr>
					
               
               </c:when>
               
               
               <c:when test="${entity.pmttp eq 'A110'}">
                <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >票据日期</td>
								<td  class="text1" width="150">&nbsp;${addentity.notesdt}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">票据号码</td>
								<td  class="text1" width="150">&nbsp;${addentity.notesno}</td>
					</tr>
					
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >赔偿金金额</td>
								<td  class="text1" width="150">&nbsp;${addentity.amndsamt}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">拒付金金额</td>
								<td  class="text1" width="150">&nbsp;${addentity.rjctamt}</td>
					</tr>
					
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >原托金额</td>
								<td  class="text1" width="150">&nbsp;${addentity.orgnlamt}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">支付金额</td>
								<td  class="text1" width="150">&nbsp;${addentity.pmtamt}</td>
					</tr>
					<tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >多付金额</td>
								<td  class="text1" width="150">&nbsp;${addentity.oddamt}</td>
								
					</tr>
               
               </c:when>
               
               
               <c:when test="${entity.pmttp eq 'A201'}">
                <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >票据日期</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">出票人名称</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >票据金额</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">牌价</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >票据张数</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
					</tr>
               
               </c:when>
               
                
               <c:when test="${entity.pmttp eq 'A104'}">
                <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >明细汇总金额</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">上报国库代码</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >接收国库代码</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">报表日期</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >报表序号</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">预算级次</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >调整期标志</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">明细条数</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 
               
               </c:when>
               
               
               
               
                      <c:otherwise> 
                      
                      <!--  
                          				<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >凭证种类</td>
													<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">凭证号</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">凭证密码类型</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherpswdtp}</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">凭证密码</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherpswd}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">凭证签发日期</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherissuedt}</td>
												
												</tr>
												<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">票据种类</td>
														<td  class="text1" width="150">&nbsp;${entity.notestp}</td>
													</tr>
													<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">票据日期</td>
														<td  class="text1" width="150">&nbsp;${entity.notesdt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">票据号码</td>
														<td  class="text1" width="150">&nbsp;${entity.notesno}</td>
													</tr>
													<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">赔偿金金额</td>
														<td  class="text1" width="150">&nbsp;${entity.amndsamt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">拒付金额</td>
														<td  class="text1" width="150">&nbsp;${entity.rjctamt}</td>
													</tr>
													-->

              </c:otherwise>

        </c:choose>

												
								
												</table>
												</fieldset>
											</div>	
										 
 
 
       
                                                     <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                              <td  > 
                                              
										<span class="STYLE1">说明：红色*标注项为必填项 若不通过请注明原因</span>
										 </td>
                                              </tr>                    
                                                   
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td><td class="text_tablehead_b">&nbsp;</td>
                                                    			<td class="text_tablehead_b">&nbsp;</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
			           
	 									</table>
													  
													 <br />
													 
												<br></td>
											</tr>
										</table>
 
							
						</table>
					<br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	
				</tr>
			</table>
			 

		 	</body>
</html>
