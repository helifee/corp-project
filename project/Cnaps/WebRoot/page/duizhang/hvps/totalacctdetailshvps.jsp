<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ page import="com.cnaps.hvps.persistence.duizhang.TotalAcctEntity" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>大额汇总查询列表 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function sendDetailsCheck(chckdt,pmttp,direction,prcSts){
		window.location.href="<%=path %>/DuizhangAction.do?method=sendDetailsCheckHvps&chckdt="
			+chckdt+"&pmttp="+pmttp+"&direction="+direction+"&prcSts="+prcSts;
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
					                <td align="center" width="30%" height="40"  >对账日期：${entity.chckdt }</td>
					                <td align="center" width="40%" height="40"  >报文类型：
														<c:if test="${entity.msgTpCd eq 'hvps.111.001.01'}">客户发起汇兑业务报文        </c:if>   
														<c:if test="${entity.msgTpCd eq 'hvps.112.001.01'}">金融机构发起汇兑业务报文    </c:if>
														<c:if test="${entity.msgTpCd eq 'hvps.141.001.01'}">即时转账业务报文            </c:if>  
														<c:if test="${entity.msgTpCd eq 'hvps.631.001.01'}">多边轧差净额结算报文        </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.121.001.01'}">客户发起普通贷记业务报文    </c:if>
														<c:if test="${entity.msgTpCd eq 'beps.122.001.01'}">金融机构发起普通贷记业务报文</c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.123.001.01'}">实时贷记业务报文            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.125.001.01'}">定期贷记业务报文            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.127.001.01'}">普通借记业务报文            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.131.001.01'}">实时借记业务报文            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.133.001.01'}">定期借记业务报文            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.380.001.01'}">批量代收业务报文            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.382.001.01'}">批量代付业务报文            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.384.001.01'}">实时代收业务报文            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.385.001.01'}">实时代付业务报文            </c:if>      
														<c:if test="${entity.msgTpCd eq 'ccms.314.001.01'}">信息类报文                  </c:if>
														<c:if test="${entity.msgTpCd eq 'ccms.315.001.01'}">信息类报文                  </c:if>
										</td>
					                <td align="center" width="30%" height="40"   >业务类型：
					                	<c:if test="${entity.pmtTp eq 'A100'}">普通汇兑                  </c:if>
												<c:if test="${entity.pmtTp eq 'A108'}">现金汇款                  </c:if>
												<c:if test="${entity.pmtTp eq 'A109'}">委托收款（划回）          </c:if>
												<c:if test="${entity.pmtTp eq 'A110'}">托收承付（划回）          </c:if>
												<c:if test="${entity.pmtTp eq 'A201'}">支票                      </c:if>
												<c:if test="${entity.pmtTp eq 'A202'}">银行汇票                  </c:if>
												<c:if test="${entity.pmtTp eq 'A111'}">商业汇票                  </c:if>
												<c:if test="${entity.pmtTp eq 'A112'}">外汇清算                  </c:if>
												<c:if test="${entity.pmtTp eq 'A113'}">跨境支付                  </c:if>
												<c:if test="${entity.pmtTp eq 'A101'}">公益性资金汇划            </c:if>
												<c:if test="${entity.pmtTp eq 'A114'}">人行跨区域票据交换轧差净额</c:if>
												<c:if test="${entity.pmtTp eq 'A102'}">国库汇款                  </c:if>
												<c:if test="${entity.pmtTp eq 'A307'}">国库资金国债兑付贷记划拨  </c:if>
												<c:if test="${entity.pmtTp eq 'A105'}">退汇                      </c:if>
												<c:if test="${entity.pmtTp eq 'A104'}">国库资金贷记划拨          </c:if>
												<c:if test="${entity.pmtTp eq 'A103'}">国库同城交换净额清算      </c:if>
												<c:if test="${entity.pmtTp eq 'A106'}">支取发行基金              </c:if>
												<c:if test="${entity.pmtTp eq 'A113'}">跨境支付                  </c:if>
												<c:if test="${entity.pmtTp eq 'A115'}">再贷款                    </c:if>
												<c:if test="${entity.pmtTp eq 'A114'}">人行跨区域票据交换轧差净额</c:if>
												<c:if test="${entity.pmtTp eq 'A200'}">行间资金汇划            </c:if>
												<c:if test="${entity.pmtTp eq 'A307'}">国库资金国债兑付贷记划拨</c:if>
												<c:if test="${entity.pmtTp eq 'G101'}">公开市场交易结算        </c:if>
												<c:if test="${entity.pmtTp eq 'G102'}">债券市场交易结算        </c:if>
												<c:if test="${entity.pmtTp eq 'G103'}">债券发行、兑付及收益划拨</c:if>
												<c:if test="${entity.pmtTp eq 'G104'}">银行卡轧差净额      </c:if>
												<c:if test="${entity.pmtTp eq 'G105'}">电子商业汇票资金清算</c:if>
												<c:if test="${entity.pmtTp eq 'G106'}">外汇交易市场结算</c:if>
												<c:if test="${entity.pmtTp eq 'G107'}">资金池结算</c:if>
												<c:if test="${entity.pmtTp eq 'G108'}">日终自动拆借</c:if>
												<c:if test="${entity.pmtTp eq 'G109'}">质押融资</c:if>
												<c:if test="${entity.pmtTp eq 'H010'}">外汇交易轧差净额</c:if>
												<c:if test="${entity.pmtTp eq 'H011'}">证券交易轧差净额</c:if>
												<c:if test="${entity.pmtTp eq 'H012'}">其他系统轧差净额</c:if>
												<c:if test="${entity.pmtTp eq 'K001'}"> 查询书</c:if>
												<c:if test="${entity.pmtTp eq 'K002'}"> 查复书</c:if>
					               </td>
					            </tr> 
            				</table>
            				<br>
		            		<div align="center"><br><table width="95%"  class="tbcolor">
					                
					                <tr class="text_listhead">
					                   <td  >业务状态</td>
					                   <td  >对账参与者</td>
					                   <td  >发送总笔数</td>	
					                   <td  >发送总金额</td>
					                   <td  >接收总笔数</td>
					                   <td  >接收总金额</td>
					                </tr> 
					                
									  <c:forEach items="${entity.duizhangList}" var="po">
										   <tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list" rowspan="3"><div class="gridCell_standard">
							                  	<c:if test="${po.prcSts eq 'PR04'}">已清算</c:if>
							                  	<c:if test="${po.prcSts eq 'PR09'}">已拒绝</c:if>
							                  	<c:if test="${po.prcSts eq 'PR08'}">已撤销</c:if>
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
                                              			 <a href="#"   onClick="sendDetailsCheck('${entity.chckdt }','${entity.pmtTp }','SR00','${po.prcSts }')"><u>业务明细核对发送</u></a></span>
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
                                              			 <a href="#"   onClick="sendDetailsCheck('${entity.chckdt }','${entity.pmtTp }','SR01','${po.prcSts }')"><u>业务明细核对发送</u></a></span>
							                  		</c:when>
							                  		<c:otherwise>
							                  			<font color="red" style="font-weight: bolder">一致</font>
							                  		</c:otherwise>
							                  	</c:choose>
							                  </div></td>
						                  </tr>
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
			     		<td>&quot;</td>
		     		</tr>
	    		</table>
	    	</td>
	    	<td >
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
