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
<title>小额汇总对账查询列表 </title>
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

	
	function viewdetails(chckDt,msgTp){
		var newurl = "<%=path %>/DuizhangAction.do?method=checkTotalAcctDetails&systemcd=BEPS&chckdt="+chckDt+"&pmtTp="+msgTp;
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
<input type="hidden" name="systemcd" value="BEPS"/>
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b"><div  class="text_title"><span class="text_blue2">小额汇总对账查询</span></div>
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
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">小额汇总对账查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head" >
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
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
					              	  
					                   <td >终态日期</td>
					                   <td >报文类型</td>
					                   <td >对账类型</td>
					                   <td >对账结果</td>	
					                   <td >明细</td>
					                </tr>
					             
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
										      <td  ><div class="gridCell_standard">${po.chckdt }</div></td>
							                  <td  ><div class="gridCell_standard">
							                  	<c:if test="${po.msgTp eq 'beps.130.001.01'}">CIS通用回执</c:if>
							                  	<c:if test="${po.msgTp eq 'beps.121.001.01'}">客户发起普通贷记业务报文    </c:if>
												<c:if test="${po.msgTp eq 'beps.122.001.01'}">金融机构发起普通贷记业务报文</c:if>  
												<c:if test="${po.msgTp eq 'beps.123.001.01'}">实时贷记业务报文            </c:if>  
												<c:if test="${po.msgTp eq 'beps.125.001.01'}">定期贷记业务报文            </c:if>  
												<c:if test="${po.msgTp eq 'beps.127.001.01'}">普通借记业务报文            </c:if>  
												<c:if test="${po.msgTp eq 'beps.131.001.01'}">实时借记业务报文            </c:if>  
												<c:if test="${po.msgTp eq 'beps.133.001.01'}">定期借记业务报文            </c:if>  
												<c:if test="${po.msgTp eq 'beps.380.001.01'}">批量代收业务报文            </c:if>  
												<c:if test="${po.msgTp eq 'beps.382.001.01'}">批量代付业务报文            </c:if>  
												<c:if test="${po.msgTp eq 'beps.384.001.01'}">实时代收业务报文            </c:if>  
												<c:if test="${po.msgTp eq 'beps.385.001.01'}">实时代付业务报文            </c:if>      
												<c:if test="${po.msgTp eq 'ccms.314.001.01'}">信息类报文                  </c:if>
												<c:if test="${po.msgTp eq 'ccms.315.001.01'}">信息类报文                  </c:if>
							                  </div></td>
							                  <td  ><div class="gridCell_standard">
							                  	<c:choose>
							                  		<c:when test="${po.msgTp eq 'beps.127.001.01' || po.msgTp eq 'beps.133.001.01'
							                  			|| po.msgTp eq 'ccms.314.001.01'||po.msgTp eq 'ccms.315.001.01' }">
							                  			信息类
							                  		</c:when>
							                  		<c:otherwise>业务类</c:otherwise>
							                  	</c:choose>
							                  </div>
							                  <td  ><div class="gridCell_standard">
							                  	<c:if test="${po.chckResult eq '0' }">一致</c:if>
							                  	<c:if test="${po.chckResult eq '1' }"><font color="red">不一致</font></c:if>
							                  </div></td>
							                  <td  ><div align="center"><span >
                                               <a href="#"   onClick="viewdetails('${po.chckdt }','${po.msgTp }')"><u>明细</u></a></span></div>
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
