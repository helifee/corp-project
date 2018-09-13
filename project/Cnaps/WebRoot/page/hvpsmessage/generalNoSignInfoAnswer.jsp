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
<title> 通用非签名信息应答 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">
	function checkAndSubmit(){
		var flag=true;
		var selectOjb=this.document.getElementById("Status");
		if(selectOjb.options[selectOjb.selectedIndex].value=="PR09"){
			if(this.document.getElementById("RejectCode").value=="") flag=false;
			if(this.document.getElementById("ProcessParty").value=="") flag=false;
			if(this.document.getElementById("RejectInformation").value=="") flag=false;
		}
		if(flag==false){
			alert("输入要素不完整！");
		}
		else{
			
		}
	}
	
	function addInputFlag(){
		
		var selectOjb=this.document.getElementById("Status");
		if(selectOjb.options[selectOjb.selectedIndex].value=="PR09"){
			var obj=this.document.getElementById("RejectCodetb");
			obj.innerHTML="<input type='text' name='po.rejectCode' id='RejectCode' maxlength='14'/>"+"<font color='#FF0000'>*</font>";
			var obj1=this.document.getElementById("ProcessPartytb");
			obj1.innerHTML="<input type='text' name='po.processParty' id='ProcessParty' maxlength='14'/>"+"<font color='#FF0000'>*</font>";
			var obj2=this.document.getElementById("RejectInformationtb");
			obj2.innerHTML="<textarea name='po.rejectInformation' id='RejectInformation' rows='3' cols='68' ></textarea>"+"<font color='#FF0000'>*</font>";			
		}
		else{
			var obj=this.document.getElementById("RejectCodetb");
			obj.innerHTML="<input type='text' name='po.rejectCode' id='RejectCode' maxlength='14'/> ";
			var obj1=this.document.getElementById("ProcessPartytb");
			obj1.innerHTML="<input type='text' name='po.processParty' id='ProcessParty' maxlength='14'/>";
			var obj2=this.document.getElementById("RejectInformationtb");
			obj2.innerHTML="<textarea name='po.rejectInformation' id='RejectInformation' rows='3' cols='68' ></textarea>";	
		}
		
	}
</script>


</head>
<body>
<html:form method="post" action="/generalNoSignInfoAnswerAction.do?method=sendMsg&business=generalSignInfoAnswer">
	<input id="business_name" type="hidden" value="generalSignInfoAnswer">
	<input id="repeatmark" type="hidden" value="0">
	<table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
						<h5 align="left">&nbsp;</h5>
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
			<td width="8" ></td>
		</tr>
	  	<tr valign="top">
	    	<td ></td>
	    	<td >
	    	
	      		<table width="75%" border="0" cellspacing="0" cellpadding="0" align="center">
	        		
			       <tr>
					 <td  >
						<div  class="text_title"><span class="text_blue2">通用非签名信息应答</span></div>
					</td>
				 </tr>
	        		<tr>
	          			<td>
		          			<div class="table_body">
                                   				<table >
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                                      </tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																		业务状态：
																</td>
																<td >
																<select name="po.status" id="Status" onchange="addInputFlag()">
							                   						<option value="">请选择</option>
																	<option value="PR09"}>已拒绝</option>
																	<option value="PR05"}>已成功</option>
				                  								</select>
																</td>
															
																<td class="text_tablehead_b"  >
																		业务拒绝处理码：
																</td>
																<td id="RejectCodetb">
																	<input type="text" name="po.rejectCode" id="RejectCode" maxlength="14"/> 
																</td>
																</tr>
																<tr>
																
																<td class="text_tablehead_b" >
																	业务处理参与机构：
																</td>
																<td id="ProcessPartytb" >
																	<input type="text" name="po.processParty" id="ProcessParty" maxlength="14"/> 
																</td>
															
																
																<td class="text_tablehead_b" >
																	 原报文标识号：
																</td>
																<td id="OrgnlMsgId" >
																	<input type="text" name="po.orgnlMsgId" id="ProcessParty" maxlength="14"/> 
																</td>
															</tr>
															
															<tr>
																
																<td class="text_tablehead_b" >
																	原发起直接参与机构：
																</td>
																<td id="OrgnlInstgPty" >
																	<input type="text" name="po.orgnlInstgPty" id="ProcessParty" maxlength="14"/> 
																</td>
															
																
																<td class="text_tablehead_b" >
																	原报文类型编码集：
																</td>
																<td id="orgnlMT " >
																	<input type="text" name="po.orgnlMT" id="ProcessParty" maxlength="14"/> 
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b"  >
																	备注:
																</td>
																<td colspan="3" id="Ustrd">
																	<textarea name="po.ustrd" id="RejectInformation" rows="3" cols="68" ></textarea>	
																</td>
																</tr>
															<tr>
																<td class="text_tablehead_b"  >
																	业务拒绝信息:
																</td>
																<td colspan="3" id="RejectInformationtb">
																	<textarea name="po.rejectInformation" id="RejectInformation" rows="3" cols="68" ></textarea>	
																</td>
																</tr>
															</table>
		          								 <table>
                                                    	<tr><td colspan="4">&nbsp;</td></tr>
                                                    	<tr>
                                                    	
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td >
                                                    			<div class="table_content" align="center">
                                                    			<input name="addButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="ckeckwethornull();" />
                                                    			</div>
															</td>
                                                    		<td >&nbsp;</td>
                                                    	</tr>
                                                    	<tr><td colspan="4">&nbsp;</td></tr>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td >
                                                    			<div class="table_content" align="center">
                                                    			<span class="STYLE1">说明：红色*标注项为必填项</span>
                                                    			</div>
															</td>
                                                    		<td >&nbsp;</td>
                                                    	</tr>
                                                    	<tr><td colspan="4">&nbsp;</td></tr>
                                                    </table>
		          					</div>
		          			 <div class="table_content">
                                                    </div>
	            		</td>
	        		</tr>
	    		</table>
	    		
	    	</td>	    	
	    	<td >
	  	</tr>  
	</table>
</html:form>
</body>
</html>
