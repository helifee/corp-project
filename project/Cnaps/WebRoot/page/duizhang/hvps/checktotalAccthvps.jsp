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
<title>大额汇总对账查询列表 </title>
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
<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>

<script language="javascript">

	
	function viewdetails(chckDt,pmtTp,msgTpCd){
		var newurl = "<%=path %>/DuizhangAction.do?method=checkTotalAcctDetails&systemcd=HVPS&chckdt="+chckDt+"&pmtTp="+pmtTp+"&msgTpCd="+msgTpCd;
		viewDetails(newurl);	
	}
	function confirm(){
		if(VForm.Validate()){
			  document.forms[0].submit();
		}
		
	}
</script>

</head>
<body>
<html:form  method="post" action="/DuizhangAction.do?method=checkTotalAcct">
<input type="hidden" name="systemcd" value="HVPS"/>
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<br/>
	  	<tr valign="top">
	    	<td >
	    	<td >
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">大额汇总对账查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
				                  	<td width="120" height="40" class="text_tablehead_b">对账日期：</td>
				                  	<td width="120"><div align="left">
					                  	<input  type="text" name="chckdt"  value="${chckdt }" readonly="readonly" title="对账日期" style="width: 180px;"
											class="Wdate" onclick="WdatePicker()" />
											<span name="validate" dataName="chckdt" dataType="Empty" msg="对账日期不能为空！" class="STYLE1"></span>
									</td>								
				                   	<td  width="90" height="40" class="text_tablehead_b"></td>
				                   	<td  colspan="4" align="center">
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="confirm()"/> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<div align="center"><br>
		              			<table width="95%"  class="tbcolor">
					                <tr class="text_listhead">
					                   <td  >终态日期</td>
					                    <td>报文类型</td>
					                   <td  >业务类型</td>
					                    <td  >对账类型</td>
					                   <td  >对账结果</td>	
					                   <td  >明细</td>
					                </tr>
					             
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  ><div class="gridCell_standard">${po.chckdt }</div></td>
							                  <td><div class="gridCell_standard">
									                  <c:if test="${po.msgTpCd eq 'hvps.111.001.01'}">客户发起汇兑业务报文        </c:if>   
														<c:if test="${po.msgTpCd eq 'hvps.112.001.01'}">金融机构发起汇兑业务报文    </c:if>
														<c:if test="${po.msgTpCd eq 'hvps.141.001.01'}">即时转账业务报文            </c:if>  
														<c:if test="${po.msgTpCd eq 'hvps.631.001.01'}">多边轧差净额结算报文        </c:if>  
														<c:if test="${po.msgTpCd eq 'beps.121.001.01'}">客户发起普通贷记业务报文    </c:if>
														<c:if test="${po.msgTpCd eq 'beps.122.001.01'}">金融机构发起普通贷记业务报文</c:if>  
														<c:if test="${po.msgTpCd eq 'beps.123.001.01'}">实时贷记业务报文            </c:if>  
														<c:if test="${po.msgTpCd eq 'beps.125.001.01'}">定期贷记业务报文            </c:if>  
														<c:if test="${po.msgTpCd eq 'beps.127.001.01'}">普通借记业务报文            </c:if>  
														<c:if test="${po.msgTpCd eq 'beps.131.001.01'}">实时借记业务报文            </c:if>  
														<c:if test="${po.msgTpCd eq 'beps.133.001.01'}">定期借记业务报文            </c:if>  
														<c:if test="${po.msgTpCd eq 'beps.380.001.01'}">批量代收业务报文            </c:if>  
														<c:if test="${po.msgTpCd eq 'beps.382.001.01'}">批量代付业务报文            </c:if>  
														<c:if test="${po.msgTpCd eq 'beps.384.001.01'}">实时代收业务报文            </c:if>  
														<c:if test="${po.msgTpCd eq 'beps.385.001.01'}">实时代付业务报文            </c:if>      
														<c:if test="${po.msgTpCd eq 'ccms.314.001.01'}">信息类报文                  </c:if>
														<c:if test="${po.msgTpCd eq 'ccms.315.001.01'}">信息类报文                  </c:if>
							                  </div>
							                  </td>
							                  <td  ><div class="gridCell_standard">
							                  	<c:if test="${po.pmtTp eq 'A100'}">普通汇兑                  </c:if>
												<c:if test="${po.pmtTp eq 'A108'}">现金汇款                  </c:if>
												<c:if test="${po.pmtTp eq 'A109'}">委托收款（划回）          </c:if>
												<c:if test="${po.pmtTp eq 'A110'}">托收承付（划回）          </c:if>
												<c:if test="${po.pmtTp eq 'A201'}">支票                      </c:if>
												<c:if test="${po.pmtTp eq 'A202'}">银行汇票                  </c:if>
												<c:if test="${po.pmtTp eq 'A111'}">商业汇票                  </c:if>
												<c:if test="${po.pmtTp eq 'A112'}">外汇清算                  </c:if>
												<c:if test="${po.pmtTp eq 'A113'}">跨境支付                  </c:if>
												<c:if test="${po.pmtTp eq 'A101'}">公益性资金汇划            </c:if>
												<c:if test="${po.pmtTp eq 'A114'}">人行跨区域票据交换轧差净额</c:if>
												<c:if test="${po.pmtTp eq 'A102'}">国库汇款                  </c:if>
												<c:if test="${po.pmtTp eq 'A307'}">国库资金国债兑付贷记划拨  </c:if>
												<c:if test="${po.pmtTp eq 'A105'}">退汇                      </c:if>
												<c:if test="${po.pmtTp eq 'A104'}">国库资金贷记划拨          </c:if>
												<c:if test="${po.pmtTp eq 'A103'}">国库同城交换净额清算      </c:if>
												<c:if test="${po.pmtTp eq 'A106'}">支取发行基金              </c:if>
												<c:if test="${po.pmtTp eq 'A113'}">跨境支付                  </c:if>
												<c:if test="${po.pmtTp eq 'A115'}">再贷款                    </c:if>
												<c:if test="${po.pmtTp eq 'A114'}">人行跨区域票据交换轧差净额</c:if>
												<c:if test="${po.pmtTp eq 'A200'}">行间资金汇划            </c:if>
												<c:if test="${po.pmtTp eq 'A307'}">国库资金国债兑付贷记划拨</c:if>
												<c:if test="${po.pmtTp eq 'G101'}">公开市场交易结算        </c:if>
												<c:if test="${po.pmtTp eq 'G102'}">债券市场交易结算        </c:if>
												<c:if test="${po.pmtTp eq 'G103'}">债券发行、兑付及收益划拨</c:if>
												<c:if test="${po.pmtTp eq 'G104'}">银行卡轧差净额      </c:if>
												<c:if test="${po.pmtTp eq 'G105'}">电子商业汇票资金清算</c:if>
												<c:if test="${po.pmtTp eq 'G106'}">外汇交易市场结算</c:if>
												<c:if test="${po.pmtTp eq 'G107'}">资金池结算</c:if>
												<c:if test="${po.pmtTp eq 'G108'}">日终自动拆借</c:if>
												<c:if test="${po.pmtTp eq 'G109'}">质押融资</c:if>
												<c:if test="${po.pmtTp eq 'H010'}">外汇交易轧差净额</c:if>
												<c:if test="${po.pmtTp eq 'H011'}">证券交易轧差净额</c:if>
												<c:if test="${po.pmtTp eq 'H012'}">其他系统轧差净额</c:if>
												<c:if test="${po.pmtTp eq 'K100'}"> 查询书</c:if>
												<c:if test="${po.pmtTp eq 'K101'}"> 查复书</c:if>
							                  </div></td>
							                    <td  ><div class="gridCell_standard">
							                    	<c:choose>
							                    		<c:when test="${po.pmtTp eq 'K001' || po.pmtTp eq 'K002'}">信息类</c:when>
							                    		<c:otherwise>业务类</c:otherwise>
							                    	</c:choose>
							                    </div></td>
							                  <td  ><div class="gridCell_standard">
							                  	<c:if test="${po.chckResult eq '0' }">一致</c:if>
							                  	<c:if test="${po.chckResult eq '1' }"><font color="red">不一致</font></c:if>
							                  </div></td>
							                  <td  ><div align="center"><span >
                                               <a href="#"   onClick="viewdetails('${po.chckdt }','${po.pmtTp }','${po.msgTpCd}')"><u>明细</u></a></span></div>
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
	    	<td >
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
