<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath(); 
	response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
	response.setHeader("Pragma","no-cache"); //HTTP 1.0
	response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
	
%>

<html>
	<head>
	<%
String type=request.getParameter("type");
 %>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
		  <META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">   
		  <META   HTTP-EQUIV="Expires"   CONTENT="0">   
		
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
			<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
        <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
		<script type="text/javascript">
		
		function getDefaultDate(){
		 var newDay=new Date();
		 var year=newDay.getFullYear();
		 var month=newDay.getMonth();
		 var day=newDay.getDate();
		 document.getElementById("paydt").value= year+'-'+(month+1)+'-'+day;
		}
		
		function selectBankZHCPR(){
				var url ="<%=request.getContextPath()%>";
				var holderbk= document.getElementById("holderbk");
				var holderbkname=document.getElementById("holderbkname");
				selectBank(url,holderbk,holderbkname,'');
			}
		
		function selectBankHPQHH(){
				var url ="<%=request.getContextPath()%>";
				var issuerbk= document.getElementById("issuerbk");
				var issuerbkname=document.getElementById("issuerbkname");
				selectBank(url,issuerbk,issuerbkname,'');
			}
			
			function commitForm(){
				if(VForm.Validate()){
				document.getElementById("issueamt").value = rmoney(document.getElementById("issueamt").value);
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
			


			
			
			
			//添加条件行

		</script>
	</head>
	<body onload="getDefaultDate();">
		<form method="post"
			action="<%=path%>/guashiAction.do?method=sendMessage">

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
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">银行汇票挂失
						                  	</span></div>
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
																	汇票号码
																</td>
																<td>
																	<input name="notesno" id="" type="text" maxlength="60" onKeyPress="numPress()"  title="汇票号码" value="${ }"/>
																
																	<span name="validate" dataName="notesno" dataType="Empty" msg="汇票号码不能为空！" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b"  >
																	提示付款日期
																</td>
																<td >
																	<input name="paydt" id="paydt" value=""
																		class="Wdate" type="text"
																		readonly="readonly" title="提示付款日期" onKeyPress="fun_date()"
																		class="Wdate" onclick="WdatePicker()"  /> 
																
																	<span name="validate" dataName="paydt" dataType="Empty" msg="提示付款日期不能为空！" class="STYLE1">*</span>
																
															</tr>
                                                       
                                                         
                                                      
                                                      
															<tr>
																
																<td class="text_tablehead_b" >
																    出票日期
																</td>
																<td>
																
																	<input name="dbtracct" id="cprq" class="Wdate" type="text"  onKeyPress="fun_date()" value="${ }"
																		readonly="readonly" title="出票日期" 
																		class="Wdate" onclick="WdatePicker()" />	
																	<span name="validate" dataName="dbtracct" dataType="Empty" msg="出票日期不能为空！" class="STYLE1">*</span>	
																	</td>
																	
																	<td class="text_tablehead_b" >
																	汇票种类
																</td>
																<td >
																<select  name="billtp" id="" style="width:180px;" title="汇票种类">
																<option value="CT00"  selected="selected">可转让汇票</option>
																<option value="CT01"  selected="selected">不可转让汇票</option>
																<option value="CT02"  selected="selected">现金汇票</option>
																</select>
																	<span name="validate" dataName="billtp" dataType="Empty" msg="汇票种类不能为空！" class="STYLE1">*</span>	
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	汇票密押
																</td>
																<td>
																	<input name="billseal" id="" type="text" maxlength="14" onKeyPress="numPress()"   title="汇票密押" value="${ }"/>
																
																	<span name="validate" dataName="billseal" dataType="Empty" msg="汇票密押不能为空！" class="STYLE1">*</span>	
																</td>
																	<td class="text_tablehead_b"  >
																	出票金额
																</td>
																<td >
																	<input name="issueamt" id="" type="text"   onKeyPress="amountPress()" maxlength="12" value="${ }"
																	onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"  
																		title="出票金额" />
																
																	<span name="validate" dataName="issueamt" dataType="Empty" msg="出票金额不能为空！" class="STYLE1">*</span>
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	签发行行号
																</td>
																<td >
																	<input name="issuerbk" id="issuerbk" type="text"   readonly="readonly"  value="${ }"
																		   maxlength="12" title="签发行行号" />
																<span name="validate" dataName="issuerbk" dataType="Empty" msg="签发行行号不能为空！" class="STYLE1">*</span>
																
																	
																</td>
																<td class="text_tablehead_b"  >
																	签发行名称
																</td>
																<td >
																	<input name="issuerbkname" id="issuerbkname" type="text"  readonly="readonly" value="${ }"
																		title="签发行名称" />
																</td>
															</tr>
															<tr><td>&nbsp;</td><td>
															<input type="button" class="button"   value="搜索" onclick="selectBankHPQHH()">
															</td></tr>
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	汇票申请人账号
																</td>
																<td >
																	<input name="issueracct" id="" type="text"  maxlength="32" onKeyPress="actkeyPress()" value="${ }"
																		title="汇票申请人账号" />
																
																	<span name="validate" dataName="issueracct" dataType="Empty" msg="汇票申请人账号不能为空！" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b"  >
																	汇票申请人名称
																</td>
																<td >
																	<input name="issuernm" id="" type="text"   maxlength="60" onKeyPress="actkeyPress()" value="${ }"
																		title="汇票申请人名称" />
																
																	<span name="validate" dataName="issuernm" dataType="Empty" msg="汇票申请人名称不能为空！" class="STYLE1">*</span>	
																</td>
															</tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																	汇票收款人名称
																</td>
																<td >
																	<input name="rcvrnm" id="" type="text"  maxlength="60" onKeyPress="actkeyPress()" value="${ }"
																		title="汇票收款人名称" />
																
																	<span name="validate" dataName="rcvrnm" dataType="Empty" msg="汇票收款人名称不能为空！" class="STYLE1">*</span>	
																</td>
															
																
															</tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																	最后持票人开户行
																</td>
																<td colspan=>
																	<input name="holderbk" id="holderbk" type="text"   readonly="readonly" value="${ }"
																	 maxlength="12"	title="最后持票人开户行" />
																	<span name="validate" dataName="holderbk" dataType="Empty" msg="最后持票人开户行不能为空！" class="STYLE1">*</span>	
																	
																</td>
																<td class="text_tablehead_b"  >
																	最后持票人开户行名称
																</td>
																<td colspan=>
																	<input name="holderbkname" id="holderbkname" type="text"   readonly="readonly" value="${ }"
																		title="最后持票人开户行名称" />
																	<span name="validate" dataName="holderbkname" dataType="Empty" msg="最后持票人开户行名称不能为空！" class="STYLE1">*</span>	
																</td>
															</tr>
															
															<tr>
																<td>&nbsp;</td>
																<td><input type="button" class="button"   value="搜索" onclick="selectBankZHCPR()"></td>
															</tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																	最后持票人账号
																</td>
																<td >
																	<input name="holderacct" id="" type="text"   maxlength="32" onKeyPress="actkeyPress()" value="${ }"
																		title="最后持票人账号" />
																
																	<span name="validate" dataName="holderacct" dataType="Empty" msg="最后持票人账号不能为空！" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b"  >
																	最后持票人名称
																</td>
																<td >
																	<input name="holdernm" id="" type="text"   maxlength="60" onKeyPress="actkeyPress()" value="${ }"
																		title="最后持票人名称" />
																
																	<span name="validate" dataName="holdernm" dataType="Empty" msg="最后持票人名称不能为空！" class="STYLE1">*</span>	
																</td>
															</tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																	多余金额
																</td>
																<td >
																	<input name="rmnngamt" id="" type="text"  onKeyPress="amountPress()" maxlength="12" value="${ }"
																	onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" 
																		title="多余金额" />
																
																	<span name="validate" dataName="rmnngamt" dataType="Empty" msg="多余金额不能为空！" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b"  >
																	实际结算金额
																</td>
																<td >
																	<input name="actntryamt" id="" type="text"  onKeyPress="amountPress()" maxlength="12" value="${ }"
																	onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" 
																		title="实际结算金额" />
																
																	<span name="validate" dataName="actntryamt" dataType="Empty" msg="实际结算金额不能为空！" class="STYLE1">*</span>	
																</td>
															</tr>
															
															
															
															 <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">附言信息</span></td>
	                                                      </tr>
                                                    		<tr>
                                                    		<td class="text_tablehead_b"  >
																	挂失人
																</td>
																<td >
																	<input name="person" id="" type="text"  onKeyPress="actkeyPress()" maxlength="25" s
																		title="挂失人" />
																
																	<span name="validate" dataName="person" dataType="Empty" msg="挂失人不能为空！" class="STYLE1">*</span>	
																</td>
																</tr><tr>
																<td class="text_tablehead_b" >
																	挂失事由
																</td>
																<td colspan="3">
																	<textarea name="reason" id="fy"   onKeyPress="jsxxcd(this,60)" 
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','fy')"></textarea>
																</td>

															</tr>
															<tr align="center">
                                                    		<td>&nbsp;</td><td>&nbsp;</td>
                                                    			<td align="center">
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="保  存" onclick="commitForm();" />
                                                    			</td>
                                                    		</tr>
															
															
															</table>
                                              </div>
                                               
                                                 
                                                  
                                              
                                                    <div class="table_content">
                                                    	<table>
                                                    	
                                                    	
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
