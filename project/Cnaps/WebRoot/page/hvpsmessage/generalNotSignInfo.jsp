<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
<META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">
<META   HTTP-EQUIV="Expires"   CONTENT="0"> 
<title> 通用非签名信息录入 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript" src="<%=path%>/js/transfer/test.js"></script>
<script language="javascript">
	function changefj(){
		if(this.document.getElementById("ywfj").value == "1"){
			this.document.getElementById("fjxx").style.display = "";
		}else{
			this.document.getElementById("fjxx").style.display = "none";
			this.document.getElementById("attachment").value = "";
		}
	}
	function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("recvdrctpty");
				selectkhhBank(url,recvbkno,"","","","");
			}
</script>

</head>
<body onload="changefj()">
<html:form enctype="multipart/form-data" method="post" action="/generalNotSignInfoAction.do?method=sendMsg&business=${business}">
	<input id="business_name" type="hidden" value="generalNotSignInfo">
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
						                  	<div  class="text_title"><span class="text_blue2">通用非签名录入</span></div>
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
																		接收参与机构：
																</td>
																<td >
																	<input type="text" name="po.recvdrctpty" id="recvdrctpty" readonly="readonly" maxlength="14"/>
																	<input id="selbutton" type="button" class="button"  value="搜索" onclick="selectBankInfo()" >
																		<font color="#FF0000">*</font>
																</td>
															
																<td class="text_tablehead_b"  >
																		系统编号：
																</td>
																<td >
																	<select name="po.systemcode" id="systemcode" style="width: 130px;"">
											                  			<option value="HVPS">大额</option>
											                  			<option value="BEPS">小额</option>
											                  		</select> <font color="#FF0000">*</font>
																</td>
															</tr>
															<td class="text_tablehead_b"  >
																备注：
																</td>
																<td colspan="3">
																	<textarea name="po.remarkinfo" id="remarkinfo" rows="3" cols="50" onkeyup="jsxxcd(this,256)" onblur="jsxxcd(this,256)"></textarea>	
																</td>
															</table>
                                                 </div>
                                                 </br>
                                                 </br>
                                                 </br>
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">签名信息</span></td>
                                                      </tr>
                                                 		<tr>
																<td class="text_tablehead_b" >
																	业务类型编码：
																</td>
																<td >
																<select  name="po.transactiontypecode" id="transactiontypecode" style="width: 180px;" >
				                  		                 	         
				                  		                          </select>
																</td>
																<td class="text_tablehead_b">
																	信息标题：
																</td>
																<td >
																	<input type="text" name="po.title" id="title" maxlength="80"/> <font color="#FF0000">*</font>
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b"  >
																	信息内容：
																</td>
																<td colspan="3">
																	<textarea name="po.content" id="content" rows="3" cols="50" onkeyup="jsxxcd(this,256)" onblur="jsxxcd(this,256)"></textarea> <font color="#FF0000">*</font>	
																</td>
																 
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	有无附件：
																</td>
																<td>
																<select id="ywfj" style="width: 130px;" onchange="changefj()">
										                   			<option value="0">无</option>
										                   			<option value="1">有</option>
										                   		</select> 
																</td>
																</tr>
                                                 	</table>
                                                </div>
                                                    <div class="table_content" id="fjxx" >
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">附件信息</span></td>
                                                      </tr>	
                                                      		<td class="text_tablehead_b">
										                   		附件：
										                	</td>
										                <td colspan="3" width="434">
										                	<span id="uploadImg"> <input name="po.attachment"
													  			type="file" id="attachment" size="1" value="浏 览"  /> 
															</span> 
										               </td>
                                                  		</table>
                                                 </div>
                                                   
                                        <div class="table_content" align="center">          
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="ckeckwethornull();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="返  回" onclick="history.back();" />
										<br />
										<br />   
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
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
</html:form>
<xml id="oxml">
		<item>
		
		<item value="A108" text="现金汇款"/>                                          
<item value="A110" text="托收承付"/>                                          
<item value="A109" text="委托收款(划回)"/>                                          
<item value="A101" text="公益性资金汇划"/>                                          
<item value="A102" text="国库汇款"/>                                          
<item value="A104" text="国库资金贷记划拨"/>                                         
<item value="A301" text="缴费业务"/>                                          
<item value="A201" text="支票"/>                                          
<item value="A100" text="普通汇兑"/>                                          
<item value="A112" text="外汇清算"/>                                          
<item value="A200" text="行间资金汇划"/>                                          
<item value="A202" text="银行汇票"/>                                          
<item value="A113" text="跨境支付"/>                                          
<item value="A307" text="国库资金国债兑付贷记划拨"/>                                 
<item value="B307" text="国库资金国债兑付借记划拨"/>                                 
<item value="A106" text="支取发行基金"/>                                          
<item value="B100" text="普通借记业务"/>                                          
<item value="C102" text="个人储蓄通存业务"/>                                         
<item value="D102" text="个人储蓄通兑业务"/>                                         
<item value="E100" text="普通定期贷记业务"/>                                         
<item value="B308" text="支票截留"/>                                          
<item value="B309" text="票据截留"/>                                          
<item value="A113" text="跨境支付"/>                                          
<item value="A309" text="CIS通用票据业务回执"/>                                      
<item value="A308" text="CIS支票业务回执"/>
		
		
		</item>
		</xml>
<script>
		    var C=AttachXMLForSelect(oxml.XMLDocument,[generalNotSignInfoForm("transactiontypecode")]);
		</script>
</body>
</html>
