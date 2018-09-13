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
<title> 实时业务冲正 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>



</head>
<body>
<html:form method="post" action="/realTimeReversalAction.do?method=sendMsg">
	<input id="business_name" type="hidden" value="realTimeReversal">
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
						<div  class="text_title"><span class="text_blue2">实时业务冲正录入</span></div>
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
				                		发起直接参与机构
				                	</td>
				                  	<td><div >
				                   		<input type="text" name="rtr.instgDrctPty" id="instgDrctPty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"> <span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 接收直接参与机构
				                  	</td>
				                  	<td >
				                   		<input type="text" name="rtr.instdDrctPty" id="instdDrctPty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)">
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
										<td  class="text_tablehead_b">
				                		原发起直接参与机构
				                	</td>
				                  	<td><div >
				                   		<input type="text" name="rtr.orgnlInstdDrctPty" id="orgnlInstdDrctPty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"> <span  class="STYLE1">*</span>				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 原报文标识号
				                  	</td>
				                  	<td >
				                   		<input type="text" name="rtr.orgnlMsgId" id="orgnlMsgId" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)">
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 	<tr>
									
				                  	<td  class="text_tablehead_b">
				                  		原报文类型号
				                  	</td>
				                  	<td colspan="3">
				                   		<input type="text" name="rtr.orgnlMsgTpCd" id="orgnlMsgTpCd" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b">
				                  		附言
				                  	</td>
				                  	<td colspan="3" >
				                   		<textarea name="rtr.addtlInf" class="textarea_msg"  cols="50" rows="2" id="addtlInf" onKeyPress="charPress()"></textarea>
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
