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
<title> 来账待处理查询 </title>
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
	function viewdetails(id,pmtTp){
		var newurl = "<%=path %>/RecvTransProcessAction.do?method=sendDetailMessage&id="+id+"&pmtTp="+pmtTp;
		viewDetails(newurl);	
	} 
	function pushback(id ){
		var newurl = "<%=path %>/RecvTransProcessAction.do?method=beforeReturn&id="+id ;
		viewDetails(newurl);	
	}
</script>
</head>
<body> 

 
<html:form  method="post" action="/RecvTransProcessAction.do?method=querySendxml&operway=01">




 

<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
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
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
             <table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
                <td colspan="6"><div  class="text_title"><span class="text_blue2">支付业务来报待处理查询</span></div></td>
                </tr>
              </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
             <tr>
                					<td colspan="8">&nbsp;</td>
                				</tr>
                		  
				                <tr>
				                <td class="text_tablehead_b">支付交易序号</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="startid"  value="${startid}"/>-<input type="text" name="endid"  maxlength="19" value="${endid}"/>
				                  	</td>
				                  	
				                	<td  class="text_tablehead_b">来报日期</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.inwardDt" class="Wdate" onclick="WdatePicker()" value="${condition.inwardDt }"/>
				                  	</td>
				                  	</tr><tr>
				               	 	<td  class="text_tablehead_b">报文状态</td>
				                   	<td colspan="3">
				                  		<select name="po.msgSts">
				                  			<option value="" ${condition.msgSts eq '' ? 'selected' : '' }>请选择</option>
				                  			<option value="00" ${condition.msgSts eq '00' ? 'selected' : '' }>待处理</option>
				                  			<option value="01" ${condition.msgSts eq '01' ? 'selected' : '' }>待复核</option>
				                  			<option value="02" ${condition.msgSts eq '02' ? 'selected' : '' }>已复核</option>
				                  		</select>
				                  	</td>
				                  		<td  class="text_tablehead_b">业务类型号</td>
				                   	<td colspan="3">
				                  		<select name="po.pmtTp">
				                  			<option value="" ${condition.pmtTp eq '' ? 'selected' : '' }>请选择</option>
				                  			<option value="A108" ${condition.pmtTp eq 'A108' ? 'selected' : '' }>现金汇款</option>
				                  			<option value="A109" ${condition.pmtTp eq 'A109' ? 'selected' : '' }>委托收款(划回)</option>
				                  			<option value="A110" ${condition.pmtTp eq 'A110' ? 'selected' : '' }>托收承付(划回)</option>
				                  			<option value="A101" ${condition.pmtTp eq 'A101' ? 'selected' : '' }>公益性资金汇划</option>
				                  			<option value="A102" ${condition.pmtTp eq 'A102' ? 'selected' : '' }>国库汇款</option>
				                  			<option value="A104" ${condition.pmtTp eq 'A104' ? 'selected' : '' }>国库资金贷记划拨</option>
				                  			<option value="A301" ${condition.pmtTp eq 'A301' ? 'selected' : '' }>缴费业务</option>
				                  			<option value="A201" ${condition.pmtTp eq 'A201' ? 'selected' : '' }>支票</option>
				                  			<option value="A100" ${condition.pmtTp eq 'A100' ? 'selected' : '' }>普通汇兑</option>
				                  			<option value="A112" ${condition.pmtTp eq 'A112' ? 'selected' : '' }>外汇清算</option>
				                  			<option value="A200" ${condition.pmtTp eq 'A200' ? 'selected' : '' }>行间资金汇划</option>
				                  			<option value="A113" ${condition.pmtTp eq 'A113' ? 'selected' : '' }>跨境支付</option>
				                  			<option value="B100" ${condition.pmtTp eq 'B100' ? 'selected' : '' }>普通借记业务</option>
				                  			<option value="C102" ${condition.pmtTp eq 'C102' ? 'selected' : '' }>个人储蓄通存业务</option>
				                  			<option value="D102" ${condition.pmtTp eq 'D102' ? 'selected' : '' }>个人储蓄通兑业务</option>
				                  			<option value="E100" ${condition.pmtTp eq 'E100' ? 'selected' : '' }>普通定期贷记业务</option>
				                  			<option value="B308" ${condition.pmtTp eq 'B308' ? 'selected' : '' }>支票截留</option>
				                  			<option value="B309" ${condition.pmtTp eq 'B309' ? 'selected' : '' }>通用票据截留</option>
				                  			
				                  		</select>
				                  	</td>
				                  	</tr><tr>
				                  	<td colspan="5">&nbsp;</td>
				                  	<td  >
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
				                </tr>
				              
				                <tr>
				                	<td class="text_tablehead_b">&nbsp;</td>
                					
                				</tr> 
              
			     
              </table>
              <table width="761" height="23" border="0" cellpadding="0" cellspacing="0">
                <tr >
                <td width="41"   ></td>
                <td width="41" align="center"></td>
                <td width="414" ><div align="right">
                </div></td>
                </tr>
              </table>
              
              <table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
                  <td  align="center" class="text_listhead">委托日期</td>
					                   <td  align="center" class="text_listhead">支付交易序号</td>
					                   <td  align="center" class="text_listhead">发起行行号</td>
					                  <td  align="center" class="text_listhead">业务类型号</td>					                  
					                   <td  align="center" class="text_listhead">金额</td>
					                  <td  align="center" class="text_listhead">处理状态</td> 
					                   <td  align="center" class="text_listhead">行动代码</td>
					                   <td  align="center" class="text_listhead">理由</td>
					                    <c:if test="${condition.pmtTp eq 'F100'}">
					                    	<td  align="center" class="text_listhead">支付交易组号</td>
					                   	 <td  align="center" class="text_listhead">明细笔数</td>
					                     <td  align="center" class="text_listhead">成功回执金额</td>
					                      <td  align="center" class="text_listhead">成功回执笔数</td>
					                   </c:if>
					                   
					       				<td  align="center" class="text_listhead">明细</td>
					       					<td  align="center" class="text_listhead">退汇操作</td> 
					            </tr>
                 <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									<tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                       <td  class="text_list"><div class="gridCell_standard">${po.inwardDt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.txId }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.issuerBk }</div></td>
							               
                  
                    
                 		                    <td  class="text_list"><div class="gridCell_standard">
							                    	<c:if test="${po.pmtTp eq 'B100'}">普通借记</c:if>
							                    </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  <fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }" ></fmt:formatNumber>
							                 </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.msgSts eq '00'}">待处理</c:if>
								                  <c:if test="${po.msgSts eq '01'}">待复核</c:if>
								                  <c:if test="${po.msgSts eq '02'}">已复核</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                   	  <c:if test="${po.actionCd eq 'P'}">挂账</c:if>
								                  <c:if test="${po.actionCd eq 'Q'}">查询</c:if>
								                  <c:if test="${po.actionCd eq 'A'}">扣帐</c:if>
								                   <c:if test="${po.actionCd eq 'C'}">入账</c:if>
								                  <c:if test="${po.actionCd eq 'B'}">退汇</c:if>
								                  <c:if test="${po.actionCd eq 'R'}">拒绝</c:if>
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.rjctRsn }</div></td>
							                   <c:if test="${condition.pmtTp eq 'F100'}">
							                   	   <td  class="text_list"><div class="gridCell_standard">${po.pmtGrpId }</div></td>
							                  	   <td  class="text_list"><div class="gridCell_standard">${po.nbOfTxs }</div></td>
									               <td  class="text_list"><div class="gridCell_standard">${po.sucflRspedTxsAmt }</div></td>
									               <td  class="text_list"><div class="gridCell_standard">${po.nbOfSucflRspedTxs }</div></td>
					                  			</c:if>
							                
							                  <td  class="text_list"><div align="center"><span class="text_list">
							                   <c:choose>
							                   	<c:when test="${po.pmtTp eq 'F100'}">
							                   		  <a href="#"   onClick="viewdetails('${po.pmtGrpId }','${po.pmtTp}')"><u>明细</u></a>
							                   	</c:when>
							                   	<c:otherwise>
							                   		<a href="#"   onClick="viewdetails('${po.id }','${po.pmtTp}')"><u>明细</u></a>
							                   	</c:otherwise>
							                   </c:choose>
                                               </span></div>
                                               </td>
                <td  class="text_list"><div class="gridCell_standard">
							                     <a href="#"   onClick="pushback('${po.id }')"><u>退汇 </u></a>
							                  </div></td>
                </tr>
				</logic:iterate>
                </logic:present>
             </table></td>
        </tr>
		<tr>  
	      <td></td>      
	      <td>
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
        </tr>
      </table>	      </td>
	      <td></td>
	      </tr>
    </table>    </td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	
  </tr>  
</table>
























 	 
			 
			 
			 
			 
			 
</html:form>
</body>
</html>
