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
				
				var billseal = document.getElementById('billseal');
				var billseal1 = document.getElementById('billseal1');
				
				var billtp = document.getElementById('billtp');
				var billtp1 = document.getElementById('billtp1');
				
				var dbtrnm = document.getElementById('dbtrnm');
				var dbtrnm1 = document.getElementById('dbtrnm1');
				
				var dbtracct = document.getElementById('dbtracct');
				var dbtracct1 = document.getElementById('dbtracct1');
				
				
				var endtoendid = document.getElementById('endtoendid');
				var endtoendid1 = document.getElementById('endtoendid1');
				
  			
			  if(VForm.Validate()){
			  	
			  	if(document.getElementById("signerid").value==document.getElementById("username").value){
			  	alert("复核人员不能与录入人员一致!");
			  	return false;
			  	
			  	}
			  	
			  	if(billseal.value!=billseal1.value){
					alert(billseal.title+" ： 录入信息和往帐信息不一致！");
					return false;
					
				}
				
				if(billtp.value!=billtp1.value){
					alert(billtp.title+" ： 录入信息和往帐信息不一致！");
					return false;
				}
				
				if(dbtrnm.value!=dbtrnm1.value){
					alert(dbtrnm.title+" ： 录入信息和往帐信息不一致！");
					return false;
				}
				
				if(dbtracct.value!=dbtracct1.value){
					alert(dbtracct.title+" ： 录入信息和往帐信息不一致！");
					return false;
				}
				
				if(endtoendid.value!=endtoendid1.value){
					alert(endtoendid.title+" ： 录入信息和往帐信息不一致！");
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
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=00">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
			<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
			<input type="hidden" name="pmttp" value="${condition.pmttp }"/>
			<input type="text" name="username" id="username" value="${userentity.username}"/><!-- 登录人 -->
			<input type="text" name="signerid" id="signerid" value="${entity.signerid}"/><!-- 签发人 -->
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
														<td class="text1"  colspan="3">&nbsp;${entity.cdtrbrnchnm}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">业务优先级</td>
														<td class="text1" >&nbsp;
															<c:if test="${entity.sttlmprty eq 'NORM'}">一般</c:if>
															<c:if test="${entity.sttlmprty eq 'HIGH'}">紧急</c:if>
															<c:if test="${entity.sttlmprty eq 'URGT'}">特急</c:if>
														</td>
														     </tr>
			               <tr>
			              <td   class="text_zcx"  align="right"  >网点号</td>
														<td  class="text1"  >&nbsp;${entity.brnchid}</td>
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
																附加域信息
															</div>
														</div>
														<div id="details" name="details" >
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  			
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
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
											  		
											  <table>
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
												</table>
												</fieldset>
											</div>	
										 <div>
										 	<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;bgcolor=E6E6E6"  >
												<legend class="text_zcx">核对信息</legend>
											  	<table >
												<tr>
													<td class="text_zcx" align="right" width="190">汇款金额</td>
													<td width="350"><input type="text" name="amount" value="" id="amount"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; "/>
																			<span name="validate" dataName="amount" dataType="Empty" msg="汇款金额不能为空！" class="STYLE1">*</span>
													<input   type="hidden" name="amount1" value='${entity.amount}' readonly="readonly"/>
													</td>
													
												</tr>
												<tr>
													<td  class="text_zcx" align="right" width="190" >付款人账号</td>
													<td width="350"><input type="text" name="dbtracct" title="付款人账号" id="dbtracct" value=""/>
													<span name="validate" dataName="dbtracct" dataType="Empty" msg="付款人账号不能为空！" class="STYLE1">*</span>
													<input type="hidden" name="dbtracct1" id="dbtracct1" value='${entity.dbtracct}' readonly="readonly"/>
													</td>
												</tr>
												<tr>
													<td class="text_zcx" align="right" width="190">付款人名称</td>
													<td width="350"><input type="text" name="dbtrnm" title="付款人名称" id="dbtrnm" value=""/>
													<span name="validate" dataName="dbtrnm" dataType="Empty" msg="付款人名称不能为空！" class="STYLE1">*</span>
													<input type="hidden" name="dbtrnm1" id="dbtrnm1" value='${entity.dbtrnm}' readonly="readonly"/>
													</td>
												</tr>
												<tr>
													<td class="text_zcx" align="right" width="190" title="汇票种类">汇票种类</td>
													<td width="350">
													<select  name="billtp" id="billtp" >
																		<option value="CT00">
																			可转让汇票
																		</option>
																		<option value="CT01">
																			不可转让汇票
																		</option>
																		<option value="CT02">
																			现金汇票
																		</option>
																	</select>
													<span name="validate" dataName="billtp" dataType="Empty" msg="汇票种类不能为空！" class="STYLE1">*</span>
													<input type="hidden" name="billtp1" id="billtp1" value='${addentity.billtp}' readonly="readonly"/>
													</td>
												</tr>
												<tr>
													<td class="text_zcx" align="right" width="190">汇票密押</td>
													<td width="350"><input type="text" name="billseal" title="汇票密押" id="billseal"/>
													<span name="validate" dataName="billseal" dataType="Empty" msg="汇票密押不能为空！" class="STYLE1">*</span>
													<input type="hidden" name="billseal1" id="billseal1"  value='${addentity.billseal}' readonly="readonly"/>
													</td>
												</tr>
												<tr>
													<td class="text_zcx" align="right" width="190">汇票号码</td>
													<td width="350"><input type="text" name="endtoendid"  title="汇票号码" id="endtoendid" value=""/>
													<span name="validate" dataName="endtoendid" dataType="Empty" msg="汇票号码不能为空！" class="STYLE1">*</span>
													<input type="hidden" name="endtoendid1" id="endtoendid1" value='${entity.endtoendid}' readonly="readonly"/>
													</td>
												</tr>
												
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
