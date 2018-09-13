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
<title> 即时转账业务查询 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewdetails(txid,msgid,id,pmttpbgclsotid){
		var newurl = "<%=path %>/TransProcessAction.do?method=queryDetails&txid="+txid+"&msgid="+msgid+"&id="+id+"&direction=I&pmttpbgclsotid="+pmttpbgclsotid;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/instantTransferAction.do?method=querySendxml">
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
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="I"/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="6">&nbsp;</td>
	          			</tr>
	          			<tr>
	          			<td >&nbsp;</td>
	          			<td>
	          			<div align="center">
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6"><div  class="text_title"><span class="text_blue2">即时转账业务查询</span></div></td>
                				</tr>
                				</table>
	          					<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">支付业务序号(范围)</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="startid"  value="${startid }"/>-<input type="text" name="endid"  maxlength="19" value="${endid }"/>
				                  	</td>
				                  	<td class="text_tablehead_b">业务类型</td>
				                   	<td  colspan="3">
				                  		<select name="pmttp">
				                  			<option value="">请选择</option>
				                  			<option value="A108" ${pmttp eq 'A108' ? 'selected' : '' }>现金汇款</option>
				                  			<option value="A109" ${pmttp eq 'A109' ? 'selected' : '' }>委托收款(划回)</option>
				                  			<option value="A110" ${pmttp eq 'A110' ? 'selected' : '' }>托收承付(划回)</option>
				                  			<option value="A101" ${pmttp eq 'A101' ? 'selected' : '' }>公益性资金汇划</option>
				                  			<option value="A102" ${pmttp eq 'A102' ? 'selected' : '' }>国库汇款</option>
				                  			<option value="A104" ${pmttp eq 'A104' ? 'selected' : '' }>国库资金贷记划拨</option>
				                  			<option value="A301" ${pmttp eq 'A301' ? 'selected' : '' }>缴费业务</option>
				                  			<option value="A201" ${pmttp eq 'A201' ? 'selected' : '' }>支票</option>
				                  			<option value="A100" ${pmttp eq 'A100' ? 'selected' : '' }>普通汇兑</option>
				                  			<option value="A112" ${pmttp eq 'A112' ? 'selected' : '' }>外汇清算</option>
				                  			<option value="A200" ${pmttp eq 'A200' ? 'selected' : '' }>行间资金汇划</option>
				                  			<option value="A113" ${pmttp eq 'A113' ? 'selected' : '' }>跨境支付</option>
				                  			<option value="B100" ${pmttp eq 'B100' ? 'selected' : '' }>普通借记业务</option>
				                  			<option value="C102" ${pmttp eq 'C102' ? 'selected' : '' }>个人储蓄通存业务</option>
				                  			<option value="D102" ${pmttp eq 'D102' ? 'selected' : '' }>个人储蓄通兑业务</option>
				                  			<option value="E100" ${pmttp eq 'E100' ? 'selected' : '' }>普通定期贷记业务</option>
				                  			<option value="B308" ${pmttp eq 'B308' ? 'selected' : '' }>支票截留</option>
				                  			<option value="B309" ${pmttp eq 'B309' ? 'selected' : '' }>通用票据截留</option>
				                  		</select>
				                  	</td>
				                  	
				                   
				                </tr> 
				                <tr>
				                	<td  class="text_tablehead_b">签发日期</td>
				                  	<td colspan="3">
				                   		<input type="text" name="startdate" class="Wdate" onclick="WdatePicker()" value="${startdate }"/>-<input type="text" name="enddate" class="Wdate" onclick="WdatePicker()" value="${enddate }"/>
				                  	</td>
				                  	 	<td class="text_tablehead_b">&nbsp;</td>
                					<td colspan="3" align="left">
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
				               	 	
				                </tr>
				                <tr>
				                		<td class="text_tablehead_b">汇款金额(范围)</td>
				                  	<td colspan="3">
				                   		<input type="text" name="startamount" value="${startamount }"/>-<input type="text" name="endamount" value="${endamount }"/>
				                  	</td>
				                  	
				                </tr>
            				</table>
            				</div>
            				
            				<br/>
		            		<div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr>
										 <td  align="center" class="text_listhead">报文标识号</td>
					                   <td  align="center" class="text_listhead">签发日期</td>
					                   <td  align="center" class="text_listhead">签发行行号</td>
					                  <td  align="center" class="text_listhead">报文编号</td>					                  
					                   <td  align="center" class="text_listhead">业务类型</td>
					                  <td  align="center" class="text_listhead">优先级</td> 
					                   <td  align="center" class="text_listhead">账号</td>
					                   <td  align="center" class="text_listhead">金额</td>					                   
					                   <td  align="center" class="text_listhead">业务状态</td>
					                   <td  align="center" class="text_listhead">明细</td>				                  
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgId }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workDt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgPty }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard"> ${po.msgId} </div> </td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.pmtTpClctn } </div></td>
							                   <td  class="text_list"> <div class="gridCell_standard">${po.sttlmPrty} </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.cdtrAcct }</div></td>
							                <td  class="text_list"><div class="gridCell_standard">
							                  	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
							                </div></td>

							                  <td  class="text_list"><div class="gridCell_standard">
							                  	  ${po.status }
													</div>
							                </td>
							                 <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetails('','','','')"><u>明细</u></a></span></div>
                                               </td>				                  
						                  </tr>
					                  </logic:iterate>                
					                </logic:present>
		                		</table>
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
	    	<td></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
