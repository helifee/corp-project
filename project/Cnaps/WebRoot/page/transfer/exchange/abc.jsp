<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 支付业务复核往报查询 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
			type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewdetails(id,pmttpbgclsotid,systemcd){
		var newurl = "<%=path %>/TransProcessAction.do?method=sendDetailMessage&pmtgrpid="+id+"&pmttpbgclsotid="+pmttpbgclsotid+"&operway=00"+"&systemcd="+systemcd;
		var oldurl = "<%=path %>/TransProcessAction.do?method=querySendxml&operway=00";
		viewDetails(newurl);
		//viewcheck(newurl,oldurl,"复核界面",document);
		
	}
	function viewdetailsback(id,pmttpbgclsotid,systemcd){
		var newurl = "<%=path %>/TransProcessAction.do?method=sendDetailMessage&pmtgrpid="+id+"&pmttpbgclsotid="+pmttpbgclsotid+"&operway=001"+"&systemcd="+systemcd;
		viewDetails(newurl);
		
		
		
	}
	
	
	function commitForm(){
	var url ="<%=path %>/page/transfer/exchange/aaa.jsp";
	viewDetails(url);
	  
	}
</script>
</head>
<body>
<html:form  method="post"  action="/TransProcessAction.do?method=querySendxml&operway=00">
     <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
			<td width="8" ></td>
		</tr>
	  	<tr valign="top">
	    	<td >
	    	<td >
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="O"/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="O">
	      			<tr>
                		<td colspan="6">&nbsp;</td>
                	</tr>
	        		<tr>
	          			<td >&nbsp;</td>
	          			<td>
	          			<div  align="center">
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">选择汇款路径</span></div>
                					</td>
                				</tr>
                			</table>
	          				
            				</div>
            				<br>
		            		<div>
		              			<table width="95%"  class="tbcolor">
					               <tr>
					                  <td  align="center" class="text_listhead">请选择</td>
					                   <td  align="center" class="text_listhead">汇路名称</td>
					                   <td  align="center" class="text_listhead">到账时间</td>
					                   <td  align="center" class="text_listhead">手续费</td>
					                  
					       				 
					                </tr> 
					                
					             
					                
										 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                   <td><input class="text_tablehead_b_rad" name="type" type="radio" height="1"></td>
							                  <td  class="text_list"><div class="gridCell_standard"> 大额贷记</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">实时到账</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">20.00</div></td>
							                  
							                 
							                 			                  
						                  </tr>  
						                  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                 <td  class="text_list"><input class="text_tablehead_b_rad" name="type" type="radio"></td>
							                  <td  class="text_list"><div class="gridCell_standard">小额普通贷记</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">24小时到账</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">5.00</div></td>
							                  
							                 
							                 			                  
						                  </tr>  
						                  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                 <td  class="text_list"><input class="text_tablehead_b_rad" name="type" type="radio"></td>
							                  <td  class="text_list"><div class="gridCell_standard">小额实时贷记</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">实时到账</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">15.00</div></td>
							                  
							                 
							                 			                  
						                  </tr>  
						                  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><input class="text_tablehead_b_rad" name="type" type="radio"></td>
							                  <td  class="text_list"><div class="gridCell_standard">网银互联</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">即时到账</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">10.00</div></td>
							                  
							                 
							                 			                  
						                  </tr>  
					                 
					                
					               
		                		</table>
		                		 <div >
                                                    	<table>
                                                    	
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="保  存" onclick="commitForm();" />
                                                    			</td>
                                                    			<td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    				<input name="backButton" style="cursor: pointer" type="reset"
											class="button" value="返  回"  />
											
                                                    			</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
		             	</div>
		             	</td>
		             	</tr>
					<tr>  
			    		<td></td>      
					   	<td>
					       	<table width="100%" border="0" cellpadding="0" cellspacing="0">
					        	<tr>
					          		<td><jsp:include page="/page/common/Page.jsp"/></td>
					          	</tr>
				         	</table>
				        </td>
			     		<td></td>
		     		</tr>
	    		</table>
	    	</td>
	    	<td ></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
