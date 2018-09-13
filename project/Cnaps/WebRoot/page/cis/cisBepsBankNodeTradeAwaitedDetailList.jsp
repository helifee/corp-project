<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title></title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
<script type="text/javascript"></script>
</head>
<body >
   <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">				
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF;" ><br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
						<br/>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								<br></td>
								<td>
									<div align="center">
									<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">票交来报待处理</span></div>
                					</td>
                				</tr>
                			</table>
                			
			<table width="95%" height="30" border="0" cellpadding="0" cellspacing="0" class="table_head" >
                <tr>
					<td height="30">
					<div align="center">
					<br/>
					<div align="center">
					    <fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;bgcolor="E6E6E6"  >
						<legend >来报明细</legend>	
						 <table>
				          <c:if test="${hbn==null}">
				           
				             
				              <tr>
				                 <td  align="center" class="text_details_L">出错啦：查看处理失败！</td>
				              </tr>
				              
				          </c:if>
	                      <c:if test="${hbn!=null}">
				           <tr>
			                   <td  class="text_details_L">序号：</td><td  class="text_details_R" >${hbn.id}</td>
			                   <td  class="text_details_L">上级节点：</td><td  class="text_details_R">${hbn.parented}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">端到端标识号：</td><td  class="text_details_R">${hbn.endtoendid}</td>
			                   <td  class="text_details_L">明细标识号：</td><td  class="text_details_R">${hbn.txid}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">业务类型编码：</td><td  class="text_details_R">
			               			  	 ${hbn.pmttp}
			               		</td>
			                   <td  class="text_details_L">货币符号：</td><td  class="text_details_R">
			                   		${hbn.currencycd}
			                   </td>
			               </tr>
			               <tr>
			               	 	<td  class="text_details_L">金额：</td><td  class="text_details_R"> ${hbn.amount}</td>
			               	  	<td  class="text_details_L">付款人户名：</td><td  class="text_details_R">${hbn.dbtrnm}</td>
			               </tr>
			               <tr>
			               		<td  class="text_details_L">付款人账号：</td><td  class="text_details_R">${hbn.dbtracct}</td>
			               		<td  class="text_details_L">付款人开户行行号：</td><td  class="text_details_R">${hbn.dbtrissuer}</td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">付款清算行行号：</td>
			                   <td  class="text_details_R"  >
			                   ${hbn.dbtrmmbid}
																
			                   </td>
			                    <td  class="text_details_L">付款行行号： </td>
			                   <td  class="text_details_R"  >
			                  ${hbn.dbtrbrnchid}								
			                   </td>
			               </tr>
			               <tr>
			                   <td  class="text_details_L">收款清算行行号：</td><td  class="text_details_R">	${hbn.cdtrmmbid}</td>
			                   <td  class="text_details_L">收款行行号：</td><td  class="text_details_R">${hbn.cdtrbrnchid}</td>
			               </tr>
			               
			               <tr>
			                   <td  class="text_details_L">收款人名称：</td><td  class="text_details_R"  >  ${hbn.cdtrnm} </td> 
			                 <td  class="text_details_L">收款人账号：</td><td  class="text_details_R"  >${hbn.cdtracct}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">收款人开户行行号：</td><td  class="text_details_R"  >  ${hbn.cdtrissuer} </td> 
			                 <td  class="text_details_L">业务种类编码：</td><td  class="text_details_R"  >${hbn.pmtkd}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">附言：</td><td  class="text_details_R"  >${hbn.addtlinf}</td> 
			                 <td  class="text_details_L">备注：</td><td  class="text_details_R"  >${hbn.ustrd}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">原CIS委托日期：</td><td  class="text_details_R"  >${hbn.ornglciscnsgndt} </td> 
			                 <td  class="text_details_L">原CIS交易序号：</td><td  class="text_details_R"  >${hbn.ornglcistxid}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">原CIS票据号码：</td><td  class="text_details_R"  >  ${hbn.ornglcisnotesno} </td> 
			                 <td  class="text_details_L">回执状态：</td><td  class="text_details_R"  >${hbn.rcptsts}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">业务拒绝处理码：</td><td  class="text_details_R"  >  ${hbn.txrjctcd} </td> 
			                 <td  class="text_details_L">业务拒绝信息：</td><td  class="text_details_R"  >${hbn.txrjctinf}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">NPC处理状态：</td><td  class="text_details_R"  >${hbn.prcsts} </td> 
			                 <td  class="text_details_L">NPC轧差日期：</td><td  class="text_details_R"  >${hbn.netgdt}</td></tr>
			                  <tr>
			                   <td  class="text_details_L">NPC轧差场次：</td><td  class="text_details_R"  >  ${hbn.netgrnd} </td> 
			                 <td  class="text_details_L">NPC清算日期/终态日期：</td><td  class="text_details_R"  >${hbn.sttlmdt}</td>
			                 </tr>
			                 
				          </c:if>
	                       
 
	 					</table>
	 					</fieldset>
				       </div>	
				       
				       <c:if test="${hbn!=null}">
	 					<div align="center">
					    <fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;bgcolor="E6E6E6"  >
						<legend >业务处理</legend>	
	 					<table width="95%" height="30" border="0" cellpadding="0" cellspacing="0" >
	 					
	 					 <tr>
	 					    <td  class="text_details_L">挂 账</td>
							<td  class="text_details_L">入 账</td>
                          </tr>
                          <tr>
                            <td align="center"><input style="width:20" type="radio" name="a" value="1"></td>
							<td align="center"><input style="width:20" type="radio" name="a" value="1"></td>
                          </tr>
	 					 
	 					 
                          <tr>
                          <td align="center" width="100%"  colspan="2">
                            <input name="addButton" type="button" style="cursor: pointer" class="button" value="处  理" onclick="commitForm();" />
                            <!-- 
                            <input name="addButton" type="button" style="cursor: pointer" class="button" value="取  消" onclick="commitForm();" />
                             -->
                          </td>
                          </tr>
	 		            </table>
	 				   </fieldset>
				       </div>	
				       </c:if>
	 				 <br/>
                   
                  </div>
                 </td>
				</tr>	
				
			</table>
			 
		</div>
	<br></td>
	</tr>
	</table>
	<br></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	</tr>
</table>
</body>
</html>
 