<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@page import="com.cnaps.hvps.persistence.info.Querybook"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 查询书录入 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">
	function commitForm(){
				
				
			   var msg = "@";
				var instdPty = document.getElementById("instdPty");
				var msgid = document.getElementById("msgid");
			 
				 if(isNull(trim(instdPty.value))){
					msg += instdPty.title+"不能为空！@";
				    }
                      if(isNull(trim(msgid.value))){
					msg += msgid.title+"不能为空！@";
				    }
			 
			 
				 
		 
			 
				var boo = msgSplit(msg);
				 
			  	 
	
				if(boo){
				 document.forms[0].submit();
					}
				 
		 }
		 //<option value="beps.121.001.01">客户发起普通贷记业务报文</option>   【批量包组头】
//<option value="beps.122.001.01">金融机构发起普通贷记业务报文</option> 【批量包组头】
	// <option value="beps.127.001.01">普通借记业务报文</option> //【批量包组头】
	//<option value="beps.131.001.01">实时借记业务报文</option> //【批量包组头】	 元明细标示号
		 function zcx(value){
		 var sel=document.getElementById('querytype') ;
		   if(value=="beps.121.001.01"||value=="beps.122.001.01"||value=="beps.127.001.01"||value=="beps.131.001.01"){
		      
		   }else{
		        sel.options.length=0; 
		    	var opt = document.createElement('option');
						opt.setAttribute('value','QT00');
						opt.innerText ="整包查询";
						sel.appendChild(opt);		 
						  }
		 
		 }
		  function zcxname(obj){
		 
		   if(obj.value== "QT01" ){
		       document.getElementById("p").style.display="block";
		      
		   } else{
		    document.getElementById("p").style.display="none";
		   }
		 
		 }
</script>
</head>
<body>

<html:form method="post" action="/querybookAction.do?method=sendMsg&business=${business}">
	<input id="business_name" type="hidden" value="querybook">
	<input id="repeatmark" type="hidden" value="0" />




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
						                  	<div  class="text_title"><span class="text_blue2">查询书录入</span></div>
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
																		原发起参与机构：
																</td>
																<td>
																		<input type="text" name="po.instdPty" id="instdPty" maxlength="14" onkeyup="fun_number(this)"/><span  class="STYLE1"> *</span>
				               
																</td>
														 	 			<td class="text_tablehead_b" >
																		原报文类型编码：
																</td>
																<td >
																	<select name="po.msgcode" id="msgcode" style="width: 180px;" onchange="zcx(this.vaue)" >
	<option value="hvps.111.001.01">客户发起汇兑业务报文</option>
	<option value="hvps.112.001.01">金融机构发起汇兑业务报文</option> 
	<option value="hvps.141.001.01">即时转账报文</option> 
	<option value="beps.121.001.01">客户发起普通贷记业务报文</option> 
	<option value="beps.122.001.01">金融机构发起普通贷记业务报文</option> 
	<option value="beps.125.001.01">定期贷记业务报文</option> 
	<option value="beps.127.001.01">普通借记业务报文</option>
	<option value="beps.128.001.01">普通借记业务回执报文</option> 
	<option value="beps.130.001.01">CIS通用回执业务报文</option> 
	<option value="beps.133.001.01">定期借记业务报文</option> 
	<option value="beps.134.001.01">定期借记业务回执报文</option>
	<option value="beps.380.001.01">批量代收业务报文</option> 
	<option value="beps.381.001.01">批量代收业务回执报文</option> 
	<option value="beps.382.001.01">批量代付业务报文</option> 
	<option value="beps.383.001.01">批量代付业务回执报文</option> 
	<option value="beps.411.001.01">借记业务止付申请报文</option>
	<option value="beps.412.001.01">借记业务止付应答报文</option>
	<option value="ccms.314.001.01">业务查询报文</option> 
	<option value="ccms.315.001.01">业务查复报文</option> 
	<option value="ccms.318.001.01">业务退回申请报文</option> 
	<option value="ccms.319.001.01">业务退回应答报文</option>
	<!-- <option value="CMT100">汇兑支付报文(一代)</option> 
	<option value="CMT231">即时转账报文(一代)</option> 
	<option value="PGK001">普通贷记业务包(一代)</option> 
	<option value="PGK005">定期贷记业务包(一代)</option> 
	<option value="PGK002">普通借记业务包(一代)</option> 
	<option value="PGK008">普通借记回执包(一代)</option> 
	<option value="PGK006">定期借记业务包(一代)</option> 
	<option value="PGK011">定期借记回执包(一代)</option>
	<option value="CMT327">借记业务止付申请报文(一代)</option> 
	<option value="CMT328">借记业务止付应答报文(一代)</option> 
	<option value="CMT301">查询报文(一代)</option> 
	<option value="CMT302">查复报文(一代)</option> 
	<option value="CMT319">小额业务退回申请报文(一代)</option> 
	<option value="CMT320">小额业务退回应答报文(一代)</option> 
	<option value="CMT313">申请退回报文(一代)</option> 
	<option value="CMT3131">业务退回应答报文(一代)</option>
	 -->
	 		                          </select>
				                  									<span  class="STYLE1">*</span>
																</td>
															
																 
																
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																		查询类型：
																</td>
																<td >
																	<select name="po.querytype" id="querytype" style="width: 180px;" onchange="zcxname(this)">
				                  		                 	         <option value="QT00">整包查询</option>
				                  		                     	      <option value="QT01">单笔查询</option>
				                  		                          </select>
				                  									<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	原报文标识号：
																</td>
																<td >
																	<input type="text" name="po.msgid" id="msgid" /><span  class="STYLE1"> *</span>
																	
																</td>
																
															</tr>
																<tr id="p" style="display:none;">

															 
															
																<td class="text_tablehead_b" >
																	原明细标示号：
																</td>
																<td >
																	<input type="text" name="po.txid" id="txid" /><span  class="STYLE1"> *</span>
																	
																</td>
																
															</tr>
															<tr>
											                  	<td  class="text_tablehead_b">
											                  		查询内容：
											                  	</td>
											                  	<td colspan="3" >
											                   		<textarea name="po.querycontent" class="textarea_msg" cols="50" rows="5" id="querycontent" 
											                   			onKeyPress="charPress()" onkeyup="limitLength(value,512,'提示：','fy')"></textarea>
											                   		<span  class="STYLE1">*</span>
											                   	</td>
											                </tr>
																
															</table>
                                                 </div>
                                                 <div class="table_content" align="center">
                                                 <br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();"/>
										<br />
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
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
				</tr>
			</table> 
</html:form>
</body>
</html>
