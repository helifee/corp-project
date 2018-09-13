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
		 <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
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
			var reg = /(^\s)* | (\s$)* /gi;
				var amount = document.getElementById('amount');//汇款金额
				var amount1 = document.getElementById('amount1');//输入金额
				
				if(amount1.value.replace(reg, "")=="NaN.undefined"){
					alert("交易金额不能为空！");
					amount1.value = "";
					return false;
				}
				
				var amount1value;
				var amountvalue;
				//汇款金额格式转换
				if(amount1.value.replace(reg, "")!=""){
				    var number = amount1.value.replace(reg, "");
				   	amount1value = number.replace(/[^\d\.-]/g, "");
				}
				//汇款金额格式转换
				if(amount.value.replace(reg, "")!=""){
				    var number = amount1.value.replace(reg, "");
				   	amountvalue = number.replace(/[^\d\.-]/g, "");
				}

  			
			  if(VForm.Validate()){
			  	  if(amount1value!=amountvalue){
				  		alert("汇款金额与原业务金额不一致");
				  		return false;
				  }
				  if(document.getElementById("pmttp").value=='E100'||document.getElementById("pmttp").value=='C210'
				  	||document.getElementById("pmttp").value=='A101'){//定期贷记业务
				  	
				  	if(document.getElementById("dbtracct").value!=document.getElementById("dbtracct1").value){
				  		alert("付款人账号与原业务付款人账号不一致");
				  		return false;
				  	}
				  	if(document.getElementById("nboftxs").value!=document.getElementById("nboftxs1").value){
				  		alert("录入总笔数与原业务录入总笔数不一致");
				  		return false;
				  	}
				  }else{
				  	if(document.getElementById('cdtrbrnchid').value!=document.getElementById("cdtrbrnchid1").value){
				  		alert("收款行行号与原业务款行行号不一致");
				  		return false;
				  	}
				  	if(document.getElementById("cdtracct").value!=document.getElementById("cdtracct1").value){
				  		alert("收款人账号与原业务收款人账号不一致");
				  		return false;
				  	}
				  }
			  	
			  	
			  	if(document.getElementById("signerid").value==document.getElementById("username").value){
			  	alert("复核人员不能与录入人员一致!");
			  	return false;
			  	
			  	}
			  	document.forms[0].submit();
			  }
				
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
		viewDetailsByHeightWidth(newurl,'',300,'90%');
	}
	function viewbykeyskrxx(id,pmtgrpid){
	 
		var newurl = "<%=path %>/transfer/RegularCreditChildrenAction.do?method=queryDetail4Check&id="+id;
		viewDetailsByHeightWidth(newurl,'',300,'90%');	
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
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=00">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<input type="hidden" name="pmttp" id="pmttp" value="${entity.pmttp}" />
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
                						
                							业务复核界面 
                						
                						</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/>
														<table >
			           	<tr>
			                	                         <td  class="text_zcx">支付交易组号</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">业务类型</td>
														<td  class="text1" width="150">&nbsp;
																<!-- 普通贷记 -->
																<c:if test="${entity.pmttp eq 'A100'}">普通汇兑</c:if>
																<c:if test="${entity.pmttp eq 'A108'}">现金汇款</c:if>
																<c:if test="${entity.pmttp eq 'A110'}">托收承付</c:if>
																<c:if test="${entity.pmttp eq 'A109'}">委托收款(划回)</c:if>
																<c:if test="${entity.pmttp eq 'A101'}">公益性资金汇划</c:if>
																<c:if test="${entity.pmttp eq 'A102'}">国库汇款</c:if>
																<c:if test="${entity.pmttp eq 'A104'}">国库资金贷记划拨</c:if>
																<c:if test="${entity.pmttp eq 'A106'}">支取发行基金</c:if>
																<c:if test="${entity.pmttp eq 'A200'}">行间资金汇划</c:if>
																<c:if test="${entity.pmttp eq 'A307'}">国库资金国债兑付贷记划拨</c:if>
																<c:if test="${entity.pmttp eq 'A301'}">缴费业务</c:if>
																<c:if test="${entity.pmttp eq 'A201'}">支票</c:if>
																<c:if test="${entity.pmttp eq 'A113'}">跨境支付</c:if>
																<c:if test="${entity.pmttp eq 'A112'}">外汇清算</c:if>
																<c:if test="${entity.pmttp eq 'A202'}">银行汇票</c:if>
																<!-- 普通借记 -->
																<c:if test="${entity.pmttp eq 'B100'}">普通借记</c:if>
																<c:if test="${entity.pmttp eq 'B308'}">支票截留</c:if>
																<c:if test="${entity.pmttp eq 'B309'}">票据截留</c:if>
																<!-- 实时借贷记 -->
																<c:if test="${entity.pmttp eq 'C102'}">个人储蓄通存</c:if>
																<c:if test="${entity.pmttp eq 'D102'}">个人储蓄通兑</c:if>
																<!--定期借贷记 -->
																<c:if test="${entity.pmttp eq 'E100'}">定期贷记</c:if>
																<c:if test="${entity.pmttp eq 'C210'}">薪金报酬</c:if>
																<c:if test="${entity.pmttp eq 'A101'}">公益性资金汇划</c:if>
																<c:if test="${entity.pmttp eq 'F100'}">定期借记业务</c:if>
																<c:if test="${entity.pmttp eq 'E102'}">定期代收</c:if>
																<c:if test="${entity.pmttp eq 'A309'}">CIS通用票据业务回执</c:if>
																<c:if test="${entity.pmttp eq 'A308'}">CIS支票业务回执</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">业务种类</td>
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
<c:if test="${entity.pmtkd eq'02601'}">买断式贴现	</c:if>
<c:if test="${entity.pmtkd eq'02701'}">买断式贴现	</c:if>
<c:if test="${entity.pmtkd eq'02702'}">回购式贴现	</c:if>
<c:if test="${entity.pmtkd eq'02703'}">回购式贴现赎回	</c:if>
<c:if test="${entity.pmtkd eq'02705'}">回购式转贴现	</c:if>
<c:if test="${entity.pmtkd eq'02713'}">买断式再贴现到期收回	</c:if>
<c:if test="${entity.pmtkd eq'02709'}">回购式再贴现赎回	</c:if>
<c:if test="${entity.pmtkd eq'02710'}">央行卖出商业汇票	</c:if>
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
<c:if test="${entity.pmtkd eq'01400'}">缴费业务	</c:if>
<c:if test="${entity.pmtkd eq'05301'}">CIS支票业务回执	</c:if>
<c:if test="${entity.pmtkd eq'05302'}">CIS通用票据业务回执	</c:if>
<c:if test="${entity.pmtkd  eq '00100'}">电费</c:if>
																	<c:if test="${entity.pmtkd  eq '00200'}">水暖费</c:if>
																	<c:if test="${entity.pmtkd  eq '00300'}">煤气费</c:if>
																	<c:if test="${entity.pmtkd  eq '00400'}">电话费</c:if>
																	<c:if test="${entity.pmtkd  eq '00500'}">通讯费</c:if>
																	<c:if test="${entity.pmtkd  eq '00600'}">保险费</c:if>
																	<c:if test="${entity.pmtkd  eq '00700'}">房屋管理费</c:if>
																	<c:if test="${entity.pmtkd  eq '00800'}">代理服务费</c:if>
																	<c:if test="${entity.pmtkd  eq '00900'}">学教费</c:if>
																	<c:if test="${entity.pmtkd  eq '01000'}">企业管理费用</c:if>
																	<c:if test="${entity.pmtkd  eq '01100'}">代理服务费</c:if>
																	<c:if test="${entity.pmtkd  eq '01200'}">薪金报酬</c:if>
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
														<td class="text1"  colspan="3">&nbsp;${entity.cdtrbrnchnm}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">业务优先级</td>
														<td class="text1" >&nbsp;
															<c:if test="${entity.sttlmprty eq 'NORM'}">一般</c:if>
															<c:if test="${entity.sttlmprty eq 'HIGH'}">紧急</c:if>
															<c:if test="${entity.sttlmprty eq 'URGT'}">特急</c:if>
														</td>
														     </tr>
			               <tr>
			              <td   class="text_zcx"  align="right"  >机构代码</td>
																<td class="text1">
																	&nbsp;${entity.orgCode}
																</td>
														<td   class="text_zcx"  align="right" >系统编号</td>
														<td  class="text1"  >&nbsp;
															<c:if test="${entity.systemcd eq 'HVPS'}">大额</c:if>
															<c:if test="${entity.systemcd eq 'BEPS'}">小额</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" >系统日期</td>
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
			               <%-- 
			               	 	<td   class="text_zcx"  align="right" >本行户</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.bankcustomer eq 'Y'}">是</c:if>
															<c:if test="${entity.bankcustomer eq 'N'}">否</c:if>
														</td>
														--%>
														<td   class="text_zcx" align="right" class="text1" >币种代码</td>
														<td class="text1" >&nbsp;${entity.currencycd}</td>
														<td   class="text_zcx"  align="right" class="text1" >汇款金额</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
							              				</td>
														<td   class="text_zcx"  align="right" class="text1" >总&nbsp;&nbsp;&nbsp;&nbsp;额</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
			               </tr>
			                <tr>
			               		<td  class="text_zcx" align="right" class="text1" width="190" >签发柜员</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">签发终端</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">签发日期</td>
														<td  class="text1" width="150">&nbsp;${entity.signeddt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">签发时间</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
																               </tr>
							
													<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			附&nbsp;&nbsp;&nbsp;&nbsp;言
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${entity.addtlinf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			备&nbsp;&nbsp;&nbsp;&nbsp;注
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${entity.ustrd}
																		</td>
																	</tr>
			            
			         
																               </table>
								
											         
 <!-- ================ -->											
		<div  style="width: 90%;" align="left">

															<c:if test="${entity.pmttp eq 'F100'}">
																<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="viewbykeyfkrxx('${entity.id}','${entity.pmtgrpid}')">
																	付款人信息
																</div>
															</c:if>													
															<c:if test="${entity.pmttp != 'F100'}">
																<div class="tabdetails" id="tabdetails"
																	style="float: left; cursor: hand;background: #B3B3B3;"
																	onclick="selectDet(0)">
																	付款人信息
																</div>
															</c:if>
															<c:if test="${entity.pmttp eq 'E100'}">
																<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="viewbykeyskrxx('${entity.id}','${entity.pmtgrpid}')">
																	收款人信息
																</div>
															</c:if>													
															<c:if test="${entity.pmttp != 'E100'}">
																<div class="tabdetails" id="tabdetails"
																	style="float: left; cursor: hand;"
																	onclick="selectDet(1)">
																收款人信息
																</div>
															</c:if>
															
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(2)">
																收费信息
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(3)">
																附加域信息
															</div>
														</div>
														<div id="details" name="details" >
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;">
										  			
										  	<table >
										  	<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">申请人证件类型</td>
													<td  class="text1" width="150">&nbsp;
														<c:if test="${entity.proposercerttp eq '01'}">身份证</c:if>
														<c:if test="${entity.proposercerttp eq '02'}">军官证</c:if>
														<c:if test="${entity.proposercerttp eq '03'}">学生证</c:if>
														<c:if test="${entity.proposercerttp eq '04'}">营业执照</c:if>
														<c:if test="${entity.proposercerttp eq '05'}">组织机构代码</c:if>
													</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">申请人证件号</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercertid}</td>
													
													
												</tr>
												<tr>
													<td class="text_zcx"  align="right" class="text1" width="190">申请人联系电话</td>
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
												<td  class="text1" colspan="3">&nbsp;${entity.dbtraddr}</td>
											</tr>
											<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			扣款人账号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.dbtracct}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			扣款人名称
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.dbtrnm}
																		</td>
																	</tr>
											<tr>
												<td   class="text_zcx" align="right" class="text1" width="190">付款行行号</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_zcx" align="right" class="text1" width="190">付款行名称</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">付款人开户行行号</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">付款人开户行名称</td>
												<td  class="text1">&nbsp;${entity.dbtrissuernm}</td>
											</tr>
											<tr>
											<td   class="text_zcx"  align="right" class="text1" width="190">付款清算行行号</td>
												<td  class="text1" >&nbsp;${entity.dbtrmmbid}</td>
											</tr>
											</table>
											</fieldset>
											</div>	
														
		                        <div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				
											  	<table >
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
													<td   class="text_zcx"  align="right" class="text1" width="190">收款清算行行号</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtrmmbid}</td>
												</tr>
												</table>
												</fieldset>
											</div>
											
												<div id="details"  name="details" style="display: none;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				
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
												<td   class="text_zcx"  align="right" class="text1" width="190">工本费</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.outstationcharge }"/>
												</td>
												<%-- 
												<td   class="text_zcx"  align="right" class="text1" width="190">减免</td>
												<td  class="text1" width="150">&nbsp;
													<c:if test="${entity.waive eq 'Y'}">减免</c:if>
													<c:if test="${entity.waive eq 'N'}">不减免</c:if>
												</td>
												--%>
											</tr>
											
											</table>
											</fieldset>

                                       </div>
											<div id="details" name="details" style="display: none">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;"  >
											  		
											  <table>
	 	<c:choose>

                 <c:when test="${entity.pmttp eq 'B308'}">
                                <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >出票日期</td>
													<td  class="text1" width="150">&nbsp;${addentity.issueDt}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">提示付款日期</td>
													<td  class="text1" width="150">&nbsp;${addentity.payDt}</td>
												</tr>
												 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >票据号码</td>
													<td  class="text1" width="150">&nbsp;${addentity.notesnum}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">用途</td>
													<td  class="text1" width="150">&nbsp;${addentity.purpose}</td>
												</tr>
												 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >背书人数</td>
													<td  class="text1" width="150">&nbsp;${addentity.numOfEndrsr}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">背书人名称</td>
													<td  class="text1" width="150">&nbsp;${addentity.endrsrNm}</td>
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
													<td  class="text1" width="150">&nbsp;
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.issueAmt }"/>
													</td>
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
														               <c:when test="${entity.pmttp eq 'A200'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					拆借利率
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.interBkLnRt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					拆借期限
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.interBkLmt}
																				<br></td>
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
								<td  class="text1" width="150">&nbsp;
									<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addentity.amndsamt }"/>
								</td>
								<td    class="text_zcx" align="right" class="text1" width="190">拒付金金额</td>
								<td  class="text1" width="150">&nbsp;
									<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addentity.rjctamt }"/>
								</td>
					</tr>
					
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >原托金额</td>
								<td  class="text1" width="150">&nbsp;
									<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addentity.orgnlamt }"/>
								</td>
								<td    class="text_zcx" align="right" class="text1" width="190">支付金额</td>
								<td  class="text1" width="150">&nbsp;
									<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addentity.pmtamt }"/>
								</td>
					</tr>
					<tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >多付金额</td>
								<td  class="text1" width="150">&nbsp;
									<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addentity.oddamt }"/>
								</td>
								
					</tr>
               
               </c:when>
               
               
               <c:when test="${entity.pmttp eq 'A201'}">
                <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >票据日期</td>
								<td  class="text1" width="150">&nbsp;${addentity.notesnum}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">出票人名称</td>
								<td  class="text1" width="150">&nbsp;${addentity.issuernm}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >票据金额</td>
								<td  class="text1" width="150">&nbsp;
								<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.notesamt }"/>
								</td>
								<td    class="text_zcx" align="right" class="text1" width="190">牌价</td>
								<td  class="text1" width="150">&nbsp;${addentity.premium}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >票据张数</td>
								<td  class="text1" width="150">&nbsp;${addentity.notesnum}</td>
					</tr>
               
               </c:when>
               <c:when test="${entity.pmttp eq 'A202'}">
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
																					&nbsp;${entity.endtoendid}
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
               
               
                 <c:when test="${entity.pmttp eq 'A301'}">
                <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >所属期间</td>
								<td  class="text1" width="150">&nbsp;${addentity.term}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">收费单位流水号</td>
								<td  class="text1" width="150">&nbsp;${addentity.flownum}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >收费附言</td>
								<td  class="text1" width="150">&nbsp;${addentity.chrgrmrk}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">缴费类型</td>
								<td  class="text1" width="150">&nbsp;
									<c:if test="${addentity.pymnttp eq 'TP00'}">现金</c:if>
									<c:if test="${addentity.pymnttp eq 'TP01'}">同城转账</c:if>
									<c:if test="${addentity.pymnttp eq 'TP02'}">支票</c:if>
									<c:if test="${addentity.pymnttp eq 'TP03'}">异地汇款</c:if>
									<c:if test="${addentity.pymnttp eq 'TP04'}">其他</c:if>
								</td>
					</tr>
					 <tr>
					</tr>
               
               </c:when>
                
               <c:when test="${entity.pmttp eq 'A104'}">
                <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >明细汇总金额</td>
								<td  class="text1" width="150">&nbsp;
									<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addentity.dtlsmmryamt }"/>
								</td>
								<td    class="text_zcx" align="right" class="text1" width="190">上报国库代码</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtcd}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >接收国库代码</td>
								<td  class="text1" width="150">&nbsp;${addentity.rcvcd}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">报表日期</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtforms}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >报表序号</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtnum}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">预算级次</td>
								<td  class="text1" width="150">&nbsp;
									<c:if test="${addentity.budgetlevel eq 'BL00'}">中央</c:if>
									<c:if test="${addentity.budgetlevel eq 'BL01'}">省级</c:if>
								</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >调整期标志</td>
								<td  class="text1" width="150">&nbsp;
									<c:if test="${addentity.indicator eq 'ID00'}">正常</c:if>
									<c:if test="${addentity.indicator eq 'ID01'}">调整期</c:if>
								</td>
								<td    class="text_zcx" align="right" class="text1" width="190">明细条数</td>
								<td  class="text1" width="150">&nbsp;${addentity.numoftrnsctns}</td>
					</tr>
					<tr>
						<td colspan="4">
							<table>
								<tr>
									<td  class="text_zcx" align="right" class="text1" width="190" >征收机关大类代码</td>
									<td  class="text_zcx" align="right" class="text1" width="190" >预算科目代码</td>
									<td class="text_zcx" align="right" class="text1" width="190">发生额</td>
								</tr>
								<c:forEach items="${TreasuryTransferList}" var="addinfodetails">
								
								<tr>
									
										<td  class="text_zcx" width="190">&nbsp;
										<c:if test="${addinfodetails.typecd eq '1111111111'}">国税</c:if>
										<c:if test="${addinfodetails.typecd eq '2222222222'}">地税</c:if>
										<c:if test="${addinfodetails.typecd eq '3333333333'}">海关</c:if>
										<c:if test="${addinfodetails.typecd eq '4444444444'}">财政</c:if>
										<c:if test="${addinfodetails.typecd eq '5555555555'}">其他</c:if>
										</td>
									
										<td  class="text_zcx" width="190">&nbsp;${addinfodetails.sbjctcd}</td>
								
										<td  class="text_zcx" width="190">&nbsp;
											<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addinfodetails.occrrdamt }"/>
										</td>
								</tr>	
								</c:forEach>
							</table>
						</td>
					</tr>
               </c:when>
              <c:when test="${entity.pmttp eq 'A307'}">
																			 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >明细汇总金额</td>
								<td  class="text1" width="150">&nbsp;
									<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addentity.dtlsmmryamt }"/>
								</td>
								<td    class="text_zcx" align="right" class="text1" width="190">信息流水号</td>
								<td  class="text1" width="150">&nbsp;${addentity.flowno}</td>
								
					</tr>
					 <tr>
								 <td    class="text_zcx" align="right" class="text1" width="190">上报国库代码</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtcd}</td>
								<td  class="text_zcx" align="right" class="text1" width="190" >接收国库代码</td>
								<td  class="text1" width="150">&nbsp;${addentity.rcvcd}</td>
								
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >报表序号</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtnum}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">报表日期</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtforms}</td>
								
					</tr>
					<tr>
						<td    class="text_zcx" align="right" class="text1" width="190">明细条数</td>
								<td  class="text1" width="150">&nbsp;${addentity.numoftrnsctns}</td>
					</tr>
					
					<tr>
						<td colspan="4">
							<table>
								<tr>
									<td  class="text_zcx" align="right" class="text1" width="190" >兑付国债银行大类</td>
									<td  class="text_zcx" align="right" class="text1" width="190" >本金代码</td>
									<td class="text_zcx" align="right" class="text1" width="190">本金金额</td>
									<td class="text_zcx" align="right" class="text1" width="190">利息代码</td>
									<td class="text_zcx" align="right" class="text1" width="190">利息金额</td>
								</tr>
								<c:forEach items="${TreasuryTransferList}" var="addinfodetails">
								
								<tr>
									
										<td  class="text_zcx" width="190">&nbsp;
										<c:if test="${addinfodetails.typecd eq '111111111111'}">人行</c:if>
										<c:if test="${addinfodetails.typecd eq '222222222222'}">工行</c:if>
										<c:if test="${addinfodetails.typecd eq '333333333333'}">农行</c:if>
										<c:if test="${addinfodetails.typecd eq '444444444444'}">中行</c:if>
										<c:if test="${addinfodetails.typecd eq '555555555555'}">建行</c:if>
										<c:if test="${addinfodetails.typecd eq '666666666666'}">交行</c:if>
										<c:if test="${addinfodetails.typecd eq '777777777777'}">其他</c:if>
										</td>
									
										<td  class="text_zcx" width="190">&nbsp;${addinfodetails.cptlcd}</td>
								
										<td  class="text_zcx" width="190">&nbsp;
											<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addinfodetails.cptlamt }"/>
										</td>
										<td  class="text_zcx" width="190">&nbsp;${addinfodetails.accrlcd}</td>
								
										<td  class="text_zcx" width="190">&nbsp;
											<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addinfodetails.accrlamt }"/>
										</td>
								</tr>	
								</c:forEach>
							</table>
						</td>
					</tr>
               </c:when>
               <c:when test="${entity.pmttp eq 'E100'||entity.pmttp eq 'C210'||entity.pmttp eq 'A101'}">
               <tr>
               	<td colspan="4">
               		<table>
               			 <tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">录入总笔数</td>
												<td  class="text1" width="150">&nbsp;${entity.nbOfTxs }
												</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">录入总金额</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.aclmtamt }"/>
												</td>
											</tr>
               		</table>
               	</td>
               </tr>
               </c:when>
               <c:when test="${entity.pmttp eq 'A308'}">
               <tr>
               	<td colspan="4">
               		<table>
												<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">原CIS委托日期</td>
												<td  class="text1" width="150">&nbsp;${entity.ornglciscnsgndt }
												</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">原CIS交易序号</td>
												<td  class="text1" width="150">&nbsp;${entity.ornglcistxid }
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value=""/>
												</td>
											</tr><tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">原CIS票据号码</td>
												<td  class="text1" width="150">&nbsp;${entity.ornglcisnotesno }
												</td>
												<td   class="text_zcx"  align="right" class="text1" width="190"></td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value=""/>
												</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">应答状态</td>
												<td  class="text1" width="150">&nbsp;
												<c:choose>
												<c:when test="${entity.answerStatus eq 'PR02'}">已通过</c:when>
													<c:when test="${entity.answerStatus eq 'PR09'}">已拒绝（退票）</c:when>
												<c:otherwise>${entity.answerStatus}</c:otherwise>
												</c:choose>
												</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">拒绝码</td>
												<td  class="text1" width="150">&nbsp;${entity.resuseNo }
												</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">拒绝信息</td>
												<td  class="text1" width="150">&nbsp;${entity.rjctinf }
												</td>
											</tr>
               		</table>
               	</td>
               </tr>
               </c:when>
               <c:when test="${entity.pmttp eq 'A309'}">
               <tr>
               	<td colspan="4">
               		<table>
               			 <tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">原CIS委托日期</td>
												<td  class="text1" width="150">&nbsp;${po.ornglciscnsgndt }
												</td>
												<td   class="text_zcx"  align="right" clentityass="text1" width="190">原CIS交易序号</td>
												<td  class="text1" width="150">&nbsp;${entity.ornglcistxid }
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value=""/>
												</td>
											</tr><tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">原CIS票据号码</td>
												<td  class="text1" width="150">&nbsp;${entity.ornglcisnotesno }
												</td>
												<td   class="text_zcx"  align="right" class="text1" width="190"></td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value=""/>
												</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">原CIS票据号码</td>
												<td  class="text1" width="150">&nbsp;${entity.ornglcisnotesno }
												</td>
												<td   class="text_zcx"  align="right" class="text1" width="190"></td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value=""/>
												</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">应答状态</td>
												<td  class="text1" width="150">&nbsp;
												<c:choose>
													<c:when test="${entity.answerStatus eq 'PR02'}">已通过</c:when>
													<c:when test="${entity.answerStatus eq 'PR09'}">已拒绝（退票）</c:when>
													<c:otherwise>${entity.answerStatus}</c:otherwise>
												</c:choose>
												</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">拒绝码</td>
												<td  class="text1" width="150">&nbsp;${entity.resuseNo }
												</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">拒绝信息</td>
												<td  class="text1" width="150">&nbsp;${entity.rjctinf }
												</td>
											</tr>
               		</table>
               	</td>
               </tr>
               </c:when>
              
        </c:choose>

												</table>
												</fieldset>
											</div>	
										 <div>
										 	<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;bgcolor="E6E6E6"  >
												<legend class="text_zcx">核对信息</legend>
											  	<table >
												<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
												<input type="hidden" name="pmttp" value="${condition.pmttp }"/>
												<input type="hidden" name="username" id="username" value="${userentity.username}"/><!-- 登录人 -->
												<input type="hidden" name="signerid" id="signerid" value="${entity.signerid}"/><!-- 签发人 -->
												<tr>
													<td class="text_zcx" align="right" width="190">汇款金额</td>
													<td  width="150"><input   type="hidden" name="amount1" value='${entity.amount}' readonly="readonly"/>
													<%-- 
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
													--%>
													</td>
													<td width="350"><input type="text" name="amount" value="" id="amount"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; "/><font color="red">*</font>
													</td>
													
												</tr>
												<c:choose>
													<c:when test="${entity.pmttp eq 'E100'}">
														<tr>
															<td  class="text_zcx" align="right" width="190" >付款人账号</td>
															<td width="150"><input type="hidden" name="dbtracct1" value='${entity.dbtracct}' readonly="readonly"/>
															<%-- 
															 ${entity.cdtracct}
															 --%>
															</td>
															<td width="350"><input type="text" name="dbtracct" value=""/><font color="red">*</font>
															
															</td>
														</tr>
														<tr>
															<td class="text_zcx" align="right" width="190">录入总笔数</td>
															<td width="150"><input type="hidden" name="nboftxs1" value='${entity.nbOfTxs}' readonly="readonly"/>
															<%-- 
															${entity.cdtrbrnchid}
															--%>
															</td>
															<td width="350"><input type="text" name="nboftxs" value=""/><font color="red">*</font>
															</td>
														</tr>
													</c:when>
													<c:otherwise>
														<tr>
															<td  class="text_zcx" align="right" width="190" >收款人账号</td>
															<td width="150"><input type="hidden" name="cdtracct1" value='${entity.cdtracct}' readonly="readonly"/>
															<%-- 
															 ${entity.cdtracct}
															 --%>
															</td>
															<td width="350"><input type="text" name="cdtracct" value=""/><font color="red">*</font>
															
															</td>
														</tr>
														<tr>
															<td class="text_zcx" align="right" width="190">收款行行号</td>
															<td width="150"><input type="hidden" name="cdtrbrnchid1" value='${entity.cdtrbrnchid}' readonly="readonly"/>
															<%-- 
															${entity.cdtrbrnchid}
															--%>
															</td>
															<td width="350"><input type="text" name="cdtrbrnchid" value=""/><font color="red">*</font>
															</td>
														</tr>
													</c:otherwise>
												</c:choose>
												
												
												<tr>
													<td>
													  <input type="hidden" name="passno" value="Y" >
													</td>
												</tr>
												
												</table>
												</fieldset>															               
												
										 </div>
 
 
       
                                                     <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                              <td  > 
                                              
										<span class="STYLE1">说明：红色*标注项为必填项 </span>
										 </td>
                                              </tr>                    
                                                   
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value=" 复 核 " onclick="commitForm();" />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td><td class="text_tablehead_b">&nbsp;</td>
                                                    			<td class="text_tablehead_b">&nbsp;</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
			           								</div>
			           								<br />
													 
												<br>
			           								</td>
			           								</tr>
	 									</table>
													  
													 </td>
											</tr>
										</table>
 
						
					<br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	
				</tr>
			</table>
			 

 

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			 
		 	</body>
</html>
