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
<title> 自由格式录入 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
 <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("instdpty");
				
				selectkhhBank(url,recvbkno,"","","","");
				
			}
	function selectValue(val){
		if("0000"==val){
			document.getElementById("instdpty").value="0000";
			document.getElementById("instdpty").readOnly="readonly";
			document.getElementById("selbutton").disabled="disabled";
		}else{
			document.getElementById("instdpty").value="";
			document.getElementById("instdpty").readOnly="";
			document.getElementById("selbutton").disabled="";
		}
	}
</script>


</head>
<body>
<html:form method="post" action="/sendFreeMessageAction.do?method=sendMsg">
	<input id="business_name" type="hidden" value="sendfreemessage">
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
						<div  class="text_title"><span class="text_blue2">自由格式录入</span></div>
					</td>
				 </tr>
	        		<tr>
	          			<td>
		          			<div class="table_body">
                              
                                   <table class="table_content">
                                   <tr><td colspan="4">&nbsp;</td></tr>
                                   <tr>
                                   	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                   </tr>
                                   	<tr>
										<td  class="text_tablehead_b">
				                  		 系统编号
				                  	</td>
				                  	<td >
				                   		<select name="po.systemcd" id="systemcd">
				                   			<option value="HVPS">大额实时支付系统</option>
				                   			<option value="BEPS">小额批量支付系统</option>
				                   			<option value="IBPS">网上支付跨行清算系统</option>
				                   		</select>
				                  	</td>
										<td  class="text_tablehead_b">
				                		接收参与机构类型
				                	</td>
				                  	<td><div >
				                   		<select name="po.recvbranch"id="recvbranch" onchange="selectValue(this.value)" >
	          								<option value="xxxx">参与机构行号</option>
	          								<option value="0000">NPC</option>
	          							</select>
	          							<span  class="STYLE1">*</span></div>
				                  	</td>
				                  
				                 </tr>
				                 	<tr>
									
				                  	<td  class="text_tablehead_b">
				                  		接收参与机构行号
				                  	</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.instdpty" id="instdpty" maxlength="12" onkeyup="fun_number(this)" readonly="readonly"
				                   		onblur="fun_number(this)" style="width:120px;"/>
				                  		<input id="selbutton" type="button" class="button"  value="搜索" onclick="selectBankInfo()" >
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b">
				                  		信息内容
				                  	</td>
				                  	<td colspan="3" >
				                   		<textarea name="po.msgcnt" class="textarea_msg" cols="69" rows="5" id="msgcnt" onKeyPress="charPress()"></textarea>
				                   		<span  class="STYLE1">*</span>
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
                                                    			<input name="backButton" style="cursor: pointer" type="reset"
											class="button" value="重  置"  />
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
