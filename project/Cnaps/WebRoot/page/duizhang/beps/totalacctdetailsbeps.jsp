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
<title>小额汇总查询列表 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function sendDetailsCheck(chckdt,pmttp,direction,prcSts,netgRnd){
		window.location.href="<%=path %>/DuizhangAction.do?method=sendDetailsCheckBeps&chckdt="
			+chckdt+"&pmttp="+pmttp+"&direction="+direction+"&prcSts="+prcSts+"&netgRnd="+netgRnd;
	}
</script>


</head>
<body>
<html:form  method="post" action="/DuizhangAction.do?method=XXXX">
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
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	        			<th class="text_tablehead_b" colspan="2">
												<h4 align="center">	</h4>
											</th>
	        		</tr>
	        		<tr>
	        			
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">与人行对账列表查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
					                <td  height="40" >对账日期：${entity.chckdt }</td>
					                <td height="40"   >报文类型：
					                			<c:if test="${entity.msgTp eq 'beps.121.001.01'}">客户发起普通贷记</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.122.001.01'}">机构发起普通贷记</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.124.001.01'}">实时贷记回执</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.125.001.01'}">定期贷记</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.128.001.01'}">普通借记回执</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.130.001.01'}">CIS通用回执</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.132.001.01'}">实时借记回执</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.134.001.01'}">定期借记回执</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.381.001.01'}">批量代收回执</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.383.001.01'}">批量代付回执</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.385.001.01'}">实时代收回执</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.387.001.01'}">实时代付回执</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.127.001.01'}">普通借记</c:if>
							                  	<c:if test="${entity.msgTp eq 'beps.133.001.01'}">定期借记</c:if>
							                  	<c:if test="${entity.msgTp eq 'ccms.314.001.01'}">查询书</c:if>
							                  	<c:if test="${entity.msgTp eq 'ccms.315.001.01'}">查复书</c:if>	
					                			
					               </td>
					            </tr> 
            				</table>
            				<br>
		            		<div align="center"><br><table width="95%"  class="tbcolor">
					                
					                <tr class="text_listhead">
					                   <td  align="center" class="text_listhead" colspan="2">业务状态</td>
					                   <td  align="center" class="text_listhead">对账参与者</td>
					                   <td  align="center" class="text_listhead">发送总笔数</td>	
					                   <td  align="center" class="text_listhead">发送总金额</td>
					                   <td  align="center" class="text_listhead">接收总笔数</td>
					                   <td  align="center" class="text_listhead">接收总金额</td>
					                </tr> 
					                	<c:forEach items="${entity.duizhangList}" var="po">
									 	<c:choose>
									 		<c:when test="${po.prcSts eq 'PR04'}">
									 			<c:forEach items="${po.bepsList}" var="bepsentity" >
									 			<tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
								                  <td  class="text_list" rowspan="3"><div class="gridCell_standard">
								                  	已清算
								                 </div></td>
								                  <td  class="text_list" rowspan="3"><div class="gridCell_standard">
								                  	轧差 ${bepsentity.netgRnd } 场
								                 </div></td>
								                  <td  class="text_list"><div class="gridCell_standard">行内管理端</div></td>
								                  <td  class="text_list"><div class="gridCell_standard">${bepsentity.sndTtlCnt }</div></td>
								                  <td  class="text_list"><div class="gridCell_standard">${bepsentity.sndTtlAmt }</div></td>		
								                  <td  class="text_list"><div class="gridCell_standard">${bepsentity.rcvTtlCnt }</div></td>	
								                  <td  class="text_list"><div class="gridCell_standard">${bepsentity.rcvTtlAmt }</div></td>
							                  </tr>
							                  <tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list"><div class="gridCell_standard">人行</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${bepsentity.rhsndTtlCnt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${bepsentity.rhsndTtlAmt }</div></td>		
							                  <td  class="text_list"><div class="gridCell_standard">${bepsentity.rhrcvTtlCnt }</div></td>	
							                  <td  class="text_list"><div class="gridCell_standard">${bepsentity.rhrcvTtlAmt }</div></td>	
						                  </tr>
						                   <tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list"><div class="gridCell_standard">对账结果</div></td>
							                  <td  class="text_list" colspan="2"><div class="gridCell_standard">
							                  	<c:choose>
							                  		<c:when test="${bepsentity.sendNumFlag eq '1' || bepsentity.sendAmtFlag eq '1'}">
							                  			<span class="text_list">
                                              			 <a href="#"   onClick="sendDetailsCheck('${entity.chckdt }','${entity.msgTp }','SR00','${po.prcSts }',' ${bepsentity.netgRnd }')"><u>业务明细核对发送</u></a></span>
							                  		</c:when>
							                  		<c:otherwise>
							                  			<font color="red" style="font-weight: bolder">一致</font>
							                  		</c:otherwise>
							                  	</c:choose>
							                  </div></td>
							                 <td  class="text_list" colspan="2"><div class="gridCell_standard">
							                  	<c:choose>
							                  		<c:when test="${bepsentity.recvNumFlag eq '1' || bepsentity.recvAmtFlag eq '1'}">
							                  			<span class="text_list">
                                              			 <a href="#"   onClick="sendDetailsCheck('${entity.chckdt }','${entity.msgTp }','SR01','${po.prcSts }',' ${bepsentity.netgRnd }')"><u>业务明细核对发送</u></a></span>
							                  		</c:when>
							                  		<c:otherwise>
							                  			<font color="red" style="font-weight: bolder">一致</font>
							                  		</c:otherwise>
							                  	</c:choose>
							                  </div></td>
						                  </tr>
							                  </c:forEach>
						                   </c:when>
									 	<c:otherwise>
										   <tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list" colspan="2" rowspan="3"><div class="gridCell_standard">
							                  	<c:if test="${po.prcSts eq 'PR09'}">已拒绝</c:if>
							                  	<c:if test="${po.prcSts eq 'PR08'}">已撤销</c:if>
							                  	<c:if test="${po.prcSts eq 'PR21'}">已止付</c:if>
							                  	<c:if test="${po.prcSts eq 'PR22'}">已冲正</c:if>
							                  	<c:if test="${po.prcSts eq 'PR32'}">已超期</c:if>
							                  	<c:if test="${po.prcSts eq 'PR05'}">已成功</c:if>
							                 </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">行内管理端</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.sndTtlCnt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.sndTtlAmt }</div></td>		
							                  <td  class="text_list"><div class="gridCell_standard">${po.rcvTtlCnt }</div></td>	
							                  <td  class="text_list"><div class="gridCell_standard">${po.rcvTtlAmt }</div></td>
						                  </tr>
						                  <tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list"><div class="gridCell_standard">人行</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.rhsndTtlCnt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.rhsndTtlAmt }</div></td>		
							                  <td  class="text_list"><div class="gridCell_standard">${po.rhrcvTtlCnt }</div></td>	
							                  <td  class="text_list"><div class="gridCell_standard">${po.rhrcvTtlAmt }</div></td>	
						                  </tr>
						                   <tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list"><div class="gridCell_standard">对账结果</div></td>
							                  <td  class="text_list" colspan="2"><div class="gridCell_standard">
							                  	<c:choose>
							                  		<c:when test="${po.sendNumFlag eq '1' || po.sendAmtFlag eq '1'}">
							                  			<span class="text_list">
                                              			 <a href="#"   onClick="sendDetailsCheck('${entity.chckdt }','${entity.msgTp }','SR00','${po.prcSts }','0')"><u>业务明细核对发送</u></a></span>
							                  		</c:when>
							                  		<c:otherwise>
							                  			<font color="red" style="font-weight: bolder">一致</font>
							                  		</c:otherwise>
							                  	</c:choose>
							                  </div></td>
							                 <td  class="text_list" colspan="2"><div class="gridCell_standard">
							                  	<c:choose>
							                  		<c:when test="${po.recvNumFlag eq '1' || po.recvAmtFlag eq '1'}">
							                  			<span class="text_list">
                                              			 <a href="#"   onClick="sendDetailsCheck('${entity.chckdt }','${entity.msgTp }','SR01','${po.prcSts }','0')"><u>业务明细核对发送</u></a></span>
							                  		</c:when>
							                  		<c:otherwise>
							                  			<font color="red" style="font-weight: bolder">一致</font>
							                  		</c:otherwise>
							                  	</c:choose>
							                  </div></td>
						                  </tr>
					                  
									 		</c:otherwise>
									 		</c:choose>
					                  </c:forEach>
									 		
									  
					               
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
	    	<td>
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
