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
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.2.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
	    <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>

<script language="javascript">
		
	//提交时保存收款人信息
	function OnSave() {
		var userMap = {};
		userMap.accountnumber = document.getElementById("cdtracctid").value;
		userMap.accountname = document.getElementById("cdtrnm").value;
		userMap.addr = document.getElementById("cdtraddr").value;
		userMap.issuer =document.getElementById("skhkhhhh").value;
		userMap.issuernm =document.getElementById("skrkhhmc").value;
		userMap.mmbid =document.getElementById("skhqshhh").value;
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
			  return;
		  }else{
			  document.getElementById("cdtracctid").value=obj.accountnumber;
		      document.getElementById("cdtrnm").value=obj.accountname==null?"": obj.accountname;
			  document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr;
			  document.getElementById("skhkhhhh").value=  obj.issuer==null?"": obj.issuer;   
			  document.getElementById("skrkhhmc").value=obj.issuernm==null?"":obj.issuernm;	
			   document.getElementById("cdtrbrchid").value=  obj.issuer==null?"": obj.issuer;   
			  document.getElementById("cdtracctnm").value=obj.issuernm==null?"":obj.issuernm;	
			  document.getElementById("skhqshhh").value=obj.mmbid==null?"":obj.mmbid;		
			   //document.all.bgdiv.style.display="none";
	          // document.all.checkdiv.style.display="none";
		 }
	   	});
	}	
	//查询付款人信息
	function  PubQueryAccount(paymentGroupNum){
			document.getElementById("dbtracctid").value=document.getElementById("fkrzh").value;
			clrAmt();
		   	if(isNull(trim(paymentGroupNum))){
				return;
			}
					var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
					pop.show();
					PubService.QueryAccount(paymentGroupNum,function(obj){
					     pop.close();
						 if(obj==null||obj.acctid==null){
						 	 alert(" 查询信息不存在，未查到相关数据" );
						 	document.getElementById("dbtracctid").value="";//扣款账号
						 	document.getElementById("dbamtnm").value="";//扣款名称
						 	document.getElementById("fkrzh").value="";//付款人账号
						  	 return;
						 }else{
						      document.getElementById("kkhm").value=obj.mm==null?"": obj.mm;//扣款户名
						      /*document.getElementById("dbtrnm").value=obj.mm==null?"": obj.mm;//名称
						      document.getElementById("fkrdz").value=obj.addr==null?"": obj.addr;//地址
						     document.getElementById("sqrlxdh").value=obj.tel==null?"": obj.tel;//联系电话
						      document.getElementById("sgrzjh").value=obj.certid==null?"": obj.certid;//证件号accttp
						      */
						 }
			   	});
				
			}
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("skhhh");
				var recvbkname=document.getElementById("skhmc");
				var recvopnbkno=document.getElementById("skhqshhh");
				var skhkhhhh= document.getElementById("skhkhhhh");
				var skrkhhmc=document.getElementById("skrkhhmc");
				selectkhhBank(url,recvbkno,recvbkname,recvopnbkno,skhkhhhh,skrkhhmc);
			}
			
			function selectLoad(){
				var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
				//var temp1 = document.getElementById('xth').value;
				//transferOfClient(temp1,'ywlxbmval');
			}
			//增加手续费查询
			function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('hkje'),
				 	pmttp:document.getElementById('pmttp'),
				 	transno:'7100',
				    sxf : document.getElementById('sxf'),
				    ydf : document.getElementById('ydf'),
				    ydjs : document.getElementById('ydjs'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('ze'),
				    yxj:document.getElementById('yxj'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs"),
				  	bepsgbf: document.getElementById("bepsgbf"),
				  	hvpsgbf: document.getElementById("hvpsgbf"),
				  	waiven: document.getElementById("waiven")
				  };
				  if(obj.hkje.value==""||obj.hkje.value=="0.00"){
				  	clrAmt();
				  }else{
					calcharge(url,beginamt,endamt,obj);				  
				  }
			}
			
			
			
			function clrAmt(){
				document.getElementById('hkje').value="";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('ze').value="";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
			function clrAmt0(){
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('ze').value=document.getElementById('hkje').value;
			}
			function commitForm(){
				if(VForm.Validate()){
					OnSave();
				var msg = validate();
				var boo = msgSplit(msg);
				if(boo){
				var reg = /(^\s)* | (\s$)* /gi;
				var hkje = document.getElementById('hkje');//汇款金额
				var sxf = document.getElementById('sxf');//手续费
				var ydf = document.getElementById('ydf');//邮电费
				var ydjs = document.getElementById('ydjs');//异地加收
				var gbf = document.getElementById('counterfoil');//工本费
				var ze = document.getElementById('ze');//总额
				var mxhzje = document.getElementById('mxhzje104');//明细汇总金额
				var amts = document.getElementsByName('amt');//国库贷记资金划拨 金额明细
				if(hkje.value.replace(reg, "")=="NaN.undefined"||hkje.value<='0'){
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
				//工本费金额格式转换
				if(gbf.value.replace(reg, "")!=""){
				    var number = gbf.value.replace(reg, "");
				   	gbf.value = number.replace(/[^\d\.-]/g, "");
				}
				//总金额格式转换
				if(ze.value.replace(reg, "")!=""){
				    var number = ze.value.replace(reg, "");
				   	ze.value = number.replace(/[^\d\.-]/g, "");
				}
				//明细汇总金额格式转换
				if(mxhzje.value.replace(reg, "")!=""){
				    var number = mxhzje.value.replace(reg, "");
				   	mxhzje.value = number.replace(/[^\d\.-]/g, "");
				}
				//国库贷记资金划拨金额明细
				for (var i = 0; i < amts.length; i++) {
				    if(amts[i].value.replace(reg, "")!=""){
					    var number = amts[i].value.replace(reg, "");
					   	amts[i].value = number.replace(/[^\d\.-]/g, "");
					}
			    }
				
				if(document.getElementById("ywlxbmval").value=="A110"){
					this.document.getElementById("pcjje110").value=rmoney(document.getElementById("pcjje110").value);
			    document.getElementById("jfjje110").value=rmoney(document.getElementById("jfjje110").value);
			    document.getElementById("ytje110").value=rmoney(document.getElementById("ytje110").value);
			    document.getElementById("zfje110").value=rmoney(document.getElementById("zfje110").value);
			    document.getElementById("dfje110").value=rmoney(document.getElementById("dfje110").value);
			    document.getElementById("pjje201").value=rmoney(document.getElementById("pjje201").value);
				}
			    
			    
				//document.forms[0].submit();
				if(document.getElementById("waiven").checked!=""){
					open3("<%=request.getContextPath()%>");
				}
				else{
					document.forms[0].submit();
				}
				
				}
				}
			}
			function bhhfunction(val){
				if(val=='Y'){
					document.getElementById("sxf").value=""; 
				    document.getElementById("ydf").value="";
				    document.getElementById("ydjs").value="";
					document.getElementById("sxf").readOnly=true;
					document.getElementById("ydf").readOnly=true;
					document.getElementById("ydjs").readOnly=true;
					jisuan();
				}else{
					document.getElementById("sxf").readOnly=false;
					document.getElementById("ydf").readOnly=false;
					document.getElementById("ydjs").readOnly=false;
				}
			}

			function jisuan(){
				var sxf = document.getElementById("sxf").value; 
				var ydf = document.getElementById("ydf").value;
				var ydjs =document.getElementById("ydjs").value;
				var hkje = document.getElementById("hkje").value;  
				var n=0;
				var aa=document.getElementById('ywlxbmval').value;
				
				if(aa=='A104'){
				var amts = document.getElementsByName("amt");
				
				for(i=0;i<amts.length;i++){
				
				   n+=parseFloat(rmoney(amts[i].value));
				}
					document.getElementById("hkje").value=fmoney(n,2);
					document.getElementById("mxhzje104").value=fmoney(n,2);
					document.getElementById("ze").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+n, 2);
				}else{
					document.getElementById("ze").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje)+n, 2);
				}
			}
			
			
			
			
 </script>
	</head>
	<body onload="selectLoad();">
		<form method="post"
			action="<%=path%>/transferOfTransitAction.do?method=sendMessage&signmd=01" name="form1">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="bepsgbf" name="bepsgbf" type="hidden" maxlength="19" />
			<input  id="hvpsgbf" name="hvpsgbf" type="hidden" maxlength="19" />
			<input id="contrperson" name="warrantyId" type="hidden" ><!-- 授权柜员(手续费) -->
			<!-- 	端到端标识号--->
																	<input name="endtoendid" id="dddbsh" type="hidden" value="${entity.paymentno }"
																		title="端到端标识号"  />
																<input name="signpertype"  type="hidden" value="0">
			
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
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">国内现金汇款</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           <div class="table_body">
                                           <div class="table_content">
                                           		 <table >
                                                    
                                                      <tr>
                                                      	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                                      </tr>
																	<tr>
																
																<td class="text_tablehead_b"  >
																	支付交易组号
																</td>
																<td >
																	<input name="paymentno" id="paymentno" type="text"   readonly="readonly" value="${entity.paymentno }"
																		maxlength="19" title="支付交易组号" />
																<span name="validate" dataName="paymentno" dataType="Empty" msg="支付交易组号不能为空！" class="STYLE1">*</span>
																</td>
															
															
																	
																<td class="text_tablehead_b" >
																	优先级
																</td>
																<td>
																	<select  name="sttlmprty" id="yxj" onchange="clrAmt();">
																		<option value="NORM" selected="selected">
																			一般
																		</option>
																		<option value="HIGH" >
																			紧急
																		</option>
																		<option value="URGT">
																			特急
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	业务类型编码
																</td>
																<td>
																	<select name="pmttp" id="ywlxbmval" tabindex="1"
																		onChange="transferOfClient(this.value,'select_input');changehkle(this.value,'hkje');clrAmt();">
																		
                                                                        <option value="A108">
																			现金汇款
																		</option>
																		<option value="A109">
																			委托收款(划回)
																		</option>
																		<option value="A110">
																			托收承付(划回)
																		</option>
																		
																		<option value="A101">
																			公益性资金汇划
																		</option>
																		
																		<option value="A102">
																			国库汇款
																		</option>
																		
																		<option value="A301">
																			缴费业务
																		</option>
																		
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	业务种类编码
																</td>
																<td >
																	<select name="pmtkd" id="select_input" tabindex="2"
																		onchange="isDisplayToInline(this.value);">
																	</select>
																	<span name="validate" dataName="pmtkd" dataType="Empty" msg="业务种类编码不能为空！" class="STYLE1">*</span>
																</td>
															</tr>
												<tr>
															
																
																
															</tr>
															</table>
                                              </div>
                                              
                                                <div class="table_content">
                                                   	<table>
	                                                   
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">付款人信息</span></td>
	                                                      </tr>
	                                                    
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	证件类型
																</td>
																<td>
																	<select   name="certtype" id="zjlx" tabindex="3">
																		<option value="01">
																			身份证
																		</option>
																		<option value="02">
																			军官证
																		</option>
																		<option value="03">
																			学生证
																		</option>
																	<option value="04">
																			营业执照
																		</option>
																		<option value="05">
																			组织机构代码
																		</option>
																	</select>
																	<span name="validate" dataName="certtype" dataType="Empty" msg="证件类型不能为空！" class="STYLE1">*</span>
																
																</td>
															
																<td class="text_tablehead_b" >
																	付款人证件号
																</td>
																<td ><!--  onblur="checkIdCardNo(this.value,'sgrzjh')"-->
																	<input name="appcertno" id="sgrzjh" type="text" size="19" onblur="checkIdCardNo(this.value,'sgrzjh')"
																		maxlength="32" title="付款人证件号" tabindex="4" />
																		<span name="validate" dataName="appcertno" dataType="Empty" msg="付款人证件号不能为空！" class="STYLE1">*</span>
																</td>
															</tr>
																<tr>
																<td class="text_tablehead_b" >
																	付款人联系电话
																</td>
																<td>
																	<input  name="appphone" id="sqrlxdh" type="text" tabindex="5"
																		 maxlength="15" title="付款人联系电话"/>
																	<span name="validate" dataName="appphone" dataType="Empty" msg="付款人联系电话不能为空！" class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	付款人名称
																</td>
																<td>
																	<input name="dbtrnm" id="fkrmc" type="text" tabindex="6"
																		title="付款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span name="validate" dataName="dbtrnm" dataType="Empty" msg="付款人名称不能为空！" class="STYLE1">*</span>
																</td>
																</tr>
																<tr>
																	<td >
																		 <input type="hidden"  name="proposeracctccy" title="付款人账户币种" id="zhbz" value="CNY">
																	</td>
																</tr>
	                                             
                                                  			<tr>
																<td>
																	<input name="dbtrbrchid" id="fkhhh" type="hidden" readonly="readonly" tabindex="7"
																		 title="付款行行号"  maxlength="12"  value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />
																</td>
																<td>
																	<input name="dbtrbrnchnm" id="fkhmc" type="hidden" title="付款行名称" value="${bankInfo.participantname }"
																		  maxlength="60" tabindex="8"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人地址
																</td>
																<td colspan="3">
																	<input name="dbtraddr" id="fkrdz" class="text_tablehead_b_addr" tabindex="9"
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','fkrdz')"/>
																
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	扣款账号
																</td>
																<td>
																	<input name="dbtracctid" id="dbtracctid" type="hidden" title="付款人账号" maxlength="32"
																		onKeyPress="actkeyPress()" tabindex="10"/>
																	<input name="dbtramtacctid" id="fkrzh" type="text" onblur="PubQueryAccount(this.value)"
																		 title="扣款账号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span name="validate" dataName="dbtracctid" dataType="Empty" msg="扣款账号不能为空！" class="STYLE1">*</span>
																</td>
																
																<td class="text_tablehead_b" >
																	扣款户名
																</td>
																<td>
																	<input name="dbamtnm" id="kkhm" type="text"
																		title="扣款户名" maxlength="60" tabindex="11"
																		onKeyPress="charPress()" />
																		<span name="validate" dataName="dbamtnm" dataType="Empty" msg="扣款户名不能为空！" class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			<tr>
																<td>
																<!-- 付款行行号 -->
																	<input name="dbtrissr" id="fkrkhhhh" type="hidden" class="text_tablehead_b_c"
																		 title="付款行行号" maxlength="12" value="${bankInfo.bankcode }"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td>
																	<input name="dbtrissrnm" id="fkrkhkmc" type="hidden" title="付款行名称" 
																		  maxlength="60" readonly="readonly" value="${bankInfo.participantname }"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			<tr>
																<td>
																	<input name="dbtrmmbid" id="fkqshhh" type="hidden" readonly="readonly"
																		 title="付款清算行行号" maxlength="12" value="${bankInfo.directbankcode }"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  		</table>
                                                 </div>
                                                  
                                                    <div class="table_content">
                                                   	<table>
	                                                  	
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">收款人信息</span></td>
	                                                      </tr>
                                                  			<tr>
															
																<td class="text_tablehead_b" >
																	收款人账号
																</td>
																<td>
																	<input name="cdtracctid" id="cdtracctid" type="text" tabindex="12"
																		 title="收款人账号" maxlength="32"  onblur="queryBypaymentGroupNum(this.value)"
																		onKeyPress="charPress()" />
																		<span name="validate" dataName="cdtracctid" dataType="Empty" msg="收款人账号不能为空！" class="STYLE1">*</span>
																		
																</td>
															
																<td class="text_tablehead_b" >
																	收款人名称
																</td>
																<td>
																	<input name="cdtrnm" id="cdtrnm" type="text"
																		title="收款人名称" maxlength="60" tabindex="13"
																		onKeyPress="charPress()" />
																		<span name="validate" dataName="cdtrnm" dataType="Empty" msg="收款人名称不能为空！" class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	收款人地址
																</td>
																<td colspan="3">
																	<input type="text" class="text_tablehead_b_addr" name="cdtraddr" id="cdtraddr" tabindex="14"
																		onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'提示：','skrdz')" />
																	
																</td>
															</tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	收款行行号
																</td>
																<td>
																	<input name="cdtrbrchid" id="skhhh" type="text" class="text_tablehead_b_c"
																		 title="收款行行号" maxlength="12"   readonly="readonly"/>
																	<input type="button" class="button"  value="搜索" onclick="selectBankInfo()" >
																	<span name="validate" dataName="cdtrbrchid" dataType="Empty" msg="收款行行号不能为空！" class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	收款行名称
																</td>
																<td>
																	<input name="cdtracctnm" id="skhmc" type="text"
																		style="width: 180px;" title="收款人行名称" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span name="validate" dataName="cdtracctnm" dataType="Empty" msg="收款人行名称不能为空！" class="STYLE1">*</span>
																</td>
															</tr>
															
															<tr>
																<td>
																	<input name="cdtrissr" id="skhkhhhh" type="hidden" class="text_tablehead_b_c"
																		 title="收款行开户行行号" maxlength="12" />
																</td>
																<td>
																	<input name="cdtrissrnm" id="skrkhhmc" type="hidden"  
																		title="收款人开户行名称" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>
																<td>
																	<input name="cdtrmmbid" id="skhqshhh" type="hidden" readonly="readonly"
																		title="收款行清算行行号" maxlength="12" 
																		 onKeyPress="actkeyPress()" />
																</td>
															</tr>
                                                  		</table>
                                                	</div>
                                                	 
                                                   <div class="table_content">
                                                   	<table>
	                                                   
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">金额信息</span></td>
	                                                      </tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	币种代码
																</td>
																<td>
																	<input name="currency" id="bzdm" type="text"
																		 title="币种代码"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" >
																	总额
																</td>
																<td >
																	<input name="allchange" id="ze" type="text" readonly="readonly"
																		 title="总额" maxlength="19"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" >
																		汇款金额
																	</td>
																	<td colspan="4">
																		<input name="ntryamt" id="hkje" type="text"
																			 title="汇款金额" maxlength="19" tabindex="15"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange(this.value);" />
																	<span  class="STYLE1">*</span>
																	</td>
																	
																</tr>
                                                  		</table>
                                                  	</div>
                                                  	 
                                                  	 <div class="table_content">
                                                   	<table>
	                                                  	 
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">计费/渠道信息</span></td>
	                                                      </tr>
	                                                      <tr>	 
																<td class="text_tablehead_b" >
																	收取费用
																</td>
																<td >
																	<input type="radio" class="text_tablehead_b_rad"  name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">收取
																	<input type="radio"  class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">不收取
																</td>
															</tr>
                                                    		<tr>		
																<td class="text_tablehead_b" >
																	手续费
																</td>
																<td>
																	<input name="charge" id="sxf" type="text" readonly="readonly"
																		title="手续费" maxlength="19" />
																</td>
																<td class="text_tablehead_b" >
																	渠道信息
																</td>
																<td>
																	<input name="systemcd" id="xth" type="hidden" title="系统号" maxlength="12" value=""/> 
																	<select   id="xth1"  name="systemcd1" title="系统号" disabled="disabled">
																	<option value="">
																		</option>
																		<option value="HVPS">
																			大额
																		</option>
																		<option value="BEPS">
																			小额
																		</option>
																	</select>
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	邮电费
																</td>
																<td>
																	<input name="postage" id="ydf" type="text" readonly="readonly"
																		title="邮电费" maxlength="19"  />
																</td>
																
																<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs" type="text" readonly="readonly"
																		title="异地加收" maxlength="19" />
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	工本费
																</td>
																<td>
																	<input name="counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="工本费" maxlength="19"  />
																</td>
															</tr>
															
                                                    		</table>
                                                  	</div>
                                                  	 
                                                   	 <div class="table_content">
                                                   	<table>
	                                                  	
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">附言信息</span></td>
	                                                      </tr>
                                                    		<tr>
																<td class="text_tablehead_b" >
																	附言
																</td>
																<td colspan="3">
																	<textarea name="remarkinfo" id="fy" tabindex="16"
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','fy')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                   </div>
                                                    
                                                    <div class="table_content">
                                                   	<table>
	                                                  	 
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">附加域信息</span></td>
	                                                      </tr>
															<!-- 当业务类型编码选择A109(委托收款(划回))，时显示div -->
															<tr id="A1091" style="display: none;">

																<td class="text_tablehead_b" >
																	票据日期
																</td>
																<td>
																	<input name="collectiondate" id="pjrq109" class="Wdate" type="text" 
																		readonly="readonly" title="票据日期" 
																		class="Wdate" onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																
																<td class="text_tablehead_b" >
																	票据种类
																</td>
															
																<td>
																	<select  title="票据种类" id="pjzl109" name="collectiontype" >
																	    <option value="">
																			请选择
																		</option>
																		<option value="01">
																			银行承兑汇票
																		</option>
																		<option value="02">
																			定期存单
																		</option>
																		<option value="03">
																			凭证式国债
																		</option>
																		<option value="04">
																			异地活期存折
																		</option>
																		<option value="99">
																			其他
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr id="A1092" style="display: none;">
																<td class="text_tablehead_b" >
																	票据号码
																</td>
																<td>
																	<input name="collectionno" id="pjhm109" type="text"
																		 title="票据号码" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td colspan="3">&nbsp;</td>
															</tr>


															<!-- 当业务类型编码选择A110(-托收承付（划回）)，显示DIV -->
															<tr id="A1101" style="display: none;">
																<td class="text_tablehead_b" >
																	票据日期
																</td>
																<td>
																	<input id="pjrq110" type="text"  name="honourdate" 
																		class="Wdate" title="票据日期" maxlength="16"
																		onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	票据号码
																</td>
																<td>
																	<input id="pjhm110" type="text"  name="honourno"
																		title="票据号码" maxlength="32" onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A1102" style="display: none;">
																<td class="text_tablehead_b" >
																	赔偿金金额
																</td>
																<td>
																	<input name="damages" id="pcjje110" type="text"
																		 title="赔偿金金额"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" >
																	拒付金金额
																</td>
																<td>
																	<input id="jfjje110" type="text"  name="refusechange"
																		title="拒付金金额" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

															</tr>
															<tr id="A1103" style="display: none;">
																<td class="text_tablehead_b" >
																	原托金额
																</td>
																<td>
																	<input name="orgnlamt" id="ytje110" type="text"
																		 title="原托金额"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" >
																	支付金额
																</td>
																<td>
																	<input id="zfje110" type="text"  name="pmtamt"
																		title="支付金额" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr id="A1104" style="display: none;">
																<td class="text_tablehead_b" >
																	多付金额
																</td>
																<td>
																	<input name="oddamt" id="dfje110" type="text"
																		 title="多付金额"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

															
															</tr>

															<!-- 当业务类型编码选择A201(支票)，业务种类编码选择03401(支票)时显示div -->


															<tr id="A2011" style="display: none;">
																<td class="text_tablehead_b" >
																	票据日期
																</td>
																<td>
																	<input name="chkdate" id="pjrq201" type="text"
																		style="width: 180px;"  title="票据日期"
																		onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	出票人名称
																</td>
																<td>
																	<input name="chknm" id="cprmc201" type="text"
																		title="出票人名称" onKeyPress="actkeyPress()"
																		maxlength="60" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A2012" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	票据金额
																</td>
																<td>
																	<input name="chkamt" id="pjje201" type="text"
																		 title="票据金额"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right">
																	牌价
																</td>
																<td>
																	<input name="chkprice" id="pj201" type="text"
																		title="牌价"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

															</tr>
															<tr id="A2013" style="display: none;">
																<td class="text_tablehead_b" >
																	票据张数
																</td>
																<td>
																	<input name="chkCount" id="pjzs201" type="text"
																		 title="票据张数" maxlength="4" />
															<span  class="STYLE1">*</span>
																</td>
															</tr>


															<!-- 当业务类型业务类型为A301-(缴费业务)，时显示div -->

															<tr id="A3011" style="display: none;">

																<td class="text_tablehead_b">
																	缴费类型
																</td>
																<td>
																	<select name="jftype"  id="jflx301">
																	    <option value="" selected="selected">
																				请选择
																		</option>
																		<option value="TP00" selected="selected">
																			现金
																		</option>
																		<option value="TP01" >
																			同城转账
																		</option>
																		<option value="TP02" >
																			支票
																		</option>
																		<option value="TP03" >
																			异地汇款
																		</option>
																		<option value="TP04" >
																			其他
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	所属期间
																</td>
																<td>
																	<input name="jfdate" id="ssqj301" type="text"
																		 maxlength="16" title="所属期间" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr id="A3012" style="display: none;">
																<td class="text_tablehead_b" >
																	收费单位流水号
																</td>
																<td>
																	<input name="jfmsgid" id="sfdwlsh301" type="text"
																		 title="收费单位流水号"
																		onKeyPress="actkeyPress()" maxlength="20" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b">
																	收费附言
																</td>
																<td>
																	<textarea name="jfremarkinfo" id="sfyy301"  rows="3"
																		 title="收费附言"></textarea>
																</td>
															</tr>


															<!-- 当业务类型 A104-国库资金贷记划拨  显示DIV-->

															<tr id="A1041" style="display: none;">

																<td class="text_tablehead_b" >
																	明细汇总金额
																</td>
																<td>
																	<input name="gkallchange" id="mxhzje104" type="text" 
																		title="明细汇总金额" onKeyPress="amountPress()" readonly="readonly"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" /><span  class="STYLE1">*</span>
																
																
																</td>

																<td class="text_tablehead_b" >
																	上报国库代码
																</td>
																<td>
																	<input name="gksendcode" id="sbgkdm104" type="text"
																		title="上报国库代码" maxlength="10" /><span  class="STYLE1">*</span>
																
																</td>
															</tr>

															<tr id="A1042" style="display: none;">

																<td class="text_tablehead_b">
																	接收国库代码
																</td>
																<td>
																	<input name="gkreceivecode" id="jsgkdm104" type="text" 
																		title="接收国库代码" maxlength="10" /><span  class="STYLE1">*</span>
																
																</td>

																<td class="text_tablehead_b" >
																	报表日期
																</td>
																<td>
																	<input name="gktabledate" id="bbrq104" type="text"  value="${sessionScope.workDate } "
																		 class="Wdate" title="报表日期"
																		onclick="WdatePicker()" /><span  class="STYLE1">*</span>
																
																</td>
															</tr>

															<tr id="A1043" style="display: none;">

																<td class="text_tablehead_b">
																	报表序号
																</td>
																<td>
																	<input name="gktableid" id="bbxh104" type="text" 
																		title="报表序号" onKeyPress="actkeyPress()" maxlength="10" /><span  class="STYLE1">*</span>
																
																</td>

																<td class="text_tablehead_b" >
																	预算级次
																</td>
																<td>
																	<select name="gkbudgetlevel" id="ysjb104" >
																	    <option value="">
																			请选择
																		</option>
																		<option value="BL00">
																			中央
																		</option>
																		<option value="BL01">
																			省级
																		</option>
																	</select><span  class="STYLE1">*</span>
																
																</td>
															</tr>

															<tr id="A1044" style="display: none;">
																<td class="text_tablehead_b" >
																	调整期标志
																</td>
																<td>
																	<select name="gkadjustsign" id="tzqbz104">
																	    <option value="">
																			请选择
																		</option>
																		<option value="ID00">
																			正常
																		</option>
																		<option value="ID01">
																			调整期
																		</option>
																	</select><span  class="STYLE1">*</span>
																
																</td>

																<td class="text_tablehead_b" >
																	预算种类
																</td>
																<td>
																	<select name="gkbudgettype"  id="yszl104">
																	 <option value="">
																			请选择
																		</option>
																		<option value="BT00">
																			预算内
																		</option>
																		<option value="BT01">
																			预算外
																		</option>
																	</select><span  class="STYLE1">*</span>
																
																</td>
															</tr>

															<tr id="A1045" style="display: none;">
																<td class="text_tablehead_b" >
																	明细条数
																</td>
																<td>
																	<input name="gkcount" id="listnum1" type="text"
																		 value="1" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" >
																	明细列表
																</td>
																<td class="text_tablehead_b" >
																	<input type="button" class="button" value="添加" onclick="AddRow();" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>


															<tr id="A1046" style="display: none;">
																<td colspan="4" >
																	<div align="center">
																		<table id="mytable"  cellpadding="0"
																			cellspacing="0"
																			style="text-align: center; vertical-align: top;">

																			<tr id="gr1">
																				<td class="text_tablehead_b" >
																					征收机关大类代码&nbsp;&nbsp;&nbsp;
																				</td>
																				<td class="text_tablehead_b">
																					预算科目代码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																				</td>
																				<td class="text_tablehead_b"  >
																					发生额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																				</td>

																			</tr>
																			<tr>
																			
																				<td>
																					<select name="collcode" >
																					 
																						<option value="1111111111">
																							国税
																						</option>
																						<option value="2222222222">
																							地税
																						</option>
																						<option value="3333333333">
																							海关
																						</option>
																						<option value="4444444444">
																							财政
																						</option>
																						<option value="5555555555">
																							其他
																						</option>
																					</select>
																				</td>
																				

																				<td>
																					<input type="text" name="adjustcode" id="adjustcode" value="" />
																				</td>
																				
																				<td>
																				<input type="text" name="amt" id="amt" value="" 
																				
																						onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />
																				</td>
																				<td>&nbsp;</td>
																			</tr>

																		</table>
																	</div>
																</td>
															</tr>
															<tr id="A0000" style="display: none;">
															
																
															</tr>
															 
															
															
														</table>
                                                    </div>
                                                     
                                                    <div class="table_content">
                                                    	<table>
                                                    	
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="保  存" onclick="commitForm();" />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    			
                                                    				<input name="backButton" style="cursor: pointer" type="reset"
											class="button" value="重  置"  />
											
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
