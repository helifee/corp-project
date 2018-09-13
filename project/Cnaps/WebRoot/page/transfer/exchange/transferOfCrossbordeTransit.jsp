<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />

		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfTransit.js"></script>

		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>

		<script type="text/javascript">
		
		
		//提交时保存收款人信息
	function OnSave() {
		var userMap = {};
		userMap.accountnumber = document.getElementById("cdtracctid").value;
		userMap.accountname = document.getElementById("cdtrnm").value;
		userMap.addr = document.getElementById("cdtraddr").value;
		userMap.issuer =document.getElementById("skhkhhhh").value;
		userMap.issuernm =document.getElementById("skrkhhmc").value;
		  PubService.saveOthersBankAccountMsg(userMap, function(data){
		  	
		  }); 
	}
	//查询收款人信息
	function queryBypaymentGroupNum(paymentGroupNum){
		if(isNull(trim(paymentGroupNum))){
			return;
		}
		var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
		pop.show();
        PubService.queryOthersBankAccountMsg(paymentGroupNum,function(obj){
		    pop.close();
		  if(obj==null||obj.accountnumber==null){
				  alert(" 查询信息不存在，未查到相关数据" );
				  return;
		  }else{
			  document.getElementById("cdtracctid").value=obj.accountnumber;
		      document.getElementById("cdtrnm").value=obj.accountname==null?"": obj.accountname  ;
			  document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr  ;
			   document.getElementById("skhkhhhh").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("skrkhhmc").value=obj.issuernm==null?"":obj.issuernm ;	
			   //document.all.bgdiv.style.display="none";
	          // document.all.checkdiv.style.display="none";
		 }
	   	});
	}	
	//查询付款人信息
	function  PubQueryAccount(paymentGroupNum){
		   			if(isNull(trim(paymentGroupNum))){
							 return;
					}
					var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
					pop.show();
					PubService.QueryAccount(paymentGroupNum,function(obj){
					     pop.close();
						 if(obj==null||obj.acctid==null){
						 	 alert(" 查询信息不存在，未查到相关数据" );
						  	 return;
						 }else{
							  document.getElementById("kkzh").value=obj.acctid==null?"": obj.acctid;//扣款账号
						      document.getElementById("kkhm").value=obj.mm==null?"": obj.mm;//扣款户名
						      document.getElementById("dbtrnm").value=obj.mm==null?"": obj.mm;//名称
						      document.getElementById("fkrdz").value=obj.addr==null?"": obj.addr;//地址
						      document.getElementById("sqrlxdh").value=obj.tel==null?"": obj.tel;//联系电话
						      document.getElementById("sgrzjh").value=obj.certid==null?"": obj.certid;//证件号
						      document.getElementById("proposercstmrid").value=obj.cstmrid==null?"": obj.cstmrid;//付款人客户号
						      
						 }
			   	});
				
			}
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("skhhh");
				var recvbkname=document.getElementById("skhmc");
				var recvopnbkno=document.getElementById("skhqshhh");
				selectBank(url,recvbkno,recvbkname,recvopnbkno);
			}
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var fkrkhhhh= document.getElementById("fkrkhhhh");
				var fkrkhkmc=document.getElementById("fkrkhkmc");
				selectBank(url,fkrkhhhh,fkrkhkmc,"");
			}
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("skhkhhhh");
				var skrkhhmc=document.getElementById("skrkhhmc");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			function selectLoad(){
				var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
				
				var temp1 = document.getElementById('xth').value;
				transferOfClient(temp1,'ywlxbmval');
			}
			function commitForm(){
			 /* if(VForm.Validate()){
			  
			  }*/
				var msg = validate();
				var reg = /(^\s)* | (\s$)* /gi;
				var hkje = document.getElementById('hkje');//汇款金额
				var sxf = document.getElementById('sxf');//手续费
				var ydf = document.getElementById('ydf');//邮电费
				var ydjs = document.getElementById('ydjs');//异地加收
				var ze = document.getElementById('ze');//总额
				var chrgcdid=document.getElementById("chrgcdid");//费用编码
				if(hkje.value.replace(reg, "")=="NaN.undefined"){
					alert("交易金额不能为空！");
					hkje.value = "";
					return false;
				}
				//汇款金额格式转换
				if(hkje.value.replace(reg, "")!=""){
				    var number = hkje.value.replace(reg, "");
				   	hkje.value = number.replace(/[^\d\.-]/g, "");
				}
				//手续费金额格式转换
				if(sxf.value.replace(reg, "")!=""){
				    var number = sxf.value.replace(reg, "");
				   	sxf.value = number.replace(/[^\d\.-]/g, "");
				}
				//邮电费金额格式转换
				if(ydf.value.replace(reg, "")!=""){
				    var number = ydf.value.replace(reg, "");
				   	ydf.value = number.replace(/[^\d\.-]/g, "");
				}
				//异地加收金额格式转换
				if(ydjs.value.replace(reg, "")!=""){
				    var number = ydjs.value.replace(reg, "");
				   	ydjs.value = number.replace(/[^\d\.-]/g, "");
				}
				//总金额格式转换
				if(ze.value.replace(reg, "")!=""){
				    var number = ze.value.replace(reg, "");
				   	ze.value = number.replace(/[^\d\.-]/g, "");
				}
				
				var boo = msgSplit(msg);
			    if(chrgcdid.value==""){
				   alert("费用编码不能为空！");
				   return;
				}
				if(boo){
				// document.getElementById("hvps11109").value=rmoney(document.getElementById("hvps11109").value) ;
				//document.getElementById("A10051").value=rmoney(document.getElementById("A10051").value) ;
					document.forms[0].submit();
				}
			}

			function fmoney(s, n)//将数字转换成逗号分隔的样式,保留两位小数s:value,n:小数位数      
			{   
			    n = n > 0 && n <= 20 ? n : 2;   
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
			    var l = s.split(".")[0].split("").reverse(),   
			    r = s.split(".")[1];   
			    t = "";   
			    for(i = 0; i < l.length; i ++ )   
			    {   
			    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
			    }   
			    return t.split("").reverse().join("") + "." + r;   
			}   
			//还原金额   
			function rmoney(s)   
			{   
				var str=/\S/;
				if(!str.test(s)){
					return 0;
				}
				 return parseFloat(s.replace(/[^\d\.-]/g, ""));   
			}
			
			function bhhfunction(val){
				if(val=='Y'){
					$("#sxf").val("");
					$("#ydf").val("");
					$("#ydjs").val("");
					$("#sxf").attr("readonly",true);
					$("#ydf").attr("readonly",true);
					$("#ydjs").attr("readonly",true);
					jisuan();
				}else{
					$("#sxf").attr("readonly",false);
					$("#ydf").attr("readonly",false);
					$("#ydjs").attr("readonly",false);
				}
			}

			function jisuan(){
			
				var sxf = $("#sxf").val();
				var ydf = $("#ydf").val();
				var ydjs = $("#ydjs").val();
				var hkje = $("#hkje").val();
				var n=0;
				var aa=document.getElementById('ywlxbmval').value;
				if(aa=='A104'){
				var amts = document.getElementsByName("amt");
				for(i=0;i<amts.length;i++){
				   n+=parseFloat(rmoney(amts[i].value));
				}
				}
				document.getElementById("ze").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje)+n, 2);
				
			}
			
			
			
			//添加条件行
