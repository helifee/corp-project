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
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
        <script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>	
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
  		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
  
		<script language="javascript">
	
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
						 	 document.getElementById("cdtracct").value="";//付款人账号
						 	 document.getElementById("cdtrnm").value="";//付款人名称
						  	 return;
						 }else{
							
						      document.getElementById("cdtrnm").value=obj.mm==null?"": obj.mm;//名称
						      document.getElementById("proposercertid").value=obj.certid==null?"": obj.certid;//证件号
						      document.getElementById("proposercerttp").value=obj.certip==null?"": obj.certip;//证件类型
						       document.getElementById("proposercerttp1").value=obj.certip==null?"": obj.certip;//证件类型
						      document.getElementById("proposercstmrid").value=obj.cstmrid==null?"": obj.cstmrid;//付款人客户号
						      document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr;//地址
						      document.getElementById("proposertel").value=obj.tel==null?"": obj.tel;//联系电话
						       document.getElementById("cdtrissuer").value=obj.bankcode==null?"": obj.bankcode;//付款人开户行行号
						       document.getElementById("cdtrissuernm").value=obj.acctissr==null?"": obj.acctissr;//付款人开户行名称
						     
						      document.getElementById("proposeraccttp").value=obj.accttp==null?"": obj.accttp;//账户类型
						      document.getElementById("proposeraccttp1").value=obj.accttp==null?"": obj.accttp;
						     
						 }
			   	});
				
			}



				function commitForm(){
				 
			   var msg = "@";
			var proposercstmrid = document.getElementById("proposercstmrid");
			var proposercertid = document.getElementById("proposercertid");
			var proposertel = document.getElementById("proposertel");
			var proposeraddr = document.getElementById("proposeraddr");
			var proposernm = document.getElementById("proposernm");
			var proposeracct = document.getElementById("proposeracct");
			var cdtracct = document.getElementById("cdtracct");
			
			var cdtrnm = document.getElementById("cdtrnm");
			var cdtraddr = document.getElementById("cdtraddr");
			var cdtrissuer = document.getElementById("cdtrissuer");
			 if(isNull(trim(proposercstmrid.value))){
					msg += proposercstmrid.title+"不能为空！@";
				    }
			 if(isNull(trim(proposercertid.value))){
					msg += proposercertid.title+"不能为空！@";
				    }
			 if(isNull(trim(proposertel.value))){
					msg += proposertel.title+"不能为空！@";
				    }
			 
			if(isNull(trim(cdtracct.value))){
					msg += cdtracct.title+"不能为空！@";
				    }	 
				if(isNull(trim(cdtrnm.value))){
					msg += cdtrnm.title+"不能为空！@";
				    }    
				   if(isNull(trim(cdtraddr.value))){
					msg += cdtraddr.title+"不能为空！@";
				    }  	
				  
				var boo = msgSplit(msg);
				 
					 
			
				 if(boo){
				 	document.forms[0].submit();
				 
				 }
				 
		 }
		 
		 var A00100 = {name:"00100",value:"电费"}; 
         var A00200 = {name:"00200",value:"水暖费"}; 
         var A00300 = {name:"00300",value:"煤气费"}; 
         var A00400 = {name:"00400",value:"电话费"}; 
         var A00500 = {name:"00500",value:"通讯费"}; 
         var A00600 = {name:"00600",value:"保险费"}; 
         var A00700 = {name:"00700",value:"房屋管理费"};   
         var A00800 = {name:"00800",value:"代理服务费"}; 
         var A00900 = {name:"00900",value:"学教费"};
         var A01000 = {name:"01000",value:"有线电视费"};
         var A01100 = {name:"01100",value:"企业管理费用"};
         var A09001 = {name:"09001",value:"其他"};
    E102 = [A00100,A00200,A00300,A00400,A00500,A00600,A00700,A00800,A00900,A01000,A01100,A09001 ];
	    
     F100 =[ A09001];	
	
		 function ch_cxtj(obj){
		   var sel = document.getElementById("pmtkd");
		sel.options.length=0; 
		
		   
		   if(obj.value == "E102"){
	 		for(var i=0;i < E102.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',E102[i].name);
						opt.innerText = E102[i].value;
						sel.appendChild(opt);
			 }
			 
		}else {
		   if(obj.value == "F100"){
			var opt = document.createElement('option');
						opt.setAttribute('value',"09001");
						opt.innerText = "其他";
						sel.appendChild(opt);
		 	
			} 
		
		
	 		}
	 
	}
	 function init(){
	 
	  var sel = document.getElementById("pmtkd");
			for(var i=0;i < F100.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',F100[i].name);
						opt.innerText = F100[i].value;
						sel.appendChild(opt);
			 }
	  		
	 }
	 
	 //付款人开户行行号查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var cdtrissuer= document.getElementById("cdtrissuer");
				var cdtrissuernm=document.getElementById("cdtrissuernm");
				selectBank(url,cdtrissuer,cdtrissuernm,"");
			}
	 
		</script>
	</head  >
	<body onload="init()" > 
	 
	 
			<form method="post" name="form1"
			action="<%=path%>/regularDebitAction.do?method=inputParent">
			 
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
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">定期借记明细建立</span></div>
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
																<td class="text_tablehead_b" >
																	<input type="hidden"  id="xth"  name="systemno" title="系统号" value="BEPS"/>
																	 <input name="po.proposeracctccy" id="proposeracctccy" type="hidden"
																		style="width: 180px;" title="币种代码"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																
															</tr>
															<tr>
																
																<td class="text_tablehead_b"  >
																	支付交易组号
																</td>
																<td >
																	<input name="po.pmtgrpid" id="paymentGroupNum" type="text"  readonly="readonly" value="${paymentno }"
																		maxlength="19" title="支付交易组号" />
																<span name="validate" dataName="paymentno" dataType="Empty" msg="支付交易组号不能为空！" class="STYLE1">*</span>
																</td>
																</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	业务类型
																</td>
																<td >
																	<select  name="po.pmttp" id="pmttp"  onchange="ch_cxtj(this)"   >   
																		<option value="F100">
																			普通定期借记业务
																		</option>
																	 <option value="E102">
																			定期代收
																		</option>
																	</select>
																</td>
																<td class="text_tablehead_b" >
																	 业务种类
																</td>
																<td >
															<select  name="po.pmtkd" id="pmtkd">
																	
																	
																	</select>
																		</td>
																
															</tr>
															</table>
                                                 </div>
                                                
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">申请人信息</span></td>
                                                      </tr>
                                                      <tr>
                                                  				<td class="text_tablehead_b" >
																收款人账号
																</td>
																<td>
																	<input name="po.cdtracct" id="cdtracct" type="text"
																			style="width: 180px;" title="收款人账号" maxlength="22"
																			onKeyPress="actkeyPress()"
																			onblur="PubQueryAccount(this.value)"/><font color="red">*</font>
																</td>
																<td class="text_tablehead_b">
																	收款人名称
																</td>
																<td>
																	<input name="po.cdtrnm" id="cdtrnm" type="text"
																		style="width: 180px;" title="收款人户名" maxlength="60"
																		 /><font color="red">*</font>
																</td>
                                                  			</tr>
                                                      
															<tr>
															<td class="text_tablehead_b"  >
																	证件类型
																</td>
																<td>
																<input type="hidden"   name="po.proposercerttp" id="proposercerttp">
																		<select   id="proposercerttp1" disabled="disabled">
																			<option value="">
																							请选择
																						</option>
																			<option value="01">
																							身份证
																						</option>
																						<option value="02">
																							军官证
																						</option>
																						<option value="03">
																							学生证
																						</option>
																	
																	</select><font color="red">*</font>
																</td>
															<td class="text_tablehead_b">
																	证件号
																</td>
																<td >
																	<input name="po.proposercertid" id="proposercertid" type="text" readonly="readonly"
																		 title="申请人证件号" maxlength="18" /><font color="red">*</font>
																</td>
																
															</tr>	
															<tr>	
																<td class="text_tablehead_b">
																	客户号
																</td>
																<td >
																	<input name="po.proposercstmrid" id="proposercstmrid" type="text" readonly="readonly"
																		 title="申请人客户号" maxlength="18" /><font color="red">*</font>
																</td>

																<td class="text_tablehead_b" >
																		账户类型
																</td>
																<td>
																	<input type="hidden" id="proposeraccttp" style="width: 180px;" name="po.proposeraccttp" title="申请人账户类型">
																	<select id="proposeraccttp1" style="width: 180px;" title="申请人账户类型" disabled="disabled">
																		<option value="">
																			请选择
																		</option>
																		<option value="AT00">
																			对公账户
																		</option>
																		<option value="AT01">
																			个人贷记卡账户
																		</option>
																		<option value="AT02">
																			个人借记卡
																		</option>
																		<option value="AT03">
																			存折
																		</option>
																		<option value="AT04">
																			其他
																		</option>
																	</select>	 
																</td>
																</tr>
                                                 		
															<tr>
																<td class="text_tablehead_b" >
																	联系电话
																</td>
																<td>
																	<input name="po.proposertel" id="proposertel" type="text" 
																		 maxlength="15" title="申请人联系电话" /> 
																</td>
																</tr>
																
																<tr>
                                                  				<td class="text_tablehead_b" >
																	收款人地址
																</td>
																<td colspan="3">
																	<input name="po.cdtraddr" id="cdtraddr" type="text" 
																			style="width:380px;" title="收款人地址" 
																		onkeyup="limitLength(value,70,'提示：','cdtraddr')"	/>
																</td>
																 
                                                  			</tr>
																
                                                 	</table>
                                                </div>
                                               
                                                    <div class="table_content">
                                                    
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead"> <!--收款人信息--></span></td>
                                                      </tr>
                                                  			
                                                  			 
                                                  			
                                                  			 
                                                  			 
                                                  			  <tr>
                                                  			  <td class="text_tablehead_b">
																	<!--收款行行号-->
																</td>
																<td>
																	<input name="po.cdtrbrnchid" id="cdtrbrnchid" type="hidden" value="${bankInfo.bankcode}" readonly="readonly"
																		style="width: 180px;" title="收款行行号" maxlength="12"
																		 />
																</td>
                                                  					<td class="text_tablehead_b" >
																	<!--收款行行名 -->
																</td>
																<td>
																	<input name="po.cdtrbrnchnm" id="cdtrbrnchnm" type="hidden" value="${bankInfo.participantname}" readonly="readonly"
																			style="width: 180px;" title="收款行行名" maxlength="42"
																			/>
																</td>															
                                                  			</tr>
                                                  			  <tr>
                                                  			  <td class="text_tablehead_b">
																<!-- 收款人开户行行号-->
																</td>
																<td>
																	<input name="po.cdtrissuer" id="cdtrissuer" type="hidden"    readonly="readonly" value="${bankInfo.bankcode}"
																		class="text_tablehead_b_c" title="收款人开户行行号" maxlength="12"
																		 />
																<!--	 <input type="button" class="button"  value="搜索"  onclick="selectBankInfoOfFkk()">	<font color="red">*</font>
																		  -->
																</td>
                                                  					<td class="text_tablehead_b" >
																	<!--  收款人开户行行名 -->
																</td>
																<td>
																	<input name="po.cdtrissuernm" id="cdtrissuernm" type="hidden"     readonly="readonly" value="${bankInfo.participantname}"
																			style="width: 180px;" title="收款人开户行行名" maxlength="42"
																			/>
																</td>															
                                                  			</tr>
                                                  			  <tr>
                                                  				
																<td class="text_tablehead_b" >
																<!-- 收款清算行行号-->
																</td>
																<td>
																	<input name="po.cdtrmmbid" id="cdtrmmbid" type="hidden" value="${bankInfo.directbankcode}" readonly="readonly"
																			style="width: 180px;" title="收款清算行行号" maxlength="22"
																			/>
																</td>
																
																<td class="text_tablehead_b">
																 
																</td>
																<td>
																	 
																</td>
                                                  			</tr>
                                                  			
                                                  			  
                                                  			  <tr>
                                                  				
																

                                                  			</tr>
                                                  		</table>
                                                 </div>
                                                 
                                                 
                                                 
                                                 
                                                 
                                                     <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                              <td  > 
                                              
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										 </td>
                                              </tr>                    
                                                   
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
											 <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="重  置"   />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    	</table>
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

 
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
	 
		 
		 
		 
		 
		 
		 
		 
		 
		   
				 





















		</form>
	</body>
</html>
