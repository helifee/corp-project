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
<title> 批量包查询 </title>
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
	function viewdetails(id,msgtpid,instgdrctpty){
		var newurl = "<%=path %>/TransProcessAction.do?method=queryPKGInfoDetail&flag=laibao&pmtgrpid="+id+"&msgtpid="+msgtpid+"&instgdrctpty="+instgdrctpty;
		var oldurl = "<%=path %>/TransProcessAction.do?method=queryPKGInfo";
		viewDetails(newurl);
		//viewcheck(newurl,oldurl,"复核界面",document);
		
	}
</script>
</head>
<body>
<html:form  method="post"  action="/TransProcessAction.do?method=queryPKGInfo&flag=laibao">
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
                						<div  class="text_title"><span class="text_blue2">支付业务来报查询--批量包</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">报文标识号</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="po.msgid"  value="${condition.msgid }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">签发日期</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>
				                  	</td>
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
					                   <td  align="center" class="text_listhead">报文标识号</td>
					                   <td  align="center" class="text_listhead">发起清算行</td>
					                  <td  align="center" class="text_listhead">报文编号</td>					                  
					                   <td  align="center" class="text_listhead">业务类型</td>
					                   <td  align="center" class="text_listhead">总金额</td>	
					                    <td  align="center" class="text_listhead">总笔数</td>	
					                   <td  align="center" class="text_listhead">成功总金额</td>					                   
					                   <td  align="center" class="text_listhead">成功总笔数</td>				                   
					                   <td  align="center" class="text_listhead">状态</td>
					                   <td  align="center" class="text_listhead">明细</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                ${po.instgdrctpty }
							                    
							                  
							                  </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">大额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'hvps.112.001.01'}">大额机构普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">小额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.122.001.01'}">小额机构普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">普通借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">实时贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">实时借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.125.001.01'}">定期贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.133.001.01'}">定期借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.124.001.01'}">	实时贷记回执业务</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.128.001.01'}">	普通借记业务回执</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.132.001.01'}">	实时借记业务回执</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.134.001.01'}">	定期借记业务回执</c:if>
								                     <c:if test="${po.msgtpid eq 'beps.130.001.01'}">	CIS通用回执业务报文</c:if>
								                  </div>
								               </td>
							                  
							                  <td  class="text_list"><div class="gridCell_standard">
								                 <c:if test="${po.pmttp eq 'A100'}">普通汇兑</c:if>
							                  	 <c:if test="${po.pmttp eq 'A108'}">现金汇款</c:if>
								                  <c:if test="${po.pmttp eq 'A109'}">委托收款(划回)</c:if>
								                  <c:if test="${po.pmttp eq 'A110'}">托收承付(划回)</c:if>
								                   <c:if test="${po.pmttp eq 'A200'}">行间资金汇划</c:if>
								                   <c:if test="${po.pmttp eq 'A202'}">银行汇票</c:if>
								                  <c:if test="${po.pmttp eq 'A112'}">外汇清算</c:if>
								                  <c:if test="${po.pmttp eq 'A101'}">公益性资金汇划)</c:if>
								                  <c:if test="${po.pmttp eq 'A102'}">国库汇款</c:if>
								                  <c:if test="${po.pmttp eq 'A104'}">国库资金贷记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'A106'}">支取发行资金</c:if>
								                  <c:if test="${po.pmttp eq 'A301'}">缴费业务</c:if>
								                  <c:if test="${po.pmttp eq 'A201'}">支票</c:if>
								                   <c:if test="${po.pmttp eq 'B100'}">普通借记</c:if>
								                   <c:if test="${po.pmttp eq 'B104'}">国库资金借记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'B307'}">国库资金国债兑付借记划拨</c:if>
								                    <c:if test="${po.pmttp eq 'A307'}">国库资金国债兑付贷记划拨</c:if>
								                   
								                     <c:if test="${po.pmttp eq 'C102'}">个人储蓄通存</c:if>
								                      <c:if test="${po.pmttp eq 'D102'}">个人储蓄通兑</c:if>
								                      <c:if test="${po.pmttp eq 'D200'}">实时代收</c:if>
								                     <c:if test="${po.pmttp eq 'C101'}">实时代付</c:if>
								                     <c:if test="${po.pmttp eq 'C210'}">薪金报酬</c:if>
								                    <c:if test="${po.pmttp eq 'C100'}">实时贷记</c:if>
								                    <c:if test="${po.pmttp eq 'D100'}">实时借记</c:if>
								                    <c:if test="${po.pmttp eq 'D203'}">实时通用票据截留</c:if>
								                     <c:if test="${po.pmttp eq 'E100'}">定期贷记</c:if>
								                   <c:if test="${po.pmttp eq 'F100'}">定期借记</c:if>
								                   <c:if test="${po.pmttp eq 'B308'}">支票截留</c:if>
								                    <c:if test="${po.pmttp eq 'B309'}">通用票据截留</c:if>
								                    <c:if test="${po.pmttp eq 'A308'}">CIS支票业务回执</c:if>
								                    <c:if test="${po.pmttp eq 'A309'}">CIS通用票据业务回执</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  	
							                  <c:choose>
							                  		<c:when test="${po.ctrlsum eq '0.00' }">&nbsp;0.00</c:when>
							                  		<c:otherwise>
							                  			<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.ctrlsum }"/>
							                  		</c:otherwise>
							                  		</c:choose>
							                  </div></td>
							                     <td  class="text_list"><div class="gridCell_standard">${po.nboftxs }
							                  </div></td>
							                    <td  class="text_list"><div class="gridCell_standard">
							                  		<c:choose>
							                  		<c:when test="${po.ornglctrlsum eq '0.00' }">&nbsp;0.00</c:when>
							                  		<c:otherwise>
							                  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.ornglctrlsum}"/>
							                  		</c:otherwise>
							                  		</c:choose>
							                  </div></td>
							                 
							                    <td  class="text_list"><div class="gridCell_standard">${po.ornglnboftxs }
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                	<c:if test="${po.prcsts eq 'PR91'}">待复核</c:if>
							                	
							                             <c:if test="${po.prcsts eq 'PR04' }">已清算</c:if>
																	<c:if test="${po.prcsts eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${entity.status eq 'PR08' }">已撤销</c:if>
																	<c:if test="${po.prcsts eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${po.prcsts eq 'PR21' }">已止付</c:if>
																	<c:if test="${po.prcsts eq 'PR22' }">已冲正</c:if>
																	<c:if test="${po.prcsts eq 'PR32' }">已超期</c:if>
																	<c:if test="${po.prcsts eq 'PR05' }">已成功</c:if>
																	<c:if test="${po.prcsts eq 'PR98' }">待确认    </c:if>
																	<c:if test="${po.prcsts eq 'PR90' }">新建      </c:if>
																	<c:if test="${po.prcsts eq 'PR81' }">待复核    </c:if>
																	<c:if test="${po.prcsts eq 'PR82' }">待审核    </c:if>
																	<c:if test="${po.prcsts eq 'PR83' }">待审批    </c:if>
																	<c:if test="${po.prcsts eq 'PR95' }">待组包    </c:if>
																	<c:if test="${po.prcsts eq 'PR96' }">待发送    </c:if>
																	<c:if test="${po.prcsts eq 'PR97' }">已发送    </c:if>
																	<c:if test="${po.prcsts eq 'PR11' }">已轧差排队</c:if>
																	<c:if test="${po.prcsts eq 'PR12' }">已清算排队</c:if>
																	<c:if test="${po.prcsts eq 'PR99' }">故障</c:if>
																	<c:if test="${po.prcsts eq 'PR03' }">已轧差</c:if>
																	<c:if test="${po.prcsts eq 'PR89' }">待回执 </c:if>
																	<c:if test="${po.prcsts eq 'PR88' }">已回执</c:if>
							                  </div></td> 
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#" onClick="viewdetails('${po.msgid}','${po.msgtpid}', ${po.instgdrctpty })"><u>明细</u></a>
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
	    	
	  	</tr>  
	</table>
</html:form>
</body>
</html>
