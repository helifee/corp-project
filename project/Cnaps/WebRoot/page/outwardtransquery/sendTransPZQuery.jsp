<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
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
<title> 支付业务往报凭证查询 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
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
	function viewdetails(id){
		var newurl = "<%=path %>/TransProcessAction.do?method=gotoTransDetails&pmtgrpid="+id;
		viewDetails(newurl);	
	}
	function pzPrint(id,systemcd){
		var msgtpid = document.forms[0]['po.msgtpid'].value;
		var newurl = "<%=path %>/PingzhengPrintAction.do?method=toHVPSendPZPrint&direction=O&pmtgrpid="+id+"&msgtpid="+msgtpid+"&systemcd="+systemcd;
		//window.open(newurl,"大额往账凭证打印","height=400, width=800, top=200, left=200,scrollbars=yes,resizable=yes");
		//window.location.href=newurl;
		//document.forms[0].action=newurl;
		//document.forms[0].submit();
		viewDetails(newurl);	
	}
	//凭证批量打印
	function onprintpzpd(){
		var msgtpid = document.forms[0]['po.msgtpid'].value;
		var newurl = "<%=path %>/PingzhengPrintAction.do?method=toHVPRecvPZPPrint&direction=O&msgtpid="+msgtpid;
		window.open(newurl,"大额往账凭证打印",'height=400, width=800, top=200, left=200,scrollbars=yes,resizable=yes');
		//viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/TransProcessAction.do?method=querySendxml&operway=05">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  >
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
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<div align="center">
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6"><div  class="text_title"><span class="text_blue2">往账凭证打印</span></div></td>
                				</tr>
                				</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head" >
                				<tr>
                					<td colspan="8">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td  class="text_tablehead_b">签发日期</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" style="width:120px;" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" style="width:120px;" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">业务状态</td>
				                  	<td  > 
				                   		<select name="po.status">
				                   			<option value="PR04" ${condition.status eq 'PR04' ? 'selected' : '' }>已清算</option>
				                  		</select>
				                  	</td>
				                   	<td class="text_tablehead_b">报文类型</td>
				                   	<td  >
				                  		<select name="po.msgtpid" >
				                  			<option value="hvps.111.001.01" ${condition.msgtpid eq 'hvps.111.001.01' ? 'selected' : '' }>普通贷记</option>
				                  			
				                  		</select>
				                  	</td>
				                </tr> 
				               
				               
				                <tr>
				                	<td class="text_tablehead_b">&nbsp;</td>
                					<td colspan="6" align="right">
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  		 <input  type="button" value="凭证批打" class="button" onclick="onprintpzpd()" >&nbsp;&nbsp;
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					                <tr class="text_listhead">
					                   <td  >支付交易组号</td>
					                   <td  >签发日期</td>
					                   <td  >签发行行号</td>
					                   <td  >客户号</td>
					                     <td  >系统类型</td>	
					                  <td  >报文编号</td>					                  
					                   <td  >业务类型</td>
					                  <td  >优先级</td> 
					                   <td  >申请人账号</td>
					                   <td  >金额</td>
					                    <td  >凭证打印</td>
					                   <td  >明细</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.proposercstmrid }</div></td>
							                    <td  class="text_list"><div class="gridCell_standard">
							                    	<c:if test="${po.systemcd eq 'HVPS'}">大额</c:if>
							                    	<c:if test="${po.systemcd eq 'BEPS'}">小额</c:if>
							                    </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.msgtpid eq 'hvps.111.001.01'}">普通贷记</c:if>
							                  	<c:if test="${po.msgtpid eq 'hvps.112.001.01'}">普通贷记</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.121.001.01'}">普通贷记</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.122.001.01'}">普通贷记</c:if>
							                  	<c:if test="${po.msgtpid eq 'hvps.123.001.01'}">实时贷记</c:if>
							                  	<c:if test="${po.msgtpid eq 'hvps.124.001.01'}">实时贷记回执</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.125.001.01'}">定期贷记</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.127.001.01'}">普通借记</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.125.001.01'}">定期贷记</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.128.001.01'}">普通借记回执</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.131.001.01'}">实时借记</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.132.001.01'}">实时借记回执</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.133.001.01'}">定期借记</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.134.001.01'}">定期借记回执</c:if>
							                 </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.pmttp eq'A108' }">现金汇款</c:if>
							                  	<c:if test="${po.pmttp eq'A109' }">委托收款</c:if>
							                  </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test=" ${po.sttlmprty eq 'NORM'}">普通</c:if>
								                  <c:if test=" ${po.sttlmprty eq 'HIGH'}">紧急</c:if>
								                  <c:if test=" ${po.sttlmprty eq 'URGT'}">特急</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.applicantacct }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.amount }</div></td>
							                 
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="pzPrint('${po.pmtgrpid}','${po.systemcd}')"><u>凭证打印</u></a></span></div>
                                               </td>
							                 <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetails('${po.pmtgrpid}')"><u>明细</u></a></span></div>
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
	    	<td >
	  	</tr>  
	</table>
</html:form>
</body>
</html>
