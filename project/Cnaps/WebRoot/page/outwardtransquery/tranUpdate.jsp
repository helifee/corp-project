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
<title> 支付业务往报维护查询 </title>
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
	function viewdetails(id,pmttpbgclsotid){
		var newurl = "<%=path %>/TransProcessAction.do?method=sendDetailMessage&pmtgrpid="+id+"&operway=03&pmttpbgclsotid="+pmttpbgclsotid;
		viewDetails(newurl);	
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
                						<div  class="text_title"><span class="text_blue2"> 支付往报维护查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">汇兑组号</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">业务状态</td>
				                  	<td  colspan="3">
				                   		<select name="po.status">
				                  			<option value="PR81">待复核</option>
				                  		</select>
				                  	</td>
				                   	<td class="text_tablehead_b">业务类型</td>
				                   	<td  >
				                  		<html:select property="po.pmttp" value="${condition.pmttp }">
				                  			<html:option value="A108">现金汇款</html:option>
				                  			<html:option value="A109">委托收款(划回)</html:option>
				                  			<html:option value="A110">托收承付(划回)</html:option>
				                  			<html:option value="A101">公益性资金汇划</html:option>
				                  			<html:option value="A102">国库汇款</html:option>
				                  			<html:option value="A104">国库资金贷记划拨</html:option>
				                  			<html:option value="A301">缴费业务</html:option>
				                  			<html:option value="A201">支票</html:option>
				                  			<html:option value="A100">普通汇兑</html:option>
				                  			<html:option value="A112">外汇清算</html:option>
				                  			<html:option value="A200">行间资金汇划</html:option>
				                  			
				                  			<html:option value="B100">普通借记业务</html:option>
				                  			<html:option value="B104">国库资金借记划拨</html:option>
				                  			<html:option value="B307">国库资金国债兑付借记划拨</html:option>
				                  			<html:option value="F100">定期借记业务</html:option>
				                  			<html:option value="C210">薪金报酬</html:option>
				                  			<html:option value="E100">定期贷记业务</html:option>
												 	<html:option value="B308">支票截留</html:option>
				                  			<html:option value="B309">通用票据截留</html:option>
				                  		</html:select>
				                  	</td>
				                </tr> 
				                <tr>
				                	<td  class="text_tablehead_b">签发日期</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>
				                  	</td>
				               	 	<td  class="text_tablehead_b">客户号</td>
				                   	<td   colspan="3">
				                  		<input type="text" name="po.proposercstmrid" value="${condition.proposercstmrid }" size="32" maxlength="30"/>
				                  	</td>
				                  		<td class="text_tablehead_b">系统类型</td>
				                   	<td  >
				                  		<html:select property="po.systemcd" value="${condition.systemcd }">
				                  			<html:option value="HVPS" >大额实时支付系统</html:option>
				                  			<html:option value="BEPS" >小额批量支付系统</html:option>
				                  			
				                  		</html:select>
				                  	</td>
				                </tr>
				                <tr>
				                		<td class="text_tablehead_b">汇款金额</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>
				                  	</td>
				                  	 	<td   class="text_tablehead_b">申请人账号</td>
				                   	<td colspan="3">
				                  		<input type="text" name="po.applicantacct" size="32" maxlength="32" value="${condition.applicantacct }"/>
				                  	</td>
				                  
				                   
				                </tr>
				               <tr>
				                	<td class="text_tablehead_b"  colspan="4">&nbsp;</td>
                					<td>
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					               <tr>
					                   <td  align="center" class="text_listhead">汇兑组号</td>
					                   <td  align="center" class="text_listhead">签发日期</td>
					                   <td  align="center" class="text_listhead">签发行行号</td>
					                   <td  align="center" class="text_listhead">客户号</td>
					                  <td  align="center" class="text_listhead">报文编号</td>					                  
					                   <td  align="center" class="text_listhead">业务类型</td>
					                  <td  align="center" class="text_listhead">优先级</td> 
					                   <td  align="center" class="text_listhead">账号</td>
					                   <td  align="center" class="text_listhead">金额</td>					                   
					                   <td  align="center" class="text_listhead">状态</td>
					                   <td  align="center" class="text_listhead">明细</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.proposercstmrid }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                   <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">大额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">小额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">实时贷记</c:if>
								                   <c:if test="${po.msgtpid eq 'beps.125.001.01'}">定期贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">普通借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">实时借记</c:if>
								                  </div>
								               </td>
							                  
							                  <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.pmttp eq 'A108'}">现金汇款</c:if>
								                  <c:if test="${po.pmttp eq 'A109'}">托付承兑(划回)</c:if>
								                   <c:if test="${po.pmttp eq 'E100'}">定期贷记</c:if>
								                   <c:if test="${po.pmttp eq 'B100'}">普通借记</c:if>
								                   <c:if test="${po.pmttp eq 'B104'}">国库资金借记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'B307'}">国库资金国债兑付借记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'F100'}">定期借记</c:if>
								                  </div>
								               </td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.sttlmprty eq 'NORM'}">普通</c:if>
								                  <c:if test="${po.sttlmprty eq 'HIGH'}">紧急</c:if>
								                  <c:if test="${po.sttlmprty eq 'URGT'}">特急</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.applicantacct }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                
							                     ${po.status eq 'PR81' ? '待复核' : ''}
							                    ${po.status eq 'PR82' ? '待审核' : ''}
							                     ${po.status eq 'PR83' ? '待审批' : ''}
							                  
							                  
							                  </div></td> 
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetails('${po.pmtgrpid}','${po.pmttpbgclsotid}')"><u>维护</u></a>
                                               </td>				                  
						                  </tr>  
					                  </logic:iterate> 
					                   <logic:empty name="queryList">
					                  	<tr>
					                		<td colspan="9" align="center"><font color="red">没有符合条件的记录!</font></td>
					                	</tr>
					                  </logic:empty>                    
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
	    	<td ></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