function AddRow()
{
var i = 1,j = 1;     //行号与列号
var oNewRow  ;    //定义插入行对象
var oNewCell1,oNewCell2,oNewCell3,oNewCell4;     //定义插入列对象
var listnum1 = 1;

i = document.getElementById("mytable").rows.length;
oNewRow = document.getElementById("mytable").insertRow(i);
oNewRow.id = j;
listnum1 = parseInt(listnum1)+1;
document.getElementById("listnum1").value = listnum1;
//添加第一列
oNewCell1 = document.getElementById("mytable").rows[i].insertCell(0);
//oNewCell1.style.backgroundColor="#FFFFFF"; 
oNewCell1.style.align="center";
//oNewCell1.style.class="text11";
oNewCell1.innerHTML = "<select name='collcode'><option value='1111111111'>国税</option>"+
				"<option value='2222222222'>地税</option><option value='3333333333'>海关</option>"+
				"<option value='4444444444'>财政</option><option value='5555555555'>其他</option></select>";
//添加第二列
oNewCell2 = document.getElementById("mytable").rows[i].insertCell(1);
oNewCell2.innerHTML = "<input type='text' name='adjustcode' id='adjustcode" + j + "'"+" value=\"\">";
//添加第三列
oNewCell3 = document.getElementById("mytable").rows[i].insertCell(2);
oNewCell3.innerHTML = "<input type='text' name='amt' id='amt" + j + "'"+"  value=\"\"  onKeyPress=\"amountPress()\" onblur=\"value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();\">";

//添加第四列


oNewCell4 = document.getElementById("mytable").rows[i].insertCell(3);
oNewCell4.innerHTML ="<input type='button' class='button' name=Del" + j + " value='删除'"+"onClick='DelCurrentRow(" + j + ");'>";
j++;

}
		</script>
	</head>
	<body onload="selectLoad();">
		<form method="post"
			action="<%=path%>/transferOfTransitAction.do?method=sendMessage&signmd=03">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">



				<tr valign="top">

					<td></td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<br />
										<table width="689" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td>
													<div class="text_title">
														<span class="text_blue2">跨境转账签发</span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="table_body">
														<div class="table_content">
															<table>

																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">基本信息</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		系统号
																	</td>
																	<td>

																		<select id="xth" name="systemcd" title="系统号"
																			onChange="selectsyscode(this.value,'ywlxbmval');">
																			<option value="HVPS">
																				大额
																			</option>
																			<option value="BEPS">
																				小额
																			</option>

																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		优先级
																	</td>
																	<td>
																		<select name="sttlmprty" id="yxj">
																			<option value="NORM">
																				一般
																			</option>
																			<option value="HIGH" selected="selected">
																				紧急
																			</option>
																			<option value="URGT">
																				特急
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>

																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		业务类型编码
																	</td>
																	<td>
																		<select name="pmttp" id="ywlxbmval">
																			<option value="A113">
																				跨境支付
																			</option>

																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		业务种类编码
																	</td>
																	<td>
																		<select name="pmtkd" id="select_input">
																			<option value="02123">
																				个人跨境汇款
																			</option>
																			<option value="02124">
																				个人跨境退款
																			</option>
																			<option value="02112">
																				货物贸易结算
																			</option>
																			<option value="02113">
																				货物贸易结算退款
																			</option>
																			<option value="02114">
																				服务贸易结算
																			</option>
																			<option value="02115">
																				服务贸易结算退款
																			</option>
																			<option value="02116">
																				资本项下跨境支付
																			</option>
																			<option value="02117">
																				资本项下跨境支付退款
																			</option>
																			<option value="02125">
																				其他经常项目支出
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		支付组号
																	</td>
																	<td>
																		<input name="paymentno" id="" type="text"
																			readonly="readonly" value="${entity.paymentno }"
																			maxlength="19" title="支付组号" />

																		<span class="STYLE1">*</span>
																	</td>


																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>

																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">付款人信息</span>
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		证件类型
																	</td>
																	<td>
																		<select name="certtype" id="zjlx">
																			<option value="01">
																				身份证
																			</option>
																			<option value="02">
																				军官证
																			</option>
																			<option value="03">
																				学生证
																			</option>

																		</select>
																		<span class="STYLE1">*</span>
																	</td>

																	<td class="text_tablehead_b">
																		申请人证件号
																	</td>
																	<td>
																		<input name="appcertno" id="sgrzjh" type="text"
																			size="19" maxlength="32" title="申请人证件号" />
																		<span name="validate" dataName="appcertno"
																			dataType="Empty" msg="申请人证件号不能为空！" class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		证件发行国家
																	</td>
																	<td>
																		<select name="certcountry" title="证件发行国家" id="zjfxgj">
																			<option value="CN">
																				CN-中华人民共和国
																			</option>
																		</select>
																		<span class="STYLE1">*</span>

																	</td>

																	<td class="text_tablehead_b">
																		付款人联系电话
																	</td>
																	<td>
																		<input name="appphone" id="sqrlxdh" type="text"
																			maxlength="20" title="付款人联系电话" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>


																<tr>
																	<td class="text_tablehead_b">
																		付款人客户号
																	</td>
																	<td>
																		<input type="text" maxlength="30"
																			name="proposercstmrid" title="付款人客户号" id="sqrkhh">
																		<span class="STYLE1">*</span>

																	</td>

																	<td class="text_tablehead_b">
																		付款人账户类型
																	</td>
																	<td>
																		<select name="proposeraccttp" title="付款1人账户类型"
																			id="sqrzhlx">
																			<option value="AT00">
																				对公账户
																			</option>
																			<option value="AT01">
																				个人贷记卡账户
																			</option>
																			<option value="AT02">
																				个人借记卡账户
																			</option>
																			<option value="AT03">
																				存在
																			</option>
																			<option value="AT04">
																				其他
																			</option>

																		</select>
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		付款人账户币种
																	</td>
																	<td>
																		<input type="text" name="proposeracctccy"
																			title="付款人账户币种" id="zhbz" value="CNY">

																		<span class="STYLE1">*</span>

																	</td>
																</tr>
														
																<tr>
																	<td class="text_tablehead_b">
																		付款行行号
																	</td>
																	<td>
																		<input name="dbtrbrchid" id="fkhhh" type="text"
																			readonly="readonly" title="付款行行号" maxlength="12"
																			value="${bankInfo.bankcode }"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		付款行名称
																	</td>
																	<td>
																		<input name="dbtrbrnchnm" id="fkhmc" type="text"
																			title="付款行名称" value="${bankInfo.participantname }"
																			maxlength="60" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		付款人账号
																	</td>
																	<td>
																		<input name="dbtracctid" id="fkrzh" type="text"  onblur="PubQueryAccount(this.value)"
																			title="付款人账号" maxlength="32"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		付款人名称
																	</td>
																	<td>
																		<input name="dbtrnm" id="fkrmc" type="text"
																			title="付款人名称" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																
																<tr>
                                                  				<td class="text_tablehead_b" >
																	扣款账号
																</td>
																<td>
																	<input name="dbtramtacctid" id="kkzh" type="text" 
																		 title="扣款账号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	扣款户名
																</td>
																<td>
																	<input name="dbamtnm" id="kkhm" type="text"
																		title="扣款户名" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
																<tr>
																	<td class="text_tablehead_b">
																		付款人地址
																	</td>
																	<td colspan="3">
																		<input name="dbtraddr" id="fkrdz"
																			class="text_tablehead_b_addr"
																			onKeyPress="actkeyPress()"
																			onkeyup="limitLength(value,70,'提示：','fkrdz')" />

																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		付款人开户行行号
																	</td>
																	<td>
																		<input name="dbtrissr" id="fkrkhhhh" type="text"
																			class="text_tablehead_b_c" title="付款人开户行行号"
																			maxlength="12" value="" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<input type="button" class="button" value="搜索"
																			onclick="selectBankInfoOfFkk()">

																	</td>
																	<td class="text_tablehead_b">
																		付款人开户行名称
																	</td>
																	<td>

																		<input name="dbtrissrnm" id="fkrkhkmc" type="text"
																			title="付款人开户行名称" maxlength="60" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		付款清算行行号
																	</td>
																	<td>
																		<input name="dbtrmmbid" id="fkqshhh" type="text"
																			readonly="readonly" title="付款清算行行号" maxlength="12"
																			value="${bankInfo.directbankcode }"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
															</table>
														</div>
														<div class="table_content">
															<table>

																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">收款人信息</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		收款行行号
																	</td>
																	<td>
																		<input name="cdtrbrchid" id="skhhh" type="text"
																			class="text_tablehead_b_c" title="收款行行号"
																			maxlength="12" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<input type="button" class="button" value="搜索"
																			onclick="selectBankInfo()">
																		<span class="STYLE1">*</span>
																	</td>

																	<td class="text_tablehead_b">
																		收款行名称
																	</td>
																	<td>
																		<input name="cdtracctnm" id="skhmc" type="text"
																			style="width: 180px;" title="收款人行名称" maxlength="60"
																			readonly="readonly" onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		收款人账号
																	</td>
																	<td>
																		<input name="cdtracctid" id="skrzh" type="text"  onblur="queryBypaymentGroupNum(this.value)"
																			title="收款人账号" maxlength="32" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																	</td>

																	<td class="text_tablehead_b">
																		收款人名称
																	</td>
																	<td>
																		<input name="cdtrnm" id="skrmc" type="text"
																			title="收款人名称" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		收款人地址
																	</td>
																	<td colspan="3">
																		<input type="text" class="text_tablehead_b_addr"
																			name="cdtraddr" id="skrdz" onKeyPress="actkeyPress()"
																			onkeyup="limitLength(value,70,'提示：','skrdz')" />

																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		收款人开户行行号
																	</td>
																	<td>
																		<input name="cdtrissr" id="skhkhhhh" type="text"
																			class="text_tablehead_b_c" title="收款行开户行行号"
																			maxlength="12" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<input type="button" class="button" value="搜索"
																			onclick="selectBankInfoOfSkk()">
																	</td>

																	<td class="text_tablehead_b">
																		收款人开户行名称
																	</td>
																	<td>
																		<input name="cdtrissrnm" id="skrkhhmc" type="text"
																			readonly="readonly" title="收款人开户行名称" maxlength="60"
																			onKeyPress="actkeyPress()" />
																	</td>
																</tr>

																<tr>

																	<td class="text_tablehead_b">
																		收款行清算行行号
																	</td>
																	<td>
																		<input name="cdtrmmbid" id="skhqshhh" type="text"
																			readonly="readonly" title="收款行清算行行号" maxlength="12"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>

																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">金额信息</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		币种代码
																	</td>
																	<td>
																		<input name="currency" id="bzdm" type="text"
																			title="币种代码" value="CNY" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																	</td>
																	<td class="text_tablehead_b">
																		总额
																	</td>
																	<td>
																		<input name="allchange" id="ze" type="text"
																			readonly="readonly" title="总额" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		汇款金额
																	</td>
																	<td colspan="4">
																		<input name="ntryamt" id="hkje" type="text"
																			title="汇款金额" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>

																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">计费信息</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		本行户
																	</td>
																	<td>
																		<select name="selfaccount" id="bhh">
																			<option value="Y">
																				是
																			</option>
																			<option value="N">
																				否
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		减免
																	</td>
																	<td>

																		<input type="radio" class="text_tablehead_b_rad"
																			name="waive" value="N" checked="checked"
																			onclick="bhhfunction(this.value);">
																		不减免
																		<input type="radio" class="text_tablehead_b_rad"
																			name="waive" value="Y"
																			onclick="bhhfunction(this.value);">
																		减免
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		手续费
																	</td>
																	<td>
																		<input name="charge" id="sxf" type="text" title="手续费"
																			maxlength="12" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />

																	</td>
																	<td class="text_tablehead_b">
																		邮电费
																	</td>
																	<td>
																		<input name="postage" id="ydf" type="text" title="邮电费"
																			maxlength="12" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />

																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		异地加收
																	</td>
																	<td colspan="4">
																		<input name="otherchange" id="ydjs" type="text"
																			title="异地加收" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />

																	</td>

																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>

																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">附言信息</span>
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		附言
																	</td>
																	<td colspan="3">
																		<textarea name="remarkinfo" id="fy" rows="2" cols="60"
																			onKeyPress="charPress()"
																			onkeyup="limitLength(value,135,'提示：','fy')"></textarea>
																	</td>

																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>

																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">附加域信息</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		关联业务参考号
																	</td>
																	<td>
																		<input name="endtoendid" id="dddbsh" type="text"
																			maxlength="19" title="端到端标识号" />

																	</td>
																	<td class="text_tablehead_b">
																		关联业务委托日期
																	</td>
																	<td>
																		<input name="accptncdt" type="text"
																			readonly="readonly" title="关联业务委托日期" class="Wdate"
																			onclick="WdatePicker()" />
																	</td>
																</tr>
																
																<tr>
																	<td class="text_tablehead_b">
																		费用编码
																	</td>
																	<td>
																	
																		
																		<select name="chrgcd" title="费用编码"
																			 id="chrgcdid" >
																			 <option value="OUR">发起方付费</option>
																			  <option value="BEN">接收方付费</option>
																			   <option value="SHA">共同承担</option>
																		</select>
																	</td>

																	<td class="text_tablehead_b">
																		发报行收费
																	</td>
																	<td>
																		<input type="text" name="sndbkchrg" title="发报行收费" />
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		收报行收费
																	</td>
																	<td>
																		<input name="rcvbkchrg" type="text" title="收报行收费" />
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		跨境业务附言
																	</td>
																	<td colspan="3">
																		<textarea name="crossbrdrpstaddtlinf" rows="2"
																			cols="60"></textarea>
																	</td>

																</tr>

															</table>
														</div>

														<div class="table_content">
															<table>

																<tr>
																	<td class="text_tablehead_b">
																		&nbsp;
																	</td>
																	<td class="text_tablehead_b">
																		&nbsp;
																	</td>
																	<td>
																		<input name="addButton" type="button"
																			style="cursor: pointer" class="button" value="保  存"
																			onclick="commitForm();" />
																	</td>
																	<td>
																		&nbsp;
																		<%-- 
                                                    				<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="返  回" onclick="history.back();" />
											--%>
																	</td>
																</tr>
															</table>
														</div>
														<div class="table_content" align="center">

															<span class="STYLE1">说明：红色*标注项为必填项</span>

														</div>
													</div>
												</td>
											</tr>
										</table>


									</div>
								</td>
							</tr>
						</table>
					</td>
					<td></td>


				</tr>
			</table>
			<br />
			<br />
			<br />
		</form>
	</body>
</html>
